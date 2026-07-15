"use client";

/**
 * OVI — Engineering Journey Experience
 * Experience Order 002: The Engineering Journey
 *
 * 7-scene cinematic scroll-driven experience that narrates how OVI resolves
 * industrial contamination challenges through Ingeniería en Limpieza.
 *
 * ─── SCENE MAP ────────────────────────────────────────────────────────────────
 *   01 — El Activo       → industrial asset is revealed, camera pulls back
 *   02 — El Problema     → contamination (grease, oil, sludge) becomes visible
 *   03 — OVI AI Scan     → holographic rings + sweep + analysis panel
 *   04 — Ingeniería      → camera enters the asset, interior view
 *   05 — Diagnóstico     → floating holographic diagnostic panel
 *   06 — La Solución     → animated solution flow diagram
 *   07 — Transformación  → cleaning particles rain down, asset returns to clean state
 * ──────────────────────────────────────────────────────────────────────────────
 */

import { useRef, useMemo, useState } from "react";
import type * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { ThreeCanvas } from "@three/components/ThreeCanvas";
import { PostProcessing } from "@three/components/PostProcessing";
import { SceneEnvironment } from "@three/components/SceneEnvironment";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SceneDefinition {
  readonly id: string;
  readonly number: string;
  readonly title: string;
  readonly tagline: string;
}

interface SectorDefinition {
  readonly id: string;
  readonly label: string;
  readonly contaminationType: string;
  readonly contaminationLevel: string;
  readonly operationalRisk: string;
  readonly environmentalImpact: string;
  readonly interior: string;
  readonly diagnosis: string;
  readonly recommendation: string;
  readonly difficulty: string;
  readonly estimatedTime: string;
}

// ─── Scene registry ──────────────────────────────────────────────────────────

const SCENES: readonly SceneDefinition[] = [
  {
    id: "s1-asset",
    number: "01",
    title: "El Activo",
    tagline: "Un activo industrial en operación.",
  },
  {
    id: "s2-contamination",
    number: "02",
    title: "El Problema",
    tagline: "La contaminación se hace visible.",
  },
  {
    id: "s3-scan",
    number: "03",
    title: "OVI AI",
    tagline: "El entorno cambia. El escaneo comienza.",
  },
  {
    id: "s4-interior",
    number: "04",
    title: "Ingeniería en Limpieza",
    tagline: "La cámara entra al activo.",
  },
  {
    id: "s5-panel",
    number: "05",
    title: "Diagnóstico",
    tagline: "El panel holográfico analiza el desafío.",
  },
  {
    id: "s6-solution",
    number: "06",
    title: "La Solución",
    tagline: "Del diagnóstico al resultado.",
  },
  {
    id: "s7-result",
    number: "07",
    title: "Transformación",
    tagline: "El activo vuelve a estar impecable.",
  },
] as const;

// ─── Sector registry (randomly selected on mount) ────────────────────────────

