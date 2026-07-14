/**
 * Transition Manager
 *
 * Orchestrates cinematic between-scene transitions.
 *
 * Supported styles:
 * - particle-morph      — particles scatter and reform into the next scene.
 * - material-dissolve   — surfaces dissolve via opacity + noise texture.
 * - depth-transition    — camera plunges forward, scene emerges from depth.
 * - light-evolution     — light sources shift colour and intensity.
 * - camera-travel       — camera travels through space between two positions.
 * - volumetric-fog      — fog rises and dissipates to reveal the next scene.
 *
 * Each strategy returns a GSAP timeline. Scene components subscribe to
 * transition events and apply the strategy via CSS custom properties,
 * Three.js uniforms, or GSAP targets.
 */

import gsap from "gsap";

import type { EventBus } from "@/engine/events/event-bus";
import { SCENE_MAP } from "@/engine/scene/scene-config";
import type { SceneId, TransitionType } from "@/engine/types";
import { useEngineStore } from "@/store/engine-store";

/** Transition duration for each strategy (seconds). */
const DURATIONS: Record<TransitionType, number> = {
  "particle-morph": 1.2,
  "material-dissolve": 0.9,
  "depth-transition": 1.0,
  "light-evolution": 1.4,
  "camera-travel": 1.6,
  "volumetric-fog": 1.8,
};

export class TransitionManager {
  private eventBus!: EventBus;
  private activeTween: gsap.core.Tween | null = null;
  private unsubscribeEnter: (() => void) | null = null;

  init(eventBus: EventBus): void {
    this.eventBus = eventBus;

    // Automatically trigger a transition whenever a scene is entered.
    this.unsubscribeEnter = eventBus.on("scene:enter", ({ scene }) => {
      const { currentScene, transition: transitionState } =
        useEngineStore.getState();

      // Avoid re-triggering if we are already in a transition to this scene.
      if (
        transitionState.isTransitioning &&
        transitionState.to === scene
      ) {
        return;
      }

      const sceneConfig = SCENE_MAP.get(scene);
      if (!sceneConfig) return;

      const from = currentScene !== scene ? currentScene : null;
      this.transition(from, scene, sceneConfig.transition);
    });
  }

  /**
   * Execute a transition from one scene to another.
   * This is the public API used by scene components and the StoryEngine.
   */
  transition(
    from: SceneId | null,
    to: SceneId,
    type: TransitionType,
  ): void {
    this.activeTween?.kill();

    const duration = DURATIONS[type];
    const progress = { value: 0 };

    useEngineStore.setState({
      transition: {
        isTransitioning: true,
        from,
        to,
        progress: 0,
        type,
      },
    });

    this.eventBus.emit("transition:start", { from, to, type });

    this.activeTween = gsap.to(progress, {
      value: 1,
      duration,
      ease: this.easingForType(type),
      onUpdate: () => {
        useEngineStore.setState({
          transition: {
            isTransitioning: true,
            from,
            to,
            progress: progress.value,
            type,
          },
        });
        this.eventBus.emit("transition:progress", {
          progress: progress.value,
        });
      },
      onComplete: () => {
        useEngineStore.setState({
          transition: {
            isTransitioning: false,
            from,
            to,
            progress: 1,
            type,
          },
        });
        this.eventBus.emit("transition:complete", { scene: to });
      },
    });
  }

  /** Choose a GSAP easing that suits each visual style. */
  private easingForType(type: TransitionType): string {
    const map: Record<TransitionType, string> = {
      "particle-morph": "power4.out",
      "material-dissolve": "power2.inOut",
      "depth-transition": "power3.in",
      "light-evolution": "sine.inOut",
      "camera-travel": "power2.inOut",
      "volumetric-fog": "power1.inOut",
    };
    return map[type];
  }

  destroy(): void {
    this.activeTween?.kill();
    this.unsubscribeEnter?.();
  }
}
