/**
 * Design Token: Animation
 *
 * Cinematic easing curves and durations.
 * OVI is a premium brand — animations should feel intentional and elegant,
 * never janky or rushed.
 *
 * Based on Apple/Stripe timing philosophy:
 *   - Entrances are slightly slower than exits
 *   - Use spring physics for interactive elements
 *   - Use ease-out for entrance, ease-in for exit
 *
 * Usage:
 *   import { animation } from '@config/tokens/animation'
 */

export const animation = {
  // ─── Duration ──────────────────────────────────────────────────────────────
  duration: {
    instant: 0, // 0ms — no animation (respect prefers-reduced-motion)
    fastest: 0.1, // 100ms — micro-interactions
    faster: 0.15, // 150ms
    fast: 0.2, // 200ms — hover states
    normal: 0.3, // 300ms — default transitions
    slow: 0.5, // 500ms — reveals, entrances
    slower: 0.7, // 700ms — page sections
    slowest: 1.0, // 1000ms — hero animations
    dramatic: 1.5, // 1500ms — cinematic reveals
  },

  // ─── Easing (CSS values) ───────────────────────────────────────────────────
  ease: {
    linear: "linear",
    easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    easeOut: "cubic-bezier(0, 0, 0.2, 1)",
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    /** Apple-style smooth deceleration */
    smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    /** Spring-like overshoot */
    spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    /** Cinematic entrance */
    cinema: "cubic-bezier(0.16, 1, 0.3, 1)",
    /** Sharp, precise exit */
    sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
  },

  // ─── Framer Motion Variants ────────────────────────────────────────────────
  // These are pre-built variants to use with framer-motion
  framerEase: {
    smooth: [0.25, 0.46, 0.45, 0.94],
    spring: [0.34, 1.56, 0.64, 1],
    cinema: [0.16, 1, 0.3, 1],
    sharp: [0.4, 0, 0.6, 1],
  },

  // ─── GSAP Eases ────────────────────────────────────────────────────────────
  gsap: {
    smooth: "power2.out",
    cinema: "expo.out",
    spring: "elastic.out(1, 0.3)",
    sharp: "power3.in",
    bounce: "bounce.out",
  },

  // ─── Stagger ───────────────────────────────────────────────────────────────
  stagger: {
    fastest: 0.03,
    fast: 0.05,
    normal: 0.08,
    slow: 0.12,
    dramatic: 0.2,
  },
} as const;

export type Animation = typeof animation;
