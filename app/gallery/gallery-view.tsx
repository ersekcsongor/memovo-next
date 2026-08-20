"use client";

import { useEffect, useRef, useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import { useReducedMotion } from "framer-motion";
import { CircularGallery, type GalleryItem } from "@/components/ui/circular-gallery";
import { ClosingBand, StepsRow } from "@/components/Blocks";
import { Container } from "@/components/Sections";
import { useT } from "@/components/LanguageProvider";

/* The cards are a fixed 300px wide and the ring radius is fixed too, so the whole
   assembly is scaled down on narrow viewports. Scaling keeps the spacing between
   cards proportional; shrinking the radius alone collapses them onto each other. */
function scaleFor(width: number) {
  if (width >= 1280) return 1;
  if (width >= 1024) return 0.85;
  if (width >= 640) return 0.7;
  return 0.55;
}

/**
 * Four movements: a vertical intro, the ring itself on a scroll runway, the steps
 * behind the photos, and a way out. The ring alone left visitors at a dead end.
 */
export default function GalleryView({ items }: { items: GalleryItem[] }) {
  const [scale, setScale] = useState(1);
  const [started, setStarted] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const t = useT();

  useEffect(() => {
    const update = () => setScale(scaleFor(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* The bar is written straight to the DOM: a scroll listener that called setState
     would re-render the whole ring on every wheel notch. */
  useEffect(() => {
    if (reduced) return;
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
      setStarted((prev) => (prev === progress > 0.02 ? prev : progress > 0.02));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduced]);

  return (
    <>
      {/* 1. Intro */}
      <section className="bg-white py-10 text-center md:py-16">
        <Container>
          <h1 className="font-heading text-2xl font-bold text-navy sm:text-3xl md:text-4xl">{t("ring.heading")}</h1>
          <p className="mt-3 text-sm text-muted-foreground">{t(reduced ? "ring.subStatic" : "ring.sub")}</p>
          <p className="mx-auto mt-4 max-w-lg text-navy/80">{t("ring.intro")}</p>
          {!reduced && (
            <IconChevronDown className="mx-auto mt-8 h-6 w-6 animate-bounce text-coral" stroke={2} aria-hidden />
          )}
        </Container>
      </section>

      {/* 2. The journey. The tall parent is the runway the rotation reads from; under
          reduced motion the gallery is a grid and needs none of it. */}
      <div className="h-[400vh] w-full motion-reduce:h-auto">
        <div className="sticky top-[82px] flex h-[calc(100vh-82px)] w-full flex-col items-center justify-center overflow-hidden motion-reduce:static motion-reduce:h-auto motion-reduce:overflow-visible">
          <div
            className="min-h-0 w-full flex-1 motion-reduce:h-auto motion-reduce:flex-none"
            style={{ transform: reduced ? undefined : `scale(${scale})` }}
          >
            <CircularGallery items={items} label={t("ring.a11yLabel")} />
          </div>

          {!reduced && (
            <>
              {/* Says the page answers to scrolling, then gets out of the way once it does. */}
              <div
                aria-hidden
                className={`absolute bottom-5 left-1/2 z-10 -translate-x-1/2 text-xs font-semibold text-coral-ink transition-opacity duration-500 ${
                  started ? "opacity-0" : "opacity-100"
                }`}
              >
                {t("ring.keyHint")}
              </div>

              {/* How far through the turn the visitor is. */}
              <div className="absolute inset-x-0 bottom-0 z-10 h-1 bg-border">
                <div ref={barRef} className="h-full origin-left scale-x-0 bg-coral" />
              </div>
            </>
          )}
        </div>
      </div>

      {/* 3. Detail reveal: how the photos got there in the first place. */}
      <section className="bg-white py-10 md:py-16">
        <Container>
          <h2 className="mb-12 text-center font-heading text-2xl font-bold md:text-3xl">{t("works.title")}</h2>
          <StepsRow />
        </Container>
      </section>

      {/* 4. The way out. The generic closing copy, not the wedding one: this gallery
          shows every kind of event. */}
      <ClosingBand titleKey="final.title" bodyKey="final.body" />
    </>
  );
}
