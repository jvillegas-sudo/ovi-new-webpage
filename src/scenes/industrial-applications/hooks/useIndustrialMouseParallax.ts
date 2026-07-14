"use client";

import { useEffect, useRef } from "react";

export type IndustrialMousePos = { x: number; y: number };

export function useIndustrialMouseParallax(): React.MutableRefObject<IndustrialMousePos> {
  const mouseRef = useRef<IndustrialMousePos>({ x: 0, y: 0 });

  useEffect(() => {
    const updatePointer = (clientX: number, clientY: number) => {
      mouseRef.current = {
        x: (clientX / window.innerWidth) * 2 - 1,
        y: -((clientY / window.innerHeight) * 2 - 1),
      };
    };

    const onMouseMove = (event: MouseEvent) => {
      updatePointer(event.clientX, event.clientY);
    };

    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      updatePointer(touch.clientX, touch.clientY);
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
