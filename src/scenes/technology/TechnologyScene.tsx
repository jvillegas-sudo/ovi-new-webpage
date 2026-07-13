/**
 * TechnologyScene
 *
 * Sprint 005 — Technology Experience
 *
 * A 500 vh immersive scroll section. The inner container is sticky so
 * the Three.js canvas remains full-screen while the parent section
 * provides scroll depth for the GSAP ScrollTrigger.
 *
 * Scene flow (driven by local scroll progress 0–1):
 *   0.00–0.15  Portal entry — camera emerges from the OVI logo
 *   0.15–0.30  Dark environment with drifting particles
 *   0.30–0.55  Particles organise into molecular structures
 *   0.35–0.55  Molecular structures form the capability network
 *   0.55–0.88  Camera travels through network; nodes activate one by one
 *   0.88–1.00  Network begins to liquefy → transition to Sprint 006
 *
 * Accessibility:
 *   – prefers-reduced-motion: 3D canvas hidden; fallback capability grid shown
 *   – data-scene attribute enables engine keyboard navigation
 *   – WCAG 2.2 AA colour contrast on all visible text
 */

"use client";

import { useCallback } from "react";

import { useEngineStore } from "@/store/engine-store";
import { useRegisterScene } from "@/engine/hooks/use-register-scene";
import { TechnologyCanvas } from "@/scenes/technology/TechnologyCanvas";
import { TechnologyOverlay } from "@/scenes/technology/TechnologyOverlay";
import { TechnologyFallback } from "@/scenes/technology/TechnologyFallback";
import { useMouseParallax } from "@/scenes/technology/hooks/useMouseParallax";
import { useTechnologyTimeline } from "@/scenes/technology/hooks/useTechnologyTimeline";

export function TechnologyScene() {
  // Register this DOM element with the Story Engine's SceneManager
  const sectionRef = useRegisterScene("technology");

  // Local scroll progress [0,1] scoped to this section
  const scrollRef = useTechnologyTimeline(
    sectionRef as React.RefObject<HTMLElement | null>,
  );

  // Mouse/touch parallax
  const mouseRef = useMouseParallax();

  // Reduced-motion check (WCAG 2.2 AA)
  const reducedMotion = useEngineStore(
    useCallback((s) => s.animation.reducedMotion, []),
  );

  return (
    <section
      ref={sectionRef}
      data-scene="technology"
      aria-label="Technology Experience"
      className="relative"
      style={{ height: "500vh" }}
    >
      {/* Sticky viewport container — full screen for the duration of the scroll */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {reducedMotion ? (
          /* Accessible fallback without WebGL */
          <TechnologyFallback />
        ) : (
          <>
            {/* Three.js canvas */}
            <TechnologyCanvas scrollRef={scrollRef} mouseRef={mouseRef} />

            {/* DOM text layer */}
            <TechnologyOverlay scrollRef={scrollRef} />
          </>
        )}
      </div>
    </section>
  );
}
