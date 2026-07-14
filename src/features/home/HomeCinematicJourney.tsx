"use client";

/**
 * OVI — Cinematic Home Journey
 *
 * Scroll-driven cinematic experience. Three.js is the primary visual language.
 * Five scenes narrate the OVI universe through water, light, and industrial precision.
 *
 * ─── AUDIO ARCHITECTURE (Prepared — not yet implemented) ──────────────────────
 * Future integration: Web Audio API + Howler.js or Tone.js
 *
 * AudioLayer interface:
 *   type: "water" | "steam" | "glass" | "metal" | "scanner" | "motor" | "ambient"
 *   scene: 0 | 1 | 2 | 3 | 4
 *   volume: number          // 0–1
 *   loop: boolean
 *   fadeIn: number          // ms
 *   fadeOut: number         // ms
 *   spatialPosition?: [x: number, y: number, z: number]
 *
 * Scene sound design:
 *   0  Nacimiento OVI     → water drops, glass resonance
 *   1  Logo Formation     → harmonic glass, scanner sweep
 *   2  Ingeniería         → electric motors, metal resonance, steam hiss
 *   3  OVI AI             → scanner sweep, data-processing hum
 *   4  Ecosistema         → ambient convergence, low-frequency tone
 * ──────────────────────────────────────────────────────────────────────────────
 */

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import type * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Badge, Button, Container, Heading, Text } from "@components/ui";
import { PostProcessing } from "@three/components/PostProcessing";
import { SceneEnvironment } from "@three/components/SceneEnvironment";
import { ThreeCanvas } from "@three/components/ThreeCanvas";

interface HomeCinematicJourneyProps {
  hero: {
    badge: string;
    title: string;
    subtitle: string;
  };
}

// ─── Scene definitions ────────────────────────────────────────────────────────

const cinematicScenes = [
  {
    id: "scene-water",
    number: "01",
    title: "Nacimiento OVI",
    tagline: "Una gota cae. La onda genera energía. Las partículas forman el universo.",
  },
  {
    id: "scene-logo",
    number: "02",
    title: "El Logo",
    tagline: "La energía se organiza. OVI nace desde el agua y la luz.",
  },
  {
    id: "scene-industrial",
    number: "03",
    title: "Ingeniería en Limpieza",
    tagline: "Activos industriales. Vapor. Acero inoxidable. Superficies impecables.",
  },
  {
    id: "scene-ai",
    number: "04",
    title: "OVI AI",
    tagline: "Un ingeniero virtual. Siempre disponible. Presente en todo el universo.",
  },
  {
    id: "scene-ecosystem",
    number: "05",
    title: "Ecosistema OVI",
    tagline: "OVI AI · OVI OS · OVI Lab · OVI Store. Un solo universo integrado.",
  },
] as const;

function sceneWeight(progress: number, index: number, total: number): number {
  const distance = Math.abs(progress * (total - 1) - index);
  return Math.max(0, 1 - distance);
}

// ─── Three.js scene components ────────────────────────────────────────────────

/** Scroll-driven cinematic camera animation */
function CameraController({ progress }: { progress: number }) {
  const lookAt = useRef({ x: 0, y: 0, z: 0 });

  const camPositions: [number, number, number][] = [
    [0, 2.2, 9],
    [0, 0.3, 4.5],
    [2.8, 1.8, 5.5],
    [-1.5, 0.5, 4],
    [0, 1.5, 7.5],
  ];

  const lookTargets: [number, number, number][] = [
    [0, -0.5, 0],
    [0, 0.4, 0],
    [0, 0, -3],
    [0, 0.3, 1.2],
    [0, 0.5, 2.5],
  ];

  useFrame(({ camera }) => {
    const n = camPositions.length - 1;
    const raw = Math.min(progress * n, n - 0.001);
    const from = Math.floor(raw);
    const t = raw - from;
    const to = from + 1;

    const [fx, fy, fz] = camPositions[from];
    const [tx, ty, tz] = camPositions[to];
    const px = fx + (tx - fx) * t;
    const py = fy + (ty - fy) * t;
    const pz = fz + (tz - fz) * t;

    const [flx, fly, flz] = lookTargets[from];
    const [tlx, tly, tlz] = lookTargets[to];
    const lx = flx + (tlx - flx) * t;
    const ly = fly + (tly - fly) * t;
    const lz = flz + (tlz - flz) * t;

    camera.position.x += (px - camera.position.x) * 0.035;
    camera.position.y += (py - camera.position.y) * 0.035;
    camera.position.z += (pz - camera.position.z) * 0.035;

    lookAt.current.x += (lx - lookAt.current.x) * 0.035;
    lookAt.current.y += (ly - lookAt.current.y) * 0.035;
    lookAt.current.z += (lz - lookAt.current.z) * 0.035;

    camera.lookAt(lookAt.current.x, lookAt.current.y, lookAt.current.z);
  });

  return null;
}

