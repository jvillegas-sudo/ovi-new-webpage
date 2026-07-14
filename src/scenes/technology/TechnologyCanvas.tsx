/**
 * TechnologyCanvas
 *
 * Next.js-safe wrapper around TechnologyCanvasInner.
 * Uses dynamic import with ssr: false to prevent WebGL code from running
 * during server-side rendering.
 */

"use client";

import dynamic from "next/dynamic";

import type { MousePos } from "@/scenes/technology/hooks/useMouseParallax";

export type TechnologyCanvasProps = {
  scrollRef: React.MutableRefObject<number>;
  mouseRef: React.MutableRefObject<MousePos>;
};

const Inner = dynamic(
  () =>
    import("@/scenes/technology/TechnologyCanvasInner").then(
      (m) => m.TechnologyCanvasInner,
    ),
  { ssr: false },
);

export function TechnologyCanvas(props: TechnologyCanvasProps) {
  return (
    <div className="absolute inset-0" aria-hidden>
      <Inner {...props} />
    </div>
  );
}
