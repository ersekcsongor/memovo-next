"use client";

import Image from "next/image";
import Link from "next/link";
import { type Feature, type Step } from "@/data/content";
import { useT } from "@/components/LanguageProvider";
import { Reveal } from "@/components/Reveal";
import { FAQSection } from "@/components/ui/faq-section-shadcnui";

/* ---------- primitives ---------- */

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-[1140px] px-6 ${className}`}>{children}</div>;
}

export function HeroImage({ src, alt, height = "h-[320px] md:h-[530px]" }: { src: string; alt: string; height?: string }) {
  return (
    <section className={`relative w-full overflow-hidden bg-white ${height}`}>
      <Image src={src} alt={alt} fill className="object-cover" priority sizes="100vw" />
    </section>
  );
}

/**
 * The light ground the home and category heroes stand on: a blush-to-white
 * gradient, soft blooms drawn behind the visual, and a fade that melts into the
 * white section below so the two meet with no seam.
 *
 * The blooms are kept clear of the bottom edge. The section clips its overflow,
 * and a blurred circle cut off there leaves a hard line across the page.
 */
export function HeroSurface({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`relative overflow-hidden bg-gradient-to-b from-blush via-cream to-white to-85% ${className}`}>
      <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="absolute -top-28 -right-20 block h-[28rem] w-[28rem] rounded-full bg-pinklight blur-2xl" />
        <span className="absolute top-36 right-1/3 block h-56 w-56 rounded-full bg-pinkband/50 blur-2xl" />
        <span className="absolute bottom-40 -left-24 block h-64 w-64 rounded-full bg-pinklight/80 blur-2xl" />
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 block h-64 bg-gradient-to-b from-transparent to-white"
      />
      {children}
    </section>
  );
}

export function PageBanner({ heading, sub }: { heading: string; sub?: string }) {
  return (
    <section className="bg-white py-10 text-center md:py-12">
      <Container>
        <h1 className="font-heading text-2xl font-bold md:text-4xl">{heading}</h1>
        {sub && <p className="mt-3 font-accent text-lg text-navy/80">{sub}</p>}
      </Container>
    </section>
  );
}

/* ---------- shared sections ---------- */

export function StepsGrid({ steps }: { steps: Step[] }) {
  const t = useT();
  return (
    <Container className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((s) => (
        <div key={s.key} className="flex gap-4">
          <s.Icon className="h-12 w-12 shrink-0 text-coral" stroke={1.5} aria-hidden />
          <div>
            <h2 className="text-sm font-semibold tracking-wide">{t(`${s.key}.title` as never)}</h2>
            <p className="text-sm text-navy/70">{t(`${s.key}.body` as never)}</p>
          </div>
        </div>
      ))}
    </Container>
  );
}

export function FeatureGrid({ features }: { features: Feature[] }) {
  const t = useT();
  return (
    <Container>
      <div className="grid grid-cols-2 gap-x-8 gap-y-12 text-center md:grid-cols-4">
        {features.map((f, i) => (
          <Reveal key={f.key} index={i}>
            <f.Icon className="mx-auto mb-4 h-12 w-12 text-coral" stroke={1.5} aria-hidden />
            <h2 className="mb-2 font-heading text-lg">{t(`${f.key}.title` as never)}</h2>
            <p className="text-sm text-navy/70">{t(`${f.key}.body` as never)}</p>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}

/**
 * Stands where a press-logo strip used to sit. Memovo has no coverage yet, and a row of
 * publication logos would claim otherwise, so this invites coverage instead of faking it.
 */
export function PressStrip() {
  const t = useT();
  return (
    <section className="bg-white py-10 md:py-14">
      <Container className="text-center">
        <p className="mb-3 font-accent text-lg">{t("page.press.kitTitle")}</p>
        <p className="mx-auto mb-6 max-w-2xl text-sm text-navy/70">{t("page.press.kitBody")}</p>
        <Link href="/contact" className="inline-flex min-h-11 items-center rounded-full border-2 border-navy px-6 text-sm font-semibold transition-colors hover:bg-navy hover:text-white">
          {t("cta.contactUs")}
        </Link>
      </Container>
    </section>
  );
}

export function QuoteBand({ children, tone = "pink" }: { children: React.ReactNode; tone?: "pink" | "coral" }) {
  const bg = tone === "coral" ? "bg-coral" : "bg-white";
  // The coral band is dark, the pink one light.
  const fg = tone === "coral" ? "text-white" : "text-navy";
  return (
    <section className={`${bg} py-10 md:py-14`}>
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className={`font-accent text-xl leading-relaxed md:text-2xl ${fg}`}>{children}</p>
      </div>
    </section>
  );
}

export function Carousel({
  photos,
  short = false,
}: {
  photos: readonly { src: string; alt: string }[];
  short?: boolean;
}) {
  // The track holds two copies so the -2864px keyframe loops seamlessly.
  const doubled = [...photos, ...photos];
  const height = short ? 300 : 490;
  return (
    <div className="carousel-viewport">
      <div className="carousel-track">
        {doubled.map((p, i) => (
          <figure key={`${p.src}-${i}`} className={`carousel-slide ${short ? "short" : ""}`}>
            {/* Slides sit outside the viewport horizontally, so lazy loading never triggers for them. */}
            <Image src={p.src} alt={i < photos.length ? p.alt : ""} width={350} height={height} loading="eager" />
          </figure>
        ))}
      </div>
    </div>
  );
}

/**
 * Turns translation keys into the card accordion. The keys stay the call site's
 * concern; the look and the animation live in the ui component.
 */
export function FaqAccordion({ items, title, subtitle }: { items: string[]; title?: string; subtitle?: string }) {
  const t = useT();
  return (
    <FAQSection
      title={title}
      subtitle={subtitle}
      items={items.map((key) => ({
        question: t(`faq.${key}.q` as never),
        answer: t(`faq.${key}.a` as never),
      }))}
    />
  );
}

export function CtaBand({
  text,
  cta,
  href = "/pricing",
  curveFrom,
}: {
  text: string;
  cta?: string;
  href?: string;
  /** Paints a curved lip in this colour across the top edge, matching the live home page. */
  curveFrom?: string;
}) {
  const t = useT();
  const label = cta ?? t("cta.getStarted");
  return (
    <section className="relative overflow-hidden bg-coral py-10 text-center md:py-16">
      {curveFrom && (
        <svg
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          className="absolute inset-x-0 top-0 h-[90px] w-full"
          aria-hidden
        >
          <path d="M0,0 H1440 V18 C1080,90 360,90 0,18 Z" fill={curveFrom} />
        </svg>
      )}
      <div className="relative mx-auto max-w-3xl px-6">
        <p className="mb-6 font-accent text-xl leading-relaxed text-white md:text-2xl">{text}</p>
        <Link href={href} className="inline-block rounded-full bg-white px-7 py-3 font-semibold text-navy transition-colors hover:bg-cream">
          {label}
        </Link>
      </div>
    </section>
  );
}
