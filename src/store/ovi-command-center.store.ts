/**
 * Store: OVI Command Center State
 * Work Order 012
 *
 * Manages the unified control center state:
 *   - Active tab navigation
 *   - Alert filters and resolution
 *   - Global search query and results
 *   - Selected asset / diagnostic / recommendation
 *   - Filter context (client, period, severity)
 *
 * Designed for:
 *   - Future integration with real-time data sources
 *   - OVI AI recommendation injection
 *   - Multi-tenant and multi-site support
 */

import { create } from "zustand";
import { devtools } from "zustand/middleware";

// ─── Filter context ───────────────────────────────────────────────────────────

export interface CommandFilter {
  client: string | null;
  period: "7d" | "30d" | "90d" | "12m";
  severity: string | null;
}

// ─── State interface ──────────────────────────────────────────────────────────

interface OviCommandCenterState {
  // ─── Navigation ───────────────────────────────────────────────────────────
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // ─── Filters ──────────────────────────────────────────────────────────────
  filter: CommandFilter;
  setClient: (client: string | null) => void;
  setPeriod: (period: CommandFilter["period"]) => void;
  setSeverity: (severity: string | null) => void;
  resetFilters: () => void;

  // ─── Alert management ─────────────────────────────────────────────────────
  resolvedAlerts: Set<string>;
  resolveAlert: (id: string) => void;

  // ─── Global search ────────────────────────────────────────────────────────
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;

  // ─── Selected items ───────────────────────────────────────────────────────
  selectedAssetId: string | null;
  setSelectedAssetId: (id: string | null) => void;

  selectedDiagnosticId: string | null;
  setSelectedDiagnosticId: (id: string | null) => void;

  selectedRecommendationId: string | null;
  setSelectedRecommendationId: (id: string | null) => void;

  selectedRiskId: string | null;
  setSelectedRiskId: (id: string | null) => void;
}

// ─── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_FILTER: CommandFilter = {
  client: null,
  period: "30d",
  severity: null,
};

// ─── Store ────────────────────────────────────────────────────────────────────

export const useOviCommandCenterStore = create<OviCommandCenterState>()(
  devtools(
    (set) => ({
      // Navigation
      activeTab: "ejecutivo",
      setActiveTab: (tab) => set({ activeTab: tab }),

      // Filters
      filter: DEFAULT_FILTER,
      setClient: (client) => set((s) => ({ filter: { ...s.filter, client } })),
      setPeriod: (period) => set((s) => ({ filter: { ...s.filter, period } })),
      setSeverity: (severity) => set((s) => ({ filter: { ...s.filter, severity } })),
      resetFilters: () => set({ filter: DEFAULT_FILTER }),

      // Alert management
      resolvedAlerts: new Set<string>(),
      resolveAlert: (id) => set((s) => ({ resolvedAlerts: new Set([...s.resolvedAlerts, id]) })),

      // Global search
      searchQuery: "",
      setSearchQuery: (query) => set({ searchQuery: query }),
      clearSearch: () => set({ searchQuery: "" }),

      // Selected items
      selectedAssetId: null,
      setSelectedAssetId: (id) => set({ selectedAssetId: id }),

      selectedDiagnosticId: null,
      setSelectedDiagnosticId: (id) => set({ selectedDiagnosticId: id }),

      selectedRecommendationId: null,
      setSelectedRecommendationId: (id) => set({ selectedRecommendationId: id }),

      selectedRiskId: null,
      setSelectedRiskId: (id) => set({ selectedRiskId: id }),
    }),
    { name: "ovi-command-center-store" },
  ),
);
