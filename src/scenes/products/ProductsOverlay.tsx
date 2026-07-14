"use client";

import { useEffect, useMemo, useState } from "react";

import { Button, Input } from "@/components";
import {
  INDUSTRY_OPTIONS,
  PRODUCT_INFORMATION_LAYERS,
  PRODUCTS,
  PRODUCT_SEARCH_EXAMPLES,
  getAiRecommendation,
  getComparisonProduct,
  getHeadline,
  getIndustryLabel,
  getLayerIndex,
  getProductById,
  getProductIndex,
  getProductProgress,
  type IndustryId,
  type InspectionMode,
} from "@/scenes/products/data/products";
import { cn } from "@/lib/cn";

type Snapshot = {
  activeIndex: number;
  segmentProgress: number;
  hoveredHotspotId: string | null;
  headline: string;
  layerIndex: number;
  transitionProgress: number;
};

type SelectedHotspot = {
  productId: string;
  hotspotId: string;
} | null;

type Props = {
  scrollRef: React.MutableRefObject<number>;
  hoverRef: React.MutableRefObject<string | null>;
  onSelectProduct: (index: number) => void;
  query: string;
  onQueryChange: (query: string) => void;
  inspectionMode: InspectionMode;
  onInspectionModeChange: (mode: InspectionMode) => void;
  exploded: boolean;
  onExplodedChange: (value: boolean) => void;
  zoomLevel: number;
  onZoomLevelChange: (value: number) => void;
  compareProductId: string | null;
  onCompareProductIdChange: (productId: string) => void;
  selectedIndustryId: IndustryId | null;
  onSelectedIndustryIdChange: (industryId: IndustryId | null) => void;
  selectedHotspot: SelectedHotspot;
  onSelectHotspot: (selection: SelectedHotspot) => void;
  focusedProductIds: string[];
};

function Meter({ label, value, suffix, color }: { label: string; value: number; suffix: string; color: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-3 backdrop-blur-sm">
      <div className="mb-2 flex items-center justify-between gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-text-secondary">
        <span>{label}</span>
        <span className="text-white">
          {value}
          {suffix}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/8">
        <div className="h-full rounded-full transition-[width] duration-300" style={{ width: `${Math.min(100, value)}%`, background: color }} />
      </div>
    </div>
  );
}

