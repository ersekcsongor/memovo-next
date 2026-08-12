"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BLUR_BG_2,
  COUPLE_IMG,
  GALLERY_PHOTOS,
  HERO_HOME,
  HOME_TILES,
  PHONE,
  WHATS_NEW_IMG,
} from "@/data/assets";
import { useT } from "@/components/LanguageProvider";
import { Carousel, Container, CtaBand, HeroImage, PressStrip, Stats } from "@/components/Sections";

const PRICING_LINKS = [
  { href: "/weddings", key: "event.weddings" },
  { href: "/events/engagements", key: "event.engagements" },
  { href: "/events/party", key: "event.party" },
  { href: "/events/business", key: "event.business" },
  { href: "/events/memorials", key: "event.memorials" },
  { href: "/events/kids-parties", key: "event.kids-parties" },
] as const;

const MORE_KEYS = ["home.more1", "home.more2", "home.more3", "home.more4", "home.more5", "home.more6"] as const;

export default function HomeView() {
  const t = useT();


  return (
    <>
      <HeroImage src={HERO_HOME} alt={t("home.h1")} height="h-[320px] md:h-[530px]" />

      <section className="bg-gradient-to-b from-white to-pinklight py-[71px] text-center">
        <div className="mx-auto max-w-[850px] px-6">
          <h1 className="font-heading text-[28px] leading-[40px] font-semibold md:text-[38px] md:leading-[54px]">
            {t("home.h1")}
          </h1>
          <p className="mt-6">{t("home.lead")}</p>
          <p className="mt-3 font-accent text-lg text-coral-ink">{t("home.tagline")}</p>
        </div>
      </section>

      {/* Event category tiles */}
      <section className="grid grid-cols-2 bg-pinklight md:grid-cols-3 lg:grid-cols-6">
        {HOME_TILES.map((tile) => {
          const label = t(`event.${tile.href.split("/").pop()}` as never);
          return (
            <Link key={tile.href} href={tile.href} className="event-tile relative h-52 lg:h-[290px]">
              <Image src={tile.src} alt={label} fill className="object-cover" sizes="(max-width: 768px) 50vw, 16vw" />
              {/* Scrim, so the label holds up over a light photo. */}
              <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" aria-hidden />
              <span className="absolute inset-x-0 bottom-6 text-center font-heading text-lg text-white drop-shadow-lg">
                {label}
              </span>
            </Link>
          );
        })}
      </section>

      {/* No testimonial carousel until real hosts have written the quotes. */}
      <section className="bg-cream py-16 md:py-20">
        <Container className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 font-accent text-2xl md:text-3xl">{t("reviews.emptyTitle")}</h2>
          <p className="mb-8 text-navy/70">{t("reviews.emptyBody")}</p>
          <Link href="/pricing" className="inline-flex min-h-11 items-center rounded-full bg-coral px-7 font-semibold text-navy">
            {t("reviews.emptyCta")}
          </Link>
        </Container>
      </section>

      {/* No app / no registration */}
      <section className="relative overflow-hidden py-20">
        <Image src={BLUR_BG_2} alt="" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-forest/70" />
        <Container className="relative grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="mb-3 font-accent text-white">{t("home.noAppEyebrow")}</p>
            <h2 className="mb-5 font-heading text-2xl font-bold text-white md:text-4xl">{t("home.noAppTitle")}</h2>
            <p className="max-w-md text-white/85">{t("home.noAppBody")}</p>
          </div>
          <div className="flex justify-center">
            <Image src={PHONE} alt="" width={320} height={320} className="w-72 drop-shadow-2xl md:w-80" />
          </div>
        </Container>
      </section>

      {/* Every celebration */}
      <section className="bg-white py-20">
        <Container>
          <h2 className="mb-12 text-center font-accent text-2xl md:text-3xl">{t("home.celebrationTitle")}</h2>
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="relative h-[420px] overflow-hidden rounded-2xl shadow-lg">
              <Image src={COUPLE_IMG} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <div className="space-y-4 text-navy/80">
              <p>{t("home.celebration1")}</p>
              <p>{t("home.celebration2")}</p>
              <p>
                <strong>{t("home.celebration3")}</strong>
              </p>
              <p>{t("home.celebration4")}</p>
              <p className="font-accent text-lg text-coral-ink">{t("home.celebrationQuote")}</p>
              <Link href="/how-it-works" className="mt-2 inline-flex min-h-11 items-center rounded-full border-2 border-navy px-6 text-sm font-semibold">
                {t("cta.howItWorks")}
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Pricing by event type */}
      <section className="bg-cream py-16 text-center">
        <Container>
          <h2 className="mb-3 font-accent text-2xl text-coral-ink md:text-3xl">{t("page.pricing.tailored")}</h2>
          <p className="mb-8 text-navy/80">{t("page.pricing.tailoredSub")}</p>
          <div className="flex flex-wrap justify-center gap-3">
            {PRICING_LINKS.map((p) => (
              <Link key={p.href} href={p.href} className="inline-flex min-h-11 items-center rounded-full bg-coral px-5 text-xs font-semibold text-navy">
                {t(p.key)} – {t("cta.pricing")}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Stats />
      </section>

      <PressStrip />

      <section className="overflow-hidden bg-cream py-10">
        <Carousel photos={GALLERY_PHOTOS} short />
      </section>

      {/* What's new */}
      <section className="bg-forest py-6 text-center">
        <h2 className="font-heading text-xl font-bold text-white md:text-2xl">{t("home.whatsNew")}</h2>
      </section>
      <section className="bg-white py-16">
        <Container className="space-y-16">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="relative h-[320px] overflow-hidden rounded-xl">
              <Image src={WHATS_NEW_IMG} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold tracking-wide text-coral-ink">{t("home.newFeature")}</p>
              <h3 className="mb-3 font-accent text-xl text-coral-ink md:text-2xl">{t("home.langTitle")}</h3>
              <p className="text-navy/80">{t("home.langBody")}</p>
              <p className="mt-3 text-sm text-navy/70">{t("home.langBody2")}</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-pinklight py-16 text-center">
        <Container>
          <h2 className="mb-6 font-accent text-2xl md:text-3xl">{t("home.memoriesTitle")}</h2>
          <Link href="/pricing" className="inline-block rounded-full bg-coral px-7 py-3 font-semibold text-navy">
            {t("cta.pricing")}
          </Link>
        </Container>
      </section>

      <CtaBand text={t("home.cta")} cta={t("cta.howItWorks")} href="/how-it-works" curveFrom="#FCD8D8" />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-8 font-accent text-2xl md:text-3xl">{t("home.whatIsTitle")}</h2>
          <div className="space-y-5 text-sm leading-relaxed text-navy/70 md:text-base">
            <p>{t("home.whatIs1")}</p>
            <p>{t("home.whatIs2")}</p>
          </div>
        </div>
      </section>

      <section className="bg-white pb-20">
        <Container>
          <h2 className="mb-6 text-sm font-semibold text-coral-ink">{t("home.moreTitle")}</h2>
          <div className="space-y-5 text-sm text-navy/70">
            {MORE_KEYS.map((k) => (
              <p key={k}>{t(k)}</p>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
