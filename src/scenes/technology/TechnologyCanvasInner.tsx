/**
 * TechnologyCanvasInner
 *
 * The actual R3F scene graph for the Technology Experience.
 * This file is always loaded client-side only (via the dynamic wrapper).
 *
 * Scene composition:
 *  - Ambient + point lights (minimal – the bloom effect does the heavy lifting)
 *  - CameraRig     – scroll-driven / mouse-parallax camera
 *  - ParticleField – background GPU particle cloud
 *  - MolecularNetwork – capability nodes + connections
 *  - TechPostEffects – Bloom + DoF + Vignette
 */

"use client";

import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import { useState } from "react";

import { CameraRig } from "@/scenes/technology/components/CameraRig";
import { MolecularNetwork } from "@/scenes/technology/components/MolecularNetwork";
import { ParticleField } from "@/scenes/technology/components/ParticleField";
import { TechPostEffects } from "@/scenes/technology/components/TechPostEffects";
import type { MousePos } from "@/scenes/technology/hooks/useMouseParallax";

type Props = {
  scrollRef: React.MutableRefObject<number>;
  mouseRef: React.MutableRefObject<MousePos>;
};

export function TechnologyCanvasInner({ scrollRef, mouseRef }: Props) {
  const [dpr, setDpr] = useState<[number, number]>([1, 2]);

  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 55, near: 0.1, far: 200 }}
      dpr={dpr}
      gl={{
        antialias: false,
        alpha: false,
        powerPreference: "high-performance",
      }}
      style={{ background: "#070B13" }}
    >
      {/* Performance auto-degradation */}
      <PerformanceMonitor
        onDecline={() => setDpr([1, 1])}
        onIncline={() => setDpr([1, 2])}
      />

      {/* Minimal scene lighting – bloom provides the glow */}
      <ambientLight intensity={0.04} />
      <pointLight position={[0, 0, 5]} intensity={0.3} color="#3DD2FF" />
      <pointLight position={[3, 2, 2]} intensity={0.15} color="#7A8BFF" />

      {/* Camera */}
      <CameraRig scrollRef={scrollRef} mouseRef={mouseRef} />

      {/* Scene geometry */}
      <ParticleField scrollRef={scrollRef} />
      <MolecularNetwork scrollRef={scrollRef} />

      {/* Post-processing */}
      <TechPostEffects />
    </Canvas>
  );
}
