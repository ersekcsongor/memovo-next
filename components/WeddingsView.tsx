"use client";

import Image from "next/image";
import Link from "next/link";
import { BLUR_BG, BLUR_BG_2, HERO_WEDDING, INVITE_RSVP, PHONE, TEMPLATE_PHOTOS } from "@/data/assets";
import { FEATURES, STEPS, WEDDING_FAQS, WEDDING_PLANS } from "@/data/content";
import { useT } from "@/components/LanguageProvider";
import { PricingSection } from "@/components/Pricing";
import {
  Carousel,
  Container,
  CtaBand,
  FaqAccordion,
  FeatureGrid,
  PressStrip,
  QuoteBand,
  StepsGrid,
} from "@/components/Sections";

const QUICK_ANSWERS = [
  { q: "wed.q1", a: "wed.a1" },
  { q: "wed.q2", a: "wed.a2" },
  { q: "wed.q3", a: "wed.a3" },
] as const;

const PILLARS = [
  { t: "wed.pillar1", d: "wed.pillar1body" },
  { t: "wed.pillar2", d: "wed.pillar2body" },
  { t: "wed.pillar3", d: "wed.pillar3body" },
] as const;

const ABOUT_KEYS = ["wed.more1", "wed.more2", "wed.more3", "wed.more4", "wed.more5"] as const;

