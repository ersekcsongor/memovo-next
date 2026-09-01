import type { EventCategory } from "@/lib/api";

/**
 * Each gallery occasion reuses the label its own page already carries, so the
 * picker in the account and the navigation never drift apart. Only the catch-all
 * needed a key of its own.
 */
export const CATEGORY_KEY: Record<EventCategory, string> = {
  WEDDING: "event.weddings",
  ENGAGEMENT: "event.engagements",
  PARTY: "event.party",
  KIDS_PARTY: "event.kids-parties",
  BUSINESS: "event.business",
  MEMORIAL: "event.memorials",
  SEASONAL_HOLIDAY: "event.seasonal-holidays",
  COMPANY_CHRISTMAS: "event.company-christmas-parties",
  OTHER: "event.other",
};
