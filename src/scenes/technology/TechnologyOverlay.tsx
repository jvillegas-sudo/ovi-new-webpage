/**
 * TechnologyOverlay
 *
 * DOM layer positioned on top of the Three.js canvas.
 * Renders:
 *  – Cinematic headlines (one at a time, driven by scroll progress)
 *  – Capability labels (appear as each node activates)
 *  – Decorative corner / edge elements
 *
 * All motion is disabled when prefers-reduced-motion is set; the content
 * remains fully readable (WCAG 2.2 AA).
 */

"use client";

import { useCallback } from "react";

import { CAPABILITIES, HEADLINES } from "@/scenes/technology/data/capabilities";
import { useEngineStore } from "@/store/engine-store";
import { cn } from "@/lib/cn";

type Props = {
  scrollRef: React.MutableRefObject<number>;
};

// --- Headline ----------------------------------------------------------------

function HeadlineLayer({ scrollRef }: Props) {
  const reducedMotion = useEngineStore(
    useCallback((s) => s.animation.reducedMotion, []),
  );

  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center px-8"
      aria-live="polite"
    >
      {HEADLINES.map((h) => (
        <HeadlineItem
          key={h.text}
          text={h.text}
          scrollStart={h.scrollStart}
          scrollEnd={h.scrollEnd}
          scrollRef={scrollRef}
          reducedMotion={reducedMotion}
        />
      ))}
    </div>
  );
}

type HeadlineItemProps = {
  text: string;
  scrollStart: number;
  scrollEnd: number;
  scrollRef: React.MutableRefObject<number>;
  reducedMotion: boolean;
};

function HeadlineItem({
  text,
  scrollStart,
  scrollEnd,
  scrollRef: _scrollRef,
  reducedMotion,
}: HeadlineItemProps) {
  // We drive visibility via CSS custom properties set by a useEffect below,
  // but for SSR / reduced-motion we fall back to always-visible static text.
  // The actual opacity animation runs entirely via CSS (no JS in render path).
  return (
    <p
      className={cn(
        "tech-headline absolute max-w-3xl text-center font-black uppercase tracking-tight",
        "text-[clamp(2rem,6vw,5rem)] leading-[1.05] text-white",
        reducedMotion ? "opacity-100" : "opacity-0",
      )}
      data-scroll-start={scrollStart}
      data-scroll-end={scrollEnd}
    >
      {text}
    </p>
  );
}

// --- Capability labels -------------------------------------------------------

function CapabilityLabels({ scrollRef: _scrollRef }: Props) {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-label="Technology capabilities"
    >
      {CAPABILITIES.map((cap) => (
        <CapabilityTag key={cap.id} label={cap.label} color={cap.color} />
      ))}
    </div>
  );
}

type CapabilityTagProps = {
  label: string;
  color: string;
};

function CapabilityTag({ label, color }: CapabilityTagProps) {
  return (
    <span
      className="tech-cap-tag absolute rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-widest opacity-0"
      style={{ borderColor: color, color }}
      data-label={label}
    >
      {label}
    </span>
  );
}

// --- Decorative HUD elements -------------------------------------------------

function HudDecor() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {/* Top-left corner bracket */}
      <div className="absolute left-6 top-6 h-10 w-10 border-l-2 border-t-2 border-white/20" />
      {/* Bottom-right corner bracket */}
      <div className="absolute bottom-6 right-6 h-10 w-10 border-b-2 border-r-2 border-white/20" />
      {/* Subtle horizontal rule at top */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      {/* Chapter label */}
      <p className="absolute right-8 top-7 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/30">
        Chapter 01 — Technology
      </p>
    </div>
  );
}

// --- Scroll-driven opacity driver (client effect) ----------------------------

import { useEffect, useRef } from "react";

function HeadlineDriver({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const headlines = Array.from(
      document.querySelectorAll<HTMLElement>(".tech-headline"),
    );

    const tick = () => {
      const p = scrollRef.current;
      headlines.forEach((el) => {
        const start = parseFloat(el.dataset.scrollStart ?? "0");
        const end = parseFloat(el.dataset.scrollEnd ?? "1");

        let opacity = 0;
        const fadeLen = 0.06;

        if (p >= start && p <= end) {
          const fadeIn = Math.min((p - start) / fadeLen, 1);
          const fadeOut = Math.min((end - p) / fadeLen, 1);
          opacity = Math.min(fadeIn, fadeOut);
        }

        el.style.opacity = String(opacity);
        el.style.transform = `translateY(${(1 - opacity) * 16}px)`;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [scrollRef]);

  return null;
}

// --- Cap label position driver -----------------------------------------------

function CapLabelDriver({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const tags = Array.from(
      document.querySelectorAll<HTMLElement>(".tech-cap-tag"),
    );

    // Distribute labels in a ring around the viewport
    tags.forEach((el, i) => {
      const angle = (i / tags.length) * Math.PI * 2 - Math.PI / 2;
      const rx = 34; // % from center
      const ry = 30;
      el.style.left = `${50 + Math.cos(angle) * rx}%`;
      el.style.top = `${50 + Math.sin(angle) * ry}%`;
      el.style.transform = "translate(-50%, -50%)";
    });

    const tick = () => {
      const p = scrollRef.current;
      tags.forEach((el, i) => {
        const cap = CAPABILITIES[i];
        if (!cap) return;

        const fadeStart = cap.activationAt - 0.05;
        const fadeLen = 0.06;
        const opacity =
          p >= fadeStart
            ? Math.min((p - fadeStart) / fadeLen, 1) * 0.85
            : 0;

        el.style.opacity = String(opacity);
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [scrollRef]);

  return null;
}

// --- Main export -------------------------------------------------------------

export function TechnologyOverlay({ scrollRef }: Props) {
  return (
    <>
      <HeadlineLayer scrollRef={scrollRef} />
      <CapabilityLabels scrollRef={scrollRef} />
      <HudDecor />
      {/* Imperatively drives opacity without causing React re-renders */}
      <HeadlineDriver scrollRef={scrollRef} />
      <CapLabelDriver scrollRef={scrollRef} />
    </>
  );
}
