"use client";

/**
 * UI Component: Spinner
 *
 * Standalone loading spinner for inline use.
 * Distinct from the full-screen Loader component.
 *
 * @example
 *   <Spinner />
 *   <Spinner size="lg" color="accent" />
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@utils/cn";

const spinnerVariants = cva(
  "animate-spin rounded-full border-2 border-current border-t-transparent",
  {
    variants: {
      size: {
        xs: "size-3",
        sm: "size-4",
        md: "size-5",
        lg: "size-6",
        xl: "size-8",
      },
      spinnerColor: {
        default: "text-[var(--color-text-tertiary)]",
        primary: "text-[var(--color-brand-primary)]",
        accent: "text-[var(--color-brand-accent)]",
        white: "text-white",
        inherit: "text-inherit",
      },
    },
    defaultVariants: {
      size: "md",
      spinnerColor: "primary",
    },
  },
);

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof spinnerVariants> {
  /** Accessible label for screen readers */
  label?: string;
}

const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ className, size, spinnerColor, label = "Loading…", ...props }, ref) => {
    return (
      <span
        ref={ref}
        role="status"
        aria-label={label}
        className={cn("inline-flex", className)}
        {...props}
      >
        <span className={cn(spinnerVariants({ size, spinnerColor }))} aria-hidden="true" />
      </span>
    );
  },
);

Spinner.displayName = "Spinner";

export { Spinner, spinnerVariants };
export type SpinnerColor = "default" | "primary" | "accent" | "white" | "inherit";
