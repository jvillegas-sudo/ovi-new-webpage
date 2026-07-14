/**
 * Timeline Manager
 *
 * Owns the single GSAP master timeline that every scene animation
 * subscribes to.  Using a master timeline keeps all animation in sync
 * and allows scrubbing / reversing the entire experience from one handle.
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import type { AnimationDefinition } from "@/engine/types";

export class TimelineManager {
  /** The root timeline — all animations are children of this. */
  private master!: gsap.core.Timeline;
  /** Named sub-timelines / tweens registered by other modules. */
  private animations = new Map<string, AnimationDefinition>();

  init(): void {
    gsap.registerPlugin(ScrollTrigger);

    this.master = gsap.timeline({
      paused: true,
      defaults: { ease: "power3.out" },
    });
  }

  /**
   * Add an animation to the master timeline.
   * If an animation with the same id already exists it is replaced.
   */
  add(definition: AnimationDefinition): void {
    if (this.animations.has(definition.id)) {
      this.remove(definition.id);
    }
    this.animations.set(definition.id, definition);

    if (
      definition.animation instanceof gsap.core.Tween ||
      definition.animation instanceof gsap.core.Timeline
    ) {
      this.master.add(definition.animation);
    }
  }

  /**
   * Remove a previously registered animation.
   */
  remove(id: string): void {
    const def = this.animations.get(id);
    if (!def) return;

    if (
      def.animation instanceof gsap.core.Tween ||
      def.animation instanceof gsap.core.Timeline
    ) {
      this.master.remove(def.animation);
      def.animation.kill();
    }

    this.animations.delete(id);
  }

  /**
   * Pause all motion. Useful for prefers-reduced-motion or tab visibility.
   */
  pause(): void {
    this.master.pause();
  }

  /**
   * Resume the master timeline.
   */
  play(): void {
    this.master.play();
  }

  /**
   * Seek to a normalised progress position (0–1) without changing play state.
   */
  seek(progress: number): void {
    const clampedProgress = Math.max(0, Math.min(1, progress));
    const time = this.master.duration() * clampedProgress;
    this.master.seek(time);
  }

  /**
   * Pause / resume animations that respect reduced-motion.
   */
  setReducedMotion(enabled: boolean): void {
    this.animations.forEach((def) => {
      if (!def.respectsReducedMotion) return;

      if (
        def.animation instanceof gsap.core.Tween ||
        def.animation instanceof gsap.core.Timeline
      ) {
        if (enabled) {
          def.animation.pause();
          def.animation.progress(1); // skip to end
        } else {
          def.animation.play(0);
        }
      }
    });
  }

  getMasterTimeline(): gsap.core.Timeline {
    return this.master;
  }

  destroy(): void {
    this.master.kill();
    this.animations.clear();
  }
}
