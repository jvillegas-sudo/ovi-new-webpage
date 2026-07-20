"use client";

/**
 * Component: ProductSearchResults
 * Work Order 007 · OVI Smart Product Discovery
 *
 * Renders the search results list with proper ARIA listbox semantics.
 * Keyboard-navigable via aria-activedescendant from the parent dialog.
 */

import { useRouter } from "next/navigation";
import { cn } from "@utils/cn";
import { ProductSearchResultCard } from "./ProductSearchResultCard";
import { trackSearchEvent } from "../utils/search-analytics";
import type { SearchResult } from "../types/product-search";

interface ProductSearchResultsProps {
  results: SearchResult[];
  selectedIndex: number;
  query: string;
  onClose: () => void;
  onSelect?: (result: SearchResult) => void;
}

export function ProductSearchResults({
  results,
  selectedIndex,
  query,
  onClose,
  onSelect,
}: ProductSearchResultsProps) {
  const router = useRouter();

  function handleSelect(result: SearchResult) {
    trackSearchEvent({
      type: "product_search_result_selected",
      productId: result.document.id,
      query,
    });
    onSelect?.(result);
    onClose();
    router.push(result.document.route);
  }

  return (
    <div className="py-2">
      {/* Results count for screen readers */}
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {results.length === 1
          ? "1 resultado encontrado"
          : `${results.length} resultados encontrados`}
      </p>

      <ul
        id="product-search-results"
        role="listbox"
        aria-label="Resultados de búsqueda de productos"
        className={cn("space-y-0.5 px-2")}
      >
        {results.map((result, index) => (
          <ProductSearchResultCard
            key={result.document.id}
            result={result}
            isSelected={selectedIndex === index}
            onSelect={handleSelect}
            id={`search-result-${result.document.id}`}
          />
        ))}
      </ul>

      {/* "Ir al catálogo" footer link */}
      <div className="mt-3 border-t border-[var(--color-border-subtle)] px-4 py-3">
        <button
          type="button"
          onClick={() => {
            onClose();
            router.push("/products");
          }}
          className="text-xs text-[var(--color-text-tertiary)] transition-colors hover:text-[var(--color-brand-primary)] focus-visible:outline-2 focus-visible:outline-[var(--color-brand-primary)]"
        >
          Ver catálogo completo →
        </button>
      </div>
    </div>
  );
}
