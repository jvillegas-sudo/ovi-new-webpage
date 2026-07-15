/**
 * OVI Asset Library — Official Materials
 * Work Order: WO-016
 *
 * Shared PBR material definitions for the entire OVI platform.
 * No scene should define independent materials for industrial assets
 * contemplated here. All scenes share this library.
 *
 * Compatible with React Three Fiber <meshStandardMaterial> props.
 */

export interface OviMaterialProps {
  readonly color: string;
  readonly metalness: number;
  readonly roughness: number;
  readonly emissive?: string;
  readonly emissiveIntensity?: number;
}

// ─── Material definitions ─────────────────────────────────────────────────────

/**
 * OVI Steel — Brushed industrial steel.
 * Used for: vehicle bodies, structural frames, equipment housings.
 */
export const OVI_STEEL: OviMaterialProps = {
  color: "#1C2836",
  metalness: 0.92,
  roughness: 0.28,
};

/**
 * OVI Steel Clean — Same as OVI Steel but for post-cleaning state.
 */
export const OVI_STEEL_CLEAN: OviMaterialProps = {
  color: "#243545",
  metalness: 0.92,
  roughness: 0.18,
  emissive: "#001A2A",
  emissiveIntensity: 0.15,
};

/**
 * OVI Steel Contaminated — Dirty/corroded steel state.
 */
export const OVI_STEEL_CONTAMINATED: OviMaterialProps = {
  color: "#221508",
  metalness: 0.35,
  roughness: 0.88,
};

/**
 * OVI Glass — Tempered glass for windshields and facades.
 */
export const OVI_GLASS: OviMaterialProps = {
  color: "#00C4FF",
  metalness: 0.05,
  roughness: 0.04,
  emissive: "#004466",
  emissiveIntensity: 0.6,
};

/**
 * OVI Water — Liquid surfaces and water effects.
 */
export const OVI_WATER: OviMaterialProps = {
  color: "#003A5C",
  metalness: 0.1,
  roughness: 0.02,
  emissive: "#001020",
  emissiveIntensity: 0.1,
};

/**
 * OVI Foam — Cleaning foam and product application.
 */
export const OVI_FOAM: OviMaterialProps = {
  color: "#FFFFFF",
  metalness: 0.0,
  roughness: 0.98,
};

/**
 * OVI Mist — Steam and vapor effects.
 */
export const OVI_MIST: OviMaterialProps = {
  color: "#B0C8D4",
  metalness: 0.0,
  roughness: 1.0,
};

/**
 * OVI Concrete — Industrial floors and facades.
 */
export const OVI_CONCRETE: OviMaterialProps = {
  color: "#1A1C1E",
  metalness: 0.0,
  roughness: 0.9,
};

/**
 * OVI Industrial Paint — Equipment paint, signage.
 */
export const OVI_INDUSTRIAL_PAINT: OviMaterialProps = {
  color: "#152030",
  metalness: 0.05,
  roughness: 0.45,
};

/**
 * OVI Rubber — Tires, gaskets, hoses.
 */
export const OVI_RUBBER: OviMaterialProps = {
  color: "#0A0800",
  metalness: 0.0,
  roughness: 0.95,
};

/**
 * OVI Rubber Clean — Cleaned tires.
 */
export const OVI_RUBBER_CLEAN: OviMaterialProps = {
  color: "#1A1A1A",
  metalness: 0.2,
  roughness: 0.95,
};

/**
 * OVI Plastic — Product containers and control panels.
 */
export const OVI_PLASTIC: OviMaterialProps = {
  color: "#1A2535",
  metalness: 0.0,
  roughness: 0.55,
};

// ─── Consolidated export ──────────────────────────────────────────────────────

export const OVI_MATERIALS = {
  steel: OVI_STEEL,
  steelClean: OVI_STEEL_CLEAN,
  steelContaminated: OVI_STEEL_CONTAMINATED,
  glass: OVI_GLASS,
  water: OVI_WATER,
  foam: OVI_FOAM,
  mist: OVI_MIST,
  concrete: OVI_CONCRETE,
  industrialPaint: OVI_INDUSTRIAL_PAINT,
  rubber: OVI_RUBBER,
  rubberClean: OVI_RUBBER_CLEAN,
  plastic: OVI_PLASTIC,
} as const;

export type OviMaterialKey = keyof typeof OVI_MATERIALS;

/**
 * Returns interpolated material props between two OVI materials.
 * Useful for animated contamination/cleaning transitions.
 *
 * @param from  Source material
 * @param to    Target material
 * @param t     Blend factor 0–1 (0 = from, 1 = to)
 */
export function blendOviMaterials(
  from: OviMaterialProps,
  to: OviMaterialProps,
  t: number,
): OviMaterialProps {
  const lerp = (a: number, b: number) => a + (b - a) * t;
  return {
    color: to.color, // Color is interpolated by Three.js via meshStandardMaterial
    metalness: lerp(from.metalness, to.metalness),
    roughness: lerp(from.roughness, to.roughness),
    emissive: to.emissive ?? from.emissive,
    emissiveIntensity: lerp(
      from.emissiveIntensity ?? 0,
      to.emissiveIntensity ?? 0,
    ),
  };
}
