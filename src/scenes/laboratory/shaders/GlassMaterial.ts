/**
 * Glass Material
 *
 * Thin structural glass panels used in the laboratory environment
 * (side walls, ceiling fins, station shields).
 *
 * Built on THREE.MeshPhysicalMaterial to leverage native transmission /
 * refraction support without a hand-written shader.
 */

import * as THREE from "three";

export interface GlassMaterialOptions {
  /** Tint colour (default: cold blue-white). */
  color?: string;
  /** Overall opacity of the glass panel (0–1). Default 0.12. */
  opacity?: number;
}

export function createGlassMaterial(
  opts: GlassMaterialOptions = {},
): THREE.MeshPhysicalMaterial {
  const { color = "#88ccff", opacity = 0.12 } = opts;

  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    metalness: 0.0,
    roughness: 0.06,
    transmission: 0.88,
    thickness: 0.4,
    transparent: true,
    opacity,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
}

/** Solid-ish glass for station shields — slightly more opaque. */
export function createStationGlassMaterial(): THREE.MeshPhysicalMaterial {
  return createGlassMaterial({ opacity: 0.18, color: "#aaddff" });
}
