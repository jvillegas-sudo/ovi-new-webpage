"use client";

/**
 * UI Component: Badge
 *
 * Small label used for status, categories, and feature tags.
 * Common use: "New", "Beta", product category labels.
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@utils/cn";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 font-medium leading-none",
  {
    variants: {
      variant: {
        default: [
          "bg-[var(--glass-bg)] text-[var(--color-text-secondary)]",
          "border border-[var(--color-border-default)]",
        ],
        brand: [
          "bg-[rgba(0,196,255,0.1)] text-[var(--color-brand-primary)]",
          "border border-[var(--color-border-brand)]",
        ],
        accent: [
          "bg-[rgba(0,255,133,0.1)] text-[var(--color-brand-accent)]",
          "border border-[rgba(0,255,133,0.3)]",
        ],
        solid: "bg-[var(--color-brand-primary)] text-[var(--color-text-inverse)]",
        destructive: [
          "bg-[rgba(255,59,59,0.1)] text-[var(--color-brand-danger)]",
          "border border-[rgba(255,59,59,0.3)]",
        ],
      },
      size: {
        sm: "h-5 px-2 text-xs rounded-md",
        md: "h-6 px-2.5 text-xs rounded-lg",
        lg: "h-7 px-3 text-sm rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, dot = false, children, ...props }, ref) => {
    return (
      <span ref={ref} className={cn(badgeVariants({ variant, size }), className)} {...props}>
        {dot && (
          <span
            className="size-1.5 rounded-full bg-current"
            aria-hidden="true"
          />
        )}
        {children}
      </span>
    );
  },
);

Badge.displayName = "Badge";

export { Badge, badgeVariants };
