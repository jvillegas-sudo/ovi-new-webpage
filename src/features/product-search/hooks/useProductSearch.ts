"use client";

/**
 * Hook: useProductSearch
 * Work Order 007 · OVI Smart Product Discovery
 *
 * Orchestrates local product search:
 *   - Builds and memoizes the search index from OVI_SECTORS once per mount.
 *   - Runs the ranking engine whenever the query changes.
 *   - Manages keyboard navigation over results.
 *   - Fires analytics events at the appropriate moments.
 *
 * The ranking engine (product-search-engine.ts) is a pure function — no
 * business logic lives inside this hook.
 */

import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { OVI_SECTORS } from "@features/products/chemical-lines-data";
import { buildSearchIndex } from "../utils/build-product-search-document";
import { searchProducts } from "../services/product-search-engine";
import { trackSearchEvent } from "../utils/search-analytics";
import type { SearchResult } from "../types/product-search";

const MAX_RESULTS = 10;

export interface ProductSearchHook {
  query: string;
  setQuery: (query: string) => void;
  results: SearchResult[];
  selectedIndex: number;
  setSelectedIndex: (i: number) => void;
  selectedResult: SearchResult | null;
  hasQuery: boolean;
  hasResults: boolean;
  /** Clear the current query */
  clearQuery: () => void;
  /** Handle ArrowUp/ArrowDown keyboard navigation in the results list */
  handleKeyNavigation: (e: React.KeyboardEvent) => void;
}

export function useProductSearch(): ProductSearchHook {
  const [query, setQueryRaw] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Build the search index once (memoized for the component lifetime)
  const searchIndex = useMemo(() => buildSearchIndex(OVI_SECTORS), []);

  // Whether a real search has been submitted (for analytics)
  const submittedRef = useRef(false);

  // Run search whenever query changes
  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      setSelectedIndex(-1);
      submittedRef.current = false;
      return;
    }

    const newResults = searchProducts(searchIndex, trimmed, MAX_RESULTS);
    setResults(newResults);
    setSelectedIndex(-1);

    // Analytics: fire submitted once per distinct non-empty query
    if (!submittedRef.current) {
      trackSearchEvent({ type: "product_search_submitted", query: trimmed });
      submittedRef.current = true;
    }

    if (newResults.length === 0) {
      trackSearchEvent({ type: "product_search_no_results", query: trimmed });
    }
  }, [query, searchIndex]);

  const setQuery = useCallback((q: string) => {
    submittedRef.current = false; // reset per query change
    setQueryRaw(q);
  }, []);

  const clearQuery = useCallback(() => {
    setQueryRaw("");
    setResults([]);
    setSelectedIndex(-1);
    submittedRef.current = false;
  }, []);

  /** Arrow-key navigation; call from the container's onKeyDown */
  const handleKeyNavigation = useCallback(
    (e: React.KeyboardEvent) => {
      if (results.length === 0) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
      }
    },
    [results.length],
  );

  const selectedResult = selectedIndex >= 0 ? (results[selectedIndex] ?? null) : null;

  return {
    query,
    setQuery,
    results,
    selectedIndex,
    setSelectedIndex,
    selectedResult,
    hasQuery: query.trim().length > 0,
    hasResults: results.length > 0,
    clearQuery,
    handleKeyNavigation,
  };
}
