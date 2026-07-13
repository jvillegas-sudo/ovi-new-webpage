/**
 * useRegisterScene
 *
 * Hook for scene components to register their root DOM element with the
 * SceneManager.  Automatically unregisters on component unmount.
 *
 * @example
 * function WaterDropScene() {
 *   const ref = useRegisterScene('water-drop');
 *   return <section ref={ref} data-scene="water-drop">…</section>;
 * }
 */

"use client";

import { useEffect, useRef } from "react";

import type { SceneId } from "@/engine/types";
import { useStoryEngine } from "@/engine/hooks/use-story-engine";

export const useRegisterScene = (sceneId: SceneId) => {
  const engine = useStoryEngine();
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    engine.registerSceneElement(sceneId, el);

    return () => {
      engine.unregisterSceneElement(sceneId);
    };
  }, [engine, sceneId]);

  return ref;
};
