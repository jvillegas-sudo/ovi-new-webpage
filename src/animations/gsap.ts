/**
 * Animation: GSAP Utilities
 *
 * Reusable GSAP animation functions built on the OVI animation language.
 * These are used for scroll-triggered animations, text reveals, and
 * complex sequenced animations that Framer Motion can't handle.
 *
 * Why GSAP alongside Framer Motion?
 *   - GSAP: scroll-triggered, timeline-based, Three.js integration
 *   - Framer Motion: component-level, React-idiomatic, layout animations
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// Register plugins (safe to call multiple times)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

/**
 * Animate an element into view on scroll
 */
export function animateOnScroll(
  element: gsap.TweenTarget,
  options?: {
    y?: number;
    opacity?: number;
    duration?: number;
    delay?: number;
    ease?: string;
    start?: string;
    once?: boolean;
  },
): ScrollTrigger | undefined {
  if (typeof window === "undefined") return;

  const {
    y = 40,
    opacity = 0,
    duration = 0.8,
    delay = 0,
    ease = "expo.out",
    start = "top 85%",
    once = true,
  } = options ?? {};

  gsap.set(element, { opacity, y });

  return ScrollTrigger.create({
    trigger: element as Element,
    start,
    once,
    onEnter: () => {
      gsap.to(element, { opacity: 1, y: 0, duration, delay, ease });
    },
  });
}

/**
 * Stagger children elements on scroll
 */
export function staggerOnScroll(
  container: gsap.TweenTarget,
  children: string = "[data-animate]",
  options?: {
    stagger?: number;
    duration?: number;
    ease?: string;
    start?: string;
  },
): ScrollTrigger | undefined {
  if (typeof window === "undefined") return;

  const { stagger = 0.08, duration = 0.6, ease = "expo.out", start = "top 85%" } =
    options ?? {};

  gsap.set(`${container as string} ${children}`, { opacity: 0, y: 24 });

  return ScrollTrigger.create({
    trigger: container as Element,
    start,
    once: true,
    onEnter: () => {
      gsap.to(`${container as string} ${children}`, {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        ease,
      });
    },
  });
}

/**
 * Horizontal scroll parallax effect
 */
export function createParallax(
  element: gsap.TweenTarget,
  speed: number = 0.3,
): ScrollTrigger | undefined {
  if (typeof window === "undefined") return;

  return ScrollTrigger.create({
    trigger: element as Element,
    start: "top bottom",
    end: "bottom top",
    scrub: true,
    onUpdate: (self) => {
      gsap.set(element, {
        y: self.progress * speed * 200 - speed * 100,
      });
    },
  });
}

/**
 * Kill all scroll triggers — call on route change to prevent leaks
 */
export function killAllScrollTriggers(): void {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}
