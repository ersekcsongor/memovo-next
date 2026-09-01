"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { HERO_HOME, HERO_WEDDING } from "@/data/assets";
import { EVENTS } from "@/data/events";
import { useAuth } from "@/components/AuthProvider";
import { Lamp } from "@/components/ui/tubelight-navbar";
import { LANGS } from "@/data/i18n";
import { useLang, useT } from "@/components/LanguageProvider";
import {
  IconCalendarHeart,
  IconCamera,
  IconHelpCircle,
  IconHome,
  IconMail,
  IconMenu2,
  IconPhoto,
  IconRoute,
  IconTag,
  IconUsers,
  IconX,
} from "@tabler/icons-react";
import Wordmark from "@/components/Wordmark";
import MobileMenu, { type MenuEntry } from "@/components/MobileMenu";

function Dropdown({
  label,
  items,
  onDark = false,
  active = false,
  reduced = false,
}: {
  label: string;
  items: { href: string; label: string }[];
  onDark?: boolean;
  /** True while the visitor is on a page this menu opens. */
  active?: boolean;
  reduced?: boolean;
}) {
  // Hover opens it on a mouse; the click toggle is what makes it work on a touch screen.
  const [open, setOpen] = useState(false);

  return (
    <div className="group relative" onMouseLeave={() => setOpen(false)} onKeyDown={(e) => e.key === "Escape" && setOpen(false)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`relative flex h-[68px] items-center gap-1.5 px-3 font-heading text-[15px] font-medium ${onDark ? "text-white/90 hover:text-white" : "text-coral-ink"}`}
      >
        {label}
        {active && <Lamp layoutId="headerLamp" edge="bottom" reduced={reduced} />}
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
const BAR = 68;

/** The picture each page opens on, reused as the bar's own surface once the hero scrolls away. */
function heroFor(pathname: string) {
  if (pathname === "/") return HERO_HOME;
  if (pathname === "/weddings") return HERO_WEDDING;
  const slug = pathname.startsWith("/events/") ? pathname.slice("/events/".length) : null;
  return EVENTS.find((e) => e.slug === slug)?.hero ?? null;
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const { user, ready } = useAuth();
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
  /* The lamp marks the current page now, so the link only carries colour. */
  const navClass = () =>
    `relative inline-flex h-[68px] items-center px-3 font-heading text-[15px] font-medium ${onDark ? "text-white/90 hover:text-white" : "text-coral-ink"}`;

  /* Which menu owns the page. A dropdown has no route of its own, so it names
     the sections it opens. */
  const inSection = (prefixes: string[]) =>
    prefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));

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

  /* The same site the desktop bar carries, folded for a phone: the three long
     lists become groups, everything else stays one tap away. */
  const mobileEntries: MenuEntry[] = [
    { href: "/", label: t("nav.home"), Icon: IconHome },
    { label: t("nav.events"), Icon: IconCalendarHeart, items: eventLinks },
    { href: "/how-it-works", label: t("nav.howItWorks"), Icon: IconRoute },
    { label: t("nav.pricing"), Icon: IconTag, items: pricing },
    { label: t("nav.about"), Icon: IconUsers, items: about },
    { href: "/gallery-demo", label: t("nav.gallery"), Icon: IconPhoto },
    { href: "/gallery", label: t("nav.photoGallery"), Icon: IconCamera },
    { href: "/faqs", label: t("nav.helpCenter"), Icon: IconHelpCircle },
    { href: "/contact", label: t("nav.contact"), Icon: IconMail },
  ];

  return (
    /* Dark pages: fixed, so the hero runs underneath and the bar can return over any
       content. Light pages: sticky, so the bar keeps its 68px slot in the flow and
       hiding it shifts nothing. */
    <header
      id="siteHeader"
      /* Tailwind v4 writes these utilities to the `translate` property, not `transform`,
         so naming `transform` here would leave the bar snapping instead of sliding. */
      /* No overflow clipping here: the menus open below the 68px bar, and hiding the
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
      <div className="relative mx-auto flex h-[68px] max-w-[1280px] items-center justify-between gap-6 px-6">
        <Link href="/" className="flex min-h-11 shrink-0 items-center">
          <Wordmark className="text-[28px]" tone={onDark ? "light" : "brand"} />
        </Link>

        <nav className="hidden items-center lg:flex">
          <Dropdown
            label={t("nav.events")}
            items={eventLinks}
            onDark={onDark}
            active={inSection(["/weddings", "/events"])}
            reduced={!!reduced}
          />
          <Link href="/how-it-works" aria-current={pathname === "/how-it-works" ? "page" : undefined} className={navClass()}>
            {t("nav.howItWorks")}
            {pathname === "/how-it-works" && <Lamp layoutId="headerLamp" edge="bottom" reduced={!!reduced} />}
          </Link>
          <Dropdown
            label={t("nav.pricing")}
            items={pricing}
            onDark={onDark}
            active={inSection(["/pricing"])}
            reduced={!!reduced}
          />
          <Dropdown
            label={t("nav.about")}
            items={about}
            onDark={onDark}
            active={inSection(["/press-features", "/community-events", "/reviews"])}
            reduced={!!reduced}
          />
          <Link href="/faqs" aria-current={pathname === "/faqs" ? "page" : undefined} className={navClass()}>
            {t("nav.helpCenter")}
            {pathname === "/faqs" && <Lamp layoutId="headerLamp" edge="bottom" reduced={!!reduced} />}
          </Link>
          <Link href="/gallery-demo" aria-current={pathname === "/gallery-demo" ? "page" : undefined} className={navClass()}>
            {t("nav.gallery")}
            {pathname === "/gallery-demo" && <Lamp layoutId="headerLamp" edge="bottom" reduced={!!reduced} />}
          </Link>
          <Link href="/gallery" aria-current={pathname === "/gallery" ? "page" : undefined} className={navClass()}>
            {t("nav.photoGallery")}
            {pathname === "/gallery" && <Lamp layoutId="headerLamp" edge="bottom" reduced={!!reduced} />}
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <LanguagePicker onDark={onDark} />

          {/* Signed out the bar offers a way in beside the way to buy; signed in the
              circle takes that place, so the row never carries both. `ready` keeps
              it from flickering between the two. */}
          {ready && user ? (
            <Link
              href="/account"
              aria-label={t("auth.accountHeading")}
              className="flex h-11 w-11 items-center justify-center"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-coral text-xs font-bold text-white">
                {user.name.trim().slice(0, 1).toUpperCase()}
              </span>
            </Link>
          ) : (
            <Link
              href="/login"
              className={`hidden min-h-11 items-center rounded-full border px-5 text-sm font-semibold whitespace-nowrap transition sm:inline-flex ${
                onDark ? "border-white/40 text-white hover:bg-white/10" : "border-border text-navy hover:bg-cream"
              }`}
            >
              {t("auth.signIn")}
            </Link>
          )}

          <Link
            href="/pricing"
            className="inline-flex min-h-11 items-center rounded-full bg-coral px-5 text-sm font-semibold whitespace-nowrap text-white transition hover:brightness-95"
          >
            {t("nav.getStarted")}
          </Link>

          <button
            ref={menuButtonRef}
            className={`-mr-2 flex h-11 w-11 items-center justify-center lg:hidden ${onDark ? "text-white" : ""}`}
            aria-label={t("nav.toggleMenu")}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <IconX className="h-6 w-6" /> : <IconMenu2 className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        entries={mobileEntries}
        returnFocusTo={menuButtonRef}
      />
    </header>
  );
}
