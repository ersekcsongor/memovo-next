"use client";

import Image from "next/image";
import Link from "next/link";
import {
  IconDeviceMobileOff,
  IconDownload,
  IconInfinity,
  IconLock,
  IconPhotoUp,
  IconPlayerPlay,
  IconQrcode,
  IconConfetti,
  IconArrowRight,
} from "@tabler/icons-react";
import { GALLERY_PHOTOS } from "@/data/assets";
import { useT } from "@/components/LanguageProvider";
import { Container } from "@/components/Sections";

/** The building blocks the home and weddings pages share, so the two stay in step. */

export function Check({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`h-4 w-4 shrink-0 ${className}`} fill="none" aria-hidden>
      <path d="M4 10.5l4 4 8-9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** The invite card the hero phone displays. Drawn rather than shipped as an image. */
export function PhoneCard() {
  const t = useT();
  return (
    <div className="relative w-[280px] shrink-0 rounded-[2.5rem] border-[6px] border-navy bg-navy p-1 shadow-2xl">
      <div className="overflow-hidden rounded-[2rem] bg-white">
        <div className="flex h-12 items-center justify-center bg-coral">
          <span className="h-5 w-5 rounded-full border-2 border-white/70" aria-hidden />
        </div>
        <div className="bg-blush px-6 pt-6 pb-7 text-center">
          <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white font-heading text-sm font-bold text-coral-ink">
            E&amp;N
          </span>
          <p className="mb-2 inline-block rounded-full bg-white px-3 py-1 text-[10px] font-semibold tracking-wide text-muted-foreground">
            {t("hero.cardDate")}
          </p>
          <p className="mb-4 font-accent text-2xl text-navy">{t("hero.cardNames")}</p>
          <span className="mx-auto mb-5 grid h-24 w-24 grid-cols-5 gap-0.5 rounded-lg bg-white p-2" aria-hidden>
            {Array.from({ length: 25 }).map((_, i) => (
              <span key={i} className={i % 3 === 0 || i % 7 === 0 ? "bg-navy" : "bg-transparent"} />
            ))}
          </span>
          <p className="mb-2 rounded-full bg-coral py-2 text-xs font-semibold text-white">{t("hero.cardUpload")}</p>
          <p className="rounded-full bg-white py-2 text-xs font-semibold text-coral-ink">{t("hero.cardGallery")}</p>
        </div>
      </div>
    </div>
  );
}

/** A sketch of the host dashboard, drawn from boxes so it needs no captured image. */
export function DashboardPreview() {
  const t = useT();
  const stats = [
    { n: "1,248", label: t("gal.demoPhotos") },
    { n: "325", label: t("gal.demoGuests") },
    { n: "12.4 GB", label: t("gal.demoStorage") },
    { n: "99%", label: t("gal.demoSuccess") },
  ];
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-xl">
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <span className="font-heading text-sm font-bold text-coral-ink">memovo</span>
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-4 w-4 rounded-full bg-blush" />
          <span className="h-4 w-4 rounded-full bg-blush" />
        </span>
      </div>
      <div className="p-4">
        <p className="mb-3 font-heading text-sm font-bold">{t("gal.demoEvent")}</p>
        <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-lg bg-blush px-3 py-2">
              <p className="font-heading text-base font-bold">{s.n}</p>
              <p className="text-[11px] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {GALLERY_PHOTOS.slice(0, 8).map((p) => (
            <div key={p.src} className="relative aspect-square overflow-hidden rounded-md">
              <Image src={p.src} alt="" fill className="object-cover" sizes="120px" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const STEPS = [
  { Icon: IconQrcode, title: "works.s1", body: "works.s1body" },
  { Icon: IconPhotoUp, title: "works.s2", body: "works.s2body" },
  { Icon: IconDownload, title: "works.s3", body: "works.s3body" },
] as const;

export function StepsRow() {
  const t = useT();
  return (
    <ol className="grid gap-10 md:grid-cols-3">
      {STEPS.map(({ Icon, title, body }, i) => (
        <li key={title} className="relative text-center">
          {/* The connector sits between the circles on wide screens. */}
          {i < STEPS.length - 1 && (
            <span
              className="absolute top-9 left-[calc(50%+3.5rem)] hidden h-px w-[calc(100%-7rem)] border-t border-dashed border-coral/40 md:block"
              aria-hidden
            />
          )}
          <span className="mx-auto mb-4 flex h-8 w-8 items-center justify-center rounded-full border border-coral bg-white text-xs font-bold text-coral-ink">
            {i + 1}
          </span>
          <Icon className="mx-auto mb-4 h-10 w-10 text-coral" stroke={1.5} aria-hidden />
          <h3 className="mb-2 font-heading text-base font-bold">{t(title as never)}</h3>
          <p className="mx-auto max-w-[34ch] text-sm text-muted-foreground">{t(body as never)}</p>
        </li>
      ))}
    </ol>
  );
}

const BAND = [
  { Icon: IconDeviceMobileOff, title: "band.b1", sub: "band.b1sub" },
  { Icon: IconInfinity, title: "band.b2", sub: "band.b2sub" },
  { Icon: IconLock, title: "band.b3", sub: "band.b3sub" },
  { Icon: IconDownload, title: "band.b4", sub: "band.b4sub" },
] as const;

/** Sits where a visitor-count strip would go. States what the product does, not how many use it. */
export function BenefitBand() {
  const t = useT();
  return (
    <section className="bg-white py-10 md:py-14">
      <Container>
        <ul className="grid gap-8 rounded-2xl bg-gradient-to-r from-coral to-coral-ink px-8 py-10 text-center text-white sm:grid-cols-2 lg:grid-cols-4">
          {BAND.map(({ Icon, title, sub }) => (
            <li key={title}>
              <Icon className="mx-auto mb-3 h-7 w-7" stroke={1.6} aria-hidden />
              <p className="font-heading text-lg font-bold">{t(title as never)}</p>
              <p className="mt-1 text-sm text-white/80">{t(sub as never)}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function ClosingBand({ titleKey, bodyKey, ctaLabel }: { titleKey: string; bodyKey: string; ctaLabel?: string }) {
  const t = useT();
  return (
    <section className="bg-white pb-10 md:pb-16">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 rounded-2xl bg-gradient-to-r from-coral to-coral-ink px-8 py-10 text-white md:px-12 lg:flex-row lg:items-center">
          <div className="flex items-start gap-5">
            <IconConfetti className="hidden h-12 w-12 shrink-0 text-white/50 sm:block" stroke={1.4} aria-hidden />
            <div>
            <h2 className="font-heading text-2xl leading-snug font-bold">{t(titleKey as never)}</h2>
            <p className="mt-2 max-w-md text-sm text-white/85">{t(bodyKey as never)}</p>
            </div>
          </div>
          <div className="flex shrink-0 flex-wrap gap-4">
            <Link
              href="/pricing"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-7 font-semibold text-coral-ink transition hover:bg-cream"
            >
              {ctaLabel ?? t("cta.getStarted")}
              <IconArrowRight className="h-4 w-4" stroke={2} aria-hidden />
            </Link>
            <Link
              href="/gallery-demo"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/60 px-7 font-semibold text-white transition hover:bg-white/10"
            >
              {t("cta.viewDemo")}
              <IconPlayerPlay className="h-3.5 w-3.5" fill="currentColor" stroke={0} aria-hidden />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
