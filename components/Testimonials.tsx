"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useT } from "@/components/LanguageProvider";
import { Container } from "@/components/Sections";
import { Reveal } from "@/components/Reveal";

/**
 * PLACEHOLDER CONTENT. The three quotes, the names attached to them and the
 * portraits are invented for the layout preview and describe customers Memovo
 * does not have yet. The faces are AI-generated, so no real person is shown.
 * Swap `QUOTES` for real, attributable reviews before this ships, or drop
 * the section — presenting these as genuine would misrepresent the product.
 */
const QUOTES = [
  { q: "tst.q1", n: "tst.n1", r: "tst.r1", img: "/images/martina_r.jpeg" },
  { q: "tst.q2", n: "tst.n2", r: "tst.r2", img: "/images/david_and_friends.jpeg" },
  { q: "tst.q3", n: "tst.n3", r: "tst.r3", img: "/images/alex_k.jpeg" },
] as const;

function QuoteMark() {
  return (
    <svg viewBox="0 0 32 24" className="mb-4 h-6 w-8 text-coral" fill="currentColor" aria-hidden>
      <path d="M0 24V13.7C0 6.2 4.2 1.6 12 0l1.4 4C8.9 5.4 6.6 8 6.6 11.2h4.9V24H0zm18.6 0V13.7C18.6 6.2 22.8 1.6 30.6 0L32 4c-4.5 1.4-6.8 4-6.8 7.2h4.9V24H18.6z" />
    </svg>
  );
}

export function Testimonials({ titleKey = "tst.title" }: { titleKey?: string }) {
  const t = useT();
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLUListElement>(null);
  /* A smooth scroll fires the listener the whole way, which would drag the dot
     back to whichever card is passing. The click owns the state until it lands. */
  const lockUntil = useRef(0);
  const [active, setActive] = useState(0);

  /* Below md the cards sit on one swipeable track, so the dots have something to
     move. From md up all three are on screen at once and the dots are hidden;
     a control that cannot change anything should not be there to press. */
  /* Distances are read from bounding boxes rather than offsetLeft: the track is
     statically positioned, so a card's offsetParent is the body and its offsetLeft
     is a page coordinate, not a scroll offset inside the track. */
  const offsetOf = useCallback((i: number) => {
    const track = trackRef.current;
    const card = track?.children[i] as HTMLElement | undefined;
    if (!track || !card) return null;
    return track.scrollLeft + (card.getBoundingClientRect().left - track.getBoundingClientRect().left);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      if (Date.now() < lockUntil.current) return;
      // The gap makes width-based maths drift, so the nearest card wins instead.
      let nearest = 0;
      let best = Infinity;
      for (let i = 0; i < track.children.length; i += 1) {
        const left = (track.children[i] as HTMLElement).getBoundingClientRect().left;
        const distance = Math.abs(left - track.getBoundingClientRect().left);
        if (distance < best) {
          best = distance;
          nearest = i;
        }
      }
      setActive((prev) => (prev === nearest ? prev : nearest));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  function goTo(i: number) {
    const track = trackRef.current;
    const left = offsetOf(i);
    if (!track || left === null) return;
    lockUntil.current = Date.now() + (reduced ? 0 : 700);
    track.scrollTo({ left, behavior: reduced ? "auto" : "smooth" });
    setActive(i);
  }

  return (
    <section className="bg-white py-10 md:py-16">
      <Container>
        <h2 className="mb-10 text-center font-heading text-2xl font-bold md:text-3xl">{t(titleKey as never)}</h2>

        {/* Column layout on each card + `mt-auto` on its footer: the quotes run to
            different lengths, and this keeps every name row on the same baseline. */}
      <Reveal>
        <ul
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-3 md:overflow-visible md:pb-0"
        >
          {QUOTES.map((c) => (
            <li
              key={c.q}
              className="flex h-auto w-full shrink-0 snap-center flex-col rounded-2xl bg-white p-7 shadow-sm md:h-full md:w-auto"
            >
              <QuoteMark />
              <p className="mb-6 text-sm leading-relaxed text-navy/80">{t(c.q)}</p>
              <div className="mt-auto flex items-center gap-3">
                {/* No `sizes`: at a fixed size next/image ships a 1x/2x pair, which keeps
                    the 40px avatar sharp on retina screens. */}
                <Image
                  src={c.img}
                  alt=""
                  width={80}
                  height={80}
                  className="h-10 w-10 shrink-0 rounded-full object-cover"
                />
                <span>
                  <span className="block text-sm font-semibold">{t(c.n)}</span>
                  <span className="block text-xs text-muted-foreground">{t(c.r)}</span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>

        <div className="mt-8 flex justify-center gap-2 md:hidden">
          {QUOTES.map((c, i) => (
            <button
              key={c.q}
              type="button"
              onClick={() => goTo(i)}
              aria-label={t(c.n)}
              aria-current={i === active ? "true" : undefined}
              className={`h-2.5 rounded-full transition-all ${i === active ? "w-6 bg-coral" : "w-2.5 bg-coral/30"}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
