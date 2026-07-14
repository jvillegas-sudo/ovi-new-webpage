/**
 * useCamera
 *
 * Subscribes to the camera state from the engine store.
 * Useful for Three.js components that need to mirror engine camera state.
 */

"use client";

import { useCallback } from "react";

import { useEngineStore } from "@/store/engine-store";

export const useCamera = () => {
  return useEngineStore(useCallback((s) => s.camera, []));
};
