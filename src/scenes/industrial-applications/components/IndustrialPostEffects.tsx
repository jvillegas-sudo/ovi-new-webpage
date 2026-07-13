"use client";

import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  SSAO,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export function IndustrialPostEffects() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        luminanceThreshold={0.16}
        luminanceSmoothing={0.88}
        intensity={2.1}
        mipmapBlur
      />

      <SSAO
        radius={0.18}
        intensity={6}
        luminanceInfluence={0.25}
      />

      <DepthOfField
        focusDistance={0.013}
        focalLength={0.045}
        bokehScale={2.4}
        height={480}
      />

      <Noise opacity={0.03} blendFunction={BlendFunction.SOFT_LIGHT} />

      <Vignette
        offset={0.16}
        darkness={0.82}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
}
