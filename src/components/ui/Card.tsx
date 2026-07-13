"use client";

/**
 * UI Component: Card
 *
 * Glassmorphism card container.
 * Used for product features, stats, team members, testimonials.
 *
 * Built on Atomic Design principles — Card can contain any organism.
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@utils/cn";

const cardVariants = cva(
  "relative overflow-hidden rounded-xl",
  {
    variants: {
      variant: {
        glass: "glass glass-hover",
        solid: [
          "bg-[var(--color-bg-elevated)]",
          "border border-[var(--color-border-subtle)]",
          "transition-all duration-300",
          "hover:border-[var(--color-border-default)]",
        ],
        outlined: [
          "bg-transparent",
          "border border-[var(--color-border-default)]",
          "transition-all duration-300",
          "hover:border-[var(--color-brand-primary)]",
        ],
        glow: [
          "glass",
          "transition-all duration-300",
          "hover:shadow-[var(--shadow-glow-primary)]",
          "hover:border-[var(--color-border-brand)]",
        ],
      },
      padding: {
        none: "",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
        xl: "p-10",
      },
    },
    defaultVariants: {
      variant: "glass",
      padding: "md",
    },
  },
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  as?: React.ElementType;
}

function Card({ className, variant, padding, as = "div", ...props }: CardProps) {
  // Type assertion required: TypeScript cannot statically resolve JSX prop types
  // for dynamic `as` props. This is a known TS limitation with polymorphic components.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const El = as as any;
  return <El className={cn(cardVariants({ variant, padding }), className)} {...props} />;
}

Card.displayName = "Card";

// ─── Sub-components ──────────────────────────────────────────────────────────

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-2", className)} {...props} />
  ),
);
CardHeader.displayName = "CardHeader";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("mt-4", className)} {...props} />
  ),
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "mt-6 flex items-center justify-between border-t border-[var(--color-border-subtle)] pt-4",
        className,
      )}
      {...props}
    />
  ),
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardContent, CardFooter, cardVariants };
