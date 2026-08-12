"use client";

import { useEffect, useState } from "react";
import { useT } from "@/components/LanguageProvider";

/** Cookie consent bar, styled from the live site's wpconsent CSS variables. */
export default function ConsentBar() {
  const [open, setOpen] = useState(true);
  const [showPrefs, setShowPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const t = useT();

  useEffect(() => {
    document.body.classList.toggle("consent-open", open);
    return () => document.body.classList.remove("consent-open");
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 border-t px-5 py-2.5"
      style={{
        zIndex: "var(--wpconsent-z-index)" as unknown as number,
        background: "var(--wpconsent-background)",
        color: "var(--wpconsent-text)",
        fontSize: "var(--wpconsent-font-size)",
        borderColor: "var(--wpconsent-outline-color)",
      }}
    >
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-3 text-center">
        <span>{t("consent.text")}</span>
        <button
          onClick={() => setOpen(false)}
          className="rounded-full px-4 py-1.5"
          style={{ background: "var(--wpconsent-accept-bg)", color: "var(--wpconsent-accept-color)" }}
        >
          {t("consent.acceptAll")}
        </button>
        <button
          onClick={() => setOpen(false)}
          className="rounded-full border px-4 py-1.5"
          style={{
            background: "var(--wpconsent-cancel-bg)",
            color: "var(--wpconsent-cancel-color)",
            borderColor: "var(--wpconsent-outline-color)",
          }}
        >
          {t("consent.essential")}
        </button>
        <button
          onClick={() => setShowPrefs((v) => !v)}
          aria-expanded={showPrefs}
          className="rounded-full px-4 py-1.5"
          style={{ background: "var(--wpconsent-preferences-bg)", color: "var(--wpconsent-preferences-color)" }}
        >
          {t("consent.preferences")}
        </button>
      </div>

      {showPrefs && (
        <div className="mx-auto mt-3 flex max-w-[1200px] flex-wrap items-center justify-center gap-6 border-t pt-3" style={{ borderColor: "var(--wpconsent-outline-color)" }}>
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
            className="rounded-full px-4 py-1.5"
            style={{ background: "var(--wpconsent-accept-bg)", color: "var(--wpconsent-accept-color)" }}
          >
            {t("consent.save")}
          </button>
        </div>
      )}
    </div>
  );
}
