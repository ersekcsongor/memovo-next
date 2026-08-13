"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { EVENTS } from "@/data/events";
import { LANGS } from "@/data/i18n";
import { useLang, useT } from "@/components/LanguageProvider";
import { IconMenu2, IconX } from "@tabler/icons-react";
import Wordmark from "@/components/Wordmark";

function Dropdown({ label, items }: { label: string; items: { href: string; label: string }[] }) {
  // Hover opens it on a mouse; the click toggle is what makes it work on a touch screen.
  const [open, setOpen] = useState(false);

  return (
    <div className="group relative" onMouseLeave={() => setOpen(false)} onKeyDown={(e) => e.key === "Escape" && setOpen(false)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex items-center gap-1.5 py-7 font-heading text-base text-coral-ink"
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
            className="flex min-h-11 items-center px-4 text-sm text-navy hover:bg-cream"
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
    <div className="group relative hidden sm:block" onMouseLeave={() => setOpen(false)} onKeyDown={(e) => e.key === "Escape" && setOpen(false)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={t("nav.language")}
        className="flex min-h-11 items-center gap-6 rounded border border-gray-300 px-4 text-sm"
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
            className={`flex min-h-11 w-full items-center px-4 text-left text-sm hover:bg-cream ${
              l.code === lang ? "font-semibold text-coral-ink" : "text-navy"
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
  const pathname = usePathname();
  const t = useT();

  // The current page is marked in the nav, so the visitor can see where they are.
  const navClass = (href: string) =>
    `inline-flex min-h-11 items-center font-heading text-base text-coral-ink${
      pathname === href ? " underline decoration-2 underline-offset-8" : ""
    }`;

  const eventLinks = [
    { href: "/weddings", label: t("event.weddings") },
    ...EVENTS.map((e) => ({ href: `/events/${e.slug}`, label: t(`event.${e.slug}` as never) })),
  ];

  const about = [
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
    <header id="siteHeader" className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
      >
        {t("nav.skip")}
      </a>
      <div className="mx-auto flex h-[82px] max-w-[1440px] items-center justify-between px-6 xl:px-[88px]">
        <Link href="/" className="flex min-h-11 shrink-0 items-center">
          <Wordmark className="text-[28px]" />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          <Dropdown label={t("nav.events")} items={eventLinks} />
          <Link href="/how-it-works" aria-current={pathname === "/how-it-works" ? "page" : undefined} className={navClass("/how-it-works")}>
            {t("nav.howItWorks")}
          </Link>
          <Dropdown label={t("nav.pricing")} items={pricing} />
          <Dropdown label={t("nav.about")} items={about} />
          <Link href="/faqs" aria-current={pathname === "/faqs" ? "page" : undefined} className={navClass("/faqs")}>
            {t("nav.helpCenter")}
          </Link>
          <Link href="/gallery-demo" aria-current={pathname === "/gallery-demo" ? "page" : undefined} className={navClass("/gallery-demo")}>
            {t("nav.gallery")}
          </Link>
          <Link href="/gallery" aria-current={pathname === "/gallery" ? "page" : undefined} className={navClass("/gallery")}>
            {t("nav.photoGallery")}
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/contact"
            aria-label={t("nav.account")}
            className="flex h-11 w-11 items-center justify-center text-navy"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-coral"><svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
              <circle cx="12" cy="8" r="3.6" />
              <path d="M4.5 20c0-3.6 3.4-6 7.5-6s7.5 2.4 7.5 6z" />
            </svg></span>
          </Link>

          <LanguagePicker />

          <Link
            href="/pricing"
            className="inline-flex min-h-11 items-center rounded border border-coral px-3 text-sm whitespace-nowrap text-coral-ink sm:px-5 sm:text-base"
          >
            {t("nav.getStarted")}
          </Link>

          <button
            className="-mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
            aria-label={t("nav.toggleMenu")}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <IconX className="h-6 w-6" /> : <IconMenu2 className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-gray-300/60 px-6 py-2 text-sm lg:hidden">
          <Link href="/" aria-current={pathname === "/" ? "page" : undefined} className="flex min-h-11 items-center aria-[current=page]:font-semibold">
            {t("nav.home")}
          </Link>
          {eventLinks.map((i) => (
            <Link key={i.href} href={i.href} aria-current={pathname === i.href ? "page" : undefined} className="flex min-h-11 items-center aria-[current=page]:font-semibold">
              {i.label}
            </Link>
          ))}
          <Link href="/how-it-works" className="flex min-h-11 items-center aria-[current=page]:font-semibold">
            {t("nav.howItWorks")}
          </Link>
          <Link href="/pricing" className="flex min-h-11 items-center aria-[current=page]:font-semibold">
            {t("nav.pricing")}
          </Link>
          <Link href="/contact" className="flex min-h-11 items-center aria-[current=page]:font-semibold">
            {t("nav.contact")}
          </Link>
          <Link href="/faqs" className="flex min-h-11 items-center aria-[current=page]:font-semibold">
            {t("nav.helpCenter")}
          </Link>
          <Link href="/gallery-demo" className="flex min-h-11 items-center aria-[current=page]:font-semibold">
            {t("nav.gallery")}
          </Link>
          <Link href="/gallery" className="flex min-h-11 items-center aria-[current=page]:font-semibold">
            {t("nav.photoGallery")}
          </Link>
        </nav>
      )}
    </header>
  );
}
