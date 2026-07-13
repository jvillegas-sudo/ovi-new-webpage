"use client";

/**
 * UI Component: Cursor
 *
 * Custom cursor that replaces the default browser cursor.
 * Morphs based on what the user is hovering over.
 *
 * Variants:
 *   - default: small dot
 *   - hover: expanded ring (links, buttons)
 *   - click: compressed (mousedown)
 *   - text: I-beam (text elements)
 *   - hidden: invisible (inputs, selects)
 *
 * Implementation:
 *   - Two elements: dot (fast) and ring (laggy = natural feel)
 *   - CSS transforms for performance (no layout/paint)
 *   - Hidden on touch devices
 */

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useUIStore } from "@store/ui.store";
import { cn } from "@utils/cn";

export function Cursor() {
  const cursorVariant = useUIStore((s) => s.cursorVariant);
  const setCursorVariant = useUIStore((s) => s.setCursorVariant);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // The ring lags behind for a natural feel
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  const isPointerDeviceRef = useRef(false);

  useEffect(() => {
    // Only show custom cursor on pointer devices
    isPointerDeviceRef.current = window.matchMedia("(pointer: fine)").matches;
    if (!isPointerDeviceRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => setCursorVariant("click");
    const handleMouseUp = () => setCursorVariant("default");

    // Auto-detect hovered element type
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches("a, button, [role='button'], [data-cursor='hover']")) {
        setCursorVariant("hover");
      } else if (target.matches("input, textarea, [contenteditable]")) {
        setCursorVariant("hidden");
      } else if (target.matches("p, span, h1, h2, h3, h4, h5, h6, [data-cursor='text']")) {
        setCursorVariant("text");
      } else {
        setCursorVariant("default");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, setCursorVariant]);

  const variants = {
    default: { scale: 1, opacity: 1 },
    hover: { scale: 2.5, opacity: 0.8 },
    click: { scale: 0.8, opacity: 1 },
    text: { scale: 1.5, opacity: 0.6 },
    hidden: { scale: 0, opacity: 0 },
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-[var(--z-cursor)] hidden md:block" aria-hidden="true">
      {/* Dot — fast response */}
      <motion.div
        className={cn(
          "absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full",
          "bg-[var(--color-brand-primary)]",
        )}
        style={{ left: mouseX, top: mouseY }}
        animate={variants[cursorVariant]}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Ring — slow follow */}
      <motion.div
        className={cn(
          "absolute size-8 -translate-x-1/2 -translate-y-1/2 rounded-full",
          "border border-[var(--color-brand-primary)] opacity-40",
        )}
        style={{ left: ringX, top: ringY }}
        animate={variants[cursorVariant]}
        transition={{ type: "spring", ...{ damping: 30, stiffness: 200 } }}
      />
    </div>
  );
}
