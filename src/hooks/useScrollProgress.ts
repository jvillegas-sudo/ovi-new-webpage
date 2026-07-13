"use client";

/**
 * Hook: useScrollProgress
 *
 * Returns normalized (0–1) scroll progress for the entire page
 * or a specific container element.
 *
 * Used for:
 *   - Progress indicators
 *   - Scroll-linked animations
 *   - Parallax effects
 */

import { useEffect, useState, useRef } from "react";

export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setProgress(totalHeight > 0 ? currentScroll / totalHeight : 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
}

/**
 * Returns scroll progress for a specific element (0–1)
 */
export function useElementScrollProgress<T extends HTMLElement = HTMLDivElement>(): {
  ref: React.RefObject<T | null>;
  progress: number;
} {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio;
        setProgress(ratio);
      },
      { threshold: Array.from({ length: 101 }, (_, i) => i / 100) },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, progress };
}
