"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { HERO_HOME, HERO_WEDDING } from "@/data/assets";
import { EVENTS } from "@/data/events";
import { LANGS } from "@/data/i18n";
import { useLang, useT } from "@/components/LanguageProvider";
import { IconMenu2, IconX } from "@tabler/icons-react";
import Wordmark from "@/components/Wordmark";

function Dropdown({ label, items, onDark = false }: { label: string; items: { href: string; label: string }[]; onDark?: boolean }) {
  // Hover opens it on a mouse; the click toggle is what makes it work on a touch screen.
  const [open, setOpen] = useState(false);

  return (
    <div className="group relative" onMouseLeave={() => setOpen(false)} onKeyDown={(e) => e.key === "Escape" && setOpen(false)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`flex items-center gap-1.5 py-7 font-heading text-base ${onDark ? "text-white/90 hover:text-white" : "text-coral-ink"}`}
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

function LanguagePicker({ onDark = false }: { onDark?: boolean }) {
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
        className={`flex min-h-11 items-center gap-6 rounded border px-4 text-sm ${onDark ? "border-white/40 text-white" : "border-border"}`}
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

/** Height of the bar. Past this the hero is gone, so the bar has to carry its own surface. */
const BAR = 82;

/** The picture each page opens on, reused as the bar's own surface once the hero scrolls away. */
function heroFor(pathname: string) {
  if (pathname === "/") return HERO_HOME;
  if (pathname === "/weddings") return HERO_WEDDING;
  const slug = pathname.startsWith("/events/") ? pathname.slice("/events/".length) : null;
  return EVENTS.find((e) => e.slug === slug)?.hero ?? null;
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const t = useT();

  /**
   * How the page opens decides how the bar behaves.
   *  "dark"  – a photo hero: the bar sits over it in white, then paints that dark itself.
   *  "light" – a tinted hero: the bar sits over it in brand colours, then turns white.
   *  null    – no hero: a plain white bar in the flow.
   */
  const heroTone: "dark" | "light" | null =
    pathname === "/"
      ? "light"
      : pathname === "/weddings" || pathname.startsWith("/events/")
        ? "dark"
        : null;

  const overHero = heroTone !== null;
  // Only the photo heroes need white lettering; the tinted one keeps the brand colours.
  const onDark = heroTone === "dark";

  /**
   * The bar keeps the colour it opened with. Over the hero it is transparent and the
   * hero supplies the dark; once the hero is gone it paints that dark itself, so
   * scrolling back up never hands you a different-looking header.
   */
  const surface = overHero
    ? scrolled
      ? onDark
        ? "bg-navy shadow-sm"
        : "bg-white shadow-sm"
      : "bg-transparent"
    : "bg-white shadow-sm";

  const heroSrc = onDark ? heroFor(pathname) : null;

  /**
   * Reading hides the bar, reaching for it brings it back. The primary action lives
   * up here, so it has to be one gesture away on pages that run thousands of pixels.
   */
  useEffect(() => {
    let lastY = window.scrollY;
    let queued = false;

    const read = () => {
      const y = window.scrollY;
      setScrolled(y > BAR);
      // Reduced motion keeps the bar put: sliding it in and out is the motion itself.
      if (!reduced) {
        if (y <= BAR) setHidden(false);
        else if (y > lastY + 4) setHidden(true);
        else if (y < lastY - 4) setHidden(false);
      }
      lastY = y;
      queued = false;
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduced]);

  // An open menu must not slide away with the bar underneath it.
  useEffect(() => {
    if (mobileOpen) setHidden(false);
  }, [mobileOpen]);

  // The current page is marked in the nav, so the visitor can see where they are.
  const navClass = (href: string) =>
    `inline-flex min-h-11 items-center font-heading text-base ${onDark ? "text-white/90 hover:text-white" : "text-coral-ink"}${
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

  // Each entry opens the category page at its pricing section rather than at the top.
  const pricing = [
    { href: "/pricing", label: t("nav.allPricing") },
    // En dash, not em dash: it is the dash Hungarian and Romanian use between words.
    ...eventLinks.map((e) => ({ href: `${e.href}#pricing`, label: `${e.label} – ${t("nav.pricing")}` })),
  ];

  return (
    /* Dark pages: fixed, so the hero runs underneath and the bar can return over any
       content. Light pages: sticky, so the bar keeps its 82px slot in the flow and
       hiding it shifts nothing. */
    <header
      id="siteHeader"
      /* Tailwind v4 writes these utilities to the `translate` property, not `transform`,
         so naming `transform` here would leave the bar snapping instead of sliding. */
      /* No overflow clipping here: the menus open below the 82px bar, and hiding the
         overflow would cut every one of them off. The picture behind is clipped by
         its own wrapper instead. */
      className={`z-50 w-full transition-[translate,background-color] duration-300 ease-out motion-reduce:transition-none ${
        overHero ? "fixed inset-x-0 top-0" : "sticky top-0"
      } ${surface} ${hidden ? "-translate-y-full" : "translate-y-0"}`}
    >
      {/* The top slice of the page's own hero, carried up as the bar's surface. It is
          held at 30% over navy: the same recipe the hero uses to keep white text
          readable over a photograph. Hidden while the real hero is still behind it. */}
      {heroSrc && (
        <span
          aria-hidden
          className={`absolute inset-0 overflow-hidden transition-opacity duration-300 motion-reduce:transition-none ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image src={heroSrc} alt="" fill className="object-cover opacity-30" sizes="100vw" />
        </span>
      )}

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
      >
        {t("nav.skip")}
      </a>
      {/* Positioned, so it paints above the picture behind it. */}
      <div className="relative mx-auto flex h-[82px] max-w-[1440px] items-center justify-between px-6 xl:px-[88px]">
        <Link href="/" className="flex min-h-11 shrink-0 items-center">
          <Wordmark className="text-[28px]" tone={onDark ? "light" : "brand"} />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          <Dropdown label={t("nav.events")} items={eventLinks} onDark={onDark} />
          <Link href="/how-it-works" aria-current={pathname === "/how-it-works" ? "page" : undefined} className={navClass("/how-it-works")}>
            {t("nav.howItWorks")}
          </Link>
          <Dropdown label={t("nav.pricing")} items={pricing} onDark={onDark} />
          <Dropdown label={t("nav.about")} items={about} onDark={onDark} />
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

          <LanguagePicker onDark={onDark} />

          <Link
            href="/pricing"
            className="inline-flex min-h-11 items-center rounded-full bg-coral px-4 text-sm font-semibold whitespace-nowrap text-white transition hover:brightness-95 sm:px-6"
          >
            {t("nav.getStarted")}
          </Link>

          <button
            className={`-mr-2 flex h-11 w-11 items-center justify-center lg:hidden ${onDark ? "text-white" : ""}`}
            aria-label={t("nav.toggleMenu")}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <IconX className="h-6 w-6" /> : <IconMenu2 className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-border bg-white px-6 py-2 text-sm lg:hidden">
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
