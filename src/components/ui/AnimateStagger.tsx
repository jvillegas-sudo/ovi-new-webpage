"use client";

/**
 * UI Component: AnimateStagger
 *
 * Container that staggers the entrance animations of its children.
 * Each direct child is wrapped and animated with an incremental delay.
 *
 * @example
 *   <AnimateStagger>
 *     <Card>Item 1</Card>
 *     <Card>Item 2</Card>
 *     <Card>Item 3</Card>
 *   </AnimateStagger>
 */

import * as React from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { cn } from "@utils/cn";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0 },
  },
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export interface AnimateStaggerProps {
  children: React.ReactNode;
  /** Stagger delay between each child in seconds */
  stagger?: number;
  /** Initial delay before the first child in seconds */
  delayChildren?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

function AnimateStagger({
  children,
  stagger = 0.08,
  delayChildren = 0,
  threshold = 0.1,
  once = true,
  className,
  style,
  id,
}: AnimateStaggerProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren },
    },
  };

  return (
    <motion.div
      ref={ref}
      id={id}
      style={style}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={container}
      className={cn(className)}
    >
      {React.Children.map(children, (child, i) => (
        <motion.div key={i} variants={childVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

AnimateStagger.displayName = "AnimateStagger";

export { AnimateStagger, containerVariants, childVariants };
