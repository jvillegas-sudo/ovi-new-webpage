"use client";

import { Bloom, DepthOfField, EffectComposer, SSAO } from "@react-three/postprocessing";

export const ThreeEffects = () => {
  return (
    <EffectComposer>
      <Bloom luminanceThreshold={0.4} intensity={0.8} />
      <SSAO radius={0.12} intensity={18} luminanceInfluence={0.6} />
      <DepthOfField focusDistance={0.01} focalLength={0.025} bokehScale={1.4} height={480} />
    </EffectComposer>
  );
};
