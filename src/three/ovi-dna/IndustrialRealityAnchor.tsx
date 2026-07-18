import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { OviDnaBaseProps } from "./types";

const OFFICIAL_ASSET_URL = "/ovi-media/cases/emvarias/emvarias-fleet-wash.png";
const ACTIVATION_SCROLL_RANGE = [0.3367, 0.6633] as const;
const PHOTO_SIZE = [3.9, 2.92] as const;
const ANCHOR_POSITION = [0.18, 0.26, -2.86] as const;
const ANCHOR_ROTATION = [0.03, -0.1, 0.015] as const;

const STEEL_FINS = [
  {
    position: [-1.42, 0.46, 0.12] as const,
    size: [0.12, 2.86, 0.06] as const,
    rotation: [0, 0.08, 0] as const,
  },
  {
    position: [-0.24, 0.08, 0.14] as const,
    size: [0.1, 2.72, 0.05] as const,
    rotation: [0, -0.05, 0] as const,
  },
  {
    position: [1.28, 0.22, 0.12] as const,
    size: [0.14, 2.84, 0.06] as const,
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
  progress?: number;
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
export function IndustrialRealityAnchor({ weight, progress = 0 }: IndustrialRealityAnchorProps) {
  const opacity = Math.max(0, Math.min(1, weight));
  const photoTexture = useLoader(THREE.TextureLoader, OFFICIAL_ASSET_URL);
  const groupRef = useRef<THREE.Group>(null);
  const lastLogProgressRef = useRef(-1);
  const { camera } = useThree();

  const photoGeometry = useMemo(() => {
    const [width, height] = PHOTO_SIZE;
    const geometry = new THREE.PlaneGeometry(width, height, 24, 18);
    const positions = geometry.attributes.position;
    for (let index = 0; index < positions.count; index += 1) {
      const x = positions.getX(index) / (width / 2);
      const y = positions.getY(index) / (height / 2);
      const arcDepth = (1 - x * x) * 0.08;
      const steamWarp = Math.sin((y + 1) * Math.PI) * 0.025;
      positions.setZ(index, arcDepth + steamWarp);
    }
    positions.needsUpdate = true;
    geometry.computeVertexNormals();
    return geometry;
  }, []);

  useEffect(() => {
    photoTexture.colorSpace = THREE.SRGBColorSpace;
    photoTexture.minFilter = THREE.LinearMipmapLinearFilter;
    photoTexture.magFilter = THREE.LinearFilter;
    photoTexture.anisotropy = 8;
    photoTexture.needsUpdate = true;
  }, [photoTexture]);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development" || typeof window === "undefined") return;
    const debugWindow = window as Window & {
      __oviIndustrialAnchorDebug?: Record<string, unknown>;
    };

    debugWindow.__oviIndustrialAnchorDebug = {
      mounted: true,
      activationScrollRange: ACTIVATION_SCROLL_RANGE,
      position: ANCHOR_POSITION,
      rotation: ANCHOR_ROTATION,
      size: PHOTO_SIZE,
    };

    return () => {
      if (debugWindow.__oviIndustrialAnchorDebug) {
        debugWindow.__oviIndustrialAnchorDebug = {
          ...debugWindow.__oviIndustrialAnchorDebug,
          mounted: false,
        };
      }
    };
  }, []);

  useFrame(() => {
    if (process.env.NODE_ENV !== "development") return;
    if (!groupRef.current) return;
    if (opacity < 0.02) return;
    if (Math.abs(progress - lastLogProgressRef.current) < 0.045 && opacity < 0.98) return;

    const worldPosition = new THREE.Vector3();
    const worldScale = new THREE.Vector3();
    groupRef.current.getWorldPosition(worldPosition);
    groupRef.current.getWorldScale(worldScale);

    const projected = worldPosition.clone().project(camera);
    const inViewport =
      projected.z >= -1 &&
      projected.z <= 1 &&
      Math.abs(projected.x) <= 1 &&
      Math.abs(projected.y) <= 1;

    lastLogProgressRef.current = progress;
    if (typeof window !== "undefined") {
      const debugWindow = window as Window & {
        __oviIndustrialAnchorDebug?: Record<string, unknown>;
      };
      debugWindow.__oviIndustrialAnchorDebug = {
        ...debugWindow.__oviIndustrialAnchorDebug,
        mounted: true,
        scroll: Number(progress.toFixed(3)),
        opacity: Number(opacity.toFixed(3)),
        visible: groupRef.current.visible,
        inViewport,
        position: worldPosition.toArray().map((value) => Number(value.toFixed(3))),
        scale: worldScale.toArray().map((value) => Number(value.toFixed(3))),
        distanceToCamera: Number(camera.position.distanceTo(worldPosition).toFixed(3)),
        activationScrollRange: ACTIVATION_SCROLL_RANGE,
      };
    }
  });

  if (opacity < 0.02) return null;

  return (
    <group ref={groupRef} position={ANCHOR_POSITION} rotation={ANCHOR_ROTATION}>
      <mesh position={[0, -0.04, -0.08]}>
        <planeGeometry args={[4.34, 3.18]} />
        <meshStandardMaterial
          color="#08141d"
          emissive="#061018"
          emissiveIntensity={opacity * 0.22}
          roughness={0.22}
          metalness={0.9}
          transparent
          opacity={0.84}
        />
      </mesh>
      <mesh position={[0.12, -1.56, 0.24]} rotation={[-Math.PI / 2, 0.16, 0]}>
        <planeGeometry args={[4.28, 1.86]} />
        <meshStandardMaterial
          color="#0a1820"
          roughness={0.16}
          metalness={0.92}
          transparent
          opacity={opacity * 0.42}
        />
      </mesh>
      <pointLight
        position={[1.86, 1.18, 1.05]}
        color="#00c4ff"
        intensity={opacity * 2.8}
        distance={7}
      />
      <pointLight
        position={[-1.68, 0.52, 0.92]}
        color="#d8fbff"
        intensity={opacity * 0.9}
        distance={5}
      />
      <mesh position={[0.02, 0.05, 0.02]}>
        <planeGeometry args={[4.08, 3.06]} />
        <meshStandardMaterial
          color="#11222d"
          emissive="#16394b"
          emissiveIntensity={opacity * 0.4}
          roughness={0.42}
          metalness={0.36}
          transparent
          opacity={opacity * 0.18}
        />
      </mesh>
      <mesh geometry={photoGeometry} position={[0.02, 0.05, 0.08]}>
        <meshStandardMaterial
          map={photoTexture}
          color="#d5e9f2"
          emissive="#24566e"
          emissiveIntensity={opacity * 0.22}
          roughness={0.34}
          metalness={0.14}
          transparent
          opacity={opacity}
        />
      </mesh>
      <mesh position={[0.08, 0.02, 0.12]}>
        <planeGeometry args={[4.04, 3]} />
        <meshStandardMaterial
          color="#6aa9c3"
          emissive="#2f94bf"
          emissiveIntensity={opacity * 0.22}
          roughness={0.08}
          metalness={0.04}
          transparent
          opacity={opacity * 0.06}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[-0.18, 0.04, 0.18]} rotation={[0.05, -0.02, 0.01]}>
        <planeGeometry args={[4.18, 3.02]} />
        <meshBasicMaterial
          color="#d7f3ff"
          transparent
          opacity={opacity * 0.09}
          depthWrite={false}
        />
      </mesh>
      {STEEL_FINS.map((fin, index) => (
        <mesh key={`fin-${index}`} position={fin.position} rotation={fin.rotation}>
          <boxGeometry args={fin.size} />
          <meshStandardMaterial
            color="#0a1820"
            emissive="#06283a"
            emissiveIntensity={opacity * 0.2}
            roughness={0.16}
            metalness={0.96}
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
