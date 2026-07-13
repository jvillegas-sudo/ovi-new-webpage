"use client";

/**
 * UI Component: Icon
 *
 * Wrapper around lucide-react icons with consistent sizing,
 * color, and accessibility attributes.
 *
 * Provides a unified API for all icon usage in the design system.
 * Use `aria-label` for standalone icons; omit it for decorative ones.
 *
 * @example
 *   <Icon icon={ArrowRight} />
 *   <Icon icon={Star} size="lg" color="brand" aria-label="Favorite" />
 *   <Icon icon={CheckCircle} color="success" />
 */

import * as React from "react";
import type { LucideIcon, LucideProps } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@utils/cn";

const iconVariants = cva("shrink-0", {
  variants: {
    size: {
      xs: "size-3",
      sm: "size-4",
      md: "size-5",
      lg: "size-6",
      xl: "size-8",
      "2xl": "size-10",
    },
    iconColor: {
      inherit: "text-inherit",
      default: "text-[var(--color-text-tertiary)]",
      muted: "text-[var(--color-text-secondary)]",
      primary: "text-[var(--color-text-primary)]",
      brand: "text-[var(--color-brand-primary)]",
      accent: "text-[var(--color-brand-accent)]",
      secondary: "text-[var(--color-brand-secondary)]",
      success: "text-[var(--color-brand-success)]",
      warning: "text-[var(--color-brand-warning)]",
      danger: "text-[var(--color-brand-danger)]",
    },
  },
  defaultVariants: {
    size: "md",
    iconColor: "inherit",
  },
});

export interface IconProps
  extends Omit<LucideProps, "size" | "color">, VariantProps<typeof iconVariants> {
  icon: LucideIcon;
  /** Accessible label. Omit for decorative icons (adds aria-hidden automatically). */
  "aria-label"?: string;
}

const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  (
    { icon: LucideIconComponent, className, size, iconColor, "aria-label": ariaLabel, ...props },
    ref,
  ) => {
    return (
      <LucideIconComponent
        ref={ref}
        aria-label={ariaLabel}
        aria-hidden={!ariaLabel}
        focusable={false}
        className={cn(iconVariants({ size, iconColor }), className)}
        {...props}
      />
    );
  },
);

Icon.displayName = "Icon";

// ─── IconButton ───────────────────────────────────────────────────────────────

/**
 * IconButton — a button variant optimised for icon-only actions.
 * Always requires aria-label for accessibility.
 */

const iconButtonVariants = cva(
  "inline-flex items-center justify-center rounded-lg transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--color-brand-primary)] disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        ghost:
          "text-[var(--color-text-secondary)] hover:bg-[var(--glass-bg)] hover:text-[var(--color-text-primary)]",
        outline:
          "border border-[var(--color-border-default)] text-[var(--color-text-secondary)] hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)]",
        solid:
          "bg-[var(--glass-bg)] text-[var(--color-text-secondary)] hover:bg-[var(--glass-bg-hover)] hover:text-[var(--color-text-primary)]",
      },
      size: {
        xs: "size-7",
        sm: "size-8",
        md: "size-9",
        lg: "size-10",
        xl: "size-12",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "md",
    },
  },
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof iconButtonVariants> {
  icon: LucideIcon;
  /** Required for accessibility — describes the action */
  "aria-label": string;
  iconSize?: VariantProps<typeof iconVariants>["size"];
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, className, variant, size, iconSize, "aria-label": ariaLabel, ...props }, ref) => {
    const LucideIconComponent = icon;
    return (
      <button
        ref={ref}
        aria-label={ariaLabel}
        className={cn(iconButtonVariants({ variant, size }), className)}
        {...props}
      >
        <LucideIconComponent
          className={cn(iconVariants({ size: iconSize ?? "sm" }))}
          aria-hidden="true"
        />
      </button>
    );
  },
);

IconButton.displayName = "IconButton";

export { Icon, IconButton, iconVariants, iconButtonVariants };
