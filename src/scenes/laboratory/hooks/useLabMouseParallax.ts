/**
 * useLabMouseParallax
 *
 * Tracks normalised mouse / touch position in [-1, 1] for both axes.
 * Returns a stable ref so Three.js useFrame can read it without triggering
 * React re-renders.
 */

"use client";

import { useEffect, useRef } from "react";

export type LabMousePos = { x: number; y: number };

export function useLabMouseParallax(): React.MutableRefObject<LabMousePos> {
  const mouseRef = useRef<LabMousePos>({ x: 0, y: 0 });

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
