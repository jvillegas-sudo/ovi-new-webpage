"use client";

/**
 * UI Component: Skeleton
 *
 * Loading placeholder that mimics content structure.
 * Renders animated shimmer blocks while real content loads.
 *
 * @example
 *   <Skeleton className="h-4 w-48" />
 *   <Skeleton variant="circle" className="size-10" />
 *   <SkeletonText lines={3} />
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@utils/cn";

const skeletonVariants = cva(
  "relative overflow-hidden bg-[var(--color-bg-elevated)] before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent",
  {
    variants: {
      variant: {
        default: "rounded-md",
        circle: "rounded-full",
        text: "rounded",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof skeletonVariants> {}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        aria-busy="true"
        aria-hidden="true"
        className={cn(skeletonVariants({ variant }), className)}
        {...props}
      />
    );
  },
);

Skeleton.displayName = "Skeleton";

// ─── Skeleton Text ────────────────────────────────────────────────────────────

interface SkeletonTextProps extends React.HTMLAttributes<HTMLDivElement> {
  lines?: number;
  lastLineWidth?: string;
}

function SkeletonText({
  lines = 3,
  lastLineWidth = "60%",
  className,
  ...props
}: SkeletonTextProps) {
  return (
    <div
      className={cn("flex flex-col gap-2", className)}
      aria-busy="true"
      aria-hidden="true"
      {...props}
    >
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          className={cn("h-3.5", i === lines - 1 ? "" : "")}
          style={i === lines - 1 ? { width: lastLineWidth } : undefined}
        />
      ))}
    </div>
  );
}

SkeletonText.displayName = "SkeletonText";

// ─── Skeleton Card ─────────────────────────────────────────────────────────────

function SkeletonCard({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-xl border border-[var(--color-border-subtle)] p-6",
        className,
      )}
      aria-busy="true"
      {...props}
    >
      <div className="flex items-center gap-3">
        <Skeleton variant="circle" className="size-10 shrink-0" />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-3.5 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
      <SkeletonText lines={3} />
    </div>
  );
}

SkeletonCard.displayName = "SkeletonCard";

export { Skeleton, SkeletonText, SkeletonCard, skeletonVariants };
