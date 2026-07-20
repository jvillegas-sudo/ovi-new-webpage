/**
 * Utility: buildProductSearchDocument
 * Work Order 007 · OVI Smart Product Discovery
 *
 * Maps an `OviProductRecord` from chemical-lines-data.ts into a
 * `ProductSearchDocument` suitable for local full-text search.
 *
 * This is a derived representation — not a second canonical product database.
 * Source of truth remains chemical-lines-data.ts.
 */

import type { OviProductRecord, OviSector } from "@features/products/chemical-lines-data";
import { normalizeSearchText } from "./normalize-search-text";
import type { ProductSearchDocument } from "../types/product-search";

/**
 * Derive information completeness from OviProductRecord fields.
 */
function deriveInformationStatus(
  product: OviProductRecord,
): ProductSearchDocument["informationStatus"] {
  if (product.shortDescription && product.applications.length > 0) return "partial";
  if (product.shortDescription) return "partial";
  return "name-only";
}

/**
 * Build a single ProductSearchDocument from a product + its parent sector.
 */
export function buildProductSearchDocument(
  product: OviProductRecord,
  sector: OviSector,
): ProductSearchDocument {
  const normalizedName = normalizeSearchText(product.officialName);
  const normalizedSector = normalizeSearchText(sector.officialName);

  // Derive additional keyword tokens from the normalized name parts
  // (split on spaces and hyphens to also find partial name fragments)
  const nameTokens = normalizedName.split(/[\s-]+/).filter((t) => t.length > 1);

  const keywords = Array.from(new Set([normalizedSector, ...nameTokens]));

  return {
    id: product.id,
    slug: product.slug,
    sectorSlug: sector.slug,
    officialName: product.officialName,
    normalizedName,
    sector: sector.officialName,
    normalizedSector,
    keywords,
    shortDescription: product.shortDescription,
    image: product.image,
    imageAlt: product.imageAlt,
    route: `/products/${sector.slug}/${product.slug}`,
    informationStatus: deriveInformationStatus(product),
  };
}

/**
 * Build the complete search index from all sectors.
 * Products in the Hotelería sector (contentGap) are excluded because
 * no official products are assigned yet.
 */
export function buildSearchIndex(sectors: OviSector[]): ProductSearchDocument[] {
  const docs: ProductSearchDocument[] = [];
  for (const sector of sectors) {
    for (const product of sector.products) {
      docs.push(buildProductSearchDocument(product, sector));
    }
  }
  return docs;
}
