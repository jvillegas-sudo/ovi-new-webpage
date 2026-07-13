export interface IndustryMetric {
  label: string;
  value: number;
  suffix: string;
}

export interface IndustryPalette {
  primary: string;
  secondary: string;
  accent: string;
  danger: string;
  fog: string;
  floor: string;
}

export interface IndustryEnvironment {
  id: string;
  chapter: string;
  label: string;
  challenge: string;
  solution: string;
  impact: string;
  architecture: string;
  atmosphere: string;
  machinery: string;
  hiddenLayer: string;
  interactionLabel: string;
  transitionCue: string;
  palette: IndustryPalette;
  kpis: IndustryMetric[];
  anchor: [number, number, number];
  hotspot: [number, number, number];
}

export const INDUSTRY_ENVIRONMENTS: IndustryEnvironment[] = [
  {
    id: "hospital",
    chapter: "Environment 01",
    label: "Advanced Hospital",
    challenge: "Surface contamination",
    solution: "Sterile enzymatic decontamination",
    impact: "Validated safer patient zones",
    architecture: "Sterile care corridor",
    atmosphere: "cold mist and surgical light shafts",
    machinery: "UV-safe sanitation gantry",
    hiddenLayer: "bioburden map",
    interactionLabel: "Reveal contamination layer",
    transitionCue: "steel ward surfaces soften into hospitality glass",
    palette: {
      primary: "#7FE5FF",
      secondary: "#7AFFC8",
      accent: "#B6C8FF",
      danger: "#FF758F",
      fog: "#0A1730",
      floor: "#0C1829",
    },
    kpis: [
      { label: "Water", value: 42, suffix: "%" },
      { label: "Chemicals", value: 31, suffix: "%" },
      { label: "Response", value: 18, suffix: " min" },
    ],
    anchor: [0, 0, 22],
    hotspot: [2.8, 0.6, 21.5],
  },
  {
    id: "hotel",
    chapter: "Environment 02",
    label: "Luxury Hotel",
    challenge: "Guest room turnaround",
    solution: "Rapid room reset protocol",
    impact: "Faster premium turnover",
    architecture: "Reflective hospitality suite",
    atmosphere: "amber reflections and warm vapor",
    machinery: "Autonomous cart sanitation wall",
    hiddenLayer: "turnover heat map",
    interactionLabel: "Inspect housekeeping cycle",
    transitionCue: "lobby bronze folds into hygienic process stainless",
    palette: {
      primary: "#5AD6FF",
      secondary: "#FFD89A",
      accent: "#FFD166",
      danger: "#FF8F6B",
      fog: "#1A1423",
      floor: "#17111B",
    },
    kpis: [
      { label: "Turnaround", value: 37, suffix: "%" },
      { label: "Water", value: 26, suffix: "%" },
      { label: "Rooms", value: 12, suffix: "/hr" },
    ],
    anchor: [0, 0, 15],
    hotspot: [-2.7, 0.55, 14.7],
  },
  {
    id: "food-processing",
    chapter: "Environment 03",
    label: "Food Processing Plant",
    challenge: "Food-safe sanitation",
    solution: "Residue-free CIP pulse",
    impact: "Audit-ready production lines",
    architecture: "Washdown production tunnel",
    atmosphere: "dense foam haze and chilled air",
    machinery: "Inline conveyor cleaning bridge",
    hiddenLayer: "allergen trace overlay",
    interactionLabel: "Trace food-safe rinse path",
    transitionCue: "foam channels tighten into mechanical precision",
    palette: {
      primary: "#73E0FF",
      secondary: "#A8FFCF",
      accent: "#7AFFC8",
      danger: "#FF7366",
      fog: "#0B1C1B",
      floor: "#0A1716",
    },
    kpis: [
      { label: "Downtime", value: 29, suffix: "%" },
      { label: "Rinse", value: 33, suffix: "%" },
      { label: "Safety", value: 100, suffix: "%" },
    ],
    anchor: [0, 0, 8],
    hotspot: [2.9, 0.55, 8.1],
  },
  {
    id: "manufacturing",
    chapter: "Environment 04",
    label: "Industrial Manufacturing",
    challenge: "Grease removal",
    solution: "Precision degreasing pulse",
    impact: "Longer machine uptime",
    architecture: "High-torque assembly spine",
    atmosphere: "electric haze and steel dust",
    machinery: "Robotic wash-and-lube cell",
    hiddenLayer: "friction load field",
    interactionLabel: "Expose grease accumulation",
    transitionCue: "assembly rhythm fractures into excavation mass",
    palette: {
      primary: "#52C8FF",
      secondary: "#7AA8FF",
      accent: "#9AD7FF",
      danger: "#FF6F59",
      fog: "#111827",
      floor: "#0B101B",
    },
    kpis: [
      { label: "Uptime", value: 21, suffix: "%" },
      { label: "Energy", value: 14, suffix: "%" },
      { label: "Cycles", value: 3.4, suffix: "x" },
    ],
    anchor: [0, 0, 1],
    hotspot: [-2.8, 0.7, 1.2],
  },
  {
    id: "mining",
    chapter: "Environment 05",
    label: "Mining Operation",
    challenge: "Heavy equipment cleaning",
    solution: "High-load soil release system",
    impact: "Lower wear and safer access",
    architecture: "Open-pit service deck",
    atmosphere: "mineral dust and headlamp beams",
    machinery: "Haul truck wash frame",
    hiddenLayer: "abrasion stress contours",
    interactionLabel: "Reveal mineral residue load",
    transitionCue: "ore dust condenses into pressurized pipe geometry",
    palette: {
      primary: "#58BBFF",
      secondary: "#CFC28A",
      accent: "#F2D785",
      danger: "#FF875F",
      fog: "#1B1710",
      floor: "#14110E",
    },
    kpis: [
      { label: "Service", value: 24, suffix: "%" },
      { label: "Wear", value: 19, suffix: "%" },
      { label: "Water", value: 17, suffix: "%" },
    ],
    anchor: [0, 0, -6],
    hotspot: [2.9, 0.8, -5.8],
  },
  {
    id: "oil-gas",
    chapter: "Environment 06",
    label: "Oil & Gas Facility",
    challenge: "Industrial degreasing",
    solution: "Closed-loop solvent displacement",
    impact: "Safer maintenance windows",
    architecture: "Pressurized processing rack",
    atmosphere: "dense steam and cobalt flare",
    machinery: "Pipe manifold cleaning spine",
    hiddenLayer: "hydrocarbon concentration veil",
    interactionLabel: "Inspect degreasing envelope",
    transitionCue: "pipe density stretches into fleet-scale motion",
    palette: {
      primary: "#5ECFFF",
      secondary: "#7AC7FF",
      accent: "#B2E7FF",
      danger: "#FF6A7A",
      fog: "#09111C",
      floor: "#081019",
    },
    kpis: [
      { label: "Shutdown", value: 32, suffix: "%" },
      { label: "Exposure", value: 28, suffix: "%" },
      { label: "Recovery", value: 92, suffix: "%" },
    ],
    anchor: [0, 0, -13],
    hotspot: [-2.85, 0.8, -13.1],
  },
  {
    id: "transportation",
    chapter: "Environment 07",
    label: "Logistics & Transportation",
    challenge: "Fleet maintenance",
    solution: "Throughput-first wash orchestration",
    impact: "More vehicles back in rotation",
    architecture: "Fleet service artery",
    atmosphere: "motion blur trails and suspended mist",
    machinery: "Drive-through maintenance rail",
    hiddenLayer: "route uptime telemetry",
    interactionLabel: "Track maintenance throughput",
    transitionCue: "fleet light trails dissolve into civic grids",
    palette: {
      primary: "#57D0FF",
      secondary: "#7AFFE0",
      accent: "#9EE7FF",
      danger: "#FF7B7B",
      fog: "#0C1520",
      floor: "#0B131D",
    },
    kpis: [
      { label: "Throughput", value: 34, suffix: "%" },
      { label: "Fuel", value: 12, suffix: "%" },
      { label: "Fleet", value: 18, suffix: "/day" },
    ],
    anchor: [0, 0, -20],
    hotspot: [2.8, 0.65, -20.2],
  },
  {
    id: "smart-city",
    chapter: "Environment 08",
    label: "Smart City Infrastructure",
    challenge: "Public infrastructure cleaning",
    solution: "Adaptive civic maintenance mesh",
    impact: "Visible urban resilience",
    architecture: "Responsive civic grid",
    atmosphere: "rain glow and urban particulate light",
    machinery: "Distributed surface care nodes",
    hiddenLayer: "public health signal field",
    interactionLabel: "Surface public health signal",
    transitionCue: "civic hardware dissolves into product silhouettes",
    palette: {
      primary: "#66D8FF",
      secondary: "#79FFD3",
      accent: "#7A8BFF",
      danger: "#FF7899",
      fog: "#0A1324",
      floor: "#09111C",
    },
    kpis: [
      { label: "Coverage", value: 46, suffix: "%" },
      { label: "Chemicals", value: 39, suffix: "%" },
      { label: "Safety", value: 27, suffix: "%" },
    ],
    anchor: [0, 0, -27],
    hotspot: [-2.7, 0.65, -27.1],
  },
];

