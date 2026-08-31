"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { IconChevronLeft, IconChevronRight, IconX, IconZoomIn } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export type GalleryImage = {
  id: number;
  url: string;
  title: string;
  /** The album the photo belongs to; drives the filter row. */
  category: string;
};

/**
 * A filterable photo grid with a lightbox.
 *
 * Photos and album names arrive as props: the page owns the content and its
 * translations, this owns the behaviour.
 */
export function GalleryGridBlock({
  images,
  allLabel = "All",
  heading,
  subheading,
  badgeLabel,
  closeLabel = "Close",
  prevLabel = "Previous photo",
  nextLabel = "Next photo",
}: {
  images: GalleryImage[];
  allLabel?: string;
  heading?: string;
  subheading?: string;
  badgeLabel?: string;
  closeLabel?: string;
  prevLabel?: string;
  nextLabel?: string;
}) {
  const reduced = useReducedMotion();
  const [selected, setSelected] = useState<number | null>(null);
  const [filter, setFilter] = useState(allLabel);

  const categories = [allLabel, ...Array.from(new Set(images.map((i) => i.category)))];
  const shown = filter === allLabel ? images : images.filter((i) => i.category === filter);
  const current = images.find((i) => i.id === selected) ?? null;

  /* The lightbox steps through the filtered set, so the arrows follow what is on
     screen rather than wandering into photos the filter has hidden. */
  const step = useCallback(
    (by: number) => {
      setSelected((id) => {
        if (id === null) return id;
        const at = shown.findIndex((i) => i.id === id);
        if (at === -1) return id;
        return shown[(at + by + shown.length) % shown.length].id;
      });
    },
    [shown],
  );

  /* Escape closes and the arrows move, which a visitor without a mouse needs and
     which the dialog role promises. */
  useEffect(() => {
    if (selected === null) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    // The page behind must not scroll while the lightbox covers it.
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [selected, step]);

  const openOnKey = (e: KeyboardEvent<HTMLDivElement>, id: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setSelected(id);
    }
  };

  return (
    <section className="w-full" aria-labelledby={heading ? "gallery-grid-heading" : undefined}>
      {heading && (
        <div className="mb-10 text-center">
          {badgeLabel && (
            <Badge variant="secondary" className="mb-4">
              {badgeLabel}
            </Badge>
          )}
          <h2 id="gallery-grid-heading" className="mb-3 font-heading text-2xl font-bold md:text-3xl">
            {heading}
          </h2>
          {subheading && <p className="mx-auto max-w-2xl text-sm text-muted-foreground">{subheading}</p>}
        </div>
      )}

      <div className="mb-8 flex flex-wrap justify-center gap-2" role="group" aria-label={badgeLabel ?? allLabel}>
        {categories.map((category) => (
          <Button
            key={category}
            variant={filter === category ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(category)}
            aria-pressed={filter === category}
          >
            {category}
          </Button>
        ))}
      </div>

      <motion.ul layout={!reduced} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((image, i) => (
            <motion.li
              key={image.id}
              layout={!reduced}
              initial={reduced ? false : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduced ? undefined : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: reduced ? 0 : Math.min(i, 6) * 0.04 }}
            >
              <Card
                className="group relative cursor-pointer overflow-hidden p-0 transition hover:shadow-xl"
                onClick={() => setSelected(image.id)}
                onKeyDown={(e) => openOnKey(e, image.id)}
                role="button"
                tabIndex={0}
                aria-label={image.title}
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={image.url}
                    alt={image.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* White on a dark scrim. The muted grey the rest of the page uses
                      would sit at roughly 2:1 against black. */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <IconZoomIn className="mb-2 h-8 w-8" stroke={1.6} aria-hidden />
                    <h3 className="mb-2 px-3 text-center font-heading text-base font-semibold">{image.title}</h3>
                    <Badge variant="secondary">{image.category}</Badge>
                  </div>
                </div>
              </Card>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <AnimatePresence>
        {current && (
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelected(null)}
            role="dialog"
            aria-modal="true"
            aria-label={current.title}
          >
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-4 right-4 text-white"
              onClick={() => setSelected(null)}
              aria-label={closeLabel}
            >
              <IconX className="h-6 w-6" stroke={2} aria-hidden />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="absolute left-2 text-white sm:left-6"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label={prevLabel}
            >
              <IconChevronLeft className="h-8 w-8" stroke={2} aria-hidden />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-2 text-white sm:right-6"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label={nextLabel}
            >
              <IconChevronRight className="h-8 w-8" stroke={2} aria-hidden />
            </Button>

            <motion.figure
              onClick={(e) => e.stopPropagation()}
              initial={reduced ? false : { scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={reduced ? undefined : { scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", damping: 26, stiffness: 300 }}
              className="max-w-4xl text-center"
            >
              <span className="relative block h-[68vh] w-[86vw] max-w-4xl">
                <Image
                  key={current.id}
                  src={current.url}
                  alt={current.title}
                  fill
                  className="rounded-lg object-contain"
                  sizes="86vw"
                />
              </span>
              <figcaption className="mt-4 text-white">
                <span className="mb-2 block font-heading text-lg font-semibold">{current.title}</span>
                <Badge variant="secondary">{current.category}</Badge>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
