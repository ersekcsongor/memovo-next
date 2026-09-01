import { ApiProperty } from "@nestjs/swagger";
import { Plan } from "@prisma/client";
import { IsEnum } from "class-validator";
import { PAID_PLANS } from "../plan-limits";

export class CheckoutDto {
  @ApiProperty({ enum: PAID_PLANS, example: Plan.PRO })
  @IsEnum(Plan)
  plan!: Plan;
}

export class DevPlanDto {
  @ApiProperty({ enum: Plan, example: Plan.PRO })
  @IsEnum(Plan)
  plan!: Plan;
}
