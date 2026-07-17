import { Html } from "@react-three/drei";
import type { OviDnaBaseProps } from "./types";

const ASSET_PATH =
  "/ovi-media/cases/emvarias/CASE-EMVARIAS-LAVADO-FLOTA-01.webp";

interface IndustrialRealityAnchorProps extends OviDnaBaseProps {
  weight: number;
}

/**
 * IndustrialRealityAnchor — WO-020 Identity Anchor
 *
 * Integrates the official EMVARIAS fleet-wash photograph into the
 * industrial scene (scene-a-engineering / w(3)) as a cinematic inspection
 * window illuminated by the cyan InspectionBeam palette.
 *
 * Design intent:
 * - One vertical plane, positioned at the rear of the industrial space.
 * - Steel-frame border with emissive cyan rim matching the inspection light.
 * - Image rendered via Html-transform (same pattern as SceneAAnnotations).
 * - Opacity driven by scene weight — fades in/out with scene transitions.
 * - No new UI modules, no carousels, no SaaS cards.
 *
 * Asset:
 *   Client: EMVARIAS — Transporte y gestión de residuos
 *   Service: Lavado de flota In-House, lavado general, desmanchado y despavonado
 *   File: public/ovi-media/cases/emvarias/CASE-EMVARIAS-LAVADO-FLOTA-01.webp
 */
export function IndustrialRealityAnchor({
  weight,
}: IndustrialRealityAnchorProps) {
  const opacity = Math.max(0, Math.min(1, weight));
  if (opacity < 0.02) return null;

  return (
    <group position={[0, 0.55, -3.6]}>
      {/* Outer cyan rim — matches InspectionBeam emissive color */}
      <mesh>
        <planeGeometry args={[4.5, 2.85]} />
        <meshStandardMaterial
          color="#00c4ff"
          emissive="#00c4ff"
          emissiveIntensity={0.55 * opacity}
          transparent
          opacity={opacity * 0.14}
          depthWrite={false}
        />
      </mesh>

      {/* Industrial steel frame */}
      <mesh position={[0, 0, 0.003]}>
        <planeGeometry args={[4.3, 2.68]} />
        <meshStandardMaterial
          color="#0c1b26"
          roughness={0.16}
          metalness={0.95}
          transparent
          opacity={opacity * 0.97}
        />
      </mesh>

      {/* Inspection beam — point light casting on the portal surface */}
      <pointLight
        position={[0, 1.6, 1.4]}
        color="#00c4ff"
        intensity={opacity * 2.2}
        distance={6}
      />

      {/* Official OVI photograph — EMVARIAS fleet wash operation */}
      <Html transform position={[0, 0, 0.007]} occlude={false}>
        <div
          style={{
            opacity,
            width: "408px",
            height: "255px",
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          <img
            src={ASSET_PATH}
            alt="OVI — Lavado de flota industrial · EMVARIAS"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              filter: "saturate(0.82) brightness(0.90)",
            }}
          />
        </div>
      </Html>
    </group>
  );
}
