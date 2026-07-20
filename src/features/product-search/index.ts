/**
 * Product Search — Public API
 * Work Order 007 · OVI Smart Product Discovery
 *
 * Single entry point for all product search exports.
 * Import from here — not from internal module paths.
 */

// ─── Components ──────────────────────────────────────────────────────────────
export { ProductSearchDialog } from "./components/ProductSearchDialog";
export { ProductSearchTrigger } from "./components/ProductSearchTrigger";

// ─── Hooks ───────────────────────────────────────────────────────────────────
export { useProductSearch } from "./hooks/useProductSearch";
export { useRecentProducts } from "./hooks/useRecentProducts";

// ─── Types ───────────────────────────────────────────────────────────────────
export type { ProductSearchDocument, SearchResult, SearchAnalyticsEvent } from "./types/product-search";
