/**
 * Debug Overlay
 *
 * A floating development panel that surfaces real-time engine state.
 * Rendered only in development builds — tree-shaken out in production.
 *
 * Toggle visibility: press the backtick key ( ` )
 *
 * Displays:
 *   FPS · Device Tier · Frame Budget · Current Scene · Scene Progress
 *   Scroll Y · Scroll Progress · Velocity · Direction
 *   Camera Position · Camera Target · FOV
 *   Transition State · Loaded Assets · Reduced Motion
 */

"use client";

import { useCallback, useEffect, useState } from "react";

import { useEngineStore } from "@/store/engine-store";

const IS_DEV = process.env.NODE_ENV !== "production";

export const DebugOverlay = () => {
  const [visible, setVisible] = useState(false);

  const state = useEngineStore(
    useCallback(
      (s) => ({
        currentScene: s.currentScene,
        previousScene: s.previousScene,
        sceneProgress: s.sceneProgress,
        scroll: s.scroll,
        camera: s.camera,
        transition: s.transition,
        animation: s.animation,
        performance: s.performance,
        isInitialized: s.isInitialized,
      }),
      [],
    ),
  );

  useEffect(() => {
    if (!IS_DEV) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "`") {
        setVisible((v) => !v);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!IS_DEV || !visible) return null;

  const { scroll, camera, transition, animation, performance } = state;

  return (
    <div
      role="complementary"
      aria-label="Debug overlay"
      style={{
        position: "fixed",
        top: "1rem",
        right: "1rem",
        zIndex: 9999,
        width: "260px",
        background: "rgba(0, 0, 0, 0.88)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: "8px",
        padding: "12px 14px",
        fontFamily: "ui-monospace, monospace",
        fontSize: "11px",
        lineHeight: "1.6",
        color: "#f4f8ff",
        backdropFilter: "blur(8px)",
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      <DebugRow label="ENGINE" value={state.isInitialized ? "READY" : "INIT…"} accent="#5affc0" />

      <Divider />

      <DebugSection title="PERFORMANCE">
        <DebugRow label="FPS" value={performance.fps} />
        <DebugRow label="Tier" value={performance.deviceTier.toUpperCase()} />
        <DebugRow label="Budget" value={`${performance.frameBudget.toFixed(2)} ms`} />
        <DebugRow label="Assets" value={performance.loadedAssets} />
      </DebugSection>

      <Divider />

      <DebugSection title="SCENE">
        <DebugRow label="Current" value={state.currentScene} accent="#3dd2ff" />
        <DebugRow label="Previous" value={state.previousScene ?? "—"} />
        <DebugRow label="Progress" value={`${(state.sceneProgress * 100).toFixed(1)}%`} />
      </DebugSection>

      <Divider />

      <DebugSection title="SCROLL">
        <DebugRow label="Y" value={`${scroll.y.toFixed(0)} px`} />
        <DebugRow label="Progress" value={`${(scroll.progress * 100).toFixed(2)}%`} />
        <DebugRow label="Velocity" value={scroll.velocity.toFixed(2)} />
        <DebugRow label="Direction" value={scroll.direction} />
      </DebugSection>

      <Divider />

      <DebugSection title="CAMERA">
        <DebugRow
          label="Position"
          value={`[${camera.position.map((v) => v.toFixed(2)).join(", ")}]`}
        />
        <DebugRow
          label="Target"
          value={`[${camera.target.map((v) => v.toFixed(2)).join(", ")}]`}
        />
        <DebugRow label="FOV" value={`${camera.fov}°`} />
      </DebugSection>

      <Divider />

      <DebugSection title="TRANSITION">
        <DebugRow label="Active" value={transition.isTransitioning ? "YES" : "NO"} />
        <DebugRow label="Type" value={transition.type ?? "—"} />
        <DebugRow
          label="Progress"
          value={`${(transition.progress * 100).toFixed(1)}%`}
        />
      </DebugSection>

      <Divider />

      <DebugSection title="A11Y">
        <DebugRow
          label="Reduced Motion"
          value={animation.reducedMotion ? "YES" : "NO"}
          accent={animation.reducedMotion ? "#ffd166" : undefined}
        />
      </DebugSection>

      <div
        style={{
          marginTop: "8px",
          color: "rgba(255,255,255,0.3)",
          fontSize: "10px",
          textAlign: "center",
        }}
      >
        Press ` to hide
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

interface DebugRowProps {
  label: string;
  value: string | number;
  accent?: string;
}

const DebugRow = ({ label, value, accent }: DebugRowProps) => (
  <div style={{ display: "flex", justifyContent: "space-between", gap: "8px" }}>
    <span style={{ color: "rgba(255,255,255,0.45)", flexShrink: 0 }}>{label}</span>
    <span style={{ color: accent ?? "#f4f8ff", textAlign: "right", wordBreak: "break-all" }}>
      {value}
    </span>
  </div>
);

interface DebugSectionProps {
  title: string;
  children: React.ReactNode;
}

const DebugSection = ({ title, children }: DebugSectionProps) => (
  <div>
    <div
      style={{
        color: "rgba(255,255,255,0.3)",
        fontSize: "9px",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        marginBottom: "3px",
      }}
    >
      {title}
    </div>
    {children}
  </div>
);

const Divider = () => (
  <div
    style={{
      borderTop: "1px solid rgba(255,255,255,0.08)",
      margin: "6px 0",
    }}
  />
);
