"use client";

import Image from "next/image";
import Link from "next/link";
import {
  IconArrowRight,
  IconBriefcase,
  IconCake,
  IconConfetti,
  IconDiamond,
  IconDots,
  IconHeart,
  IconHeartFilled,
} from "@tabler/icons-react";
import { GALLERY_PHOTOS } from "@/data/assets";
import { WEDDING_PLANS } from "@/data/content";
import { useT } from "@/components/LanguageProvider";
import { PricingSection } from "@/components/Pricing";
import { Container, HeroSurface } from "@/components/Sections";
import { Testimonials } from "@/components/Testimonials";
import { BenefitBand, Check, ClosingBand, DashboardPreview, PhoneCard, StepsRow } from "@/components/Blocks";
import { Reveal } from "@/components/Reveal";

const OCCASIONS = [
  { Icon: IconHeart, key: "occ.weddings", sub: "occ.weddingsSub", href: "/weddings" },
  { Icon: IconDiamond, key: "occ.engagements", sub: "occ.engagementsSub", href: "/events/engagements" },
  { Icon: IconCake, key: "occ.birthdays", sub: "occ.birthdaysSub", href: "/events/kids-parties" },
  { Icon: IconConfetti, key: "occ.parties", sub: "occ.partiesSub", href: "/events/party" },
  { Icon: IconBriefcase, key: "occ.corporate", sub: "occ.corporateSub", href: "/events/business" },
  { Icon: IconDots, key: "occ.more", sub: "occ.moreSub", href: "/events/memorials" },
] as const;

const GAL_BULLETS = ["gal.b1", "gal.b2", "gal.b3", "gal.b4"] as const;

/* Guest photos fanned around the phone. Placement is hand-set so none of them
   covers the QR code in the middle. */
const SCATTER = [
  { ...GALLERY_PHOTOS[0], pos: "top-10 -left-6 w-32 -rotate-6" },
  { ...GALLERY_PHOTOS[5], pos: "top-2 -right-4 w-28 rotate-6" },
  { ...GALLERY_PHOTOS[3], pos: "bottom-14 -left-2 w-28 rotate-3" },
  { ...GALLERY_PHOTOS[6], pos: "-right-6 bottom-6 w-32 -rotate-3" },
] as const;

export default function HomeView() {
  const t = useT();

  return (
    <>
      {/* Hero. The bar is fixed over this section, so the top padding clears its 68px. */}
      <HeroSurface>
        <Container className="relative grid items-center gap-14 pt-28 pb-12 md:pt-32 md:pb-20 lg:grid-cols-[1fr_minmax(0,28rem)]">
          <div>
            <p className="mb-5 flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-coral-ink">
              <IconHeartFilled className="h-3.5 w-3.5" aria-hidden />
              {t("hero.eyebrow")}
            </p>
            <h1 className="max-w-[14ch] font-heading text-4xl leading-[1.1] font-bold text-navy md:text-[3.4rem]">
              {t("hero.title1")} <span className="text-coral">{t("hero.title2")}</span>
            </h1>
            <p className="mt-6 max-w-md text-navy/70">{t("hero.sub")}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/pricing"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-coral px-7 font-semibold text-white transition hover:brightness-95"
              >
                {t("cta.getStarted")}
                <IconArrowRight className="h-4 w-4" stroke={2} aria-hidden />
              </Link>
              <Link
                href="/gallery"
                className="inline-flex min-h-12 items-center rounded-full border border-border bg-white px-7 font-semibold text-navy transition hover:bg-cream"
              >
                {t("hero.ctaGallery")}
              </Link>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-navy/70">
              {["hero.trust1", "hero.trust2", "hero.trust3"].map((key) => (
                <li key={key} className="flex items-center gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-coral" aria-hidden>
                    <svg viewBox="0 0 20 20" className="h-3 w-3 text-white" fill="none">
                      <path d="M4 10.5l4 4 8-9" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {t(key as never)}
                </li>
              ))}
            </ul>
          </div>

          {/* The phone, with guest photos spilling out around it. */}
          <div className="relative mx-auto hidden h-[33rem] w-full max-w-[26rem] lg:block">
            {SCATTER.map(({ src, alt, pos }) => (
              <figure key={src} className={`absolute overflow-hidden rounded-2xl border-4 border-white shadow-xl ${pos}`}>
                <span className="relative block aspect-[3/4] w-full">
                  <Image src={src} alt={alt} fill className="object-cover" sizes="140px" />
                </span>
              </figure>
            ))}
            {/* Scaled down so the fanned photos still read either side of it. */}
            <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 scale-[0.86]">
              <PhoneCard />
            </div>
          </div>
        </Container>
      </HeroSurface>

      {/* Occasions */}
      <section className="bg-white py-10 md:py-16">
        <Container>
          <h2 className="mb-10 text-center font-heading text-2xl font-bold md:text-3xl">{t("occ.title")}</h2>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
            {OCCASIONS.map(({ Icon, key, sub, href }, i) => (
              <Reveal key={key} index={i}>
                <Link
                  href={href}
                  className="block h-full rounded-xl border border-border bg-white px-4 py-6 text-center transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <Icon className="mx-auto mb-3 h-8 w-8 text-coral" stroke={1.6} aria-hidden />
                  <p className="font-heading text-sm font-bold">{t(key as never)}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{t(sub as never)}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Three steps */}
      <section className="bg-white py-10 md:py-16">
        <Container>
          <h2 className="mb-12 text-center font-heading text-2xl font-bold md:text-3xl">{t("works.title")}</h2>
          <StepsRow />
        </Container>
      </section>

      {/* Gallery preview */}
      <section className="bg-white pb-10 md:pb-16">
        <Container>
          {/* The panel lifts as one object. Revealing its two columns separately
              would show an empty white slab first. */}
          <Reveal className="grid items-center gap-10 rounded-2xl bg-white p-8 shadow-sm md:p-10 lg:grid-cols-[minmax(0,22rem)_1fr]">
            <div>
              <p className="mb-3 text-xs font-semibold tracking-wide text-coral-ink">{t("gal.eyebrow")}</p>
              <h2 className="mb-4 font-heading text-2xl font-bold">{t("gal.title")}</h2>
              <p className="mb-6 text-sm text-muted-foreground">{t("gal.body")}</p>
              <ul className="mb-8 space-y-2.5 text-sm">
                {GAL_BULLETS.map((k) => (
                  <li key={k} className="flex gap-2.5">
                    <Check className="mt-0.5 text-coral" />
                    <span>{t(k)}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/gallery-demo"
                className="inline-flex min-h-11 items-center rounded-full border-2 border-coral px-6 text-sm font-semibold text-coral-ink transition hover:bg-blush"
              >
                {t("gal.cta")}
              </Link>
            </div>
            <DashboardPreview />
          </Reveal>
        </Container>
      </section>

      <BenefitBand />

      <Testimonials />

      {/* Pricing */}
      <section className="bg-white py-10 md:py-16">
        <Container>
          <h2 className="text-center font-heading text-2xl font-bold md:text-3xl">{t("price.title")}</h2>
          <p className="mt-2 mb-10 text-center text-sm text-muted-foreground">{t("price.sub")}</p>
          <PricingSection plans={WEDDING_PLANS} />
        </Container>
      </section>

      <ClosingBand titleKey="final.title" bodyKey="final.body" />
    </>
  );
}
