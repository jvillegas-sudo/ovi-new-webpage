/**
 * Store: OVI Field State
 * Work Order 010
 *
 * Manages active field operation session state:
 *   - Current work order in execution
 *   - Active execution phase
 *   - Offline sync queue
 *   - UI panel visibility
 *
 * Designed for:
 *   - Offline-first operation (sync queue accumulates when offline)
 *   - Mobile/tablet-first UI flows
 *   - Integration with OVI Core (orders) and OVI OS (evidence delivery)
 */

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {
  ExecutionPhase,
  SyncStatus,
  WorkOrderStatus,
} from "@features/ovi-field/ovi-field-data";

// ─── Sync queue item ──────────────────────────────────────────────────────────

export interface SyncQueueItem {
  id: string;
  type:
    | "checklist"
    | "photo"
    | "material"
    | "product"
    | "equipment"
    | "incident"
    | "observation"
    | "closure";
  workOrder: string;
  payload: Record<string, unknown>;
  createdAt: string;
  attempts: number;
}

// ─── Active execution session ─────────────────────────────────────────────────

export interface FieldSession {
  /** Work order currently being executed */
  activeWorkOrder: string | null;
  /** Current phase in the execution flow */
  currentPhase: ExecutionPhase | null;
  /** Work order status override (local) */
  localStatus: WorkOrderStatus | null;
  /** Checklist completion percentage for active order */
  checklistPct: number;
  /** Number of photos taken in active session */
  photosCount: number;
}

// ─── State interface ──────────────────────────────────────────────────────────

interface OviFieldState {
  // ─── Connectivity ─────────────────────────────────────────────────────────
  isOnline: boolean;
  setOnline: (online: boolean) => void;

  // ─── Sync status ──────────────────────────────────────────────────────────
  syncStatus: SyncStatus;
  syncQueue: SyncQueueItem[];
  addToSyncQueue: (item: Omit<SyncQueueItem, "attempts">) => void;
  clearSyncQueue: () => void;

  // ─── Active session ───────────────────────────────────────────────────────
  session: FieldSession;
  startOrder: (workOrderCode: string) => void;
  advancePhase: (phase: ExecutionPhase) => void;
  updateChecklistPct: (pct: number) => void;
  incrementPhotos: () => void;
  closeSession: () => void;

  // ─── UI ───────────────────────────────────────────────────────────────────
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

// ─── Initial state ────────────────────────────────────────────────────────────

const EMPTY_SESSION: FieldSession = {
  activeWorkOrder: null,
  currentPhase: null,
  localStatus: null,
  checklistPct: 0,
  photosCount: 0,
};

// ─── Store ────────────────────────────────────────────────────────────────────

export const useOviFieldStore = create<OviFieldState>()(
  devtools(
    persist(
      (set) => ({
        // Connectivity
        isOnline: true,
        setOnline: (online) => set({ isOnline: online, syncStatus: online ? "synced" : "offline" }),

        // Sync
        syncStatus: "synced",
        syncQueue: [],
        addToSyncQueue: (item) =>
          set((s) => ({
            syncStatus: "pending",
            syncQueue: [...s.syncQueue, { ...item, attempts: 0 }],
          })),
        clearSyncQueue: () => set({ syncQueue: [], syncStatus: "synced" }),

        // Session
        session: EMPTY_SESSION,
        startOrder: (workOrderCode) =>
          set({
            session: {
              ...EMPTY_SESSION,
              activeWorkOrder: workOrderCode,
              currentPhase: "recepcion",
              localStatus: "En ejecución",
            },
          }),
        advancePhase: (phase) => set((s) => ({ session: { ...s.session, currentPhase: phase } })),
        updateChecklistPct: (pct) => set((s) => ({ session: { ...s.session, checklistPct: pct } })),
        incrementPhotos: () =>
          set((s) => ({
            session: { ...s.session, photosCount: s.session.photosCount + 1 },
          })),
        closeSession: () => set({ session: { ...EMPTY_SESSION, localStatus: "Cerrada" } }),

        // UI
        activeTab: "dashboard",
        setActiveTab: (tab) => set({ activeTab: tab }),
      }),
      { name: "ovi-field-store" },
    ),
    { name: "ovi-field-store" },
  ),
);
