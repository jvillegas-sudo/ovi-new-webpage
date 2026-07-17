/**
 * OVI Asset Library — Asset Loader
 * Work Order: WO-016
 *
 * Provides hooks and utilities for loading OAL assets with:
 * - Draco compression
 * - KTX2 texture compression
 * - Suspense-compatible lazy loading
 * - LOD selection based on camera distance
 * - Hotspot extraction from loaded scenes
 */

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useGLTF, useAnimations } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import { OAL_CATALOG } from "./catalog";

// ─── Types ────────────────────────────────────────────────────────────────────

export type OalLodLevel = "lod0" | "lod1" | "lod2";

export interface OalHotspot {
  readonly name: string;
  readonly position: THREE.Vector3;
  readonly quaternion: THREE.Quaternion;
}

// ─── Loader Configuration ────────────────────────────────────────────────────

/**
 * Draco decoder path — served from public directory.
 * Run: cp -r node_modules/three/examples/jsm/libs/draco/ public/draco/
 */
export const DRACO_DECODER_PATH = "/draco/";

/**
 * KTX2 transcoder path — served from public directory.
 * Run: cp -r node_modules/three/examples/jsm/libs/basis/ public/basis/
 */
export const KTX2_TRANSCODER_PATH = "/basis/";

// ─── Path resolution ──────────────────────────────────────────────────────────

/**
 * Resolves the public URL for an OAL asset by ID and LOD level.
 * Returns null if the asset is not yet integrated (status !== ready/integrated).
 */
export function resolveOalPath(assetId: string, lod: OalLodLevel = "lod0"): string | null {
  const entry = OAL_CATALOG[assetId];
  if (!entry) return null;

  // Asset not yet available — caller should use OalAssetPlaceholder
  if (entry.status !== "ready" && entry.status !== "integrated") return null;

  if (entry.path) return entry.path;

  // Derive path from conventions if not explicitly set
  const lodEntry = entry.lods?.find((l) => l.level === lod);
  return lodEntry?.path ?? null;
}

// ─── LOD selection ────────────────────────────────────────────────────────────

/**
 * Returns the appropriate LOD level based on camera distance.
 * Thresholds: 0–10m → lod0, 10–30m → lod1, >30m → lod2
 */
export function selectLodLevel(distanceFromCamera: number): OalLodLevel {
  if (distanceFromCamera <= 10) return "lod0";
  if (distanceFromCamera <= 30) return "lod1";
  return "lod2";
}

// ─── Hotspot extraction ───────────────────────────────────────────────────────

/**
 * Extracts hotspot objects from a loaded GLTF scene.
 * Hotspots are empty nodes whose names begin with "hotspot_".
 */
export function extractHotspots(scene: THREE.Object3D): OalHotspot[] {
  const hotspots: OalHotspot[] = [];

  scene.traverse((node) => {
    if (node.name.startsWith("hotspot_")) {
      const position = new THREE.Vector3();
      const quaternion = new THREE.Quaternion();
      node.getWorldPosition(position);
      node.getWorldQuaternion(quaternion);
      hotspots.push({ name: node.name, position, quaternion });
    }
  });

  return hotspots;
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

/**
 * Loads an OAL asset by ID with Suspense support.
 * Returns null if the asset is pending and has no file path yet.
 *
 * Usage (must be wrapped in <Suspense>):
 * ```tsx
 * const gltf = useOalAsset('OAL-TR-001');
 * if (!gltf) return <OalAssetPlaceholder assetId="OAL-TR-001" weight={1} />;
 * return <primitive object={gltf.scene} />;
 * ```
 *
 * Note: this hook always calls useGLTF — when the asset is pending the
 * caller should check isAssetReady() BEFORE rendering this hook to avoid
 * the Suspense boundary being triggered for a missing file.
 */
export function useOalAsset(assetId: string, lod: OalLodLevel = "lod0"): GLTF | null {
  const path = resolveOalPath(assetId, lod);

  // useGLTF requires a non-empty string; using a sentinel path avoids
  // violating React hook rules while still returning null to callers.
  const safePath = path ?? "/oal-pending-asset.glb";
  const gltf = useGLTF(safePath) as GLTF;

  if (!path) return null;
  return gltf;
}

/**
 * Plays OAL animation clips on a loaded GLTF scene.
 *
 * Usage:
 * ```tsx
 * const { playAnimation } = useOalAnimation(gltf.animations, groupRef);
 * useEffect(() => { playAnimation('clean'); }, [isClean]);
 * ```
 */
export function useOalAnimation(
  animations: THREE.AnimationClip[],
  ref: React.RefObject<THREE.Group | null>,
) {
  const { actions } = useAnimations(animations, ref);
  const currentRef = useRef<string | null>(null);

  function playAnimation(name: string, fadeIn = 0.4) {
    if (!actions[name] || currentRef.current === name) return;

    // Fade out current animation
    if (currentRef.current && actions[currentRef.current]) {
      actions[currentRef.current]!.fadeOut(fadeIn);
    }

    // Fade in new animation
    actions[name]!.reset().fadeIn(fadeIn).play();
    currentRef.current = name;
  }

  // Start idle animation on mount
  useEffect(() => {
    if (actions["idle"]) {
      actions["idle"].play();
      currentRef.current = "idle";
    }
  }, [actions]);

  return { playAnimation, actions };
}

// ─── Preload helpers ──────────────────────────────────────────────────────────

/**
 * Preloads a set of OAL assets outside of the render cycle.
 * Call this in a top-level component or route segment to warm the cache.
 *
 * Example:
 * ```ts
 * preloadOalAssets(['OAL-TR-001', 'OAL-IN-002']);
 * ```
 */
export function preloadOalAssets(assetIds: string[], lod: OalLodLevel = "lod1"): void {
  for (const id of assetIds) {
    const path = resolveOalPath(id, lod);
    if (path) {
      useGLTF.preload(path);
    }
  }
}
