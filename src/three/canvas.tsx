"use client";

import dynamic from "next/dynamic";

const Scene = dynamic(() => import("@/three/scene").then((mod) => mod.ThreeScene), {
  ssr: false,
});

export const ThreeCanvas = () => {
  return (
    <div aria-hidden className="relative h-[28rem] w-full overflow-hidden rounded-3xl border border-white/10 bg-bg-elevated">
      <Scene />
    </div>
  );
};
