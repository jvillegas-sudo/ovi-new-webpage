"use client";

/**
 * Three.js: Environment & Lighting Setup
 *
 * Provides HDR environment mapping and scene lighting.
 * Uses Drei's Environment component which supports:
 *   - Built-in preset environments (studio, city, sunset, etc.)
 *   - Custom HDRI files from /public/hdri/
 *
 * Why HDR environments?
 *   - Physical-based rendering requires accurate environment light
 *   - HDR provides a wider dynamic range than standard images
 *   - Industry standard for 3D product visualization
 */

import { Environment, ContactShadows } from "@react-three/drei";
import { useUIStore } from "@store/ui.store";

type EnvironmentPreset =
  | "apartment"
  | "city"
  | "dawn"
  | "forest"
  | "lobby"
  | "night"
  | "park"
  | "studio"
  | "sunset"
  | "warehouse";

interface SceneEnvironmentProps {
  preset?: EnvironmentPreset;
  /** Custom HDRI file path (overrides preset) */
  hdriPath?: string;
  /** Show contact shadows on floor */
  shadows?: boolean;
  /** Environment light intensity */
  intensity?: number;
}

export function SceneEnvironment({
  preset = "studio",
  hdriPath,
  shadows = false,
  intensity = 1.0,
}: SceneEnvironmentProps) {
  const performanceLevel = useUIStore((s) => s.threePerformanceLevel);

  return (
    <>
      <Environment
        preset={hdriPath ? undefined : preset}
        files={hdriPath}
        environmentIntensity={intensity}
        backgroundIntensity={0}
        // Disable background — we use CSS background
        background={false}
      />

      {/* Directional key light */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={performanceLevel === "low" ? 0.8 : 1.5}
        castShadow={performanceLevel !== "low"}
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
      />

      {/* Ambient fill */}
      <ambientLight intensity={0.2} />

      {/* Cyan rim light — OVI brand */}
      <pointLight
        position={[-5, 3, -5]}
        intensity={performanceLevel === "low" ? 0 : 2}
        color="#00C4FF"
        distance={20}
      />

      {/* Contact shadows for grounded feel */}
      {shadows && performanceLevel !== "low" && (
        <ContactShadows
          position={[0, -0.5, 0]}
          opacity={0.4}
          scale={10}
          blur={2}
          far={10}
          resolution={256}
          color="#000000"
        />
      )}
    </>
  );
}
