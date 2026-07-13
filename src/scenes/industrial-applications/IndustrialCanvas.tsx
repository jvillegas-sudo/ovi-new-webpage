"use client";

import dynamic from "next/dynamic";

import type { IndustrialMousePos } from "@/scenes/industrial-applications/hooks/useIndustrialMouseParallax";

export type IndustrialCanvasProps = {
  scrollRef: React.MutableRefObject<number>;
  mouseRef: React.MutableRefObject<IndustrialMousePos>;
  hoverRef: React.MutableRefObject<number>;
};

const Inner = dynamic(
  () =>
    import("@/scenes/industrial-applications/IndustrialCanvasInner").then(
      (module) => module.IndustrialCanvasInner,
    ),
  { ssr: false },
);

export function IndustrialApplicationsCanvas(props: IndustrialCanvasProps) {
  return (
    <div className="absolute inset-0" aria-hidden>
      <Inner {...props} />
    </div>
  );
}