export function ProductsOverlay({
  scrollRef,
  hoverRef,
  onSelectProduct,
  query,
  onQueryChange,
  inspectionMode,
  onInspectionModeChange,
  exploded,
  onExplodedChange,
  zoomLevel,
  onZoomLevelChange,
  compareProductId,
  onCompareProductIdChange,
  selectedIndustryId,
  onSelectedIndustryIdChange,
  selectedHotspot,
  onSelectHotspot,
  focusedProductIds,
}: Props) {
  const [snapshot, setSnapshot] = useState<Snapshot>({
    activeIndex: 0,
    segmentProgress: 0,
    hoveredHotspotId: null,
    headline: getHeadline(0),
    layerIndex: 0,
    transitionProgress: 0,
  });

  useEffect(() => {
    let frame = 0;

    const tick = () => {
      const progress = scrollRef.current;
      const activeIndex = getProductIndex(progress);
      const segmentProgress = Number(getProductProgress(progress, activeIndex).toFixed(2));
      const hoveredHotspotId = hoverRef.current;
      const headline = getHeadline(progress);
      const layerIndex = getLayerIndex(segmentProgress);
      const transitionProgress = Number(Math.min(1, Math.max(0, (progress - 0.88) / 0.12)).toFixed(2));

      setSnapshot((previous) => {
        if (
          previous.activeIndex === activeIndex &&
          previous.segmentProgress === segmentProgress &&
          previous.hoveredHotspotId === hoveredHotspotId &&
          previous.headline === headline &&
          previous.layerIndex === layerIndex &&
          previous.transitionProgress === transitionProgress
        ) {
          return previous;
        }

        return {
          activeIndex,
          segmentProgress,
          hoveredHotspotId,
          headline,
          layerIndex,
          transitionProgress,
        };
      });

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [hoverRef, scrollRef]);

  const activeProduct = PRODUCTS[snapshot.activeIndex] ?? PRODUCTS[0];
  const relatedProducts = activeProduct.relationships.map((relationship) => getProductById(relationship.targetId));
  const comparisonProduct = getComparisonProduct(activeProduct, compareProductId);
  const recommendation = getAiRecommendation(activeProduct, query || PRODUCT_SEARCH_EXAMPLES[0]);
  const focusedCount = focusedProductIds.length || PRODUCTS.length;

  const activeHotspot = useMemo(() => {
    const selection =
      selectedHotspot && selectedHotspot.productId === activeProduct.id
        ? activeProduct.hotspots.find((hotspot) => hotspot.id === selectedHotspot.hotspotId)
        : null;
    return (
      selection ??
      activeProduct.hotspots.find((hotspot) => hotspot.id === snapshot.hoveredHotspotId) ??
      activeProduct.hotspots[0]
    );
  }, [activeProduct, selectedHotspot, snapshot.hoveredHotspotId]);

  const activeLayerLabel = PRODUCT_INFORMATION_LAYERS[snapshot.layerIndex] ?? PRODUCT_INFORMATION_LAYERS[0];
  const transitionLabel =
    selectedIndustryId !== null
      ? INDUSTRY_OPTIONS.find((option) => option.id === selectedIndustryId)?.transition
      : "Select an industry and unrelated products dissolve before Sprint 009.";

  return (
    <div className="absolute inset-0">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="pointer-events-none absolute left-6 top-6 h-10 w-10 border-l-2 border-t-2 border-white/20" />
      <div className="pointer-events-none absolute bottom-6 right-6 h-10 w-10 border-b-2 border-r-2 border-white/20" />

      <div className="pointer-events-none absolute left-6 top-6 right-6 flex items-start justify-between gap-6">
        <div aria-live="polite">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-brand-primary">
            Chapter 04 — Product Ecosystem
          </p>
          <p className="mt-3 text-sm font-semibold uppercase tracking-[0.22em] text-white/70">
            {activeProduct.chapter} · {activeProduct.category}
          </p>
          <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-white md:text-5xl">
            {activeProduct.name}
          </h2>
        </div>

        <div className="max-w-sm text-right">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white/35">
            Progressive layer
          </p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary">
            {activeLayerLabel} · {focusedCount} products active
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-12 top-1/2 -translate-y-1/2">
        <p className="mx-auto max-w-5xl text-center text-[clamp(2rem,5vw,4.8rem)] font-black uppercase leading-[1.02] tracking-tight text-white drop-shadow-[0_0_24px_rgba(0,0,0,0.45)]">
          {snapshot.headline}
        </p>
      </div>

      <nav aria-label="Products" className="absolute left-6 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-2">
        {PRODUCTS.map((product, index) => {
          const active = product.id === activeProduct.id;
          return (
            <button
              key={product.id}
              type="button"
              onClick={() => onSelectProduct(index)}
              className="rounded-full border px-3 py-2 text-left text-[0.65rem] font-semibold uppercase tracking-[0.18em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
              style={{
                borderColor: active ? product.model.primary : "rgba(255,255,255,0.12)",
                background: active ? `${product.model.primary}16` : "rgba(8,12,18,0.42)",
                color: active ? "#ffffff" : "rgba(244,248,255,0.62)",
              }}
              aria-current={active ? "step" : undefined}
            >
              {product.chapter.replace("Product ", "P")}
            </button>
          );
        })}
      </nav>

      <div className="pointer-events-none absolute bottom-8 left-24 right-28 grid gap-4 xl:grid-cols-[1.12fr_0.88fr]">
        <section className="rounded-[1.75rem] border border-white/10 bg-bg-glass/80 p-5 shadow-glass backdrop-blur-xl">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-text-muted">Purpose</p>
              <p className="mt-3 text-lg font-black uppercase tracking-tight text-white">{activeProduct.purpose}</p>
            </div>
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-text-muted">Technology</p>
              <p className="mt-3 text-lg font-black uppercase tracking-tight text-white">{activeProduct.technology}</p>
            </div>
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-text-muted">Industries</p>
              <p className="mt-3 text-lg font-black uppercase tracking-tight text-white">{activeProduct.industries.map(getIndustryLabel).join(" · ")}</p>
            </div>
          </div>

          <div className="mt-5 h-px bg-white/8" />

          <div className="mt-5 flex flex-wrap items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-text-secondary">
            <span>{activeProduct.chemicalFamily}</span>
            <span className="text-white/20">/</span>
            <span>{activeProduct.protocols.join(" · ")}</span>
            <span className="text-white/20">/</span>
            <span>{activeProduct.transitionCue}</span>
          </div>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/8">
            <div
              className="h-full rounded-full transition-[width] duration-300"
              style={{
                width: `${((snapshot.layerIndex + 1) / PRODUCT_INFORMATION_LAYERS.length) * 100}%`,
                background: `linear-gradient(90deg, ${activeProduct.model.secondary} 0%, ${activeProduct.model.primary} 60%, ${activeProduct.model.accent} 100%)`,
              }}
            />
          </div>
        </section>

        <section className="rounded-[1.75rem] border border-white/10 bg-bg-glass/80 p-5 shadow-glass backdrop-blur-xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-text-muted">
                Sustainability dashboard
              </p>
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-text-secondary">
                Environmental impact visualized without static charts.
              </p>
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/70">
              {snapshot.segmentProgress > 0.5 ? "Expanded" : "Progressive"}
            </div>
          </div>

          <div className="mt-4 grid gap-3">
            {activeProduct.sustainability.map((metric) => (
              <Meter key={metric.label} label={metric.label} value={metric.value} suffix={metric.suffix} color={metric.color} />
            ))}
          </div>
        </section>
      </div>

      <section className="pointer-events-auto absolute right-6 top-24 flex w-full max-w-sm flex-col gap-4">
        <div className="rounded-3xl border border-white/10 bg-black/30 p-4 backdrop-blur-md">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-brand-primary">
                Intelligent search
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-text-secondary">
                Describe the job. Products reorganize automatically.
              </p>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/70">
              {focusedCount} visible
            </span>
          </div>
          <Input
            value={query}
            onChange={(event) => {
              onSelectedIndustryIdChange(null);
              onQueryChange(event.target.value);
            }}
            placeholder={PRODUCT_SEARCH_EXAMPLES[0]}
            aria-label="Describe your cleaning challenge"
            className="mt-4 rounded-2xl bg-white/8 font-semibold uppercase tracking-[0.12em]"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {PRODUCT_SEARCH_EXAMPLES.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => {
                  onSelectedIndustryIdChange(null);
                  onQueryChange(example);
                }}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/75 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-black/30 p-4 backdrop-blur-md">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-brand-secondary">
                Product controls
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-text-secondary">
                Rotate with drag. Inspect with guided states.
              </p>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/70">
              Zoom {Math.round(zoomLevel * 100)}%
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {(["story", "materials", "technical"] as InspectionMode[]).map((mode) => (
              <Button
                key={mode}
                type="button"
                variant={inspectionMode === mode ? "primary" : "ghost"}
                size="sm"
                onClick={() => onInspectionModeChange(mode)}
                className="uppercase tracking-[0.16em]"
              >
                {mode}
              </Button>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <Button type="button" variant={exploded ? "primary" : "ghost"} size="sm" onClick={() => onExplodedChange(!exploded)} className="uppercase tracking-[0.16em]">
              Exploded {exploded ? "on" : "off"}
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => onZoomLevelChange(Math.max(0, zoomLevel - 0.15))} className="uppercase tracking-[0.16em]">
              Zoom out
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => onZoomLevelChange(Math.min(1, zoomLevel + 0.15))} className="uppercase tracking-[0.16em]">
              Zoom in
            </Button>
          </div>
        </div>
      </section>

      <section className="pointer-events-auto absolute bottom-8 right-6 hidden w-full max-w-sm xl:block">
        <div
          className="rounded-3xl border border-brand-primary/20 bg-[linear-gradient(135deg,rgba(61,210,255,0.14),rgba(90,255,192,0.08))] p-4"
          style={{ opacity: 0.5 + snapshot.transitionProgress * 0.5 }}
        >
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-brand-primary">
            Transition prepared
          </p>
          <p className="mt-3 text-lg font-black uppercase tracking-tight text-white">{transitionLabel}</p>
          <p className="mt-3 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-text-secondary">
            {selectedIndustryId ? `${getIndustryLabel(selectedIndustryId)} selected.` : "Choose an industry to keep only relevant products active before Sprint 009."}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {INDUSTRY_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => onSelectedIndustryIdChange(selectedIndustryId === option.id ? null : option.id)}
                className={cn(
                  "rounded-full border px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary",
                  selectedIndustryId === option.id
                    ? "border-brand-primary bg-brand-primary/15 text-white"
                    : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pointer-events-auto absolute left-24 top-24 hidden w-full max-w-sm xl:block">
        <div className="rounded-3xl border border-white/10 bg-black/28 p-4 backdrop-blur-md">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-brand-secondary">Hotspot panel</p>
          <p className="mt-3 text-sm font-black uppercase tracking-tight text-white">{activeHotspot.title}</p>
          <p className="mt-3 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-brand-primary">{activeHotspot.layer}</p>
          <p className="mt-3 text-xs uppercase tracking-[0.14em] text-text-secondary">{activeHotspot.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {activeProduct.hotspots.map((hotspot) => {
              const active = hotspot.id === activeHotspot.id;
              return (
                <button
                  key={hotspot.id}
                  type="button"
                  onClick={() => onSelectHotspot({ productId: activeProduct.id, hotspotId: hotspot.id })}
                  className={cn(
                    "rounded-full border px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary",
                    active ? "border-brand-primary bg-brand-primary/15 text-white" : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10",
                  )}
                >
                  {hotspot.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pointer-events-auto absolute left-24 bottom-56 hidden w-full max-w-sm xl:block">
        <div className="rounded-3xl border border-white/10 bg-black/28 p-4 backdrop-blur-md">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-brand-primary">
            OVI intelligence
          </p>
          <p className="mt-3 text-sm font-black uppercase tracking-tight text-white">{recommendation.protocol}</p>
          <div className="mt-4 grid gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-text-secondary">
            <p>Required products · {recommendation.requiredProducts.join(" · ")}</p>
            <p>Dilution · {recommendation.dilution}</p>
            <p>Safety · {recommendation.safety}</p>
            <p>Environmental · {recommendation.environmental}</p>
            <p>Cross-sell · {recommendation.crossSell}</p>
          </div>
        </div>
      </section>

      <section className="pointer-events-auto absolute right-6 top-[28rem] hidden w-full max-w-sm xl:block">
        <div className="rounded-3xl border border-white/10 bg-black/30 p-4 backdrop-blur-md">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-brand-primary">
                Interactive comparison
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-text-secondary">
                Differences illuminate instead of forming tables.
              </p>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/70">
              Side by side
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {relatedProducts.map((product) => (
              <button
                key={product.id}
                type="button"
                onClick={() => onCompareProductIdChange(product.id)}
                className={cn(
                  "rounded-full border px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary",
                  comparisonProduct.id === product.id
                    ? "border-brand-primary bg-brand-primary/15 text-white"
                    : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10",
                )}
              >
                {product.name}
              </button>
            ))}
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {[activeProduct, comparisonProduct].map((product) => (
              <div key={product.id} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-text-muted">{product.category}</p>
                <p className="mt-2 text-sm font-black uppercase tracking-tight text-white">{product.name}</p>
                <div className="mt-3 space-y-2">
                  {product.capabilities.map((capability) => (
                    <div key={capability.label}>
                      <div className="mb-1 flex items-center justify-between gap-2 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-text-secondary">
                        <span>{capability.label}</span>
                        <span className="text-white">{capability.score}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/8">
                        <div className="h-full rounded-full transition-[width] duration-300" style={{ width: `${capability.score}%`, background: product.model.primary }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
