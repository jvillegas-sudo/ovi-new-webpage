"use client";

import { type PropsWithChildren } from "react";

import { SmoothScrollProvider } from "@/providers/smooth-scroll-provider";
import { ThemeProvider } from "@/providers/theme-provider";

export const AppProviders = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider>
      <SmoothScrollProvider>{children}</SmoothScrollProvider>
    </ThemeProvider>
  );
};