const SECTORS: readonly SectorDefinition[] = [
  {
    id: "truck",
    label: "Camión Recolector",
    contaminationType: "Grasa industrial · Residuos orgánicos",
    contaminationLevel: "Nivel 3 / Alto",
    operationalRisk: "Fallo mecánico · Contaminación cruzada",
    environmentalImpact: "Riesgo de derrame al suelo",
    interior: "Tolva hidráulica · Sistema de compactación",
    diagnosis: "Acumulación de grasa en sistema hidráulico y tolva",
    recommendation: "Protocolo HD-3 con desengrasante alcalino + presión térmica",
    difficulty: "Media-Alta",
    estimatedTime: "4–6 horas operativas",
  },
  {
    id: "bus",
    label: "Bus Urbano",
    contaminationType: "Aceite · Polvo · Partículas de combustión",
    contaminationLevel: "Nivel 2 / Moderado",
    operationalRisk: "Deterioro prematuro · Imagen operativa degradada",
    environmentalImpact: "Emisiones superficiales de hidrocarburos",
    interior: "Motor · Sistema de escape · Cabina",
    diagnosis: "Incrustación de hollín y aceite en tren motriz",
    recommendation: "Protocolo UT-2 con solvente + tratamiento neutro de cabina",
    difficulty: "Media",
    estimatedTime: "3–5 horas operativas",
  },
  {
    id: "plant",
    label: "Planta Industrial",
    contaminationType: "Incrustaciones minerales · Residuos de proceso",
    contaminationLevel: "Nivel 4 / Crítico",
    operationalRisk: "Parada de línea · Contaminación de producto",
    environmentalImpact: "Riesgo de vertido en efluentes",
    interior: "Línea de producción · Tanques · Ductos",
    diagnosis: "Incrustación severa en tuberías y superficies de proceso",
    recommendation: "Protocolo PI-4 con descalcificante ácido controlado + CIP integrado",
    difficulty: "Alta",
    estimatedTime: "8–12 horas operativas",
  },
  {
    id: "hospital",
    label: "Hospital",
    contaminationType: "Biofilm · Bacterias · Contaminación cruzada",
    contaminationLevel: "Nivel 5 / Máximo",
    operationalRisk: "Riesgo de infección nosocomial",
    environmentalImpact: "Diseminación de patógenos",
    interior: "Quirófano · UCI · Pasillos de alto tráfico",
    diagnosis: "Biofilm activo en superficies críticas de contacto",
    recommendation: "Protocolo HS-5 con desinfectante hospitalario + validación microbiológica",
    difficulty: "Máxima",
    estimatedTime: "2–3 horas por zona crítica",
  },
  {
    id: "energy",
    label: "Infraestructura Energética",
    contaminationType: "Lodo · Sedimentos · Corrosión activa",
    contaminationLevel: "Nivel 3 / Alto",
    operationalRisk: "Reducción de eficiencia · Riesgo de corrosión",
    environmentalImpact: "Potencial contaminación de acuíferos",
    interior: "Torres de refrigeración · Intercambiadores · Tanques",
    diagnosis: "Sedimentación y lodo en sistemas de refrigeración",
    recommendation: "Protocolo EI-3 con inhibidor de corrosión + tratamiento de agua industrial",
    difficulty: "Alta",
    estimatedTime: "6–10 horas operativas",
  },
] as const;

// ─── Solution flow steps ─────────────────────────────────────────────────────

const SOLUTION_STEPS = [
  { label: "Diagnóstico", color: "var(--color-brand-primary)" },
  { label: "Ingeniería", color: "var(--color-brand-primary)" },
  { label: "Protocolo", color: "var(--color-brand-accent)" },
  { label: "Producto OVI", color: "var(--color-brand-accent)" },
  { label: "Servicio recomendado", color: "var(--color-brand-primary)" },
  { label: "Resultado esperado", color: "#FFD700" },
] as const;

// ─── Utility ─────────────────────────────────────────────────────────────────

function sceneWeight(progress: number, index: number, total: number): number {
  const distance = Math.abs(progress * (total - 1) - index);
  return Math.max(0, 1 - distance);
}

// ─── Three.js: Camera Controller ─────────────────────────────────────────────

