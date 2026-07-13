"use client";

/**
 * UI Component: Container
 *
 * Layout primitive that constrains content width and applies
 * consistent horizontal padding across breakpoints.
 *
 * This is the ONLY component that should define max-width.
 * All page sections must use Container for horizontal rhythm.
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@utils/cn";

const containerVariants = cva("mx-auto w-full px-[var(--page-padding-x)]", {
  variants: {
    size: {
      sm: "max-w-[640px]",
      md: "max-w-[768px]",
      lg: "max-w-[1024px]",
      xl: "max-w-[1280px]",
      "2xl": "max-w-[1440px]",
      full: "max-w-none",
    },
  },
  defaultVariants: {
    size: "xl",
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  as?: React.ElementType;
}

function Container({ className, size, as = "div", ...props }: ContainerProps) {
  // Type assertion required: TypeScript cannot statically resolve JSX prop types
  // for dynamic `as` props. This is a known TS limitation with polymorphic components.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const El = as as any;
  return <El className={cn(containerVariants({ size }), className)} {...props} />;
}

Container.displayName = "Container";

export { Container };
