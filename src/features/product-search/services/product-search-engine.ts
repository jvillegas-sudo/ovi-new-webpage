/**
 * Service: product-search-engine
 * Work Order 007 · OVI Smart Product Discovery
 *
 * Pure, testable local search engine for OVI products.
 * No React imports — safe to unit-test in Node/Vitest without DOM.
 *
 * Ranking priority (higher score wins):
 *   100 — Exact match on full normalized product name
 *    80 — Product name starts with the query term
 *    60 — Product name contains the query term (partial match)
 *    40 — Term matches via configured synonym expansion
 *    20 — Term matches normalized sector name
 *    10 — Term matches a derived keyword token
 *
 * Multi-term queries: scores are summed across terms. Products that match
 * ALL supplied terms rank above products that match only some terms.
 *
 * Duplicates: each product appears at most once (highest composite score).
 *
 * Architecture note:
 *   Ranking logic lives here — never inside React presentation components.
 *   Future migration to server-side or indexed search replaces this file only.
 */

import type { ProductSearchDocument, SearchResult } from "../types/product-search";
import { normalizeSearchText, splitQueryTerms } from "../utils/normalize-search-text";
import { expandTerm } from "../config/search-synonyms";

// ─── Scoring constants ────────────────────────────────────────────────────────

const SCORE_EXACT = 100;
const SCORE_PREFIX = 80;
const SCORE_CONTAINS = 60;
const SCORE_SYNONYM = 40;
const SCORE_SECTOR = 20;
const SCORE_KEYWORD = 10;

/**
 * Compute the relevance score for a single normalized query term against
 * a single search document.
 *
 * Tries the term itself first (full priority), then any configured synonyms
 * at a reduced priority (SCORE_SYNONYM).
 */
function scoreDocumentForTerm(doc: ProductSearchDocument, normalizedTerm: string): number {
  // Try direct match first (highest priority)
  const directScore = matchTerm(doc, normalizedTerm, false);
  if (directScore >= SCORE_EXACT) return directScore;

  // Expand via synonyms and try each expansion
  const expansions = expandTerm(normalizedTerm);
  let best = directScore;

  for (const expanded of expansions) {
    if (expanded === normalizedTerm) continue; // already tried
    const synonymScore = matchTerm(doc, expanded, true);
    if (synonymScore > best) best = synonymScore;
  }

  return best;
}

/**
 * Match a single term against a document's fields.
 *
 * @param isSynonym — when true, caps the maximum score at SCORE_SYNONYM
 *   so synonym matches always rank below direct name matches.
 */
function matchTerm(
  doc: ProductSearchDocument,
  term: string,
  isSynonym: boolean,
): number {
  const cap = isSynonym ? SCORE_SYNONYM : Infinity;

  if (doc.normalizedName === term) return Math.min(SCORE_EXACT, cap);
  if (doc.normalizedName.startsWith(term)) return Math.min(SCORE_PREFIX, cap);
  if (doc.normalizedName.includes(term)) return Math.min(SCORE_CONTAINS, cap);

  if (doc.normalizedSector === term || doc.normalizedSector.includes(term)) {
    return Math.min(SCORE_SECTOR, cap);
  }

  for (const kw of doc.keywords) {
    if (kw === term || kw.startsWith(term) || kw.includes(term)) {
      return Math.min(SCORE_KEYWORD, cap);
    }
  }

  return 0;
}

/**
 * Search products given a query string and a pre-built index.
 *
 * @param documents — pre-built search index (memoize at call site)
 * @param query     — raw user input (not yet normalized)
 * @param limit     — maximum results to return (default: 10)
 * @returns Deduplicated, ranked results; empty array for blank queries.
 */
export function searchProducts(
  documents: ProductSearchDocument[],
  query: string,
  limit = 10,
): SearchResult[] {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return [];

  const terms = splitQueryTerms(normalizedQuery);
  if (terms.length === 0) return [];

  const resultMap = new Map<string, SearchResult>();

  for (const doc of documents) {
    let totalScore = 0;
    let matchedTermCount = 0;

    for (const term of terms) {
      const termScore = scoreDocumentForTerm(doc, term);
      if (termScore > 0) {
        totalScore += termScore;
        matchedTermCount++;
      }
    }

    if (matchedTermCount === 0) continue;

    // Bonus multiplier: products matching ALL query terms rank higher
    const coverageBonus = matchedTermCount === terms.length ? 1.5 : 1.0;
    const finalScore = totalScore * coverageBonus;

    const existing = resultMap.get(doc.id);
    if (!existing || finalScore > existing.score) {
      resultMap.set(doc.id, { document: doc, score: finalScore });
    }
  }

  return Array.from(resultMap.values())
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
