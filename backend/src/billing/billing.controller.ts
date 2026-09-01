import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  Headers,
  HttpCode,
  Post,
  Req,
  UseGuards,
  type RawBodyRequest,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ApiBearerAuth, ApiExcludeEndpoint, ApiOperation, ApiTags } from "@nestjs/swagger";
import { SkipThrottle } from "@nestjs/throttler";
import { Plan } from "@prisma/client";
import type { Request } from "express";
import { type AuthUser } from "../auth/auth.service";
import { CurrentUser, JwtAuthGuard } from "../auth/jwt-auth.guard";
import { BillingService } from "./billing.service";
import { CheckoutDto, DevPlanDto } from "./dto/billing.dto";
import { isPaidPlan, PLAN_LIMITS } from "./plan-limits";

@ApiTags("billing")
@Controller("billing")
export class BillingController {
  constructor(
    private readonly billing: BillingService,
    private readonly config: ConfigService,
  ) {}

  @Get("plan")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "The plan behind the current account and what it allows" })
  plan(@CurrentUser() user: AuthUser) {
    const active = this.billing.activePlan(user);
    const limits = PLAN_LIMITS[active];
    return {
      plan: active,
      planExpiresAt: user.planExpiresAt,
      limits: {
        galleries: Number.isFinite(limits.galleries) ? limits.galleries : null,
        photosPerGallery: Number.isFinite(limits.photosPerGallery) ? limits.photosPerGallery : null,
      },
      // The account page shows a different call to action when there is nothing to manage.
      paymentsConfigured: this.billing.stripeEnabled,
    };
  }

  @Post("checkout")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Start a Checkout session for a plan" })
  checkout(@CurrentUser() user: AuthUser, @Body() dto: CheckoutDto) {
    if (!isPaidPlan(dto.plan)) throw new BadRequestException("That plan cannot be bought");
    return this.billing.createCheckoutSession(user.id, dto.plan);
  }

  @Post("portal")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(200)
  @ApiOperation({ summary: "Open the Stripe portal to manage or cancel" })
  portal(@CurrentUser() user: AuthUser) {
    return this.billing.createPortalSession(user.id);
  }

  /**
   * Stripe posts here. The signature is checked against the raw bytes, so this
   * route reads `rawBody` rather than a parsed DTO, and it stays outside the
   * throttler because a retry storm is exactly what Stripe does on failure.
   */
  @Post("webhook")
  @SkipThrottle()
  @HttpCode(200)
  @ApiExcludeEndpoint()
  webhook(@Req() req: RawBodyRequest<Request>, @Headers("stripe-signature") signature?: string) {
    return this.billing.handleWebhook(req.rawBody, signature);
  }

  /**
   * Sets a plan with no payment behind it, so the gallery and QR flow can be
   * exercised before Stripe keys exist. It refuses to run in production and
   * refuses to run once a Stripe key is configured, which is what keeps it from
   * turning into a free upgrade button on a live site.
   */
  @Post("dev-plan")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(200)
  @ApiOperation({ summary: "Development only: set a plan without paying" })
  devPlan(@CurrentUser() user: AuthUser, @Body() dto: DevPlanDto) {
    const production = this.config.get<string>("NODE_ENV") === "production";
    if (production || this.billing.stripeEnabled) {
      throw new ForbiddenException("Plans are set by paying for them");
    }
    return this.billing.setPlanForDevelopment(user.id, dto.plan as Plan);
  }
}
