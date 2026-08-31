"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CURRENCIES, type Currency, formatPrice } from "@/data/currency";
import { type Plan } from "@/data/content";
import { useT } from "@/components/LanguageProvider";
import { Reveal } from "@/components/Reveal";

function Check() {
  return (
    <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 text-coral" fill="none" aria-hidden>
      <path d="M4 10.5l4 4 8-9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Owns the selected currency so switching re-renders the cards in place,
 * with no page reload and no round trip to the server.
 */
export function PricingSection({ plans }: { plans: Plan[] }) {
  const [currency, setCurrency] = useState<Currency>("USD");
  const reduced = useReducedMotion();
  const t = useT();

  return (
    <>
      <div className="mb-8 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold">
        <span className="mr-1 text-muted-foreground">{t("pricing.switchCurrency")}</span>
        {CURRENCIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCurrency(c)}
            aria-pressed={c === currency}
            className={`relative inline-flex min-h-11 items-center rounded-full px-4 transition-colors ${
              c === currency ? "text-white" : "text-muted-foreground hover:bg-blush"
            }`}
          >
            {/* The filled pill slides from the old currency to the new one, so the
                switch is one movement rather than two separate colour changes.
                It sits before the label and the label is positioned, rather than
                pushing the pill behind with a negative z-index: that puts it
                behind the button's own layer, and the white label was left on the
                white page with nothing behind it. */}
            {c === currency && (
              <motion.span
                layoutId="currencyPill"
                aria-hidden
                className="absolute inset-0 rounded-full bg-coral"
                initial={false}
                transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 320, damping: 30 }}
              />
            )}
            <span className="relative">{c}</span>
          </button>
        ))}
      </div>

      {/* The cards stretch to a shared height so the three CTAs line up. */}
      <div className="grid items-stretch gap-8 md:grid-cols-3">
        {plans.map((p, i) => (
          <Reveal
            key={p.name}
            index={i}
            className={
              p.featured
                ? "relative flex flex-col rounded-2xl border-2 border-coral bg-white p-8 shadow-xl md:-translate-y-3"
                : "flex flex-col rounded-2xl border border-border bg-white p-8"
            }
          >
            {p.featured && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-coral px-4 py-1 text-xs font-semibold whitespace-nowrap text-white">
                {t("pricing.mostPopular")}
              </span>
            )}
            <h2 className="font-heading text-lg font-bold">{p.name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{t(p.note as never)}</p>
            {/* Keyed on the currency, so a switch remounts the figure and it lifts
                into place instead of blinking to a new number. The three cards
                land a beat apart, which reads as one movement across the row.
                No exit animation: the amount never leaves the layout, so the line
                cannot collapse and shunt the unit beside it. */}
            <p aria-live="polite" className="mt-5 mb-6 flex items-baseline gap-1.5">
              <motion.span
                key={currency}
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduced ? 0 : 0.28, delay: reduced ? 0 : i * 0.06, ease: [0.22, 0.61, 0.36, 1] }}
                className="text-4xl font-bold text-coral"
              >
                {formatPrice(p.usd, currency, t("pricing.contactUs"))}
              </motion.span>
              {p.usd !== null && <span className="text-sm text-muted-foreground">{t("plan.perEvent")}</span>}
            </p>
            <ul className="mb-8 space-y-3 text-sm">
              {p.items.map((i) => (
                <li key={i} className="flex gap-2.5">
                  <Check />
                  <span>{t(i as never)}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className={`mt-auto flex min-h-11 items-center justify-center rounded-full font-semibold transition ${
                p.featured
                  ? "bg-coral text-white hover:brightness-95"
                  : "border-2 border-coral text-coral-ink hover:bg-blush"
              }`}
            >
              {t((p.cta ?? "pricing.createGallery") as never)}
            </Link>
          </Reveal>
        ))}
      </div>
    </>
  );
}
