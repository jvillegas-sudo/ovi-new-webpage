export type ProductCategory =
  | "Industrial Cleaning"
  | "Vehicle Care"
  | "Biotechnology"
  | "Surface Protection"
  | "Sanitation"
  | "Maintenance"
  | "Water Recovery"
  | "Professional Equipment";

export type IndustryId =
  | "hospital"
  | "hotel"
  | "food-processing"
  | "manufacturing"
  | "mining"
  | "oil-gas"
  | "transportation"
  | "smart-city";

export type InspectionMode = "story" | "materials" | "technical";
export type ProductSilhouette =
  | "bottle"
  | "canister"
  | "capsule"
  | "shield"
  | "sprayer"
  | "tool"
  | "module"
  | "tank";

export interface ProductMetric {
  label: string;
  value: number;
  suffix: string;
}

export interface SustainabilityMetric {
  label: string;
  value: number;
  suffix: string;
  color: string;
}

export interface ProductCapability {
  label: string;
  score: number;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface ProductHotspot {
  id: string;
  label: string;
  title: string;
  description: string;
  layer: string;
  position: [number, number, number];
}

export interface ProductPrompt {
  query: string;
  protocol: string;
  requiredProducts: string[];
  dilution: string;
  safety: string;
  environmental: string;
  crossSell: string;
}

export interface ProductRelationship {
  targetId: string;
  kind: "compatible" | "replacement" | "complementary";
  label: string;
}

export interface ProductDefinition {
  id: string;
  chapter: string;
  name: string;
  category: ProductCategory;
  purpose: string;
  technology: string;
  industries: IndustryId[];
  protocols: string[];
  chemicalFamily: string;
  equipmentCompatibility: string[];
  storyBeat: string;
  transitionCue: string;
  model: {
    silhouette: ProductSilhouette;
    anchor: [number, number, number];
    scale: number;
    primary: string;
    secondary: string;
    accent: string;
    glow: string;
  };
  hotspots: ProductHotspot[];
  specifications: ProductSpecification[];
  safetyDocumentation: string[];
  applicationVideos: string[];
  sustainability: SustainabilityMetric[];
  capabilities: ProductCapability[];
  relationships: ProductRelationship[];
  aiPrompts: ProductPrompt[];
}

export interface SearchResult {
  productId: string;
  score: number;
}

export interface IndustryOption {
  id: IndustryId;
  label: string;
  transition: string;
}

export const PRODUCT_INFORMATION_LAYERS = [
  "Name & purpose",
  "Technology",
  "Industries",
  "Technical specifications",
  "Safety documentation",
  "Application videos",
  "Related products",
  "AI recommendations",
] as const;

export const PRODUCT_HEADLINES = [
  "Industrial systems dissolve into a living product field.",
  "Every formula becomes an engineering object you can inspect.",
  "Relationships illuminate before a single list appears.",
  "Search, compare, and deploy with motion instead of tables.",
  "Select an industry and the ecosystem prepares the next journey.",
] as const;

export const PRODUCT_SEARCH_EXAMPLES = [
  "I clean buses.",
  "I sanitize hospitals.",
  "I protect painted metal.",
] as const;

export const INDUSTRY_OPTIONS: IndustryOption[] = [
  {
    id: "hospital",
    label: "Hospitals",
    transition: "Sterile sanitation route prepared.",
  },
  {
    id: "hotel",
    label: "Hotels",
    transition: "Guest turnover protocol isolated.",
  },
  {
    id: "food-processing",
    label: "Food processing",
    transition: "Residue-free washdown products remain.",
  },
  {
    id: "manufacturing",
    label: "Manufacturing",
    transition: "Precision maintenance chain remains active.",
  },
  {
    id: "mining",
    label: "Mining",
    transition: "Heavy-soil equipment products stay online.",
  },
  {
    id: "oil-gas",
    label: "Oil & gas",
    transition: "Closed-loop degreasing path is isolated.",
  },
  {
    id: "transportation",
    label: "Transportation",
    transition: "Fleet cleaning products move to the foreground.",
  },
  {
    id: "smart-city",
    label: "Smart cities",
    transition: "Civic maintenance ecosystem remains illuminated.",
  },
] as const;

export const PRODUCTS: ProductDefinition[] = [
  {
    id: "enzyme-core",
    chapter: "Product 01",
    name: "OVI Enzyme Core",
    category: "Biotechnology",
    purpose: "Bio-enzymatic concentrate for organic residue removal.",
    technology: "Encapsulated enzymes with adaptive release timing.",
    industries: ["hospital", "hotel", "food-processing"],
    protocols: ["Bio-reactive foam", "Low-water surface reset"],
    chemicalFamily: "Enzymatic biotechnology",
    equipmentCompatibility: ["Foam cannons", "Trigger systems", "Auto-dose stations"],
    storyBeat: "Microbiology becomes visible as a responsive cleaning tool.",
    transitionCue: "Bio-active light migrates into sterile cleaning routines.",
    model: {
      silhouette: "capsule",
      anchor: [-10, 0.4, 18],
      scale: 1.08,
      primary: "#7FE5FF",
      secondary: "#5AFFC0",
      accent: "#B8CEFF",
      glow: "#B2FFF2",
    },
    hotspots: [
      {
        id: "enzyme-cap",
        label: "Seal",
        title: "Sterile metering seal",
        description: "Prevents contamination while controlling every milliliter released into the protocol.",
        layer: "Purpose",
        position: [0, 1.5, 0],
      },
      {
        id: "enzyme-formula",
        label: "Formula",
        title: "Adaptive enzyme matrix",
        description: "Breaks down proteins, starches, and organic films without aggressive chemistry spikes.",
        layer: "Technology",
        position: [0.9, 0.2, 0.7],
      },
      {
        id: "enzyme-impact",
        label: "Impact",
        title: "Biodegradable rinse profile",
        description: "Delivers lower wastewater load and safer operator handling across hospitality and healthcare.",
        layer: "Sustainability",
        position: [-0.95, -0.55, 0.55],
      },
    ],
    specifications: [
      { label: "Dilution", value: "1:40 to 1:120" },
      { label: "Contact time", value: "4 min" },
      { label: "pH", value: "7.2" },
      { label: "Packaging", value: "5 L smart canister" },
    ],
    safetyDocumentation: [
      "Non-corrosive handling protocol",
      "Biological compatibility sheet",
      "Closed-transfer dosing instruction",
    ],
    applicationVideos: [
      "Hospital ward rapid reset",
      "Luxury suite organic residue removal",
    ],
    sustainability: [
      { label: "Water", value: 38, suffix: "%", color: "#5AFFC0" },
      { label: "Waste", value: 29, suffix: "%", color: "#7FE5FF" },
      { label: "Biodeg.", value: 96, suffix: "%", color: "#B8CEFF" },
    ],
    capabilities: [
      { label: "Residue range", score: 90 },
      { label: "Operator safety", score: 88 },
      { label: "Material compatibility", score: 84 },
    ],
    relationships: [
      { targetId: "sanitize-pulse", kind: "compatible", label: "Sterile finishing stage" },
      { targetId: "smart-dose", kind: "complementary", label: "Automated dilution control" },
      { targetId: "recovery-loop", kind: "complementary", label: "Water reuse follow-up" },
    ],
    aiPrompts: [
      {
        query: "I sanitize hospitals.",
        protocol: "Pre-clean organic load with enzymatic foam, then hand off to terminal sanitation.",
        requiredProducts: ["OVI Enzyme Core", "Sanitize Pulse One", "SmartDose Rail"],
        dilution: "1:80 in patient zones",
        safety: "Use nitrile gloves and ensure 4-minute dwell before final wipe.",
        environmental: "Cuts rinse water demand by 38% while staying biodegradable.",
        crossSell: "Add Recovery Loop to recirculate rinse water in central utility areas.",
      },
      {
        query: "I clean hotels.",
        protocol: "Target bathroom soils first, then switch to low-residue room reset cycle.",
        requiredProducts: ["OVI Enzyme Core", "Nano Shield Flex"],
        dilution: "1:100 for high-touch suites",
        safety: "Ventilate enclosed bathrooms and avoid mixing with oxidizers.",
        environmental: "Lowers chemical waste in guest-room turnover by 29%.",
        crossSell: "Pair with Transit Foam Vector for exterior shuttle detailing.",
      },
    ],
  },
  {
    id: "transit-foam",
    chapter: "Product 02",
    name: "Transit Foam Vector",
    category: "Vehicle Care",
    purpose: "High-coverage foam for buses, fleets, and transport exteriors.",
    technology: "Electrostatic cling foam with controlled runoff behavior.",
    industries: ["transportation", "smart-city", "mining"],
    protocols: ["Fleet exterior wash", "Low-drag dirt release"],
    chemicalFamily: "Surfactant hybrid",
    equipmentCompatibility: ["Tunnel arches", "Foam lances", "Mobile wash frames"],
    storyBeat: "Vehicle care becomes a throughput optimization tool.",
    transitionCue: "Foam trajectories align with fleet telemetry paths.",
    model: {
      silhouette: "sprayer",
      anchor: [-3.2, 0.1, 12],
      scale: 1.12,
      primary: "#57D0FF",
      secondary: "#7AFFE0",
      accent: "#C0F4FF",
      glow: "#9FEFFF",
    },
    hotspots: [
      {
        id: "foam-nozzle",
        label: "Nozzle",
        title: "Wide-angle projection head",
        description: "Builds a stable foam blanket that stays on vertical fleet surfaces long enough to work.",
        layer: "Technology",
        position: [1.05, 0.8, 0.4],
      },
      {
        id: "foam-body",
        label: "Reservoir",
        title: "High-volume active reservoir",
        description: "Balances cling performance with fast rinse for drive-through maintenance lanes.",
        layer: "Purpose",
        position: [0, 0.1, 0.75],
      },
      {
        id: "foam-impact",
        label: "Throughput",
        title: "Fleet turnaround signal",
        description: "Optimized for buses, trams, and heavy-duty exterior reset cycles.",
        layer: "Industries",
        position: [-0.8, -0.55, 0.45],
      },
    ],
    specifications: [
      { label: "Dilution", value: "1:60" },
      { label: "Coverage", value: "24 buses / tank" },
      { label: "Rinse", value: "90 sec" },
      { label: "Packaging", value: "20 L refill" },
    ],
    safetyDocumentation: [
      "Fleet wash runoff management guide",
      "Paint-safe compatibility matrix",
      "Operator splash protection instruction",
    ],
    applicationVideos: [
      "Bus depot express wash",
      "Mining truck exterior soil release",
    ],
    sustainability: [
      { label: "Water", value: 24, suffix: "%", color: "#7AFFE0" },
      { label: "Fuel", value: 12, suffix: "%", color: "#57D0FF" },
      { label: "Runoff", value: 31, suffix: "%", color: "#C0F4FF" },
    ],
    capabilities: [
      { label: "Coverage", score: 92 },
      { label: "Paint safety", score: 86 },
      { label: "Turnaround speed", score: 94 },
    ],
    relationships: [
      { targetId: "recovery-loop", kind: "compatible", label: "Water reclamation loop" },
      { targetId: "smart-dose", kind: "complementary", label: "Tunnel dosing automation" },
      { targetId: "torque-x90", kind: "complementary", label: "Undercarriage degreasing stage" },
    ],
    aiPrompts: [
      {
        query: "I clean buses.",
        protocol: "Pre-soak fleet exteriors, foam the bodywork, then recapture rinse water for reuse.",
        requiredProducts: ["Transit Foam Vector", "Recovery Loop XR", "SmartDose Rail"],
        dilution: "1:60 for urban dust, 1:40 for grease-heavy routes",
        safety: "Use splash goggles and keep operators clear of rotating arches.",
        environmental: "Reduces fresh water usage by 24% and runoff contamination by 31%.",
        crossSell: "Add Torque X90 to clean engine bays and workshop surfaces on the same route.",
      },
    ],
  },
  {
    id: "clean-line",
    chapter: "Product 03",
    name: "CleanLine CIP Matrix",
    category: "Industrial Cleaning",
    purpose: "Closed-loop circulation cleaner for food-safe production lines.",
    technology: "Pulse-driven CIP chemistry with residue detection feedback.",
    industries: ["food-processing", "oil-gas", "manufacturing"],
    protocols: ["CIP circulation", "Residue-free rinse"],
    chemicalFamily: "Food-safe alkaline hybrid",
    equipmentCompatibility: ["CIP skids", "Pipe manifolds", "Heat exchangers"],
    storyBeat: "Industrial cleaning becomes a programmable process layer.",
    transitionCue: "Process lines resolve into technical circulation geometry.",
    model: {
      silhouette: "module",
      anchor: [3.6, -0.2, 7],
      scale: 1.04,
      primary: "#73E0FF",
      secondary: "#A8FFCF",
      accent: "#E3FFF7",
      glow: "#B5FFF2",
    },
    hotspots: [
      {
        id: "cip-port",
        label: "Port",
        title: "Closed-loop injection port",
        description: "Introduces chemistry without opening the hygiene envelope of the line.",
        layer: "Technology",
        position: [1.1, 0.1, 0.15],
      },
      {
        id: "cip-core",
        label: "Core",
        title: "Residue sensing core",
        description: "Synchronizes conductivity and rinse state to protect audit-ready production cycles.",
        layer: "Technical specifications",
        position: [0, 0.7, 0.65],
      },
      {
        id: "cip-signal",
        label: "Protocol",
        title: "Validated wash sequence",
        description: "Shortens downtime while keeping allergen trace risk visible to the operator.",
        layer: "Industries",
        position: [-1, -0.55, 0.45],
      },
    ],
    specifications: [
      { label: "Conductivity range", value: "2.5-12 mS" },
      { label: "Cycle time", value: "18 min" },
      { label: "Foam carryover", value: "<1%" },
      { label: "Temperature", value: "20-65°C" },
    ],
    safetyDocumentation: [
      "Food contact compatibility statement",
      "Closed-loop isolation checklist",
      "Allergen reset validation guide",
    ],
    applicationVideos: [
      "Dairy CIP validation",
      "Assembly line circulation cleaning",
    ],
    sustainability: [
      { label: "Downtime", value: 29, suffix: "%", color: "#73E0FF" },
      { label: "Rinse", value: 33, suffix: "%", color: "#A8FFCF" },
      { label: "Waste", value: 21, suffix: "%", color: "#E3FFF7" },
    ],
    capabilities: [
      { label: "Line safety", score: 95 },
      { label: "Residue control", score: 93 },
      { label: "Audit readiness", score: 90 },
    ],
    relationships: [
      { targetId: "smart-dose", kind: "compatible", label: "Inline dosing logic" },
      { targetId: "sanitize-pulse", kind: "complementary", label: "Terminal sanitation" },
      { targetId: "torque-x90", kind: "replacement", label: "For non-food heavy grease lines" },
    ],
    aiPrompts: [
      {
        query: "I clean food plants.",
        protocol: "Run CIP Matrix as the circulation phase, validate conductivity, then finish with sanitation if the line changes product class.",
        requiredProducts: ["CleanLine CIP Matrix", "SmartDose Rail", "Sanitize Pulse One"],
        dilution: "1:75 circulation start, auto-correct by conductivity",
        safety: "Lock out feed valves and confirm post-rinse pH neutrality.",
        environmental: "Reduces rinse demand by 33% and downtime by 29%.",
        crossSell: "Add Recovery Loop XR when your plant wants to reclaim final rinse water.",
      },
    ],
  },
  {
    id: "nano-shield",
    chapter: "Product 04",
    name: "Nano Shield Flex",
    category: "Surface Protection",
    purpose: "Protective nano-film for painted metal, glass, and high-touch surfaces.",
    technology: "Self-leveling ceramic polymer with low-friction contamination release.",
    industries: ["hotel", "transportation", "smart-city"],
    protocols: ["Protective finishing", "Low-friction maintenance layer"],
    chemicalFamily: "Nano ceramic polymer",
    equipmentCompatibility: ["Microfiber applicators", "Airless finish guns", "Manual buffing pads"],
    storyBeat: "Protection becomes part of the maintenance system, not a cosmetic afterthought.",
    transitionCue: "Reflective skins harden into luminous maintenance envelopes.",
    model: {
      silhouette: "shield",
      anchor: [-7.4, -0.15, 1],
      scale: 1,
      primary: "#8EDCFF",
      secondary: "#7A8BFF",
      accent: "#D7DEFF",
      glow: "#B1C6FF",
    },
    hotspots: [
      {
        id: "shield-shell",
        label: "Film",
        title: "Ceramic micro-film",
        description: "Creates a transparent barrier that slows contamination adhesion and shortens future cleaning cycles.",
        layer: "Technology",
        position: [0, 0.85, 0.9],
      },
      {
        id: "shield-edge",
        label: "Edge",
        title: "Flexible edge retention",
        description: "Maintains coverage on vehicle seams, elevator frames, and public infrastructure details.",
        layer: "Technical specifications",
        position: [0.95, -0.2, 0.2],
      },
      {
        id: "shield-impact",
        label: "Benefit",
        title: "Fewer deep cleans",
        description: "Cuts abrasive maintenance frequency on visible premium surfaces.",
        layer: "Sustainability",
        position: [-0.95, -0.35, 0.25],
      },
    ],
    specifications: [
      { label: "Coverage", value: "180 m² / 5 L" },
      { label: "Cure time", value: "22 min" },
      { label: "Gloss retention", value: "92%" },
      { label: "Protection cycle", value: "30 days" },
    ],
    safetyDocumentation: [
      "Ventilated application guide",
      "Glass-safe use bulletin",
      "Slip-risk mitigation checklist",
    ],
    applicationVideos: [
      "Premium hotel surface shielding",
      "Transit window contamination release",
    ],
    sustainability: [
      { label: "Chemical", value: 27, suffix: "%", color: "#8EDCFF" },
      { label: "Deep clean", value: 34, suffix: "%", color: "#7A8BFF" },
      { label: "Recyclability", value: 82, suffix: "%", color: "#D7DEFF" },
    ],
    capabilities: [
      { label: "Surface longevity", score: 91 },
      { label: "Visual finish", score: 95 },
      { label: "Maintenance reduction", score: 87 },
    ],
    relationships: [
      { targetId: "enzyme-core", kind: "compatible", label: "Pre-clean before coating" },
      { targetId: "transit-foam", kind: "complementary", label: "Vehicle finishing stage" },
      { targetId: "sanitize-pulse", kind: "complementary", label: "Protected high-touch sanitation" },
    ],
    aiPrompts: [
      {
        query: "I protect painted metal.",
        protocol: "Decontaminate first, apply Nano Shield Flex, and schedule low-chem maintenance cycles afterward.",
        requiredProducts: ["Nano Shield Flex", "OVI Enzyme Core"],
        dilution: "Ready-to-use protective layer",
        safety: "Apply in ventilated areas and keep surfaces dry until the 22-minute cure completes.",
        environmental: "Reduces deep-clean chemistry by 27% over the protection cycle.",
        crossSell: "Use SmartDose Rail to keep pre-clean dilution consistent across crews.",
      },
    ],
  },
  {
    id: "sanitize-pulse",
    chapter: "Product 05",
    name: "Sanitize Pulse One",
    category: "Sanitation",
    purpose: "Terminal sanitation formula for high-touch and regulated environments.",
    technology: "Rapid-kill oxidizing pulse with controlled dwell response.",
    industries: ["hospital", "hotel", "smart-city"],
    protocols: ["Terminal sanitation", "High-touch pulse"],
    chemicalFamily: "Stabilized oxidizing system",
    equipmentCompatibility: ["Electrostatic sprayers", "Trigger bottles", "Fogger rails"],
    storyBeat: "Sanitation acts as a visible confidence layer across public-facing spaces.",
    transitionCue: "High-touch risk maps collapse into a sterile light pulse.",
    model: {
      silhouette: "bottle",
      anchor: [0.4, 0.15, -4],
      scale: 1.04,
      primary: "#7FE5FF",
      secondary: "#D2F4FF",
      accent: "#79FFD3",
      glow: "#E8FFFF",
    },
    hotspots: [
      {
        id: "sanitize-cap",
        label: "Cap",
        title: "Measured pulse cap",
        description: "Delivers controlled output for repeatable dwell time across high-risk touchpoints.",
        layer: "Purpose",
        position: [0, 1.45, 0],
      },
      {
        id: "sanitize-core",
        label: "Core",
        title: "Rapid-kill active core",
        description: "Targets sanitation outcomes without lingering residue on regulated surfaces.",
        layer: "Technology",
        position: [0.9, 0.15, 0.55],
      },
      {
        id: "sanitize-safety",
        label: "Safety",
        title: "Operator-safe handling envelope",
        description: "Supports regulated use with documented PPE and ventilation requirements.",
        layer: "Safety documentation",
        position: [-0.9, -0.35, 0.45],
      },
    ],
    specifications: [
      { label: "Dwell", value: "90 sec" },
      { label: "Spectrum", value: "Broad, rapid-kill" },
      { label: "Residue", value: "Low" },
      { label: "Packaging", value: "1 L / 5 L" },
    ],
    safetyDocumentation: [
      "Terminal sanitation PPE bulletin",
      "High-touch ventilation requirements",
      "Oxidizer storage separation guide",
    ],
    applicationVideos: [
      "Hospital terminal reset",
      "Hotel high-touch sanitation route",
    ],
    sustainability: [
      { label: "Water", value: 19, suffix: "%", color: "#79FFD3" },
      { label: "Residue", value: 32, suffix: "%", color: "#7FE5FF" },
      { label: "Confidence", value: 97, suffix: "%", color: "#D2F4FF" },
    ],
    capabilities: [
      { label: "Regulated use", score: 94 },
      { label: "Speed", score: 96 },
      { label: "Residue control", score: 83 },
    ],
    relationships: [
      { targetId: "enzyme-core", kind: "compatible", label: "Pre-clean before sanitize" },
      { targetId: "nano-shield", kind: "complementary", label: "Protect high-touch finishes" },
      { targetId: "smart-dose", kind: "compatible", label: "Precise trigger refills" },
    ],
    aiPrompts: [
      {
        query: "I sanitize hospitals.",
        protocol: "Remove organic load, apply sanitation pulse, validate dwell, then reopen the zone.",
        requiredProducts: ["Sanitize Pulse One", "OVI Enzyme Core", "SmartDose Rail"],
        dilution: "Ready-to-use in critical zones",
        safety: "Use eye protection, ensure ventilation, and avoid combining with strong acids.",
        environmental: "Reduces repeated sanitation passes through fast verified dwell times.",
        crossSell: "Add Nano Shield Flex where glass and metal need a lower-maintenance follow-up.",
      },
    ],
  },
  {
    id: "torque-x90",
    chapter: "Product 06",
    name: "Torque X90",
    category: "Maintenance",
    purpose: "Heavy-duty degreaser for workshops, manufacturing cells, and service decks.",
    technology: "High-load soil release with controlled evaporation.",
    industries: ["manufacturing", "mining", "oil-gas"],
    protocols: ["Heavy grease removal", "Service bay reset"],
    chemicalFamily: "High-load degreasing hybrid",
    equipmentCompatibility: ["Parts washers", "Manual spray rigs", "Maintenance rails"],
    storyBeat: "Maintenance chemistry acts like uptime insurance for machinery.",
    transitionCue: "Grease fields collapse into torque geometry and service paths.",
    model: {
      silhouette: "canister",
      anchor: [7.1, 0.35, -9],
      scale: 1.12,
      primary: "#52C8FF",
      secondary: "#7AA8FF",
      accent: "#C9DBFF",
      glow: "#9AD7FF",
    },
    hotspots: [
      {
        id: "torque-handle",
        label: "Handle",
        title: "Workshop-safe grip geometry",
        description: "Designed for controlled dosing in high-glove, high-speed maintenance environments.",
        layer: "Purpose",
        position: [0, 1.35, -0.1],
      },
      {
        id: "torque-core",
        label: "Core",
        title: "Heavy-load release blend",
        description: "Attacks grease, hydrocarbons, and compacted soils without overstaying on metal.",
        layer: "Technology",
        position: [0.95, 0.2, 0.55],
      },
      {
        id: "torque-match",
        label: "Match",
        title: "Machine uptime fit",
        description: "Optimized for service decks, robotic cells, and drivetrain maintenance workflows.",
        layer: "Industries",
        position: [-0.9, -0.45, 0.45],
      },
    ],
    specifications: [
      { label: "Dilution", value: "1:10 to 1:30" },
      { label: "Flash-off", value: "Controlled" },
      { label: "Metal compatibility", value: "Validated" },
      { label: "Packaging", value: "10 L canister" },
    ],
    safetyDocumentation: [
      "Hydrocarbon handling guide",
      "Workshop ventilation checklist",
      "Seal and gasket compatibility matrix",
    ],
    applicationVideos: [
      "Assembly cell degreasing",
      "Mining service bay maintenance",
    ],
    sustainability: [
      { label: "Downtime", value: 21, suffix: "%", color: "#52C8FF" },
      { label: "Wear", value: 19, suffix: "%", color: "#7AA8FF" },
      { label: "Waste", value: 16, suffix: "%", color: "#C9DBFF" },
    ],
    capabilities: [
      { label: "Soil load", score: 96 },
      { label: "Metal safety", score: 82 },
      { label: "Service speed", score: 88 },
    ],
    relationships: [
      { targetId: "transit-foam", kind: "compatible", label: "Fleet undercarriage stage" },
      { targetId: "clean-line", kind: "replacement", label: "For non-food grease systems" },
      { targetId: "smart-dose", kind: "complementary", label: "Consistent workshop dilution" },
    ],
    aiPrompts: [
      {
        query: "I clean maintenance workshops.",
        protocol: "Break heavy grease first, rinse once, and route contaminated water into reclamation when available.",
        requiredProducts: ["Torque X90", "Recovery Loop XR"],
        dilution: "1:20 on machinery, 1:10 for pits and service decks",
        safety: "Use gloves, goggles, and confirm ventilation before spraying enclosed equipment bays.",
        environmental: "Cuts repeat degreasing passes and lowers chemical waste by 16%.",
        crossSell: "Use SmartDose Rail to standardize dilution across shifts.",
      },
    ],
  },
  {
    id: "recovery-loop",
    chapter: "Product 07",
    name: "Recovery Loop XR",
    category: "Water Recovery",
    purpose: "Water reclamation module for wash, rinse, and sanitation programs.",
    technology: "Multi-stage filtration with reuse scoring and contamination alerts.",
    industries: ["transportation", "mining", "smart-city"],
    protocols: ["Water reclamation", "Closed rinse loop"],
    chemicalFamily: "Mechanical + membrane recovery",
    equipmentCompatibility: ["Wash tunnels", "Open-bay reclaim pits", "Central utility loops"],
    storyBeat: "Water becomes a controlled resource inside the cleaning ecosystem.",
    transitionCue: "Runoff becomes a luminous recirculation loop.",
    model: {
      silhouette: "tank",
      anchor: [2.2, -0.35, -16],
      scale: 1.05,
      primary: "#66D8FF",
      secondary: "#79FFD3",
      accent: "#D8FFF6",
      glow: "#9DEFFF",
    },
    hotspots: [
      {
        id: "recovery-loop-inlet",
        label: "Inlet",
        title: "Contaminant capture inlet",
        description: "Starts the reuse cycle by separating solids before chemistry re-enters the process.",
        layer: "Purpose",
        position: [1.2, 0.1, 0],
      },
      {
        id: "recovery-loop-core",
        label: "Filter",
        title: "Membrane recovery core",
        description: "Balances particulate retention, pressure, and usable water output for reuse protocols.",
        layer: "Technical specifications",
        position: [0, 0.8, 0.7],
      },
      {
        id: "recovery-loop-impact",
        label: "Impact",
        title: "Water reuse intelligence",
        description: "Feeds environmental dashboards with reclaimed volume and contamination warnings.",
        layer: "AI recommendations",
        position: [-1.05, -0.4, 0.45],
      },
    ],
    specifications: [
      { label: "Reuse", value: "Up to 70%" },
      { label: "Flow", value: "120 L/min" },
      { label: "Alerting", value: "Integrated" },
      { label: "Filter stages", value: "4" },
    ],
    safetyDocumentation: [
      "Contaminated water handling SOP",
      "Filter swap lockout guide",
      "Reuse threshold validation checklist",
    ],
    applicationVideos: [
      "Fleet wash water reclamation",
      "Mining wash frame reuse loop",
    ],
    sustainability: [
      { label: "Water", value: 70, suffix: "%", color: "#79FFD3" },
      { label: "Discharge", value: 41, suffix: "%", color: "#66D8FF" },
      { label: "Reuse", value: 64, suffix: "%", color: "#D8FFF6" },
    ],
    capabilities: [
      { label: "Reuse rate", score: 95 },
      { label: "Alerting", score: 84 },
      { label: "System fit", score: 86 },
    ],
    relationships: [
      { targetId: "transit-foam", kind: "compatible", label: "Fleet wash water recovery" },
      { targetId: "torque-x90", kind: "complementary", label: "Workshop water capture" },
      { targetId: "smart-dose", kind: "complementary", label: "Closed-loop dosing corrections" },
    ],
    aiPrompts: [
      {
        query: "I want to reduce water waste.",
        protocol: "Capture the first rinse, filter it, score quality, then route usable water back into low-risk stages.",
        requiredProducts: ["Recovery Loop XR", "Transit Foam Vector"],
        dilution: "Not applicable — recovery module",
        safety: "Validate contamination thresholds before any reuse in regulated areas.",
        environmental: "Reclaims up to 70% of wash water and cuts discharge by 41%.",
        crossSell: "Connect SmartDose Rail to auto-correct chemistry as reused water properties shift.",
      },
    ],
  },
  {
    id: "smart-dose",
    chapter: "Product 08",
    name: "SmartDose Rail",
    category: "Professional Equipment",
    purpose: "Connected dosing hardware for industrial, sanitation, and fleet programs.",
    technology: "Sensor-led mixing with protocol locking and AI-adjusted output.",
    industries: [
      "hospital",
      "food-processing",
      "manufacturing",
      "transportation",
      "smart-city",
    ],
    protocols: ["Auto dosing", "Protocol locking"],
    chemicalFamily: "Connected equipment",
    equipmentCompatibility: ["Wall rails", "Tunnel skids", "Mobile carts"],
    storyBeat: "Equipment becomes the nervous system that orchestrates the product ecosystem.",
    transitionCue: "The ecosystem condenses into an industry-selection control spine.",
    model: {
      silhouette: "tool",
      anchor: [-1.5, 0.25, -23],
      scale: 1.06,
      primary: "#5ECFFF",
      secondary: "#7AFFC8",
      accent: "#B2E7FF",
      glow: "#8CFFF1",
    },
    hotspots: [
      {
        id: "smart-dose-screen",
        label: "Screen",
        title: "Protocol lock interface",
        description: "Keeps every dilution, route, and refill cycle aligned with the approved cleaning program.",
        layer: "AI recommendations",
        position: [0, 0.95, 0.7],
      },
      {
        id: "smart-dose-manifold",
        label: "Manifold",
        title: "Multi-channel dosing manifold",
        description: "Switches products without exposing operators to manual mixing drift.",
        layer: "Technology",
        position: [1.05, -0.1, 0.1],
      },
      {
        id: "smart-dose-mount",
        label: "Mount",
        title: "Rail-mounted deployment",
        description: "Moves from fixed walls to fleet tunnels and mobile carts without breaking protocol consistency.",
        layer: "Industries",
        position: [-0.95, -0.65, 0.25],
      },
    ],
    specifications: [
      { label: "Channels", value: "4" },
      { label: "Protocol lock", value: "Yes" },
      { label: "Telemetry", value: "Live" },
      { label: "Power", value: "24 V DC" },
    ],
    safetyDocumentation: [
      "Connected dosing lockout sheet",
      "Cross-chemical segregation guide",
      "Remote maintenance checklist",
    ],
    applicationVideos: [
      "Hospital dilution automation",
      "Fleet tunnel protocol switching",
    ],
    sustainability: [
      { label: "Overuse", value: 28, suffix: "%", color: "#7AFFC8" },
      { label: "Consistency", value: 98, suffix: "%", color: "#5ECFFF" },
      { label: "Waste", value: 22, suffix: "%", color: "#B2E7FF" },
    ],
    capabilities: [
      { label: "Automation", score: 97 },
      { label: "Protocol safety", score: 93 },
      { label: "Cross-system fit", score: 92 },
    ],
    relationships: [
      { targetId: "enzyme-core", kind: "compatible", label: "Bio-dose automation" },
      { targetId: "clean-line", kind: "compatible", label: "Inline CIP correction" },
      { targetId: "recovery-loop", kind: "complementary", label: "Closed-loop chemistry tuning" },
    ],
    aiPrompts: [
      {
        query: "I manage multiple cleaning protocols.",
        protocol: "Lock chemistry by zone, automate refills, and let telemetry rebalance output as demand changes.",
        requiredProducts: ["SmartDose Rail", "OVI Enzyme Core", "CleanLine CIP Matrix"],
        dilution: "Managed automatically by the rail controller",
        safety: "Restrict admin mode to trained operators and validate channel segregation before startup.",
        environmental: "Reduces over-dosing by 28% while protecting consistency across shifts.",
        crossSell: "Connect Recovery Loop XR to adapt chemistry when reclaimed water re-enters the system.",
      },
    ],
  },
];

export const PRODUCTS_BY_ID = new Map(PRODUCTS.map((product) => [product.id, product]));

export const PRODUCT_CONNECTIONS = PRODUCTS.flatMap((product) =>
  product.relationships
    .filter((relationship) => product.id < relationship.targetId)
    .map((relationship) => ({
      from: product.id,
      to: relationship.targetId,
      kind: relationship.kind,
    })),
);

const SEARCH_KEYWORDS: Record<string, Array<IndustryId | string>> = {
  hospital: ["hospital", "health", "clinic", "sterile"],
  hotel: ["hotel", "hospitality", "suite", "guest"],
  "food-processing": ["food", "plant", "cip", "processing", "dairy"],
  manufacturing: ["factory", "manufacturing", "assembly", "workshop"],
  mining: ["mining", "mine", "haul", "ore"],
  "oil-gas": ["oil", "gas", "hydrocarbon", "refinery"],
  transportation: ["bus", "buses", "fleet", "transport", "vehicle"],
  "smart-city": ["city", "urban", "public", "civic"],
};

export const clampToUnitRange = (value: number) => Math.min(1, Math.max(0, value));

export function getProductIndex(progress: number): number {
  const normalized = clampToUnitRange(progress);
  return Math.min(PRODUCTS.length - 1, Math.floor(normalized * PRODUCTS.length));
}

export function getProductProgress(progress: number, index: number): number {
  const span = 1 / PRODUCTS.length;
  const start = span * index;
  return clampToUnitRange((clampToUnitRange(progress) - start) / span);
}

export function getHeadline(progress: number): string {
  const index = Math.min(
    PRODUCT_HEADLINES.length - 1,
    Math.floor(clampToUnitRange(progress) * PRODUCT_HEADLINES.length),
  );
  return PRODUCT_HEADLINES[index];
}

export function getLayerIndex(segmentProgress: number): number {
  return Math.min(
    PRODUCT_INFORMATION_LAYERS.length - 1,
    Math.floor(clampToUnitRange(segmentProgress) * PRODUCT_INFORMATION_LAYERS.length),
  );
}

export function getProductById(productId: string) {
  return PRODUCTS_BY_ID.get(productId) ?? PRODUCTS[0];
}

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9\s]/g, " ").trim();
}

