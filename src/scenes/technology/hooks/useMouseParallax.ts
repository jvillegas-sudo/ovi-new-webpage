/**
 * useMouseParallax
 *
 * Tracks normalised mouse/pointer position in [-1, 1] for both axes.
 * Returns a stable ref so Three.js useFrame can read it without triggering
 * React re-renders.
 *
 * On touch devices the last touch point is used.
 */

"use client";

import { useEffect, useRef } from "react";

export type MousePos = { x: number; y: number };

export function useMouseParallax(): React.MutableRefObject<MousePos> {
  const mouseRef = useRef<MousePos>({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      };
    };

    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      mouseRef.current = {
        x: (t.clientX / window.innerWidth) * 2 - 1,
        y: -((t.clientY / window.innerHeight) * 2 - 1),
      };
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return mouseRef;
}
