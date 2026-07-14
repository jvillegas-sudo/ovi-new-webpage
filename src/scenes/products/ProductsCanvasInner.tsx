"use client";

import { useCallback, useState } from "react";

import { Environment, PerformanceMonitor } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { ProductsCameraRig } from "@/scenes/products/components/ProductsCameraRig";
import { ProductsEcosystem } from "@/scenes/products/components/ProductsEcosystem";
import { ProductsPostEffects } from "@/scenes/products/components/ProductsPostEffects";
import type { ProductsCanvasProps } from "@/scenes/products/ProductsCanvas";
import { useEngineStore } from "@/store/engine-store";

export function ProductsCanvasInner({
  scrollRef,
  mouseRef,
  hoverRef,
  rotationRef,
  selectedHotspotId,
  viewState,
  onSelectHotspot,
}: Omit<ProductsCanvasProps, "onPointerDown" | "onPointerMove" | "onPointerUp" | "onPointerLeave">) {
  const [dpr, setDpr] = useState<[number, number]>([1, 2]);
  const deviceTier = useEngineStore(
    useCallback((state) => state.performance.deviceTier, []),
  );

  const particleCount = deviceTier === "high" ? 2400 : deviceTier === "medium" ? 1600 : 900;

  return (
    <Canvas
      camera={{ position: [0, 1.8, 18], fov: 42, near: 0.1, far: 160 }}
      dpr={dpr}
      gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
      style={{ background: "#03060d" }}
    >
      <PerformanceMonitor onDecline={() => setDpr([1, 1])} onIncline={() => setDpr([1, 2])} />

      <color attach="background" args={["#03060d"]} />
      <fog attach="fog" args={["#03060d", 22, 62]} />
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 8, 6]} intensity={1.1} color="#8ddcff" />
      <pointLight position={[-8, 2, 10]} intensity={1.4} color="#3dd2ff" />
      <pointLight position={[8, -1, -8]} intensity={1.2} color="#5affc0" />
      <spotLight position={[0, 10, 12]} angle={0.42} penumbra={0.8} intensity={1.1} color="#ffffff" />

      <Environment preset="warehouse" />

      <ProductsCameraRig
        scrollRef={scrollRef}
        mouseRef={mouseRef}
        zoomLevel={viewState.zoomLevel}
        selectedIndustryId={viewState.selectedIndustryId}
      />
      <ProductsEcosystem
        scrollRef={scrollRef}
        hoverRef={hoverRef}
        rotationRef={rotationRef}
        selectedHotspotId={selectedHotspotId}
        particleCount={particleCount}
        viewState={viewState}
        onSelectHotspot={onSelectHotspot}
      />
      <ProductsPostEffects />
    </Canvas>
  );
}
