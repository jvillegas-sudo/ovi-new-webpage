/**
 * Store: OVI Analytics State
 * Work Order 011
 *
 * Manages dashboard state for the Executive Intelligence Dashboard:
 *   - Active tab navigation
 *   - Selected dimension for comparative views
 *   - Active report selection
 *   - Filter context (client, period, industry)
 *
 * Designed for:
 *   - Future integration with real-time data sources (OVI OS, OVI Field)
 *   - OVI AI recommendation injection
 *   - Multi-tenant filter support
 */

import { create } from "zustand";
import { devtools } from "zustand/middleware";

// ─── Filter context ───────────────────────────────────────────────────────────

export interface AnalyticsFilter {
  client: string | null;
  period: "3m" | "6m" | "12m";
  industry: string | null;
}

// ─── State interface ──────────────────────────────────────────────────────────

interface OviAnalyticsState {
  // ─── Navigation ───────────────────────────────────────────────────────────
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // ─── Filters ──────────────────────────────────────────────────────────────
  filter: AnalyticsFilter;
  setClient: (client: string | null) => void;
  setPeriod: (period: AnalyticsFilter["period"]) => void;
  setIndustry: (industry: string | null) => void;
  resetFilters: () => void;

  // ─── Comparative dimension ────────────────────────────────────────────────
  activeDimension: string;
  setActiveDimension: (dimension: string) => void;

  // ─── Report selection ─────────────────────────────────────────────────────
  activeReport: string | null;
  setActiveReport: (id: string | null) => void;
}

// ─── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_FILTER: AnalyticsFilter = {
  client: null,
  period: "12m",
  industry: null,
};

// ─── Store ────────────────────────────────────────────────────────────────────

export const useOviAnalyticsStore = create<OviAnalyticsState>()(
  devtools(
    (set) => ({
      // Navigation
      activeTab: "dashboard",
      setActiveTab: (tab) => set({ activeTab: tab }),

      // Filters
      filter: DEFAULT_FILTER,
      setClient: (client) => set((s) => ({ filter: { ...s.filter, client } })),
      setPeriod: (period) => set((s) => ({ filter: { ...s.filter, period } })),
      setIndustry: (industry) => set((s) => ({ filter: { ...s.filter, industry } })),
      resetFilters: () => set({ filter: DEFAULT_FILTER }),

      // Comparative dimension
      activeDimension: "client",
      setActiveDimension: (dimension) => set({ activeDimension: dimension }),

      // Report selection
      activeReport: null,
      setActiveReport: (id) => set({ activeReport: id }),
    }),
    { name: "ovi-analytics-store" },
  ),
);
