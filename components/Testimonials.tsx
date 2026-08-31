"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useT } from "@/components/LanguageProvider";
import { Container } from "@/components/Sections";
import { Reveal } from "@/components/Reveal";

/**
 * PLACEHOLDER CONTENT. The five quotes, the names attached to them and the
 * portraits are invented for the layout preview and describe customers Memovo
 * does not have yet. The faces are AI-generated, so no real person is shown.
 * Swap `QUOTES` for real, attributable reviews before this ships, or drop
 * the section — presenting these as genuine would misrepresent the product.
 *
 * `img` is optional: an entry without one falls back to a monogram, which is
 * how the section looked before any portraits existed.
 */
const QUOTES: { q: string; n: string; r: string; img?: string }[] = [
  { q: "tst.q1", n: "tst.n1", r: "tst.r1", img: "/images/martina_r.jpeg" },
  { q: "tst.q2", n: "tst.n2", r: "tst.r2", img: "/images/david_and_friends.jpeg" },
  { q: "tst.q3", n: "tst.n3", r: "tst.r3", img: "/images/alex_k.jpeg" },
  { q: "tst.q4", n: "tst.n4", r: "tst.r4", img: "/images/nora_and_tom.png" },
  { q: "tst.q5", n: "tst.n5", r: "tst.r5", img: "/images/priya_s.png" },
];

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

  /* Three stops along the track rather than one dot per card. The row stays the
     same width however long the list grows, and each stop still moves something
     at every breakpoint. */
  const STOPS = 3;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      if (Date.now() < lockUntil.current) return;
      const max = track.scrollWidth - track.clientWidth;
      const at = max <= 0 ? 0 : Math.round((track.scrollLeft / max) * (STOPS - 1));
      setActive((prev) => (prev === at ? prev : at));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  function goTo(i: number) {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    lockUntil.current = Date.now() + (reduced ? 0 : 700);
    track.scrollTo({ left: (max * i) / (STOPS - 1), behavior: reduced ? "auto" : "smooth" });
    setActive(i);
  }

  return (
    <section className="bg-white py-10 md:py-16">
      <Container>
        <h2 className="mb-10 text-center font-heading text-2xl font-bold md:text-3xl">{t(titleKey as never)}</h2>

        {/* One snapping track at every width. Five cards against three columns means
            there is always something left to reach, so the dots keep their job on a
            wide screen too. Column layout on each card, with `mt-auto` on its footer,
            holds every name row on one baseline whatever length the quote runs to. */}
        <Reveal>
          <ul
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {QUOTES.map((c) => (
              <li
                key={c.q}
                className="flex w-full shrink-0 snap-start flex-col rounded-2xl bg-white p-7 shadow-sm sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
              >
                <QuoteMark />
                <p className="mb-6 text-sm leading-relaxed text-navy/80">{t(c.q as never)}</p>
                <div className="mt-auto flex items-center gap-3">
                  {c.img ? (
                    /* No `sizes`: at a fixed size next/image ships a 1x/2x pair, which
                       keeps the 40px avatar sharp on retina screens. */
                    <Image
                      src={c.img}
                      alt=""
                      width={80}
                      height={80}
                      className="h-10 w-10 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <span
                      aria-hidden
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-coral text-xs font-bold text-white"
                    >
                      {t(c.n as never).trim().slice(0, 1).toUpperCase()}
                    </span>
                  )}
                  <span>
                    <span className="block text-sm font-semibold">{t(c.n as never)}</span>
                    <span className="block text-xs text-muted-foreground">{t(c.r as never)}</span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: STOPS }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`${i + 1} / ${STOPS}`}
              aria-current={i === active ? "true" : undefined}
              className={`h-2.5 rounded-full transition-all ${i === active ? "w-6 bg-coral" : "w-2.5 bg-coral/30"}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