function JourneyCameraController({ progress }: { progress: number }) {
  const lookAt = useRef({ x: 0, y: 0, z: 0 });

  // 7 camera positions — one per scene
  const positions: [number, number, number][] = useMemo(
    () => [
      [0, 1.5, 9.5], // 01 — establishing, far
      [3.2, 0.9, 5.8], // 02 — side view, contamination visible
      [0, 2.6, 5.2], // 03 — slightly above, scanner view
      [0.2, 0.1, 1.6], // 04 — close-up interior
      [-2.8, 1.4, 5.5], // 05 — side, panel visible
      [0, 2.2, 7.8], // 06 — pulled back, full view
      [2.2, 1.3, 5.8], // 07 — reveal shot, clean
    ],
    [],
  );

  const lookTargets: [number, number, number][] = useMemo(
    () => [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0.3, 0],
      [0, 0.2, -0.5],
      [0, 0.4, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    [],
  );

  useFrame(({ camera }) => {
    const n = positions.length - 1;
    const raw = Math.min(progress * n, n - 0.001);
    const from = Math.floor(raw);
    const t = raw - from;
    const to = from + 1;

    const [fx, fy, fz] = positions[from];
    const [tx, ty, tz] = positions[to];
    camera.position.x += (fx + (tx - fx) * t - camera.position.x) * 0.032;
    camera.position.y += (fy + (ty - fy) * t - camera.position.y) * 0.032;
    camera.position.z += (fz + (tz - fz) * t - camera.position.z) * 0.032;

    const [flx, fly, flz] = lookTargets[from];
    const [tlx, tly, tlz] = lookTargets[to];
    const lx = flx + (tlx - flx) * t;
    const ly = fly + (tly - fly) * t;
    const lz = flz + (tlz - flz) * t;

    lookAt.current.x += (lx - lookAt.current.x) * 0.032;
    lookAt.current.y += (ly - lookAt.current.y) * 0.032;
    lookAt.current.z += (lz - lookAt.current.z) * 0.032;

    camera.lookAt(lookAt.current.x, lookAt.current.y, lookAt.current.z);
  });

  return null;
}

// ─── Three.js: Industrial Asset ──────────────────────────────────────────────

interface IndustrialAssetProps {
  weight: number;
  /** 0 = pristine, 1 = fully contaminated */
  contaminated: number;
  /** 0 = as-is, 1 = fully cleaned */
  cleaning: number;
}

function IndustrialAsset({ weight, contaminated, cleaning }: IndustrialAssetProps) {
  const groupRef = useRef<THREE.Group>(null);
  const cleanFactor = cleaning;

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.11) * 0.09;
    }
  });

  // Material params shift from dirty to clean
  const roughness = 0.88 - cleanFactor * 0.74;
  const metalness = 0.35 + cleanFactor * 0.52;
  const bodyColor = cleanFactor > 0.6 ? "#243545" : contaminated > 0.5 ? "#221508" : "#1A2A35";
  const cabColor = cleanFactor > 0.6 ? "#1A3345" : contaminated > 0.5 ? "#1A1008" : "#152030";
  const emissiveIntensity = cleanFactor * 0.45;

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Main body */}
      <mesh position={[0.3, 0, 0]}>
        <boxGeometry args={[3.8, 1.4, 1.8]} />
        <meshStandardMaterial
          color={bodyColor}
          metalness={metalness}
          roughness={roughness}
          transparent
          opacity={weight}
          emissive="#001A2A"
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>

      {/* Cab */}
      <mesh position={[-1.55, 0.62, 0]}>
        <boxGeometry args={[1.1, 0.96, 1.78]} />
        <meshStandardMaterial
          color={cabColor}
          metalness={metalness}
          roughness={roughness}
          transparent
          opacity={weight}
        />
      </mesh>

      {/* Windshield — faint cyan glow */}
      <mesh position={[-1.09, 0.7, 0]} rotation={[0, 0, Math.PI * 0.07]}>
        <boxGeometry args={[0.06, 0.65, 1.36]} />
        <meshStandardMaterial
          color="#00C4FF"
          emissive="#004466"
          emissiveIntensity={0.6 + cleanFactor * 0.8}
          transparent
          opacity={weight * (0.2 + cleanFactor * 0.25)}
        />
      </mesh>

      {/* Rear collection / cargo box */}
      <mesh position={[1.82, 0.18, 0]}>
        <boxGeometry args={[1.2, 1.72, 1.8]} />
        <meshStandardMaterial
          color={cleanFactor > 0.6 ? "#1E2E3E" : contaminated > 0.5 ? "#160E04" : "#15202A"}
          metalness={metalness}
          roughness={roughness}
          transparent
          opacity={weight}
        />
      </mesh>

      {/* Wheels — 4 */}
      {(
        [
          [-1.2, -0.85, 1.02],
          [-1.2, -0.85, -1.02],
          [1.2, -0.85, 1.02],
          [1.2, -0.85, -1.02],
        ] as [number, number, number][]
      ).map((pos, i) => (
        <mesh key={i} position={pos} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.38, 0.38, 0.28, 24]} />
          <meshStandardMaterial
            color={cleanFactor > 0.5 ? "#1A1A1A" : "#0A0800"}
            metalness={0.2}
            roughness={0.95}
            transparent
            opacity={weight}
          />
        </mesh>
      ))}

      {/* Exhaust stack */}
      <mesh position={[-1.28, 1.06, 0.74]}>
        <cylinderGeometry args={[0.06, 0.08, 0.82, 12]} />
        <meshStandardMaterial
          color="#2A2A2A"
          metalness={0.82}
          roughness={0.28}
          transparent
          opacity={weight}
        />
      </mesh>

      {/* Headlights — glow when clean */}
      {(
        [
          [-2.02, 0.35, 0.55],
          [-2.02, 0.35, -0.55],
        ] as [number, number, number][]
      ).map((pos, i) => (
        <mesh key={i} position={pos}>
          <boxGeometry args={[0.05, 0.22, 0.28]} />
          <meshStandardMaterial
            color="#FFFBE0"
            emissive="#FFFBE0"
            emissiveIntensity={cleanFactor * 2.5}
            transparent
            opacity={weight * (0.3 + cleanFactor * 0.7)}
          />
        </mesh>
      ))}

      {/* Ground reflection plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.22, 0]}>
        <planeGeometry args={[14, 9]} />
        <meshStandardMaterial
          color="#030508"
          metalness={0.72}
          roughness={0.18}
          transparent
          opacity={weight * 0.42}
        />
      </mesh>
    </group>
  );
}

// ─── Three.js: Contamination Cloud ───────────────────────────────────────────

function ContaminationCloud({ weight }: { weight: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 700;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 5.8;
      pos[i3 + 1] = (Math.random() - 0.5) * 2.4;
      pos[i3 + 2] = (Math.random() - 0.5) * 2.8;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = clock.elapsedTime * 0.024;
    (pointsRef.current.material as THREE.PointsMaterial).opacity = weight * 0.52;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.048} color="#4A2A08" transparent opacity={0} depthWrite={false} />
    </points>
  );
}

// ─── Three.js: Holographic Scan System ───────────────────────────────────────

function HolographicScan({ weight }: { weight: number }) {
  const RING_COUNT = 8;
  const ringRefs = useRef<(THREE.Mesh | null)[]>([]);
  const sweepRef = useRef<THREE.Mesh>(null);
  const boundingBoxRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    // Expanding scan rings
    ringRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const phase = (t * 0.36 + i * (1 / RING_COUNT)) % 1;
      mesh.scale.setScalar(0.28 + phase * 7.5);
      (mesh.material as THREE.MeshStandardMaterial).opacity =
        weight * Math.max(0, 0.65 - phase * 0.65) * 0.68;
    });

    // Vertical sweep plane
    if (sweepRef.current) {
      sweepRef.current.position.y = -1.6 + ((t * 0.38) % 1) * 4.2;
      (sweepRef.current.material as THREE.MeshStandardMaterial).opacity = weight * 0.16;
    }

    // Wireframe bounding box
    if (boundingBoxRef.current) {
      (boundingBoxRef.current.material as THREE.MeshStandardMaterial).opacity = weight * 0.1;
    }
  });

  return (
    <group>
      {/* Expanding rings in XZ plane */}
      <group position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        {Array.from({ length: RING_COUNT }, (_, i) => (
          <mesh
            key={i}
            ref={(el) => {
              ringRefs.current[i] = el;
            }}
          >
            <ringGeometry args={[0.94, 1.0, 80]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#00FF85" : "#00C4FF"}
              emissive={i % 2 === 0 ? "#00FF85" : "#00C4FF"}
              emissiveIntensity={2.2}
              transparent
              opacity={0}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>

      {/* Horizontal sweep plane */}
      <mesh ref={sweepRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.6, 0]}>
        <planeGeometry args={[13, 13]} />
        <meshStandardMaterial
          color="#00FF85"
          emissive="#00FF85"
          emissiveIntensity={1.2}
          transparent
          opacity={0}
          depthWrite={false}
          side={2}
        />
      </mesh>

      {/* Wireframe bounding box */}
      <mesh ref={boundingBoxRef}>
        <boxGeometry args={[6, 2.6, 2.6]} />
        <meshStandardMaterial
          color="#00C4FF"
          emissive="#00C4FF"
          emissiveIntensity={1}
          wireframe
          transparent
          opacity={0}
        />
      </mesh>
    </group>
  );
}

// ─── Three.js: Water Cleaning Effect ─────────────────────────────────────────

function WaterCleaningEffect({ weight }: { weight: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 550;

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 6;
      positions[i3 + 1] = 3.5 + Math.random() * 3;
      positions[i3 + 2] = (Math.random() - 0.5) * 3.5;
      velocities[i3] = (Math.random() - 0.5) * 0.003;
      velocities[i3 + 1] = -(0.016 + Math.random() * 0.016);
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
      if (positions[i3 + 1] < -1.6) {
        positions[i3] = (Math.random() - 0.5) * 6;
        positions[i3 + 1] = 3.5;
        positions[i3 + 2] = (Math.random() - 0.5) * 3.5;
      }
    }
    attr.needsUpdate = true;
    (pointsRef.current.material as THREE.PointsMaterial).opacity = weight * 0.72;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.042} color="#90DCFF" transparent opacity={0} depthWrite={false} />
    </points>
  );
}

