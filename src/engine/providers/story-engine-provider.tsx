/**
 * Story Engine Provider
 *
 * Creates a StoryEngine instance, initialises it once the DOM is available,
 * and exposes it to the React tree via context.
 *
 * Replace <SmoothScrollProvider> with this provider in <AppProviders>.
 * Lenis is initialised inside the ScrollManager, so no separate
 * SmoothScrollProvider is required.
 */

"use client";

import {
  createContext,
  type PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";

import { StoryEngine } from "@/engine/story/story-engine";

export const StoryEngineContext = createContext<StoryEngine | null>(null);

export const StoryEngineProvider = ({ children }: PropsWithChildren) => {
  // Stable engine ref — never recreated across re-renders.
  const engineRef = useRef<StoryEngine | null>(null);

  // Track initialisation so child components can gate on isInitialized.
  const [, forceUpdate] = useState(0);

  if (!engineRef.current) {
    engineRef.current = new StoryEngine();
  }

  useEffect(() => {
    const engine = engineRef.current!;

    engine.init().then(() => {
      // Trigger a re-render so hooks get the updated store state.
      forceUpdate((n) => n + 1);
    });

    return () => {
      engine.destroy();
    };
  }, []);

  return (
    <StoryEngineContext.Provider value={engineRef.current}>
      {children}
    </StoryEngineContext.Provider>
  );
};
