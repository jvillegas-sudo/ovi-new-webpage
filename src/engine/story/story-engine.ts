/**
 * Story Engine
 *
 * The central orchestrator of the OVI cinematic experience.
 * It creates, wires, and manages the lifecycle of every sub-manager,
 * acting as the single source of truth and the main coordination layer.
 *
 * Usage:
 *   const engine = new StoryEngine();
 *   await engine.init();
 *   // later…
 *   engine.destroy();
 */

import { AccessibilityManager } from "@/engine/accessibility/accessibility-manager";
import { AnimationManager } from "@/engine/animation/animation-manager";
import { CameraManager } from "@/engine/camera/camera-manager";
import { EventBus } from "@/engine/events/event-bus";
import { InteractionManager } from "@/engine/interaction/interaction-manager";
import { NavigationManager } from "@/engine/navigation/navigation-manager";
import { PerformanceManager } from "@/engine/performance/performance-manager";
import { SceneManager } from "@/engine/scene/scene-manager";
import { ScrollManager } from "@/engine/scroll/scroll-manager";
import { TimelineManager } from "@/engine/timeline/timeline-manager";
import { TransitionManager } from "@/engine/transition/transition-manager";
import type { EngineEventMap, SceneConfig, SceneId } from "@/engine/types";
import { useEngineStore } from "@/store/engine-store";

export class StoryEngine {
  /** The event bus connecting all managers loosely. */
  readonly bus: EventBus;

  /** Sub-managers. Public so hooks / providers can access them directly. */
  readonly scroll: ScrollManager;
  readonly scene: SceneManager;
  readonly timeline: TimelineManager;
  readonly camera: CameraManager;
  readonly animation: AnimationManager;
  readonly transition: TransitionManager;
  readonly navigation: NavigationManager;
  readonly performance: PerformanceManager;
  readonly interaction: InteractionManager;
  readonly accessibility: AccessibilityManager;

  private unsubscribeSceneEnter: (() => void) | null = null;

  constructor() {
    this.bus = new EventBus();
    this.scroll = new ScrollManager();
    this.scene = new SceneManager();
    this.timeline = new TimelineManager();
    this.camera = new CameraManager();
    this.animation = new AnimationManager();
    this.transition = new TransitionManager();
    this.navigation = new NavigationManager();
    this.performance = new PerformanceManager();
    this.interaction = new InteractionManager();
    this.accessibility = new AccessibilityManager();
  }

  /**
   * Boot all managers in dependency order.
   * This must be called once the DOM is available (client-side only).
   */
  async init(): Promise<void> {
    // 1. Timeline first — registers GSAP plugins.
    this.timeline.init();

    // 2. Scroll — creates Lenis and GSAP ticker integration.
    this.scroll.init(this.bus);

    // 3. Accessibility — reads prefers-reduced-motion before anything animates.
    this.accessibility.init(this.bus);

    // 4. Performance — starts FPS monitoring.
    this.performance.init(this.bus);

    // 5. Scene — sets up progress-based scene detection.
    this.scene.init(this.bus);

    // 6. Camera — prepares initial state.
    this.camera.init(this.bus);

    // 7. Animation — waits for reduced-motion events.
    this.animation.init(this.bus);

    // 8. Transition — triggers visual transitions on scene:enter.
    this.transition.init(this.bus);

    // 9. Navigation — keeps nav bar in sync.
    this.navigation.init(this.bus);

    // 10. Interaction — keyboard / pointer events.
    this.interaction.init(this.bus, (target) =>
      this.scroll.scrollTo(target as number | string | HTMLElement),
    );

    // 11. Wire camera transitions to scene changes.
    this.unsubscribeSceneEnter = this.bus.on(
      "scene:enter",
      ({ scene }: { scene: SceneId }) => {
        const config = this.scene.getSceneConfig(scene);
        if (config) {
          this.camera.transitionToScene(config as SceneConfig);
        }
      },
    );

    // Mark the engine as ready.
    useEngineStore.setState({ isInitialized: true });
    this.bus.emit("engine:ready");
  }

  /**
   * Register a DOM element so the SceneManager can attach a
   * precise ScrollTrigger to it.
   */
  registerSceneElement(sceneId: SceneId, element: Element): void {
    this.scene.registerElement(sceneId, element);
  }

  /**
   * Unregister a scene DOM element (e.g. on component unmount).
   */
  unregisterSceneElement(sceneId: SceneId): void {
    this.scene.unregisterElement(sceneId);
  }

  /**
   * Convenience: emit an event on the engine bus.
   */
  emit<K extends keyof EngineEventMap>(
    ...args: EngineEventMap[K] extends void
      ? [event: K]
      : [event: K, payload: EngineEventMap[K]]
  ): void {
    (this.bus.emit as (...a: typeof args) => void)(...args);
  }

  /**
   * Convenience: subscribe to an engine event.
   * @returns Unsubscribe function.
   */
  on<K extends keyof EngineEventMap>(
    event: K,
    handler: EngineEventMap[K] extends void
      ? () => void
      : (payload: EngineEventMap[K]) => void,
  ): () => void {
    return this.bus.on(
      event,
      handler as Parameters<typeof this.bus.on<K>>[1],
    );
  }

  /**
   * Tear down all managers in reverse init order.
   */
  destroy(): void {
    this.unsubscribeSceneEnter?.();
    this.interaction.destroy();
    this.navigation.destroy();
    this.transition.destroy();
    this.animation.destroy();
    this.camera.destroy();
    this.scene.destroy();
    this.performance.destroy();
    this.accessibility.destroy();
    this.scroll.destroy();
    this.timeline.destroy();
    this.bus.emit("engine:destroy");
    this.bus.clear();

    useEngineStore.setState({ isInitialized: false });
  }
}
