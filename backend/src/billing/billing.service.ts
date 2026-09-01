import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Plan } from "@prisma/client";
import Stripe from "stripe";
import { PrismaService } from "../prisma/prisma.service";
import { isPaidPlan, PLAN_LIMITS, type PaidPlan, type PlanLimits } from "./plan-limits";

/** The plan a Stripe price sells, read from config so the ids stay out of the code. */
type PriceMap = Partial<Record<PaidPlan, string>>;

/**
 * The subscription states that keep the doors open.
 *
 * `past_due` is in: Stripe is still retrying the card and the period the account
 * paid for has not run out, so taking the galleries away mid-retry would punish an
 * expired card rather than a decision. Everything absent from this set — canceled,
 * unpaid, incomplete, incomplete_expired, paused — closes them at once.
 */
const GRANTS_ACCESS = new Set<string>(["active", "trialing", "past_due"]);

@Injectable()
export class BillingService {
  private readonly logger = new Logger(BillingService.name);
  private readonly stripe: Stripe | null;
  private readonly webhookSecret: string;
  private readonly prices: PriceMap;
  private readonly returnUrl: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {
    const key = config.get<string>("STRIPE_SECRET_KEY", "").trim();
    // Without a key the whole Stripe half stays switched off, and the dev route
    // below takes over. That keeps the galleries testable before an account exists.
    this.stripe = key ? new Stripe(key) : null;
    this.webhookSecret = config.get<string>("STRIPE_WEBHOOK_SECRET", "").trim();
    this.prices = {
      STARTER: config.get<string>("STRIPE_PRICE_STARTER", "").trim() || undefined,
      PRO: config.get<string>("STRIPE_PRICE_PRO", "").trim() || undefined,
      PREMIUM: config.get<string>("STRIPE_PRICE_PREMIUM", "").trim() || undefined,
    };
    this.returnUrl = config
      .get<string>("CHECKOUT_RETURN_URL", "http://localhost:3000/account")
      .replace(/\/+$/, "");
  }

  /** True once a secret key is configured. The dev route refuses to exist after that. */
  get stripeEnabled() {
    return this.stripe !== null;
  }

  /* ---------------- what an account may do ---------------- */

  /**
   * The one answer to "has this account paid". A plan that has run out reads as
   * FREE, so an expired subscription closes the same doors a new account finds shut.
   */
  activePlan(user: { plan: Plan; planExpiresAt: Date | null }): Plan {
    if (user.plan === Plan.FREE) return Plan.FREE;
    if (user.planExpiresAt && user.planExpiresAt.getTime() <= Date.now()) return Plan.FREE;
    return user.plan;
  }

  limitsFor(user: { plan: Plan; planExpiresAt: Date | null }): PlanLimits {
    return PLAN_LIMITS[this.activePlan(user)];
  }

  /** Called before a gallery is created. Throws with the reason the caller can show. */
  async assertCanCreateGallery(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException("No such account");

    const limits = this.limitsFor(user);
    if (limits.galleries === 0) {
      throw new ForbiddenException("A plan is needed before a gallery can be created");
    }

    const owned = await this.prisma.event.count({ where: { ownerId: userId } });
    if (owned >= limits.galleries) {
      throw new ForbiddenException(
        `This plan carries ${limits.galleries} galleries; upgrade to open another`,
      );
    }
  }

  /**
   * Called before a guest upload is stored. The guest has no account, so the
   * ceiling comes from whoever owns the gallery.
   */
  async assertRoomForPhoto(event: { id: string; ownerId: string }) {
    const owner = await this.prisma.user.findUnique({ where: { id: event.ownerId } });
    if (!owner) throw new NotFoundException("No such gallery");

    const limit = this.limitsFor(owner).photosPerGallery;
    if (!Number.isFinite(limit)) return;

    const stored = await this.prisma.photo.count({ where: { eventId: event.id } });
    if (stored >= limit) throw new ForbiddenException("This gallery is full");
  }

  /* ---------------- Stripe ---------------- */

