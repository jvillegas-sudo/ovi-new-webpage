/**
 * Store: OVI AI State
 * Experience Order 004
 *
 * Session-aware state for the persistent OVI AI holographic companion.
 * Tracks conversation history, detected industry, and companion visibility.
 *
 * Architecture notes:
 *   - Session memory persists across page navigations (no re-asking)
 *   - analysisState drives companion animations
 *   - Extensible for future LLM, voice, and image capabilities
 */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { SimulatedReport, ConversationTurn } from "@features/ovi-ai/ovi-ai-engine";

// ─── Session ──────────────────────────────────────────────────────────────────

export interface OviAiSession {
  /** Detected industry from the most recent report */
  industry: string | null;
  /** Asset context extracted from conversation */
  asset: string | null;
  /** Contamination type from last analysis */
  contamination: string | null;
  /** The most recently generated report */
  lastReport: SimulatedReport | null;
  /** Full conversation history (for future multi-turn LLM use) */
  turns: ConversationTurn[];
}

// ─── State interface ──────────────────────────────────────────────────────────

export type OviAiAnalysisState = "idle" | "analyzing" | "done";

interface OviAiState {
  // ─── Companion visibility ────────────────────────────────────────────────
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;

  // ─── Analysis lifecycle ──────────────────────────────────────────────────
  analysisState: OviAiAnalysisState;
  setAnalysisState: (state: OviAiAnalysisState) => void;

  // ─── Session memory ──────────────────────────────────────────────────────
  session: OviAiSession;
  addTurn: (turn: ConversationTurn) => void;
  applyReport: (report: SimulatedReport) => void;
  resetSession: () => void;
}

// ─── Initial state ────────────────────────────────────────────────────────────

const EMPTY_SESSION: OviAiSession = {
  industry: null,
  asset: null,
  contamination: null,
  lastReport: null,
  turns: [],
};

// ─── Store ────────────────────────────────────────────────────────────────────

export const useOviAiStore = create<OviAiState>()(
  devtools(
    (set) => ({
      // Companion visibility
      isOpen: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),

      // Analysis lifecycle
      analysisState: "idle",
      setAnalysisState: (state) => set({ analysisState: state }),

      // Session memory
      session: EMPTY_SESSION,

      addTurn: (turn) =>
        set((s) => ({
          session: { ...s.session, turns: [...s.session.turns, turn] },
        })),

      applyReport: (report) =>
        set((s) => ({
          session: {
            ...s.session,
            industry: report.detectedIndustry,
            lastReport: report,
          },
        })),

      resetSession: () =>
        set({
          session: EMPTY_SESSION,
          analysisState: "idle",
        }),
    }),
    { name: "ovi-ai-store" },
  ),
);
