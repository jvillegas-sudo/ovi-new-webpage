/**
 * LaboratoryCanvasInner
 *
 * The full React Three Fiber scene graph for the Digital Laboratory Experience.
 * Always loaded client-side only (via the dynamic wrapper in LaboratoryCanvas).
 *
 * Scene composition:
 *   - Ambient + directional lights (restrained — bloom does the heavy lifting)
 *   - LabCameraRig      – scroll-driven / mouse-parallax documentary camera
 *   - LabEnvironment    – floor, light pillars, glass panels, ceiling
 *   - LabSimulation     – GPU fluid-dynamics particle system (central)
 *   - LabStations       – 8 interactive research stations + holograms
 *   - LabPostEffects    – Bloom + DoF + Vignette
 */

"use client";

import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import { useState } from "react";

import { LabCameraRig } from "@/scenes/laboratory/components/LabCameraRig";
import { LabEnvironment } from "@/scenes/laboratory/components/LabEnvironment";
import { LabPostEffects } from "@/scenes/laboratory/components/LabPostEffects";
import { LabSimulation } from "@/scenes/laboratory/components/LabSimulation";
import { LabStations } from "@/scenes/laboratory/components/LabStations";
import type { LabMousePos } from "@/scenes/laboratory/hooks/useLabMouseParallax";

type Props = {
  scrollRef: React.MutableRefObject<number>;
  mouseRef: React.MutableRefObject<LabMousePos>;
  /** Shared ref for station hover index (-1 = none). */
  hoverRef: React.MutableRefObject<number>;
};

export function LaboratoryCanvasInner({ scrollRef, mouseRef, hoverRef }: Props) {
  const [dpr, setDpr] = useState<[number, number]>([1, 2]);

  return (
    <Canvas
      camera={{ position: [0, 3, 14], fov: 52, near: 0.1, far: 220 }}
      dpr={dpr}
      gl={{
        antialias: false,
        alpha: false,
        powerPreference: "high-performance",
      }}
      style={{ background: "#060b12" }}
    >
      {/* Performance auto-degradation */}
      <PerformanceMonitor
        onDecline={() => setDpr([1, 1])}
        onIncline={() => setDpr([1, 2])}
      />

      {/* Lighting — minimal; bloom and emissive materials do the heavy lifting */}
      <ambientLight intensity={0.03} />
      {/* Cold-blue overhead key light */}
      <directionalLight
        position={[0, 8, 4]}
        intensity={0.2}
        color="#8fcfff"
      />
      {/* Warm fill from below — hints at reflected floor glow */}
      <pointLight position={[0, -1, 0]} intensity={0.08} color="#1a4080" />
      {/* Accent lights flanking the aisle */}
      <pointLight position={[-4, 2, -2]} intensity={0.12} color="#3DD2FF" />
      <pointLight position={[4, 2, -2]} intensity={0.12} color="#5AFFC0" />

      {/* Camera */}
      <LabCameraRig scrollRef={scrollRef} mouseRef={mouseRef} />

      {/* Scene geometry */}
      <LabEnvironment scrollRef={scrollRef} />
      <LabSimulation scrollRef={scrollRef} />
      <LabStations scrollRef={scrollRef} hoverRef={hoverRef} />

      {/* Post-processing */}
      <LabPostEffects />
    </Canvas>
  );
}
