import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { BillingController } from "./billing.controller";
import { BillingService } from "./billing.service";

/**
 * Owns what an account is allowed to do. Events and photos import it for the
 * limit checks, so the plan rules live in one module and nothing else reads the
 * plan columns directly.
 */
@Module({
  imports: [PrismaModule],
  controllers: [BillingController],
  providers: [BillingService],
  exports: [BillingService],
})
export class BillingModule {}
