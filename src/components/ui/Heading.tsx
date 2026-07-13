"use client";

/**
 * UI Component: Heading
 *
 * Typography primitive for all headings (h1–h6).
 * Uses fluid font sizes from the design token system.
 * Semantic HTML level is decoupled from visual size.
 *
 * @example
 *   <Heading as="h2" size="3xl">Our Solutions</Heading>
 *   <Heading as="h1" size="7xl" gradient="brand">Industrial Biotech</Heading>
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@utils/cn";

const headingVariants = cva(
  "font-bold leading-tight tracking-tight text-[var(--color-text-primary)]",
  {
    variants: {
      size: {
        sm: "text-xl",
        md: "text-2xl",
        lg: "text-3xl",
        xl: "text-[clamp(1.75rem,2vw+1rem,2rem)]",
        "2xl": "text-[clamp(2rem,3vw+1rem,2.5rem)]",
        "3xl": "text-[clamp(2.5rem,4vw+1.5rem,3.5rem)]",
        "4xl": "text-[clamp(3rem,5vw+2rem,4.5rem)]",
        "5xl": "text-[clamp(3.75rem,7vw+2rem,6rem)]",
        "6xl": "text-[clamp(5rem,10vw+2rem,8rem)]",
      },
      gradient: {
        none: "",
        brand: "text-gradient-brand",
        bio: "text-gradient-bio",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
      weight: {
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
        extrabold: "font-extrabold",
        black: "font-black",
      },
    },
    defaultVariants: {
      size: "2xl",
      gradient: "none",
      align: "left",
      weight: "bold",
    },
  },
);

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, as: Component = "h2", size, gradient, align, weight, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(headingVariants({ size, gradient, align, weight }), className)}
        {...props}
      />
    );
  },
);

Heading.displayName = "Heading";

export { Heading, headingVariants };
