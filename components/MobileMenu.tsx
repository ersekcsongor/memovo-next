"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { IconChevronDown, IconX, type Icon } from "@tabler/icons-react";
import Wordmark from "@/components/Wordmark";
import { useAuth } from "@/components/AuthProvider";
import { useLang, useT } from "@/components/LanguageProvider";
import { LANGS } from "@/data/i18n";
import { cn } from "@/lib/utils";

export type MenuLink = { href: string; label: string };
export type MenuGroup = { label: string; Icon: Icon; items: MenuLink[] };
export type MenuEntry = (MenuLink & { Icon: Icon }) | MenuGroup;

function isGroup(entry: MenuEntry): entry is MenuGroup {
  return "items" in entry;
}

/**
 * Whether an entry leads to the page being read. Anchored entries never claim it:
 * `/weddings#pricing` is a section of the Weddings page, and the Events group
 * already marks that page, so counting it would light two groups at once.
 */
function leadsHere(href: string, pathname: string) {
  return href === pathname;
}

/**
 * The menu a phone gets: a panel that comes in from the right over a dimmed page,
 * with the long lists folded into groups so the whole site fits without scrolling
 * past fifteen identical rows.
 *
 * Rendered into the body rather than the header, so it clears the header's own
 * stacking context and lands above the consent bar.
 */
