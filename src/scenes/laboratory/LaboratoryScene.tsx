/**
 * LaboratoryScene
 *
 * Sprint 006 — Digital Laboratory Experience
 *
 * A 500 vh immersive scroll section.  The inner container is sticky so the
 * Three.js canvas remains full-screen while the parent section provides
 * scroll depth for the GSAP ScrollTrigger.
 *
 * Scene flow (local scroll progress 0–1):
 *   0.00–0.20  Environment materialises — light becomes architecture
 *   0.20–0.35  Glass surfaces crystallise; fluid simulation activates
 *   0.35–0.55  Research stations emerge (left + right rows)
 *   0.55–0.75  Holographic panels activate at each station
 *   0.75–0.88  Camera tours the full lab; visitor explores interactively
 *   0.88–1.00  Elevated overview; transition to Sprint 007 begins
 *
 * Accessibility:
 *   – prefers-reduced-motion: Three.js canvas hidden; fallback grid shown
 *   – data-scene attribute enables engine keyboard navigation
 *   – WCAG 2.2 AA colour contrast on all visible text
 */

"use client";

import { useCallback, useRef } from "react";

import { useEngineStore } from "@/store/engine-store";
import { useRegisterScene } from "@/engine/hooks/use-register-scene";
import { LaboratoryCanvas } from "@/scenes/laboratory/LaboratoryCanvas";
import { LaboratoryFallback } from "@/scenes/laboratory/LaboratoryFallback";
import { LaboratoryOverlay } from "@/scenes/laboratory/LaboratoryOverlay";
import { useLabMouseParallax } from "@/scenes/laboratory/hooks/useLabMouseParallax";
import { useLaboratoryTimeline } from "@/scenes/laboratory/hooks/useLaboratoryTimeline";

export function LaboratoryScene() {
  // Register with the Story Engine SceneManager
  const sectionRef = useRegisterScene("laboratory");

  // Local scroll progress [0,1] scoped to this section
  const scrollRef = useLaboratoryTimeline(
    sectionRef as React.RefObject<HTMLElement | null>,
  );

  // Mouse / touch parallax
  const mouseRef = useLabMouseParallax();

  // Shared hover state (Three.js → DOM overlay, no React re-renders)
  const hoverRef = useRef<number>(-1);

  // Reduced-motion check (WCAG 2.2 AA)
  const reducedMotion = useEngineStore(
    useCallback((s) => s.animation.reducedMotion, []),
  );

  return (
    <section
      ref={sectionRef}
      data-scene="laboratory"
      aria-label="Digital Laboratory Experience"
      className="relative"
      style={{ height: "500vh" }}
    >
      {/* Sticky viewport — full screen for the duration of the scroll */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {reducedMotion ? (
          /* Accessible fallback without WebGL */
          <LaboratoryFallback />
        ) : (
          <>
            {/* Three.js canvas */}
            <LaboratoryCanvas
              scrollRef={scrollRef}
              mouseRef={mouseRef}
              hoverRef={hoverRef}
            />

            {/* DOM text + label layer */}
            <LaboratoryOverlay scrollRef={scrollRef} hoverRef={hoverRef} />
          </>
        )}
      </div>
    </section>
  );
}
