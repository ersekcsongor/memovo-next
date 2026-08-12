"use client";

import Link from "next/link";
import { useState } from "react";
import { EVENTS } from "@/data/events";
import { LANGS } from "@/data/i18n";
import { useLang, useT } from "@/components/LanguageProvider";
import Wordmark from "@/components/Wordmark";

function Dropdown({ label, items }: { label: string; items: { href: string; label: string }[] }) {
  // Hover opens it on a mouse; the click toggle is what makes it work on a touch screen.
  const [open, setOpen] = useState(false);

  return (
    <div className="group relative" onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex items-center gap-1.5 py-7 font-heading text-base text-coral"
      >
        {label}
        <svg viewBox="0 0 12 8" className="h-2 w-3" fill="none" aria-hidden>
          <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      <div
        className={`absolute top-full left-0 z-50 w-60 rounded-lg bg-white py-2 shadow-xl group-hover:block ${
          open ? "block" : "hidden"
        }`}
      >
        {items.map((i) => (
          <Link
            key={i.href}
            href={i.href}
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm text-navy hover:bg-cream"
          >
            {i.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function LanguagePicker() {
  const { lang, setLang } = useLang();
  const t = useT();
  const [open, setOpen] = useState(false);
  const current = LANGS.find((l) => l.code === lang) ?? LANGS[0];

  return (
    <div className="group relative hidden sm:block" onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={t("nav.language")}
        className="flex items-center gap-6 rounded border border-gray-300 px-4 py-2 text-sm"
      >
        {current.short}
        <span className="text-base leading-none">›</span>
      </button>
      <div
        className={`absolute top-full right-0 z-50 w-36 rounded-lg bg-white py-2 shadow-xl group-hover:block ${
          open ? "block" : "hidden"
        }`}
      >
        {LANGS.map((l) => (
          <button
            key={l.code}
            type="button"
            onClick={() => {
              setLang(l.code);
              setOpen(false);
            }}
            aria-pressed={l.code === lang}
            className={`block w-full px-4 py-2 text-left text-sm hover:bg-cream ${
              l.code === lang ? "font-semibold text-coral" : "text-navy"
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useT();

  const eventLinks = [
    { href: "/weddings", label: t("event.weddings") },
    ...EVENTS.map((e) => ({ href: `/events/${e.slug}`, label: t(`event.${e.slug}` as never) })),
  ];

  const about = [
    { href: "/our-story", label: t("about.ourStory") },
    { href: "/meet-the-founders", label: t("about.founders") },
    { href: "/press-features", label: t("about.press") },
    { href: "/community-events", label: t("about.community") },
    { href: "/reviews", label: t("footer.reviews") },
  ];

  const pricing = [
    { href: "/pricing", label: t("nav.allPricing") },
    // En dash, not em dash: it is the dash Hungarian and Romanian use between words.
    ...eventLinks.map((e) => ({ ...e, label: `${e.label} – ${t("nav.pricing")}` })),
  ];

  return (
    <header id="siteHeader" className="w-full bg-white">
      <div className="mx-auto flex h-[82px] max-w-[1440px] items-center justify-between px-6 xl:px-[88px]">
        <Link href="/" className="shrink-0">
          <Wordmark className="text-[28px]" />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          <Dropdown label={t("nav.events")} items={eventLinks} />
          <Link href="/how-it-works" className="font-heading text-base text-coral">
            {t("nav.howItWorks")}
          </Link>
          <Dropdown label={t("nav.pricing")} items={pricing} />
          <Dropdown label={t("nav.about")} items={about} />
          <Link href="/faqs" className="font-heading text-base text-coral">
            {t("nav.helpCenter")}
          </Link>
          <Link href="/gallery-demo" className="font-heading text-base text-coral">
            {t("nav.gallery")}
          </Link>
          <Link href="/gallery" className="font-heading text-base text-coral">
            {t("nav.photoGallery")}
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            aria-label={t("nav.account")}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-coral text-white"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
              <circle cx="12" cy="8" r="3.6" />
              <path d="M4.5 20c0-3.6 3.4-6 7.5-6s7.5 2.4 7.5 6z" />
            </svg>
          </Link>

          <LanguagePicker />

          <Link
            href="/pricing"
            className="rounded border border-coral px-5 py-2.5 text-base whitespace-nowrap text-coral"
          >
            {t("nav.getStarted")}
          </Link>

          <button
            className="text-2xl leading-none lg:hidden"
            aria-label={t("nav.toggleMenu")}
            onClick={() => setMobileOpen((v) => !v)}
          >
            ☰
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="space-y-3 border-t border-gray-300/60 px-6 py-4 text-sm lg:hidden">
          <Link href="/" className="block">
            {t("nav.home")}
          </Link>
          {eventLinks.map((i) => (
            <Link key={i.href} href={i.href} className="block">
              {i.label}
            </Link>
          ))}
          <Link href="/how-it-works" className="block">
            {t("nav.howItWorks")}
          </Link>
          <Link href="/pricing" className="block">
            {t("nav.pricing")}
          </Link>
          <Link href="/contact" className="block">
            {t("nav.contact")}
          </Link>
          <Link href="/faqs" className="block">
            {t("nav.helpCenter")}
          </Link>
          <Link href="/gallery-demo" className="block">
            {t("nav.gallery")}
          </Link>
          <Link href="/gallery" className="block">
            {t("nav.photoGallery")}
          </Link>
        </nav>
      )}
    </header>
  );
}
