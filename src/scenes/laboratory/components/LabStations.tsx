/**
 * LabStations
 *
 * Eight interactive research stations spread across the lab floor.
 * Each station consists of:
 *   - A low cylindrical base platform
 *   - A cluster of equipment boxes (instanced, scale randomised)
 *   - A floating hologram panel above the equipment
 *   - A colour-coded indicator light on the platform edge
 *
 * Interaction:
 *   - Pointer enter/leave drives hover state → hologram brightens
 *   - Hover state is also written to `hoverRef` (shared with the DOM overlay)
 *
 * Activation:
 *   - Stations appear sequentially as scroll progress passes their
 *     `activationAt` threshold.
 */

"use client";

import { useMemo, useRef, useState } from "react";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { STATIONS } from "@/scenes/laboratory/data/stations";
import { createHologramMaterial } from "@/scenes/laboratory/shaders/HologramMaterial";

type Props = {
  scrollRef: React.MutableRefObject<number>;
  /** Written to when a station is hovered – index or -1 for none. */
  hoverRef: React.MutableRefObject<number>;
};

// ---- shared geometries (created once) ------------------------------------

const BASE_GEO = new THREE.CylinderGeometry(0.55, 0.58, 0.12, 32, 1);
const LIGHT_GEO = new THREE.SphereGeometry(0.045, 12, 12);
const HOLOGRAM_GEO = new THREE.PlaneGeometry(0.95, 0.65);

// Equipment box geometries (4 variants)
const BOX_GEOS = [
  new THREE.BoxGeometry(0.18, 0.22, 0.14),
  new THREE.BoxGeometry(0.14, 0.16, 0.12),
  new THREE.BoxGeometry(0.22, 0.12, 0.16),
  new THREE.BoxGeometry(0.10, 0.28, 0.10),
];

// ---- single station component -------------------------------------------

type StationProps = {
  index: number;
  scrollRef: React.MutableRefObject<number>;
  hoverRef: React.MutableRefObject<number>;
};

function LabStation({ index, scrollRef, hoverRef }: StationProps) {
  const station = STATIONS[index];

  const [hovered, setHovered] = useState(false);

  // Activation and hover refs for smooth animation
  const activationRef = useRef(0);
  const hoverStrengthRef = useRef(0);

  // Materials
  const baseMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(station?.color ?? "#0a1525"),
        metalness: 0.8,
        roughness: 0.4,
        emissive: new THREE.Color(station?.color ?? "#000000"),
        emissiveIntensity: 0,
      }),
    [station?.color],
  );

  const lightMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(station?.color ?? "#3DD2FF"),
        emissive: new THREE.Color(station?.color ?? "#3DD2FF"),
        emissiveIntensity: 0,
        transparent: true,
        opacity: 0,
      }),
    [station?.color],
  );

  const equipMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#0d1a2e"),
        metalness: 0.9,
        roughness: 0.25,
        emissive: new THREE.Color(station?.color ?? "#000000"),
        emissiveIntensity: 0,
      }),
    [station?.color],
  );

  const hologramMat = useMemo(
    () => createHologramMaterial(station?.color ?? "#3DD2FF", station?.vizType ?? "wave"),
    [station?.color, station?.vizType],
  );

  // Equipment box positions (deterministic per station)
  const equipBoxes: { geo: THREE.BoxGeometry; pos: [number, number, number] }[] =
    useMemo(() => {
      const seed = index * 7919;
      const pseudo = (n: number) => Math.abs(Math.sin(seed * (n + 1) * 12.9898)) % 1;
      return [
        {
          geo: BOX_GEOS[index % 4],
          pos: [pseudo(0) * 0.5 - 0.25, 0.12 + pseudo(1) * 0.1, pseudo(2) * 0.5 - 0.25],
        },
        {
          geo: BOX_GEOS[(index + 1) % 4],
          pos: [pseudo(3) * 0.5 - 0.25, 0.08 + pseudo(4) * 0.1, pseudo(5) * 0.5 - 0.25],
        },
        {
          geo: BOX_GEOS[(index + 2) % 4],
          pos: [pseudo(6) * 0.4 - 0.2, 0.06 + pseudo(7) * 0.12, pseudo(8) * 0.4 - 0.2],
        },
      ];
    }, [index]);

  useFrame((_, delta) => {
    if (!station) return;

    const p = scrollRef.current;

    // Compute activation
    const targetActivation = p >= station.activationAt ? 1 : 0;
    activationRef.current = THREE.MathUtils.lerp(
      activationRef.current,
      targetActivation,
      delta * 2,
    );
    const act = activationRef.current;

    // Hover
    const targetHover = hovered ? 1 : 0;
    hoverStrengthRef.current = THREE.MathUtils.lerp(
      hoverStrengthRef.current,
      targetHover,
      delta * 8,
    );
    const hov = hoverStrengthRef.current;

    // Write hover to shared ref
    if (hov > 0.05) {
      hoverRef.current = index;
    } else if (hoverRef.current === index) {
      hoverRef.current = -1;
    }

    // Drive materials
    baseMat.emissiveIntensity = act * 0.25 + hov * 0.2;
    lightMat.emissiveIntensity = act * 2.5 + hov * 1.5;
    lightMat.opacity = act * 0.9;
    equipMat.emissiveIntensity = act * 0.18 + hov * 0.15;

    hologramMat.uniforms.uTime.value += delta;
    hologramMat.uniforms.uActivation.value = act;
    hologramMat.uniforms.uHover.value = hov;
  });

  if (!station) return null;

  const [bx, by, bz] = station.position;
  const baseY = by + 0.06;

  return (
    <group
      position={[bx, baseY, bz]}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Platform base */}
      <mesh geometry={BASE_GEO} material={baseMat} />

      {/* Indicator light on front edge */}
      <mesh
        geometry={LIGHT_GEO}
        material={lightMat}
        position={[0.4, 0.1, 0]}
      />

      {/* Equipment cluster (static, relative to base top) */}
      {equipBoxes.map((box, bi) => (
        <mesh
          key={bi}
          geometry={box.geo}
          material={equipMat}
          position={[box.pos[0], box.pos[1] + 0.06, box.pos[2]]}
        />
      ))}

      {/* Hologram panel floating above */}
      <mesh
        geometry={HOLOGRAM_GEO}
        material={hologramMat}
        position={[0, 0.9, 0]}
        rotation={[0, 0, 0]}
      />

      {/* Hologram back face (mirrored) */}
      <mesh
        geometry={HOLOGRAM_GEO}
        material={hologramMat}
        position={[0, 0.9, 0]}
        rotation={[0, Math.PI, 0]}
      />
    </group>
  );
}

// ---- container component -------------------------------------------------

export function LabStations({ scrollRef, hoverRef }: Props) {
  return (
    <group>
      {STATIONS.map((_, i) => (
        <LabStation
          key={i}
          index={i}
          scrollRef={scrollRef}
          hoverRef={hoverRef}
        />
      ))}
    </group>
  );
}
