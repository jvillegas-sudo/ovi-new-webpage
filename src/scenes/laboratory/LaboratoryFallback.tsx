/**
 * LaboratoryFallback
 *
 * Static, accessible alternative to the Three.js experience.
 * Shown when the user has `prefers-reduced-motion` set or when WebGL
 * is unavailable.
 *
 * Provides WCAG 2.2 AA compliant access to all research-station information.
 */

"use client";

import { STATIONS } from "@/scenes/laboratory/data/stations";

export function LaboratoryFallback() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-bg-base px-8 py-16">
      <div className="mx-auto w-full max-w-5xl">
        {/* Section heading */}
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-brand-primary">
          Chapter 02
        </p>
        <h2 className="mb-4 text-5xl font-black uppercase leading-none tracking-tight text-white md:text-7xl">
          Digital Laboratory
        </h2>
        <p className="mb-16 max-w-xl text-lg leading-relaxed text-text-secondary">
          OVI&apos;s digital laboratory is a living research ecosystem — eight
          stations where science, engineering and artificial intelligence
          converge.
        </p>

        {/* Station grid */}
        <ul
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          aria-label="Research stations"
        >
          {STATIONS.map((station) => (
            <li
              key={station.id}
              className="rounded-xl border border-white/10 bg-bg-elevated p-5"
            >
              {/* Colour accent bar */}
              <span
                className="mb-3 block h-2 w-10 rounded-full"
                style={{ background: station.color }}
                aria-hidden
              />
              <h3 className="mb-1 text-sm font-bold uppercase tracking-wide text-white">
                {station.label}
              </h3>
              <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-widest text-text-muted">
                {station.subtitle}
              </p>
              <p className="text-xs leading-relaxed text-text-muted">
                {station.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
