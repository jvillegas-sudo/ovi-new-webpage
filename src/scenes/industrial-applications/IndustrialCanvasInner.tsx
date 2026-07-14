"use client";

import { useCallback, useState } from "react";

import { PerformanceMonitor } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { useEngineStore } from "@/store/engine-store";
import { IndustrialCameraRig } from "@/scenes/industrial-applications/components/IndustrialCameraRig";
import { IndustrialEnvironment } from "@/scenes/industrial-applications/components/IndustrialEnvironment";
import { IndustrialHotspots } from "@/scenes/industrial-applications/components/IndustrialHotspots";
import { IndustrialParticleField } from "@/scenes/industrial-applications/components/IndustrialParticleField";
import { IndustrialPostEffects } from "@/scenes/industrial-applications/components/IndustrialPostEffects";
import type { IndustrialMousePos } from "@/scenes/industrial-applications/hooks/useIndustrialMouseParallax";

type Props = {
  scrollRef: React.MutableRefObject<number>;
  mouseRef: React.MutableRefObject<IndustrialMousePos>;
  hoverRef: React.MutableRefObject<number>;
};

export function IndustrialCanvasInner({ scrollRef, mouseRef, hoverRef }: Props) {
  const [dpr, setDpr] = useState<[number, number]>([1, 2]);
  const deviceTier = useEngineStore(
    useCallback((state) => state.performance.deviceTier, []),
  );

  const particleCount =
    deviceTier === "high" ? 2200 : deviceTier === "medium" ? 1600 : 900;

  return (
    <Canvas
      camera={{ position: [0, 3.4, 31], fov: 48, near: 0.1, far: 140 }}
      dpr={dpr}
      gl={{
        antialias: false,
        alpha: false,
        powerPreference: "high-performance",
      }}
      style={{ background: "#05080f" }}
    >
      <PerformanceMonitor
        onDecline={() => setDpr([1, 1])}
        onIncline={() => setDpr([1, 2])}
      />

      <ambientLight intensity={0.08} />
      <directionalLight position={[0, 6, 8]} intensity={0.28} color="#9edcff" />
      <pointLight position={[0, 2, 12]} intensity={0.35} color="#3DD2FF" />
      <pointLight position={[0, 1, -16]} intensity={0.3} color="#5AFFC0" />
      <spotLight
        position={[0, 8, 10]}
        angle={0.4}
        intensity={0.45}
        color="#ffffff"
        penumbra={0.8}
      />

      <IndustrialCameraRig scrollRef={scrollRef} mouseRef={mouseRef} />
      <IndustrialParticleField count={particleCount} scrollRef={scrollRef} />
      <IndustrialEnvironment scrollRef={scrollRef} mouseRef={mouseRef} />
      <IndustrialHotspots scrollRef={scrollRef} hoverRef={hoverRef} />
      <IndustrialPostEffects />
    </Canvas>
  );
}
