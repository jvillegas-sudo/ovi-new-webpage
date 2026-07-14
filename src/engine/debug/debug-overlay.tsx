"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { useShallow } from "zustand/react/shallow";

import { useStoryEngine } from "@/engine/hooks/use-story-engine";
import { SCENES, SCENE_MAP } from "@/engine/scene/scene-config";
import type { SceneId } from "@/engine/types";
import { useEngineStore } from "@/store/engine-store";

const IS_DEV = process.env.NODE_ENV !== "production";

export const DebugOverlay = () => {
  const engine = useStoryEngine();
  const [panelOpen, setPanelOpen] = useState(true);
  const [debugEnabled, setDebugEnabled] = useState(true);
  const [performanceMode, setPerformanceMode] = useState(false);

  const state = useEngineStore(
    useShallow((store) => ({
      currentScene: store.currentScene,
      previousScene: store.previousScene,
      sceneProgress: store.sceneProgress,
      scroll: store.scroll,
      camera: store.camera,
      transition: store.transition,
      animation: store.animation,
      performance: store.performance,
      isInitialized: store.isInitialized,
    })),
  );

  useEffect(() => {
    if (!IS_DEV) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "`") {
        setPanelOpen((value) => !value);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!IS_DEV) return;

    document.documentElement.dataset.performanceMode = performanceMode ? "true" : "false";

    return () => {
      delete document.documentElement.dataset.performanceMode;
    };
  }, [performanceMode]);

  const currentSceneLabel = useMemo(
    () => SCENE_MAP.get(state.currentScene)?.label ?? state.currentScene,
    [state.currentScene],
  );

  const setReducedMotion = useCallback(
    (enabled: boolean) => {
      useEngineStore.setState((store) => ({
        animation: { ...store.animation, reducedMotion: enabled },
      }));
      engine.emit("animation:reduced-motion-change", { reducedMotion: enabled });
    },
    [engine],
  );

  const restartAnimations = useCallback(() => {
    gsap.globalTimeline.pause(0);
    gsap.globalTimeline.play();
    ScrollTrigger.refresh();
    engine.interaction.navigateToScene(state.currentScene);

    const config = SCENE_MAP.get(state.currentScene);
    if (config) {
      engine.transition.transition(state.previousScene, state.currentScene, config.transition);
    }
  }, [engine, state.currentScene, state.previousScene]);

  if (!IS_DEV) return null;

  return (
    <>
      {debugEnabled ? (
        <div className="pointer-events-none fixed left-4 top-20 z-[9998] hidden w-[min(22rem,calc(100vw-2rem))] rounded-3xl border border-white/10 bg-black/80 p-4 text-xs text-white shadow-2xl backdrop-blur-xl md:block">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-brand-secondary">
              Developer Preview
            </span>
            <span className="rounded-full border border-white/10 px-2 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-white/70">
              {state.isInitialized ? "Ready" : "Booting"}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <MetricCard label="FPS" value={state.performance.fps} />
            <MetricCard
              label="Timeline"
              value={`${Math.round(state.sceneProgress * 100)}%`}
            />
            <MetricCard label="Scene" value={currentSceneLabel} />
            <MetricCard
              label="Scroll"
              value={`${Math.round(state.scroll.progress * 100)}%`}
            />
            <MetricCard
              label="Camera"
              value={state.camera.position.map((value) => value.toFixed(1)).join(", ")}
            />
            <MetricCard label="Assets" value={state.performance.loadedAssets} />
          </div>
        </div>
      ) : null}

      <div className="fixed bottom-4 right-4 z-[9999] flex w-[min(24rem,calc(100vw-2rem))] flex-col items-end gap-3">
        {panelOpen ? (
          <div className="w-full rounded-[1.75rem] border border-white/10 bg-black/85 p-4 text-white shadow-2xl backdrop-blur-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-brand-primary">
                  Developer Panel
                </p>
                <p className="mt-2 text-sm text-white/70">
                  Local review controls for the current build.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPanelOpen(false)}
                className="rounded-full border border-white/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/70 transition hover:border-brand-primary/40 hover:text-white"
              >
                Hide
              </button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <MetricCard label="Active Scene" value={currentSceneLabel} />
              <MetricCard label="FPS" value={state.performance.fps} />
              <MetricCard
                label="Camera Position"
                value={state.camera.position.map((value) => value.toFixed(1)).join(", ")}
              />
              <MetricCard
                label="Scroll Progress"
                value={`${Math.round(state.scroll.progress * 100)}%`}
              />
              <MetricCard label="Loaded Assets" value={state.performance.loadedAssets} />
              <MetricCard
                label="Timeline Progress"
                value={`${Math.round(state.sceneProgress * 100)}%`}
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="developer-scene-select"
                className="mb-2 block text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white/45"
              >
                Jump to scene
              </label>
              <select
                id="developer-scene-select"
                value={state.currentScene}
                onChange={(event) =>
                  engine.interaction.navigateToScene(event.target.value as SceneId)
                }
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-brand-primary/50"
              >
                {SCENES.map((scene) => (
                  <option key={scene.id} value={scene.id} className="bg-[#081018] text-white">
                    {scene.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <ActionButton onClick={restartAnimations}>Restart Animations</ActionButton>
              <ActionButton onClick={() => setDebugEnabled((value) => !value)}>
                {debugEnabled ? "Hide Debug" : "Show Debug"}
              </ActionButton>
              <ActionButton
                onClick={() => setReducedMotion(!state.animation.reducedMotion)}
                active={state.animation.reducedMotion}
              >
                {state.animation.reducedMotion
                  ? "Disable Reduced Motion"
                  : "Enable Reduced Motion"}
              </ActionButton>
              <ActionButton
                onClick={() => setPerformanceMode((value) => !value)}
                active={performanceMode}
              >
                {performanceMode ? "Disable Performance Mode" : "Enable Performance Mode"}
              </ActionButton>
            </div>

            <div className="mt-4 grid gap-2 text-[0.7rem] text-white/60 sm:grid-cols-2">
              <StatusLine label="Previous Scene" value={state.previousScene ?? "—"} />
              <StatusLine
                label="Transition"
                value={
                  state.transition.isTransitioning
                    ? `${state.transition.type ?? "active"} · ${Math.round(state.transition.progress * 100)}%`
                    : "Idle"
                }
              />
            </div>
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => setPanelOpen((value) => !value)}
          className="rounded-full border border-white/10 bg-black/85 px-4 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-white shadow-2xl backdrop-blur-xl transition hover:border-brand-primary/40 hover:text-brand-primary"
        >
          {panelOpen ? "Developer Preview" : "Open Developer Preview"}
        </button>
      </div>
    </>
  );
};

const MetricCard = ({ label, value }: { label: string; value: string | number }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white/45">
      {label}
    </p>
    <p className="mt-2 text-sm font-semibold text-white">{value}</p>
  </div>
);

const ActionButton = ({
  active,
  children,
  onClick,
}: {
  active?: boolean;
  children: ReactNode;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={[
      "rounded-2xl border px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] transition",
      active
        ? "border-brand-secondary/60 bg-brand-secondary/10 text-white"
        : "border-white/10 bg-white/5 text-white/80 hover:border-brand-primary/40 hover:text-white",
    ].join(" ")}
  >
    {children}
  </button>
);

const StatusLine = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white/45">
      {label}
    </p>
    <p className="mt-1 text-xs text-white/80">{value}</p>
  </div>
);
