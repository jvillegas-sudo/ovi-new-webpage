/**
 * Product Knowledge Repository
 * Work Order 008A — OVI Product Knowledge Engine
 *
 * Stable abstraction layer for accessing product knowledge records.
 * React components must NOT import from data files directly.
 *
 * All knowledge queries flow through this repository.
 * UI components consume the resolved PublicProductView via the resolver.
 */

import type { ProductKnowledge } from "../types/product-knowledge";
import { PRODUCT_KNOWLEDGE_REGISTRY, PRODUCT_KNOWLEDGE_MAP } from "../data/product-knowledge-data";

// ─── Core Accessors ───────────────────────────────────────────────────────────

/**
 * Return all product knowledge records in canonical order.
 * Includes records of all publication and information statuses.
 * Internal use only — use getPublishedProductKnowledge() for public output.
 */
export function getAllProductKnowledge(): ProductKnowledge[] {
  return PRODUCT_KNOWLEDGE_REGISTRY;
}

/**
 * Return the knowledge record for a given product ID.
 * Returns undefined when no record exists for that ID.
 */
export function getProductKnowledgeById(productId: string): ProductKnowledge | undefined {
  return PRODUCT_KNOWLEDGE_MAP.get(productId);
}

/**
 * Return the knowledge record for a given product slug.
 * Slugs may not be globally unique — prefer getProductKnowledgeById when possible.
 */
export function getProductKnowledgeBySlug(slug: string): ProductKnowledge | undefined {
  return PRODUCT_KNOWLEDGE_REGISTRY.find((pk) => pk.slug === slug);
}

/**
 * Return the knowledge record for a given product slug within a specific sector.
 * More precise than getProductKnowledgeBySlug when a sector is known.
 */
export function getProductKnowledgeBySectorAndSlug(
  sectorSlug: string,
  productSlug: string,
): ProductKnowledge | undefined {
  return PRODUCT_KNOWLEDGE_REGISTRY.find(
    (pk) => pk.sectorSlug === sectorSlug && pk.slug === productSlug,
  );
}

// ─── Filtered Accessors ───────────────────────────────────────────────────────

/**
 * Return only records with publicationStatus "published".
 * Use this for any public-facing query.
 */
export function getPublishedProductKnowledge(): ProductKnowledge[] {
  return PRODUCT_KNOWLEDGE_REGISTRY.filter((pk) => pk.publicationStatus === "published");
}

/**
 * Return all knowledge records for a given sector.
 */
export function getProductKnowledgeBySector(sectorSlug: string): ProductKnowledge[] {
  return PRODUCT_KNOWLEDGE_REGISTRY.filter((pk) => pk.sectorSlug === sectorSlug);
}

/**
 * Return all knowledge records associated with a given industry ID.
 * Returns records where industries[] contains the given industryId.
 */
export function getProductKnowledgeByIndustry(industryId: string): ProductKnowledge[] {
  return PRODUCT_KNOWLEDGE_REGISTRY.filter((pk) => pk.industries.includes(industryId));
}

/**
 * Return all knowledge records associated with a given application ID.
 */
export function getProductKnowledgeByApplication(applicationId: string): ProductKnowledge[] {
  return PRODUCT_KNOWLEDGE_REGISTRY.filter((pk) => pk.applications.includes(applicationId));
}

/**
 * Return all knowledge records compatible with a given surface ID.
 */
export function getProductKnowledgeBySurface(surfaceId: string): ProductKnowledge[] {
  return PRODUCT_KNOWLEDGE_REGISTRY.filter((pk) => pk.surfaces.includes(surfaceId));
}

/**
 * Return all knowledge records associated with a given cleaning problem ID.
 */
export function getProductKnowledgeByProblem(problemId: string): ProductKnowledge[] {
  return PRODUCT_KNOWLEDGE_REGISTRY.filter((pk) => pk.problems.includes(problemId));
}

/**
 * Return knowledge records for products related to a given product ID.
 * Includes relatedProducts, complementaryProducts, and alternativeProducts.
 */
export function getRelatedProductKnowledge(productId: string): ProductKnowledge[] {
  const source = getProductKnowledgeById(productId);
  if (!source) return [];

  const relatedIds = new Set([
    ...source.relatedProducts,
    ...source.complementaryProducts,
    ...source.alternativeProducts,
  ]);

  return Array.from(relatedIds)
    .map((id) => getProductKnowledgeById(id))
    .filter((pk): pk is ProductKnowledge => pk !== undefined);
}

// ─── Validation Helpers ───────────────────────────────────────────────────────

/**
 * Return the total count of knowledge records.
 * Must equal the canonical product count (56).
 */
export function getKnowledgeProductCount(): number {
  return PRODUCT_KNOWLEDGE_REGISTRY.length;
}

/**
 * Check whether a knowledge record exists for a given product ID.
 */
export function hasKnowledgeRecord(productId: string): boolean {
  return PRODUCT_KNOWLEDGE_MAP.has(productId);
}
