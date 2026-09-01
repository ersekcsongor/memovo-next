"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { IconCreditCard, IconSparkles } from "@tabler/icons-react";
import { api, type PlanStatus } from "@/lib/api";
import { fill } from "@/lib/fill";
import { useAuth } from "@/components/AuthProvider";
import { useLang, useT } from "@/components/LanguageProvider";

const LOCALE = { en: "en-GB", hu: "hu-HU", ro: "ro-RO" } as const;

/**
 * What the account has bought, and the one control that changes it.
 *
 * Checkout leaves the site and returns with a query flag, so the plan is read
 * again on the way back rather than trusted from before the visitor left.
 */
export default function PlanCard() {
  const { token, refresh } = useAuth();
  const { lang } = useLang();
  const t = useT();
  const params = useSearchParams();
  const checkout = params.get("checkout");

  const [status, setStatus] = useState<PlanStatus | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    if (!token) return;
    api.billing
      .plan(token)
      .then(setStatus)
      .catch(() => setStatus(null));
  }, [token]);

  useEffect(load, [load]);

  /* The webhook may land a moment after the visitor does, so a successful return
     re-reads the account as well as the plan. */
  useEffect(() => {
    if (checkout !== "success" || !token) return;
    void refresh();
    const again = setTimeout(load, 2500);
    return () => clearTimeout(again);
  }, [checkout, token, refresh, load]);

  const paid = status && status.plan !== "FREE";
  const until = status?.planExpiresAt
    ? new Date(status.planExpiresAt).toLocaleDateString(LOCALE[lang], {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="mt-6 rounded-2xl border border-border bg-white p-6">
      {checkout === "success" && (
        <p className="mb-4 rounded-xl bg-blush p-3 text-sm font-semibold text-coral-ink">
          {t("plan.checkoutSuccess")}
        </p>
      )}
      {checkout === "cancelled" && (
        <p className="mb-4 rounded-xl border border-border p-3 text-sm text-muted-foreground">
          {t("plan.checkoutCancelled")}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span
            aria-hidden
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blush text-coral-ink"
          >
            {paid ? <IconSparkles className="h-6 w-6" stroke={1.6} /> : <IconCreditCard className="h-6 w-6" stroke={1.6} />}
          </span>
          <span>
            <span className="block text-xs tracking-wide text-muted-foreground">{t("plan.current")}</span>
            <span className="block font-heading font-bold">
              {paid ? status.plan.charAt(0) + status.plan.slice(1).toLowerCase() : t("plan.free")}
            </span>
            {until && paid && (
              <span className="block text-sm text-muted-foreground">{fill(t("plan.until"), { date: until })}</span>
            )}
          </span>
        </div>

        {/* Nothing renews itself, so the action on a paid account is to buy the
            next month when they want it, quietly, beside the date it would follow. */}
        <Link
          href="/pricing"
          className={`inline-flex min-h-11 items-center rounded-full px-5 text-sm font-semibold transition ${
            paid
              ? "border border-border text-navy hover:bg-cream"
              : "bg-coral text-white hover:brightness-95"
          }`}
        >
          {paid ? t("plan.extend") : t("plan.choose")}
        </Link>
      </div>

      {!paid && <p className="mt-4 text-sm text-muted-foreground">{t("plan.needed")}</p>}
    </div>
  );
}
