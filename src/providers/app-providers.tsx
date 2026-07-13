"use client";

import { type PropsWithChildren } from "react";

import { StoryEngineProvider } from "@/engine/providers/story-engine-provider";
import { ThemeProvider } from "@/providers/theme-provider";

export const AppProviders = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider>
      {/* StoryEngineProvider owns Lenis — SmoothScrollProvider is no longer needed. */}
      <StoryEngineProvider>{children}</StoryEngineProvider>
    </ThemeProvider>
  );
};
