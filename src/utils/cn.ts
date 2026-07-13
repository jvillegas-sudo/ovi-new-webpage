/**
 * Utility: cn (Class Name Merger)
 *
 * Combines clsx and tailwind-merge for optimal class handling.
 * - clsx: conditional class logic
 * - tailwind-merge: deduplicates conflicting Tailwind classes
 *
 * This is the primary utility for composing dynamic class names.
 * Every component should use this instead of template literals.
 *
 * @example
 *   cn("px-4 py-2", isActive && "bg-brand-primary", className)
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
