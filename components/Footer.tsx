"use client";

import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconMail,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { EVENTS } from "@/data/events";
import { useT } from "@/components/LanguageProvider";
import Wordmark from "@/components/Wordmark";

/**
 * The accounts do not exist yet, so these render as marks rather than links.
 * Adding `href` back to the markup is what turns them live.
 */
const SOCIAL = [
  { name: "Instagram", Icon: IconBrandInstagram },
  { name: "Facebook", Icon: IconBrandFacebook },
  { name: "TikTok", Icon: IconBrandTiktok },
  { name: "YouTube", Icon: IconBrandYoutube },
  { name: "Email", Icon: IconMail },
];

export default function Footer() {
  const pathname = usePathname();
  const t = useT();

  const product = [
    { href: "/how-it-works", label: t("nav.howItWorks") },
    { href: "/pricing", label: t("nav.pricing") },
    { href: "/gallery", label: t("footer.gallery") },
    { href: "/gallery-demo", label: t("footer.features") },
  ];

  const events = [
    { href: "/weddings", label: t("event.weddings") },
    ...EVENTS.slice(0, 4).map((e) => ({ href: `/events/${e.slug}`, label: t(`event.${e.slug}` as never) })),
  ];

  const support = [
    { href: "/faqs", label: t("footer.helpCenter") },
    { href: "/contact", label: t("footer.contactUs") },
    { href: "/faqs", label: t("footer.privacy") },
    { href: "/faqs", label: t("footer.terms2") },
  ];

  const company = [
    { href: "/press-features", label: t("footer.about") },
    { href: "/community-events", label: t("footer.blog") },
    { href: "/contact", label: t("footer.careers") },
  ];

  const columns = [
    { title: t("footer.product"), items: product },
    { title: t("footer.events"), items: events },
    { title: t("footer.support"), items: support },
    { title: t("footer.company"), items: company },
  ];

  return (
    <footer className="bg-white pt-10 pb-6 md:pt-14">
      <div className="mx-auto max-w-[1140px] px-6">
        <div className="grid gap-10 md:grid-cols-[minmax(0,18rem)_1fr]">
          <div>
            <Link href="/" className="mb-4 inline-flex min-h-11 items-center">
              <Wordmark className="text-3xl" />
            </Link>
            <p className="mb-6 max-w-xs text-sm text-muted-foreground">{t("footer.tagline")}</p>
            <div className="flex gap-4">
              {SOCIAL.map((s) => (
                <span
                  key={s.name}
                  role="img"
                  title={s.name}
                  aria-label={s.name}
                  className="text-navy/70"
                >
                  <s.Icon className="h-5 w-5" stroke={1.75} aria-hidden />
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="mb-4 font-heading text-xs font-bold tracking-wide">{col.title}</p>
                <ul className="space-y-2.5 text-sm">
                  {col.items.map((l, i) => (
                    <li key={`${l.href}-${i}`}>
                      <Link
                        href={l.href}
                        aria-current={pathname === l.href ? "page" : undefined}
                        className={`inline-flex min-h-8 items-center hover:text-coral-ink ${
                          pathname === l.href ? "font-semibold text-coral-ink" : "text-muted-foreground"
                        }`}
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-navy/10 pt-6 text-xs text-muted-foreground sm:flex-row">
          <span>© 2026 Memovo. {t("footer.rights")}</span>
          <span className="flex items-center gap-1">
            {t("footer.madeWith")} <span className="text-coral">♥</span> {t("footer.forMemories")}
          </span>
        </div>
      </div>
    </footer>
  );
}
