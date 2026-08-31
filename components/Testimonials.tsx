"use client";

import Image from "next/image";
import { useState } from "react";
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
  const [active, setActive] = useState(0);

  return (
    <section className="bg-white py-10 md:py-16">
      <Container>
        <h2 className="mb-10 text-center font-heading text-2xl font-bold md:text-3xl">{t(titleKey as never)}</h2>

        {/* Column layout on each card + `mt-auto` on its footer: the quotes run to
            different lengths, and this keeps every name row on the same baseline. */}
        <ul className="grid gap-6 md:grid-cols-3">
          {QUOTES.map((c, i) => (
            <Reveal as="li" key={c.q} index={i} className="flex h-full flex-col rounded-2xl bg-white p-7 shadow-sm">
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
            </Reveal>
          ))}
        </ul>

        <div className="mt-8 flex justify-center gap-2">
          {QUOTES.map((c, i) => (
            <button
              key={c.q}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`${i + 1}`}
              aria-current={i === active ? "true" : undefined}
              className={`h-2.5 rounded-full transition-all ${i === active ? "w-6 bg-coral" : "w-2.5 bg-coral/30"}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
