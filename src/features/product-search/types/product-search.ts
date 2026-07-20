/**
 * Product Search — Type Definitions
 * Work Order 007 · OVI Smart Product Discovery
 *
 * Canonical types for the product search module.
 * All search components, hooks, and services consume these types.
 */

// ─── Search Document ──────────────────────────────────────────────────────────

/**
 * Normalized, derived representation of a product for full-text search.
 * Generated from `OviProductRecord` in chemical-lines-data.ts — not a
 * second canonical product database.
 */
export interface ProductSearchDocument {
  id: string;
  slug: string;
  sectorSlug: string;
  officialName: string;
  normalizedName: string;
  sector: string;
  normalizedSector: string;
  /** All searchable tokens derived from name, sector, and synonyms */
  keywords: string[];
  shortDescription: string | null;
  image: string | null;
  imageAlt: string | null;
  /** Canonical product route: /products/[sectorSlug]/[productSlug] */
  route: string;
  informationStatus: "name-only" | "partial" | "complete";
}

// ─── Search Results ───────────────────────────────────────────────────────────

export interface SearchResult {
  document: ProductSearchDocument;
  /** Numeric relevance score used for ranking */
  score: number;
}

// ─── Analytics Events ─────────────────────────────────────────────────────────

/**
 * Typed analytics event payloads for the product search module.
 * Emitted as custom DOM events — no external vendor dependency.
 */
export type SearchAnalyticsEvent =
  | { type: "product_search_opened" }
  | { type: "product_search_submitted"; query: string }
  | { type: "product_search_result_selected"; productId: string; query: string }
  | { type: "product_search_no_results"; query: string }
  | { type: "product_search_quote_clicked"; productId: string };
