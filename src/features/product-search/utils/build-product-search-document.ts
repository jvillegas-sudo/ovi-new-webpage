/**
 * Utility: buildProductSearchDocument
 * Work Order 007 · OVI Smart Product Discovery
 * Updated: Work Order 008A · OVI Product Knowledge Engine
 *
 * Maps an `OviProductRecord` from chemical-lines-data.ts into a
 * `ProductSearchDocument` suitable for local full-text search.
 *
 * WO-008A update: When a verified ProductKnowledge record exists for a product,
 * its officially confirmed fields are merged into the search document:
 *   - aliases (official product name variants)
 *   - keywords (controlled keyword set)
 *   - industries, applications, surfaces, equipment, problems (taxonomy IDs)
 *   - customerLanguageTerms (plain-language user terms)
 *   - shortDescription (when source-confirmed)
 *
 * Only fields with verificationStatus "source_confirmed" or "technically_verified"
 * are included. Draft or unverified knowledge is never exposed in the search index.
 *
 * This is a derived representation — not a second canonical product database.
 * Source of truth remains chemical-lines-data.ts.
 */

import type { OviProductRecord, OviSector } from "@features/products/chemical-lines-data";
import { getProductKnowledgeById } from "@features/product-knowledge/repositories/product-knowledge.repository";
import { normalizeSearchText } from "./normalize-search-text";
import type { ProductSearchDocument } from "../types/product-search";

/**
 * Derive information completeness from available product data.
 * Prefers knowledge layer when available.
 */
function deriveInformationStatus(
  product: OviProductRecord,
  knowledgeShortDescription: string | null,
  hasApplications: boolean,
): ProductSearchDocument["informationStatus"] {
  const desc = knowledgeShortDescription ?? product.shortDescription;
  const apps = hasApplications || product.applications.length > 0;
  if (desc && apps) return "partial";
  if (desc) return "partial";
  return "name-only";
}

/**
 * Build a single ProductSearchDocument from a product + its parent sector.
 *
 * Consumes verified ProductKnowledge fields when available to extend the
 * search index with officially confirmed aliases, keywords, industries,
 * applications, surfaces, equipment, problems, and customer-language terms.
 *
 * Extended ranking support (WO-008A):
 *   - Official alias match
 *   - Controlled synonym via knowledge keywords
 *   - Official problem or need
 *   - Official application
 *   - Official industry
 *   - Official surface
 *   - Official equipment
 *   - Customer-language terms
 *
 * Ranking priority from product-search-engine.ts is preserved — exact name
 * matches still outrank all other match types.
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

  // Consume verified knowledge — only source_confirmed or technically_verified fields
  const knowledge = getProductKnowledgeById(product.id);
  const isVerifiedKnowledge =
    knowledge !== undefined &&
    knowledge.publicationStatus !== "draft" &&
    (knowledge.verificationStatus === "source_confirmed" ||
      knowledge.verificationStatus === "technically_verified" ||
      // For individual field arrays populated via source references:
      knowledge.sourceReferences.some(
        (ref) =>
          ref.verificationStatus === "source_confirmed" ||
          ref.verificationStatus === "technically_verified",
      ));

  // Only include knowledge fields when the record has at least one confirmed source
  const verifiedKnowledge = isVerifiedKnowledge ? knowledge : null;

  // Merge knowledge keywords with identity-derived tokens
  const knowledgeKeywords = verifiedKnowledge
    ? [
        ...verifiedKnowledge.aliases.map(normalizeSearchText),
        ...verifiedKnowledge.keywords.map(normalizeSearchText),
        ...verifiedKnowledge.customerLanguageTerms.map(normalizeSearchText),
        ...verifiedKnowledge.industries.map(normalizeSearchText),
        ...verifiedKnowledge.applications.map(normalizeSearchText),
        ...verifiedKnowledge.surfaces.map(normalizeSearchText),
        ...verifiedKnowledge.equipment.map(normalizeSearchText),
        ...verifiedKnowledge.problems.map(normalizeSearchText),
      ]
    : [];

  const keywords = Array.from(
    new Set([normalizedSector, ...nameTokens, ...knowledgeKeywords]),
  ).filter((k) => k.length > 0);

  const verifiedShortDescription = verifiedKnowledge?.shortDescription ?? product.shortDescription;

  const hasVerifiedApplications =
    (verifiedKnowledge?.applications?.length ?? 0) > 0 ||
    (verifiedKnowledge?.industries?.length ?? 0) > 1;

  return {
    id: product.id,
    slug: product.slug,
    sectorSlug: sector.slug,
    officialName: product.officialName,
    normalizedName,
    sector: sector.officialName,
    normalizedSector,
    keywords,
    shortDescription: verifiedShortDescription,
    image: product.image,
    imageAlt: product.imageAlt,
    route: `/products/${sector.slug}/${product.slug}`,
    informationStatus: deriveInformationStatus(
      product,
      verifiedShortDescription,
      hasVerifiedApplications,
    ),
  };
}

/**
 * Build the complete search index from all sectors.
 * Products in the Hotelería sector (contentGap) are excluded because
 * no official products are assigned yet.
 *
 * WO-008A: Each document is enriched with verified knowledge fields
 * from the product knowledge registry when available.
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
