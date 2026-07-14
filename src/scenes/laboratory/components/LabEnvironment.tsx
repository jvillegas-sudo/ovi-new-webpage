/**
 * LabEnvironment
 *
 * The architectural shell of the digital laboratory:
 *   - Reflective dark floor (custom shader, materialises on scroll)
 *   - Vertical light pillars arranged in two rows (InstancedMesh)
 *   - Glowing pillar bases / caps (InstancedMesh rings)
 *   - Flanking glass panels (MeshPhysicalMaterial)
 *   - Faint ceiling grid (simple plane, very low opacity)
 *
 * Everything fades in during scroll 0 → 0.20.
 */

"use client";

import { useEffect, useMemo, useRef } from "react";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { createFloorMaterial } from "@/scenes/laboratory/shaders/FloorMaterial";
import { createGlassMaterial } from "@/scenes/laboratory/shaders/GlassMaterial";

// ---- pillar layout ---------------------------------------------------------

/** Pillar positions — two symmetric rows flanking the central aisle. */
function buildPillarMatrices(): THREE.Matrix4[] {
  const matrices: THREE.Matrix4[] = [];
  const mat = new THREE.Matrix4();

  // 6 pillars per side, spaced evenly from z=-6 to z=4
  const zPositions = [-6, -4.5, -3, -1.5, 0, 1.5, 3, 4.5];
  const xLeft = -5.8;
  const xRight = 5.8;

  zPositions.forEach((z) => {
    // Left pillar
    mat.makeTranslation(xLeft, 1.2, z);
    matrices.push(mat.clone());
    // Right pillar
    mat.makeTranslation(xRight, 1.2, z);
    matrices.push(mat.clone());
  });

  return matrices;
}

// ---- glass panel layout ----------------------------------------------------

const PANEL_DEFS: { position: [number, number, number]; rotY: number }[] = [
  { position: [-6.4, 0.8, -1], rotY: Math.PI / 2 },
  { position: [-6.4, 0.8, 3], rotY: Math.PI / 2 },
  { position: [6.4, 0.8, -1], rotY: -Math.PI / 2 },
  { position: [6.4, 0.8, 3], rotY: -Math.PI / 2 },
  { position: [-6.4, 0.8, -5], rotY: Math.PI / 2 },
  { position: [6.4, 0.8, -5], rotY: -Math.PI / 2 },
];

// ---- component -------------------------------------------------------------

type Props = {
  scrollRef: React.MutableRefObject<number>;
};

export function LabEnvironment({ scrollRef }: Props) {
  // ---- materials -----------------------------------------------------------

  const floorMat = useMemo(() => createFloorMaterial(), []);
  const glassMat = useMemo(() => createGlassMaterial(), []);

  // Emissive pillar material
  const pillarMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#080e1a"),
        emissive: new THREE.Color("#0a2040"),
        emissiveIntensity: 0.6,
        metalness: 0.85,
        roughness: 0.3,
      }),
    [],
  );

  // Glowing ring accent material
  const ringMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#3DD2FF"),
        emissive: new THREE.Color("#3DD2FF"),
        emissiveIntensity: 2.5,
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
      }),
    [],
  );

  // ---- geometries ----------------------------------------------------------

  const floorGeo = useMemo(() => {
    const g = new THREE.PlaneGeometry(32, 28, 64, 56);
    g.rotateX(-Math.PI / 2);
    return g;
  }, []);

  const pillarGeo = useMemo(
    () => new THREE.CylinderGeometry(0.035, 0.045, 4.8, 8, 1),
    [],
  );

  const ringGeo = useMemo(
    () => new THREE.TorusGeometry(0.18, 0.012, 8, 32),
    [],
  );

  const panelGeo = useMemo(
    () => new THREE.PlaneGeometry(3.2, 4.0),
    [],
  );

  const ceilingGeo = useMemo(() => {
    const g = new THREE.PlaneGeometry(24, 20, 16, 14);
    g.rotateX(Math.PI / 2);
    return g;
  }, []);

  // ---- instanced meshes ----------------------------------------------------

  const pillarRef = useRef<THREE.InstancedMesh>(null);
  const ringRef = useRef<THREE.InstancedMesh>(null);

  const pillarMatrices = useMemo(() => buildPillarMatrices(), []);

  useEffect(() => {
    if (!pillarRef.current || !ringRef.current) return;
    pillarMatrices.forEach((m, i) => {
      pillarRef.current!.setMatrixAt(i, m);

      // Ring: positioned at top of each pillar (+2.4 on y)
      const ringM = m.clone();
      const rPos = new THREE.Vector3();
      rPos.setFromMatrixPosition(ringM);
      rPos.y += 2.4;
      const ringMatrix = new THREE.Matrix4();
      ringMatrix.makeRotationX(Math.PI / 2);
      ringMatrix.setPosition(rPos);
      ringRef.current!.setMatrixAt(i, ringMatrix);
    });
    pillarRef.current.instanceMatrix.needsUpdate = true;
    ringRef.current.instanceMatrix.needsUpdate = true;
  }, [pillarMatrices]);

  // ---- per-frame updates ---------------------------------------------------

  const envOpacityRef = useRef(0);

  useFrame((_, delta) => {
    const p = scrollRef.current;

    // Environment materialises during the first 20% of scroll
    const targetReveal = THREE.MathUtils.clamp(p / 0.20, 0, 1);
    envOpacityRef.current = THREE.MathUtils.lerp(
      envOpacityRef.current,
      targetReveal,
      delta * 1.5,
    );
    const rev = envOpacityRef.current;

    floorMat.uniforms.uTime.value += delta;
    floorMat.uniforms.uReveal.value = rev;

    // Fade glass and ring opacity
    glassMat.opacity = rev * 0.12;
    ringMat.emissiveIntensity = rev * 2.5;
    ringMat.opacity = rev * 0.9;
  });

  // ---- render --------------------------------------------------------------

  const count = pillarMatrices.length;

  return (
    <group>
      {/* Floor */}
      <mesh geometry={floorGeo} material={floorMat} receiveShadow />

      {/* Faint ceiling plane */}
      <mesh
        geometry={ceilingGeo}
        position={[0, 3.6, -1]}
        receiveShadow={false}
      >
        <meshStandardMaterial
          color="#060c18"
          transparent
          opacity={0.6}
          side={THREE.FrontSide}
          depthWrite={false}
        />
      </mesh>

      {/* Vertical light pillars */}
      <instancedMesh
        ref={pillarRef}
        args={[pillarGeo, pillarMat, count]}
        frustumCulled={false}
      />

      {/* Pillar top rings */}
      <instancedMesh
        ref={ringRef}
        args={[ringGeo, ringMat, count]}
        frustumCulled={false}
      />

      {/* Flanking glass panels */}
      {PANEL_DEFS.map(({ position, rotY }, i) => (
        <mesh
          key={i}
          geometry={panelGeo}
          material={glassMat}
          position={position}
          rotation={[0, rotY, 0]}
        />
      ))}
    </group>
  );
}