export default function WeddingsView() {
  const t = useT();

  return (
    <>
      {/* Hero */}
      <section className="relative h-[420px] w-full overflow-hidden bg-gray-100 md:h-[670px]">
        <Image src={HERO_WEDDING} alt={t("wed.h1a")} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-cream px-8 py-3 shadow-lg md:bottom-10">
          <p className="font-accent text-lg whitespace-nowrap text-coral-ink md:text-xl">{t("wed.pill")}</p>
        </div>
      </section>

      <section className="bg-blush py-16 md:py-[72px]">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="mb-6 inline-block rounded-full border border-coral px-5 py-1.5 text-xs font-semibold text-coral-ink">
            {t("wed.badge")}
          </span>
          <h1 className="font-heading text-3xl leading-tight font-bold md:text-5xl">
            {t("wed.h1a")}
            <br />
            {t("wed.h1b")}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base md:text-lg">
            {t("wed.lead")} <span className="font-semibold text-coral-ink">{t("wed.leadHighlight")}</span> {t("wed.leadEnd")}
          </p>
          <p className="mt-3 text-sm text-navy/70">
            <span className="font-semibold text-coral-ink">{t("wed.stat1")}</span> {t("wed.stat1label")} ·{" "}
            <span className="font-semibold text-coral-ink">{t("wed.stat2")}</span> {t("wed.stat2label")} ·{" "}
            <span className="font-semibold text-coral-ink">{t("wed.stat3")}</span> {t("wed.stat3label")}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/pricing" className="rounded-full bg-coral px-7 py-3 font-semibold text-navy shadow-md">
              {t("cta.createGallery")}
            </Link>
            <Link href="/how-it-works" className="rounded-full bg-navy px-7 py-3 font-semibold text-white">
              {t("cta.seeHow")}
            </Link>
          </div>
        </div>
      </section>

      {/* No app needed */}
      <section className="relative overflow-hidden py-20">
        <Image src={BLUR_BG} alt="" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-forest/55" />
        <Container className="relative grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-semibold text-coral-ink">{t("wed.noAppEyebrow")}</p>
            <h2 className="mb-4 font-heading text-2xl font-bold text-white md:text-4xl">{t("wed.noAppTitle")}</h2>
            <p className="mb-4 max-w-md text-white/85">{t("wed.noAppBody")}</p>
            <p className="font-accent text-lg text-white">{t("wed.noAppQuote")}</p>
          </div>
          <div className="flex justify-center">
            <Image src={PHONE} alt="" width={288} height={288} className="w-64 drop-shadow-2xl md:w-72" />
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="bg-blush pt-16 pb-20 text-center">
        <h2 className="font-heading text-3xl font-bold md:text-4xl">{t("steps.title")}</h2>
        <p className="mt-2 font-accent text-lg">{t("steps.sub")}</p>
      </section>
      <section className="bg-white py-16">
        <StepsGrid steps={STEPS} />
        <div className="flex justify-center gap-4 pt-12">
          <Link href="/pricing" className="inline-flex min-h-11 items-center rounded-full bg-coral px-6 text-sm font-semibold text-navy">
            {t("cta.pricing")}
          </Link>
          <Link href="/how-it-works" className="inline-flex min-h-11 items-center rounded-full bg-coral px-6 text-sm font-semibold text-navy">
            {t("cta.moreOnHow")}
          </Link>
        </div>
      </section>

      <QuoteBand>{t("wed.quoteBand")}</QuoteBand>

      {/* Features */}
      <section className="bg-coral py-8 text-center">
        <h2 className="font-heading text-xl font-bold text-navy md:text-2xl">{t("features.bandWeddings")}</h2>
      </section>
      <section className="bg-white py-16">
        <FeatureGrid features={FEATURES} />
      </section>

      {/* Live slideshow */}
      <section className="bg-blush py-20">
        <Container className="grid items-center gap-12 md:grid-cols-2">
          <div className="relative h-[360px] overflow-hidden rounded-2xl shadow-lg">
            <Image src={TEMPLATE_PHOTOS[6].src} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
          <div>
            <h2 className="mb-4 font-accent text-2xl md:text-3xl">{t("wed.slideshowTitle")}</h2>
            <p className="mb-5 max-w-md text-navy/80">{t("wed.slideshowBody")}</p>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-coral-ink">●</span> {t("wed.slideshow1")}
              </li>
              <li>
                <span className="text-coral-ink">●</span> {t("wed.slideshow2")}
              </li>
              <li>
                <span className="text-coral-ink">●</span> {t("wed.slideshow3")}
              </li>
            </ul>
          </div>
        </Container>
      </section>

      {/* Quick answers */}
      <section className="relative overflow-hidden py-20">
        <Image src={BLUR_BG} alt="" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-forest/70" />
        <Container className="relative">
          <h2 className="mb-10 text-center font-accent text-2xl text-white md:text-3xl">{t("wed.googleTitle")}</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {QUICK_ANSWERS.map((q) => (
              <div key={q.q} className="rounded-2xl bg-white/95 p-6">
                <h3 className="mb-2 font-heading text-base font-semibold text-coral-ink">{t(q.q)}</h3>
                <p className="text-sm text-navy/75">{t(q.a)}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Bonus templates */}
      <section className="bg-blush py-16 text-center">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-3 font-accent text-2xl text-coral-ink md:text-3xl">{t("wed.bonusTitle")}</h2>
          <p className="mx-auto max-w-2xl text-sm text-navy/80">{t("wed.bonusBody")}</p>
        </div>
      </section>
      <section className="overflow-hidden bg-white py-8 text-center">
        <p className="mb-8 font-accent text-coral-ink">{t("wed.browse")}</p>
        <Carousel photos={TEMPLATE_PHOTOS} />
      </section>

      {/* Pricing */}
      <section className="bg-white py-20">
        <Container>
          <div className="mb-4 text-center">
            <h2 className="font-heading text-2xl font-bold md:text-4xl">{t("wed.pricingTitle")}</h2>
            <p className="mt-2 font-accent text-lg">{t("page.pricing.sub")}</p>
          </div>
          <div className="mb-10 flex justify-center">
            <span className="rounded-full bg-pinklight px-4 py-1.5 text-center text-xs font-bold text-coral-ink">
              {t("page.pricing.offer")}
            </span>
          </div>
          <PricingSection plans={WEDDING_PLANS} />
          <p className="mx-auto mt-10 max-w-2xl text-center text-xs text-navy/50">{t("page.pricing.footnote")}</p>
        </Container>
      </section>

      <PressStrip />

      {/* No testimonials until real couples have written them. */}
      <section className="bg-white py-20">
        <Container className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 font-accent text-2xl md:text-3xl">{t("reviews.emptyTitle")}</h2>
          <p className="mb-8 text-navy/70">{t("reviews.emptyBody")}</p>
          <Link href="/pricing" className="inline-flex min-h-11 items-center rounded-full bg-coral px-7 font-semibold text-navy">
            {t("reviews.emptyCta")}
          </Link>
        </Container>
      </section>

      {/* Digital invitation */}
      <section className="relative overflow-hidden py-20">
        <Image src={BLUR_BG_2} alt="" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-forest/45" />
        <Container className="relative text-center">
          <h2 className="mb-4 font-heading text-2xl font-bold text-coral-ink md:text-4xl">{t("wed.inviteTitle")}</h2>
          <p className="mx-auto mb-14 max-w-2xl text-white">{t("wed.inviteBody")}</p>
          <Image src={INVITE_RSVP} alt="" width={640} height={480} className="mx-auto w-full max-w-md drop-shadow-2xl" />
        </Container>
      </section>

      {/* Built for weddings */}
      <section className="bg-white py-20 text-center">
        <Container>
          <h2 className="mb-12 font-accent text-2xl md:text-3xl">{t("wed.builtTitle")}</h2>
          <div className="grid gap-10 md:grid-cols-3">
            {PILLARS.map((p) => (
              <div key={p.t}>
                <h3 className="mb-2 font-heading text-lg font-semibold">{t(p.t)}</h3>
                <p className="text-sm text-navy/70">{t(p.d)}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-coral py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="font-accent text-xl leading-relaxed text-navy md:text-2xl">{t("wed.coralQuote")}</p>
        </div>
      </section>

      {/* Demo */}
      <section className="bg-white py-20 text-center">
        <Container>
          <h2 className="mb-4 font-accent text-2xl text-coral-ink md:text-3xl">{t("wed.demoTitle")}</h2>
          <p className="mx-auto mb-8 max-w-2xl text-navy/80">{t("wed.demoBody")}</p>
          <Link href="/how-it-works" className="inline-block rounded-full bg-coral px-7 py-3 font-semibold text-navy">
            {t("cta.freeDemo")}
          </Link>
        </Container>
      </section>

      {/* FAQs */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-12 text-center font-accent text-2xl md:text-3xl">{t("wed.faqTitle")}</h2>
          <FaqAccordion items={WEDDING_FAQS} />
          <p className="mt-10 text-center text-sm">
            {t("wed.moreQuestions")}{" "}
            <Link href="/faqs" className="text-coral-ink">
              {t("wed.visitFaq")}
            </Link>
          </p>
        </div>
      </section>

      {/* Destination weddings */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-3xl space-y-4 px-6 text-center">
          <h2 className="mb-4 font-accent text-2xl text-coral-ink md:text-3xl">{t("wed.destTitle")}</h2>
          <p className="text-navy/80">{t("wed.destBody")}</p>
          <p className="font-accent text-lg">{t("wed.destQuote")}</p>
        </div>
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

      <section className="bg-cream py-16">
        <Container>
          <h2 className="mb-6 text-sm font-semibold text-coral-ink">{t("wed.moreTitle")}</h2>
          <div className="space-y-5 text-sm text-navy/70">
            {ABOUT_KEYS.map((k) => (
              <p key={k}>{t(k)}</p>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand text={t("wed.cta")} />
    </>
  );
}
