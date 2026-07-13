/**
 * Technology Experience – Capability Nodes
 *
 * Eight technological capabilities, each with a 3D position, brand color,
 * display label, and connection list (indices into this array).
 *
 * Layout: nodes occupy a loose organic sphere ~2.5 units in radius.
 * Connections form a graph that reads as a knowledge network.
 */

export interface Capability {
  id: string;
  label: string;
  tagline: string;
  color: string;
  position: [number, number, number];
  /** Indices of other capabilities this node connects to. */
  connections: number[];
  /** Normalised scroll progress [0,1] at which this node fully activates. */
  activationAt: number;
}

export const CAPABILITIES: Capability[] = [
  {
    id: "biotechnology",
    label: "Biotechnology",
    tagline: "Biotechnology transforms industries.",
    color: "#3DD2FF",
    position: [0.0, 2.4, 0.0],
    connections: [1, 4, 7],
    activationAt: 0.55,
  },
  {
    id: "ai",
    label: "Artificial Intelligence",
    tagline: "Intelligence becomes infrastructure.",
    color: "#7A8BFF",
    position: [2.3, 1.0, -0.8],
    connections: [0, 2, 5, 6],
    activationAt: 0.62,
  },
  {
    id: "automation",
    label: "Automation",
    tagline: "Engineering creates confidence.",
    color: "#5AFFC0",
    position: [1.8, -1.4, 1.2],
    connections: [1, 3],
    activationAt: 0.68,
  },
  {
    id: "engineering",
    label: "Industrial Engineering",
    tagline: "Precision is the foundation.",
    color: "#FFD166",
    position: [0.0, -2.5, -0.8],
    connections: [2, 4, 7],
    activationAt: 0.72,
  },
  {
    id: "sustainability",
    label: "Sustainability",
    tagline: "The planet is the product.",
    color: "#2EE6A4",
    position: [-2.0, -1.0, 1.3],
    connections: [0, 3, 7],
    activationAt: 0.76,
  },
  {
    id: "operational",
    label: "Operational Intelligence",
    tagline: "Innovation is measurable.",
    color: "#3DD2FF",
    position: [-2.3, 1.0, -0.8],
    connections: [1, 6],
    activationAt: 0.80,
  },
  {
    id: "monitoring",
    label: "Digital Monitoring",
    tagline: "Technology is invisible.",
    color: "#FF5A7A",
    position: [-1.4, 2.0, 1.5],
    connections: [0, 5],
    activationAt: 0.84,
  },
  {
    id: "rd",
    label: "Research & Development",
    tagline: "Research is the beginning.",
    color: "#5AFFC0",
    position: [1.0, 0.4, 2.5],
    connections: [0, 3, 4],
    activationAt: 0.88,
  },
];

/** Cinematic headlines — shown one at a time as scroll advances. */
export const HEADLINES: { text: string; scrollStart: number; scrollEnd: number }[] = [
  { text: "Technology is invisible.", scrollStart: 0.05, scrollEnd: 0.28 },
  { text: "Innovation is measurable.", scrollStart: 0.28, scrollEnd: 0.50 },
  { text: "Engineering creates confidence.", scrollStart: 0.50, scrollEnd: 0.72 },
  { text: "Biotechnology transforms industries.", scrollStart: 0.72, scrollEnd: 0.94 },
];
