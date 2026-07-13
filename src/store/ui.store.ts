/**
 * Store: UI State
 *
 * Global UI state management using Zustand.
 * Handles: navigation state, modal state, loading state, cursor state.
 *
 * Why Zustand over Context?
 *   - Minimal re-renders (components subscribe only to what they use)
 *   - DevTools support
 *   - No provider nesting hell
 *   - Simple, synchronous API
 */

import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface UIState {
  // ─── Navigation ─────────────────────────────────────────────────────────
  isNavOpen: boolean;
  setNavOpen: (open: boolean) => void;
  toggleNav: () => void;

  // ─── Loading ────────────────────────────────────────────────────────────
  isLoading: boolean;
  setLoading: (loading: boolean) => void;

  // ─── Modal ──────────────────────────────────────────────────────────────
  activeModal: string | null;
  openModal: (id: string) => void;
  closeModal: () => void;

  // ─── Cursor ─────────────────────────────────────────────────────────────
  cursorVariant: "default" | "hover" | "click" | "text" | "hidden";
  setCursorVariant: (variant: UIState["cursorVariant"]) => void;

  // ─── Three.js Performance ───────────────────────────────────────────────
  threePerformanceLevel: "high" | "medium" | "low";
  setThreePerformanceLevel: (level: UIState["threePerformanceLevel"]) => void;
}

export const useUIStore = create<UIState>()(
  devtools(
    (set) => ({
      // Navigation
      isNavOpen: false,
      setNavOpen: (open) => set({ isNavOpen: open }),
      toggleNav: () => set((state) => ({ isNavOpen: !state.isNavOpen })),

      // Loading
      isLoading: true,
      setLoading: (loading) => set({ isLoading: loading }),

      // Modal
      activeModal: null,
      openModal: (id) => set({ activeModal: id }),
      closeModal: () => set({ activeModal: null }),

      // Cursor
      cursorVariant: "default",
      setCursorVariant: (variant) => set({ cursorVariant: variant }),

      // Three.js Performance
      threePerformanceLevel: "high",
      setThreePerformanceLevel: (level) => set({ threePerformanceLevel: level }),
    }),
    { name: "ovi-ui-store" },
  ),
);
