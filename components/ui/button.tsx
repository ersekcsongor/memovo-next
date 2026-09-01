import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * The shadcn button, trimmed to the variants this project uses and written
 * without cva or Radix Slot so it adds no dependency.
 */
const variants = {
  default: "bg-coral text-white hover:brightness-95",
  outline: "border border-border bg-white text-navy hover:bg-cream",
  ghost: "hover:bg-black/10",
} as const;

const sizes = {
  default: "min-h-11 px-5",
  sm: "min-h-9 px-4 text-sm",
  icon: "h-11 w-11",
} as const;

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<"button"> & { variant?: keyof typeof variants; size?: keyof typeof sizes }) {
  return (
    <button
      data-slot="button"
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-semibold transition disabled:pointer-events-none disabled:opacity-60",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}

export { Button };
