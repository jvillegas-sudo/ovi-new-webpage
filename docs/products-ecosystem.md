# Sprint 008 — Interactive Product Ecosystem

## Architecture Documentation

### 1. Scene module isolation

The entire experience lives in `src/scenes/products/` and follows the same scene contract used by Technology, Laboratory, and Industrial Applications. This keeps the Story Engine integration predictable: one section registers with `useRegisterScene("products")`, owns a sticky viewport, and exposes a reduced-motion fallback instead of forcing every feature into the page entrypoint.

### 2. Data-driven product graph

All product content lives in `src/scenes/products/data/products.ts`. Products, hotspots, AI prompts, relationships, industries, and sustainability metrics are defined as typed data so the visual layer can stay generic. This makes Sprint 008 tunable without rewriting rendering logic and prepares Sprint 009 to consume the same product-to-industry relationships.

### 3. SSR-safe WebGL boundary

`ProductsCanvas.tsx` uses `next/dynamic` with `ssr: false` so the App Router never tries to render Three.js on the server. This mirrors the existing repository pattern and avoids hydration mismatches while keeping the scene itself fully client-driven.

### 4. Procedural 3D products instead of static cards

The scene uses procedural Three.js silhouettes (`bottle`, `canister`, `module`, `tank`, etc.) so every product is a real object that can rotate, zoom, explode, and react to lighting without waiting for external asset pipelines. This is a production-ready compromise that preserves interactivity, keeps bundle risk controlled, and leaves room for future GLTF swaps when final industrial models are available.

### 5. Progressive information layering

The overlay derives the active information layer from local scene progress instead of dumping all product information at once. This keeps the storytelling rhythm aligned with the brief: name and purpose appear first, then technology, industries, technical detail, safety, media, related products, and AI recommendations.

### 6. Integrated intelligence instead of a chatbot

The AI layer is embedded as an operational recommendation panel fed by scenario prompts and product-specific playbooks. The visitor types a cleaning job and the ecosystem responds with protocol, required products, dilution, safety, environmental impact, and cross-sell guidance without opening a separate chat interface.

### 7. Search and transition share the same relationship model

Intelligent Search and industry transition both reuse the same matching system. Search scores products by prompt keywords and industries; the industry selector filters the graph even further so unrelated products dissolve while relevant ones remain active, which cleanly prepares Sprint 009 without building the industries destination itself.

### 8. Accessibility-first fallback

Reduced-motion users receive `ProductsFallback.tsx`, which exposes the same product categories, hotspots, AI recommendations, and sustainability data through semantic HTML. This preserves the story and product detail for keyboard users, screen readers, and devices where WebGL should not be required.

### 9. Performance by default

The scene uses adaptive DPR via `PerformanceMonitor`, dynamic importing, GPU-rendered particle points, reusable procedural meshes, and lightweight line geometry for relationships. These choices keep the experience visually rich without introducing heavy assets or unnecessary runtime work.

## Developer Documentation

### Key files

- `src/scenes/products/ProductsScene.tsx` — top-level scene orchestration and interaction state.
- `src/scenes/products/ProductsCanvas.tsx` — client-only canvas wrapper.
- `src/scenes/products/ProductsCanvasInner.tsx` — canvas, lighting, environment map, and performance monitor.
- `src/scenes/products/components/ProductsCameraRig.tsx` — scroll-driven camera motion and industry-focus camera override.
- `src/scenes/products/components/ProductsEcosystem.tsx` — procedural product meshes, animated connections, particles, hotspots, and inspection states.
- `src/scenes/products/ProductsOverlay.tsx` — progressive information, controls, comparison, AI, and transition UI.
- `src/scenes/products/data/products.ts` — source of truth for product metadata and matching helpers.
- `src/scenes/products/ProductsFallback.tsx` — alternative HTML experience.

### How to extend products

1. Add or edit entries in `PRODUCTS`.
2. Keep `relationships` pointing at valid product ids so the connection graph stays intact.
3. Define hotspot coordinates relative to the product origin so the floating hotspot panel remains correct.
4. Add AI prompt variations in `aiPrompts` when new search scenarios matter.

### How to tune the 3D experience

- Update product anchors in `data/products.ts` to reposition the ecosystem.
- Adjust camera pacing in `ProductsCameraRig.tsx` when scene height or rhythm changes.
- Tune particle budgets in `ProductsCanvasInner.tsx` if device-tier targets need to shift.
- Add or refine silhouettes inside `ProductsEcosystem.tsx` when more product-specific geometry is available.

### How to validate changes

Run the repository quality gates from the root:

- `npm run lint`
- `npm run typecheck`
- `npm run build`
