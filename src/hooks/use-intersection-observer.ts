"use client";

import { useEffect, useRef, useState } from "react";

export const useIntersectionObserver = <T extends HTMLElement>(
  options: IntersectionObserverInit = { threshold: 0.2 },
) => {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const root = options.root ?? null;
  const rootMargin = options.rootMargin ?? "0px";
  const threshold = options.threshold ?? 0.2;
  const thresholdKey = Array.isArray(threshold) ? threshold.join(",") : String(threshold);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { root, rootMargin, threshold },
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [root, rootMargin, threshold, thresholdKey]);

  return { ref, isVisible };
};
