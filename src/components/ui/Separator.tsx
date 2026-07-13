"use client";

/**
 * UI Component: Separator / Divider
 *
 * Visual separator between sections of content.
 * Can be horizontal (default) or vertical.
 *
 * Follows WAI-ARIA separator role pattern.
 *
 * @example
 *   <Separator />
 *   <Separator orientation="vertical" className="h-6" />
 *   <Separator variant="brand" />
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@utils/cn";

const separatorVariants = cva("shrink-0", {
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "w-px self-stretch",
    },
    variant: {
      default: "bg-[var(--color-border-subtle)]",
      muted: "bg-[var(--color-border-subtle)] opacity-50",
      strong: "bg-[var(--color-border-strong)]",
      brand:
        "bg-gradient-to-r from-transparent via-[var(--color-brand-primary)] to-transparent opacity-50",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    variant: "default",
  },
});

export interface SeparatorProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof separatorVariants> {
  decorative?: boolean;
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, orientation = "horizontal", variant, decorative = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role={decorative ? "none" : "separator"}
        aria-orientation={decorative ? undefined : (orientation ?? "horizontal")}
        className={cn(separatorVariants({ orientation, variant }), className)}
        {...props}
      />
    );
  },
);

Separator.displayName = "Separator";

export { Separator, separatorVariants };