/** Highly reflective water surface — stainless steel meets water */
function WaterSurface() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y = -1.4 + Math.sin(clock.elapsedTime * 0.5) * 0.04;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.4, 0]}>
      <planeGeometry args={[28, 28]} />
      <meshStandardMaterial
        color="#071828"
        metalness={0.92}
        roughness={0.04}
        transparent
        opacity={0.75}
      />
    </mesh>
  );
}

/** Water drop falling from above — Scene 0 */
function WaterDrop({ weight }: { weight: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const cycle = (clock.elapsedTime * 0.28) % 1;
    meshRef.current.position.y = 3.5 - cycle * 5.2;
    (meshRef.current.material as THREE.MeshStandardMaterial).opacity =
      weight * Math.max(0, 1 - cycle * 1.3);
  });

  return (
    <mesh ref={meshRef} position={[0, 3.5, 0]}>
      <sphereGeometry args={[0.1, 24, 24]} />
      <meshStandardMaterial
        color="#00C4FF"
        emissive="#0066AA"
        emissiveIntensity={2}
        transparent
        opacity={1}
      />
    </mesh>
  );
}

/** Expanding water ripple rings — organic, cinematic */
function WaterRipples({ weight }: { weight: number }) {
  const RING_COUNT = 6;
  const ringRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    ringRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const phase = (t * 0.32 + i * (1 / RING_COUNT)) % 1;
      mesh.scale.setScalar(0.4 + phase * 8.5);
      (mesh.material as THREE.MeshStandardMaterial).opacity =
        weight * Math.max(0, 0.55 - phase * 0.55) * 0.6;
    });
  });

  return (
    <group position={[0, -1.36, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      {Array.from({ length: RING_COUNT }, (_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            ringRefs.current[i] = el;
          }}
        >
          <ringGeometry args={[0.96, 1, 96]} />
          <meshStandardMaterial
            color="#00C4FF"
            emissive="#003366"
            transparent
            opacity={0}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/** Orbital particle field — persistent across all scenes */
function MainParticles({ progress }: { progress: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const count = 1800;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 5.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * 2.6;
      const i3 = i * 3;
      positions[i3] = Math.cos(theta) * r;
      positions[i3 + 1] = phi;
      positions[i3 + 2] = Math.sin(theta) * r;
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * (0.05 + progress * 0.06);
    pointsRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.3;
    (pointsRef.current.material as THREE.PointsMaterial).opacity = 0.28 + progress * 0.14;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particles, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#00C4FF" transparent opacity={0.28} depthWrite={false} />
    </points>
  );
}

/** Steam micro-particles rising — industrial atmosphere */
function SteamParticles({ weight }: { weight: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 250;

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 6;
      positions[i3 + 1] = Math.random() * 4 - 1.5;
      positions[i3 + 2] = (Math.random() - 0.5) * 4 - 3;
      velocities[i3] = (Math.random() - 0.5) * 0.003;
      velocities[i3 + 1] = 0.007 + Math.random() * 0.009;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    return { positions, velocities };
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current?.geometry.attributes.position) return;
    const attr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const dt = Math.min(delta * 60, 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] += velocities[i3] * dt;
      positions[i3 + 1] += velocities[i3 + 1] * dt;
      positions[i3 + 2] += velocities[i3 + 2] * dt;
      if (positions[i3 + 1] > 4) {
        positions[i3] = (Math.random() - 0.5) * 6;
        positions[i3 + 1] = -1.5;
        positions[i3 + 2] = (Math.random() - 0.5) * 4 - 3;
      }
    }
    attr.needsUpdate = true;
    (pointsRef.current.material as THREE.PointsMaterial).opacity = weight * 0.28;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#C8F0FF" transparent opacity={0} depthWrite={false} />
    </points>
  );
}

/** 3D geometric OVI logo — torus O, cylinder-arm V, cylinder I */
function OVILogo({ weight }: { weight: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const haloRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0035;
      groupRef.current.position.y = 0.35 + Math.sin(t * 0.65) * 0.07;
    }
    if (haloRef.current) {
      (haloRef.current.material as THREE.MeshStandardMaterial).opacity =
        weight * (0.15 + Math.sin(t * 1.2) * 0.06);
    }
  });

  const metalProps = { metalness: 0.85, roughness: 0.18 };

  return (
    <group ref={groupRef} position={[0, 0.35, 0]}>
      {/* Outer glow halo */}
      <mesh ref={haloRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.2, 0.015, 16, 180]} />
        <meshStandardMaterial color="#00C4FF" emissive="#00C4FF" transparent opacity={0} />
      </mesh>

      {/* O — torus */}
      <mesh position={[-1.42, 0, 0]}>
        <torusGeometry args={[0.44, 0.075, 24, 80]} />
        <meshStandardMaterial
          color="#00C4FF"
          emissive="#004888"
          emissiveIntensity={1.2}
          transparent
          opacity={weight}
          {...metalProps}
        />
      </mesh>

      {/* V — left arm */}
      <mesh position={[-0.22, 0.12, 0]} rotation={[0, 0, -0.58]}>
        <cylinderGeometry args={[0.045, 0.045, 0.92, 16]} />
        <meshStandardMaterial
          color="#00FF85"
          emissive="#006644"
          emissiveIntensity={1.0}
          transparent
          opacity={weight}
          {...metalProps}
        />
      </mesh>

      {/* V — right arm */}
      <mesh position={[0.22, 0.12, 0]} rotation={[0, 0, 0.58]}>
        <cylinderGeometry args={[0.045, 0.045, 0.92, 16]} />
        <meshStandardMaterial
          color="#00FF85"
          emissive="#006644"
          emissiveIntensity={1.0}
          transparent
          opacity={weight}
          {...metalProps}
        />
      </mesh>

      {/* I */}
      <mesh position={[1.25, 0, 0]}>
        <cylinderGeometry args={[0.055, 0.055, 0.88, 16]} />
        <meshStandardMaterial
          color="#00C4FF"
          emissive="#004888"
          emissiveIntensity={1.2}
          transparent
          opacity={weight}
          {...metalProps}
        />
      </mesh>
    </group>
  );
}

