/**
 * Store: OVI Experience Context
 * Work Order 013 — Unified Journey Continuity
 *
 * Single source of truth for the cross-module engineering journey.
 * Written by OVI Lab, OVI AI, and OVI Store/Soluciones.
 * Consumed by Contact form (prefill) and OVI OS (continuity panel).
 *
 * Architecture rules:
 *   - No duplicate state between modules — each module reads/writes THIS store.
 *   - Session-persistent via sessionStorage so context survives SPA navigation.
 *   - Fallback rule: if context is absent, modules continue normally (never restart).
 */

import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

// ─── Journey Data ─────────────────────────────────────────────────────────────

/** All fields accumulated during the engineering journey. */
export interface ExperienceJourneyData {
  // Inputs collected through Lab / AI / Store wizards
  industryId: string | null;
  assetType: string | null;
  zone: string | null;
  surfaceId: string | null;
  contaminationId: string | null;
  contaminationLevel: string | null;
  clientGoal: string | null;

  // Outputs produced by the Knowledge Engine
  diagnosis: string | null;
  technicalJustification: string | null;
  primaryProductId: string | null;
  primaryProductName: string | null;
  protocolId: string | null;
  protocolName: string | null;
  serviceId: string | null;
  serviceName: string | null;
  expectedBenefit: string | null;

  // Metadata
  /** Which module last enriched the context */
  sceneOrigin: "lab" | "ovi-ai" | "store" | null;
  /** Logical next step in the journey */
  nextStep: "ovi-ai" | "store/soluciones" | "contact" | null;
  /** Unix ms timestamp of last update */
  lastUpdated: number | null;
}

// ─── Input subset ─────────────────────────────────────────────────────────────

type JourneyInput = Pick<
  ExperienceJourneyData,
  | "industryId"
  | "assetType"
  | "zone"
  | "surfaceId"
  | "contaminationId"
  | "contaminationLevel"
  | "clientGoal"
>;

type DiagnosisOutput = Pick<
  ExperienceJourneyData,
  | "diagnosis"
  | "technicalJustification"
  | "primaryProductId"
  | "primaryProductName"
  | "protocolId"
  | "protocolName"
  | "serviceId"
  | "serviceName"
  | "expectedBenefit"
>;

// ─── State interface ──────────────────────────────────────────────────────────

interface ExperienceContextState extends ExperienceJourneyData {
  /**
   * Merge partial journey inputs (sector, activo, zona, etc.).
   * Called by Lab and AI when the user selects each step.
   */
  updateInput: (input: Partial<JourneyInput>) => void;

  /**
   * Write Knowledge Engine output to the context.
   * Called by Lab, AI, and Store when a recommendation is ready.
   */
  setDiagnosis: (
    output: Partial<DiagnosisOutput>,
    sceneOrigin: ExperienceJourneyData["sceneOrigin"],
    nextStep?: ExperienceJourneyData["nextStep"],
  ) => void;

  /** Reset the entire journey context. */
  clearContext: () => void;
}

// ─── Initial state ────────────────────────────────────────────────────────────

const EMPTY_CONTEXT: ExperienceJourneyData = {
  industryId: null,
  assetType: null,
  zone: null,
  surfaceId: null,
  contaminationId: null,
  contaminationLevel: null,
  clientGoal: null,
  diagnosis: null,
  technicalJustification: null,
  primaryProductId: null,
  primaryProductName: null,
  protocolId: null,
  protocolName: null,
  serviceId: null,
  serviceName: null,
  expectedBenefit: null,
  sceneOrigin: null,
  nextStep: null,
  lastUpdated: null,
};

// ─── Store ────────────────────────────────────────────────────────────────────

export const useExperienceContextStore = create<ExperienceContextState>()(
  devtools(
    persist(
      (set) => ({
        ...EMPTY_CONTEXT,

        updateInput: (input) =>
          set(
            (s) => ({
              ...s,
              ...Object.fromEntries(Object.entries(input).filter(([, v]) => v != null)),
              lastUpdated: Date.now(),
            }),
            false,
            "experience/updateInput",
          ),

        setDiagnosis: (output, sceneOrigin, nextStep = "contact") =>
          set(
            (s) => ({
              ...s,
              ...Object.fromEntries(Object.entries(output).filter(([, v]) => v != null)),
              sceneOrigin,
              nextStep,
              lastUpdated: Date.now(),
            }),
            false,
            "experience/setDiagnosis",
          ),

        clearContext: () => set({ ...EMPTY_CONTEXT }, false, "experience/clearContext"),
      }),
      {
        name: "ovi-experience-context",
        storage: createJSONStorage(() =>
          typeof window !== "undefined" ? window.sessionStorage : localStorage,
        ),
      },
    ),
    { name: "experience-context-store" },
  ),
);
