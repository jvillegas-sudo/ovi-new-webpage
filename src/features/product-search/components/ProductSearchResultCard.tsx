"use client";

/**
 * Component: ProductSearchResultCard
 * Work Order 007 · OVI Smart Product Discovery
 *
 * Renders a single product search result.
 * Shows ONLY official data — never invents descriptions, images, or benefits.
 */

import { ImageOff, ArrowRight } from "lucide-react";
import { cn } from "@utils/cn";
import type { SearchResult } from "../types/product-search";

interface ProductSearchResultCardProps {
  result: SearchResult;
  isSelected: boolean;
  onSelect: (result: SearchResult) => void;
  id: string;
}

export function ProductSearchResultCard({
  result,
  isSelected,
  onSelect,
  id,
}: ProductSearchResultCardProps) {
  const { document } = result;

  return (
    <li
      id={id}
      role="option"
      aria-selected={isSelected}
    >
      <button
        type="button"
        className={cn(
          "flex w-full cursor-pointer items-start gap-3 rounded-xl px-3 py-3",
          "transition-colors duration-100 text-left",
          isSelected
            ? "bg-[rgba(0,196,255,0.08)] text-[var(--color-text-primary)]"
            : "text-[var(--color-text-secondary)] hover:bg-[var(--glass-bg)]",
        )}
        onClick={() => onSelect(result)}
      >
      {/* Product image / fallback */}
      <div
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
          "border border-[var(--color-border-subtle)] bg-[var(--color-surface)]",
        )}
        aria-hidden="true"
      >
        {document.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={document.image}
            alt={document.imageAlt ?? document.officialName}
            className="h-8 w-8 rounded object-contain"
          />
        ) : (
          <ImageOff className="h-4 w-4 text-[var(--color-text-tertiary)]" />
        )}
      </div>

      {/* Text content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p
            className={cn(
              "truncate text-sm font-semibold",
              isSelected
                ? "text-[var(--color-brand-primary)]"
                : "text-[var(--color-text-primary)]",
            )}
          >
            {document.officialName}
          </p>

          {/* Sector badge */}
          <span className="shrink-0 rounded-full border border-[var(--color-border-subtle)] px-2 py-0.5 text-xs text-[var(--color-text-tertiary)]">
            {document.sector}
          </span>
        </div>

        {/* Short description or pending notice */}
        <p className="mt-0.5 line-clamp-1 text-xs text-[var(--color-text-tertiary)]">
          {document.shortDescription ?? "Información oficial en proceso de publicación."}
        </p>
      </div>

      {/* Arrow indicator */}
      <ArrowRight
        className={cn(
          "mt-1 h-3.5 w-3.5 shrink-0 transition-colors duration-100",
          isSelected ? "text-[var(--color-brand-primary)]" : "text-[var(--color-text-tertiary)]",
        )}
        aria-hidden="true"
      />
      </button>
    </li>
  );
}
