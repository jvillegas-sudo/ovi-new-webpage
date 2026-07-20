/**
 * Service: product-knowledge-resolver
 * Work Order 008A — OVI Product Knowledge Engine
 *
 * Resolves combined product identity + knowledge into a unified record.
 *
 * This service is the single authorized source for resolved product data.
 * Product Search, Product Experience Platform, Solution Finder, OVI AI,
 * and future systems must consume resolved records from this service.
 *
 * Product identity comes from: chemical-lines-data.ts (canonical)
 * Product knowledge comes from: product-knowledge-data.ts (knowledge layer)
 */

import type { OviProductRecord, OviSector } from "@features/products/chemical-lines-data";
import type { ProductKnowledge, PublicProductView } from "../types/product-knowledge";
import { getProductKnowledgeById } from "../repositories/product-knowledge.repository";
import { resolvePublicProduct } from "../utils/resolve-public-product";

// ─── Resolved Product ─────────────────────────────────────────────────────────

/**
 * A fully resolved product — identity merged with verified public knowledge.
 * Safe for use in the Product Experience Platform and public APIs.
 */
export interface ResolvedProduct extends PublicProductView {
  /** Canonical route: /products/[sectorSlug]/[productSlug] */
  route: string;
  /** Image URL from the identity layer (chemical-lines-data.ts) when knowledge image is absent */
  image: string | null;
  /** Image alt text */
  imageAlt: string | null;
}

// ─── Resolver ─────────────────────────────────────────────────────────────────

/**
 * Resolve a single product record into a public ResolvedProduct.
 *
 * If no knowledge record exists for the product, returns a minimal resolved
 * product using identity fields only — no data is invented.
 *
 * @param product — OviProductRecord from chemical-lines-data.ts
 * @param sector  — parent OviSector
 */
export function resolveProduct(product: OviProductRecord, sector: OviSector): ResolvedProduct {
  const knowledge = getProductKnowledgeById(product.id);

  const publicView = knowledge
    ? resolvePublicProduct(knowledge)
    : buildFallbackPublicView(product, sector);

  return {
    ...publicView,
    route: `/products/${sector.slug}/${product.slug}`,
    // Prefer knowledge primaryImage; fall back to identity-layer image
    image: publicView.primaryImage ?? product.image,
    imageAlt: product.imageAlt,
  };
}

/**
 * Build a safe fallback public view from identity fields only.
 * Used when no knowledge record exists — returns minimal safe output.
 */
function buildFallbackPublicView(product: OviProductRecord, sector: OviSector): PublicProductView {
  return {
    productId: product.id,
    slug: product.slug,
    officialName: product.officialName,
    sectorSlug: sector.slug,
    informationStatus: "minimal",
    shortDescription: null,
    aliases: [],
    keywords: [],
    customerLanguageTerms: [],
    problems: [],
    soils: [],
    residues: [],
    contaminationTypes: [],
    industries: [sector.slug],
    applications: [],
    surfaces: [],
    equipment: [],
    areas: [],
    processes: [],
    environments: [],
    officialBenefits: [],
    differentiators: [],
    relatedProducts: [],
    complementaryProducts: [],
    alternativeProducts: [],
    relatedServices: [],
    compositionSummary: null,
    physicalState: null,
    color: null,
    fragrance: null,
    pH: null,
    dilution: null,
    usageInstructions: null,
    precautions: [],
    compatibility: [],
    incompatibilities: [],
    performance: null,
    biodegradability: null,
    presentations: [],
    documents: [],
    primaryImage: null,
    gallery: [],
  };
}

/**
 * Resolve all products across all sectors.
 *
 * @param sectors — OVI_SECTORS from chemical-lines-data.ts
 */
export function resolveAllProducts(sectors: OviSector[]): ResolvedProduct[] {
  const results: ResolvedProduct[] = [];
  for (const sector of sectors) {
    for (const product of sector.products) {
      results.push(resolveProduct(product, sector));
    }
  }
  return results;
}

/**
 * Resolve all products for a single sector.
 */
export function resolveProductsBySector(sector: OviSector): ResolvedProduct[] {
  return sector.products.map((product) => resolveProduct(product, sector));
}

/**
 * Resolve only published products (those with publicationStatus "published"
 * in the knowledge layer, or identity-only fallback for untracked products).
 *
 * Products without knowledge records are always included (identity-only fallback).
 * Products with knowledge records are included only when published.
 */
export function resolvePublishedProducts(sectors: OviSector[]): ResolvedProduct[] {
  const results: ResolvedProduct[] = [];

  for (const sector of sectors) {
    for (const product of sector.products) {
      const knowledge = getProductKnowledgeById(product.id);

      // Include: no knowledge record (identity-only fallback, always visible)
      // Include: knowledge record with publicationStatus "published"
      if (!knowledge || knowledge.publicationStatus === "published") {
        results.push(resolveProduct(product, sector));
      }
    }
  }

  return results;
}

/**
 * Retrieve the raw knowledge record for a product (internal governance use only).
 * Returns undefined when no knowledge record exists.
 *
 * Do NOT expose this in UI components — use resolveProduct() instead.
 */
export function getRawKnowledge(productId: string): ProductKnowledge | undefined {
  return getProductKnowledgeById(productId);
}
