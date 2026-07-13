"use client";

/**
 * UI Component: Progress
 *
 * Linear progress indicator for loading states, upload progress,
 * step completion, and similar progressive feedback.
 *
 * @example
 *   <Progress value={72} />
 *   <Progress value={50} variant="accent" size="lg" showLabel />
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@utils/cn";

const progressTrackVariants = cva(
  "relative w-full overflow-hidden rounded-full bg-[var(--color-bg-elevated)]",
  {
    variants: {
      size: {
        xs: "h-1",
        sm: "h-1.5",
        md: "h-2",
        lg: "h-3",
        xl: "h-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const progressFillVariants = cva("h-full rounded-full transition-all duration-500 ease-out", {
  variants: {
    variant: {
      default: "bg-[var(--color-brand-primary)]",
      accent: "bg-[var(--color-brand-accent)]",
      success: "bg-[var(--color-brand-success)]",
      warning: "bg-[var(--color-brand-warning)]",
      danger: "bg-[var(--color-brand-danger)]",
      gradient:
        "bg-gradient-to-r from-[var(--color-brand-secondary)] to-[var(--color-brand-primary)]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface ProgressProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof progressTrackVariants>,
    VariantProps<typeof progressFillVariants> {
  /** Progress value from 0–100 */
  value?: number;
  /** Show percentage label */
  showLabel?: boolean;
  /** Custom label override */
  label?: string;
  /** Indeterminate animation */
  indeterminate?: boolean;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      size,
      variant,
      value = 0,
      showLabel = false,
      label,
      indeterminate = false,
      ...props
    },
    ref,
  ) => {
    const clampedValue = Math.min(100, Math.max(0, value));
    const ariaLabel = label ?? (showLabel ? `${clampedValue}%` : undefined);

    return (
      <div ref={ref} className={cn("flex flex-col gap-1.5", className)} {...props}>
        {(showLabel || label) && (
          <div className="flex justify-between text-xs text-[var(--color-text-tertiary)]">
            {label && <span>{label}</span>}
            {showLabel && !label && <span className="ml-auto">{clampedValue}%</span>}
          </div>
        )}
        <div
          role="progressbar"
          aria-valuenow={indeterminate ? undefined : clampedValue}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={ariaLabel}
          className={cn(progressTrackVariants({ size }))}
        >
          <div
            className={cn(
              progressFillVariants({ variant }),
              indeterminate && "w-1/3 animate-[indeterminate_1.5s_infinite_ease-in-out]",
            )}
            style={indeterminate ? undefined : { width: `${clampedValue}%` }}
          />
        </div>
      </div>
    );
  },
);

Progress.displayName = "Progress";

export { Progress, progressTrackVariants, progressFillVariants };
