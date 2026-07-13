"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useRegisterScene } from "@/engine/hooks/use-register-scene";
import { useStoryEngine } from "@/engine/hooks/use-story-engine";
import { useEngineStore } from "@/store/engine-store";
import {
  getProductIndex,
  getVisibleProductIds,
  PRODUCTS,
  type IndustryId,
  type InspectionMode,
} from "@/scenes/products/data/products";
import { ProductsCanvas, type RotationState } from "@/scenes/products/ProductsCanvas";
import { ProductsFallback } from "@/scenes/products/ProductsFallback";
import { ProductsOverlay } from "@/scenes/products/ProductsOverlay";
import { useProductsMouseParallax } from "@/scenes/products/hooks/useProductsMouseParallax";
import { useProductsTimeline } from "@/scenes/products/hooks/useProductsTimeline";

export function ProductsScene() {
  const engine = useStoryEngine();
  const sectionRef = useRegisterScene("products");
  const scrollRef = useProductsTimeline(sectionRef as React.RefObject<HTMLElement | null>);
  const mouseRef = useProductsMouseParallax();
  const hoverRef = useRef<string | null>(null);
  const rotationRef = useRef<RotationState>({ x: 0, y: 0 });
  const draggingRef = useRef<{ pointerId: number | null; x: number; y: number }>({
    pointerId: null,
    x: 0,
    y: 0,
  });

  const [query, setQuery] = useState("");
  const [inspectionMode, setInspectionMode] = useState<InspectionMode>("story");
  const [exploded, setExploded] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(0.45);
  const [activeProductId, setActiveProductId] = useState(PRODUCTS[0]?.id ?? "");
  const [compareProductId, setCompareProductId] = useState<string | null>(PRODUCTS[1]?.id ?? null);
  const [selectedIndustryId, setSelectedIndustryId] = useState<IndustryId | null>(null);
  const [selectedHotspot, setSelectedHotspot] = useState<{
    productId: string;
    hotspotId: string;
  } | null>(null);

  const reducedMotion = useEngineStore(
    useCallback((state) => state.animation.reducedMotion, []),
  );

  const focusedProductIds = useMemo(
    () => getVisibleProductIds(query, selectedIndustryId),
    [query, selectedIndustryId],
  );

  useEffect(() => {
    let frame = 0;

    const tick = () => {
      const nextProduct = PRODUCTS[getProductIndex(scrollRef.current)] ?? PRODUCTS[0];
      setActiveProductId((current) => (current === nextProduct.id ? current : nextProduct.id));
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [scrollRef]);

  const jumpToProduct = useCallback(
    (index: number) => {
      const section = sectionRef.current;
      if (!section) return;

      const clampedIndex = Math.max(0, Math.min(PRODUCTS.length - 1, index));
      const travel = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = (clampedIndex + 0.18) / PRODUCTS.length;
      const target = section.offsetTop + travel * progress;

      engine.scroll.scrollTo(target, {
        duration: reducedMotion ? 0 : 1.15,
        immediate: reducedMotion,
      });
    },
    [engine.scroll, reducedMotion, sectionRef],
  );

  const onPointerDown = useCallback<React.PointerEventHandler<HTMLDivElement>>((event) => {
    draggingRef.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  }, []);

  const onPointerMove = useCallback<React.PointerEventHandler<HTMLDivElement>>((event) => {
    if (draggingRef.current.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - draggingRef.current.x;
    const deltaY = event.clientY - draggingRef.current.y;
    draggingRef.current.x = event.clientX;
    draggingRef.current.y = event.clientY;

    rotationRef.current = {
      x: Math.max(-0.8, Math.min(0.8, rotationRef.current.x + deltaY * 0.0035)),
      y: rotationRef.current.y + deltaX * 0.005,
    };
  }, []);

  const stopDragging = useCallback<React.PointerEventHandler<HTMLDivElement>>((event) => {
    if (draggingRef.current.pointerId === event.pointerId) {
      draggingRef.current.pointerId = null;
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }, []);

  return (
    <section
      id="products"
      ref={sectionRef}
      data-scene="products"
      aria-label="Interactive Product Ecosystem"
      className="relative"
      style={{ height: "720vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#03060d]">
        {reducedMotion ? (
          <ProductsFallback />
        ) : (
          <>
            <ProductsCanvas
              scrollRef={scrollRef}
              mouseRef={mouseRef}
              hoverRef={hoverRef}
              rotationRef={rotationRef}
              selectedHotspotId={selectedHotspot?.hotspotId ?? null}
              viewState={{
                exploded,
                inspectionMode,
                zoomLevel,
                focusedProductIds,
                selectedIndustryId,
                activeProductId,
              }}
              onSelectHotspot={(hotspotId) => {
                if (!hotspotId) return;
                setSelectedHotspot({ productId: activeProductId, hotspotId });
              }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={stopDragging}
              onPointerLeave={stopDragging}
            />
            <ProductsOverlay
              scrollRef={scrollRef}
              hoverRef={hoverRef}
              onSelectProduct={jumpToProduct}
              query={query}
              onQueryChange={setQuery}
              inspectionMode={inspectionMode}
              onInspectionModeChange={setInspectionMode}
              exploded={exploded}
              onExplodedChange={setExploded}
              zoomLevel={zoomLevel}
              onZoomLevelChange={setZoomLevel}
              compareProductId={compareProductId}
              onCompareProductIdChange={setCompareProductId}
              selectedIndustryId={selectedIndustryId}
              onSelectedIndustryIdChange={setSelectedIndustryId}
              selectedHotspot={selectedHotspot}
              onSelectHotspot={setSelectedHotspot}
              focusedProductIds={focusedProductIds}
            />
          </>
        )}
      </div>
    </section>
  );
}
