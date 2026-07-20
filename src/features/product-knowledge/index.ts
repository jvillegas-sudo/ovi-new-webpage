/**
 * Product Knowledge Engine — Public API
 * Work Order 008A — OVI Product Knowledge Engine
 *
 * Single entry point for the product knowledge module.
 * All platform modules should import from here, not from internal paths.
 *
 * Usage:
 *   import { resolveProduct, getProductKnowledgeById } from '@features/product-knowledge'
 *
 * Architecture: Option B — Related knowledge layer keyed by product ID.
 *   Identity layer:   src/features/products/chemical-lines-data.ts
 *   Knowledge layer:  src/features/product-knowledge/ (this module)
 *   Resolved output:  ResolvedProduct (via resolveProduct / resolveAllProducts)
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type {
  VerificationStatus,
  PublicationStatus,
  InformationStatus,
} from "./types/knowledge-governance";

export type { SourceType, SourceReference } from "./types/source-reference";

export type {
  PresentationAvailabilityStatus,
  ProductPresentation,
  DocumentType,
  ProductDocument,
  MediaType,
  ProductMedia,
  ProductKnowledge,
  PublicProductView,
  KnowledgeValidationError,
  KnowledgeValidationResult,
} from "./types/product-knowledge";

export type { ResolvedProduct } from "./services/product-knowledge-resolver";

// ─── Repository ───────────────────────────────────────────────────────────────

export {
  getAllProductKnowledge,
  getProductKnowledgeById,
  getProductKnowledgeBySlug,
  getProductKnowledgeBySectorAndSlug,
  getPublishedProductKnowledge,
  getProductKnowledgeBySector,
  getProductKnowledgeByIndustry,
  getProductKnowledgeByApplication,
  getProductKnowledgeBySurface,
  getProductKnowledgeByProblem,
  getRelatedProductKnowledge,
  getKnowledgeProductCount,
  hasKnowledgeRecord,
} from "./repositories/product-knowledge.repository";

// ─── Resolver ─────────────────────────────────────────────────────────────────

export {
  resolveProduct,
  resolveAllProducts,
  resolveProductsBySector,
  resolvePublishedProducts,
  getRawKnowledge,
} from "./services/product-knowledge-resolver";

// ─── Validator ────────────────────────────────────────────────────────────────

export { validateProductKnowledge } from "./services/product-knowledge-validator";

// ─── Taxonomies ───────────────────────────────────────────────────────────────

export {
  INDUSTRIES,
  APPLICATIONS,
  SURFACES,
  EQUIPMENT,
  PROBLEMS,
  getIndustryById,
  getApplicationById,
  getSurfaceById,
  getEquipmentById,
  getProblemById,
  getPublishedIndustries,
  getPublishedApplications,
  getPublishedSurfaces,
  getPublishedEquipment,
  getPublishedProblems,
  getAllTaxonomyIds,
} from "./data/taxonomies/index";

// ─── Utilities ────────────────────────────────────────────────────────────────

export { resolvePublicProduct } from "./utils/resolve-public-product";
export { validateSourceReference, isSourceConfirmed } from "./utils/validate-source-reference";

// ─── Constants ────────────────────────────────────────────────────────────────

export { TOTAL_KNOWLEDGE_PRODUCTS } from "./data/product-knowledge-data";
