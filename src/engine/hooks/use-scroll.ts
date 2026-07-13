/**
 * useScroll
 *
 * Subscribes to scroll state from the engine store.
 * Provides direct access to y, progress, velocity, and direction.
 */

"use client";

import { useCallback } from "react";

import { useEngineStore } from "@/store/engine-store";

export const useScroll = () => {
  return useEngineStore(useCallback((s) => s.scroll, []));
};
