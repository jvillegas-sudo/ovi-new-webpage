/**
 * Scene Configuration
 *
 * Defines every scene in the story flow with its scroll range,
 * default camera state, and transition style.
 *
 * Add new scenes here without touching any other module — the
 * engine will automatically pick them up.
 */

import type { SceneConfig } from "@/engine/types";

/** Total number of scenes in the story (used to compute scroll ranges). */
const SCENE_COUNT = 11;

/**
 * Creates a normalised scroll range [start, end] for scene at index `i`.
 * Each scene occupies an equal share of the total scroll space by default.
 * Override individual entries to give specific scenes more scroll depth.
 */
const range = (i: number): [number, number] => [
  i / SCENE_COUNT,
  (i + 1) / SCENE_COUNT,
];

export const SCENES: readonly SceneConfig[] = [
  {
    id: "water-drop",
    index: 0,
    label: "Scene 01 — Floating Water Drop",
    scrollStart: range(0)[0],
    scrollEnd: range(0)[1],
    cameraState: {
      position: [0, 0, 6],
      target: [0, 0, 0],
      fov: 45,
    },
    transition: "particle-morph",
    navHref: "/",
  },
  {
    id: "water-distortion",
    index: 1,
    label: "Scene 02 — Water Drop Distortion",
    scrollStart: range(1)[0],
    scrollEnd: range(1)[1],
    cameraState: {
      position: [0, 0.5, 4],
      target: [0, 0, 0],
      fov: 50,
    },
    transition: "material-dissolve",
  },
  {
    id: "particle-explosion",
    index: 2,
    label: "Scene 03 — Particle Explosion",
    scrollStart: range(2)[0],
    scrollEnd: range(2)[1],
    cameraState: {
      position: [0, 1, 8],
      target: [0, 0, 0],
      fov: 60,
    },
    transition: "depth-transition",
  },
  {
    id: "ovi-logo",
    index: 3,
    label: "Scene 04 — OVI Logo",
    scrollStart: range(3)[0],
    scrollEnd: range(3)[1],
    cameraState: {
      position: [0, 0, 5],
      target: [0, 0, 0],
      fov: 45,
    },
    transition: "light-evolution",
  },
  {
    id: "technology",
    index: 4,
    label: "Scene 05 — Technology",
    scrollStart: range(4)[0],
    scrollEnd: range(4)[1],
    cameraState: {
      position: [2, 1, 6],
      target: [0, 0, 0],
      fov: 50,
    },
    transition: "camera-travel",
    navHref: "/technology",
  },
  {
    id: "biotechnology",
    index: 5,
    label: "Scene 06 — Biotechnology",
    scrollStart: range(5)[0],
    scrollEnd: range(5)[1],
    cameraState: {
      position: [-2, 1, 6],
      target: [0, 0, 0],
      fov: 50,
    },
    transition: "volumetric-fog",
    navHref: "/technology",
  },
  {
    id: "products",
    index: 6,
    label: "Scene 07 — Products",
    scrollStart: range(6)[0],
    scrollEnd: range(6)[1],
    cameraState: {
      position: [0, -1, 7],
      target: [0, 0, 0],
      fov: 55,
    },
    transition: "particle-morph",
    navHref: "/solutions",
  },
  {
    id: "industries",
    index: 7,
    label: "Scene 08 — Industries",
    scrollStart: range(7)[0],
    scrollEnd: range(7)[1],
    cameraState: {
      position: [3, 0, 5],
      target: [0, 0, 0],
      fov: 48,
    },
    transition: "depth-transition",
    navHref: "/industries",
  },
  {
    id: "impact-dashboard",
    index: 8,
    label: "Scene 09 — Impact Dashboard",
    scrollStart: range(8)[0],
    scrollEnd: range(8)[1],
    cameraState: {
      position: [0, 2, 8],
      target: [0, 0, 0],
      fov: 52,
    },
    transition: "light-evolution",
    navHref: "/company",
  },
  {
    id: "ovi-os",
    index: 9,
    label: "Scene 10 — OVI OS",
    scrollStart: range(9)[0],
    scrollEnd: range(9)[1],
    cameraState: {
      position: [0, 0, 4],
      target: [0, 0, 0],
      fov: 40,
    },
    transition: "material-dissolve",
    navHref: "/technology",
  },
  {
    id: "contact",
    index: 10,
    label: "Scene 11 — Contact",
    scrollStart: range(10)[0],
    scrollEnd: range(10)[1],
    cameraState: {
      position: [0, -2, 6],
      target: [0, 0, 0],
      fov: 45,
    },
    transition: "camera-travel",
    navHref: "/contact",
  },
] as const;

/** Quick lookup: scene id → config. */
export const SCENE_MAP = new Map<SceneConfig["id"], SceneConfig>(
  SCENES.map((s) => [s.id, s]),
);
