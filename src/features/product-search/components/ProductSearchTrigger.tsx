"use client";

/**
 * Component: ProductSearchTrigger
 * Work Order 007 · OVI Smart Product Discovery
 *
 * Button that opens the product search dialog.
 * Used in the Navbar ("Buscar producto") and Hero ("Buscar producto o solución").
 */

import { Search } from "lucide-react";
import { cn } from "@utils/cn";
import { useProductSearchStore } from "@store/product-search.store";
import { trackSearchEvent } from "../utils/search-analytics";

export interface ProductSearchTriggerProps {
  /** Visual variant: 'nav' for navbar button, 'hero' for hero CTA */
  variant?: "nav" | "hero";
  className?: string;
}

export function ProductSearchTrigger({
  variant = "nav",
  className,
}: ProductSearchTriggerProps) {
  const open = useProductSearchStore((s) => s.open);

  function handleClick() {
    trackSearchEvent({ type: "product_search_opened" });
    open();
  }

  if (variant === "hero") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          "inline-flex items-center gap-2.5",
          "rounded-full border border-[var(--color-border-default)]",
          "bg-[var(--glass-bg)] backdrop-blur-sm",
          "px-5 py-3 text-sm font-medium text-[var(--color-text-secondary)]",
          "transition-all duration-200",
          "hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)]",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]",
          className,
        )}
        aria-label="Buscar producto o solución"
      >
        <Search className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span>Buscar producto o solución</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "inline-flex items-center gap-2",
        "rounded-lg px-3 py-2",
        "text-sm font-medium text-[var(--color-text-secondary)]",
        "transition-colors duration-200",
        "hover:bg-[var(--glass-bg)] hover:text-[var(--color-brand-primary)]",
        "focus-visible:outline-2 focus-visible:outline-[var(--color-brand-primary)]",
        className,
      )}
      aria-label="Buscar producto"
    >
      <Search className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span className="hidden xl:inline">Buscar producto</span>
    </button>
  );
}