function FoamCleaningEffect({ weight }: { weight: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 380;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 5.2;
      pos[i3 + 1] = -1.05 + Math.random() * 0.9;
      pos[i3 + 2] = (Math.random() - 0.5) * 2.6;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    pointsRef.current.position.y = Math.sin(clock.elapsedTime * 0.5) * 0.08;
    pointsRef.current.rotation.y = clock.elapsedTime * 0.04;
    (pointsRef.current.material as THREE.PointsMaterial).opacity = weight * 0.38;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.09} color="#E7F7FF" transparent opacity={0} depthWrite={false} />
    </points>
  );
}

function VaporCleaningEffect({ weight }: { weight: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 320;

  const { positions, drift } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const drift = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 4.8;
      positions[i3 + 1] = -0.8 + Math.random() * 2.4;
      positions[i3 + 2] = (Math.random() - 0.5) * 2.4;
      drift[i3] = (Math.random() - 0.5) * 0.0025;
      drift[i3 + 1] = 0.004 + Math.random() * 0.006;
      drift[i3 + 2] = (Math.random() - 0.5) * 0.0015;
    }
    return { positions, drift };
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current?.geometry.attributes.position) return;
    const attr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const dt = Math.min(delta * 60, 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] += drift[i3] * dt;
      positions[i3 + 1] += drift[i3 + 1] * dt;
      positions[i3 + 2] += drift[i3 + 2] * dt;

      if (positions[i3 + 1] > 2.1) {
        positions[i3] = (Math.random() - 0.5) * 4.8;
        positions[i3 + 1] = -0.8;
        positions[i3 + 2] = (Math.random() - 0.5) * 2.4;
      }
    }
    attr.needsUpdate = true;
    (pointsRef.current.material as THREE.PointsMaterial).opacity = weight * 0.24;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.12} color="#BFEAFF" transparent opacity={0} depthWrite={false} />
    </points>
  );
}

