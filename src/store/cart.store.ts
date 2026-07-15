/**
 * Store: OVI Cart State
 * Work Order 008 — OVI Store Intelligent Commerce Platform
 *
 * Session-aware cart state for the OVI Store.
 * Architecture is prepared for future integration with:
 *   Shopify · WooCommerce · Stripe · PayPal · ERP · OVI OS
 *
 * Each cart item carries full product context from the Knowledge Base
 * so that checkout, ERP, and analytics pipelines receive complete data.
 */

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// ─── Cart Item ────────────────────────────────────────────────────────────────

export interface CartItem {
  /** Product ID matching Knowledge Base product.id */
  productId: string;
  /** Official product name */
  nombre: string;
  /** Product category */
  categoria: string;
  /** Short description for cart display */
  resumen: string;
  /** Quantity requested */
  cantidad: number;
  /** Price placeholder — populated when payment integration is active */
  precio?: number;
  /** Currency code — prepared for multi-currency ERP integration */
  moneda?: string;
  /** Sector this product was recommended for (from OVI AI or OVI Lab) */
  sectorOrigen?: string;
  /** Recommendation source (ovi-ai | ovi-lab | catalogo | buscador | caso-uso) */
  fuenteRecomendacion?: "ovi-ai" | "ovi-lab" | "catalogo" | "buscador" | "caso-uso";
  /** Unix timestamp when item was added */
  agregadoEn: number;
}

// ─── Cart Metadata ────────────────────────────────────────────────────────────

export interface CartMeta {
  /** Source diagnosis session ID (from OVI AI) — for ERP traceability */
  diagnosticoSessionId?: string;
  /** Recommended sector context */
  sectorContexto?: string;
  /** Free-text notes from the engineer / client */
  notasTecnicas?: string;
  /** External reference for future ERP/Shopify order ID */
  externalOrderRef?: string;
}

// ─── State Interface ──────────────────────────────────────────────────────────

interface CartState {
  items: CartItem[];
  meta: CartMeta;

  // ─── Actions ────────────────────────────────────────────────────────────
  /** Add an item. If the product already exists, increment quantity. */
  addItem: (item: Omit<CartItem, "agregadoEn">) => void;
  /** Remove a product from the cart entirely. */
  removeItem: (productId: string) => void;
  /** Update the quantity of an existing item. Removes if qty < 1. */
  updateQuantity: (productId: string, cantidad: number) => void;
  /** Clear all items but preserve meta context. */
  clearItems: () => void;
  /** Reset cart fully (items + meta). */
  resetCart: () => void;
  /** Set cart metadata (sector context, notes, session ID, etc.). */
  setMeta: (meta: Partial<CartMeta>) => void;

  // ─── Derived helpers ─────────────────────────────────────────────────────
  /** Total number of distinct products in cart. */
  itemCount: () => number;
  /** Total quantity across all items. */
  totalQuantity: () => number;
  /** Check whether a productId is already in the cart. */
  hasProduct: (productId: string) => boolean;
  /** Get a specific item by productId. */
  getItem: (productId: string) => CartItem | undefined;
}

// ─── Initial state ────────────────────────────────────────────────────────────

const initialState: Pick<CartState, "items" | "meta"> = {
  items: [],
  meta: {},
};

// ─── Store ────────────────────────────────────────────────────────────────────

export const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        addItem: (newItem) => {
          set(
            (state) => {
              const existing = state.items.find((i) => i.productId === newItem.productId);
              if (existing) {
                return {
                  items: state.items.map((i) =>
                    i.productId === newItem.productId
                      ? { ...i, cantidad: i.cantidad + (newItem.cantidad ?? 1) }
                      : i,
                  ),
                };
              }
              return {
                items: [
                  ...state.items,
                  { ...newItem, cantidad: newItem.cantidad ?? 1, agregadoEn: Date.now() },
                ],
              };
            },
            false,
            "cart/addItem",
          );
        },

        removeItem: (productId) => {
          set(
            (state) => ({ items: state.items.filter((i) => i.productId !== productId) }),
            false,
            "cart/removeItem",
          );
        },

        updateQuantity: (productId, cantidad) => {
          if (cantidad < 1) {
            get().removeItem(productId);
            return;
          }
          set(
            (state) => ({
              items: state.items.map((i) => (i.productId === productId ? { ...i, cantidad } : i)),
            }),
            false,
            "cart/updateQuantity",
          );
        },

        clearItems: () => {
          set({ items: [] }, false, "cart/clearItems");
        },

        resetCart: () => {
          set({ ...initialState }, false, "cart/resetCart");
        },

        setMeta: (meta) => {
          set((state) => ({ meta: { ...state.meta, ...meta } }), false, "cart/setMeta");
        },

        // Derived helpers
        itemCount: () => get().items.length,
        totalQuantity: () => get().items.reduce((acc, i) => acc + i.cantidad, 0),
        hasProduct: (productId) => get().items.some((i) => i.productId === productId),
        getItem: (productId) => get().items.find((i) => i.productId === productId),
      }),
      {
        name: "ovi-cart",
        // Only persist items and meta — actions are recreated from the store definition
        partialize: (state) => ({ items: state.items, meta: state.meta }),
      },
    ),
    { name: "OVI Cart" },
  ),
);