function getKeywords(query: string): string[] {
  return normalize(query).split(/\s+/).filter(Boolean);
}

function scoreProduct(product: ProductDefinition, terms: string[]): number {
  if (terms.length === 0) return 0;

  let score = 0;
  const haystack = normalize(
    [
      product.name,
      product.category,
      product.purpose,
      product.technology,
      product.chemicalFamily,
      product.protocols.join(" "),
      product.equipmentCompatibility.join(" "),
      product.industries.join(" "),
    ].join(" "),
  );

  terms.forEach((term) => {
    if (haystack.includes(term)) score += 4;
    Object.entries(SEARCH_KEYWORDS).forEach(([industry, aliases]) => {
      if (aliases.some((alias) => String(alias).includes(term)) && product.industries.includes(industry as IndustryId)) {
        score += 6;
      }
    });
  });

  return score;
}

export function getSearchResults(query: string): SearchResult[] {
  const terms = getKeywords(query);
  if (terms.length === 0) {
    return PRODUCTS.map((product, index) => ({
      productId: product.id,
      score: PRODUCTS.length - index,
    }));
  }

  return PRODUCTS.map((product) => ({ productId: product.id, score: scoreProduct(product, terms) }))
    .filter((result) => result.score > 0)
    .sort((left, right) => right.score - left.score);
}

