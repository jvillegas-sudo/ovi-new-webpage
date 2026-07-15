"use client";

/**
 * Three.js: Post-Processing Effects Pipeline
 *
 * Production-ready post-processing using @react-three/postprocessing.
 * Effects are conditionally applied based on device performance level.
 *
 * Effect stack (in order of application):
 *   1. SMAA — anti-aliasing
 *   2. Bloom — glow on bright elements (brand colors, skipped on low-perf)
 *   3. Vignette — edge darkening for film-like feel
 */

import {
  EffectComposer,
  Bloom,
  Vignette,
  SMAA,
} from "@react-three/postprocessing";
import { KernelSize, BlendFunction } from "postprocessing";
import { useUIStore } from "@store/ui.store";

interface PostProcessingProps {
  /** Enable bloom glow effect */
  bloom?: boolean;
  /** Enable vignette darkening */
  vignette?: boolean;
}

/** High-performance pipeline: SMAA + Bloom + Vignette */
function FullPipeline() {
  return (
    <EffectComposer multisampling={4} enableNormalPass={false}>
      <SMAA />
      <Bloom
        intensity={1.1}
        luminanceThreshold={0.72}
        luminanceSmoothing={0.35}
        kernelSize={KernelSize.LARGE}
        blendFunction={BlendFunction.ADD}
      />
      <Vignette offset={0.38} darkness={0.58} blendFunction={BlendFunction.NORMAL} />
    </EffectComposer>
  );
}

/** Minimal pipeline: SMAA + Vignette (no bloom) */
function MinimalPipeline() {
  return (
    <EffectComposer multisampling={0} enableNormalPass={false}>
      <SMAA />
      <Vignette offset={0.38} darkness={0.36} blendFunction={BlendFunction.NORMAL} />
    </EffectComposer>
  );
}

/** Vignette-only pipeline: for low-perf without bloom */
function VignettePipeline() {
  return (
    <EffectComposer multisampling={0} enableNormalPass={false}>
      <SMAA />
      <Vignette offset={0.38} darkness={0.55} blendFunction={BlendFunction.NORMAL} />
    </EffectComposer>
  );
}

export function PostProcessing({ bloom = true, vignette = true }: PostProcessingProps) {
  const performanceLevel = useUIStore((s) => s.threePerformanceLevel);
  const isLowPerf = performanceLevel === "low";

  if (bloom && !isLowPerf && vignette) return <FullPipeline />;
  if (vignette) return isLowPerf ? <MinimalPipeline /> : <VignettePipeline />;

  // Minimal fallback — just SMAA
  return (
    <EffectComposer multisampling={isLowPerf ? 0 : 4} enableNormalPass={false}>
      <SMAA />
    </EffectComposer>
  );
}
