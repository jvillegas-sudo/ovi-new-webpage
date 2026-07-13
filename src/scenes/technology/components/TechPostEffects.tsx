/**
 * TechPostEffects
 *
 * Post-processing stack for the Technology Experience.
 *
 * Stack (in order):
 *  1. Bloom        – glowing node halos and particle luminance
 *  2. DepthOfField – mild depth blur; focus follows camera travel
 *  3. Vignette     – cinematic dark edges
 */

"use client";

import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export function TechPostEffects() {
  return (
    <EffectComposer multisampling={0}>
      {/* Bloom – make nodes and particles glow */}
      <Bloom
        luminanceThreshold={0.15}
        luminanceSmoothing={0.9}
        intensity={1.8}
        mipmapBlur
      />

      {/* Depth of Field – soft blur on distant particles */}
      <DepthOfField
        focusDistance={0.02}
        focalLength={0.06}
        bokehScale={2.5}
        height={480}
      />

      {/* Vignette – frame the dark universe */}
      <Vignette
        offset={0.2}
        darkness={0.75}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
}
