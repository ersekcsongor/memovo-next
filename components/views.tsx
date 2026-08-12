"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { COUPLE_IMG, GALLERY_PHOTOS, PODCAST_IMG } from "@/data/assets";
import { ALL_FAQS, FEATURES, REVIEWS, STEPS, THEMES, WEDDING_PLANS } from "@/data/content";
import { useT } from "@/components/LanguageProvider";
import { PricingSection } from "@/components/Pricing";
import {
  Carousel,
  Container,
  CtaBand,
  FaqAccordion,
  FeatureGrid,
  PageBanner,
  PressLogos,
  QuoteBand,
  Stats,
  StepsGrid,
} from "@/components/Sections";

const EVENT_PRICING = [
  { href: "/weddings", key: "event.weddings" },
  { href: "/events/engagements", key: "event.engagements" },
  { href: "/events/party", key: "event.party" },
  { href: "/events/business", key: "event.business" },
  { href: "/events/memorials", key: "event.memorials" },
  { href: "/events/kids-parties", key: "event.kids-parties" },
] as const;

export function PricingView() {
  const t = useT();
  return (
    <>
      <PageBanner heading={t("page.pricing.heading")} sub={t("page.pricing.sub")} />

      <section className="bg-white py-16">
        <Container>
          <div className="mb-10 flex justify-center">
            <span className="rounded-full bg-pinklight px-4 py-1.5 text-center text-xs font-bold text-coral">
              {t("page.pricing.offer")}
            </span>
          </div>
          <PricingSection plans={WEDDING_PLANS} />
          <p className="mt-10 text-center text-xs text-navy/50">{t("page.pricing.footnote")}</p>
        </Container>
      </section>

      <section className="bg-cream py-16 text-center">
        <Container>
          <h2 className="mb-3 font-accent text-2xl text-coral md:text-3xl">{t("page.pricing.tailored")}</h2>
          <p className="mb-8 text-navy/80">{t("page.pricing.tailoredSub")}</p>
          <div className="flex flex-wrap justify-center gap-3">
            {EVENT_PRICING.map((p) => (
              <Link key={p.href} href={p.href} className="rounded-full bg-coral px-5 py-2 text-xs font-semibold text-white">
                {t(p.key)} – {t("cta.pricing")}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <PressLogos />
    </>
  );
}

export function HowItWorksView() {
  const t = useT();
  return (
    <>
      <PageBanner heading={t("steps.title")} sub={t("steps.sub")} />

      <section className="bg-white py-16">
        <StepsGrid steps={STEPS} />
        <div className="flex justify-center gap-4 pt-12">
          <Link href="/pricing" className="rounded-full bg-coral px-6 py-2.5 text-sm font-semibold text-white">
            {t("cta.pricing")}
          </Link>
          <Link href="/faqs" className="rounded-full border-2 border-navy px-6 py-2.5 text-sm font-semibold">
            {t("cta.faqs")}
          </Link>
        </div>
      </section>

      <QuoteBand>{t("page.how.quote")}</QuoteBand>

      <section className="bg-coral py-8 text-center">
        <h2 className="font-heading text-xl font-bold text-white md:text-2xl">{t("features.bandEvents")}</h2>
      </section>
      <section className="bg-white py-16">
        <FeatureGrid features={FEATURES} />
      </section>

      <section className="bg-white pb-20">
        <Stats />
      </section>
    </>
  );
}

export function StoryView() {
  const t = useT();
  return (
    <>
      <PageBanner heading={t("page.story.heading")} sub={t("page.story.sub")} />

      <section className="bg-white py-20">
        <Container className="grid items-center gap-12 md:grid-cols-2">
          <div className="relative h-[420px] overflow-hidden rounded-2xl shadow-lg">
            <Image src={COUPLE_IMG} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
          <div className="space-y-4 text-navy/80">
            <p>{t("page.story.p1")}</p>
            <p>{t("page.story.p2")}</p>
            <p>{t("page.story.p3")}</p>
            <p>{t("page.story.p4")}</p>
            <p className="font-accent text-lg text-coral">{t("page.story.quote")}</p>
          </div>
        </Container>
      </section>

      <section className="bg-white pb-20">
        <Stats />
      </section>

      <CtaBand text={t("page.story.cta")} />
    </>
  );
}

export function FoundersView() {
  const t = useT();
  return (
    <>
      <PageBanner heading={t("page.founders.heading")} sub={t("page.founders.sub")} />

      <section className="bg-white py-20">
        <Container className="grid items-center gap-12 md:grid-cols-2">
          <div className="relative h-[380px] overflow-hidden rounded-2xl shadow-lg">
            <Image src={PODCAST_IMG} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
          <div className="space-y-4 text-navy/80">
            <p>{t("page.founders.p1")}</p>
            <p>{t("page.founders.p2")}</p>
            <p>{t("page.founders.p3")}</p>
          </div>
        </Container>
      </section>

      <CtaBand text={t("page.founders.cta")} />
    </>
  );
}

export function PressView() {
  const t = useT();
  return (
    <>
      <PageBanner heading={t("page.press.heading")} sub={t("page.press.sub")} />

      <PressLogos />

      <section className="bg-white py-20">
        <Container className="grid items-center gap-12 md:grid-cols-2">
          <div className="relative h-[380px] overflow-hidden rounded-2xl shadow-lg">
            <Image src={PODCAST_IMG} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold tracking-wide text-coral">{t("page.press.label")}</p>
            <h2 className="mb-4 font-heading text-2xl font-bold md:text-3xl">{t("page.press.title")}</h2>
            <p className="text-navy/80">{t("page.press.body")}</p>
          </div>
        </Container>
      </section>

      <CtaBand text={t("page.press.cta")} cta={t("cta.contactUs")} href="/contact" />
    </>
  );
}

export function CommunityView() {
  const t = useT();
  return (
    <>
      <PageBanner heading={t("page.community.heading")} sub={t("page.community.sub")} />

      <section className="bg-white py-20">
        <Container className="mx-auto max-w-3xl space-y-5 text-center text-navy/80">
          <p>{t("page.community.p1")}</p>
          <p>{t("page.community.p2")}</p>
          <p>{t("page.community.p3")}</p>
        </Container>
      </section>

      <section className="overflow-hidden bg-cream py-10">
        <Carousel photos={GALLERY_PHOTOS} short />
      </section>

      <CtaBand text={t("page.community.cta")} cta={t("cta.contactUs")} href="/contact" />
    </>
  );
}

export function ReviewsView() {
  const t = useT();
  return (
    <>
      <PageBanner heading={t("page.reviews.heading")} sub={t("page.reviews.sub")} />

      <section className="bg-white py-16">
        <Container>
          <div className="mb-12 text-center">
            <p className="text-4xl font-bold">4.8</p>
            <p className="text-xl text-coral">★★★★★</p>
            <p className="mt-1 text-xs text-navy/50">{t("reviews.basedOn")}</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {REVIEWS.map((r) => (
              <div key={r.name} className="rounded-2xl bg-gray-100 p-8">
                <p className="mb-3 text-coral">★★★★★</p>
                <p className="mb-2 font-semibold">
                  {r.name} <span className="text-xs font-normal text-navy/50">{t("reviews.verified")}</span>
                </p>
                <p className="text-sm text-navy/70">{r.quote}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <PressLogos />

      <CtaBand text={t("page.reviews.cta")} />
    </>
  );
}

export function FaqsView() {
  const t = useT();
  return (
    <>
      <PageBanner heading={t("page.faqs.heading")} sub={t("page.faqs.sub")} />

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <FaqAccordion items={ALL_FAQS} />
          <p className="mt-10 text-center text-sm">
            {t("page.faqs.still")}{" "}
            <Link href="/contact" className="text-coral">
              {t("page.faqs.contact")}
            </Link>
          </p>
        </div>
      </section>

      <CtaBand text={t("page.faqs.cta")} />
    </>
  );
}

export function ThemesView() {
  const t = useT();
  const [selected, setSelected] = useState<(typeof THEMES)[number]>(THEMES[0]);

  return (
    <>
      <PageBanner heading={t("page.themes.heading")} sub={t("page.themes.sub")} />

      <section className="bg-white py-16">
        <Container>
          <p className="mb-12 text-center font-accent text-coral">{t("page.themes.tap")}</p>
          <div className="grid grid-cols-2 gap-8 text-center sm:grid-cols-3 md:grid-cols-5">
            {THEMES.map((theme) => {
              const active = theme.name === selected.name;
              return (
                <button
                  key={theme.name}
                  type="button"
                  onClick={() => setSelected(theme)}
                  aria-pressed={active}
                  className="group"
                >
                  <span
                    className={`mx-auto mb-3 block h-20 w-20 rounded-full border-4 shadow-lg transition-transform group-hover:scale-110 ${
                      active ? "border-coral scale-110" : "border-white"
                    }`}
                    style={{ background: theme.color }}
                  />
                  <span className={`block font-heading text-sm ${active ? "text-coral" : ""}`}>{theme.name}</span>
                </button>
              );
            })}
          </div>

          {/* Preview of the picked theme, so the "tap the colour wheels" line does something. */}
          <div className="mx-auto mt-14 max-w-md overflow-hidden rounded-2xl border border-gray-300 shadow-lg">
            <div className="h-28" style={{ background: selected.color }} />
            <div className="bg-white px-6 py-5 text-center">
              <p className="font-heading text-lg font-semibold">{selected.name}</p>
              <p className="mt-1 text-xs text-navy/50">{selected.color}</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-blush py-16 text-center">
        <Container>
          <p className="mx-auto max-w-2xl text-navy/80">{t("page.themes.body")}</p>
        </Container>
      </section>

      <CtaBand text={t("page.themes.cta")} cta={t("cta.seePackages")} href="/pricing" />
    </>
  );
}

export function ContactView() {
  const t = useT();
  const [sent, setSent] = useState(false);
  const fields = [
    { id: "name", label: t("page.contact.name"), type: "text" },
    { id: "email", label: t("page.contact.email"), type: "email" },
    { id: "subject", label: t("page.contact.subject"), type: "text" },
  ];

  return (
    <>
      <PageBanner heading={t("page.contact.heading")} sub={t("page.contact.sub")} />

      <section className="bg-white py-16">
        <Container className="grid gap-12 md:grid-cols-2">
          <form
            className="space-y-5"
            onSubmit={(e) => {
              // There is no backend here, so the form confirms locally.
              e.preventDefault();
              setSent(true);
            }}
          >
            <h2 className="font-heading text-xl font-bold">{t("page.contact.formTitle")}</h2>
            {fields.map((f) => (
              <div key={f.id}>
                <label htmlFor={f.id} className="mb-1 block text-sm font-semibold">
                  {f.label}
                </label>
                <input
                  id={f.id}
                  name={f.id}
                  type={f.type}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm"
                />
              </div>
            ))}
            <div>
              <label htmlFor="message" className="mb-1 block text-sm font-semibold">
                {t("page.contact.message")}
              </label>
              <textarea id="message" name="message" rows={5} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm" />
            </div>
            <button type="submit" className="rounded-full bg-coral px-7 py-3 font-semibold text-white">
              {t("page.contact.send")}
            </button>
            {sent && (
              <p role="status" className="rounded-lg bg-blush px-4 py-3 text-sm text-coral">
                {t("page.contact.sentDemo")}
              </p>
            )}
          </form>

          <div className="space-y-8">
            <div>
              <h3 className="mb-2 font-heading text-lg font-bold">{t("page.contact.humansTitle")}</h3>
              <p className="text-sm text-navy/70">{t("page.contact.humansBody")}</p>
            </div>
            <div>
              <h3 className="mb-2 font-heading text-lg font-bold">{t("page.contact.helpTitle")}</h3>
              <p className="text-sm text-navy/70">
                {t("page.contact.helpBody")}{" "}
                <Link href="/faqs" className="text-coral">
                  {t("footer.faqs")}
                </Link>
                .
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-heading text-lg font-bold">{t("page.contact.workTitle")}</h3>
              <p className="text-sm text-navy/70">{t("page.contact.workBody")}</p>
            </div>
            <div>
              <h3 className="mb-2 font-heading text-lg font-bold">{t("page.contact.mediaTitle")}</h3>
              <p className="text-sm text-navy/70">
                {t("page.contact.mediaBody")}{" "}
                <Link href="/press-features" className="text-coral">
                  {t("about.press")}
                </Link>
                .
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
