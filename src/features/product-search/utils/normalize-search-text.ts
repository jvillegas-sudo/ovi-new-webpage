/**
 * Utility: normalizeSearchText
 * Work Order 007 · OVI Smart Product Discovery
 *
 * Canonical text normalization for search queries and indexed document fields.
 * Must be applied consistently to BOTH the search index and the runtime query.
 *
 * Operations:
 *   1. Unicode NFD decomposition + diacritic removal (accent-insensitive)
 *   2. Lower-case
 *   3. Whitespace collapse and trim
 */

/**
 * Normalize a string for search comparison.
 *
 * @example
 *   normalizeSearchText("Biotecnología") // → "biotecnologia"
 *   normalizeSearchText("  Eco-Zyme  ")  // → "eco-zyme"
 *   normalizeSearchText("CIP ÁCIDO")     // → "cip acido"
 */
export function normalizeSearchText(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Split a normalized query string into individual search terms.
 * Filters empty strings produced by extra whitespace.
 */
export function splitQueryTerms(normalizedQuery: string): string[] {
  return normalizedQuery.split(" ").filter(Boolean);
}
