"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { EVENTS } from "@/data/events";
import { useT } from "@/components/LanguageProvider";
import Wordmark from "@/components/Wordmark";

const SOCIAL = [
  { name: "Instagram", href: "https://www.instagram.com/memovo/" },
  { name: "Facebook", href: "https://www.facebook.com/memovo" },
  { name: "Pinterest", href: "https://www.pinterest.com.au/memovo/" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/memovo/" },
  { name: "TikTok", href: "https://www.tiktok.com/@memovo" },
  { name: "YouTube", href: "https://www.youtube.com/@memovo" },
];

export default function Footer() {
  // The live site paints the home footer cream and every other page's footer pink.
  const isHome = usePathname() === "/";
  const t = useT();

  const quick = [
    { href: "/", label: t("nav.home") },
    { href: "/how-it-works", label: t("nav.howItWorks") },
    { href: "/pricing", label: t("nav.pricing") },
    { href: "/our-story", label: t("footer.aboutUs") },
    { href: "/design-themes", label: t("footer.designThemes") },
    { href: "/reviews", label: t("footer.reviews") },
    { href: "/faqs", label: t("footer.faqs") },
  ];

  // Every one of these audiences is handled through the contact form, per the contact page copy.
  const work = [
    { href: "/contact", label: t("footer.weddingPros") },
    { href: "/contact", label: t("footer.affiliate") },
    { href: "/contact", label: t("footer.collab") },
    { href: "/contact", label: t("footer.media") },
    { href: "/contact", label: t("footer.charity") },
  ];

  const tools = [
    { href: "/pricing", label: t("footer.qrGenerator") },
    { href: "/how-it-works", label: t("footer.photoApp") },
    { href: "/weddings", label: t("footer.invites") },
    { href: "/faqs", label: t("footer.hashtag") },
  ];

  return (
    <footer className={`${isHome ? "bg-cream" : "bg-pinklight"} pt-16 pb-8`}>
      <div className="mx-auto max-w-[1140px] px-6">
        <div className="mb-12 grid gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <Link href="/" className="mb-6 inline-block">
              <Wordmark className="text-3xl" />
            </Link>
            <p className="mb-3 text-sm font-semibold">{t("footer.social")}</p>
            <div className="flex gap-2">
              {SOCIAL.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  title={s.name}
                  aria-label={s.name}
                  className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-xs font-semibold transition-colors hover:bg-coral hover:text-white"
                >
                  {s.name.slice(0, 2)}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 font-heading text-sm font-semibold">{t("footer.quickLinks")}</p>
            <ul className="space-y-2 text-sm">
              {quick.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 font-heading text-sm font-semibold">{t("footer.events")}</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/weddings">{t("event.weddings")}</Link>
              </li>
              {EVENTS.map((e) => (
                <li key={e.slug}>
                  <Link href={`/events/${e.slug}`}>{t(`event.${e.slug}` as never)}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 font-heading text-sm font-semibold">{t("footer.workWithUs")}</p>
            <ul className="space-y-2 text-sm">
              {work.map((w) => (
                <li key={w.label}>
                  <Link href={w.href} className="hover:text-coral">
                    {w.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 mb-4 font-heading text-sm font-semibold">{t("footer.freeTools")}</p>
            <ul className="space-y-2 text-sm">
              {tools.map((tool) => (
                <li key={tool.label}>
                  <Link href={tool.href} className="hover:text-coral">
                    {tool.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-navy/10 pt-6 text-sm sm:flex-row">
          <span>© 2026 Memovo™</span>
          <span className="flex gap-4">
            <Link href="/faqs" className="hover:text-coral">
              {t("footer.terms")}
            </Link>
            <Link href="/faqs" className="hover:text-coral">
              {t("footer.privacy")}
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
