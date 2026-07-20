"use client";

/**
 * Component: ProductSearchEmptyState
 * Work Order 007 · OVI Smart Product Discovery
 *
 * Shown when a search query returns no results.
 * Offers real navigation options — no fake suggestions.
 */

import Link from "next/link";
import { SearchX } from "lucide-react";
import { OVI_SECTORS } from "@features/products/chemical-lines-data";

interface ProductSearchEmptyStateProps {
  query: string;
  onClose: () => void;
}

export function ProductSearchEmptyState({ query, onClose }: ProductSearchEmptyStateProps) {
  return (
    <div className="px-4 py-8 text-center">
      <SearchX
        className="mx-auto h-10 w-10 text-[var(--color-text-tertiary)]"
        aria-hidden="true"
      />
      <p className="mt-3 text-sm font-medium text-[var(--color-text-primary)]">
        No encontramos una coincidencia exacta.
      </p>
      <p className="mt-1 text-xs text-[var(--color-text-tertiary)]">
        No hay resultados para{" "}
        <span className="font-semibold text-[var(--color-text-secondary)]">
          &ldquo;{query}&rdquo;
        </span>
        . Intenta con otro término o explora los sectores oficiales.
      </p>

      {/* Sector links */}
      <div className="mt-6 text-left">
        <p className="mb-2 text-xs font-semibold tracking-wide text-[var(--color-text-tertiary)] uppercase">
          Explorar sectores
        </p>
        <div className="flex flex-wrap gap-2">
          {OVI_SECTORS.filter((s) => !s.contentGap).map((sector) => (
            <Link
              key={sector.slug}
              href={`/products/${sector.slug}`}
              onClick={onClose}
              className="rounded-full border border-[var(--color-border-default)] px-3 py-1.5 text-xs text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] focus-visible:outline-2 focus-visible:outline-[var(--color-brand-primary)]"
            >
              {sector.officialName}
            </Link>
          ))}
        </div>
      </div>

      {/* Help actions */}
      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
        <Link
          href="/ovi-ai"
          onClick={onClose}
          className="rounded-lg border border-[var(--color-border-default)] px-4 py-2 text-xs font-medium text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] focus-visible:outline-2 focus-visible:outline-[var(--color-brand-primary)]"
        >
          Consultar OVI AI
        </Link>
        <Link
          href="/contact"
          onClick={onClose}
          className="rounded-lg bg-[var(--color-brand-primary)] px-4 py-2 text-xs font-semibold text-[var(--color-text-inverse)] transition-all hover:brightness-110 focus-visible:outline-2 focus-visible:outline-[var(--color-brand-primary)]"
        >
          Solicitar asesoría
        </Link>
      </div>
    </div>
  );
}
