/**
 * TechnologyFallback
 *
 * Static, accessible alternative to the Three.js experience.
 * Shown when the user has prefers-reduced-motion set or when WebGL
 * is unavailable.
 *
 * Provides WCAG 2.2 AA compliant access to all capability information.
 */

"use client";

import { CAPABILITIES } from "@/scenes/technology/data/capabilities";

export function TechnologyFallback() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-bg-base px-8 py-16">
      <div className="mx-auto w-full max-w-5xl">
        {/* Section heading */}
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-brand-primary">
          Chapter 01
        </p>
        <h2 className="mb-4 text-5xl font-black uppercase leading-none tracking-tight text-white md:text-7xl">
          Technology
        </h2>
        <p className="mb-16 max-w-xl text-lg leading-relaxed text-text-secondary">
          OVI&apos;s technological ecosystem spans eight interconnected
          disciplines — each one engineered to deliver measurable impact.
        </p>

        {/* Capability grid */}
        <ul
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          aria-label="Technology capabilities"
        >
          {CAPABILITIES.map((cap) => (
            <li
              key={cap.id}
              className="rounded-xl border border-white/10 bg-bg-elevated p-5"
            >
              {/* Colour dot */}
              <span
                className="mb-3 block h-2 w-8 rounded-full"
                style={{ background: cap.color }}
                aria-hidden
              />
              <h3 className="mb-1 text-sm font-bold uppercase tracking-wide text-white">
                {cap.label}
              </h3>
              <p className="text-xs leading-relaxed text-text-muted">
                {cap.tagline}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
