"use client";

import { useEffect, useRef, useState } from "react";
import { useT } from "@/components/LanguageProvider";

/** Cookie consent bar, styled from the live site's consent CSS variables. */
export default function ConsentBar() {
  const [open, setOpen] = useState(true);
  const [showPrefs, setShowPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const t = useT();

  const barRef = useRef<HTMLDivElement>(null);

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
          onClick={() => setOpen(false)}
          className="inline-flex min-h-11 items-center rounded-full px-4"
          style={{ background: "var(--consent-accept-bg)", color: "var(--consent-accept-color)" }}
        >
          {t("consent.acceptAll")}
        </button>
        <button
          onClick={() => setOpen(false)}
          className="inline-flex min-h-11 items-center rounded-full border px-4"
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
          className="inline-flex min-h-11 items-center rounded-full px-4"
          style={{ background: "var(--consent-preferences-bg)", color: "var(--consent-preferences-color)" }}
        >
          {t("consent.preferences")}
        </button>
      </div>

      {showPrefs && (
        <div className="mx-auto mt-3 flex max-w-[1200px] flex-wrap items-center justify-center gap-6 border-t pt-3" style={{ borderColor: "var(--consent-outline-color)" }}>
          <label className="flex items-center gap-2 opacity-60">
            <input type="checkbox" checked readOnly />
            {t("consent.essentialCookies")}
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} />
            {t("consent.analyticsCookies")}
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} />
            {t("consent.marketingCookies")}
          </label>
          <button
            onClick={() => setOpen(false)}
            className="inline-flex min-h-11 items-center rounded-full px-4"
            style={{ background: "var(--consent-accept-bg)", color: "var(--consent-accept-color)" }}
          >
            {t("consent.save")}
          </button>
        </div>
      )}
    </div>
  );
}