export function getVisibleProductIds(query: string, industryId: IndustryId | null): string[] {
  const searchResults = getSearchResults(query);
  const searchIds = searchResults.map((result) => result.productId);

  return PRODUCTS.filter((product) => {
    const matchesIndustry = !industryId || product.industries.includes(industryId);
    const matchesQuery = searchIds.length === 0 || searchIds.includes(product.id);
    return matchesIndustry && matchesQuery;
  }).map((product) => product.id);
}

export function getIndustryLabel(industryId: IndustryId) {
  return INDUSTRY_OPTIONS.find((option) => option.id === industryId)?.label ?? industryId;
}

export function getComparisonProduct(product: ProductDefinition, compareId?: string | null) {
  if (compareId && PRODUCTS_BY_ID.has(compareId)) {
    return PRODUCTS_BY_ID.get(compareId) ?? product;
  }

  const candidate = product.relationships[0]?.targetId;
  return candidate ? (PRODUCTS_BY_ID.get(candidate) ?? product) : product;
}

export function getAiRecommendation(product: ProductDefinition, query: string) {
  const normalizedQuery = normalize(query);
  const matched = product.aiPrompts.find((prompt) => normalize(prompt.query) === normalizedQuery)
    ?? product.aiPrompts.find((prompt) => normalizedQuery && normalize(prompt.query).includes(normalizedQuery))
    ?? product.aiPrompts[0];

  return matched;
}
