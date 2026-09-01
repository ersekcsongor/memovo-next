import { Plan } from "@prisma/client";

export type PlanLimits = {
  /** How many galleries the account may have open at once. */
  galleries: number;
  /** How many photos one gallery accepts before it stops taking uploads. */
  photosPerGallery: number;
};

/**
 * What each plan buys, in one place. The numbers follow the plan cards on the
 * pricing page: Starter carries 500 photos, Pro lifts that, Premium adds more
 * galleries so a planner can run several events at once.
 *
 * FREE holds no galleries at all. An account creates its first gallery once it
 * has paid, which is the whole shape of the product.
 */
export const PLAN_LIMITS: Record<Plan, PlanLimits> = {
  FREE: { galleries: 0, photosPerGallery: 0 },
  STARTER: { galleries: 1, photosPerGallery: 500 },
  PRO: { galleries: 3, photosPerGallery: Number.POSITIVE_INFINITY },
  PREMIUM: { galleries: Number.POSITIVE_INFINITY, photosPerGallery: Number.POSITIVE_INFINITY },
};

/** The plan a price id sells. Unknown ids are refused rather than guessed at. */
export type PaidPlan = Exclude<Plan, "FREE">;

export const PAID_PLANS: PaidPlan[] = [Plan.STARTER, Plan.PRO, Plan.PREMIUM];

export function isPaidPlan(value: string): value is PaidPlan {
  return (PAID_PLANS as string[]).includes(value);
}
