"use client";

import Link from "next/link";
import { useState } from "react";
import { CURRENCIES, type Currency, formatPrice } from "@/data/currency";
import { type Plan } from "@/data/content";
import { useT } from "@/components/LanguageProvider";

/**
 * Owns the selected currency so switching re-renders the cards in place,
 * with no page reload and no round trip to the server.
 */
export function PricingSection({ plans }: { plans: Plan[] }) {
  const [currency, setCurrency] = useState<Currency>("USD");
  const t = useT();

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold">
        <span className="mr-1 text-navy/50">{t("pricing.switchCurrency")}</span>
        {CURRENCIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCurrency(c)}
            aria-pressed={c === currency}
            className={`inline-flex min-h-11 items-center rounded-full px-4 transition-colors ${
              c === currency ? "bg-navy text-white" : "text-navy/60 hover:bg-navy/10"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* The cards stretch to a shared height so the three CTAs line up. */}
      <div className="grid items-stretch gap-8 md:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.name}
            className={
              p.featured
                ? "relative flex flex-col rounded-2xl border-2 border-coral bg-pinklight/30 p-8 shadow-xl md:-translate-y-3"
                : "flex flex-col rounded-2xl border border-gray-300 p-8"
            }
          >
            {p.featured && (
              <span className="absolute -top-3 right-6 rounded-full bg-coral px-3 py-1 text-xs font-bold text-navy">
                {t("pricing.mostPopular")}
              </span>
            )}
            <h3 className="mb-1 font-heading text-lg font-bold">{p.name}</h3>
            <p className="mb-1 text-3xl font-bold">{formatPrice(p.usd, currency, t("pricing.contactUs"))}</p>
            <p className="mb-4 text-xs text-navy/50">{t(p.note as never)}</p>
            <ul className="mb-8 space-y-2 text-sm text-navy/70">
              {p.items.map((i) => (
                <li key={i}>{t(i as never)}</li>
              ))}
            </ul>
            <Link
              href="/pricing"
              className={`mt-auto block rounded-full py-3 text-center font-semibold ${
                p.featured ? "bg-coral text-navy" : "border-2 border-navy"
              }`}
            >
              {t("pricing.createGallery")}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