  async createCheckoutSession(userId: string, plan: PaidPlan) {
    const stripe = this.requireStripe();
    const price = this.prices[plan];
    if (!price) throw new ServiceUnavailableException(`No price is configured for ${plan}`);

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException("No such account");

    const customerId = user.stripeCustomerId ?? (await this.createCustomer(stripe, user));

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      line_items: [{ price, quantity: 1 }],
      success_url: `${this.returnUrl}?checkout=success`,
      cancel_url: `${this.returnUrl}?checkout=cancelled`,
      // Both are read back on the webhook, so the payment finds its way home even
      // if the customer record is somehow not the one we expect.
      client_reference_id: user.id,
      subscription_data: { metadata: { userId: user.id, plan } },
      metadata: { userId: user.id, plan },
    });

    if (!session.url) throw new ServiceUnavailableException("Stripe returned no checkout URL");
    return { url: session.url };
  }

  /** Where the account manages or cancels what it bought. */
  async createPortalSession(userId: string) {
    const stripe = this.requireStripe();
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user?.stripeCustomerId) throw new BadRequestException("This account has bought nothing yet");

    const session = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: this.returnUrl,
    });
    return { url: session.url };
  }

  /**
   * Verifies the signature and applies the change. Stripe retries until it gets a
   * 2xx, and a retry can arrive after the first copy was handled, so every event
   * id is written down and a second sighting does nothing.
   */
  async handleWebhook(rawBody: Buffer | undefined, signature: string | undefined) {
    const stripe = this.requireStripe();
    if (!this.webhookSecret) throw new ServiceUnavailableException("No webhook secret is configured");
    if (!rawBody || !signature) throw new BadRequestException("Unsigned webhook");

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, this.webhookSecret);
    } catch (error) {
      throw new BadRequestException(`Signature check failed: ${(error as Error).message}`);
    }

    const seen = await this.prisma.stripeEvent.findUnique({ where: { id: event.id } });
    if (seen) return { received: true, repeat: true };
    await this.prisma.stripeEvent.create({ data: { id: event.id, type: event.type } });

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        if (session.subscription) {
          const subscription = await stripe.subscriptions.retrieve(
            typeof session.subscription === "string" ? session.subscription : session.subscription.id,
          );
          await this.applySubscription(subscription, session.client_reference_id ?? undefined);
        }
        break;
      }
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        await this.applySubscription(event.data.object);
        break;
      }
      default:
        this.logger.debug(`Ignoring ${event.type}`);
    }

    return { received: true, repeat: false };
  }

  /** Writes what Stripe says about a subscription onto the account. */
  private async applySubscription(subscription: Stripe.Subscription, fallbackUserId?: string) {
    const userId = await this.resolveUser(subscription, fallbackUserId);
    if (!userId) {
      this.logger.warn(`Subscription ${subscription.id} matches no account`);
      return;
    }

    const priceId = subscription.items.data[0]?.price.id ?? "";
    const plan = this.planForPrice(priceId, subscription.metadata?.plan);
    const periodEnd = this.periodEnd(subscription);
    const live = GRANTS_ACCESS.has(subscription.status);

    await this.prisma.subscription.upsert({
      where: { stripeSubscriptionId: subscription.id },
      create: {
        userId,
        stripeSubscriptionId: subscription.id,
        stripePriceId: priceId,
        plan,
        status: subscription.status,
        currentPeriodEnd: periodEnd,
      },
      update: {
        stripePriceId: priceId,
        plan,
        status: subscription.status,
        currentPeriodEnd: periodEnd,
      },
    });

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        plan: live ? plan : Plan.FREE,
        // The date is written either way. While the subscription is live it is what
        // activePlan measures against; once it has ended the plan is already FREE
        // and the date is only a record of what was paid for.
        planExpiresAt: periodEnd,
      },
    });
  }

  private async resolveUser(subscription: Stripe.Subscription, fallbackUserId?: string) {
    const fromMetadata = subscription.metadata?.userId;
    if (fromMetadata) return fromMetadata;
    if (fallbackUserId) return fallbackUserId;

    const customerId =
      typeof subscription.customer === "string" ? subscription.customer : subscription.customer.id;
    const user = await this.prisma.user.findUnique({ where: { stripeCustomerId: customerId } });
    return user?.id;
  }

  private planForPrice(priceId: string, fromMetadata?: string): Plan {
    for (const [plan, configured] of Object.entries(this.prices)) {
      if (configured && configured === priceId) return plan as Plan;
    }
    // A price added in the Stripe dashboard without a matching env var still lands
    // on the right plan, because Checkout wrote the plan into the metadata.
    if (fromMetadata && isPaidPlan(fromMetadata)) return fromMetadata;
    this.logger.warn(`Price ${priceId} maps to no plan; treating it as STARTER`);
    return Plan.STARTER;
  }

  /**
   * Stripe moved the period end onto the subscription item. Reading the item
   * first and the subscription second keeps this working across both shapes.
   */
  private periodEnd(subscription: Stripe.Subscription): Date {
    const item = subscription.items.data[0] as { current_period_end?: number } | undefined;
    const legacy = subscription as unknown as { current_period_end?: number };
    const seconds = item?.current_period_end ?? legacy.current_period_end;
    if (seconds) return new Date(seconds * 1000);
    // Nothing to go on: a month out keeps the account working until Stripe says otherwise.
    return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  }

  private async createCustomer(stripe: Stripe, user: { id: string; email: string; name: string }) {
    const customer = await stripe.customers.create({
      email: user.email,
      name: user.name,
      metadata: { userId: user.id },
    });
    await this.prisma.user.update({
      where: { id: user.id },
      data: { stripeCustomerId: customer.id },
    });
    return customer.id;
  }

  private requireStripe(): Stripe {
    if (!this.stripe) throw new ServiceUnavailableException("Payments are not configured");
    return this.stripe;
  }

  /* ---------------- development ---------------- */

  /**
   * Sets a plan with no payment behind it. The controller only exposes this while
   * Stripe is switched off and the app is outside production, so it cannot become
   * a way to hand out plans on a live site.
   */
  async setPlanForDevelopment(userId: string, plan: Plan) {
    const expires = plan === Plan.FREE ? null : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { plan, planExpiresAt: expires },
    });
    return { plan: user.plan, planExpiresAt: user.planExpiresAt };
  }
}
