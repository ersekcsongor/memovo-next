"use client";

import Image from "next/image";
import Link from "next/link";
import { BLUR_BG, PHONE } from "@/data/assets";
import { FEATURES, STEPS, THEMES } from "@/data/content";
import type { EventPage } from "@/data/events";
import { useLang, useT } from "@/components/LanguageProvider";
import { PricingSection } from "@/components/Pricing";
import {
  Container,
  CtaBand,
  FeatureGrid,
  HeroImage,
  PressStrip,
  QuoteBand,
  StepsGrid,
} from "@/components/Sections";

const PLAN_ITEMS = [
  "plan.galleryQr",
  "plan.unlimitedMedia",
  "plan.invite",
  "plan.guestbook",
  "plan.moderation",
  "plan.canva",
];

export default function EventView({ event }: { event: EventPage }) {
  const { lang } = useLang();
  const t = useT();
  const copy = event.copy[lang] ?? event.copy.en;

  const plans = event.prices.map((p, i) => ({
    name: p.name,
    usd: p.usd,
    note: "plan.note.oneTime",
    featured: i === 1,
    items: PLAN_ITEMS,
  }));

  return (
    <>
      <HeroImage src={event.hero} alt={copy.heading} height="h-[360px] md:h-[600px]" />

      <section className="bg-blush py-14 text-center">
        <Container>
          <h1 className="mb-5 font-accent text-2xl text-coral-ink md:text-4xl">{copy.heading}</h1>
          <p className="mx-auto mb-3 max-w-3xl text-navy/80">{copy.intro}</p>
          <p className="mx-auto max-w-3xl text-navy/80">{copy.sub}</p>
        </Container>
      </section>

      <section className="bg-white py-8">
        <Container className="text-center">
          <p className="mb-5 font-accent text-coral-ink">{copy.tagline}</p>
          <div className="flex flex-wrap justify-center gap-3">
            {copy.tabs.map((tab) => (
              <a
                key={tab}
                href="#pricing"
                className="rounded-full border-2 border-navy px-6 py-2 text-xs font-semibold tracking-wide transition-colors hover:bg-navy hover:text-white"
              >
                {tab.toUpperCase()}
              </a>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden py-20">
        <Image src={BLUR_BG} alt="" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-forest/60" />
        <Container className="relative grid items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="mb-4 font-heading text-2xl font-bold text-white md:text-4xl">{t("wed.noAppTitle")}</h2>
            <p className="mb-4 max-w-md text-white/85">{t("wed.noAppBody")}</p>
            <p className="font-accent text-lg text-white">{copy.quote}</p>
          </div>
          <div className="flex justify-center">
            <Image src={PHONE} alt="" width={288} height={288} className="w-64 drop-shadow-2xl md:w-72" />
          </div>
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container className="grid items-center gap-12 md:grid-cols-2">
          <div className="relative h-[380px] overflow-hidden rounded-2xl shadow-lg">
            <Image src={event.hero} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
          <div>
            <h2 className="mb-4 font-accent text-2xl md:text-3xl">{copy.whyTitle}</h2>
            <p className="mb-5 text-navy/80">{copy.whyCopy}</p>
            <p className="mb-6 font-accent text-lg text-coral-ink">{copy.quote}</p>
            <div className="flex gap-4">
              <Link href="/how-it-works" className="inline-flex min-h-11 items-center rounded-full bg-coral px-6 text-sm font-semibold text-navy">
                {t("cta.howItWorks")}
              </Link>
              <Link href="/pricing" className="inline-flex min-h-11 items-center rounded-full border-2 border-navy px-6 text-sm font-semibold">
                {t("cta.pricing")}
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-blush pt-14 pb-16 text-center">
        <h2 className="font-heading text-2xl font-bold md:text-3xl">{t("steps.title")}</h2>
        <p className="mt-2 font-accent text-lg">{t("steps.sub")}</p>
      </section>
      <section className="bg-white py-16">
        <StepsGrid steps={STEPS} />
      </section>

      <section className="bg-coral py-8 text-center">
        <h2 className="font-heading text-xl font-bold text-navy md:text-2xl">{t("features.bandEvents")}</h2>
      </section>
      <section className="bg-white py-16">
        <FeatureGrid features={FEATURES} />
      </section>

      <QuoteBand>{copy.band}</QuoteBand>

      {/* Design themes teaser */}
      <section className="bg-white py-16 text-center">
        <Container>
          <h2 className="mb-2 font-accent text-2xl md:text-3xl">{t("page.themes.heading")}</h2>
          <p className="mb-10 text-xs font-semibold tracking-wide text-coral-ink">{t("page.themes.tap")}</p>
          <div className="mb-10 flex flex-wrap justify-center gap-5">
            {THEMES.slice(0, 10).map((theme) => (
              <Link key={theme.name} href="/design-themes" className="group w-24">
                <span
                  className="mx-auto mb-2 block h-16 w-16 rounded-full border-4 border-white shadow-lg transition-transform group-hover:scale-110"
                  style={{ background: theme.color }}
                />
                <span className="block font-heading text-xs group-hover:text-coral-ink">{theme.name}</span>
              </Link>
            ))}
          </div>
          <Link href="/design-themes" className="inline-flex min-h-11 items-center rounded-full border-2 border-navy px-6 text-sm font-semibold">
            {t("cta.seeAllThemes")}
          </Link>
        </Container>
      </section>


      <PressStrip />

      <section id="pricing" className="scroll-mt-6 bg-white py-20">
        <Container>
          <div className="mb-4 text-center">
            <h2 className="font-accent text-2xl text-coral-ink md:text-4xl">{copy.pricingTitle}</h2>
            <p className="mt-2 text-navy/70">{t("page.pricing.tailoredSub")}</p>
          </div>
          <PricingSection plans={plans} />
          <p className="mx-auto mt-10 max-w-2xl text-center text-xs text-navy/50">{t("page.pricing.footnote")}</p>
        </Container>
      </section>

      {/* Demo */}
      <section className="bg-white py-16 text-center">
        <Container>
          <h2 className="mb-4 font-accent text-2xl text-coral-ink md:text-3xl">{t("wed.demoTitle")}</h2>
          <p className="mx-auto mb-8 max-w-2xl text-navy/80">{t("wed.demoBody")}</p>
          <Link href="/how-it-works" className="inline-block rounded-full bg-coral px-7 py-3 font-semibold text-navy">
            {t("cta.freeDemo")}
          </Link>
        </Container>
      </section>

      <section className="bg-coral py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-navy">{t("wed.embrace")}</p>
        </div>
      </section>

      {/* What is memovo */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-8 font-accent text-2xl md:text-3xl">{t("wed.whatIsTitle")}</h2>
          <div className="space-y-5 text-navy/75">
            <p>{t("wed.whatIs1")}</p>
            <p>{t("wed.whatIs2")}</p>
            <p>{t("wed.whatIs3")}</p>
            <p className="font-accent text-lg text-coral-ink">{t("wed.whatIsQuote")}</p>
          </div>
        </div>
      </section>

      <CtaBand text={copy.closing} />
    </>
  );
}
