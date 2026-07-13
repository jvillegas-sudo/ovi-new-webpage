/**
 * OVI Story Engine — public API barrel.
 *
 * Import engine primitives from here to keep imports clean:
 *
 *   import { useScene, useScroll, StoryEngineProvider } from '@/engine';
 */

// Core
export { StoryEngine } from "@/engine/story/story-engine";

// Provider
export {
  StoryEngineContext,
  StoryEngineProvider,
} from "@/engine/providers/story-engine-provider";

// Hooks
export {
  useCamera,
  useNavigation,
  usePerformance,
  useRegisterScene,
  useScene,
  useScroll,
  useStoryEngine,
} from "@/engine/hooks";

// Types
export type {
  AnimationDefinition,
  AnimationState,
  CameraState,
  DeviceTier,
  EngineEventMap,
  EngineState,
  PerformanceStats,
  SceneConfig,
  SceneId,
  ScrollDirection,
  ScrollState,
  TransitionState,
  TransitionType,
} from "@/engine/types";

// Scene configuration
export { SCENE_MAP, SCENES } from "@/engine/scene/scene-config";

// Debug (tree-shaken in production)
export { DebugOverlay } from "@/engine/debug/debug-overlay";
