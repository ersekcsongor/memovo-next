"use client";

import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandPinterest,
  IconBrandTiktok,
  IconBrandYoutube,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { EVENTS } from "@/data/events";
import { useT } from "@/components/LanguageProvider";
import Wordmark from "@/components/Wordmark";

const SOCIAL = [
  { name: "Instagram", href: "https://www.instagram.com/memovo/", Icon: IconBrandInstagram },
  { name: "Facebook", href: "https://www.facebook.com/memovo", Icon: IconBrandFacebook },
  { name: "Pinterest", href: "https://www.pinterest.com.au/memovo/", Icon: IconBrandPinterest },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/memovo/", Icon: IconBrandLinkedin },
  { name: "TikTok", href: "https://www.tiktok.com/@memovo", Icon: IconBrandTiktok },
  { name: "YouTube", href: "https://www.youtube.com/@memovo", Icon: IconBrandYoutube },
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
            <Link href="/" className="mb-6 inline-flex min-h-11 items-center">
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
                  className="flex h-11 w-11 items-center justify-center rounded-md bg-white transition-colors hover:bg-coral"
                >
                  <s.Icon className="h-5 w-5" stroke={1.75} aria-hidden />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 font-heading text-sm font-semibold">{t("footer.quickLinks")}</p>
            <ul className="text-sm">
              {quick.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="block py-3">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 font-heading text-sm font-semibold">{t("footer.events")}</p>
            <ul className="text-sm">
              <li>
                <Link href="/weddings" className="block py-3">{t("event.weddings")}</Link>
              </li>
              {EVENTS.map((e) => (
                <li key={e.slug}>
                  <Link href={`/events/${e.slug}`} className="block py-3">{t(`event.${e.slug}` as never)}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 font-heading text-sm font-semibold">{t("footer.workWithUs")}</p>
            <ul className="text-sm">
              {work.map((w) => (
                <li key={w.label}>
                  <Link href={w.href} className="block py-3 hover:text-coral-ink">
                    {w.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 mb-4 font-heading text-sm font-semibold">{t("footer.freeTools")}</p>
            <ul className="text-sm">
              {tools.map((tool) => (
                <li key={tool.label}>
                  <Link href={tool.href} className="block py-3 hover:text-coral-ink">
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
            <Link href="/faqs" className="inline-flex min-h-11 items-center hover:text-coral-ink">
              {t("footer.terms")}
            </Link>
            <Link href="/faqs" className="inline-flex min-h-11 items-center hover:text-coral-ink">
              {t("footer.privacy")}
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
