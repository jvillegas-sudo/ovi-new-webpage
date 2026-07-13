/**
 * Scene Manager
 *
 * Tracks which scene is currently active based on scroll progress.
 * When a scene DOM element is registered the manager sets up a dedicated
 * GSAP ScrollTrigger for precise per-element tracking.
 * Without DOM registration, progress-based detection is used instead.
 */

import { ScrollTrigger } from "gsap/ScrollTrigger";

import type { EventBus } from "@/engine/events/event-bus";
import { SCENES } from "@/engine/scene/scene-config";
import type { SceneConfig, SceneId } from "@/engine/types";
import { useEngineStore } from "@/store/engine-store";

export class SceneManager {
  private eventBus!: EventBus;
  /** ScrollTrigger instances keyed by scene id. */
  private triggers = new Map<SceneId, ScrollTrigger>();
  /** Registered DOM elements keyed by scene id. */
  private elements = new Map<SceneId, Element>();
  private unsubscribeScroll: (() => void) | null = null;

  init(eventBus: EventBus): void {
    this.eventBus = eventBus;

    // Drive scene detection from scroll:update events.
    this.unsubscribeScroll = eventBus.on("scroll:update", (scrollState) => {
      this.updateFromProgress(scrollState.progress);
    });
  }

  /**
   * Register a DOM element for a scene.
   * The manager sets up a ScrollTrigger that fires scene events
   * as the element enters/leaves the viewport.
   */
  registerElement(sceneId: SceneId, element: Element): void {
    const config = SCENES.find((s) => s.id === sceneId);
    if (!config) return;

    // Remove existing trigger for this scene if any.
    this.unregisterElement(sceneId);
    this.elements.set(sceneId, element);

    const trigger = ScrollTrigger.create({
      trigger: element as HTMLElement,
      start: "top 80%",
      end: "bottom 20%",
      onEnter: () => {
        this.enterScene(config, "down");
      },
      onEnterBack: () => {
        this.enterScene(config, "up");
      },
      onLeave: () => {
        this.eventBus.emit("scene:leave", {
          scene: sceneId,
          direction: "down",
        });
      },
      onLeaveBack: () => {
        this.eventBus.emit("scene:leave", {
          scene: sceneId,
          direction: "up",
        });
      },
      onUpdate: (self) => {
        this.eventBus.emit("scene:progress", {
          scene: sceneId,
          progress: self.progress,
        });
        if (useEngineStore.getState().currentScene === sceneId) {
          useEngineStore.setState({ sceneProgress: self.progress });
        }
      },
    });

    this.triggers.set(sceneId, trigger);
  }

  /**
   * Unregister a DOM element and its ScrollTrigger.
   */
  unregisterElement(sceneId: SceneId): void {
    this.triggers.get(sceneId)?.kill();
    this.triggers.delete(sceneId);
    this.elements.delete(sceneId);
  }

  /**
   * Fallback: derive the active scene from overall scroll progress (0–1).
   * Used when no DOM elements are registered for a scene.
   */
  private updateFromProgress(progress: number): void {
    const active = this.findSceneByProgress(progress);
    if (!active) return;

    const { currentScene } = useEngineStore.getState();
    if (currentScene === active.id) return;

    const direction = progress > this.lastProgress ? "down" : "up";
    this.lastProgress = progress;

    const previous = currentScene;
    useEngineStore.setState({
      currentScene: active.id,
      previousScene: previous,
    });

    this.eventBus.emit("scene:enter", {
      scene: active.id,
      direction,
    });

    const sceneProgress =
      active.scrollEnd > active.scrollStart
        ? (progress - active.scrollStart) /
          (active.scrollEnd - active.scrollStart)
        : 0;

    useEngineStore.setState({
      sceneProgress: Math.max(0, Math.min(1, sceneProgress)),
    });

    this.eventBus.emit("scene:progress", {
      scene: active.id,
      progress: Math.max(0, Math.min(1, sceneProgress)),
    });
  }

  private lastProgress = 0;

  private findSceneByProgress(progress: number): SceneConfig | undefined {
    // Find the last scene whose scrollStart is ≤ progress.
    return [...SCENES]
      .reverse()
      .find((s) => progress >= s.scrollStart);
  }

  private enterScene(config: SceneConfig, direction: "up" | "down"): void {
    const previous = useEngineStore.getState().currentScene;
    useEngineStore.setState({
      currentScene: config.id,
      previousScene: previous,
    });
    this.eventBus.emit("scene:enter", {
      scene: config.id,
      direction,
    });
  }

  getSceneConfig(id: SceneId): SceneConfig | undefined {
    return SCENES.find((s) => s.id === id);
  }

  getAllScenes(): readonly SceneConfig[] {
    return SCENES;
  }

  destroy(): void {
    this.unsubscribeScroll?.();
    this.triggers.forEach((t) => t.kill());
    this.triggers.clear();
    this.elements.clear();
  }
}
