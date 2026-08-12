import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merges Tailwind classes so a caller's class wins over a component default. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
