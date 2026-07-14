/**
 * LabPostEffects
 *
 * Post-processing stack for the Digital Laboratory Experience.
 *
 * Stack (in render order):
 *  1. Bloom        – makes hologram panels, particle simulations and ring
 *                    accents glow
 *  2. DepthOfField – mild blur on very near / very far objects, simulating
 *                    a documentary prime lens
 *  3. Vignette     – cinematic dark border framing
 */

"use client";

import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export function LabPostEffects() {
  return (
    <EffectComposer multisampling={0}>
      {/* Bloom — holographic panels and simulation particles glow */}
      <Bloom
        luminanceThreshold={0.12}
        luminanceSmoothing={0.85}
        intensity={2.2}
        mipmapBlur
      />

      {/* Depth of Field — documentary-lens focus effect */}
      <DepthOfField
        focusDistance={0.015}
        focalLength={0.055}
        bokehScale={2.2}
        height={480}
      />

      {/* Vignette — dark cinematic frame */}
      <Vignette
        offset={0.18}
        darkness={0.80}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
}
