/**
 * OVI Asset Library — Official Catalog
 * Work Order: WO-016
 *
 * Typed registry of all OAL assets. Every asset used across the OVI platform
 * must have an entry here. Scenes load assets by ID via useOalAsset().
 */

export type OalCategory =
  | "transport"
  | "industry"
  | "institutional"
  | "products"
  | "materials"
  | "effects"
  | "environment"
  | "ui"
  | "placeholders";

export type OalAssetStatus =
  | "pending"    // Not yet integrated — use OalAssetPlaceholder
  | "wip"        // In progress
  | "ready"      // Asset file available, not yet validated
  | "integrated" // Fully integrated and validated
  | "archived";  // Deprecated, kept for reference

export interface OalLodEntry {
  readonly level: "lod0" | "lod1" | "lod2";
  readonly path: string;
  /** Max distance from camera at which this LOD is active (meters) */
  readonly maxDistance: number;
}

export interface OalAnimationEntry {
  readonly name: string;
  readonly loop: boolean;
}

export interface OalHotspotEntry {
  readonly nodeId: string;
  readonly label: string;
}

export interface OalAssetEntry {
  readonly id: string;
  readonly name: string;
  readonly nameEs: string;
  readonly category: OalCategory;
  readonly status: OalAssetStatus;
  /** Path relative to /assets — undefined if status === 'pending' */
  readonly path?: string;
  readonly lods?: readonly OalLodEntry[];
  readonly animations?: readonly OalAnimationEntry[];
  readonly hotspots?: readonly OalHotspotEntry[];
  /** Original Work Order that requested this asset */
  readonly requestedBy?: string;
}

// ─── Transport ────────────────────────────────────────────────────────────────

const TRANSPORT_ASSETS: readonly OalAssetEntry[] = [
  {
    id: "OAL-TR-001",
    name: "Garbage Truck",
    nameEs: "Camión Recolector",
    category: "transport",
    status: "pending",
    requestedBy: "WO-016",
    animations: [
      { name: "idle", loop: true },
      { name: "contaminated", loop: false },
      { name: "clean", loop: false },
    ],
    hotspots: [
      { nodeId: "hotspot_front", label: "Cabina" },
      { nodeId: "hotspot_rear", label: "Tolva hidráulica" },
      { nodeId: "hotspot_engine", label: "Sistema hidráulico" },
    ],
  },
  {
    id: "OAL-TR-002",
    name: "Urban Bus",
    nameEs: "Bus Urbano",
    category: "transport",
    status: "pending",
    requestedBy: "WO-016",
    animations: [
      { name: "idle", loop: true },
      { name: "contaminated", loop: false },
      { name: "clean", loop: false },
    ],
    hotspots: [
      { nodeId: "hotspot_front", label: "Fachada frontal" },
      { nodeId: "hotspot_chassis", label: "Chasis y tren motriz" },
      { nodeId: "hotspot_interior", label: "Interior" },
    ],
  },
  {
    id: "OAL-TR-003",
    name: "Semi-Truck",
    nameEs: "Tractocamión",
    category: "transport",
    status: "pending",
    requestedBy: "WO-016",
    animations: [
      { name: "idle", loop: true },
      { name: "contaminated", loop: false },
      { name: "clean", loop: false },
    ],
  },
  {
    id: "OAL-TR-004",
    name: "Cargo Truck",
    nameEs: "Camión de Carga",
    category: "transport",
    status: "pending",
    requestedBy: "WO-016",
    animations: [
      { name: "idle", loop: true },
      { name: "contaminated", loop: false },
      { name: "clean", loop: false },
    ],
  },
];

// ─── Industry ─────────────────────────────────────────────────────────────────

const INDUSTRY_ASSETS: readonly OalAssetEntry[] = [
  {
    id: "OAL-IN-001",
    name: "Solar Panel",
    nameEs: "Panel Solar",
    category: "industry",
    status: "pending",
    requestedBy: "WO-016",
  },
  {
    id: "OAL-IN-002",
    name: "Industrial Tank",
    nameEs: "Tanque Industrial",
    category: "industry",
    status: "pending",
    requestedBy: "WO-016",
    hotspots: [
      { nodeId: "hotspot_top", label: "Tapa superior" },
      { nodeId: "hotspot_valve", label: "Válvula de descarga" },
    ],
  },
  {
    id: "OAL-IN-003",
    name: "Conveyor Belt",
    nameEs: "Banda Transportadora",
    category: "industry",
    status: "pending",
    requestedBy: "WO-016",
    animations: [{ name: "loop", loop: true }],
  },
  {
    id: "OAL-IN-004",
    name: "Industrial Floor",
    nameEs: "Piso Industrial",
    category: "industry",
    status: "pending",
    requestedBy: "WO-016",
  },
  {
    id: "OAL-IN-005",
    name: "Industrial Facade",
    nameEs: "Fachada",
    category: "industry",
    status: "pending",
    requestedBy: "WO-016",
  },
];

// ─── Full catalog map ─────────────────────────────────────────────────────────

const ALL_ASSETS = [...TRANSPORT_ASSETS, ...INDUSTRY_ASSETS] as const;

export const OAL_CATALOG: Readonly<Record<string, OalAssetEntry>> =
  Object.fromEntries(ALL_ASSETS.map((a) => [a.id, a]));

/** Returns all assets in a given category */
export function getAssetsByCategory(category: OalCategory): OalAssetEntry[] {
  return ALL_ASSETS.filter((a) => a.category === category);
}

/** Returns all pending assets (require placeholder in 3D scenes) */
export function getPendingAssets(): OalAssetEntry[] {
  return ALL_ASSETS.filter((a) => a.status === "pending" || a.status === "wip");
}

/** Returns true if an asset is ready for integration */
export function isAssetReady(id: string): boolean {
  const asset = OAL_CATALOG[id];
  if (!asset) return false;
  return asset.status === "integrated" || asset.status === "ready";
}
