"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GALLERY_PHOTOS } from "@/data/assets";
import { ALL_FAQS, FEATURES, STEPS, THEMES, WEDDING_PLANS } from "@/data/content";
import { useT } from "@/components/LanguageProvider";
import { PricingSection } from "@/components/Pricing";
import {
  Carousel,
  Container,
  CtaBand,
  FaqAccordion,
  FeatureGrid,
  PageBanner,
  PressStrip,
  QuoteBand,
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
            <span className="rounded-full bg-pinklight px-4 py-1.5 text-center text-xs font-bold text-coral-ink">
              {t("page.pricing.offer")}
            </span>
          </div>
          <PricingSection plans={WEDDING_PLANS} />
          <p className="mx-auto mt-10 max-w-2xl text-center text-xs text-navy/50">{t("page.pricing.footnote")}</p>
        </Container>
      </section>

      <section className="bg-cream py-16 text-center">
        <Container>
          <h2 className="mb-3 font-accent text-2xl text-coral-ink md:text-3xl">{t("page.pricing.tailored")}</h2>
          <p className="mb-8 text-navy/80">{t("page.pricing.tailoredSub")}</p>
          <div className="flex flex-wrap justify-center gap-3">
            {EVENT_PRICING.map((p) => (
              <Link key={p.href} href={p.href} className="inline-flex min-h-11 items-center rounded-full bg-coral px-5 text-xs font-semibold text-navy">
                {t(p.key)} – {t("cta.pricing")}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <PressStrip />
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
          <Link href="/pricing" className="inline-flex min-h-11 items-center rounded-full bg-coral px-6 text-sm font-semibold text-navy">
            {t("cta.pricing")}
          </Link>
          <Link href="/faqs" className="inline-flex min-h-11 items-center rounded-full border-2 border-navy px-6 text-sm font-semibold">
            {t("cta.faqs")}
          </Link>
        </div>
      </section>

      <QuoteBand>{t("page.how.quote")}</QuoteBand>

      <section className="bg-coral py-8 text-center">
        <h2 className="font-heading text-xl font-bold text-navy md:text-2xl">{t("features.bandEvents")}</h2>
      </section>
      <section className="bg-white py-16">
        <FeatureGrid features={FEATURES} />
      </section>

    </>
  );
}

export function PressView() {
  const t = useT();
  return (
    <>
      <PageBanner heading={t("page.press.heading")} sub={t("page.press.sub")} />

      {/* Nothing has been written about Memovo yet, so this says so rather than inventing coverage. */}
      <section className="bg-white py-20">
        <Container className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 font-accent text-2xl md:text-3xl">{t("page.press.emptyTitle")}</h2>
          <p className="text-navy/70">{t("page.press.emptyBody")}</p>
        </Container>
      </section>

      <PressStrip />

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

      {/* No testimonials until real hosts have written them. */}
      <section className="bg-white py-20">
        <Container className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 font-accent text-2xl md:text-3xl">{t("reviews.emptyTitle")}</h2>
          <p className="mb-8 text-navy/70">{t("reviews.emptyBody")}</p>
          <Link href="/pricing" className="inline-flex min-h-11 items-center rounded-full bg-coral px-7 font-semibold text-navy">
            {t("reviews.emptyCta")}
          </Link>
        </Container>
      </section>

      <PressStrip />

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
            <Link href="/contact" className="text-coral-ink">
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
          <p className="mb-12 text-center font-accent text-coral-ink">{t("page.themes.tap")}</p>
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
                  <span className={`block font-heading text-sm ${active ? "text-coral-ink" : ""}`}>{theme.name}</span>
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
  // `autoComplete` lets the browser fill the two fields it already knows.
  const fields = [
    { id: "name", label: t("page.contact.name"), type: "text", autoComplete: "name" },
    { id: "email", label: t("page.contact.email"), type: "email", autoComplete: "email" },
    { id: "subject", label: t("page.contact.subject"), type: "text", autoComplete: "off" },
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
                  autoComplete={f.autoComplete}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3"
                />
              </div>
            ))}
            <div>
              <label htmlFor="message" className="mb-1 block text-sm font-semibold">
                {t("page.contact.message")}
              </label>
              <textarea id="message" name="message" rows={5} className="w-full rounded-lg border border-gray-300 px-4 py-3" />
            </div>
            <button type="submit" className="rounded-full bg-coral px-7 py-3 font-semibold text-navy">
              {t("page.contact.send")}
            </button>
            {sent && (
              <p role="status" className="rounded-lg bg-blush px-4 py-3 text-sm text-coral-ink">
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
                <Link href="/faqs" className="text-coral-ink">
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
                <Link href="/press-features" className="text-coral-ink">
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
