/**
 * Three.js Utils: Performance Helpers
 *
 * Utilities for monitoring and adapting Three.js performance.
 * Ensures 60fps on high-end and graceful degradation on mobile.
 */

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

/**
 * Detect GPU tier and return a performance level.
 * Uses the number of renderer parameters as a proxy for GPU capability.
 */
export function useGPUTier(): "high" | "medium" | "low" {
  const { gl } = useThree();

  const debugInfo = gl.getContext().getExtension("WEBGL_debug_renderer_info");
  if (!debugInfo) return "medium";

  const renderer = gl.getContext().getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) as string;

  // Simple heuristic: check for known high-end GPU names
  if (/RTX|RX 6|RX 7|M1|M2|M3|Apple/.test(renderer)) return "high";
  if (/GTX|RX 5|Intel Iris/.test(renderer)) return "medium";
  return "low";
}

/**
 * Hook to disable shadows on low-performance devices
 */
export function useAdaptiveShadows(threshold: "medium" | "high" = "medium"): void {
  const { gl } = useThree();

  useEffect(() => {
    // Disable shadows on mobile to save GPU budget
    const isMobile = /Android|iPhone|iPad|iPod/.test(navigator.userAgent);
    if (isMobile && threshold === "high") {
      gl.shadowMap.enabled = false;
    }
  }, [gl, threshold]);
}
