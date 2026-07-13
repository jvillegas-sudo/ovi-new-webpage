"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import {
  INDUSTRY_ENVIRONMENTS,
  PRODUCTS_TRANSITION,
  getEnvironmentIndex,
  getEnvironmentProgress,
  getHeadline,
} from "@/scenes/industrial-applications/data/applications";
import { useEngineStore } from "@/store/engine-store";

type Snapshot = {
  activeIndex: number;
  segmentProgress: number;
  hoveredIndex: number;
  headline: string;
  transitionProgress: number;
};

type Props = {
  scrollRef: React.MutableRefObject<number>;
  hoverRef: React.MutableRefObject<number>;
  onSelectEnvironment: (index: number) => void;
};

function KPIBar({
  label,
  value,
  suffix,
  progress,
  color,
}: {
  label: string;
  value: number;
  suffix: string;
  progress: number;
  color: string;
}) {
  const width = Math.min(100, (value / 50) * 100) * progress;

  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-3 backdrop-blur-sm">
      <div className="mb-2 flex items-center justify-between gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-text-secondary">
        <span>{label}</span>
        <span className="text-white">
          {value}
          {suffix}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/8">
        <div
          className="h-full rounded-full transition-[width] duration-300"
          style={{ width: `${width}%`, background: color }}
        />
      </div>
    </div>
  );
}

