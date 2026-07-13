/**
 * LabCameraRig
 *
 * Documentary-style camera that travels slowly through the laboratory as
 * the user scrolls.  Natural inertia is provided by lerping toward the
 * target position each frame.
 *
 * Mouse / touch parallax adds a subtle lateral offset (similar to a camera
 * operator making micro-adjustments while tracking a subject).
 *
 * Camera path keyframes (scroll progress → world position):
 *   0.00  [0,  3.0, 14]  – emerging from molecular network above
 *   0.12  [0,  2.2,  9]  – descending into the forming lab
 *   0.25  [0,  1.5,  6]  – glass surfaces crystallise around the camera
 *   0.40  [0,  1.2,  3]  – deep inside; stations visible left and right
 *   0.55  [-1, 1.1,  1]  – drifting left to inspect first cluster
 *   0.65  [1,  1.1, -1]  – crossing right, deeper stations appear
 *   0.78  [0,  1.8, -3]  – further in; overhead perspective
 *   0.90  [0,  2.5,  0]  – elevated overview of the full lab
 *   1.00  [0,  1.5,  4]  – gently pulling back for the Sprint-007 transition
 */

"use client";

import { useRef } from "react";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import type { LabMousePos } from "@/scenes/laboratory/hooks/useLabMouseParallax";

const KEYFRAMES: { p: number; pos: THREE.Vector3; target: THREE.Vector3 }[] = [
  {
    p: 0.0,
    pos: new THREE.Vector3(0, 3.0, 14),
    target: new THREE.Vector3(0, 0, 8),
  },
  {
    p: 0.12,
    pos: new THREE.Vector3(0, 2.2, 9),
    target: new THREE.Vector3(0, 0.5, 3),
  },
  {
    p: 0.25,
    pos: new THREE.Vector3(0, 1.5, 6),
    target: new THREE.Vector3(0, 0.5, 0),
  },
  {
    p: 0.4,
    pos: new THREE.Vector3(0, 1.2, 3),
    target: new THREE.Vector3(0, 0.5, -2),
  },
  {
    p: 0.55,
    pos: new THREE.Vector3(-1, 1.1, 1),
    target: new THREE.Vector3(-2, 0.2, -2),
  },
  {
    p: 0.65,
    pos: new THREE.Vector3(1, 1.1, -1),
    target: new THREE.Vector3(2, 0.2, -3),
  },
  {
    p: 0.78,
    pos: new THREE.Vector3(0, 1.8, -3),
    target: new THREE.Vector3(0, 0.5, -5),
  },
  {
    p: 0.9,
    pos: new THREE.Vector3(0, 2.5, 0),
    target: new THREE.Vector3(0, -0.8, -2),
  },
  {
    p: 1.0,
    pos: new THREE.Vector3(0, 1.5, 4),
    target: new THREE.Vector3(0, 0.5, 0),
  },
];

function samplePath(progress: number): {
  pos: THREE.Vector3;
  target: THREE.Vector3;
} {
  const clamped = THREE.MathUtils.clamp(progress, 0, 1);

  for (let i = 0; i < KEYFRAMES.length - 1; i++) {
    const kA = KEYFRAMES[i];
    const kB = KEYFRAMES[i + 1];
    if (clamped >= kA.p && clamped <= kB.p) {
      const t = (clamped - kA.p) / (kB.p - kA.p);
      return {
        pos: kA.pos.clone().lerp(kB.pos, t),
        target: kA.target.clone().lerp(kB.target, t),
      };
    }
  }

  const last = KEYFRAMES[KEYFRAMES.length - 1];
  return { pos: last.pos.clone(), target: last.target.clone() };
}

type Props = {
  scrollRef: React.MutableRefObject<number>;
  mouseRef: React.MutableRefObject<LabMousePos>;
};

export function LabCameraRig({ scrollRef, mouseRef }: Props) {
  const currentPos = useRef(new THREE.Vector3(0, 3, 14));
  const currentLook = useRef(new THREE.Vector3(0, 0, 8));

  useFrame(({ camera }, delta) => {
    const { pos, target } = samplePath(scrollRef.current);

    // Subtle mouse parallax – muted so it feels documentary, not game-like
    pos.x += mouseRef.current.x * 0.25;
    pos.y += mouseRef.current.y * 0.15;

    // Natural inertia – documentary cameras are slow and deliberate
    const lerpSpeed = 1.8;
    currentPos.current.lerp(pos, delta * lerpSpeed);
    currentLook.current.lerp(target, delta * lerpSpeed);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentLook.current);
  });

  return null;
}
