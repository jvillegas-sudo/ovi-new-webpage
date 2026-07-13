/**
 * Scroll Manager
 *
 * Initialises Lenis for smooth-scroll and synchronises it with
 * GSAP's ticker so that ScrollTrigger calculations remain accurate.
 *
 * Responsibilities:
 * - Create and own the Lenis instance.
 * - Feed Lenis into the GSAP ticker.
 * - Derive ScrollState from Lenis scroll events.
 * - Emit "scroll:update" on the event bus.
 * - Update the engine store.
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import type { EventBus } from "@/engine/events/event-bus";
import type { ScrollDirection, ScrollState } from "@/engine/types";
import { useEngineStore } from "@/store/engine-store";

export class ScrollManager {
  private lenis!: Lenis;
  private eventBus!: EventBus;
  private gsapTickerCallback!: (time: number) => void;
  private lastScrollY = 0;

  init(eventBus: EventBus): void {
    this.eventBus = eventBus;

    gsap.registerPlugin(ScrollTrigger);

    // Create Lenis with manual RAF so we can drive it from the GSAP ticker.
    this.lenis = new Lenis({
      autoRaf: false,
      smoothWheel: true,
      lerp: 0.08,
    });

    // Synchronise ScrollTrigger refresh calls with Lenis scroll events.
    this.lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis from GSAP's RAF loop.
    this.gsapTickerCallback = (time: number) => {
      this.lenis.raf(time * 1000); // GSAP time is in seconds; Lenis wants ms.
    };

    gsap.ticker.add(this.gsapTickerCallback);
    // Disable lag smoothing so GSAP stays in lock-step with Lenis.
    gsap.ticker.lagSmoothing(0);

    // Listen for Lenis scroll events and push state.
    this.lenis.on(
      "scroll",
      (lenisInstance: {
        scroll: number;
        velocity: number;
        limit: number;
        progress: number;
      }) => {
        this.handleScroll(lenisInstance);
      },
    );
  }

  private handleScroll(lenisData: {
    scroll: number;
    velocity: number;
    limit: number;
    progress: number;
  }): void {
    const direction = this.deriveDirection(
      lenisData.scroll,
      lenisData.velocity,
    );

    this.lastScrollY = lenisData.scroll;

    const scrollState: ScrollState = {
      y: lenisData.scroll,
      progress: lenisData.progress,
      velocity: lenisData.velocity,
      direction,
    };

    useEngineStore.setState({ scroll: scrollState });
    this.eventBus.emit("scroll:update", scrollState);
  }

  private deriveDirection(
    currentY: number,
    velocity: number,
  ): ScrollDirection {
    if (Math.abs(velocity) < 0.01) return "idle";
    return currentY > this.lastScrollY ? "down" : "up";
  }

  /**
   * Programmatically scroll to a position or element.
   */
  scrollTo(
    target: number | string | HTMLElement,
    options?: Parameters<Lenis["scrollTo"]>[1],
  ): void {
    this.lenis.scrollTo(target, options);
  }

  getLenisInstance(): Lenis {
    return this.lenis;
  }

  destroy(): void {
    gsap.ticker.remove(this.gsapTickerCallback);
    this.lenis.destroy();
  }
}