/** Industrial tanks, pipes, and stainless steel floor — Scene 2 */
function IndustrialAssets({ weight }: { weight: number }) {
  const stainless = {
    color: "#1C2B38" as const,
    metalness: 0.96,
    roughness: 0.06,
    transparent: true as const,
    opacity: weight,
  };

  const tanks: [number, number][] = [
    [-3.2, 1.8],
    [-1.5, 2.4],
    [0.4, 1.6],
    [1.8, 2.1],
    [3.2, 1.4],
  ];

  return (
    <group position={[0, -0.8, -3.5]}>
      {tanks.map(([x, h], i) => (
        <group key={i} position={[x, 0, 0]}>
          <mesh position={[0, h / 2, 0]}>
            <cylinderGeometry args={[0.5, 0.52, h, 32]} />
            <meshStandardMaterial {...stainless} />
          </mesh>
          <mesh position={[0, h, 0]}>
            <sphereGeometry args={[0.52, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial {...stainless} />
          </mesh>
          <mesh position={[0, h * 0.6, 0]}>
            <torusGeometry args={[0.52, 0.03, 12, 60]} />
            <meshStandardMaterial
              color="#00C4FF"
              emissive="#003366"
              transparent
              opacity={weight * 0.7}
            />
          </mesh>
        </group>
      ))}

      <mesh position={[0, 0.5, 0.3]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 8, 16]} />
        <meshStandardMaterial
          color="#1A2830"
          metalness={0.9}
          roughness={0.12}
          transparent
          opacity={weight * 0.85}
        />
      </mesh>
      <mesh position={[0, 1.0, 0.3]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 7, 16]} />
        <meshStandardMaterial
          color="#1A2830"
          metalness={0.9}
          roughness={0.12}
          transparent
          opacity={weight * 0.7}
        />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 1.5]}>
        <planeGeometry args={[16, 12]} />
        <meshStandardMaterial
          color="#0D1E2A"
          metalness={0.88}
          roughness={0.12}
          transparent
          opacity={weight * 0.65}
        />
      </mesh>
    </group>
  );
}

