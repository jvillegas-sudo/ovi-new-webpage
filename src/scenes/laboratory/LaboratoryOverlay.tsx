/**
 * LaboratoryOverlay
 *
 * DOM layer positioned on top of the Three.js canvas.
 * Renders:
 *   – Cinematic headlines (scroll-driven, one at a time)
 *   – Station labels (appear as each station activates)
 *   – Floating station info panel (appears on hover, no modal)
 *   – Decorative HUD elements (corner brackets, chapter label)
 *
 * All motion is imperatively driven via rAF to avoid React re-renders.
 * Reduced-motion: content stays static and fully readable (WCAG 2.2 AA).
 */

"use client";

import { useCallback, useEffect, useRef } from "react";

import { LAB_HEADLINES, STATIONS } from "@/scenes/laboratory/data/stations";
import { useEngineStore } from "@/store/engine-store";

type Props = {
  scrollRef: React.MutableRefObject<number>;
  /** Shared ref written by LabStations — index of hovered station, -1 = none. */
  hoverRef: React.MutableRefObject<number>;
};

// ---- Headline layer --------------------------------------------------------

function HeadlineLayer({
  scrollRef,
  reducedMotion,
}: {
  scrollRef: Props["scrollRef"];
  reducedMotion: boolean;
}) {
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (reducedMotion) return;

    const headlines = Array.from(
      document.querySelectorAll<HTMLElement>(".lab-headline"),
    );

    const tick = () => {
      const p = scrollRef.current;
      const fadeLen = 0.055;

      headlines.forEach((el) => {
        const start = parseFloat(el.dataset.scrollStart ?? "0");
        const end = parseFloat(el.dataset.scrollEnd ?? "1");

        let opacity = 0;
        if (p >= start && p <= end) {
          const fadeIn = Math.min((p - start) / fadeLen, 1);
          const fadeOut = Math.min((end - p) / fadeLen, 1);
          opacity = Math.min(fadeIn, fadeOut);
        }

        el.style.opacity = String(opacity);
        el.style.transform = `translateY(${(1 - opacity) * 14}px)`;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [scrollRef, reducedMotion]);

  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center px-8"
      aria-live="polite"
    >
      {LAB_HEADLINES.map((h) => (
        <p
          key={h.text}
          className="lab-headline absolute max-w-3xl text-center font-black uppercase tracking-tight text-[clamp(2rem,6vw,5rem)] leading-[1.05] text-white"
          style={{ opacity: reducedMotion ? 1 : 0 }}
          data-scroll-start={h.scrollStart}
          data-scroll-end={h.scrollEnd}
        >
          {h.text}
        </p>
      ))}
    </div>
  );
}

// ---- Station labels --------------------------------------------------------

function StationLabels({
  scrollRef,
  reducedMotion,
}: {
  scrollRef: Props["scrollRef"];
  reducedMotion: boolean;
}) {
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (reducedMotion) return;

    const tags = Array.from(
      document.querySelectorAll<HTMLElement>(".lab-station-tag"),
    );

    const tick = () => {
      const p = scrollRef.current;

      tags.forEach((el, i) => {
        const station = STATIONS[i];
        if (!station) return;

        const fadeStart = station.activationAt - 0.04;
        const fadeLen = 0.05;
        const opacity =
          p >= fadeStart ? Math.min((p - fadeStart) / fadeLen, 1) * 0.8 : 0;

        el.style.opacity = String(opacity);
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [scrollRef, reducedMotion]);

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-label="Research stations"
    >
      {STATIONS.map((station, i) => {
        // Position tags in two arcs around the viewport centre
        const isLeft = i % 2 === 0;
        const row = Math.floor(i / 2);
        const totalRows = Math.ceil(STATIONS.length / 2);
        const topPct = 22 + (row / (totalRows - 1)) * 56;
        const leftPct = isLeft ? 8 : 70;

        return (
          <span
            key={station.id}
            className="lab-station-tag absolute rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-widest"
            style={{
              borderColor: station.color,
              color: station.color,
              opacity: 0,
              top: `${topPct}%`,
              left: `${leftPct}%`,
            }}
            data-label={station.label}
          >
            {station.label}
          </span>
        );
      })}
    </div>
  );
}

// ---- Station info panel (floating interface, not a modal) ------------------

function StationInfoPanel({
  hoverRef,
}: {
  hoverRef: Props["hoverRef"];
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const visibleOpacity = useRef(0);

  useEffect(() => {
    const tick = () => {
      const idx = hoverRef.current;
      const station = idx >= 0 ? STATIONS[idx] : null;

      const targetOpacity = station ? 1 : 0;
      visibleOpacity.current +=
        (targetOpacity - visibleOpacity.current) * 0.12;

      const el = panelRef.current;
      if (!el) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      el.style.opacity = String(visibleOpacity.current);

      if (station && visibleOpacity.current > 0.05) {
        const labelEl = el.querySelector<HTMLElement>(".lab-panel-label");
        const subtitleEl = el.querySelector<HTMLElement>(".lab-panel-subtitle");
        const descEl = el.querySelector<HTMLElement>(".lab-panel-desc");
        const accentEl = el.querySelector<HTMLElement>(".lab-panel-accent");

        if (labelEl) labelEl.textContent = station.label;
        if (subtitleEl) subtitleEl.textContent = station.subtitle;
        if (descEl) descEl.textContent = station.description;
        if (accentEl) {
          accentEl.style.background = station.color;
          accentEl.style.boxShadow = `0 0 12px 2px ${station.color}66`;
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [hoverRef]);

  return (
    <div
      ref={panelRef}
      className="pointer-events-none absolute bottom-16 right-8 w-72 rounded-2xl border border-white/10 bg-bg-glass p-6 backdrop-blur-md"
      style={{ opacity: 0 }}
      aria-hidden
    >
      {/* Colour accent dot */}
      <span
        className="lab-panel-accent mb-3 block h-2.5 w-10 rounded-full transition-colors"
        style={{ background: "#3DD2FF" }}
      />
      <p className="lab-panel-label mb-1 text-sm font-bold uppercase tracking-wide text-white">
        &nbsp;
      </p>
      <p className="lab-panel-subtitle mb-3 text-[0.65rem] font-semibold uppercase tracking-widest text-brand-primary">
        &nbsp;
      </p>
      <p className="lab-panel-desc text-xs leading-relaxed text-text-secondary">
        &nbsp;
      </p>
    </div>
  );
}

// ---- HUD decorative elements -----------------------------------------------

function HudDecor() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {/* Top-left corner bracket */}
      <div className="absolute left-6 top-6 h-10 w-10 border-l-2 border-t-2 border-white/20" />
      {/* Bottom-right corner bracket */}
      <div className="absolute bottom-6 right-6 h-10 w-10 border-b-2 border-r-2 border-white/20" />
      {/* Top rule */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      {/* Chapter label */}
      <p className="absolute right-8 top-7 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/30">
        Chapter 02 — Laboratory
      </p>
    </div>
  );
}

// ---- Main export -----------------------------------------------------------

export function LaboratoryOverlay({ scrollRef, hoverRef }: Props) {
  const reducedMotion = useEngineStore(
    useCallback((s) => s.animation.reducedMotion, []),
  );

  return (
    <>
      <HeadlineLayer scrollRef={scrollRef} reducedMotion={reducedMotion} />
      <StationLabels scrollRef={scrollRef} reducedMotion={reducedMotion} />
      <StationInfoPanel hoverRef={hoverRef} />
      <HudDecor />
    </>
  );
}
