"use client";

import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useIndustrialApplicationsTimeline(
  sectionRef: React.RefObject<HTMLElement | null>,
): React.MutableRefObject<number> {
  const progressRef = useRef(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const el = sectionRef.current;
    if (!el) return;

    const proxy = { value: 0 };
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          progressRef.current = self.progress;
        },
      },
    });

    timeline.to(proxy, {
      value: 1,
      ease: "none",
      duration: 1,
      onUpdate: () => {
        progressRef.current = proxy.value;
      },
    });

    return () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
    };
  }, [sectionRef]);

  return progressRef;
}
