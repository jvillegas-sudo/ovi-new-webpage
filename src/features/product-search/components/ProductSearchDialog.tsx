"use client";

/**
 * Component: ProductSearchDialog
 * Work Order 007 · OVI Smart Product Discovery
 *
 * Full-screen search overlay that provides the primary product search UX.
 * Mounted once globally in the root layout — opens from any page.
 *
 * Accessibility:
 *   - role="dialog" + aria-modal="true"
 *   - Focus trapped inside the dialog
 *   - Input auto-focused on open
 *   - Focus returns to the trigger element on close
 *   - Arrow Up/Down navigate results
 *   - Enter opens selected result
 *   - Escape closes
 *   - Screen-reader announcements via aria-live
 *
 * Keyboard shortcut: Cmd/Ctrl+K opens the dialog from anywhere.
 */

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { cn } from "@utils/cn";
import { useProductSearchStore } from "@store/product-search.store";
import { useProductSearch } from "../hooks/useProductSearch";
import { useRecentProducts } from "../hooks/useRecentProducts";
import { buildSearchIndex } from "../utils/build-product-search-document";
import { OVI_SECTORS } from "@features/products/chemical-lines-data";
import { trackSearchEvent } from "../utils/search-analytics";
import { ProductSearchInput } from "./ProductSearchInput";
import { ProductSearchResults } from "./ProductSearchResults";
import { ProductSearchEmptyState } from "./ProductSearchEmptyState";
import { ProductSearchInitialState } from "./ProductSearchInitialState";

const searchIndex = buildSearchIndex(OVI_SECTORS);

// ─── Framer Motion variants ────────────────────────────────────────────────────

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0.12 } },
};

const panelVariants = {
  hidden: { opacity: 0, y: -16, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.98,
    transition: { duration: 0.14, ease: [0.4, 0, 1, 1] as const },
  },
};

// ─── Focus trap utility ───────────────────────────────────────────────────────

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((el) => !el.closest("[hidden]"));
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ProductSearchDialog() {
  const { isOpen, open, close } = useProductSearchStore();
  const router = useRouter();

  const { query, setQuery, results, selectedIndex, hasQuery, hasResults, clearQuery, handleKeyNavigation } =
    useProductSearch();

  const { recentIds, recordView } = useRecentProducts();

  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const dialogRef = React.useRef<HTMLDivElement | null>(null);
  const triggerRef = React.useRef<Element | null>(null);

  // ── Open/Close effects ──────────────────────────────────────────────────────

  // Focus input when dialog opens; save trigger reference for focus restoration
  React.useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement;
      // Defer focus to next tick to let AnimatePresence render the element
      const raf = requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
      return () => cancelAnimationFrame(raf);
    } else {
      // Restore focus to the element that triggered the dialog
      if (triggerRef.current instanceof HTMLElement) {
        triggerRef.current.focus();
      }
      triggerRef.current = null;
      return undefined;
    }
  }, [isOpen]);

  // Prevent body scroll when dialog is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ── Global keyboard shortcut: Cmd/Ctrl + K ─────────────────────────────────

  React.useEffect(() => {
    function handleGlobalKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (!isOpen) {
          trackSearchEvent({ type: "product_search_opened" });
          open();
        }
      }
    }
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [isOpen, open]);

  // ── Dialog keyboard handling ────────────────────────────────────────────────

  function handleDialogKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Escape") {
      e.preventDefault();
      handleClose();
      return;
    }

    // Arrow navigation in results
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      handleKeyNavigation(e);
      // Scroll selected item into view
      const resultEl = document.getElementById(`search-result-${results[selectedIndex]?.document?.id ?? ""}`);
      resultEl?.scrollIntoView({ block: "nearest" });
      return;
    }

    // Enter opens selected result
    if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      const selected = results[selectedIndex];
      if (selected) {
        trackSearchEvent({
          type: "product_search_result_selected",
          productId: selected.document.id,
          query,
        });
        recordView(selected.document.id);
        handleClose();
        router.push(selected.document.route);
      }
      return;
    }

    // Focus trap on Tab
    if (e.key === "Tab" && dialogRef.current) {
      const focusable = getFocusableElements(dialogRef.current);
      if (focusable.length === 0) { e.preventDefault(); return; }
      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
  }

  function handleClose() {
    clearQuery();
    close();
  }

  // ── Sector chip click ───────────────────────────────────────────────────────

  function handleSectorClick(sectorName: string) {
    setQuery(sectorName);
    inputRef.current?.focus();
  }

  // ── Active descendant for combobox semantics ────────────────────────────────

  const activeDescendantId =
    selectedIndex >= 0 && results[selectedIndex]
      ? `search-result-${results[selectedIndex]!.document.id}`
      : undefined;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[var(--z-overlay)] bg-[rgba(5,5,8,0.75)] backdrop-blur-sm"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Dialog panel */}
          <div
            className="fixed inset-0 z-[var(--z-modal)] flex items-start justify-center px-4 pt-[10vh]"
            aria-hidden={!isOpen}
          >
            <motion.div
              key="panel"
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label="Buscar producto OVI"
              className={cn(
                "w-full max-w-xl overflow-hidden rounded-2xl",
                "border border-[var(--color-border-subtle)]",
                "bg-[var(--color-bg-elevated)]",
                "shadow-[var(--shadow-glass)]",
                // Mobile: take more vertical space
                "max-h-[80vh] sm:max-h-[70vh]",
                "flex flex-col",
              )}
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onKeyDown={handleDialogKeyDown}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header: input row */}
              <ProductSearchInput
                value={query}
                onChange={setQuery}
                onClear={clearQuery}
                inputRef={inputRef}
                activeDescendantId={activeDescendantId}
              />

              {/* Scrollable content area */}
              <div className="flex-1 overflow-y-auto overscroll-contain">
                {!hasQuery && (
                  <ProductSearchInitialState
                    recentIds={recentIds}
                    searchIndex={searchIndex}
                    onSectorClick={handleSectorClick}
                    onClose={handleClose}
                  />
                )}

                {hasQuery && hasResults && (
                  <ProductSearchResults
                    results={results}
                    selectedIndex={selectedIndex}
                    query={query}
                    onClose={handleClose}
                    onSelect={(r) => recordView(r.document.id)}
                  />
                )}

                {hasQuery && !hasResults && (
                  <ProductSearchEmptyState query={query} onClose={handleClose} />
                )}
              </div>

              {/* Mobile close button (redundant but helpful on small screens) */}
              <div className="flex items-center justify-between border-t border-[var(--color-border-subtle)] px-4 py-2.5 sm:hidden">
                <span className="text-xs text-[var(--color-text-tertiary)]">
                  {hasQuery && hasResults ? `${results.length} resultado(s)` : "OVI Búsqueda"}
                </span>
                <button
                  type="button"
                  onClick={handleClose}
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--glass-bg)] focus-visible:outline-2 focus-visible:outline-[var(--color-brand-primary)]"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                  Cerrar
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