// ─── Three.js: Ambient Particle Field ────────────────────────────────────────

function AmbientParticles({ progress }: { progress: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 1400;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4.5 + Math.random() * 6.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * 3.2;
      const i3 = i * 3;
      pos[i3] = Math.cos(theta) * r;
      pos[i3 + 1] = phi;
      pos[i3 + 2] = Math.sin(theta) * r;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * (0.028 + progress * 0.038);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#00C4FF" transparent opacity={0.2} depthWrite={false} />
    </points>
  );
}

// ─── Three.js: Scene World (top-level R3F component) ─────────────────────────

function JourneyWorld({ progress }: { progress: number; sector: SectorDefinition }) {
  const N = 7;
  const w = (index: number) => sceneWeight(progress, index, N);

  const w2 = w(1); // contamination
  const w3 = w(2); // scan
  const w6 = w(6); // transformation

  // Contamination presence peaks at scene 2, fades during cleaning (scene 7)
  const contaminationWeight = Math.max(
    0,
    Math.min(1, (w2 + w(3) * 0.7 + w(4) * 0.5 + w(5) * 0.35) * 1.3) * (1 - w6 * 1.2),
  );

  // Asset is present from scene 1 onward
  const assetWeight = Math.min(1, w(0) + w2 + w(2) + w(3) + w(4) + w(5) + w6);

  // Cleaning effect drives material restoration
  const cleanFactor = w6;

  return (
    <>
      <JourneyCameraController progress={progress} />
      <AmbientParticles progress={progress} />

      {/* Industrial asset — always present once revealed */}
      <IndustrialAsset
        weight={Math.min(1, assetWeight)}
        contaminated={contaminationWeight}
        cleaning={cleanFactor}
      />

      {/* Contamination cloud — scenes 2–6 */}
      <ContaminationCloud weight={contaminationWeight} />

      {/* Holographic scan — scene 3 */}
      <HolographicScan weight={w3} />

      {/* Water + foam + vapor cleaning — scene 7 */}
      <WaterCleaningEffect weight={w6} />
      <FoamCleaningEffect weight={w6} />
      <VaporCleaningEffect weight={w6} />

      {/* Dynamic scene lighting */}
      <pointLight position={[0, 3.5, 3]} intensity={w3 * 3.5} color="#00FF85" distance={14} />
      <pointLight position={[-1, 2, 4]} intensity={w6 * 2.5} color="#90DCFF" distance={12} />
    </>
  );
}

