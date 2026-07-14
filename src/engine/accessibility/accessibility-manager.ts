/**
 * Accessibility Manager
 *
 * Ensures the engine meets WCAG 2.2 AA requirements.
 *
 * Responsibilities:
 * - Detect and respond to `prefers-reduced-motion`.
 * - Maintain an ARIA live region that announces scene changes.
 * - Expose the current reduced-motion flag via the engine store.
 */

import type { EventBus } from "@/engine/events/event-bus";
import { SCENE_MAP } from "@/engine/scene/scene-config";
import type { SceneId } from "@/engine/types";
import { useEngineStore } from "@/store/engine-store";

const LIVE_REGION_ID = "ovi-engine-live-region";

export class AccessibilityManager {
  private eventBus!: EventBus;
  private mediaQuery: MediaQueryList | null = null;
  private liveRegion: HTMLElement | null = null;
  private unsubscribeScene: (() => void) | null = null;
  private boundMotionChange!: (e: MediaQueryListEvent) => void;

  init(eventBus: EventBus): void {
    this.eventBus = eventBus;

    this.initReducedMotion();
    this.initLiveRegion();

    // Announce scene transitions to screen readers.
    this.unsubscribeScene = eventBus.on("scene:enter", ({ scene }) => {
      this.announce(scene);
    });
  }

  // ---------------------------------------------------------------------------
  // Reduced motion
  // ---------------------------------------------------------------------------

  private initReducedMotion(): void {
    if (typeof window === "undefined") return;

    this.mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const current = this.mediaQuery.matches;
    this.applyReducedMotion(current);

    this.boundMotionChange = (e) => {
      this.applyReducedMotion(e.matches);
    };

    // Modern browsers support addEventListener on MediaQueryList.
    this.mediaQuery.addEventListener("change", this.boundMotionChange);
  }

  private applyReducedMotion(enabled: boolean): void {
    useEngineStore.setState({
      animation: {
        ...useEngineStore.getState().animation,
        reducedMotion: enabled,
      },
    });
    this.eventBus.emit("animation:reduced-motion-change", { reducedMotion: enabled });
  }

  // ---------------------------------------------------------------------------
  // ARIA live region
  // ---------------------------------------------------------------------------

  private initLiveRegion(): void {
    if (typeof document === "undefined") return;

    let region = document.getElementById(LIVE_REGION_ID);
    if (!region) {
      region = document.createElement("div");
      region.id = LIVE_REGION_ID;
      region.setAttribute("aria-live", "polite");
      region.setAttribute("aria-atomic", "true");
      region.setAttribute("role", "status");
      // Visually hidden, screen-reader accessible.
      Object.assign(region.style, {
        position: "absolute",
        width: "1px",
        height: "1px",
        padding: "0",
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0,0,0,0)",
        whiteSpace: "nowrap",
        border: "0",
      });
      document.body.appendChild(region);
    }

    this.liveRegion = region;
  }

  private announce(scene: SceneId): void {
    if (!this.liveRegion) return;

    const config = SCENE_MAP.get(scene);
    const label = config?.label ?? scene;

    // Clearing and then setting forces screen readers to re-read.
    this.liveRegion.textContent = "";
    requestAnimationFrame(() => {
      if (this.liveRegion) {
        this.liveRegion.textContent = label;
      }
    });
  }

  isReducedMotion(): boolean {
    return useEngineStore.getState().animation.reducedMotion;
  }

  destroy(): void {
    this.mediaQuery?.removeEventListener(
      "change",
      this.boundMotionChange,
    );
    this.unsubscribeScene?.();
    this.liveRegion?.remove();
    this.liveRegion = null;
  }
}