export default function MobileMenu({
  open,
  onClose,
  entries,
  returnFocusTo,
}: {
  open: boolean;
  onClose: () => void;
  entries: MenuEntry[];
  /** The button that opened the panel, so closing hands the focus back to it. */
  returnFocusTo?: RefObject<HTMLButtonElement | null>;
}) {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const { user, ready } = useAuth();
  const { lang, setLang } = useLang();
  const t = useT();

  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  /* The header rebuilds both of these on every one of its own renders, so the
     effects below read them through refs. Listing them as dependencies would tear
     the panel down and set it up again mid-use: the focus would jump back to the
     hamburger and an unfolded group would collapse the moment the language changed. */
  const latest = useRef({ onClose, entries });
  latest.current = { onClose, entries };

  // Portals need a DOM, so the first render on the server produces nothing.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  /* Which group is unfolded, held by position rather than by its label: the labels
     are translated, so naming one would fold the group shut on a language change.
     The group holding the current page opens itself, so the panel lands showing
     where the visitor already is. */
  const [openGroup, setOpenGroup] = useState<number | null>(null);
  useEffect(() => {
    if (!open) return;
    const owner = latest.current.entries.findIndex(
      (e) => isGroup(e) && e.items.some((i) => leadsHere(i.href, pathname)),
    );
    setOpenGroup(owner === -1 ? null : owner);
  }, [open, pathname]);

  /* At desktop width the header carries the whole menu itself. Closing rather than
     hiding keeps the scroll lock from outliving a panel nobody can see. */
  useEffect(() => {
    if (!open) return;
    const wide = window.matchMedia("(min-width: 1024px)");
    if (wide.matches) latest.current.onClose();
    const onChange = (e: MediaQueryListEvent) => e.matches && latest.current.onClose();
    wide.addEventListener("change", onChange);
    return () => wide.removeEventListener("change", onChange);
  }, [open]);

  // The page behind must not scroll under the panel.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  /* Escape closes, and Tab stays inside the panel: it covers the page, so leaving
     the focus loose would walk it through content nobody can see. */
  useEffect(() => {
    if (!open) return;
    const opener = returnFocusTo?.current ?? null;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        latest.current.onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [open, returnFocusTo]);

  if (!mounted) return null;

  const rowBase =
    "flex min-h-12 items-center gap-3 rounded-xl px-3 text-[15px] transition-colors";
  const rowIdle = "text-navy hover:bg-blush";
  const rowActive = "bg-blush font-semibold text-coral-ink";

  /* One list, entering as one movement: the panel slides, the rows arrive a beat
     behind it. Under reduced motion `initial={false}` skips straight to the end
     state, so the same variants serve both. */
  const list: Variants = {
    hidden: {},
    shown: { transition: { staggerChildren: 0.035, delayChildren: 0.08 } },
  };
  const row: Variants = {
    hidden: { opacity: 0, x: 16 },
    shown: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.22, 0.61, 0.36, 1] } },
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="lg:hidden">
          <motion.button
            type="button"
            aria-label={t("nav.toggleMenu")}
            onClick={onClose}
            className="fixed inset-0 z-[65] bg-navy/50 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.2 }}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={t("nav.toggleMenu")}
            className="fixed inset-y-0 right-0 z-[66] flex w-[min(22rem,88vw)] flex-col bg-white shadow-2xl"
            initial={{ x: reduced ? 0 : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: reduced ? 0 : "100%" }}
            transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 40 }}
          >
            {/* The brand stays in view while the menu is open, so the panel reads as
                part of the site instead of a system sheet. */}
            <div className="flex items-center justify-between border-b border-border bg-gradient-to-b from-cream to-white px-4 py-3">
              <Link href="/" onClick={onClose} className="flex min-h-11 items-center">
                <Wordmark className="text-[24px]" />
              </Link>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label={t("nav.toggleMenu")}
                className="flex h-11 w-11 items-center justify-center rounded-full text-navy transition hover:bg-blush"
              >
                <IconX className="h-5 w-5" />
              </button>
            </div>

            <motion.nav
              variants={list}
              initial={reduced ? false : "hidden"}
              animate="shown"
              className="flex-1 space-y-0.5 overflow-y-auto overscroll-contain px-3 py-3"
            >
              {entries.map((entry, index) => {
                if (!isGroup(entry)) {
                  const current = leadsHere(entry.href, pathname);
                  return (
                    <motion.div key={entry.href} variants={row}>
                      <Link
                        href={entry.href}
                        onClick={onClose}
                        aria-current={current ? "page" : undefined}
                        className={cn(rowBase, current ? rowActive : rowIdle)}
                      >
                        <entry.Icon className={cn("h-5 w-5 shrink-0", current ? "text-coral" : "text-muted-foreground")} />
                        {entry.label}
                      </Link>
                    </motion.div>
                  );
                }

                const unfolded = openGroup === index;
                const holdsCurrent = entry.items.some((i) => leadsHere(i.href, pathname));
                return (
                  <motion.div key={entry.label} variants={row}>
                    <button
                      type="button"
                      onClick={() => setOpenGroup(unfolded ? null : index)}
                      aria-expanded={unfolded}
                      className={cn(rowBase, "w-full", holdsCurrent ? rowActive : rowIdle)}
                    >
                      <entry.Icon className={cn("h-5 w-5 shrink-0", holdsCurrent ? "text-coral" : "text-muted-foreground")} />
                      {entry.label}
                      <IconChevronDown
                        className={cn(
                          "ml-auto h-4 w-4 text-muted-foreground transition-transform duration-200 motion-reduce:transition-none",
                          unfolded && "rotate-180",
                        )}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {unfolded && (
                        <motion.div
                          initial={reduced ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                          transition={{ duration: reduced ? 0 : 0.24, ease: [0.22, 0.61, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          {/* The rule down the left ties the children to the group they
                              belong to, so a folded-out list never reads as top level. */}
                          <div className="my-1 ml-[1.55rem] space-y-0.5 border-l border-border pl-3">
                            {entry.items.map((item) => {
                              const current = leadsHere(item.href, pathname);
                              return (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  onClick={onClose}
                                  aria-current={current ? "page" : undefined}
                                  className={cn(
                                    "flex min-h-11 items-center rounded-lg px-3 text-sm transition-colors",
                                    current
                                      ? "bg-blush font-semibold text-coral-ink"
                                      : "text-muted-foreground hover:bg-blush hover:text-navy",
                                  )}
                                >
                                  {item.label}
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.nav>

            {/* Language and the two account actions sit at the bottom, in thumb reach
                and out of the way of the pages themselves. */}
            <div className="border-t border-border px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <div className="mb-3 flex gap-1 rounded-full bg-blush p-1" role="group" aria-label={t("nav.language")}>
                {LANGS.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => setLang(l.code)}
                    aria-pressed={l.code === lang}
                    className={cn(
                      "flex min-h-9 flex-1 items-center justify-center rounded-full text-xs font-semibold transition",
                      l.code === lang ? "bg-white text-coral-ink shadow-sm" : "text-muted-foreground",
                    )}
                  >
                    {l.short}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                {ready && user ? (
                  <Link
                    href="/account"
                    onClick={onClose}
                    className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full border border-border text-sm font-semibold text-navy transition hover:bg-cream"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-coral text-[11px] font-bold text-white">
                      {user.name.trim().slice(0, 1).toUpperCase()}
                    </span>
                    {t("auth.accountHeading")}
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    onClick={onClose}
                    className="flex min-h-11 flex-1 items-center justify-center rounded-full border border-border text-sm font-semibold text-navy transition hover:bg-cream"
                  >
                    {t("auth.signIn")}
                  </Link>
                )}
                <Link
                  href="/pricing"
                  onClick={onClose}
                  className="flex min-h-11 flex-1 items-center justify-center rounded-full bg-coral px-4 text-center text-sm font-semibold text-white transition hover:brightness-95"
                >
                  {t("nav.getStarted")}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
