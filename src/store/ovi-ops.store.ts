/**
 * Store: OVI OPS State
 * Work Order 010 — Digital Operations Platform
 *
 * Manages the active state of the OVI OPS platform:
 *   - Active project and work order selection
 *   - Execution session tracking
 *   - Module navigation
 *   - Filter states per module
 *
 * Designed for:
 *   - Multi-module navigation without losing context
 *   - Future real-time sync with OVI Field and OVI Core
 *   - Integration with OVI AI for automatic resource assignment
 */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { ProjectStatus, WorkOrderStatus } from "@features/ovi-ops/ovi-ops-data";

// ─── State interface ──────────────────────────────────────────────────────────

interface OviOpsState {
  // ─── Navigation ───────────────────────────────────────────────────────────
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // ─── Active selections ────────────────────────────────────────────────────
  selectedProjectId: string | null;
  setSelectedProject: (id: string | null) => void;

  selectedWorkOrderId: string | null;
  setSelectedWorkOrder: (id: string | null) => void;

  selectedClientId: string | null;
  setSelectedClient: (id: string | null) => void;

  // ─── Filters ──────────────────────────────────────────────────────────────
  projectStatusFilter: ProjectStatus | "Todos";
  setProjectStatusFilter: (status: ProjectStatus | "Todos") => void;

  workOrderStatusFilter: WorkOrderStatus | "Todos";
  setWorkOrderStatusFilter: (status: WorkOrderStatus | "Todos") => void;

  // ─── Execution session ────────────────────────────────────────────────────
  activeExecutionOrderId: string | null;
  executionStartedAt: string | null;
  startExecution: (workOrderId: string) => void;
  pauseExecution: () => void;
  finishExecution: () => void;
  executionPaused: boolean;

  // ─── UI state ─────────────────────────────────────────────────────────────
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useOviOpsStore = create<OviOpsState>()(
  devtools(
    (set) => ({
      // Navigation
      activeTab: "dashboard",
      setActiveTab: (tab) => set({ activeTab: tab }),

      // Selections
      selectedProjectId: null,
      setSelectedProject: (id) => set({ selectedProjectId: id }),

      selectedWorkOrderId: null,
      setSelectedWorkOrder: (id) => set({ selectedWorkOrderId: id }),

      selectedClientId: null,
      setSelectedClient: (id) => set({ selectedClientId: id }),

      // Filters
      projectStatusFilter: "Todos",
      setProjectStatusFilter: (status) => set({ projectStatusFilter: status }),

      workOrderStatusFilter: "Todos",
      setWorkOrderStatusFilter: (status) => set({ workOrderStatusFilter: status }),

      // Execution
      activeExecutionOrderId: null,
      executionStartedAt: null,
      executionPaused: false,
      startExecution: (workOrderId) =>
        set({
          activeExecutionOrderId: workOrderId,
          executionStartedAt: new Date().toISOString(),
          executionPaused: false,
        }),
      pauseExecution: () => set({ executionPaused: true }),
      finishExecution: () =>
        set({
          activeExecutionOrderId: null,
          executionStartedAt: null,
          executionPaused: false,
        }),

      // Search
      searchQuery: "",
      setSearchQuery: (q) => set({ searchQuery: q }),
    }),
    { name: "ovi-ops-store" },
  ),
);
