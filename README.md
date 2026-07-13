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
