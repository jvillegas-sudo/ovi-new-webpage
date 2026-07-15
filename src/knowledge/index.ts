/**
 * OVI Knowledge Base — Main Export Barrel
 * FASE 1 · Work Order 002
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

// Official Work Order 002 models
export type {
  OviKnowledgeStatus,
  OviKnowledgeProduct,
  OviKnowledgeService,
  OviKnowledgeProtocol,
  OviKnowledgeContaminant,
  OviKnowledgeSurface,
  OviKnowledgeSector,
} from "./shared";

// Contamination types
export {
  contaminationTypes,
  getContaminationType,
  getContaminationTypesByDifficulty,
  getContaminationTypesBySector,
} from "./contamination";

// Contaminants (official Work Order 002 naming)
export { contaminants, getContaminant } from "./contaminants";

// Surfaces
export {
  surfaces,
  officialSurfaces,
  getSurface,
  getSurfacesBySensitivity,
  getOfficialSurface,
} from "./surfaces";

// Sectors
export {
  sectors,
  officialSectors,
  getSector,
  getOfficialSector,
  getSectorsByProduct,
  getSectorsByService,
} from "./sectors";

// Industries (alias for sectors)
export {
  industries,
  officialIndustries,
  getIndustry,
  getOfficialIndustry,
  getIndustriesByProduct,
  getIndustriesByService,
} from "./industries";

// Protocols
export {
  protocols,
  officialProtocols,
  getProtocol,
  getOfficialProtocol,
  getProtocolByCode,
  getProtocolsBySector,
  getProtocolsByProduct,
} from "./protocols";

// Equipment
export {
  equipment,
  getEquipment,
  getEquipmentByCategory,
  getEquipmentByProduct,
} from "./equipment";

// Services
export {
  services,
  officialServices,
  getService,
  getOfficialService,
  getServicesBySector,
  getServicesByProduct,
  getServicesByProtocol,
} from "./services";

// Products
export {
  products,
  officialProducts,
  getProduct,
  getOfficialProduct,
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
export const KB_PHASE = "FASE 1 — Work Order 002";
export const KB_STATUS = "ACTIVE";