export const INDUSTRY_HEADLINES = [
  "The laboratory becomes the real world.",
  "Every challenge becomes visible before it is solved.",
  "Precision adapts without changing its philosophy.",
  "Operations accelerate. Waste falls. Confidence rises.",
  "Solutions dissolve into the products still to come.",
] as const;

export const PRODUCTS_TRANSITION = {
  eyebrow: "Transition prepared",
  title: "Equipment dissolves into product silhouettes.",
  caption: "Sprint 008 begins after this threshold.",
} as const;

export const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

export function getEnvironmentIndex(progress: number): number {
  const normalized = clamp01(progress);
  return Math.min(
    INDUSTRY_ENVIRONMENTS.length - 1,
    Math.floor(normalized * INDUSTRY_ENVIRONMENTS.length),
  );
}

export function getEnvironmentProgress(
  progress: number,
  index: number,
): number {
  const span = 1 / INDUSTRY_ENVIRONMENTS.length;
  const start = span * index;
  return clamp01((clamp01(progress) - start) / span);
}

export function getHeadline(progress: number): string {
  const index = Math.min(
    INDUSTRY_HEADLINES.length - 1,
    Math.floor(clamp01(progress) * INDUSTRY_HEADLINES.length),
  );
  return INDUSTRY_HEADLINES[index];
}
