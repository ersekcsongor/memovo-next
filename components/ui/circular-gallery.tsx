"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type HTMLAttributes } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface GalleryItem {
  common: string;
  binomial: string;
  photo: {
    url: string;
    text: string;
    pos?: string;
    by: string;
  };
}

interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  /** How far the cards sit from the centre of the ring. */
  radius?: number;
  /** Degrees per frame the ring drifts while the page is still. */
  autoRotateSpeed?: number;
  /** Screen-reader name for the whole ring, so it stays translatable. */
  label?: string;
  /** Announced as "3 / 8" and read out when the front card changes. */
  positionLabel?: (index: number, total: number) => string;
}

function Caption({ item }: { item: GalleryItem }) {
  return (
    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
      <h2 className="font-heading text-lg font-bold">{item.common}</h2>
      <p className="text-sm opacity-85">{item.binomial}</p>
    </div>
  );
}

/**
 * A ring of photos that turns with the page scroll.
 *
 * Motion is opt-out: when the visitor asks for reduced motion the ring is replaced
 * by a plain grid, because scroll-driven rotation is a known trigger for nausea.
 * The turning version drives its transforms straight onto the DOM inside one
 * animation frame, so a full revolution costs no React renders.
 */
export function CircularGallery({
  items,
  className,
  radius = 600,
  autoRotateSpeed = 0.02,
  label = "Rotating photo gallery",
  positionLabel = (i, total) => `${i + 1} / ${total}`,
  ...props
}: CircularGalleryProps) {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  /** Degrees added by the arrow keys, on top of whatever the scroll position gives. */
  const keyOffset = useRef(0);
  const drift = useRef(0);
  const [front, setFront] = useState(0);

  const anglePerItem = 360 / items.length;

  useEffect(() => {
    if (reduced) return;

    let frame = 0;
    let onScreen = true;
    let lastScrollY = -1;
    let stillFrames = 0;

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
    });
    if (rootRef.current) io.observe(rootRef.current);

    const tick = () => {
      frame = requestAnimationFrame(tick);
      // A hidden tab or an off-screen ring earns no work.
      if (!onScreen || document.hidden) return;

      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;

      // The ring only drifts once the page has been still for a few frames.
      if (window.scrollY === lastScrollY) {
        stillFrames += 1;
        if (stillFrames > 8) drift.current += autoRotateSpeed;
      } else {
        stillFrames = 0;
        lastScrollY = window.scrollY;
      }

      const rotation = progress * 360 + drift.current + keyOffset.current;
      if (trackRef.current) trackRef.current.style.transform = `rotateY(${rotation}deg)`;

      let nearest = 0;
      let nearestDistance = 360;
      for (let i = 0; i < items.length; i += 1) {
        const relative = (i * anglePerItem + rotation) % 360;
        const positive = (relative + 360) % 360;
        const distance = positive > 180 ? 360 - positive : positive;
        // Cards on the far side fade back rather than competing with the front one.
        const card = cardsRef.current[i];
        if (card) card.style.opacity = String(Math.max(0.25, 1 - distance / 180));
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearest = i;
        }
      }
      setFront((prev) => (prev === nearest ? prev : nearest));
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
    };
  }, [reduced, items.length, anglePerItem, autoRotateSpeed]);

  /* Reduced motion, and the small-screen case where a 600px ring never fitted:
     the same photos and captions, laid out as a grid that simply scrolls. */
  if (reduced) {
    return (
      <div ref={rootRef} className={cn("w-full", className)} aria-label={label} role="region" {...props}>
        <ul className="mx-auto grid max-w-[1140px] gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.photo.url} className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-lg">
              <Image
                src={item.photo.url}
                alt={item.photo.text}
                fill
                className="object-cover"
                style={{ objectPosition: item.photo.pos ?? "center" }}
                sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
              />
              <Caption item={item} />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          keyOffset.current += anglePerItem;
          e.preventDefault();
        } else if (e.key === "ArrowRight") {
          keyOffset.current -= anglePerItem;
          e.preventDefault();
        }
      }}
      className={cn("relative flex h-full w-full items-center justify-center", className)}
      style={{ perspective: "2000px" }}
      {...props}
    >
      {/* Names the card at the front. Visible as a counter, and announced as the
          ring turns so it is followable without sight. */}
      <p
        aria-live="polite"
        className="absolute right-6 bottom-4 z-10 rounded-full border border-border bg-white/90 px-3 py-1 text-xs font-semibold text-navy shadow-sm"
      >
        <span aria-hidden>{positionLabel(front, items.length)}</span>
        <span className="sr-only">
          {positionLabel(front, items.length)} {items[front]?.common}
        </span>
      </p>

      <div ref={trackRef} className="relative h-full w-full" style={{ transformStyle: "preserve-3d" }}>
        {items.map((item, i) => (
          <div
            key={item.photo.url}
            ref={(el) => {
              cardsRef.current[i] = el;
            }}
            role="group"
            aria-label={item.common}
            className="absolute top-1/2 left-1/2 -mt-[200px] -ml-[150px] h-[400px] w-[300px]"
            style={{
              transform: `rotateY(${i * anglePerItem}deg) translateZ(${radius}px)`,
              /* The far side of the ring would otherwise show its cards mirrored,
                 captions and all. It belongs on the rotated element itself. */
              backfaceVisibility: "hidden",
            }}
          >
            <div className="relative h-full w-full overflow-hidden rounded-lg border border-border shadow-2xl">
              <Image
                src={item.photo.url}
                alt={item.photo.text}
                fill
                className="object-cover"
                style={{ objectPosition: item.photo.pos ?? "center" }}
                sizes="300px"
                /* The ring holds every card in the layout at once, so lazy loading
                   would only ever fire late. */
                loading="eager"
              />
              <Caption item={item} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
