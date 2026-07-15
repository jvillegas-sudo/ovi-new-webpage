/**
 * OVI Asset Library — Public API
 * Work Order: WO-016
 */

// Catalog
export {
  OAL_CATALOG,
  getAssetsByCategory,
  getPendingAssets,
  isAssetReady,
} from "./catalog";
export type {
  OalCategory,
  OalAssetStatus,
  OalAssetEntry,
  OalLodEntry,
  OalAnimationEntry,
  OalHotspotEntry,
} from "./catalog";

// Materials
export {
  OVI_MATERIALS,
  OVI_STEEL,
  OVI_STEEL_CLEAN,
  OVI_STEEL_CONTAMINATED,
  OVI_GLASS,
  OVI_WATER,
  OVI_FOAM,
  OVI_MIST,
  OVI_CONCRETE,
  OVI_INDUSTRIAL_PAINT,
  OVI_RUBBER,
  OVI_RUBBER_CLEAN,
  OVI_PLASTIC,
  blendOviMaterials,
} from "./materials";
export type { OviMaterialProps, OviMaterialKey } from "./materials";

// Loader
export {
  resolveOalPath,
  selectLodLevel,
  extractHotspots,
  useOalAsset,
  useOalAnimation,
  preloadOalAssets,
  DRACO_DECODER_PATH,
  KTX2_TRANSCODER_PATH,
} from "./loader";
export type { OalLodLevel, OalHotspot } from "./loader";

// Placeholder
export { OalAssetPlaceholder } from "./OalAssetPlaceholder";
