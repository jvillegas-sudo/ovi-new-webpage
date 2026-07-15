/**
 * OVI Knowledge Base — Main Export Barrel
 * FASE 1 · Foundation Order 001
 *
 * Single entry point for the entire OVI Knowledge Base.
 * All platform modules should import from here via:
 *
 *   import { products, getProduct, resolveSolution } from '@knowledge'
 *
 * ─── Catalog exports ──────────────────────────────────────────────────────────
 */

// Types
export type {
  KbStatus,
  OviContaminationType,
  OviSurface,
  OviSector,
  OviProtocol,
  OviEquipment,
  OviMedia,
  OviDocument,
  OviDocumentType,
  OviService,
  OviProduct,
  OviProductCategory,
  OviKnowledgeBase,
} from "./types";

// Contamination types
export { contaminationTypes, getContaminationType, getContaminationTypesByDifficulty, getContaminationTypesBySector } from "./contamination";

// Surfaces
export { surfaces, getSurface, getSurfacesBySensitivity } from "./surfaces";

// Sectors
export { sectors, getSector, getSectorsByProduct, getSectorsByService } from "./sectors";

// Industries (alias for sectors)
export { industries, getIndustry, getIndustriesByProduct, getIndustriesByService } from "./industries";

// Protocols
export { protocols, getProtocol, getProtocolByCode, getProtocolsBySector, getProtocolsByProduct } from "./protocols";

// Equipment
export { equipment, getEquipment, getEquipmentByCategory, getEquipmentByProduct } from "./equipment";

// Services
export { services, getService, getServicesBySector, getServicesByProduct, getServicesByProtocol } from "./services";

// Products
export {
  products,
  getProduct,
  getProductsByCategory,
  getProductsBySector,
  getProductsByContamination,
  getProductsBySurface,
  getProductsByIds,
} from "./products";

// Media
export { media, getMedia, getMediaByEntity } from "./media";

// Documents
export { documents, getDocument, getDocumentsByEntity, getDocumentsByType } from "./documents";

// ─── Relational queries ────────────────────────────────────────────────────────

export {
  getSolutionForContamination,
  getSolutionForSurface,
  resolveSolution,
  getSectorOverview,
  getProductContext,
} from "./queries";

export type { OviSolutionResult } from "./queries";

// ─── Version metadata ─────────────────────────────────────────────────────────

export const KB_VERSION = "1.0.0";
export const KB_PHASE = "FASE 1 — Foundation Order 001";
export const KB_STATUS = "ACTIVE";
