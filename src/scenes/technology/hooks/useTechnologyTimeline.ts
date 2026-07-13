/**
 * useTechnologyTimeline
 *
 * Creates a GSAP ScrollTrigger scoped to the Technology section element
 * and exposes the scroll progress [0,1] as a stable ref.
 *
 * Using a ref (not state) means Three.js useFrame reads the freshest value
 * each frame without triggering React re-renders.
 */

"use client";

import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useTechnologyTimeline(
  sectionRef: React.RefObject<HTMLElement | null>,
): React.MutableRefObject<number> {
  const progressRef = useRef(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const el = sectionRef.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        progressRef.current = self.progress;
      },
    });

    return () => {
      trigger.kill();
    };
  }, [sectionRef]);

  return progressRef;
}
