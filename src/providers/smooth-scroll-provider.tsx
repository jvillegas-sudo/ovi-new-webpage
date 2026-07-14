"use client";

import Lenis from "lenis";
import { type PropsWithChildren, useEffect } from "react";

export const SmoothScrollProvider = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return children;
};
