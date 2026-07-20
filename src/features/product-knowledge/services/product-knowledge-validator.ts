/**
 * Service: product-knowledge-validator
 * Work Order 008A — OVI Product Knowledge Engine
 *
 * Validates the product knowledge registry for structural integrity.
 *
 * Detects:
 *   - Duplicate product IDs
 *   - Duplicate slugs within their route scope
 *   - Missing official names
 *   - Invalid sector references
 *   - Invalid taxonomy references
 *   - Broken related-product references
 *   - Self-referential product relations
 *   - Invalid document paths
 *   - Invalid media paths
 *   - Publication without minimum required fields
 *   - Published claims without source references
 *   - Conflicting status combinations
 *   - Duplicate aliases
 *   - Orphan knowledge records (no matching identity product)
 *   - Official products without knowledge records
 */

import type { OviSector } from "@features/products/chemical-lines-data";
import type {
  ProductKnowledge,
  KnowledgeValidationError,
  KnowledgeValidationResult,
} from "../types/product-knowledge";
import { getAllTaxonomyIds } from "../data/taxonomies/index";
import { PRODUCT_KNOWLEDGE_REGISTRY } from "../data/product-knowledge-data";

// ─── Official Sectors ─────────────────────────────────────────────────────────

const OFFICIAL_SECTOR_SLUGS = new Set([
  "industrial",
  "biotecnologia",
  "lavanderia",
  "alimentos",
  "cuidado-personal",
  "hoteleria",
  "institucional",
]);

// ─── Validator ────────────────────────────────────────────────────────────────

/**
 * Validate the product knowledge registry.
 *
 * @param sectors — OVI_SECTORS from chemical-lines-data.ts (for cross-reference)
 * @param registry — Knowledge registry to validate (defaults to PRODUCT_KNOWLEDGE_REGISTRY)
 */