/** OVI AI core — icosahedron + orbital rings + neural nodes — Scene 3 */
function AICore({ weight }: { weight: number }) {
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  const nodes: [number, number, number][] = useMemo(
    () => [
      [-1.9, 0.7, 0.3],
      [1.9, 0.7, 0.3],
      [-1.9, -0.7, 0.3],
      [1.9, -0.7, 0.3],
      [0, 1.9, -0.4],
      [0, -1.9, -0.4],
      [-1.3, 0, 1.5],
      [1.3, 0, 1.5],
    ],
    [],
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (coreRef.current) {
      coreRef.current.rotation.y += 0.009;
      coreRef.current.rotation.x += 0.005;
      coreRef.current.scale.setScalar(0.88 + weight * 0.2 + Math.sin(t * 1.8) * 0.04);
    }
    if (ring1Ref.current) ring1Ref.current.rotation.z += 0.014;
    if (ring2Ref.current) ring2Ref.current.rotation.x += 0.01;
    if (ring3Ref.current) ring3Ref.current.rotation.y += 0.007;
  });

  return (
    <group position={[0, 0.3, 1.2]}>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.38, 2]} />
        <meshStandardMaterial
          color="#00C4FF"
          emissive="#0088BB"
          emissiveIntensity={1.5}
          wireframe
          transparent
          opacity={0.25 + weight * 0.6}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshStandardMaterial
          color="#00C4FF"
          emissive="#00AADD"
          emissiveIntensity={2}
          transparent
          opacity={weight * 0.9}
          metalness={0.8}
          roughness={0.1}
        />
      </mesh>

      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.3, 0.022, 16, 140]} />
        <meshStandardMaterial
          color="#00C4FF"
          emissive="#004488"
          transparent
          opacity={weight * 0.65}
        />
      </mesh>
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.55, 0.016, 16, 140]} />
        <meshStandardMaterial
          color="#00FF85"
          emissive="#006644"
          transparent
          opacity={weight * 0.5}
        />
      </mesh>
      <mesh ref={ring3Ref} rotation={[0, Math.PI / 4, Math.PI / 5]}>
        <torusGeometry args={[1.75, 0.012, 16, 140]} />
        <meshStandardMaterial
          color="#0047AB"
          emissive="#001F55"
          transparent
          opacity={weight * 0.4}
        />
      </mesh>

      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.058, 16, 16]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? "#00C4FF" : i % 3 === 1 ? "#00FF85" : "#0047AB"}
            emissive={i % 3 === 0 ? "#004488" : i % 3 === 1 ? "#006644" : "#001F55"}
            emissiveIntensity={1.2}
            transparent
            opacity={weight * 0.9}
          />
        </mesh>
      ))}
    </group>
  );
}

