"use client";

import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export function ProductsPostEffects() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom luminanceThreshold={0.18} luminanceSmoothing={0.9} intensity={2.5} mipmapBlur />
      <DepthOfField focusDistance={0.014} focalLength={0.04} bokehScale={2.8} height={480} />
      <Noise opacity={0.025} blendFunction={BlendFunction.SOFT_LIGHT} />
      <Vignette offset={0.18} darkness={0.76} blendFunction={BlendFunction.NORMAL} />
    </EffectComposer>
  );
}
