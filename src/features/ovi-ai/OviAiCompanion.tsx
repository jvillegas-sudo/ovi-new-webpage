"use client";

/**
 * OVI AI — Holographic Companion
 * Experience Order 004
 *
 * Persistent holographic AI companion that lives inside the OVI universe.
 * NOT a chatbot widget. NOT a chat window.
 *
 * Visual identity:
 *   - Energy orb: pulsing radial-gradient sphere with animated rings
 *   - Holographic panel: corner brackets, scan line, mono-font readouts
 *   - Responds as a consulting engineer, never as a chatbot
 *
 * Session memory:
 *   - Remembers detected industry, last report, and conversation turns
 *   - Does not re-ask for context already known
 *
 * Architecture note:
 *   - No LLM connected — uses generateSimulatedReport() for DEMO mode
 *   - Designed for future voice, image analysis, and OVI OS integration
 */

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, ChevronRight, RotateCcw, ArrowRight } from "lucide-react";
import { cn } from "@utils/cn";
import { useOviAiStore } from "@store/ovi-ai.store";
import {
  generateSimulatedReport,
  ANALYSIS_STAGES,
  EXAMPLE_QUERIES,
  type SimulatedReport,
} from "@features/ovi-ai/ovi-ai-engine";

// ─── Energy Orb ───────────────────────────────────────────────────────────────

