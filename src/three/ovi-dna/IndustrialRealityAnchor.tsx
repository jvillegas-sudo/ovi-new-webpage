import { Html } from "@react-three/drei";
import type { OviDnaBaseProps } from "./types";

const OFFICIAL_ASSET_URL =
  "https://github.com/user-attachments/assets/59c65962-fe03-4348-a567-3398fed123d4";

const STEEL_FINS = [
  { position: [-1.62, 0.56, 0.16] as const, size: [0.18, 2.48, 0.08] as const, rotation: [0, 0.08, 0] as const },
  { position: [-0.62, 0.22, 0.18] as const, size: [0.14, 2.16, 0.08] as const, rotation: [0, -0.05, 0] as const },
  { position: [0.58, -0.12, 0.2] as const, size: [0.16, 2.06, 0.08] as const, rotation: [0, 0.03, 0] as const },
  { position: [1.54, 0.34, 0.17] as const, size: [0.12, 2.3, 0.08] as const, rotation: [0, -0.08, 0] as const },
] as const;

const CONDENSATION_VEILS = [
  { position: [-0.9, 0.32, 0.14] as const, size: [1.18, 1.86] as const, rotation: [0.04, 0.08, -0.06] as const, opacity: 0.1 },
  { position: [0.92, -0.08, 0.15] as const, size: [1.4, 1.96] as const, rotation: [-0.03, -0.06, 0.04] as const, opacity: 0.08 },
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
 *   URL: https://github.com/user-attachments/assets/59c65962-fe03-4348-a567-3398fed123d4
 */
export function IndustrialRealityAnchor({
  weight,
}: IndustrialRealityAnchorProps) {
  const opacity = Math.max(0, Math.min(1, weight));
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
      <Html transform position={[0.16, 0.02, 0.012]} occlude={false}>
        <div
          style={{
            opacity: opacity * 0.96,
            width: "430px",
            height: "264px",
            overflow: "hidden",
            pointerEvents: "none",
            position: "relative",
            background: "#040a0f",
            clipPath:
              "polygon(2% 8%, 15% 2%, 82% 0%, 98% 10%, 100% 80%, 92% 98%, 16% 100%, 0% 88%)",
            boxShadow:
              "inset 0 0 72px rgba(2,6,14,0.92), inset 0 0 18px rgba(126,232,255,0.18)",
            filter: "blur(0.1px)",
          }}
        >
          <img
            src={OFFICIAL_ASSET_URL}
            alt="OVI — Lavado de flota industrial · EMVARIAS"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              filter: "saturate(0.8) brightness(0.84) contrast(1.04)",
              transform: "scale(1.02)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(96deg, rgba(2,6,14,0.82) 0%, rgba(2,6,14,0.18) 23%, rgba(0,196,255,0.14) 54%, rgba(2,6,14,0.42) 100%)",
              mixBlendMode: "screen",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 78% 44%, rgba(126,232,255,0.26), transparent 24%), linear-gradient(to top, rgba(2,6,14,0.76), transparent 36%), linear-gradient(to right, rgba(2,6,14,0.9), transparent 18%, transparent 78%, rgba(2,6,14,0.86) 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "4%",
              top: "8%",
              width: "34%",
              height: "76%",
              background:
                "linear-gradient(100deg, rgba(255,255,255,0.18), rgba(255,255,255,0.02) 36%, transparent 72%)",
              filter: "blur(16px)",
              opacity: 0.44,
            }}
          />
        </div>
      </Html>
      {STEEL_FINS.map((fin, index) => (
        <mesh
          key={`fin-${index}`}
          position={fin.position}
          rotation={fin.rotation}
        >
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
        <mesh
          key={`veil-${index}`}
          position={veil.position}
          rotation={veil.rotation}
        >
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
