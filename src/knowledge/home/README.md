# OVI Knowledge Home Module

**Work Order 004 — Home Intelligence Integration**

---

## Overview

`src/knowledge/home/` is the dedicated Knowledge Base module for all home page content.
It serves as the single source of truth for every text, metric, scene, and section
displayed on the OVI homepage.

All content that was previously hardcoded in `src/app/page.tsx` and
`src/features/home/HomeCinematicJourney.tsx` has been migrated here.

---

## Architecture

```
src/knowledge/home/
├── types.ts              # HomeLocale, HomeCmsEntity base interface
├── hero.ts               # Hero badge, title, subtitle, story lines
├── identity-metrics.ts   # Four identity stat cards (360°, IA+OVI OS, …)
├── engineering-pillars.ts # Engineering section pillars + About section
├── sustainability.ts     # Sustainability impact items + section heading
├── success-cases.ts      # Case study cards
├── ovi-os.ts             # OVI OS section content + feature bullets
├── ovi-ai.ts             # OVI AI section content + preview copy
├── contact.ts            # Contact CTA section
├── cinematic-scenes.ts   # Five-act cinematic scene titles and taglines
├── sector-display.ts     # Icon/color mapping for KB sectors
├── sections.ts           # Sectors, Services, Products section metadata
├── queries.ts            # Query layer: merges KB data with display config
├── index.ts              # Main barrel export
└── README.md             # This file
```

---

## i18n Architecture

```typescript
type HomeLocale = "es" | "en";

// Active locale in page.tsx:
const locale: HomeLocale = "es";

// Content access pattern:
const heroContent = homeHero.locales[locale];
```

- **Spanish (`es`)**: Fully active, all content populated.
- **English (`en`)**: Scaffolded. All strings are placeholder translations.
  To activate: change `const locale: HomeLocale = "es"` to `"en"` in `page.tsx`.
  A UI selector can be wired without touching any content files.

---

## CMS-Ready Interface

Every content entity implements `HomeCmsEntity`:

```typescript
interface HomeCmsEntity {
  slug: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  images: string[];
  icon: string;
  order: number;
  status: "active" | "draft" | "archived";
  featured: boolean;
}
```

**Future CMS integration**: Replace static `export const homeHero = { ... }` with
an async `fetchHomeHero(): Promise<HomeHeroContent>` backed by a CMS API, behind
the same TypeScript interface. No component changes required.

---

## Query Layer

`queries.ts` is the adapter between the global KB and home-specific display:

| Function           | Source                                     | Output                  |
|--------------------|--------------------------------------------|-------------------------|
| `getHomeSectors()` | `officialSectors` + `sectorDisplayConfigs` | `HomeDisplaySector[]`   |
| `getHomeServices()` | `officialServices` (featured IDs)          | `HomeDisplayService[]`  |
| `getHomeProducts()` | `officialProducts` (featured IDs)          | `HomeDisplayProduct[]`  |

Results are module-level memoized — no recomputation on re-renders.

---

## Reusable Components

Located in `src/features/home/components/`:

| Component             | Consumes                                      |
|-----------------------|-----------------------------------------------|
| `CompanyMetrics`      | `identityMetrics` from KB home                |
| `IndustryCards`       | `getHomeSectors()` query                      |
| `ServiceHighlights`   | `homeServicesSection` bullets from KB home    |
| `FeaturedProducts`    | `homeProductsSection` bullets from KB home    |
| `FeaturedSolutions`   | `successCases` from KB home                   |
| `KnowledgeHighlights` | `homeEngineering` from KB home                |
| `HeroContent`         | `HeroLocaleContent` (passed as prop)          |

---

## How to Update Content

All content changes must be made **only in `src/knowledge/home/`**.
No React component files need to be modified.

**Example — Change the hero title:**
```typescript
// src/knowledge/home/hero.ts
locales: {
  es: {
    title: "NEW TITLE HERE",  // ← Edit here
    ...
  }
}
```

**Example — Add a success case:**
```typescript
// src/knowledge/home/success-cases.ts
export const successCases: HomeSuccessCase[] = [
  ...
  {
    slug: "caso-nuevo",
    // ... add all HomeCmsEntity fields
    locales: {
      es: { title: "Caso 04 — ...", detail: "..." },
      en: { title: "Case 04 — ...", detail: "..." },
    },
  },
];
```

---

## Validation Checklist

- [x] No text hardcoded in React components
- [x] Home maintains identical visual design (layout/animations untouched)
- [x] All data flows from Knowledge Base (`src/knowledge/home/`)
- [x] i18n ready: `es` active, `en` scaffolded
- [x] CMS interface (`HomeCmsEntity`) on every content entity
- [x] Cinematic scenes moved from `HomeCinematicJourney.tsx` to KB

---

## Version

| Field    | Value                         |
|----------|-------------------------------|
| Version  | `1.0.0`                       |
| Phase    | `FASE 1 — Work Order 004`     |
| Status   | `ACTIVE`                      |
