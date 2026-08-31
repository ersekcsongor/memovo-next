"use client";

import { useEffect, useRef, useState } from "react";
import { useT } from "@/components/LanguageProvider";

const STORAGE_KEY = "memovo-consent";

type Consent = { analytics: boolean; marketing: boolean; at: string };

/** What the visitor last chose, or null if they have not been asked yet. */
export function readConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const saved = JSON.parse(raw) as Partial<Consent>;
    return { analytics: !!saved.analytics, marketing: !!saved.marketing, at: String(saved.at ?? "") };
  } catch {
    // A corrupt record is no record: ask again rather than assume.
    return null;
  }
}

/** Cookie consent bar. Every colour comes from the consent tokens in globals.css. */
export default function ConsentBar() {
  /* Starts closed and opens only once the stored choice has been read. Starting
     open would flash the bar at everyone who already answered. */
  const [open, setOpen] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const t = useT();

  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = readConsent();
    if (!saved) {
      setOpen(true);
      return;
    }
    setAnalytics(saved.analytics);
    setMarketing(saved.marketing);
  }, []);

  /** Records the answer so the bar stops asking, and closes it. */
  function save(choice: { analytics: boolean; marketing: boolean }) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...choice, at: new Date().toISOString() }));
    } catch {
      // Storage can be blocked. Closing the bar for this visit is still better
      // than refusing to accept an answer at all.
    }
    setAnalytics(choice.analytics);
    setMarketing(choice.marketing);
    setOpen(false);
  }

  // The bar is fixed to the bottom, so the page reserves exactly its height underneath.
  useEffect(() => {
    document.body.classList.toggle("consent-open", open);
    if (!open) {
      document.body.style.removeProperty("--consent-height");
      return;
    }
    const el = barRef.current;
    if (!el) return;
    const publish = () => document.body.style.setProperty("--consent-height", `${el.offsetHeight}px`);
    publish();
    const ro = new ResizeObserver(publish);
    ro.observe(el);
    return () => {
      ro.disconnect();
      document.body.classList.remove("consent-open");
      document.body.style.removeProperty("--consent-height");
    };
  }, [open, showPrefs]);

  if (!open) return null;

  return (
    <div
      ref={barRef}
      className="fixed inset-x-0 bottom-0 border-t px-5 py-2.5"
      style={{
        zIndex: "var(--consent-z-index)" as unknown as number,
        background: "var(--consent-background)",
        color: "var(--consent-text)",
        fontSize: "var(--consent-font-size)",
        borderColor: "var(--consent-outline-color)",
      }}
    >
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-3 text-center">
        <span>{t("consent.text")}</span>
        <button
          onClick={() => save({ analytics: true, marketing: true })}
          className="inline-flex min-h-11 items-center rounded-full px-4 transition hover:brightness-95"
          style={{ background: "var(--consent-accept-bg)", color: "var(--consent-accept-color)" }}
        >
          {t("consent.acceptAll")}
        </button>
        <button
          onClick={() => save({ analytics: false, marketing: false })}
          className="inline-flex min-h-11 items-center rounded-full border px-4 transition hover:brightness-95"
          style={{
            background: "var(--consent-cancel-bg)",
            color: "var(--consent-cancel-color)",
            borderColor: "var(--consent-outline-color)",
          }}
        >
          {t("consent.essential")}
        </button>
        <button
          onClick={() => setShowPrefs((v) => !v)}
          aria-expanded={showPrefs}
          className="inline-flex min-h-11 items-center rounded-full border px-4 transition hover:brightness-95"
          style={{
            background: "var(--consent-preferences-bg)",
            color: "var(--consent-preferences-color)",
            borderColor: "var(--consent-outline-color)",
          }}
        >
          {t("consent.preferences")}
        </button>
      </div>

      {showPrefs && (
        <div className="mx-auto mt-3 flex max-w-[1200px] flex-wrap items-center justify-center gap-6 border-t pt-3" style={{ borderColor: "var(--consent-outline-color)" }}>
          {/* accent-coral keeps the ticks in the brand pink; the browser default is blue. */}
          <label className="flex items-center gap-2 opacity-60">
            <input type="checkbox" checked readOnly className="accent-coral" />
            {t("consent.essentialCookies")}
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              className="accent-coral"
            />
            {t("consent.analyticsCookies")}
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
              className="accent-coral"
            />
            {t("consent.marketingCookies")}
          </label>
          <button
            onClick={() => save({ analytics, marketing })}
            className="inline-flex min-h-11 items-center rounded-full px-4 transition hover:brightness-95"
            style={{ background: "var(--consent-accept-bg)", color: "var(--consent-accept-color)" }}
          >
            {t("consent.save")}
          </button>
        </div>
      )}
    </div>
  );
}
