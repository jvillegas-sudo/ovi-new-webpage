"use client";

/**
 * UI Component: Section
 *
 * Page section wrapper with consistent vertical padding.
 * Every page section should use this component.
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@utils/cn";

const sectionVariants = cva("relative w-full", {
  variants: {
    padding: {
      none: "",
      sm: "py-16",
      md: "py-24",
      lg: "py-[var(--section-padding-y)]",
      xl: "py-48",
    },
    background: {
      base: "bg-[var(--color-bg-base)]",
      surface: "bg-[var(--color-bg-surface)]",
      elevated: "bg-[var(--color-bg-elevated)]",
      transparent: "bg-transparent",
    },
  },
  defaultVariants: {
    padding: "lg",
    background: "base",
  },
});

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  as?: React.ElementType;
}

function Section({ className, padding, background, as = "section", ...props }: SectionProps) {
  // Type assertion required: TypeScript cannot statically resolve JSX prop types
  // for dynamic `as` props. This is a known TS limitation with polymorphic components.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const El = as as any;
  return <El className={cn(sectionVariants({ padding, background }), className)} {...props} />;
}

Section.displayName = "Section";

export { Section };
