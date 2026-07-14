"use client";

import dynamic from "next/dynamic";

import type { ProductsMousePos } from "@/scenes/products/hooks/useProductsMouseParallax";
import type { IndustryId, InspectionMode } from "@/scenes/products/data/products";

export type ProductViewState = {
  exploded: boolean;
  inspectionMode: InspectionMode;
  zoomLevel: number;
  focusedProductIds: string[];
  selectedIndustryId: IndustryId | null;
  activeProductId: string;
};

export type RotationState = { x: number; y: number };

export type ProductsCanvasProps = {
  scrollRef: React.MutableRefObject<number>;
  mouseRef: React.MutableRefObject<ProductsMousePos>;
  hoverRef: React.MutableRefObject<string | null>;
  rotationRef: React.MutableRefObject<RotationState>;
  selectedHotspotId: string | null;
  viewState: ProductViewState;
  onSelectHotspot: (hotspotId: string | null) => void;
  onPointerDown: React.PointerEventHandler<HTMLDivElement>;
  onPointerMove: React.PointerEventHandler<HTMLDivElement>;
  onPointerUp: React.PointerEventHandler<HTMLDivElement>;
  onPointerLeave: React.PointerEventHandler<HTMLDivElement>;
};

const Inner = dynamic(
  () => import("@/scenes/products/ProductsCanvasInner").then((module) => module.ProductsCanvasInner),
  { ssr: false },
);

export function ProductsCanvas(props: ProductsCanvasProps) {
  const {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerLeave,
    ...innerProps
  } = props;

  return (
    <div
      className="absolute inset-0 touch-none"
      aria-hidden
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerLeave}
    >
      <Inner {...innerProps} />
    </div>
  );
}
