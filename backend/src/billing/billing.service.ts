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
 * One month on from a date, landing on the same day of the next month.
 *
 * Paying on the 1st covers you to the 1st. The 31st has no counterpart in a
 * shorter month, so it falls back to that month's last day rather than spilling
 * into the one after.
 */
function addOneMonth(from: Date): Date {
  const to = new Date(from);
  const day = to.getDate();
  to.setMonth(to.getMonth() + 1);
  if (to.getDate() !== day) to.setDate(0);
  return to;
}

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
      // One payment for one month. The site promises no subscription and no
      // auto-renewal, so nothing here may set up a recurring charge.
      mode: "payment",
      customer: customerId,
      line_items: [{ price, quantity: 1 }],
      success_url: `${this.returnUrl}?checkout=success`,
      cancel_url: `${this.returnUrl}?checkout=cancelled`,
      // Both are read back on the webhook, so the payment finds its way home even
      // if the customer record is somehow not the one we expect.
      client_reference_id: user.id,
      payment_intent_data: { metadata: { userId: user.id, plan } },
      metadata: { userId: user.id, plan },
    });

    if (!session.url) throw new ServiceUnavailableException("Stripe returned no checkout URL");
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
      case "checkout.session.completed":
        await this.applyPayment(event.data.object);
        break;
      case "charge.refunded":
        await this.applyRefund(event.data.object);
        break;
      default:
        this.logger.debug(`Ignoring ${event.type}`);
    }

    return { received: true, repeat: false };
  }

  /**
   * A paid Checkout session buys one month of a plan.
   *
   * Buying again while the current month still has time left adds to it rather
   * than replacing it, so paying early never costs the buyer the days they had.
   */
  private async applyPayment(session: Stripe.Checkout.Session) {
    if (session.payment_status !== "paid") {
      this.logger.debug(`Session ${session.id} completed without payment`);
      return;
    }

    const userId = await this.resolveUser(session);
    if (!userId) {
      this.logger.warn(`Session ${session.id} matches no account`);
      return;
    }

    const priceId = await this.priceOf(session);
    const plan = this.planForPrice(priceId, session.metadata?.plan);

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) return;

    // The plan they already hold runs on, and this month is added to the end of it.
    const standing = this.activePlan(user) !== Plan.FREE && user.planExpiresAt;
    const from = standing && user.planExpiresAt! > new Date() ? user.planExpiresAt! : new Date();
    const coversUntil = addOneMonth(from);

    await this.prisma.purchase.upsert({
      where: { stripeSessionId: session.id },
      create: {
        userId,
        stripeSessionId: session.id,
        stripePaymentIntentId:
          typeof session.payment_intent === "string" ? session.payment_intent : (session.payment_intent?.id ?? null),
        stripePriceId: priceId,
        plan,
        amountTotal: session.amount_total ?? 0,
        currency: session.currency ?? "usd",
        coversUntil,
      },
      update: {},
    });

    await this.prisma.user.update({
      where: { id: userId },
      data: { plan, planExpiresAt: coversUntil },
    });
  }

  /** Money given back closes the plan the payment opened. */
  private async applyRefund(charge: Stripe.Charge) {
    const intentId = typeof charge.payment_intent === "string" ? charge.payment_intent : charge.payment_intent?.id;
    if (!intentId) return;

    const purchase = await this.prisma.purchase.findFirst({
      where: { stripePaymentIntentId: intentId },
    });
    if (!purchase) {
      this.logger.warn(`Refunded charge ${charge.id} matches no purchase`);
      return;
    }

    await this.prisma.purchase.update({
      where: { id: purchase.id },
      data: { refundedAt: new Date() },
    });
    await this.prisma.user.update({
      where: { id: purchase.userId },
      data: { plan: Plan.FREE, planExpiresAt: null },
    });
  }

  /** Which account the payment belongs to, by the two markers Checkout carries. */
  private async resolveUser(session: Stripe.Checkout.Session) {
    const fromMetadata = session.metadata?.userId;
    if (fromMetadata) return fromMetadata;
    if (session.client_reference_id) return session.client_reference_id;

    const customerId = typeof session.customer === "string" ? session.customer : session.customer?.id;
    if (!customerId) return undefined;
    const user = await this.prisma.user.findUnique({ where: { stripeCustomerId: customerId } });
    return user?.id;
  }

  /** The price the session sold, which the session itself does not carry. */
  private async priceOf(session: Stripe.Checkout.Session) {
    const inlined = session.line_items?.data[0]?.price?.id;
    if (inlined) return inlined;
    try {
      const items = await this.requireStripe().checkout.sessions.listLineItems(session.id, { limit: 1 });
      return items.data[0]?.price?.id ?? "";
    } catch (error) {
      this.logger.warn(`Could not read the line items of ${session.id}: ${(error as Error).message}`);
      return "";
    }
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
    // The same month a payment buys, so the dates on screen match either way.
    const expires = plan === Plan.FREE ? null : addOneMonth(new Date());
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { plan, planExpiresAt: expires },
    });
    return { plan: user.plan, planExpiresAt: user.planExpiresAt };
  }
}
