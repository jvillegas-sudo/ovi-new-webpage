/**
 * useScene
 *
 * Subscribes to the current scene state from the engine store.
 * Re-renders only when scene-related state changes.
 */

"use client";

import { useCallback } from "react";

import type { SceneId } from "@/engine/types";
import { useEngineStore } from "@/store/engine-store";

export const useScene = () => {
  return useEngineStore(
    useCallback(
      (s) => ({
        currentScene: s.currentScene as SceneId,
        previousScene: s.previousScene as SceneId | null,
        sceneProgress: s.sceneProgress,
        isInitialized: s.isInitialized,
      }),
      [],
    ),
  );
};