// ─── CSS Overlay: Scan Analysis Panel (Scene 3) ───────────────────────────────

function ScanAnalysisPanel({ visible, sector }: { visible: boolean; sector: SectorDefinition }) {
  const rows = [
    { label: "ACTIVO", value: sector.label },
    { label: "TIPO DE SUCIEDAD", value: sector.contaminationType },
    { label: "NIVEL DE CONTAMINACIÓN", value: sector.contaminationLevel },
    { label: "RIESGO OPERATIVO", value: sector.operationalRisk },
    { label: "IMPACTO AMBIENTAL", value: sector.environmentalImpact },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 36 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 36 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="absolute top-1/2 right-8 z-20 w-72 -translate-y-1/2"
        >
          <div className="relative overflow-hidden rounded-lg border border-[rgba(0,255,133,0.28)] bg-[rgba(0,8,6,0.88)] p-5 backdrop-blur-sm">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 h-3 w-3 border-t border-l border-[var(--color-brand-accent)]" />
            <div className="absolute top-0 right-0 h-3 w-3 border-t border-r border-[var(--color-brand-accent)]" />
            <div className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-[var(--color-brand-accent)]" />
            <div className="absolute right-0 bottom-0 h-3 w-3 border-r border-b border-[var(--color-brand-accent)]" />

            {/* Header */}
            <div className="mb-4 flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-brand-accent)]" />
              <span className="font-mono text-[9px] tracking-[0.2em] text-[var(--color-brand-accent)] uppercase">
                OVI AI · ANÁLISIS ACTIVO
              </span>
            </div>

            {/* Data rows */}
            {rows.map(({ label, value }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.2 }}
                className="mb-2.5 border-b border-[rgba(255,255,255,0.05)] pb-2.5 last:mb-0 last:border-0 last:pb-0"
              >
                <div className="font-mono text-[8px] tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
                  {label}
                </div>
                <div className="mt-0.5 font-mono text-xs leading-snug text-[var(--color-text-primary)]">
                  {value}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── CSS Overlay: Interior Engineering Panel (Scene 4) ────────────────────────

function InteriorPanel({ visible, sector }: { visible: boolean; sector: SectorDefinition }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute bottom-28 left-8 z-20"
        >
          <div className="rounded-md border border-[rgba(0,196,255,0.2)] bg-[rgba(2,6,18,0.82)] px-5 py-4 backdrop-blur-sm">
            <div className="mb-2 font-mono text-[8px] tracking-[0.22em] text-[var(--color-brand-primary)] uppercase">
              INGENIERÍA EN LIMPIEZA · INTERIOR
            </div>
            <div className="font-mono text-sm text-[var(--color-text-primary)]">
              {sector.interior}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── CSS Overlay: Holographic Diagnostic Panel (Scene 5) ─────────────────────

function HolographicDiagnosticPanel({
  visible,
  sector,
}: {
  visible: boolean;
  sector: SectorDefinition;
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 24 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 z-20 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 px-4"
        >
          <div className="relative overflow-hidden rounded-xl border border-[rgba(0,196,255,0.22)] bg-[rgba(2,6,18,0.92)] p-7 backdrop-blur-md">
            {/* Animated scan line */}
            <motion.div
              className="pointer-events-none absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--color-brand-primary)] to-transparent"
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
            />

            {/* Corner accents */}
            <div className="absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-[var(--color-brand-primary)]" />
            <div className="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-[var(--color-brand-primary)]" />
            <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-[var(--color-brand-primary)]" />
            <div className="absolute right-0 bottom-0 h-4 w-4 border-r-2 border-b-2 border-[var(--color-brand-primary)]" />

            <div className="mb-5 flex items-center justify-between">
              <span className="font-mono text-[9px] tracking-[0.2em] text-[var(--color-brand-primary)] uppercase">
                PANEL DIAGNÓSTICO · OVI ENGINEERING
              </span>
              <div className="flex gap-1.5">
                <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-brand-accent)]" />
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-brand-primary)]" />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-4"
            >
              <div className="mb-1 font-mono text-[8px] tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
                DIAGNÓSTICO
              </div>
              <div className="text-sm leading-relaxed font-medium text-[var(--color-text-primary)]">
                {sector.diagnosis}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 }}
              className="mb-5"
            >
              <div className="mb-1 font-mono text-[8px] tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
                RECOMENDACIÓN
              </div>
              <div className="text-sm leading-relaxed font-medium text-[var(--color-brand-accent)]">
                {sector.recommendation}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 gap-4 border-t border-[rgba(255,255,255,0.06)] pt-4"
            >
              <div>
                <div className="mb-1 font-mono text-[8px] tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
                  NIVEL DE DIFICULTAD
                </div>
                <div className="font-mono text-sm text-[var(--color-brand-primary)]">
                  {sector.difficulty}
                </div>
              </div>
              <div>
                <div className="mb-1 font-mono text-[8px] tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
                  TIEMPO ESTIMADO
                </div>
                <div className="font-mono text-sm text-[var(--color-text-primary)]">
                  {sector.estimatedTime}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── CSS Overlay: Solution Flow (Scene 6) ─────────────────────────────────────

