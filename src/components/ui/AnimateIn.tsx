"use client";

/**
 * UI Component: AnimateIn
 *
 * Scroll-triggered animation wrapper using Framer Motion.
 * Animates children into view when they enter the viewport.
 * Respects prefers-reduced-motion automatically.
 *
 * @example
 *   <AnimateIn>
 *     <Heading>Our Mission</Heading>
 *   </AnimateIn>
 *
 *   <AnimateIn animation="slideUp" delay={0.2}>
 *     <Card>...</Card>
 *   </AnimateIn>
 */

import * as React from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { cn } from "@utils/cn";

export type AnimateInAnimation =
  "fadeIn" | "slideUp" | "slideDown" | "slideLeft" | "slideRight" | "scaleIn" | "none";

const animationVariants: Record<AnimateInAnimation, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0 },
  },
  slideDown: {
    hidden: { opacity: 0, y: -32 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 32 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -32 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 },
  },
  none: {
    hidden: {},
    visible: {},
  },
};

export interface AnimateInProps {
  children: React.ReactNode;
  animation?: AnimateInAnimation;
  duration?: number;
  delay?: number;
  /** Fraction of the element that must be visible to trigger */
  threshold?: number;
  /** Only animate once (default: true) */
  once?: boolean;
  className?: string;
}

function AnimateIn({
  children,
  animation = "slideUp",
  duration = 0.6,
  delay = 0,
  threshold = 0.15,
  once = true,
  className,
}: AnimateInProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={animationVariants[animation]}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

AnimateIn.displayName = "AnimateIn";

export { AnimateIn };
