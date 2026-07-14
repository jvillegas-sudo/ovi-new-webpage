/**
 * useNavigation
 *
 * Returns the href of the currently active navigation link
 * as determined by the NavigationManager.
 */

"use client";

import { useShallow } from "zustand/react/shallow";

import { useEngineStore } from "@/store/engine-store";

export const useNavigation = () => {
  return useEngineStore(
    useShallow((s) => ({
      activeNavHref: s.activeNavHref,
      currentScene: s.currentScene,
    })),
  );
};