export function IndustrialApplicationsOverlay({
  scrollRef,
  hoverRef,
  onSelectEnvironment,
}: Props) {
  const reducedMotion = useEngineStore(
    useCallback((state) => state.animation.reducedMotion, []),
  );

  const [snapshot, setSnapshot] = useState<Snapshot>({
    activeIndex: 0,
    segmentProgress: 0,
    hoveredIndex: -1,
    headline: getHeadline(0),
    transitionProgress: 0,
  });

  useEffect(() => {
    if (reducedMotion) return;

    let frame = 0;

    const tick = () => {
      const progress = scrollRef.current;
      const activeIndex = getEnvironmentIndex(progress);
      const segmentProgress = Number(
        getEnvironmentProgress(progress, activeIndex).toFixed(2),
      );
      const hoveredIndex = hoverRef.current;
      const headline = getHeadline(progress);
      const transitionProgress = Number(
        Math.min(1, Math.max(0, (progress - 0.88) / 0.12)).toFixed(2),
      );

      setSnapshot((previous) => {
        if (
          previous.activeIndex === activeIndex &&
          previous.segmentProgress === segmentProgress &&
          previous.hoveredIndex === hoveredIndex &&
          previous.headline === headline &&
          previous.transitionProgress === transitionProgress
        ) {
          return previous;
        }

        return {
          activeIndex,
          segmentProgress,
          hoveredIndex,
          headline,
          transitionProgress,
        };
      });

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [hoverRef, reducedMotion, scrollRef]);

  const activeEnvironment = INDUSTRY_ENVIRONMENTS[snapshot.activeIndex] ?? INDUSTRY_ENVIRONMENTS[0];
  const inspectedEnvironment =
    INDUSTRY_ENVIRONMENTS[
      snapshot.hoveredIndex >= 0 ? snapshot.hoveredIndex : snapshot.activeIndex
    ] ?? activeEnvironment;

  const revealProgress = useMemo(
    () => Math.min(1, Math.max(0, (snapshot.segmentProgress - 0.16) / 0.68)),
    [snapshot.segmentProgress],
  );

  return (
    <div className="absolute inset-0">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="pointer-events-none absolute left-6 top-6 h-10 w-10 border-l-2 border-t-2 border-white/20" />
      <div className="pointer-events-none absolute bottom-6 right-6 h-10 w-10 border-b-2 border-r-2 border-white/20" />

      <div className="pointer-events-none absolute left-6 top-6 right-6 flex items-start justify-between gap-6">
        <div aria-live="polite">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-brand-primary">
            Chapter 03 — Industrial Applications
          </p>
          <p className="mt-3 text-sm font-semibold uppercase tracking-[0.22em] text-white/70">
            {activeEnvironment.chapter}
          </p>
          <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-white md:text-5xl">
            {activeEnvironment.label}
          </h2>
        </div>

        <div className="max-w-sm text-right">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white/35">
            Documentary camera
          </p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary">
            {activeEnvironment.architecture} · {activeEnvironment.atmosphere}
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-8">
        <p className="max-w-4xl text-center text-[clamp(2rem,5vw,4.75rem)] font-black uppercase leading-[1.02] tracking-tight text-white drop-shadow-[0_0_24px_rgba(0,0,0,0.45)]">
          {snapshot.headline}
        </p>
      </div>

      <nav
        aria-label="Industrial environment navigation"
        className="absolute left-6 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-2"
      >
        {INDUSTRY_ENVIRONMENTS.map((environment, index) => {
          const active = index === snapshot.activeIndex;
          return (
            <button
              key={environment.id}
              type="button"
              onClick={() => onSelectEnvironment(index)}
              className="rounded-full border px-3 py-2 text-left text-[0.65rem] font-semibold uppercase tracking-[0.18em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
              style={{
                borderColor: active ? environment.palette.primary : "rgba(255,255,255,0.12)",
                background: active ? `${environment.palette.primary}16` : "rgba(8,12,18,0.42)",
                color: active ? "#ffffff" : "rgba(244,248,255,0.62)",
              }}
              aria-current={active ? "step" : undefined}
            >
              {environment.chapter.replace("Environment ", "E")}
            </button>
          );
        })}
      </nav>

      <div className="pointer-events-none absolute bottom-8 left-24 right-28 grid gap-4 xl:grid-cols-[1.2fr_0.9fr]">
        <section className="rounded-[1.75rem] border border-white/10 bg-bg-glass/80 p-5 shadow-glass backdrop-blur-xl">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-text-muted">
                Challenge
              </p>
              <p className="mt-3 text-lg font-black uppercase tracking-tight text-white">
                {activeEnvironment.challenge}
              </p>
            </div>
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-text-muted">
                OVI response
              </p>
              <p className="mt-3 text-lg font-black uppercase tracking-tight text-white">
                {activeEnvironment.solution}
              </p>
            </div>
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-text-muted">
                Measured impact
              </p>
              <p className="mt-3 text-lg font-black uppercase tracking-tight text-white">
                {activeEnvironment.impact}
              </p>
            </div>
          </div>

          <div className="mt-5 h-px bg-white/8" />

          <div className="mt-5 flex flex-wrap items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-text-secondary">
            <span>{activeEnvironment.hiddenLayer}</span>
            <span className="text-white/20">/</span>
            <span>{activeEnvironment.machinery}</span>
            <span className="text-white/20">/</span>
            <span>{activeEnvironment.transitionCue}</span>
          </div>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/8">
            <div
              className="h-full rounded-full transition-[width] duration-300"
              style={{
                width: `${revealProgress * 100}%`,
                background: `linear-gradient(90deg, ${activeEnvironment.palette.danger} 0%, ${activeEnvironment.palette.primary} 55%, ${activeEnvironment.palette.secondary} 100%)`,
              }}
            />
          </div>
        </section>

        <section className="rounded-[1.75rem] border border-white/10 bg-bg-glass/80 p-5 shadow-glass backdrop-blur-xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-text-muted">
                Operational metrics
              </p>
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-text-secondary">
                {inspectedEnvironment.interactionLabel}
              </p>
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/70">
              {snapshot.hoveredIndex >= 0 ? "Inspecting" : "Scroll-led"}
            </div>
          </div>

          <div className="mt-4 grid gap-3">
            {activeEnvironment.kpis.map((metric, index) => (
              <KPIBar
                key={metric.label}
                label={metric.label}
                value={metric.value}
                suffix={metric.suffix}
                progress={revealProgress}
                color={
                  index === 0
                    ? activeEnvironment.palette.primary
                    : index === 1
                      ? activeEnvironment.palette.secondary
                      : activeEnvironment.palette.accent
                }
              />
            ))}
          </div>
        </section>
      </div>

      <div
        className="pointer-events-none absolute right-6 top-24 max-w-xs rounded-3xl border border-white/10 bg-black/25 p-4 backdrop-blur-md"
        style={{
          opacity: 0.4 + (snapshot.hoveredIndex >= 0 ? 0.6 : 0),
          borderColor: `${inspectedEnvironment.palette.primary}35`,
        }}
      >
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-brand-secondary">
          Hidden layer
        </p>
        <p className="mt-3 text-sm font-black uppercase tracking-tight text-white">
          {inspectedEnvironment.hiddenLayer}
        </p>
        <p className="mt-3 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-text-secondary">
          {inspectedEnvironment.machinery}
        </p>
      </div>

      <div
        className="pointer-events-none absolute right-6 top-1/2 hidden max-w-xs -translate-y-1/2 rounded-3xl border border-brand-primary/20 bg-[linear-gradient(135deg,rgba(61,210,255,0.12),rgba(90,255,192,0.08))] p-4 xl:block"
        style={{ opacity: snapshot.transitionProgress }}
        aria-hidden={snapshot.transitionProgress < 0.1}
      >
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-brand-primary">
          {PRODUCTS_TRANSITION.eyebrow}
        </p>
        <p className="mt-3 text-lg font-black uppercase tracking-tight text-white">
          {PRODUCTS_TRANSITION.title}
        </p>
        <p className="mt-3 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-text-secondary">
          {PRODUCTS_TRANSITION.caption}
        </p>
      </div>
    </div>
  );
}