function SolutionFlowPanel({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 z-20 flex items-center justify-center"
        >
          <div className="w-full max-w-xs px-4">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6 text-center"
            >
              <span className="font-mono text-[9px] tracking-[0.22em] text-[var(--color-brand-primary)] uppercase">
                FLUJO DE SOLUCIÓN · OVI ENGINEERING
              </span>
            </motion.div>

            <div className="flex flex-col items-center">
              {SOLUTION_STEPS.map((step, i) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.12 + 0.2, duration: 0.45 }}
                  className="flex flex-col items-center"
                >
                  <div
                    className="rounded-lg border px-8 py-2.5 text-center"
                    style={{
                      borderColor: `color-mix(in srgb, ${step.color} 32%, transparent)`,
                      backgroundColor: `color-mix(in srgb, ${step.color} 8%, transparent)`,
                    }}
                  >
                    <span
                      className="font-mono text-sm font-semibold tracking-wide"
                      style={{ color: step.color }}
                    >
                      {step.label}
                    </span>
                  </div>
                  {i < SOLUTION_STEPS.length - 1 && (
                    <motion.div
                      className="my-1.5 flex flex-col items-center gap-0.5"
                      initial={{ opacity: 0, scaleY: 0 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      transition={{ delay: i * 0.12 + 0.38, duration: 0.3 }}
                    >
                      <div
                        className="h-3 w-px"
                        style={{
                          backgroundColor: `color-mix(in srgb, ${step.color} 35%, transparent)`,
                        }}
                      />
                      <div
                        className="h-1 w-1 rotate-45 border-r border-b"
                        style={{
                          borderColor: `color-mix(in srgb, ${step.color} 35%, transparent)`,
                        }}
                      />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── CSS Overlay: Transformation Result (Scene 7) ────────────────────────────

function TransformationResult({ visible, sector }: { visible: boolean; sector: SectorDefinition }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="absolute bottom-24 left-1/2 z-20 -translate-x-1/2 text-center"
        >
          <motion.div
            className="mb-3 font-mono text-[9px] tracking-[0.28em] text-[var(--color-brand-accent)] uppercase"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          >
            TRANSFORMACIÓN COMPLETADA
          </motion.div>
          <div className="font-mono text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">
            {sector.label}
          </div>
          <div className="mt-1.5 text-sm text-[var(--color-text-secondary)]">
            Impecable. Listo para operar.
          </div>

          {/* Ecosystem connection hooks */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-6 flex items-center justify-center gap-3"
          >
            {["OVI Laboratorio", "OVI AI", "OVI Catálogo", "OVI OS"].map((label) => (
              <div
                key={label}
                className="rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.4)] px-3 py-1 backdrop-blur-sm"
              >
                <span className="font-mono text-[9px] tracking-[0.14em] text-[var(--color-text-tertiary)] uppercase">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function EngineeringJourneyExperience() {
  const containerRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  // Random sector selection on mount — stable via useState initializer
  const [sector] = useState<SectorDefinition>(
    () => SECTORS[Math.floor(Math.random() * SECTORS.length)]!,
  );

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setProgress(Math.max(0, Math.min(1, v)));
  });

  const N = SCENES.length;
  const activeIndex = Math.min(N - 1, Math.floor(progress * N));
  const activeScene = SCENES[activeIndex];

  // Panel visibility — based on active scene index
  const isScan = activeIndex === 2;
  const isInterior = activeIndex === 3;
  const isDiagnostic = activeIndex === 4;
  const isSolution = activeIndex === 5;
  const isResult = activeIndex === 6;

  return (
    <section
      ref={containerRef}
      className="relative h-[700vh]"
      aria-label="Recorrido de Ingeniería OVI — Orden de Experiencia 002"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Three.js Canvas */}
        <div className="absolute inset-0">
          <ThreeCanvas className="h-full w-full">
            <color attach="background" args={["#020406"]} />
            <fog attach="fog" args={["#020406", 14, 32]} />
            <JourneyWorld progress={progress} sector={sector} />
            <SceneEnvironment preset="night" intensity={0.45} />
            <PostProcessing />
          </ThreeCanvas>
        </div>

        {/* Atmospheric gradients */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,196,255,0.05),transparent_58%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,4,6,0.38)_0%,transparent_22%,transparent_78%,rgba(2,4,6,0.65)_100%)]" />

        {/* Scan overlay — green tint during OVI AI scene */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          animate={{ opacity: isScan ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,255,133,0.04) 0%, transparent 65%)",
          }}
        />

        {/* Scene indicator — left rail */}
        <div className="absolute top-1/2 left-6 z-20 flex -translate-y-1/2 flex-col items-center gap-3">
          {SCENES.map((scene, i) => {
            const isActive = i === activeIndex;
            return (
              <div key={scene.id} className="flex items-center gap-2.5">
                <div
                  className={`h-px transition-all duration-700 ${
                    isActive
                      ? "w-8 bg-[var(--color-brand-primary)]"
                      : "w-3 bg-[rgba(255,255,255,0.14)]"
                  }`}
                />
                <div
                  className={`rounded-full transition-all duration-700 ${
                    isActive
                      ? "h-1.5 w-1.5 scale-150 bg-[var(--color-brand-primary)] shadow-[0_0_8px_var(--color-brand-primary)]"
                      : "h-1 w-1 bg-[rgba(255,255,255,0.14)]"
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Scene counter — right rail */}
        <div className="absolute top-1/2 right-6 z-20 -translate-y-1/2">
          <div className="font-mono text-xs tracking-[0.22em] text-[var(--color-text-tertiary)] uppercase">
            {activeScene?.number} / 07
          </div>
        </div>

        {/* Top header */}
        <div className="absolute top-8 left-1/2 z-20 -translate-x-1/2 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScene?.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45 }}
            >
              <div className="mb-1 font-mono text-[8px] tracking-[0.3em] text-[var(--color-brand-primary)] uppercase">
                EXPERIENCIA OVI · EL RECORRIDO DE INGENIERÍA
              </div>
              <div className="text-base font-semibold tracking-wide text-[var(--color-text-primary)]">
                {activeScene?.title}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Active sector badge */}
        <div className="absolute top-8 right-8 z-20">
          <div className="rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.48)] px-3 py-1 backdrop-blur-sm">
            <span className="font-mono text-[8px] tracking-[0.18em] text-[var(--color-text-secondary)] uppercase">
              {sector.label}
            </span>
          </div>
        </div>

        {/* Bottom scene tagline */}
        <div className="absolute bottom-12 left-1/2 z-20 -translate-x-1/2 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScene?.id + "-tag"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.45 }}
            >
              <div className="text-sm text-[var(--color-text-secondary)]">
                {activeScene?.tagline}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Conditional scene overlays ── */}

        {/* Scene 3 — OVI AI Scan Analysis */}
        <ScanAnalysisPanel visible={isScan} sector={sector} />

        {/* Scene 4 — Interior Engineering */}
        <InteriorPanel visible={isInterior} sector={sector} />

        {/* Scene 5 — Holographic Diagnostic */}
        <HolographicDiagnosticPanel visible={isDiagnostic} sector={sector} />

        {/* Scene 6 — Solution Flow */}
        <SolutionFlowPanel visible={isSolution} />

        {/* Scene 7 — Transformation Result */}
        <TransformationResult visible={isResult} sector={sector} />
      </div>
    </section>
  );
}