export function validateProductKnowledge(
  sectors: OviSector[],
  registry: ProductKnowledge[] = PRODUCT_KNOWLEDGE_REGISTRY,
): KnowledgeValidationResult {
  const errors: KnowledgeValidationError[] = [];
  const warnings: string[] = [];

  const taxonomyIds = getAllTaxonomyIds();
  const knowledgeIds = new Set<string>();
  const knowledgeSlugs = new Map<string, string>(); // "sectorSlug/slug" → productId
  const aliasTracker = new Map<string, string>(); // alias → productId

  // Build set of canonical identity product IDs from chemical-lines-data.ts
  const identityProductIds = new Set<string>();
  for (const sector of sectors) {
    for (const product of sector.products) {
      identityProductIds.add(product.id);
    }
  }

  // Build set of knowledge product IDs
  const knowledgeProductIds = new Set(registry.map((pk) => pk.productId));

  // ── Check for official products missing knowledge records ─────────────────

  for (const id of identityProductIds) {
    if (!knowledgeProductIds.has(id)) {
      errors.push({
        productId: id,
        code: "MISSING_KNOWLEDGE_RECORD",
        message: `Official product "${id}" has no ProductKnowledge record.`,
      });
    }
  }

  // ── Per-record validation ─────────────────────────────────────────────────

  for (const pk of registry) {
    // Orphan check — knowledge record not found in canonical identity source
    if (!identityProductIds.has(pk.productId)) {
      errors.push({
        productId: pk.productId,
        code: "ORPHAN_KNOWLEDGE_RECORD",
        message: `ProductKnowledge record "${pk.productId}" has no matching product in chemical-lines-data.ts.`,
      });
    }

    // Duplicate product ID
    if (knowledgeIds.has(pk.productId)) {
      errors.push({
        productId: pk.productId,
        code: "DUPLICATE_ID",
        message: `Duplicate product ID: "${pk.productId}".`,
      });
    }
    knowledgeIds.add(pk.productId);

    // Duplicate slug within sector route scope
    const routeKey = `${pk.sectorSlug}/${pk.slug}`;
    const existing = knowledgeSlugs.get(routeKey);
    if (existing) {
      errors.push({
        productId: pk.productId,
        code: "DUPLICATE_SLUG",
        message: `Duplicate route slug "${pk.slug}" in sector "${pk.sectorSlug}". Conflicts with "${existing}".`,
      });
    } else {
      knowledgeSlugs.set(routeKey, pk.productId);
    }

    // Missing official name
    if (!pk.officialName || pk.officialName.trim() === "") {
      errors.push({
        productId: pk.productId,
        code: "MISSING_OFFICIAL_NAME",
        message: `Product "${pk.productId}" has no officialName.`,
      });
    }

    // Invalid sector reference
    if (!OFFICIAL_SECTOR_SLUGS.has(pk.sectorSlug)) {
      errors.push({
        productId: pk.productId,
        code: "INVALID_SECTOR_REFERENCE",
        message: `Product "${pk.productId}" references unknown sector: "${pk.sectorSlug}".`,
      });
    }

    // Invalid taxonomy references
    for (const industryId of pk.industries) {
      if (!taxonomyIds.industryIds.includes(industryId) && !OFFICIAL_SECTOR_SLUGS.has(industryId)) {
        errors.push({
          productId: pk.productId,
          code: "INVALID_TAXONOMY_REFERENCE",
          message: `Product "${pk.productId}" references unknown industry: "${industryId}".`,
        });
      }
    }

    for (const surfaceId of pk.surfaces) {
      if (!taxonomyIds.surfaceIds.includes(surfaceId)) {
        errors.push({
          productId: pk.productId,
          code: "INVALID_TAXONOMY_REFERENCE",
          message: `Product "${pk.productId}" references unknown surface: "${surfaceId}".`,
        });
      }
    }

    for (const equipmentId of pk.equipment) {
      if (!taxonomyIds.equipmentIds.includes(equipmentId)) {
        errors.push({
          productId: pk.productId,
          code: "INVALID_TAXONOMY_REFERENCE",
          message: `Product "${pk.productId}" references unknown equipment: "${equipmentId}".`,
        });
      }
    }

    for (const problemId of pk.problems) {
      if (!taxonomyIds.problemIds.includes(problemId)) {
        errors.push({
          productId: pk.productId,
          code: "INVALID_TAXONOMY_REFERENCE",
          message: `Product "${pk.productId}" references unknown problem: "${problemId}".`,
        });
      }
    }

    // Self-referential product relations
    const allRelated = [
      ...pk.relatedProducts,
      ...pk.complementaryProducts,
      ...pk.alternativeProducts,
    ];
    if (allRelated.includes(pk.productId)) {
      errors.push({
        productId: pk.productId,
        code: "SELF_RELATION",
        message: `Product "${pk.productId}" references itself in a relation.`,
      });
    }

    // Broken related-product references
    for (const relatedId of allRelated) {
      if (!knowledgeProductIds.has(relatedId)) {
        errors.push({
          productId: pk.productId,
          code: "BROKEN_RELATED_PRODUCT",
          message: `Product "${pk.productId}" references unknown related product: "${relatedId}".`,
        });
      }
    }

    // Invalid document paths — flag documents with non-null but empty paths
    for (const doc of pk.documents) {
      if (doc.filePath !== null && doc.filePath.trim() === "") {
        errors.push({
          productId: pk.productId,
          code: "INVALID_DOCUMENT_PATH",
          message: `Product "${pk.productId}" has a document with an empty filePath.`,
        });
      }
    }

    // Invalid media paths — flag gallery entries with empty URLs
    for (const media of pk.gallery) {
      if (!media.url || media.url.trim() === "") {
        errors.push({
          productId: pk.productId,
          code: "INVALID_MEDIA_PATH",
          message: `Product "${pk.productId}" has a gallery entry with an empty URL.`,
        });
      }
    }

    // Publication without minimum required fields
    if (pk.publicationStatus === "published") {
      if (!pk.officialName || pk.officialName.trim() === "") {
        errors.push({
          productId: pk.productId,
          code: "PUBLICATION_WITHOUT_MINIMUM_FIELDS",
          message: `Published product "${pk.productId}" is missing officialName.`,
        });
      }
    }

    // Published claims without source references
    if (
      pk.publicationStatus === "published" &&
      (pk.shortDescription !== null ||
        pk.officialBenefits.length > 0 ||
        pk.compositionSummary !== null ||
        pk.pH !== null)
    ) {
      const hasConfirmedSource = pk.sourceReferences.some(
        (ref) =>
          ref.verificationStatus === "source_confirmed" ||
          ref.verificationStatus === "technically_verified",
      );
      if (!hasConfirmedSource) {
        errors.push({
          productId: pk.productId,
          code: "PUBLISHED_CLAIM_WITHOUT_SOURCE",
          message: `Product "${pk.productId}" has published claims but no confirmed source reference.`,
        });
      }
    }

    // Conflicting status combinations
    if (pk.publicationStatus === "published" && pk.verificationStatus === "unverified") {
      errors.push({
        productId: pk.productId,
        code: "CONFLICTING_STATUS",
        message: `Product "${pk.productId}" is published but verificationStatus is "unverified".`,
      });
    }

    if (
      pk.publicationStatus === "published" &&
      pk.verificationStatus === "technical_review_required"
    ) {
      errors.push({
        productId: pk.productId,
        code: "CONFLICTING_STATUS",
        message: `Product "${pk.productId}" is published but verificationStatus is "technical_review_required". Resolve the review before publishing.`,
      });
    }

    if (pk.publicationStatus === "published" && pk.informationStatus === "minimal") {
      warnings.push(
        `Product "${pk.productId}" is published with informationStatus "minimal". UI should display the fallback message.`,
      );
    }

    // Duplicate aliases
    for (const alias of pk.aliases) {
      const existingOwner = aliasTracker.get(alias);
      if (existingOwner && existingOwner !== pk.productId) {
        errors.push({
          productId: pk.productId,
          code: "DUPLICATE_ALIAS",
          message: `Alias "${alias}" on product "${pk.productId}" is already used by "${existingOwner}".`,
        });
      } else {
        aliasTracker.set(alias, pk.productId);
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}
