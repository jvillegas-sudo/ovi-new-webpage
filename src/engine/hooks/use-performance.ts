/**
 * usePerformance
 *
 * Subscribes to performance stats from the engine store.
 * Useful for conditional rendering based on device tier.
 */

"use client";

import { useCallback } from "react";

import { useEngineStore } from "@/store/engine-store";

export const usePerformance = () => {
  return useEngineStore(useCallback((s) => s.performance, []));
};