/** OVI Ecosystem — central hub with 4 orbiting product spheres — Scene 4 */
function EcosystemOrbit({ weight }: { weight: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const hubRef = useRef<THREE.Mesh>(null);

  const products = useMemo(
    () => [
      { color: "#00C4FF", emissive: "#004488", radius: 1.85 },
      { color: "#00FF85", emissive: "#006644", radius: 2.25 },
      { color: "#0047AB", emissive: "#001F55", radius: 1.65 },
      { color: "#00C4FF", emissive: "#004488", radius: 2.55 },
    ],
    [],
  );

  useFrame((_, delta) => {
    if (hubRef.current) hubRef.current.rotation.y += delta * 0.5;
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.006;
  });

  return (
    <group ref={groupRef} position={[0, 0.5, 2.5]}>
      <mesh ref={hubRef}>
        <icosahedronGeometry args={[0.28, 1]} />
        <meshStandardMaterial
          color="#00C4FF"
          emissive="#0099CC"
          emissiveIntensity={2}
          transparent
          opacity={weight * 0.95}
          wireframe
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.14, 32, 32]} />
        <meshStandardMaterial
          color="#00C4FF"
          emissive="#00C4FF"
          emissiveIntensity={3}
          transparent
          opacity={weight * 0.9}
        />
      </mesh>

      {products.map((p, i) => {
        const angle = (i / products.length) * Math.PI * 2;
        return (
          <group key={i}>
            <mesh rotation={[Math.PI / 2, 0, i * 0.25]}>
              <torusGeometry args={[p.radius, 0.012, 12, 120]} />
              <meshStandardMaterial
                color={p.color}
                emissive={p.emissive}
                transparent
                opacity={weight * 0.22}
              />
            </mesh>
            <mesh position={[Math.cos(angle) * p.radius, 0, Math.sin(angle) * p.radius]}>
              <sphereGeometry args={[0.16, 24, 24]} />
              <meshStandardMaterial
                color={p.color}
                emissive={p.emissive}
                emissiveIntensity={1.5}
                transparent
                opacity={weight * 0.9}
                metalness={0.7}
                roughness={0.2}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

/** Dynamic cinematic lighting — shifts per scene */
function CinematicLighting({ progress }: { progress: number }) {
  const spotRef = useRef<THREE.SpotLight>(null);

  useFrame(() => {
    if (!spotRef.current) return;
    const g = 0.77 + progress * 0.23;
    spotRef.current.color.setRGB(0, g, progress > 0.6 ? 0.52 : 1);
    spotRef.current.intensity = 2.5 + progress * 1.5;
  });

  return (
    <>
      <spotLight
        ref={spotRef}
        position={[0, 10, 3]}
        angle={0.38}
        penumbra={0.85}
        intensity={3}
        color="#00C4FF"
        castShadow={false}
      />
      <pointLight position={[0, -1.2, 0]} intensity={0.8} color="#0033AA" distance={12} />
      <pointLight position={[-6, 3, -3]} intensity={1.8} color="#00C4FF" distance={20} />
      <pointLight position={[6, 2, 2]} intensity={1.4} color="#00FF85" distance={18} />
      <pointLight position={[0, 0, -8]} intensity={1.2} color="#0047AB" distance={24} />
    </>
  );
}

/** Main Three.js world — orchestrates all cinematic scenes */
function CinematicWorld({ progress }: { progress: number }) {
  const N = cinematicScenes.length;
  const w = (i: number) => sceneWeight(progress, i, N);

  return (
    <>
      <CameraController progress={progress} />
      <CinematicLighting progress={progress} />

      {/* Persistent */}
      <WaterSurface />
      <MainParticles progress={progress} />

      {/* Scene 0: Nacimiento */}
      <WaterDrop weight={w(0)} />
      <WaterRipples weight={w(0) + w(1) * 0.3} />

      {/* Scene 1: Logo */}
      <OVILogo weight={w(1)} />

      {/* Scene 2: Industrial */}
      <IndustrialAssets weight={w(2)} />
      <SteamParticles weight={w(2) + w(3) * 0.4} />

      {/* Scene 3: OVI AI */}
      <AICore weight={w(3)} />

      {/* Scene 4: Ecosystem */}
      <EcosystemOrbit weight={w(4)} />
    </>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function HomeCinematicJourney({ hero }: HomeCinematicJourneyProps) {
  const journeyRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);
  const { scrollYProgress } = useScroll({
    target: journeyRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setProgress(Math.max(0, Math.min(1, v)));
  });

  const activeIndex = Math.min(
    cinematicScenes.length - 1,
    Math.floor(progress * cinematicScenes.length),
  );

  const activeScene = cinematicScenes[activeIndex];

  return (
    <section ref={journeyRef} className="relative h-[500vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Three.js canvas */}
        <div className="absolute inset-0">
          <ThreeCanvas className="h-full w-full">
            <color attach="background" args={["#02060E"]} />
            <fog attach="fog" args={["#02060E", 10, 28]} />
            <CinematicWorld progress={progress} />
            <SceneEnvironment preset="night" intensity={0.6} />
            <PostProcessing />
          </ThreeCanvas>
        </div>

        {/* Atmospheric overlays */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,196,255,0.1),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(0,255,133,0.07),transparent_50%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,14,0.3)_0%,transparent_25%,transparent_75%,rgba(2,6,14,0.5)_100%)]" />

        {/* Scene indicator — left vertical rail */}
        <div className="absolute top-1/2 left-6 z-20 flex -translate-y-1/2 flex-col items-center gap-3">
          {cinematicScenes.map((scene, i) => {
            const isActive = i === activeIndex;
            return (
              <div key={scene.id} className="flex items-center gap-2.5">
                <div
                  className={`h-px transition-all duration-700 ${isActive ? "w-8 bg-[var(--color-brand-primary)]" : "w-3 bg-[rgba(255,255,255,0.2)]"}`}
                />
                <div
                  className={`rounded-full transition-all duration-700 ${isActive ? "h-1.5 w-1.5 scale-150 bg-[var(--color-brand-primary)] shadow-[0_0_8px_var(--color-brand-primary)]" : "h-1 w-1 bg-[rgba(255,255,255,0.2)]"}`}
                />
              </div>
            );
          })}
        </div>

        {/* Scene counter — right side */}
        <div className="absolute top-1/2 right-6 z-20 -translate-y-1/2">
          <Text
            size="xs"
            className="font-mono tracking-[0.22em] text-[var(--color-text-tertiary)] uppercase"
          >
            {activeScene?.number} / 05
          </Text>
        </div>

        <Container className="relative z-10 flex h-full flex-col justify-between py-10">
          {/* Hero header */}
          <div className="pointer-events-auto mx-auto max-w-4xl text-center">
            <Badge variant="brand" size="lg">
              {hero.badge}
            </Badge>
            <Heading as="h1" size="6xl" gradient="brand" align="center" className="mt-6">
              {hero.title}
            </Heading>
            <Text size="lg" align="center" className="mx-auto mt-5 max-w-3xl text-balance">
              {hero.subtitle}
            </Text>
          </div>

          {/* Bottom: active scene + CTAs */}
          <div className="mx-auto w-full max-w-5xl space-y-5">
            {/* Cinematic scene narration */}
            <div className="glass pointer-events-auto rounded-2xl border border-[var(--color-border-default)] px-6 py-4">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <Text
                    size="xs"
                    className="tracking-[0.18em] text-[var(--color-brand-primary)] uppercase"
                  >
                    Escena {activeScene?.number}
                  </Text>
                  <Text weight="semibold" className="mt-0.5 text-[var(--color-text-primary)]">
                    {activeScene?.title}
                  </Text>
                  <Text size="sm" className="mt-1 text-[var(--color-text-secondary)]">
                    {activeScene?.tagline}
                  </Text>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1.5 pt-1">
                  <Text size="xs" className="text-[var(--color-text-tertiary)]">
                    {Math.round(progress * 100)}%
                  </Text>
                  <div className="h-0.5 w-20 rounded-full bg-[var(--color-border-default)]">
                    <div
                      className="h-full rounded-full bg-[var(--color-brand-primary)] transition-all duration-300"
                      style={{ width: `${progress * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Primary CTAs */}
            <div className="pointer-events-auto flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg">▶ Iniciar la Experiencia</Button>
              <Link href="/solutions">
                <Button variant="outline" size="lg">
                  Explorar Soluciones
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="ghost" size="lg">
                  Hablar con un Ingeniero
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center">
              <ChevronDown className="h-5 w-5 animate-bounce text-[var(--color-text-tertiary)]" />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
