"use client";

import Image from "next/image";
import Link from "next/link";
import { type Feature, type Step } from "@/data/content";
import { useT } from "@/components/LanguageProvider";

/* ---------- primitives ---------- */

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-[1140px] px-6 ${className}`}>{children}</div>;
}

export function HeroImage({ src, alt, height = "h-[320px] md:h-[530px]" }: { src: string; alt: string; height?: string }) {
  return (
    <section className={`relative w-full overflow-hidden bg-gray-100 ${height}`}>
      <Image src={src} alt={alt} fill className="object-cover" priority sizes="100vw" />
    </section>
  );
}

export function PageBanner({ heading, sub }: { heading: string; sub?: string }) {
  return (
    <section className="bg-blush py-12 text-center">
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
          <Image src={s.icon} alt="" width={56} height={56} className="h-14 w-14 shrink-0" />
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
        {features.map((f) => (
          <div key={f.key}>
            <Image src={f.icon} alt="" width={56} height={56} className="mx-auto mb-4 h-14 w-auto" />
            <h2 className="mb-2 font-heading text-lg">{t(`${f.key}.title` as never)}</h2>
            <p className="text-sm text-navy/70">{t(`${f.key}.body` as never)}</p>
          </div>
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
    <section className="bg-cream py-14">
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
  const bg = tone === "coral" ? "bg-coral" : "bg-pinklight";
  const fg = "text-navy";
  return (
    <section className={`${bg} py-14`}>
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

export function FaqAccordion({ items }: { items: string[] }) {
  const t = useT();
  return (
    <div className="grid gap-x-6 gap-y-4 md:grid-cols-2">
      {items.map((key) => (
        <details key={key} className="rounded-full border-2 border-navy px-6 py-1 open:rounded-2xl">
          {/* The summary carries the height, so the whole row is one 44px target. */}
          <summary className="flex min-h-11 items-center font-heading font-medium">{t(`faq.${key}.q` as never)}</summary>
          <p className="mt-3 text-sm text-navy/70">{t(`faq.${key}.a` as never)}</p>
        </details>
      ))}
    </div>
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
    <section className="relative overflow-hidden bg-coral py-16 text-center">
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
        <p className="mb-6 font-accent text-xl leading-relaxed text-navy md:text-2xl">{text}</p>
        <Link href={href} className="inline-block rounded-full bg-white px-7 py-3 font-semibold text-navy transition-colors hover:bg-cream">
          {label}
        </Link>
      </div>
    </section>
  );
}
