/**
 * useNavigation
 *
 * Returns the href of the currently active navigation link
 * as determined by the NavigationManager.
 */

"use client";

import { useCallback } from "react";

import { useEngineStore } from "@/store/engine-store";

export const useNavigation = () => {
  return useEngineStore(
    useCallback(
      (s) => ({
        activeNavHref: s.activeNavHref,
        currentScene: s.currentScene,
      }),
      [],
    ),
  );
};
