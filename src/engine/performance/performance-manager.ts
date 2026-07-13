/**
 * Performance Manager
 *
 * Monitors runtime performance and adapts the experience to the
 * capabilities of the device.
 *
 * Device tiers and their target frame rates:
 *   high   → Desktop     60 FPS
 *   medium → Laptop/Tab  50–45 FPS
 *   low    → Mobile      40 FPS minimum
 */

import type { EventBus } from "@/engine/events/event-bus";
import type { DeviceTier } from "@/engine/types";
import { useEngineStore } from "@/store/engine-store";

/** Number of frames to average when calculating FPS. */
const FPS_SAMPLE_SIZE = 60;

/** FPS thresholds that trigger a tier downgrade. */
const TIER_THRESHOLDS: Record<DeviceTier, number> = {
  high: 55,
  medium: 40,
  low: 0,
};

export class PerformanceManager {
  private eventBus!: EventBus;

  private frameTimes: number[] = [];
  private lastFrameTime = 0;
  private rafHandle: number | null = null;
  private currentTier: DeviceTier = "high";

  init(eventBus: EventBus): void {
    this.eventBus = eventBus;

    this.currentTier = this.detectDeviceTier();
    useEngineStore.setState({
      performance: {
        ...useEngineStore.getState().performance,
        deviceTier: this.currentTier,
        frameBudget: this.frameBudgetForTier(this.currentTier),
      },
    });

    this.startMonitoring();
  }

  /**
   * Heuristic device-tier detection based on hardware concurrency,
   * memory (if available), and touch capability.
   */
  detectDeviceTier(): DeviceTier {
    if (typeof window === "undefined") return "high";

    const cores = navigator.hardwareConcurrency ?? 4;
    // `deviceMemory` is a non-standard Chrome API.
    const memory = (navigator as { deviceMemory?: number }).deviceMemory ?? 4;
    const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

    if (isMobile && (cores < 4 || memory < 2)) return "low";
    if (cores <= 4 || memory <= 2) return "medium";
    return "high";
  }

  private startMonitoring(): void {
    const tick = (now: number): void => {
      if (this.lastFrameTime !== 0) {
        const delta = now - this.lastFrameTime;
        this.frameTimes.push(delta);
        if (this.frameTimes.length > FPS_SAMPLE_SIZE) {
          this.frameTimes.shift();
        }
      }
      this.lastFrameTime = now;

      if (this.frameTimes.length >= FPS_SAMPLE_SIZE) {
        this.updateFps();
      }

      this.rafHandle = requestAnimationFrame(tick);
    };

    this.rafHandle = requestAnimationFrame(tick);
  }

  private updateFps(): void {
    const avgDelta =
      this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length;
    const fps = Math.round(1000 / avgDelta);

    useEngineStore.setState({
      performance: { ...useEngineStore.getState().performance, fps },
    });

    this.adaptTier(fps);
  }

  /**
   * Downgrade / upgrade device tier based on measured FPS.
   * Only changes tier when a threshold is crossed to avoid thrashing.
   */
  private adaptTier(fps: number): void {
    let newTier: DeviceTier = this.currentTier;

    if (fps >= TIER_THRESHOLDS.high) {
      newTier = "high";
    } else if (fps >= TIER_THRESHOLDS.medium) {
      newTier = "medium";
    } else {
      newTier = "low";
    }

    if (newTier === this.currentTier) return;

    this.currentTier = newTier;
    useEngineStore.setState({
      performance: {
        ...useEngineStore.getState().performance,
        deviceTier: newTier,
        frameBudget: this.frameBudgetForTier(newTier),
      },
    });

    this.eventBus.emit("performance:tier-change", { tier: newTier });
  }

  private frameBudgetForTier(tier: DeviceTier): number {
    const targets: Record<DeviceTier, number> = {
      high: 16.67,   // 60 FPS
      medium: 20,    // 50 FPS
      low: 25,       // 40 FPS
    };
    return targets[tier];
  }

  getFps(): number {
    return useEngineStore.getState().performance.fps;
  }

  getTier(): DeviceTier {
    return this.currentTier;
  }

  destroy(): void {
    if (this.rafHandle !== null) {
      cancelAnimationFrame(this.rafHandle);
      this.rafHandle = null;
    }
  }
}
