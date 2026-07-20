/**
 * Store: Product Search
 * Work Order 007 · OVI Smart Product Discovery
 *
 * Minimal global state for product-search dialog open/close.
 * Following the established Zustand pattern in this project.
 *
 * Kept intentionally small — search query and results live in
 * useProductSearch hook local state, not in global store.
 */

import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ProductSearchState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const useProductSearchStore = create<ProductSearchState>()(
  devtools(
    (set) => ({
      isOpen: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    { name: "ovi-product-search-store" },
  ),
);
