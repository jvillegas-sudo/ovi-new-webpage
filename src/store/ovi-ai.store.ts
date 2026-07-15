/**
 * Store: OVI AI State
 * Work Order 006
 *
 * Session-aware state for the persistent OVI AI holographic companion.
 * Tracks conversational messages, diagnostic context, and the Knowledge Engine recommendation.
 *
 * Architecture notes:
 *   - diagnosticContext accumulates answers across the entire diagnostic flow
 *   - messages drives the conversational UI (AI + user bubbles)
 *   - recommendation holds the final KE output (OviRecommendation)
 *   - diagnosticStep tracks where in the flow the user is
 *   - analysisState drives companion animations
 *   - Designed for future voice, image analysis, and multi-language extension
 */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {
  OviChatMessage,
  OviDecisionInput,
  OviRecommendation,
} from "@features/ovi-ai/ovi-ai-engine";

// ─── Diagnostic phases ────────────────────────────────────────────────────────

export type OviAiDiagnosticPhase =
  | "greeting" // companion just opened — showing welcome message
  | "diagnosing" // step-by-step diagnostic questions in progress
  | "generating" // recommendation is being computed (analysis animation)
  | "done"; // recommendation delivered

// ─── Session ──────────────────────────────────────────────────────────────────

export interface OviAiSession {
  /** Full conversation (assistant + user turns) */
  messages: OviChatMessage[];
  /** Accumulated diagnostic context built from user answers */
  diagnosticContext: OviDecisionInput;
  /** Decision tree step currently being asked (0 = none yet) */
  currentStep: number;
  /** Phase of the diagnostic flow */
  diagnosticPhase: OviAiDiagnosticPhase;
  /** Final recommendation from the Knowledge Engine */
  recommendation: OviRecommendation | null;

  // ─── Derived convenience fields (populated from context) ────────────────────
  /** Detected industry label from context — shown in session strip */
  industry: string | null;
}

// ─── State interface ──────────────────────────────────────────────────────────

export type OviAiAnalysisState = "idle" | "analyzing" | "done";

interface OviAiState {
  // ─── Companion visibility ────────────────────────────────────────────────
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;

  // ─── Analysis lifecycle (drives animations) ───────────────────────────────
  analysisState: OviAiAnalysisState;
  setAnalysisState: (state: OviAiAnalysisState) => void;

  // ─── Session ─────────────────────────────────────────────────────────────
  session: OviAiSession;

  /** Append a message to the conversation */
  addMessage: (message: OviChatMessage) => void;

  /** Merge new fields into the accumulated diagnostic context */
  updateDiagnosticContext: (update: Partial<OviDecisionInput>) => void;

  /** Advance the current decision tree step */
  setCurrentStep: (step: number) => void;

  /** Transition the diagnostic phase */
  setDiagnosticPhase: (phase: OviAiDiagnosticPhase) => void;

  /** Store the Knowledge Engine recommendation and mark phase as done */
  setRecommendation: (recommendation: OviRecommendation) => void;

  /** Reset the entire session to initial state */
  resetSession: () => void;
}

// ─── Initial state ────────────────────────────────────────────────────────────

const EMPTY_SESSION: OviAiSession = {
  messages: [],
  diagnosticContext: {},
  currentStep: 0,
  diagnosticPhase: "greeting",
  recommendation: null,
  industry: null,
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

      // Session
      session: EMPTY_SESSION,

      addMessage: (message) =>
        set((s) => ({
          session: {
            ...s.session,
            messages: [...s.session.messages, message],
          },
        })),

      updateDiagnosticContext: (update) =>
        set((s) => {
          const merged = { ...s.session.diagnosticContext, ...update };
          // Merge array fields (environmentalRestrictions) rather than replace
          if (
            update.environmentalRestrictions &&
            s.session.diagnosticContext.environmentalRestrictions
          ) {
            const existing = s.session.diagnosticContext.environmentalRestrictions;
            const incoming = update.environmentalRestrictions;
            merged.environmentalRestrictions = [
              ...new Set([...existing, ...incoming]),
            ] as OviDecisionInput["environmentalRestrictions"];
          }
          return {
            session: {
              ...s.session,
              diagnosticContext: merged,
              // Update derived industry label if industryId was provided
              industry: update.industryId ? (update.industryId as string) : s.session.industry,
            },
          };
        }),

      setCurrentStep: (step) => set((s) => ({ session: { ...s.session, currentStep: step } })),

      setDiagnosticPhase: (phase) =>
        set((s) => ({ session: { ...s.session, diagnosticPhase: phase } })),

      setRecommendation: (recommendation) =>
        set((s) => ({
          session: {
            ...s.session,
            recommendation,
            diagnosticPhase: "done",
          },
          analysisState: "done",
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
