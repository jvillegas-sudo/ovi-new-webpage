/**
 * Laboratory Experience – Research Stations
 *
 * Eight research stations, each representing a core OVI technology domain.
 * Positions are arranged in two symmetric rows flanking a central camera aisle:
 *   Left  row  (x ≈ -3): stations 0, 2, 4, 6
 *   Right row  (x ≈ +3): stations 1, 3, 5, 7
 *
 * z-values run from the back (z ≈ -5) to the front (z ≈ 2.5) of the lab
 * so the scroll-driven camera travels past them in order.
 */

export interface Station {
  id: string;
  label: string;
  subtitle: string;
  description: string;
  color: string;
  position: [number, number, number];
  /** Normalised scroll progress [0,1] at which this station fully activates. */
  activationAt: number;
  /** Which hologram visualisation type to show (drives shader variant). */
  vizType: "wave" | "bars" | "spiral" | "grid";
}

export const STATIONS: Station[] = [
  {
    id: "biotechnology",
    label: "Biotechnology",
    subtitle: "Enzyme Engineering",
    description:
      "Engineered microbial consortia that degrade complex organic compounds at the molecular level.",
    color: "#3DD2FF",
    position: [-3.2, -0.8, -5.0],
    activationAt: 0.35,
    vizType: "wave",
  },
  {
    id: "surface-analysis",
    label: "Surface Analysis",
    subtitle: "Nano-scale Inspection",
    description:
      "Sub-micron surface mapping reveals contamination layers invisible to conventional sensors.",
    color: "#5AFFC0",
    position: [3.2, -0.8, -4.2],
    activationAt: 0.42,
    vizType: "bars",
  },
  {
    id: "ai-optimization",
    label: "AI Optimization",
    subtitle: "Predictive Intelligence",
    description:
      "Reinforcement-learning agents continuously refine cleaning protocols in real-time.",
    color: "#7A8BFF",
    position: [-3.2, -0.8, -2.8],
    activationAt: 0.49,
    vizType: "spiral",
  },
  {
    id: "chemical-simulation",
    label: "Chemical Simulation",
    subtitle: "Molecular Dynamics",
    description:
      "High-fidelity MD simulations guide formulation design before a single gram is synthesised.",
    color: "#FFD166",
    position: [3.2, -0.8, -2.0],
    activationAt: 0.56,
    vizType: "grid",
  },
  {
    id: "industrial-cleaning",
    label: "Industrial Cleaning",
    subtitle: "Precision Protocols",
    description:
      "Adaptive flow-rate algorithms deliver exact dosing under variable load and temperature.",
    color: "#2EE6A4",
    position: [-3.2, -0.8, -0.6],
    activationAt: 0.63,
    vizType: "bars",
  },
  {
    id: "water-recovery",
    label: "Water Recovery",
    subtitle: "Closed-loop Systems",
    description:
      "Membrane bioreactors achieve >98 % water recovery, returning purified effluent to process.",
    color: "#3DD2FF",
    position: [3.2, -0.8, 0.2],
    activationAt: 0.70,
    vizType: "wave",
  },
  {
    id: "predictive-maintenance",
    label: "Predictive Maintenance",
    subtitle: "Sensor Fusion",
    description:
      "Vibration, thermal and acoustic sensor arrays detect equipment degradation weeks in advance.",
    color: "#FF5A7A",
    position: [-3.2, -0.8, 1.6],
    activationAt: 0.77,
    vizType: "spiral",
  },
  {
    id: "automation",
    label: "Automation",
    subtitle: "Autonomous Systems",
    description:
      "Fully autonomous cleaning and dosing robots reduce human exposure in hazardous environments.",
    color: "#AA66FF",
    position: [3.2, -0.8, 2.4],
    activationAt: 0.84,
    vizType: "grid",
  },
];

/** Cinematic headlines — shown one at a time as scroll advances. */
export const LAB_HEADLINES: {
  text: string;
  scrollStart: number;
  scrollEnd: number;
}[] = [
  { text: "Light becomes architecture.", scrollStart: 0.04, scrollEnd: 0.24 },
  { text: "Science made visible.", scrollStart: 0.24, scrollEnd: 0.46 },
  { text: "Research without limits.", scrollStart: 0.46, scrollEnd: 0.68 },
  {
    text: "Every station. Every solution.",
    scrollStart: 0.68,
    scrollEnd: 0.88,
  },
  { text: "The laboratory is alive.", scrollStart: 0.88, scrollEnd: 1.0 },
];
