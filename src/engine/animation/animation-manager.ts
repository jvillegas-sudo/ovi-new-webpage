/**
 * Animation Manager
 *
 * Central registry for all scene animations.
 *
 * Responsibilities:
 * - Register / unregister named animations.
 * - Pause / resume all managed animations.
 * - Honour `prefers-reduced-motion` by skipping or completing
 *   animations flagged as `respectsReducedMotion`.
 */

import type { EventBus } from "@/engine/events/event-bus";
import type { AnimationDefinition } from "@/engine/types";
import { useEngineStore } from "@/store/engine-store";

export class AnimationManager {
  private eventBus!: EventBus;
  private registry = new Map<string, AnimationDefinition>();
  private unsubscribeReducedMotion: (() => void) | null = null;

  init(eventBus: EventBus): void {
    this.eventBus = eventBus;

    this.unsubscribeReducedMotion = eventBus.on(
      "animation:reduced-motion-change",
      ({ reducedMotion }) => {
        this.applyReducedMotion(reducedMotion);
      },
    );
  }

  /**
   * Register an animation.  If an entry with the same id already
   * exists, the old one is replaced and its GSAP object killed.
   */
  register(definition: AnimationDefinition): void {
    if (this.registry.has(definition.id)) {
      this.unregister(definition.id);
    }
    this.registry.set(definition.id, definition);

    // If reduced-motion is already active, apply it immediately.
    if (
      useEngineStore.getState().animation.reducedMotion &&
      definition.respectsReducedMotion
    ) {
      this.skipAnimation(definition);
    }
  }

  /**
   * Remove and kill a named animation.
   */
  unregister(id: string): void {
    const def = this.registry.get(id);
    if (!def) return;

    if (typeof def.animation === "function") {
      // Nothing to kill for tick callbacks.
    } else {
      def.animation.kill();
    }

    this.registry.delete(id);
  }

  /**
   * Pause every managed animation.
   */
  pauseAll(): void {
    this.registry.forEach((def) => {
      if (typeof def.animation !== "function") {
        def.animation.pause();
      }
    });
  }

  /**
   * Resume every managed animation.
   */
  resumeAll(): void {
    this.registry.forEach((def) => {
      if (typeof def.animation !== "function") {
        def.animation.play();
      }
    });
  }

  private applyReducedMotion(enabled: boolean): void {
    this.registry.forEach((def) => {
      if (!def.respectsReducedMotion) return;
      if (enabled) {
        this.skipAnimation(def);
      } else if (typeof def.animation !== "function") {
        def.animation.play(0);
      }
    });
  }

  /**
   * Skip a GSAP animation to its end state without playing it.
   */
  private skipAnimation(def: AnimationDefinition): void {
    if (typeof def.animation !== "function") {
      def.animation.pause();
      def.animation.progress(1);
    }
  }

  getAnimation(id: string): AnimationDefinition | undefined {
    return this.registry.get(id);
  }

  destroy(): void {
    this.registry.forEach((def) => {
      if (typeof def.animation !== "function") {
        def.animation.kill();
      }
    });
    this.registry.clear();
    this.unsubscribeReducedMotion?.();
  }
}
