"use client";

import { useEffect, useRef, useState } from "react";

export const useIntersectionObserver = <T extends HTMLElement>(
  options: IntersectionObserverInit = { threshold: 0.2 },
) => {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return { ref, isVisible };
};
