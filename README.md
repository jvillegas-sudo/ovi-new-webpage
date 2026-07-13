# OVI Web Platform Foundation

Production-grade frontend foundation for OVI's cinematic digital platform.

## Architecture Decisions

1. **Next.js 15 + App Router**: chosen for long-term scalability, server/client boundary control, and Vercel-native deployment.
2. **TypeScript strict mode**: required to keep contracts explicit and reduce runtime defects as the codebase grows.
3. **Atomic component architecture**: atoms, molecules, and organisms enforce reusability and reduce UI drift.
4. **Token-driven design system**: color, spacing, radius, typography, animation, breakpoints, z-index, and shadows are centralized for consistency.
5. **Dark-first CSS variable theme**: enables fast visual iteration, accessible contrast tuning, and runtime theme switching.
6. **Motion abstraction layer**: GSAP + Framer Motion utilities encapsulate transitions and interaction semantics.
7. **Three.js rendering foundation**: React Three Fiber + Drei + postprocessing establish a scalable 3D pipeline with performance hooks.
8. **State isolation with Zustand**: lightweight global UI state for theme/modals/cursor without over-coupling to server concerns.
9. **Validated environment configuration**: Zod-based parsing prevents invalid runtime config reaching production.
10. **Quality gates with ESLint/Prettier/Husky/lint-staged**: codified standards, formatted output, and automated pre-commit checks.

## Folder Structure (Why Each Exists)

- `/src/app`: App Router entry points, metadata, and layout composition.
- `/src/components`: reusable UI layers using Atomic Design (atoms, molecules, organisms).
- `/src/features`: business-domain capabilities composed from shared architecture.
- `/src/hooks`: reusable React hooks for behavior concerns (e.g., intersection observers).
- `/src/providers`: application-wide orchestration (theme, smooth scroll, global runtime providers).
- `/src/services`: side-effect boundaries and API adapters.
- `/src/lib`: low-level helpers used across domains (`cn`, shared primitives).
- `/src/config`: environment and design token definitions.
- `/src/styles`: global styling layer and CSS variable theme contract.
- `/src/types`: shared TypeScript contracts.
- `/src/utils`: framework-agnostic utility helpers.
- `/src/animations`: motion presets and animation strategy utilities.
- `/src/three`: Three.js canvas, scene, effects, and performance instrumentation.
- `/src/store`: global client state slices.
- `/src/assets`: static brand assets.

## Sprint 007 — Industrial Applications Experience

### What Was Added

- A new `industrial-applications` scene module in `/src/scenes/industrial-applications`.
- Eight continuously transforming industrial environments: hospital, hotel, food processing, manufacturing, mining, oil & gas, transportation, and smart city infrastructure.
- A new story-engine scene registration so the laboratory now hands off into industrial applications before the future products reveal.
- An accessible non-WebGL fallback with the same narrative order and KPI data.

### Architecture Decisions

1. **Single continuous corridor**: the experience uses one uninterrupted spatial spine instead of page-style scene swaps, so every industry feels like a transformation of the same world.
2. **Data-driven environments**: industry content, KPI values, palettes, labels, and interaction copy live in `data/applications.ts`, making future tuning possible without rewriting scene logic.
3. **SSR-safe WebGL boundary**: the canvas stays inside a dynamic client-only wrapper (`IndustrialCanvas.tsx`) to keep Next.js rendering safe.
4. **Performance-first rendering**: the scene relies on instanced architecture meshes, shader-driven particles, adaptive DPR, and device-tier particle counts instead of heavy imported assets.
5. **Accessible interaction model**: reduced-motion users receive a full fallback experience, screen readers get scene announcements from the shared engine, and keyboard users can jump between environments from the overlay rail.
6. **Products handoff without building Products**: the scene ends with dissolving silhouettes that only prepare the transition for Sprint 008.

### Extending The Experience

- Update `INDUSTRY_ENVIRONMENTS` to add or retune industries, KPI values, hidden layers, and color systems.
- Adjust camera timing in `components/IndustrialCameraRig.tsx` when changing corridor spacing or story rhythm.
- Tune rendering budgets in `IndustrialCanvasInner.tsx` and `components/IndustrialParticleField.tsx` for new performance targets.
- Refine the accessible fallback in `IndustrialApplicationsFallback.tsx` whenever scene content changes.

## Tooling Foundation

- **ESLint**: `npm run lint`
- **Type Check**: `npm run typecheck`
- **Build**: `npm run build`
- **Prettier Check**: `npm run format`
- **Git Hooks**: Husky + lint-staged pre-commit gate

## Environment Variables

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SITE_NAME`
- `NEXT_PUBLIC_DEFAULT_THEME`

## Notes

- The foundation intentionally stops before building full page-level experiences.
- Home-page storytelling modules and route-level product narratives should be implemented in the next iteration.

## Sprint 008 — Interactive Product Ecosystem

### What Was Added

- A new `products` scene module in `/src/scenes/products`.
- Eight interactive product nodes rendered as real 3D objects instead of static cards.
- Progressive product information layers, intelligent hotspots, integrated AI guidance, animated relationships, and industry transition preparation.
- An accessible reduced-motion fallback plus dedicated architecture and developer documentation in `/docs/products-ecosystem.md`.

### Architecture Decisions

1. **Scene parity with prior sprints**: Sprint 008 follows the same Story Engine scene contract as Technology, Laboratory, and Industrial Applications so the new experience plugs into scroll, navigation, accessibility, and performance management without special-case infrastructure.
2. **Typed product graph**: all product content, industries, relationships, hotspots, AI prompts, and sustainability metrics live in `data/products.ts`, which keeps tuning work data-oriented and reduces visual logic duplication.
3. **Procedural 3D silhouettes**: the initial production-ready release uses procedural objects instead of placeholder images or PDFs, preserving rotation, zoom, exploded views, and lighting response while avoiding asset-pipeline delays.
4. **Integrated operational intelligence**: AI recommendations are embedded in the overlay as scenario-driven protocol output rather than a separate chatbot, which keeps the experience feeling native to the ecosystem.
5. **Shared search and transition logic**: the same matching model powers Intelligent Search and the Sprint 009 industry handoff so products reorganize consistently whether the user types a job or chooses an industry.
6. **Accessibility is a first-class experience**: reduced-motion users still receive the complete narrative, hotspot content, sustainability metrics, and AI guidance through semantic HTML instead of a degraded placeholder.
7. **Performance-first rendering**: dynamic imports, adaptive DPR, GPU-rendered particles, procedural meshes, and lightweight relationship lines keep the scene rich without introducing heavyweight assets.

### Extending The Experience

- Add new products, relationships, hotspots, and AI prompt variations in `src/scenes/products/data/products.ts`.
- Refine silhouettes and animation behavior inside `src/scenes/products/components/ProductsEcosystem.tsx` when final product geometry becomes available.
- Adjust camera choreography in `src/scenes/products/components/ProductsCameraRig.tsx` if the ecosystem layout or scene height changes.
- Keep `/docs/products-ecosystem.md` aligned whenever the interaction model, data contract, or extension guidance changes.
