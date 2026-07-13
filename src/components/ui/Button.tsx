"use client";

/**
 * UI Component: Button
 *
 * Atomic component built with CVA (Class Variance Authority) for type-safe variants.
 * Follows WAI-ARIA button patterns for full accessibility.
 *
 * Variants:
 *   - primary: filled, brand cyan — primary CTA
 *   - secondary: filled, brand navy
 *   - outline: bordered, transparent background
 *   - ghost: no border, subtle hover
 *   - destructive: red — destructive actions
 *
 * Sizes: xs | sm | md | lg | xl
 *
 * Usage:
 *   <Button variant="primary" size="lg" loading>Get Started</Button>
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@utils/cn";

const buttonVariants = cva(
  // Base styles — shared by all variants
  [
    "inline-flex items-center justify-center gap-2",
    "font-medium tracking-wide",
    "rounded-lg",
    "border border-transparent",
    "transition-all duration-200",
    "cursor-pointer select-none",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]",
    "disabled:pointer-events-none disabled:opacity-40",
    "active:scale-[0.98]",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-[var(--color-brand-primary)] text-[var(--color-text-inverse)]",
          "hover:brightness-110 hover:shadow-[var(--shadow-glow-primary)]",
        ],
        secondary: [
          "bg-[var(--color-brand-secondary)] text-white",
          "hover:brightness-110",
        ],
        outline: [
          "border-[var(--color-border-default)] text-[var(--color-text-primary)] bg-transparent",
          "hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)]",
        ],
        ghost: [
          "text-[var(--color-text-primary)] bg-transparent",
          "hover:bg-[var(--glass-bg)] hover:text-[var(--color-brand-primary)]",
        ],
        destructive: [
          "bg-[var(--color-brand-danger)] text-white",
          "hover:brightness-110",
        ],
        glass: [
          "glass text-[var(--color-text-primary)]",
          "glass-hover",
        ],
      },
      size: {
        xs: "h-7 px-3 text-xs",
        sm: "h-8 px-4 text-sm",
        md: "h-10 px-5 text-sm",
        lg: "h-12 px-7 text-base",
        xl: "h-14 px-9 text-lg",
      },
      fullWidth: {
        true: "w-full",
      },
      rounded: {
        default: "rounded-lg",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      rounded: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Show loading spinner and disable interaction */
  loading?: boolean;
  /** Left-side icon */
  leftIcon?: React.ReactNode;
  /** Right-side icon */
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      rounded,
      loading = false,
      disabled,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth, rounded }), className)}
        disabled={disabled ?? loading}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <Loader2 className="animate-spin" size={16} aria-hidden="true" />
        ) : (
          leftIcon && <span aria-hidden="true">{leftIcon}</span>
        )}
        {children}
        {!loading && rightIcon && <span aria-hidden="true">{rightIcon}</span>}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
