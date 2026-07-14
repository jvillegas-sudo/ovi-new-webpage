/**
 * Camera Manager
 *
 * Manages cinematic camera state transitions.
 *
 * Guiding principles:
 * - Camera movement must feel intentional, not mechanical.
 * - Transitions use smooth lerp interpolation, never instant snaps.
 * - Camera anticipates the next scene by starting its move slightly early.
 * - Inspired by Apple Keynote / Tesla launch / Pixar cinematography.
 *
 * The Camera Manager does not own a Three.js camera — it owns the
 * logical camera STATE.  The actual Three.js camera (inside R3F) reads
 * state from the engine store and applies it each frame.
 */

import gsap from "gsap";

import type { EventBus } from "@/engine/events/event-bus";
import type { CameraState, SceneConfig } from "@/engine/types";
import { useEngineStore } from "@/store/engine-store";

/** Clones a CameraState so internal state is never mutated from outside. */
const cloneCamera = (c: CameraState): CameraState => ({
  position: [...c.position] as [number, number, number],
  target: [...c.target] as [number, number, number],
  fov: c.fov,
});

export class CameraManager {
  private eventBus!: EventBus;
  /** Mutable working copy used for GSAP tweening. */
  private working: {
    px: number; py: number; pz: number;
    tx: number; ty: number; tz: number;
    fov: number;
  } = { px: 0, py: 0, pz: 5, tx: 0, ty: 0, tz: 0, fov: 45 };
  private activeTween: gsap.core.Tween | null = null;

  init(eventBus: EventBus): void {
    this.eventBus = eventBus;

    const initial = useEngineStore.getState().camera;
    this.applyToWorking(initial);
  }

  /**
   * Transition the camera to the target state of a new scene.
   * Called by the StoryEngine when a scene:enter event fires.
   *
   * @param config    The incoming scene's configuration.
   * @param duration  Seconds for the transition (defaults to cinematic timing).
   */
  transitionToScene(config: SceneConfig, duration = 1.4): void {
    this.transitionTo(config.cameraState, duration);
  }

  /**
   * Generic camera transition to an arbitrary CameraState.
   */
  transitionTo(target: CameraState, duration = 1.4): void {
    const from = cloneCamera(useEngineStore.getState().camera);

    this.eventBus.emit("camera:transition-start", {
      from,
      to: target,
      duration,
    });

    // Kill any in-progress camera tween.
    this.activeTween?.kill();

    const goal = {
      px: target.position[0],
      py: target.position[1],
      pz: target.position[2],
      tx: target.target[0],
      ty: target.target[1],
      tz: target.target[2],
      fov: target.fov,
    };

    this.activeTween = gsap.to(this.working, {
      ...goal,
      duration,
      /**
       * "power2.inOut" gives the camera a slow start and a slow arrival —
       * exactly the cinematic "ease-in / ease-out" feel.
       */
      ease: "power2.inOut",
      onUpdate: () => {
        const nextState: CameraState = {
          position: [this.working.px, this.working.py, this.working.pz],
          target: [this.working.tx, this.working.ty, this.working.tz],
          fov: this.working.fov,
        };
        useEngineStore.setState({ camera: nextState });
        this.eventBus.emit("camera:update", nextState);
      },
      onComplete: () => {
        useEngineStore.setState({ camera: target });
        this.eventBus.emit("camera:transition-complete", { state: target });
      },
    });
  }

  /**
   * Immediately snap the camera without any animation.
   * Use sparingly — only appropriate for instant resets.
   */
  snap(state: CameraState): void {
    this.activeTween?.kill();
    this.applyToWorking(state);
    useEngineStore.setState({ camera: state });
    this.eventBus.emit("camera:update", state);
  }

  private applyToWorking(state: CameraState): void {
    this.working.px = state.position[0];
    this.working.py = state.position[1];
    this.working.pz = state.position[2];
    this.working.tx = state.target[0];
    this.working.ty = state.target[1];
    this.working.tz = state.target[2];
    this.working.fov = state.fov;
  }

  destroy(): void {
    this.activeTween?.kill();
  }
}
