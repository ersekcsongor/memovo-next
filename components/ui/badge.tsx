import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * The shadcn badge. Written with a plain variant map rather than cva, so it needs
 * no dependency the project does not already carry.
 */
const variants = {
  default: "border-transparent bg-coral text-white",
  secondary: "border-transparent bg-blush text-coral-ink",
  outline: "border-border text-navy",
} as const;

function Badge({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"span"> & { variant?: keyof typeof variants }) {
  return (
    <span
      data-slot="badge"
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}

export { Badge };
