"use client";

/**
 * Component: ProductSearchInput
 * Work Order 007 · OVI Smart Product Discovery
 *
 * Search input with search icon, clear button, and keyboard hint.
 * Immediately focused when the dialog opens.
 */

import * as React from "react";
import { Search, X } from "lucide-react";
import { cn } from "@utils/cn";

export interface ProductSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  /** aria-activedescendant for combobox keyboard navigation */
  activeDescendantId?: string;
}

export function ProductSearchInput({
  value,
  onChange,
  onClear,
  inputRef,
  activeDescendantId,
}: ProductSearchInputProps) {
  return (
    <div className="relative flex items-center border-b border-[var(--color-border-subtle)]">
      {/* Search icon */}
      <Search
        className="absolute left-4 h-5 w-5 text-[var(--color-text-tertiary)]"
        aria-hidden="true"
      />

      {/* Input */}
      <input
        ref={inputRef}
        type="search"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={value.length > 0}
        aria-controls="product-search-results"
        aria-activedescendant={activeDescendantId}
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Busca por producto, industria, superficie o necesidad"
        className={cn(
          "w-full bg-transparent py-4 pl-12 pr-16",
          "text-base text-[var(--color-text-primary)]",
          "placeholder:text-[var(--color-text-tertiary)]",
          "focus:outline-none",
          // Remove browser default search input decorations
          "[appearance:textfield] [&::-webkit-search-cancel-button]:hidden",
        )}
      />

      {/* Right side: clear button or Esc hint */}
      <div className="absolute right-4 flex items-center gap-2">
        {value ? (
          <button
            type="button"
            onClick={onClear}
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-md",
              "text-[var(--color-text-tertiary)]",
              "hover:bg-[var(--glass-bg)] hover:text-[var(--color-text-primary)]",
              "transition-colors duration-150",
              "focus-visible:outline-2 focus-visible:outline-[var(--color-brand-primary)]",
            )}
            aria-label="Borrar búsqueda"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        ) : (
          <kbd
            className={cn(
              "hidden items-center rounded border border-[var(--color-border-default)]",
              "px-1.5 py-0.5 text-xs text-[var(--color-text-tertiary)]",
              "font-mono",
              "sm:flex",
            )}
            aria-hidden="true"
          >
            Esc
          </kbd>
        )}
      </div>
    </div>
  );
}
