"use client";

/**
 * Component: ProductSearchInitialState
 * Work Order 007 · OVI Smart Product Discovery
 *
 * Shown when the search dialog is open but the query is empty.
 * Displays official sectors and recently-viewed products.
 * Does NOT generate fake "popular searches".
 */

import Link from "next/link";
import { Clock, FlaskConical } from "lucide-react";
import { OVI_SECTORS } from "@features/products/chemical-lines-data";
import type { ProductSearchDocument } from "../types/product-search";

interface ProductSearchInitialStateProps {
  recentIds: string[];
  searchIndex: ProductSearchDocument[];
  onSectorClick: (sectorName: string) => void;
  onClose: () => void;
}

export function ProductSearchInitialState({
  recentIds,
  searchIndex,
  onSectorClick,
  onClose,
}: ProductSearchInitialStateProps) {
  // Resolve recent product IDs to their search documents
  const recentDocs = recentIds
    .map((id) => searchIndex.find((d) => d.id === id))
    .filter((d): d is ProductSearchDocument => Boolean(d))
    .slice(0, 5);

  return (
    <div className="px-4 py-4">
      {/* Recently viewed */}
      {recentDocs.length > 0 && (
        <section className="mb-5">
          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold tracking-wide text-[var(--color-text-tertiary)] uppercase">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            Vistos recientemente
          </p>
          <ul className="space-y-1">
            {recentDocs.map((doc) => (
              <li key={doc.id}>
                <Link
                  href={doc.route}
                  onClick={onClose}
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--glass-bg)] hover:text-[var(--color-brand-primary)] focus-visible:outline-2 focus-visible:outline-[var(--color-brand-primary)]"
                >
                  <span className="font-medium">{doc.officialName}</span>
                  <span className="text-xs text-[var(--color-text-tertiary)]">{doc.sector}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Official sectors */}
      <section>
        <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold tracking-wide text-[var(--color-text-tertiary)] uppercase">
          <FlaskConical className="h-3.5 w-3.5" aria-hidden="true" />
          Sectores oficiales
        </p>
        <div className="flex flex-wrap gap-2">
          {OVI_SECTORS.map((sector) => (
            <button
              key={sector.slug}
              type="button"
              onClick={() => onSectorClick(sector.officialName)}
              className="rounded-full border border-[var(--color-border-default)] px-3 py-1.5 text-xs text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] focus-visible:outline-2 focus-visible:outline-[var(--color-brand-primary)]"
            >
              {sector.officialName}
              {sector.contentGap ? (
                <span className="ml-1 text-[var(--color-text-tertiary)]">(próximamente)</span>
              ) : (
                <span className="ml-1 text-[var(--color-text-tertiary)]">
                  ({sector.products.length})
                </span>
              )}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
