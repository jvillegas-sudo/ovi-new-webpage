/**
 * Engine Types
 *
 * Central type definitions for the OVI Story Engine.
 * All modules share these types to maintain a single source of truth.
 */

// ---------------------------------------------------------------------------
// Scene
// ---------------------------------------------------------------------------

/** Canonical identifiers for every scene in the story flow. */
export type SceneId =
  | "water-drop"
  | "water-distortion"
  | "particle-explosion"
  | "ovi-logo"
  | "technology"
  | "biotechnology"
  | "products"
  | "industries"
  | "impact-dashboard"
  | "ovi-os"
  | "contact";

/** Static configuration that describes a scene's scroll range and camera defaults. */
export interface SceneConfig {
  /** Unique scene identifier. */
  readonly id: SceneId;
  /** Zero-based order in the story flow. */
  readonly index: number;
  /** Human-readable label used in navigation and debug overlay. */
  readonly label: string;
  /** Normalised scroll progress (0–1) at which this scene starts. */
  readonly scrollStart: number;
  /** Normalised scroll progress (0–1) at which this scene ends. */
  readonly scrollEnd: number;
  /** Camera state that should be active while this scene is fully visible. */
  readonly cameraState: CameraState;
  /** Transition style used when entering this scene from the previous one. */
  readonly transition: TransitionType;
  /** Optional href used to highlight a navigation link. */
  readonly navHref?: string;
}

// ---------------------------------------------------------------------------
// Scroll
// ---------------------------------------------------------------------------

export type ScrollDirection = "up" | "down" | "idle";

export interface ScrollState {
  /** Raw scroll offset in pixels. */
  readonly y: number;
  /** Overall scroll progress across the entire page, 0–1. */
  readonly progress: number;
  /** Instantaneous scroll velocity (px / second). */
  readonly velocity: number;
  /** Direction derived from velocity. */
  readonly direction: ScrollDirection;
}

// ---------------------------------------------------------------------------
// Camera
// ---------------------------------------------------------------------------

export interface CameraState {
  /** World-space camera position [x, y, z]. */
  readonly position: readonly [number, number, number];
  /** World-space look-at target [x, y, z]. */
  readonly target: readonly [number, number, number];
  /** Vertical field of view in degrees. */
  readonly fov: number;
}

// ---------------------------------------------------------------------------
// Transition
// ---------------------------------------------------------------------------

export type TransitionType =
  | "particle-morph"
  | "material-dissolve"
  | "depth-transition"
  | "light-evolution"
  | "camera-travel"
  | "volumetric-fog";

export interface TransitionState {
  /** Whether a cross-scene transition is currently in progress. */
  readonly isTransitioning: boolean;
  /** Scene being left. */
  readonly from: SceneId | null;
  /** Scene being entered. */
  readonly to: SceneId | null;
  /** Transition progress 0–1. */
  readonly progress: number;
  /** Transition style being applied. */
  readonly type: TransitionType | null;
}

// ---------------------------------------------------------------------------
// Animation
// ---------------------------------------------------------------------------

export interface AnimationState {
  /** Whether the global animation timeline is playing. */
  readonly isPlaying: boolean;
  /** Respects `prefers-reduced-motion` — when true, all motion is suppressed. */
  readonly reducedMotion: boolean;
}

/** Descriptor for a managed animation subscription. */
export interface AnimationDefinition {
  /** Unique identifier. */
  id: string;
  /** GSAP tween, timeline, or custom tick callback. */
  animation: gsap.core.Tween | gsap.core.Timeline | (() => void);
  /** If true, this animation is paused in reduced-motion mode. */
  respectsReducedMotion: boolean;
}

// ---------------------------------------------------------------------------
// Performance
// ---------------------------------------------------------------------------

export type DeviceTier = "high" | "medium" | "low";

export interface PerformanceStats {
  readonly fps: number;
  readonly deviceTier: DeviceTier;
  /** Estimated render budget per frame in milliseconds. */
  readonly frameBudget: number;
  /** Number of assets tracked by AssetManager. */
  readonly loadedAssets: number;
}

// ---------------------------------------------------------------------------
// Engine State (single source of truth)
// ---------------------------------------------------------------------------

export interface EngineState {
  readonly currentScene: SceneId;
  readonly previousScene: SceneId | null;
  /** Progress through the current scene only, 0–1. */
  readonly sceneProgress: number;
  readonly scroll: ScrollState;
  readonly camera: CameraState;
  readonly transition: TransitionState;
  readonly animation: AnimationState;
  readonly performance: PerformanceStats;
  /** True once all managers have been initialised and are ready. */
  readonly isInitialized: boolean;
}

// ---------------------------------------------------------------------------
// Event Bus
// ---------------------------------------------------------------------------

/**
 * Strongly-typed map of every event emitted by the engine.
 * `void` payload = event carries no data.
 */
export interface EngineEventMap {
  "scene:enter": { scene: SceneId; direction: ScrollDirection };
  "scene:leave": { scene: SceneId; direction: ScrollDirection };
  "scene:progress": { scene: SceneId; progress: number };
  "scroll:update": ScrollState;
  "camera:update": CameraState;
  "camera:transition-start": { from: CameraState; to: CameraState; duration: number };
  "camera:transition-complete": { state: CameraState };
  "transition:start": { from: SceneId | null; to: SceneId; type: TransitionType };
  "transition:progress": { progress: number };
  "transition:complete": { scene: SceneId };
  "animation:reduced-motion-change": { reducedMotion: boolean };
  "navigation:update": { activeHref: string | null; currentScene: SceneId };
  "performance:tier-change": { tier: DeviceTier };
  "engine:ready": void;
  "engine:destroy": void;
}
