/**
 * Interaction Manager
 *
 * Handles user input events and translates them into engine actions.
 *
 * Supported interactions:
 * - Arrow keys / Page Up / Page Down → programmatic scene navigation.
 * - Pointer events → emitted on the bus for scene components.
 */

import type { EventBus } from "@/engine/events/event-bus";
import { SCENES } from "@/engine/scene/scene-config";
import type { SceneId } from "@/engine/types";
import { useEngineStore } from "@/store/engine-store";

/** How far to scroll per keyboard press (px). */
const KEYBOARD_SCROLL_AMOUNT = 600;

export class InteractionManager {
  private eventBus!: EventBus;
  private scrollTo!: (target: number | string | HTMLElement) => void;

  private boundKeydown!: (e: KeyboardEvent) => void;

  init(
    eventBus: EventBus,
    scrollTo: (target: number | string | HTMLElement) => void,
  ): void {
    this.eventBus = eventBus;
    this.scrollTo = scrollTo;

    this.boundKeydown = this.handleKeydown.bind(this);
    window.addEventListener("keydown", this.boundKeydown);
  }

  private handleKeydown(e: KeyboardEvent): void {
    // Ignore if focus is inside a form element.
    const tag = (e.target as HTMLElement).tagName;
    if (["INPUT", "TEXTAREA", "SELECT"].includes(tag)) return;

    switch (e.key) {
      case "ArrowDown":
      case "PageDown":
        e.preventDefault();
        this.navigateRelative(1);
        break;

      case "ArrowUp":
      case "PageUp":
        e.preventDefault();
        this.navigateRelative(-1);
        break;

      case "Home":
        e.preventDefault();
        this.navigateToScene("water-drop");
        break;

      case "End":
        e.preventDefault();
        this.navigateToScene("contact");
        break;

      default:
        break;
    }
  }

  /**
   * Navigate to the next (+1) or previous (-1) scene.
   */
  navigateRelative(delta: 1 | -1): void {
    const { currentScene } = useEngineStore.getState();
    const currentIndex = SCENES.findIndex((s) => s.id === currentScene);
    const targetIndex = Math.max(
      0,
      Math.min(SCENES.length - 1, currentIndex + delta),
    );
    this.navigateToScene(SCENES[targetIndex].id);
  }

  /**
   * Scroll the page to a specific scene by id.
   */
  navigateToScene(id: SceneId): void {
    const element = document.querySelector<HTMLElement>(`[data-scene="${id}"]`);
    if (element) {
      this.scrollTo(element);
      return;
    }

    // Fallback: estimate scroll position from scene progress range.
    const config = SCENES.find((s) => s.id === id);
    if (!config) return;

    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const targetY = config.scrollStart * totalHeight;
    this.scrollTo(targetY);

    void KEYBOARD_SCROLL_AMOUNT; // reserved for per-press scroll fallback
  }

  destroy(): void {
    window.removeEventListener("keydown", this.boundKeydown);
  }
}
