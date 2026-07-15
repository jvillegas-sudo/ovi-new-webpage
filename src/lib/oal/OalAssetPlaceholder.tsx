"use client";

/**
 * OVI Asset Library — 3D Asset Placeholder
 * Work Order: WO-016
 *
 * Professional holographic placeholder for OAL assets that are pending
 * integration. Replaces all visible primitive geometries (boxes, cylinders)
 * used as vehicle or industrial asset representations.
 *
 * This component must be used in every 3D scene where a definitive OAL
 * asset has not yet been integrated. It communicates OVI brand identity
 * while clearly indicating the asset is in development.
 */

import { useRef } from "react";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";
import { OAL_CATALOG } from "./catalog";

// ─── Types ────────────────────────────────────────────────────────────────────

interface OalAssetPlaceholderProps {
  /** OAL asset ID — used to display asset metadata */
  assetId: string;
  /**
   * Blend weight for opacity/visibility (0 = invisible, 1 = fully visible).
   * Used by scroll-driven experiences to fade the placeholder in/out.
   */
  weight?: number;
  /** Optional label override. Defaults to the asset's nameEs from catalog. */
  label?: string;
  /** Position in the 3D scene */
  position?: [number, number, number];
  /** Y-axis rotation in radians */
  rotationY?: number;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function OalHolographicFrame({
  weight,
  assetId,
  label,
}: {
  weight: number;
  assetId: string;
  label: string;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.18) * 0.12;
  });

  return (
    <group ref={groupRef}>
      {/* Corner markers — 4 vertical pillars at the corners of the asset space */}
      {(
        [
          [-1.8, 0, -0.85],
          [1.8, 0, -0.85],
          [-1.8, 0, 0.85],
          [1.8, 0, 0.85],
        ] as [number, number, number][]
      ).map((pos, i) => (
        <mesh key={i} position={pos}>
          <cylinderGeometry args={[0.012, 0.012, 1.6, 6]} />
          <meshStandardMaterial
            color="#00C4FF"
            emissive="#00C4FF"
            emissiveIntensity={2.2}
            transparent
            opacity={weight * 0.72}
            depthWrite={false}
          />
        </mesh>
      ))}

      {/* Top horizontal bar */}
      <mesh position={[0, 0.78, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.006, 0.006, 3.6, 6]} />
        <meshStandardMaterial
          color="#00C4FF"
          emissive="#00C4FF"
          emissiveIntensity={1.8}
          transparent
          opacity={weight * 0.5}
          depthWrite={false}
        />
      </mesh>

      {/* Bottom horizontal bar */}
      <mesh position={[0, -0.78, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.006, 0.006, 3.6, 6]} />
        <meshStandardMaterial
          color="#00FF85"
          emissive="#00FF85"
          emissiveIntensity={1.8}
          transparent
          opacity={weight * 0.4}
          depthWrite={false}
        />
      </mesh>

      {/* Diagonal accent lines (front face) */}
      <mesh position={[-1.8, 0.78, -0.85]} rotation={[0, 0, -Math.atan2(1.56, 3.6)]}>
        <cylinderGeometry args={[0.004, 0.004, 3.92, 4]} />
        <meshStandardMaterial
          color="#00C4FF"
          emissive="#00C4FF"
          emissiveIntensity={1.4}
          transparent
          opacity={weight * 0.22}
          depthWrite={false}
        />
      </mesh>

      {/* Central label panel */}
      <Html
        transform
        position={[0, 0.05, 0.86]}
        style={{ pointerEvents: "none" }}
      >
        <div
          style={{
            opacity: weight,
            transition: "opacity 0.4s ease",
            textAlign: "center",
            userSelect: "none",
          }}
        >
          <div
            style={{
              background: "rgba(2, 8, 16, 0.82)",
              border: "1px solid rgba(0, 196, 255, 0.45)",
              borderRadius: "8px",
              padding: "8px 16px",
              backdropFilter: "blur(8px)",
              minWidth: "160px",
            }}
          >
            <div
              style={{
                fontSize: "9px",
                fontFamily: "monospace",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#00C4FF",
                marginBottom: "4px",
              }}
            >
              {assetId}
            </div>
            <div
              style={{
                fontSize: "11px",
                fontFamily: "sans-serif",
                fontWeight: 600,
                color: "rgba(255,255,255,0.92)",
                marginBottom: "4px",
              }}
            >
              {label}
            </div>
            <div
              style={{
                fontSize: "8px",
                fontFamily: "monospace",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#00FF85",
              }}
            >
              Activo OVI en desarrollo
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
}

function OalParticleField({ weight }: { weight: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 240;

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 4.0;
    positions[i3 + 1] = (Math.random() - 0.5) * 1.8;
    positions[i3 + 2] = (Math.random() - 0.5) * 1.9;
  }

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = clock.elapsedTime * 0.06;
    (pointsRef.current.material as THREE.PointsMaterial).opacity = weight * 0.28;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        color="#00C4FF"
        transparent
        opacity={0}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

function OalGroundReflection({ weight }: { weight: number }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.0, 0]}>
      <planeGeometry args={[14, 9]} />
      <meshStandardMaterial
        color="#030508"
        metalness={0.72}
        roughness={0.18}
        transparent
        opacity={weight * 0.35}
        depthWrite={false}
      />
    </mesh>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function OalAssetPlaceholder({
  assetId,
  weight = 1,
  label,
  position = [0, 0, 0],
  rotationY = 0,
}: OalAssetPlaceholderProps) {
  const entry = OAL_CATALOG[assetId];
  const displayLabel = label ?? entry?.nameEs ?? assetId;
  const displayId = assetId;

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <OalHolographicFrame weight={weight} assetId={displayId} label={displayLabel} />
      <OalParticleField weight={weight} />
      <OalGroundReflection weight={weight} />
    </group>
  );
}
