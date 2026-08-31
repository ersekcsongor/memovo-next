"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Lifts a card into place as it is scrolled to.
 *
 * `index` staggers a row so the cards arrive one after another rather than as a
 * block. It fires once: re-animating on the way back up turns a page into a
 * flicker. Reduced motion drops the travel and the fade entirely, which is why
 * the element is rendered without any initial state in that case rather than
 * animated to a resting position.
 */
export function Reveal({
  children,
  index = 0,
  className,
  as = "div",
  inTrack = false,
}: {
  children: React.ReactNode;
  index?: number;
  className?: string;
  /** `li` when the parent is a list, so the markup stays valid. */
  as?: "div" | "li";
  /**
   * Set inside a horizontal scroller. The observer watches both axes, so a card
   * parked off to the right would never count as visible and would stay hidden
   * until it was swiped to. This widens the box sideways so only the vertical
   * position decides.
   */
  inTrack?: boolean;
}) {
  const reduced = useReducedMotion();
  const Tag = as === "li" ? motion.li : motion.div;

  if (reduced) {
    const Plain = as === "li" ? "li" : "div";
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: inTrack ? "0px 9999px -80px 9999px" : "0px 0px -80px 0px" }}
      transition={{ duration: 0.45, delay: Math.min(index, 6) * 0.07, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
