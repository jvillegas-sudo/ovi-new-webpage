/**
 * Engine Store
 *
 * Zustand store that holds the entire engine state.
 * This is the single source of truth consumed by React hooks
 * and updated by the engine managers.
 */

import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

import type {
  AnimationState,
  CameraState,
  DeviceTier,
  EngineState,
  PerformanceStats,
  SceneId,
  ScrollState,
  TransitionState,
} from "@/engine/types";

// ---------------------------------------------------------------------------
// Default values
// ---------------------------------------------------------------------------

const DEFAULT_SCROLL_STATE: ScrollState = {
  y: 0,
  progress: 0,
  velocity: 0,
  direction: "idle",
};

const DEFAULT_CAMERA_STATE: CameraState = {
  position: [0, 0, 5],
  target: [0, 0, 0],
  fov: 45,
};

const DEFAULT_TRANSITION_STATE: TransitionState = {
  isTransitioning: false,
  from: null,
  to: null,
  progress: 0,
  type: null,
};

const DEFAULT_ANIMATION_STATE: AnimationState = {
  isPlaying: true,
  reducedMotion: false,
};

const DEFAULT_PERFORMANCE_STATS: PerformanceStats = {
  fps: 60,
  deviceTier: "high",
  frameBudget: 16.67,
  loadedAssets: 0,
};

// ---------------------------------------------------------------------------
// Store interface
// ---------------------------------------------------------------------------

interface EngineStore extends EngineState {
  /** Active navigation href derived from the current scene. */
  activeNavHref: string | null;
  // ---- Setters ----
  setCurrentScene: (scene: SceneId, previousScene: SceneId | null) => void;
  setSceneProgress: (progress: number) => void;
  setScroll: (scroll: Partial<ScrollState>) => void;
  setCamera: (camera: Partial<CameraState>) => void;
  setTransition: (transition: Partial<TransitionState>) => void;
  setAnimation: (animation: Partial<AnimationState>) => void;
  setPerformance: (stats: Partial<PerformanceStats>) => void;
  setDeviceTier: (tier: DeviceTier) => void;
  setFps: (fps: number) => void;
  setLoadedAssets: (count: number) => void;
  setInitialized: (initialized: boolean) => void;
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const useEngineStore = create<EngineStore>()(
  subscribeWithSelector((set) => ({
    // ---- Initial state ----
    currentScene: "water-drop",
    previousScene: null,
    sceneProgress: 0,
    activeNavHref: null,
    scroll: DEFAULT_SCROLL_STATE,
    camera: DEFAULT_CAMERA_STATE,
    transition: DEFAULT_TRANSITION_STATE,
    animation: DEFAULT_ANIMATION_STATE,
    performance: DEFAULT_PERFORMANCE_STATS,
    isInitialized: false,

    // ---- Actions ----
    setCurrentScene: (scene, previousScene) =>
      set({ currentScene: scene, previousScene }),

    setSceneProgress: (sceneProgress) => set({ sceneProgress }),

    setScroll: (scroll) =>
      set((s) => ({ scroll: { ...s.scroll, ...scroll } })),

    setCamera: (camera) =>
      set((s) => ({ camera: { ...s.camera, ...camera } })),

    setTransition: (transition) =>
      set((s) => ({ transition: { ...s.transition, ...transition } })),

    setAnimation: (animation) =>
      set((s) => ({ animation: { ...s.animation, ...animation } })),

    setPerformance: (stats) =>
      set((s) => ({ performance: { ...s.performance, ...stats } })),

    setDeviceTier: (tier) =>
      set((s) => ({
        performance: { ...s.performance, deviceTier: tier },
      })),

    setFps: (fps) =>
      set((s) => ({ performance: { ...s.performance, fps } })),

    setLoadedAssets: (loadedAssets) =>
      set((s) => ({ performance: { ...s.performance, loadedAssets } })),

    setInitialized: (isInitialized) => set({ isInitialized }),
  })),
);
