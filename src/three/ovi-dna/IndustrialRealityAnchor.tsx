import { useTexture } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import * as THREE from "three";
import type { OviDnaBaseProps } from "./types";

const OFFICIAL_ASSET_URL = "/ovi-media/cases/emvarias/emvarias-fleet-wash.png";

const STEEL_FINS = [
  {
    position: [-1.62, 0.56, 0.16] as const,
    size: [0.18, 2.48, 0.08] as const,
    rotation: [0, 0.08, 0] as const,
  },
  {
    position: [-0.62, 0.22, 0.18] as const,
    size: [0.14, 2.16, 0.08] as const,
    rotation: [0, -0.05, 0] as const,
  },
  {
    position: [0.58, -0.12, 0.2] as const,
    size: [0.16, 2.06, 0.08] as const,
    rotation: [0, 0.03, 0] as const,
  },
  {
    position: [1.54, 0.34, 0.17] as const,
    size: [0.12, 2.3, 0.08] as const,
    rotation: [0, -0.08, 0] as const,
  },
] as const;

const CONDENSATION_VEILS = [
  {
    position: [-0.9, 0.32, 0.14] as const,
    size: [1.18, 1.86] as const,
    rotation: [0.04, 0.08, -0.06] as const,
    opacity: 0.1,
  },
  {
    position: [0.92, -0.08, 0.15] as const,
    size: [1.4, 1.96] as const,
    rotation: [-0.03, -0.06, 0.04] as const,
    opacity: 0.08,
  },
] as const;

interface IndustrialRealityAnchorProps extends OviDnaBaseProps {
  weight: number;
}

/**
 * IndustrialRealityAnchor — WO-020 Identity Anchor
 *
 * Integrates the official EMVARIAS fleet-wash photograph into the
 * industrial scene (scene-a-engineering / w(3)) as a discovered layer
 * inside the same industrial universe.
 *
 * Design intent:
 * - No monitor, card, floating frame, or SaaS panel silhouette.
 * - Photo sits behind steel interruptions and condensation veils.
 * - Cyan inspection light acts as reveal, not as a UI border.
 * - Opacity driven by scene weight — fades in/out with scene transitions.
 *
 * Asset:
 *   Client: EMVARIAS — Transporte y gestión de residuos
 *   Service: Lavado de flota In-House, lavado general, desmanchado y despavonado
 *   Asset: public/ovi-media/cases/emvarias/emvarias-fleet-wash.png
 */
export function IndustrialRealityAnchor({ weight }: IndustrialRealityAnchorProps) {
  const opacity = Math.max(0, Math.min(1, weight));
  const photoTexture = useTexture(OFFICIAL_ASSET_URL);

  const apertureShape = useMemo(() => {
    const width = 4.26;
    const height = 2.5;
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    const points = [
      [0.02, 0.08],
      [0.15, 0.02],
      [0.82, 0],
      [0.98, 0.1],
      [1, 0.8],
      [0.92, 0.98],
      [0.16, 1],
      [0, 0.88],
    ] as const;

    const shape = new THREE.Shape();
    points.forEach(([x, y], index) => {
      const px = x * width - halfWidth;
      const py = halfHeight - y * height;
      if (index === 0) {
        shape.moveTo(px, py);
        return;
      }
      shape.lineTo(px, py);
    });
    shape.closePath();
    return shape;
  }, []);

  useEffect(() => {
    photoTexture.colorSpace = THREE.SRGBColorSpace;
    photoTexture.minFilter = THREE.LinearMipmapLinearFilter;
    photoTexture.magFilter = THREE.LinearFilter;
    photoTexture.anisotropy = 8;
    photoTexture.needsUpdate = true;
  }, [photoTexture]);

  if (opacity < 0.02) return null;

  return (
    <group position={[0.15, 0.42, -3.72]} rotation={[0.04, -0.18, 0]}>
      <mesh position={[0, -0.02, -0.08]}>
        <planeGeometry args={[4.9, 3.18]} />
        <meshStandardMaterial
          color="#07131b"
          roughness={0.2}
          metalness={0.98}
          transparent
          opacity={0.92}
        />
      </mesh>
      <mesh position={[0.2, -1.42, 0.2]} rotation={[-Math.PI / 2, 0.16, 0]}>
        <planeGeometry args={[4.82, 1.52]} />
        <meshStandardMaterial
          color="#0a1820"
          roughness={0.12}
          metalness={0.96}
          transparent
          opacity={opacity * 0.46}
        />
      </mesh>
      <pointLight
        position={[1.85, 1.05, 1.3]}
        color="#00c4ff"
        intensity={opacity * 2.55}
        distance={7}
      />
      <pointLight
        position={[-1.6, 0.28, 1.05]}
        color="#d8fbff"
        intensity={opacity * 0.72}
        distance={5}
      />
      <mesh position={[0.16, 0.02, -0.004]}>
        <planeGeometry args={[4.26, 2.5]} />
        <meshStandardMaterial
          color="#02060e"
          roughness={0.34}
          metalness={0.82}
          transparent
          opacity={opacity * 0.86}
        />
      </mesh>
      <mesh position={[0.16, 0.02, 0.012]}>
        <shapeGeometry args={[apertureShape]} />
        <meshStandardMaterial
          map={photoTexture}
          color="#b8d7e4"
          emissive="#1f3d4f"
          emissiveIntensity={opacity * 0.16}
          roughness={0.56}
          metalness={0.08}
          transparent
          opacity={opacity * 0.98}
        />
      </mesh>
      <mesh position={[0.16, 0.02, 0.022]}>
        <shapeGeometry args={[apertureShape]} />
        <meshBasicMaterial
          color="#08121a"
          transparent
          opacity={opacity * 0.18}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[-0.56, 0.18, 0.028]} rotation={[0.06, -0.04, 0.02]}>
        <planeGeometry args={[1.28, 2.02]} />
        <meshBasicMaterial
          color="#dff7ff"
          transparent
          opacity={opacity * 0.12}
          depthWrite={false}
        />
      </mesh>
      {STEEL_FINS.map((fin, index) => (
        <mesh key={`fin-${index}`} position={fin.position} rotation={fin.rotation}>
          <boxGeometry args={fin.size} />
          <meshStandardMaterial
            color="#0a1820"
            emissive="#06283a"
            emissiveIntensity={opacity * 0.16}
            roughness={0.12}
            metalness={0.98}
          />
        </mesh>
      ))}
      {CONDENSATION_VEILS.map((veil, index) => (
        <mesh key={`veil-${index}`} position={veil.position} rotation={veil.rotation}>
          <planeGeometry args={veil.size} />
          <meshBasicMaterial
            color="#b7f4ff"
            transparent
            opacity={opacity * veil.opacity}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}
