"use client";

/**
 * UI Component: Text
 *
 * Typography primitive for body text, captions, labels, etc.
 * Semantic HTML is flexible (p, span, div, label, etc.)
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@utils/cn";

const textVariants = cva("", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    },
    /** textColor avoids conflict with HTMLElement.color */
    textColor: {
      primary: "text-[var(--color-text-primary)]",
      secondary: "text-[var(--color-text-secondary)]",
      tertiary: "text-[var(--color-text-tertiary)]",
      brand: "text-[var(--color-brand-primary)]",
      inherit: "text-inherit",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    leading: {
      tight: "leading-tight",
      normal: "leading-normal",
      relaxed: "leading-relaxed",
    },
    tracking: {
      tight: "tracking-tight",
      normal: "tracking-normal",
      wide: "tracking-wide",
      widest: "tracking-widest",
    },
  },
  defaultVariants: {
    size: "base",
    textColor: "secondary",
    weight: "normal",
    leading: "relaxed",
  },
});

export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "color">,
    VariantProps<typeof textVariants> {
  as?: React.ElementType;
}

function Text({
  className,
  as = "p",
  size,
  textColor,
  weight,
  align,
  leading,
  tracking,
  ...props
}: TextProps) {
  // Type assertion required: TypeScript cannot statically resolve JSX prop types
  // for dynamic `as` props. This is a known TS limitation with polymorphic components.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const El = as as any;
  return (
    <El
      className={cn(textVariants({ size, textColor, weight, align, leading, tracking }), className)}
      {...props}
    />
  );
}

Text.displayName = "Text";

export { Text, textVariants };
