/**
 * useStoryEngine
 *
 * Returns the StoryEngine instance from React context.
 * Must be used inside <StoryEngineProvider>.
 */

"use client";

import { useContext } from "react";

import { StoryEngineContext } from "@/engine/providers/story-engine-provider";

export const useStoryEngine = () => {
  const engine = useContext(StoryEngineContext);
  if (!engine) {
    throw new Error("useStoryEngine must be used inside <StoryEngineProvider>");
  }
  return engine;
};
