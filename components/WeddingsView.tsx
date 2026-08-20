"use client";

import Image from "next/image";
import Link from "next/link";
import {
  IconCamera,
  IconDeviceMobileOff,
  IconFolderHeart,
  IconInfinity,
  IconLock,
  IconScan,
} from "@tabler/icons-react";
import { HERO_WEDDING } from "@/data/assets";
import { WEDDING_FAQS, WEDDING_PLANS } from "@/data/content";
import { useT } from "@/components/LanguageProvider";
import { PricingSection } from "@/components/Pricing";
import { BenefitBand, Check, ClosingBand, DashboardPreview, PhoneCard, StepsRow } from "@/components/Blocks";
import { Testimonials } from "@/components/Testimonials";
import { Container, FaqAccordion } from "@/components/Sections";

const CARDS = [
  { Icon: IconCamera, key: "wed2.c1", sub: "wed2.c1sub" },
  { Icon: IconScan, key: "wed2.c2", sub: "wed2.c2sub" },
  { Icon: IconLock, key: "wed2.c3", sub: "wed2.c3sub" },
  { Icon: IconFolderHeart, key: "wed2.c4", sub: "wed2.c4sub" },
] as const;

const TRUST = [
  { Icon: IconDeviceMobileOff, key: "wed2.trust1" },
  { Icon: IconInfinity, key: "wed2.trust2" },
  { Icon: IconLock, key: "wed2.trust3" },
  { Icon: IconFolderHeart, key: "wed2.trust4" },
] as const;

const GAL_BULLETS = ["gal.b1", "gal.b2", "gal.b3", "gal.b4"] as const;

export default function WeddingsView() {
  const t = useT();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy">
        <Image src={HERO_WEDDING} alt="" fill className="object-cover opacity-40" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/40" aria-hidden />
        <Container className="relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="mb-5 text-xs font-semibold tracking-[0.18em] text-coral">{t("wed2.eyebrow")}</p>
            <h1 className="font-heading text-4xl leading-[1.12] font-bold text-white md:text-[3.4rem]">
              <span className="block">{t("wed2.title1")}</span>
              <span className="block">{t("wed2.title2")}</span>
              <span className="block text-coral">{t("wed2.title3")}</span>
            </h1>
            <p className="mt-6 max-w-sm text-white/80">{t("wed2.sub")}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/pricing"
                className="inline-flex min-h-12 items-center rounded-full bg-coral px-7 font-semibold text-white transition hover:brightness-95"
              >
                {t("wed2.ctaPrimary")}
              </Link>
              <Link
                href="/gallery-demo"
                className="inline-flex min-h-12 items-center rounded-full border border-white/40 px-7 font-semibold text-white transition hover:bg-white/10"
              >
                {t("cta.viewDemo")}
              </Link>
            </div>
            <ul className="mt-10 grid gap-x-8 gap-y-3 text-sm text-white/80 sm:grid-cols-2">
              {TRUST.map(({ Icon, key }) => (
                <li key={key} className="flex items-center gap-2">
                  <Icon className="h-4 w-4 shrink-0 text-coral" stroke={2} aria-hidden />
                  {t(key as never)}
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden justify-self-center lg:block">
            <PhoneCard />
          </div>
        </Container>
      </section>

      {/* Why it fits a wedding */}
      <section className="bg-white py-10 md:py-16">
        <Container>
          <h2 className="text-center font-heading text-2xl font-bold md:text-3xl">{t("wed2.perfectTitle")}</h2>
          <p className="mt-2 mb-10 text-center text-sm text-muted-foreground">{t("wed2.perfectSub")}</p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CARDS.map(({ Icon, key, sub }) => (
              <div key={key} className="rounded-xl border border-border bg-white px-6 py-7 text-center">
                <Icon className="mx-auto mb-4 h-8 w-8 text-coral" stroke={1.6} aria-hidden />
                <h3 className="font-heading text-base font-bold">{t(key as never)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t(sub as never)}</p>
              </div>
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
          <div className="grid items-center gap-10 rounded-2xl bg-white p-8 shadow-sm md:p-10 lg:grid-cols-[minmax(0,22rem)_1fr]">
            <div>
              <p className="mb-3 text-xs font-semibold tracking-wide text-coral-ink">{t("gal.eyebrow")}</p>
              <h2 className="mb-4 font-heading text-2xl font-bold">{t("wed2.galTitle")}</h2>
              <p className="mb-6 text-sm text-muted-foreground">{t("wed2.galBody")}</p>
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
          </div>
        </Container>
      </section>

      <BenefitBand />

      {/* Pricing. The id is what the header's Pricing menu jumps to; the scroll margin
          keeps the heading clear of the sticky bar. */}
      <section id="pricing" className="scroll-mt-24 bg-white py-10 md:py-16">
        <Container>
          <h2 className="text-center font-heading text-2xl font-bold md:text-3xl">{t("price.title")}</h2>
          <p className="mt-2 mb-10 text-center text-sm text-muted-foreground">{t("price.sub")}</p>
          <PricingSection plans={WEDDING_PLANS} />
        </Container>
      </section>

      <Testimonials titleKey="wed2.lovedTitle" />

      {/* FAQs */}
      <section className="bg-white py-10 md:py-16">
        <div className="mx-auto max-w-4xl px-6">
          <FaqAccordion items={WEDDING_FAQS} title={t("wed.faqTitle")} />
          <p className="mt-10 text-center text-sm">
            {t("wed.moreQuestions")}{" "}
            <Link href="/faqs" className="text-coral-ink">
              {t("wed.visitFaq")}
            </Link>
          </p>
        </div>
      </section>

      <ClosingBand titleKey="wed2.finalTitle" bodyKey="wed2.finalBody" />
    </>
  );
}
