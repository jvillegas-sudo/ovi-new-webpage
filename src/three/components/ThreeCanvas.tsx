"use client";

/**
 * Three.js: Canvas Provider
 *
 * Base R3F Canvas wrapper with production-ready configuration.
 * Sets up:
 *   - WebGL renderer with optimal settings
 *   - Performance monitoring (Perf via r3f-perf in dev)
 *   - Tone mapping for HDR-like look
 *   - DPR management (respects device pixel ratio, capped for performance)
 *   - Post-processing pipeline
 *   - Adaptive performance scaling
 *
 * Why these settings?
 *   - ACESFilmicToneMapping: cinematic color grading, industry standard
 *   - sRGB encoding: correct gamma for web
 *   - DPR capped at 2: beyond 2 is imperceptible but kills GPU
 */

import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents, PerformanceMonitor } from "@react-three/drei";
import * as THREE from "three";
import { useUIStore } from "@store/ui.store";

interface ThreeCanvasProps {
  children: React.ReactNode;
  className?: string;
  /** Force a specific performance level */
  forcePerformance?: "high" | "medium" | "low";
}

export function ThreeCanvas({ children, className, forcePerformance }: ThreeCanvasProps) {
  const setPerformanceLevel = useUIStore((s) => s.setThreePerformanceLevel);
  const dprRef = useRef<[number, number]>([1, 2]);

  return (
    <Canvas
      className={className}
      dpr={dprRef.current}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.0,
        outputColorSpace: THREE.SRGBColorSpace,
        powerPreference: "high-performance",
        alpha: false,
      }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [0, 0, 5],
      }}
      shadows="soft"
      // Prevent default canvas pointer events blocking scroll
      eventSource={typeof document !== "undefined" ? document.documentElement : undefined}
      eventPrefix="client"
    >
      {/* Adaptive performance scaling */}
      {!forcePerformance && (
        <PerformanceMonitor
          onIncline={() => setPerformanceLevel("high")}
          onDecline={() => setPerformanceLevel("low")}
          flipflops={3}
          onFallback={() => setPerformanceLevel("low")}
        >
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
        </PerformanceMonitor>
      )}

      {children}
    </Canvas>
  );
}
