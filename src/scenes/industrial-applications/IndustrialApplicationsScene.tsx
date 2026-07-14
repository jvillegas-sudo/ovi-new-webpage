"use client";

import { useCallback, useRef } from "react";

import { useStoryEngine } from "@/engine/hooks/use-story-engine";
import { useRegisterScene } from "@/engine/hooks/use-register-scene";
import { useEngineStore } from "@/store/engine-store";
import { IndustrialApplicationsCanvas } from "@/scenes/industrial-applications/IndustrialCanvas";
import { IndustrialApplicationsFallback } from "@/scenes/industrial-applications/IndustrialApplicationsFallback";
import { IndustrialApplicationsOverlay } from "@/scenes/industrial-applications/IndustrialApplicationsOverlay";
import { INDUSTRY_ENVIRONMENTS } from "@/scenes/industrial-applications/data/applications";
import { useIndustrialMouseParallax } from "@/scenes/industrial-applications/hooks/useIndustrialMouseParallax";
import { useIndustrialApplicationsTimeline } from "@/scenes/industrial-applications/hooks/useIndustrialApplicationsTimeline";

export function IndustrialApplicationsScene() {
  const engine = useStoryEngine();
  const sectionRef = useRegisterScene("industrial-applications");
  const scrollRef = useIndustrialApplicationsTimeline(
    sectionRef as React.RefObject<HTMLElement | null>,
  );
  const mouseRef = useIndustrialMouseParallax();
  const hoverRef = useRef<number>(-1);
  const reducedMotion = useEngineStore(
    useCallback((state) => state.animation.reducedMotion, []),
  );

  const jumpToEnvironment = useCallback(
    (index: number) => {
      const section = sectionRef.current;
      if (!section) return;

      const clampedIndex = Math.max(0, Math.min(INDUSTRY_ENVIRONMENTS.length - 1, index));
      const travel = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = (clampedIndex + 0.18) / INDUSTRY_ENVIRONMENTS.length;
      const target = section.offsetTop + travel * progress;

      engine.scroll.scrollTo(target, {
        duration: reducedMotion ? 0 : 1.25,
        immediate: reducedMotion,
      });
    },
    [engine.scroll, reducedMotion, sectionRef],
  );

  return (
    <section
      id="industries"
      ref={sectionRef}
      data-scene="industrial-applications"
      aria-label="Industrial Applications Experience"
      className="relative"
      style={{ height: "800vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {reducedMotion ? (
          <IndustrialApplicationsFallback />
        ) : (
          <>
            <IndustrialApplicationsCanvas
              scrollRef={scrollRef}
              mouseRef={mouseRef}
              hoverRef={hoverRef}
            />
            <IndustrialApplicationsOverlay
              scrollRef={scrollRef}
              hoverRef={hoverRef}
              onSelectEnvironment={jumpToEnvironment}
            />
          </>
        )}
      </div>
    </section>
  );
}