function EnergyOrb({
  isOpen,
  isAnalyzing,
  hasTurns,
  onClick,
}: {
  isOpen: boolean;
  isAnalyzing: boolean;
  hasTurns: boolean;
  onClick: () => void;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? "Cerrar OVI AI" : "Abrir OVI AI — Ingeniero Digital"}
      aria-expanded={isOpen}
      className="relative flex h-[52px] w-[52px] items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)]"
    >
      {/* Outer pulse rings — visible when not open */}
      {!isOpen && !prefersReducedMotion && (
        <>
          <motion.span
            className="pointer-events-none absolute h-full w-full rounded-full"
            style={{ border: "1px solid rgba(0,196,255,0.25)" }}
            animate={{
              scale: isAnalyzing ? [1, 1.8, 1] : [1, 1.4, 1],
              opacity: [0.6, 0, 0.6],
            }}
            transition={{
              duration: isAnalyzing ? 0.9 : 2.8,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
          <motion.span
            className="pointer-events-none absolute h-full w-full rounded-full"
            style={{ border: "1px solid rgba(0,255,133,0.18)" }}
            animate={{
              scale: isAnalyzing ? [1, 2.4, 1] : [1, 1.85, 1],
              opacity: [0.4, 0, 0.4],
            }}
            transition={{
              duration: isAnalyzing ? 0.9 : 2.8,
              delay: isAnalyzing ? 0.3 : 1.4,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        </>
      )}

      {/* Core sphere */}
      <motion.span
        className="relative flex h-full w-full items-center justify-center rounded-full"
        style={{
          background: isAnalyzing
            ? "radial-gradient(circle at 40% 40%, rgba(0,255,133,0.55) 0%, rgba(0,196,255,0.45) 40%, rgba(0,71,171,0.5) 75%, rgba(2,4,8,0.9) 100%)"
            : "radial-gradient(circle at 40% 40%, rgba(0,196,255,0.55) 0%, rgba(0,71,171,0.5) 50%, rgba(2,4,8,0.9) 100%)",
          border: isAnalyzing ? "1px solid rgba(0,255,133,0.45)" : "1px solid rgba(0,196,255,0.38)",
          boxShadow: isAnalyzing
            ? "0 0 18px rgba(0,255,133,0.35), 0 0 6px rgba(0,196,255,0.2)"
            : "0 0 14px rgba(0,196,255,0.3), 0 0 4px rgba(0,196,255,0.15)",
        }}
        animate={
          prefersReducedMotion
            ? {}
            : {
                boxShadow: isAnalyzing
                  ? [
                      "0 0 18px rgba(0,255,133,0.35), 0 0 6px rgba(0,196,255,0.2)",
                      "0 0 28px rgba(0,255,133,0.55), 0 0 10px rgba(0,196,255,0.35)",
                      "0 0 18px rgba(0,255,133,0.35), 0 0 6px rgba(0,196,255,0.2)",
                    ]
                  : [
                      "0 0 14px rgba(0,196,255,0.3), 0 0 4px rgba(0,196,255,0.15)",
                      "0 0 22px rgba(0,196,255,0.45), 0 0 7px rgba(0,196,255,0.25)",
                      "0 0 14px rgba(0,196,255,0.3), 0 0 4px rgba(0,196,255,0.15)",
                    ],
              }
        }
        transition={{
          duration: isAnalyzing ? 0.9 : 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* OVI wave glyph */}
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          aria-hidden="true"
          className={cn("transition-opacity duration-300", isOpen ? "opacity-0" : "opacity-100")}
        >
          <path
            d="M3 11 C5 7, 7 15, 9 11 C11 7, 13 15, 15 11 C17 7, 19 15, 21 11"
            stroke="rgba(255,255,255,0.9)"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        {/* Close glyph */}
        <X
          size={16}
          className={cn(
            "absolute text-white transition-opacity duration-300",
            isOpen ? "opacity-90" : "opacity-0",
          )}
          aria-hidden="true"
        />
      </motion.span>

      {/* Session active dot */}
      {hasTurns && !isOpen && (
        <span
          className="absolute top-0.5 right-0.5 h-2.5 w-2.5 rounded-full"
          style={{
            background: "var(--color-brand-accent)",
            boxShadow: "0 0 6px rgba(0,255,133,0.7)",
          }}
          aria-hidden="true"
        />
      )}
    </button>
  );
}

// ─── Scan line ────────────────────────────────────────────────────────────────

function ScanLine({ active }: { active: boolean }) {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion || !active) return null;
  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0 h-px"
      style={{
        background: "linear-gradient(to right, transparent, rgba(0,196,255,0.55), transparent)",
      }}
      animate={{ top: ["0%", "100%", "0%"] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
      aria-hidden="true"
    />
  );
}

// ─── Welcome view ─────────────────────────────────────────────────────────────

function WelcomeView({
  industry,
  onSelectExample,
}: {
  industry: string | null;
  onSelectExample: (q: string) => void;
}) {
  return (
    <div className="space-y-5">
      {/* Greeting — consultant, not chatbot */}
      <div>
        <p className="font-mono text-[9px] tracking-[0.22em] text-[var(--color-brand-primary)] uppercase">
          OVI AI · INGENIERO DIGITAL
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-primary)]">
          {industry
            ? `Continuando con su operación en ${industry}. ¿Qué desafío desea resolver?`
            : "¿Qué desafío operativo desea resolver hoy?"}
        </p>
      </div>

      {/* Example queries */}
      <div>
        <p className="mb-2 font-mono text-[8px] tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
          Consultas frecuentes
        </p>
        <div className="space-y-1.5">
          {EXAMPLE_QUERIES.slice(0, 3).map((q) => (
            <button
              key={q}
              onClick={() => onSelectExample(q)}
              className={cn(
                "block w-full rounded-md border border-[rgba(255,255,255,0.07)] px-3 py-2",
                "text-left font-mono text-[11px] text-[var(--color-text-secondary)] italic",
                "transition-all duration-200",
                "hover:border-[rgba(0,196,255,0.3)] hover:bg-[rgba(0,196,255,0.05)] hover:text-[var(--color-text-primary)]",
                "focus-visible:outline-2 focus-visible:outline-[var(--color-brand-primary)]",
              )}
              aria-label={`Usar consulta: ${q}`}
            >
              &ldquo;{q}&rdquo;
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Analyzing view ───────────────────────────────────────────────────────────

function AnalyzingView({ stage }: { stage: string }) {
  const prefersReducedMotion = useReducedMotion();
  const RINGS = [0, 1, 2, 3];

  return (
    <div className="flex flex-col items-center gap-5 py-6" role="status" aria-live="polite">
      {/* Energy rings */}
      <div className="relative flex h-20 w-20 items-center justify-center" aria-hidden="true">
        {RINGS.map((i) => (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              border: `1px solid ${i % 2 === 0 ? "rgba(0,196,255,0.5)" : "rgba(0,255,133,0.4)"}`,
            }}
            animate={
              prefersReducedMotion
                ? {}
                : {
                    width: ["20%", "100%"],
                    height: ["20%", "100%"],
                    opacity: [0.8, 0],
                  }
            }
            transition={{
              duration: 1.6,
              delay: i * 0.4,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}
        {/* Core dot */}
        <motion.span
          className="h-3 w-3 rounded-full"
          style={{ background: "var(--color-brand-primary)" }}
          animate={prefersReducedMotion ? {} : { scale: [1, 1.35, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="text-center">
        <p className="font-mono text-[9px] tracking-[0.22em] text-[var(--color-brand-accent)] uppercase">
          OVI AI · ANALIZANDO
        </p>
        <AnimatePresence mode="wait">
          <motion.p
            key={stage}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
            className="mt-1.5 font-mono text-xs text-[var(--color-brand-primary)]"
          >
            {stage}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <div
        className="h-0.5 w-40 overflow-hidden rounded-full bg-[var(--color-border-subtle)]"
        role="progressbar"
        aria-label="Progreso del análisis"
      >
        <motion.div
          className="h-full bg-gradient-to-r from-[var(--color-brand-secondary)] to-[var(--color-brand-primary)]"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.8, ease: "linear" }}
        />
      </div>
    </div>
  );
}

// ─── Holographic report readout ───────────────────────────────────────────────

function ReportReadout({ report, onReset }: { report: SimulatedReport; onReset: () => void }) {
  const COMPLEXITY_COLOR: Record<SimulatedReport["complexityLevel"], string> = {
    Bajo: "rgba(0,255,133,0.8)",
    Medio: "rgba(0,196,255,0.8)",
    Alto: "rgba(255,165,0,0.85)",
    Crítico: "rgba(255,59,59,0.85)",
  };

  return (
    <div className="space-y-4">
      {/* Report header */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9px] tracking-[0.22em] text-[var(--color-brand-primary)] uppercase">
          DIAGNÓSTICO · OVI ENGINEERING
        </span>
        <button
          onClick={onReset}
          className={cn(
            "flex items-center gap-1 rounded px-2 py-1",
            "font-mono text-[9px] tracking-[0.12em] text-[var(--color-text-tertiary)] uppercase",
            "transition-colors hover:text-[var(--color-text-primary)]",
            "focus-visible:outline-2 focus-visible:outline-[var(--color-brand-primary)]",
          )}
          aria-label="Nueva consulta"
        >
          <RotateCcw size={10} aria-hidden="true" />
          Nueva consulta
        </button>
      </div>

      {/* Industry + complexity */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="rounded-md border border-[rgba(0,196,255,0.15)] bg-[rgba(0,196,255,0.04)] px-3 py-2.5"
      >
        <p className="mb-0.5 font-mono text-[8px] tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
          INDUSTRIA DETECTADA
        </p>
        <p className="text-xs font-medium text-[var(--color-text-primary)]">
          {report.detectedIndustry}
        </p>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="font-mono text-[8px] tracking-[0.14em] text-[var(--color-text-tertiary)] uppercase">
            Complejidad:
          </span>
          <span
            className="font-mono text-[10px] font-semibold"
            style={{ color: COMPLEXITY_COLOR[report.complexityLevel] }}
          >
            {report.complexityLevel}
          </span>
        </div>
      </motion.div>

      {/* Diagnosis */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
      >
        <p className="mb-1 font-mono text-[8px] tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
          DIAGNÓSTICO
        </p>
        <p className="text-xs leading-relaxed text-[var(--color-text-secondary)]">
          {report.diagnosisInitial}
        </p>
      </motion.div>

      {/* Protocols */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <p className="mb-1.5 font-mono text-[8px] tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
          PROTOCOLOS RECOMENDADOS
        </p>
        <ul className="space-y-1.5">
          {report.suggestedProtocols.map((protocol) => (
            <li key={protocol} className="flex items-start gap-2">
              <ChevronRight
                size={10}
                className="mt-0.5 shrink-0 text-[var(--color-brand-accent)]"
                aria-hidden="true"
              />
              <span className="font-mono text-[10px] leading-relaxed text-[var(--color-text-secondary)]">
                {protocol}
              </span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Key service */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28 }}
      >
        <p className="mb-1.5 font-mono text-[8px] tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
          SIGUIENTE PASO RECOMENDADO
        </p>
        <div className="flex items-start gap-2 rounded-md border border-[rgba(0,255,133,0.2)] bg-[rgba(0,255,133,0.04)] px-3 py-2">
          <ArrowRight
            size={11}
            className="mt-0.5 shrink-0 text-[var(--color-brand-accent)]"
            aria-hidden="true"
          />
          <span className="text-xs leading-relaxed text-[var(--color-text-primary)]">
            {report.nextSteps[0]}
          </span>
        </div>
      </motion.div>

      {/* Ecosystem hooks — future capabilities */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="border-t border-[rgba(255,255,255,0.06)] pt-3"
      >
        <p className="mb-2 font-mono text-[8px] tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
          CONTINUAR EN OVI
        </p>
        <div className="flex flex-wrap gap-1.5">
          {["OVI Lab", "OVI Store", "OVI OS"].map((label) => (
            <span
              key={label}
              className="rounded-full border border-[rgba(255,255,255,0.1)] px-2.5 py-0.5"
            >
              <span className="font-mono text-[9px] tracking-[0.12em] text-[var(--color-text-tertiary)] uppercase">
                {label}
              </span>
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ─── Holographic panel ────────────────────────────────────────────────────────

function HolographicPanel({
  industry,
  analysisState,
  analysisStage,
  lastReport,
  onClose,
  onReset,
  onSubmit,
}: {
  industry: string | null;
  analysisState: "idle" | "analyzing" | "done";
  analysisStage: string;
  lastReport: SimulatedReport | null;
  onClose: () => void;
  onReset: () => void;
  onSubmit: (query: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const isIdle = analysisState === "idle";

  // Focus input when returning to idle
  useEffect(() => {
    if (!isIdle) return;
    const id = window.setTimeout(() => inputRef.current?.focus(), 120);
    return () => window.clearTimeout(id);
  }, [isIdle]);

  // When an example is selected, also focus the input
  const handleSelectExample = (q: string) => {
    setQuery(q);
    window.setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleSubmitInternal = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed || analysisState === "analyzing") return;
    onSubmit(trimmed);
    setQuery("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative overflow-hidden rounded-xl",
        "border border-[rgba(0,196,255,0.22)]",
        "bg-[rgba(3,6,14,0.96)] backdrop-blur-xl",
      )}
      style={{
        boxShadow:
          "0 0 0 1px rgba(0,196,255,0.08), 0 8px 40px rgba(0,0,0,0.65), 0 0 60px rgba(0,196,255,0.06)",
      }}
      role="dialog"
      aria-label="OVI AI — Ingeniero Digital"
      aria-modal="false"
    >
      {/* Corner brackets */}
      <div
        className="pointer-events-none absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-[var(--color-brand-primary)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-[var(--color-brand-primary)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-[rgba(0,196,255,0.4)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 bottom-0 h-4 w-4 border-r-2 border-b-2 border-[rgba(0,196,255,0.4)]"
        aria-hidden="true"
      />

      {/* Animated scan line */}
      <ScanLine active={isIdle || analysisState === "done"} />

      {/* Panel header */}
      <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.06)] px-4 py-3">
        <div className="flex items-center gap-2">
          <motion.span
            className="h-1.5 w-1.5 rounded-full"
            style={{
              background:
                analysisState === "analyzing"
                  ? "var(--color-brand-accent)"
                  : "var(--color-brand-primary)",
            }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          />
          <span className="font-mono text-[9px] tracking-[0.22em] text-[var(--color-brand-primary)] uppercase">
            OVI AI · INGENIERO DIGITAL
          </span>
        </div>
        <button
          onClick={onClose}
          className={cn(
            "rounded p-1 text-[var(--color-text-tertiary)]",
            "transition-colors hover:text-[var(--color-text-primary)]",
            "focus-visible:outline-2 focus-visible:outline-[var(--color-brand-primary)]",
          )}
          aria-label="Cerrar OVI AI"
        >
          <X size={13} aria-hidden="true" />
        </button>
      </div>

      {/* Session memory strip */}
      {industry && (
        <div className="flex items-center gap-2 border-b border-[rgba(255,255,255,0.04)] bg-[rgba(0,196,255,0.04)] px-4 py-2">
          <span className="font-mono text-[8px] tracking-[0.14em] text-[var(--color-text-tertiary)] uppercase">
            SESIÓN:
          </span>
          <span className="rounded-full border border-[rgba(0,196,255,0.25)] px-2 py-0.5">
            <span className="font-mono text-[9px] tracking-[0.1em] text-[var(--color-brand-primary)]">
              {industry}
            </span>
          </span>
        </div>
      )}

      {/* Scrollable content */}
      <div className="max-h-[320px] overflow-y-auto overscroll-contain px-4 py-4">
        <AnimatePresence mode="wait">
          {analysisState === "idle" && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <WelcomeView industry={industry} onSelectExample={handleSelectExample} />
            </motion.div>
          )}

          {analysisState === "analyzing" && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <AnalyzingView stage={analysisStage} />
            </motion.div>
          )}

          {analysisState === "done" && lastReport && (
            <motion.div
              key="report"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <ReportReadout report={lastReport} onReset={onReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Query input — hidden during analysis */}
      {(() => {
        const showInput = analysisState !== "analyzing";
        return (
          <AnimatePresence>
            {showInput && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.25 }}
                className="border-t border-[rgba(255,255,255,0.06)] px-4 py-3"
              >
                <form onSubmit={handleSubmitInternal} className="flex items-center gap-2">
                  {/* Terminal prompt */}
                  <span
                    className="font-mono text-xs text-[var(--color-brand-primary)]"
                    aria-hidden="true"
                  >
                    &gt;
                  </span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Describa el desafío operativo..."
                    className={cn(
                      "min-w-0 flex-1 bg-transparent font-mono text-xs",
                      "text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)]",
                      "outline-none focus:placeholder:opacity-0",
                    )}
                    aria-label="Consulta para OVI AI"
                  />
                  {/* Submit via Enter */}
                  <input type="submit" className="hidden" aria-hidden="true" />
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        );
      })()}

      {/* Demo label */}
      <div className="flex items-center justify-between border-t border-[rgba(255,255,255,0.04)] px-4 py-2">
        <span className="font-mono text-[8px] tracking-[0.14em] text-[var(--color-text-tertiary)] uppercase">
          DEMO · MODO SIMULACIÓN
        </span>
        <span className="font-mono text-[8px] tracking-[0.1em] text-[rgba(0,196,255,0.4)]">
          OVI — INGENIERÍA EN LIMPIEZA
        </span>
      </div>
    </motion.div>
  );
}

// ─── Main Companion ───────────────────────────────────────────────────────────

export function OviAiCompanion() {
  const {
    isOpen,
    open,
    close,
    toggle,
    analysisState,
    setAnalysisState,
    session,
    addTurn,
    applyReport,
    resetSession,
  } = useOviAiStore();

  const [analysisStage, setAnalysisStage] = useState<string>(ANALYSIS_STAGES[0]);
  const [pendingQuery, setPendingQuery] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Handle close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, close]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        close();
      }
    };
    // Small delay to avoid immediate close on open click
    const id = window.setTimeout(() => document.addEventListener("mousedown", handler), 50);
    return () => {
      window.clearTimeout(id);
      document.removeEventListener("mousedown", handler);
    };
  }, [isOpen, close]);

  // Run analysis when pendingQuery is set
  useEffect(() => {
    if (!pendingQuery) return;

    setAnalysisState("analyzing");

    let stageIndex = 0;
    const stageInterval = window.setInterval(() => {
      stageIndex += 1;
      if (stageIndex < ANALYSIS_STAGES.length) {
        setAnalysisStage(ANALYSIS_STAGES[stageIndex]);
      }
    }, 540);

    const analysisTimeout = window.setTimeout(() => {
      window.clearInterval(stageInterval);
      const report = generateSimulatedReport(pendingQuery);
      const turn = {
        id: `turn-${Date.now()}`,
        query: pendingQuery,
        report,
        timestamp: Date.now(),
      };
      addTurn(turn);
      applyReport(report);
      setAnalysisState("done");
      setAnalysisStage(ANALYSIS_STAGES[0]);
      setPendingQuery(null);
    }, 2800);

    return () => {
      window.clearInterval(stageInterval);
      window.clearTimeout(analysisTimeout);
    };
  }, [pendingQuery, addTurn, applyReport, setAnalysisState]);

  const handleSubmit = useCallback(
    (query: string) => {
      if (!query.trim() || analysisState === "analyzing") return;
      setPendingQuery(query.trim());
      if (!isOpen) open();
    },
    [analysisState, isOpen, open],
  );

  const handleReset = useCallback(() => {
    resetSession();
    setAnalysisStage(ANALYSIS_STAGES[0]);
    setPendingQuery(null);
  }, [resetSession]);

  return (
    <div
      ref={panelRef}
      className="fixed right-5 bottom-5 z-[800] flex flex-col items-end gap-3"
      aria-label="OVI AI — Ingeniero Digital"
    >
      {/* Holographic panel */}
      <AnimatePresence>
        {isOpen && (
          <div className="w-[360px] max-w-[calc(100vw-2.5rem)]">
            <HolographicPanel
              industry={session.industry}
              analysisState={analysisState}
              analysisStage={analysisStage}
              lastReport={session.lastReport}
              onClose={close}
              onReset={handleReset}
              onSubmit={handleSubmit}
            />
          </div>
        )}
      </AnimatePresence>

      {/* Energy orb */}
      <EnergyOrb
        isOpen={isOpen}
        isAnalyzing={analysisState === "analyzing"}
        hasTurns={session.turns.length > 0}
        onClick={toggle}
      />
    </div>
  );
}

// ─── Trigger hook ─────────────────────────────────────────────────────────────

/**
 * useOviAi — programmatic access to the OVI AI companion.
 * Call from any page or feature to open the companion with a pre-filled query.
 *
 * @example
 *   const { openWithQuery } = useOviAi()
 *   openWithQuery("Necesito limpiar motores en una planta industrial")
 */
export function useOviAi() {
  const { open, close, toggle, isOpen } = useOviAiStore();
  return { open, close, toggle, isOpen };
}
