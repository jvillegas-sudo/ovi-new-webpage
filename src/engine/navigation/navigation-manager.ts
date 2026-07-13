/**
 * Navigation Manager
 *
 * Keeps the navigation bar in sync with the current scene.
 *
 * Responsibilities:
 * - Resolve the active navigation href from the current scene config.
 * - Emit "navigation:update" whenever the active link changes.
 * - Update the engine store so React components can subscribe.
 */

import { SCENE_MAP } from "@/engine/scene/scene-config";
import type { EventBus } from "@/engine/events/event-bus";
import type { SceneId } from "@/engine/types";
import { useEngineStore } from "@/store/engine-store";

export class NavigationManager {
  private eventBus!: EventBus;
  private activeHref: string | null = null;
  private unsubscribeEnter: (() => void) | null = null;

  init(eventBus: EventBus): void {
    this.eventBus = eventBus;

    // Derive active href whenever the scene changes.
    this.unsubscribeEnter = eventBus.on("scene:enter", ({ scene }) => {
      this.updateNavigation(scene);
    });

    // Set initial state.
    this.updateNavigation(useEngineStore.getState().currentScene);
  }

  private updateNavigation(scene: SceneId): void {
    const config = SCENE_MAP.get(scene);
    const href = config?.navHref ?? null;

    if (href === this.activeHref) return;

    this.activeHref = href;

    useEngineStore.setState({ activeNavHref: href });

    this.eventBus.emit("navigation:update", {
      activeHref: href,
      currentScene: scene,
    });
  }

  getActiveHref(): string | null {
    return this.activeHref;
  }

  destroy(): void {
    this.unsubscribeEnter?.();
  }
}
