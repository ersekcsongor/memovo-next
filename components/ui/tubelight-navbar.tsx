"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Icon } from "@tabler/icons-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * The lit bar that slides between items, with its glow bleeding off the edge.
 *
 * `edge` says which side it clings to: the bottom bar lights from above, a top
 * header lights from below. Items sharing a `layoutId` hand it between them.
 */
export function Lamp({
  layoutId,
  edge = "top",
  reduced = false,
}: {
  layoutId: string;
  edge?: "top" | "bottom";
  reduced?: boolean;
}) {
  const onTop = edge === "top";
  return (
    <motion.span
      layoutId={layoutId}
      className="absolute inset-0 -z-10 rounded-full bg-primary/5"
      initial={false}
      transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 }}
      aria-hidden
    >
      <span
        className={cn(
          "absolute left-1/2 h-1 w-8 -translate-x-1/2 bg-primary",
          onTop ? "-top-1 rounded-t-full" : "-bottom-1 rounded-b-full",
        )}
      >
        <span className={cn("absolute -left-2 h-6 w-12 rounded-full bg-primary/25 blur-md", onTop ? "-top-2" : "-bottom-2")} />
        <span className={cn("absolute h-6 w-8 rounded-full bg-primary/20 blur-md", onTop ? "-top-1" : "-bottom-1")} />
        <span className={cn("absolute left-2 h-4 w-4 rounded-full bg-primary/20 blur-sm", onTop ? "top-0" : "bottom-0")} />
      </span>
    </motion.span>
  );
}

export interface NavItem {
  name: string;
  url: string;
  icon: Icon;
  /** Extra path prefixes this item owns, for sections that live under another route. */
  covers?: string[];
}

/**
 * A pill of links with a lit bar sliding under whichever one is current.
 *
 * The route decides what is active, not a click: the original kept its own
 * `activeTab` state, so the highlight sat on the first item however the visitor
 * arrived, and stayed put on a back button.
 */
export function NavBar({ items, className }: { items: NavItem[]; className?: string }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  /* Longest match wins, so /gallery-demo cannot claim the tab that owns /gallery. */
  const active = items.reduce<{ item: NavItem; len: number } | null>((best, item) => {
    const prefixes = [item.url, ...(item.covers ?? [])];
    let longest = -1;
    for (const prefix of prefixes) {
      const hit = prefix === "/" ? pathname === "/" : pathname === prefix || pathname.startsWith(`${prefix}/`);
      if (hit && prefix.length > longest) longest = prefix.length;
    }
    if (longest === -1) return best;
    return !best || longest > best.len ? { item, len: longest } : best;
  }, null);

  return (
    <nav
      aria-label={items[0]?.name}
      className={cn("fixed inset-x-0 bottom-0 z-40 flex justify-center pb-3", className)}
      /* The consent bar publishes its height, so the pill rides above it instead
         of hiding underneath. */
      style={{ paddingBottom: "calc(0.75rem + var(--consent-height, 0px))" }}
    >
      <div className="flex max-w-[calc(100vw-1.5rem)] flex-nowrap items-center rounded-full border border-border bg-white/85 p-1 shadow-lg backdrop-blur-lg">
        {items.map((item) => {
          const isActive = active?.item.url === item.url;
          return (
            <Link
              key={item.url}
              href={item.url}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "relative flex min-h-11 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-full px-3 text-[11px] font-semibold whitespace-nowrap transition-colors",
                isActive ? "text-primary" : "text-navy/70 hover:text-primary",
              )}
            >
              <item.icon size={20} stroke={2} aria-hidden />
              <span>{item.name}</span>

              {isActive && <Lamp layoutId="tubelight" reduced={!!reduced} />}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
