/**
 * LaboratoryCanvas
 *
 * Next.js-safe wrapper around LaboratoryCanvasInner.
 * Uses dynamic import with `ssr: false` to prevent WebGL code from running
 * during server-side rendering.
 */

"use client";

import dynamic from "next/dynamic";

import type { LabMousePos } from "@/scenes/laboratory/hooks/useLabMouseParallax";

export type LaboratoryCanvasProps = {
  scrollRef: React.MutableRefObject<number>;
  mouseRef: React.MutableRefObject<LabMousePos>;
  hoverRef: React.MutableRefObject<number>;
};

const Inner = dynamic(
  () =>
    import("@/scenes/laboratory/LaboratoryCanvasInner").then(
      (m) => m.LaboratoryCanvasInner,
    ),
  { ssr: false },
);

export function LaboratoryCanvas(props: LaboratoryCanvasProps) {
  return (
    <div className="absolute inset-0" aria-hidden>
      <Inner {...props} />
    </div>
  );
}
