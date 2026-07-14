"use client";

import {
  INDUSTRY_ENVIRONMENTS,
  PRODUCTS_TRANSITION,
} from "@/scenes/industrial-applications/data/applications";

export function IndustrialApplicationsFallback() {
  return (
    <div className="flex h-full w-full flex-col justify-center bg-bg-base px-6 py-16 md:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-brand-primary">
              Chapter 03
            </p>
            <h2 className="text-4xl font-black uppercase leading-none tracking-tight text-white md:text-6xl">
              Industrial Applications
            </h2>
          </div>

          <div className="max-w-xl rounded-2xl border border-white/10 bg-bg-elevated/80 px-5 py-4 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-secondary">
              Alternative non-WebGL experience
            </p>
            <p className="mt-2 text-sm uppercase tracking-[0.14em] text-text-secondary">
              Keyboard-ready sequence of eight environments and a final handoff to Sprint 008.
            </p>
          </div>
        </div>

        <ol className="grid gap-4 lg:grid-cols-2" aria-label="Industrial applications environments">
          {INDUSTRY_ENVIRONMENTS.map((environment) => (
            <li
              key={environment.id}
              className="rounded-3xl border border-white/10 bg-bg-elevated/80 p-6 shadow-glass backdrop-blur"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-text-muted">
                    {environment.chapter}
                  </p>
                  <h3 className="mt-2 text-2xl font-black uppercase tracking-tight text-white">
                    {environment.label}
                  </h3>
                </div>

                <span
                  className="mt-1 inline-flex rounded-full px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em]"
                  style={{
                    color: environment.palette.primary,
                    border: `1px solid ${environment.palette.primary}55`,
                    background: `${environment.palette.primary}12`,
                  }}
                >
                  {environment.hiddenLayer}
                </span>
              </div>

              <div className="grid gap-3 text-sm uppercase tracking-[0.14em] text-text-secondary md:grid-cols-3">
                <div>
                  <p className="text-text-muted">Challenge</p>
                  <p className="mt-2 font-semibold text-white">{environment.challenge}</p>
                </div>
                <div>
                  <p className="text-text-muted">OVI response</p>
                  <p className="mt-2 font-semibold text-white">{environment.solution}</p>
                </div>
                <div>
                  <p className="text-text-muted">Impact</p>
                  <p className="mt-2 font-semibold text-white">{environment.impact}</p>
                </div>
              </div>

              <ul className="mt-5 flex flex-wrap gap-3" aria-label={`${environment.label} metrics`}>
                {environment.kpis.map((metric) => (
                  <li
                    key={metric.label}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-text-primary"
                  >
                    {metric.label} · {metric.value}
                    {metric.suffix}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <div className="mt-8 rounded-3xl border border-brand-primary/20 bg-[linear-gradient(135deg,rgba(61,210,255,0.12),rgba(90,255,192,0.08))] px-6 py-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-primary">
            {PRODUCTS_TRANSITION.eyebrow}
          </p>
          <p className="mt-2 text-lg font-black uppercase tracking-tight text-white">
            {PRODUCTS_TRANSITION.title}
          </p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary">
            {PRODUCTS_TRANSITION.caption}
          </p>
        </div>
      </div>
    </div>
  );
}
