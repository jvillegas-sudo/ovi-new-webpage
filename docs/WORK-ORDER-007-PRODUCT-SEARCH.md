# Work Order 007 — OVI Smart Product Discovery

**Status:** Implemented  
**Branch:** `copilot/build-advanced-ovi-website`  
**Commit:** `feat(product-search): add fast intelligent product discovery`

---

## 1. Search Architecture

```
src/features/product-search/
  types/
    product-search.ts          ← Canonical types (ProductSearchDocument, SearchResult, …)
  utils/
    normalize-search-text.ts   ← Pure text normalization (NFD, lowercase, trim)
    build-product-search-document.ts ← Maps OviProductRecord → ProductSearchDocument
    search-analytics.ts        ← Custom DOM event emitter (no vendor)
  config/
    search-synonyms.ts         ← Controlled synonym map
  services/
    product-search-engine.ts   ← Pure ranking engine
  hooks/
    useProductSearch.ts        ← Search state + keyboard navigation
    useRecentProducts.ts       ← localStorage persistence
  components/
    ProductSearchTrigger.tsx   ← Open-dialog button (nav + hero variants)
    ProductSearchDialog.tsx    ← Full-screen overlay + keyboard handling
    ProductSearchInput.tsx     ← Combobox input with ARIA
    ProductSearchResults.tsx   ← Listbox of results
    ProductSearchResultCard.tsx ← Single result row
    ProductSearchEmptyState.tsx ← No-results UI
    ProductSearchInitialState.tsx ← Sectors + recent products
  __tests__/
    product-search-engine.test.ts ← 28 unit tests
  index.ts                     ← Public barrel export

src/store/product-search.store.ts  ← Zustand store (isOpen, open, close)
```

### Integration Points

| Location | Change |
|---|---|
| `src/app/layout.tsx` | Mounts `<ProductSearchDialog />` globally |
| `src/components/layout/Navbar.tsx` | Adds `<ProductSearchTrigger variant="nav" />` (desktop + mobile) |
| `src/features/home/components/HeroContent.tsx` | Adds `<ProductSearchTrigger variant="hero" />` below existing CTAs |

---

## 2. Official Data Source

**Single source of truth:** `src/features/products/chemical-lines-data.ts`  
(`OVI_SECTORS` — `OviProductRecord[]`)

The search module reads this data at import time and builds a derived
`ProductSearchDocument[]` index. No second canonical product database exists.

Product fields with `null` values (shortDescription, image, etc.) are handled
gracefully — the UI shows "Información oficial en proceso de publicación."

---

## 3. Ranking Order

| Priority | Condition | Score |
|---|---|---|
| 1 | Exact match on full normalized product name | 100 |
| 2 | Product name starts with the query term | 80 |
| 3 | Product name contains the query term | 60 |
| 4 | Term matches via configured synonym | ≤40 (capped) |
| 5 | Term matches normalized sector name | 20 |
| 6 | Term matches a derived keyword token | 10 |

Multi-word queries: scores are summed per term. A **1.5× coverage bonus** is
applied when a product matches ALL query terms, ensuring comprehensive matches
rank above partial matches.

Duplicate prevention: each product ID appears at most once (highest composite score wins).

---

## 4. Synonym Configuration

File: `src/features/product-search/config/search-synonyms.ts`

### Structure

```typescript
export const SEARCH_SYNONYMS: Readonly<Record<string, readonly string[]>> = {
  // key: normalized user-typed term
  // value: normalized official terms to also search for
  desengrasante: ["degreaser"],
  hotel: ["hoteleria"],
  // …
};
```

### Rules for editing

1. All keys and values must be **normalized** (lowercase, no accents, no extra spaces).
2. Only add an entry when the mapping is a **safe linguistic alias** — not an invented product claim.
3. Do not map a synonym to a product unless that product's name or sector genuinely relates.
4. Add a comment explaining the justification for each entry.
5. Run `npm run type-check` after editing.

### How synonyms work at query time

When the user types "desengrasante":
1. The engine normalizes → `"desengrasante"`.
2. `expandTerm("desengrasante")` returns `["desengrasante", "degreaser"]`.
3. Both terms are matched against every product's `normalizedName`, `normalizedSector`, and `keywords`.
4. A synonym match is **capped at score 40** so it never outranks a direct name match.

---

## 5. Adding a Searchable Official Field

If a product gains a new official data field (e.g., `applications`), update
`buildProductSearchDocument` in `build-product-search-document.ts`:

```typescript
// Inside buildProductSearchDocument:
const appKeywords = product.applications.map(normalizeSearchText);
const keywords = Array.from(new Set([normalizedSector, ...nameTokens, ...appKeywords]));
```

Then add the field to the `ProductSearchDocument` type in `types/product-search.ts` and
add the corresponding match logic in `product-search-engine.ts`.

---

## 6. Adding a Validated Synonym

```typescript
// In search-synonyms.ts
export const SEARCH_SYNONYMS = {
  // existing entries …

  // User may type "lavado de piso" to find floor cleaning products
  // Sector "Institucional y Mantenimiento" covers floor products officially
  "lavado de piso": ["institucional y mantenimiento"],
};
```

---

## 7. Future Migration Path

The `product-search-engine.ts` module exposes a simple interface:

```typescript
searchProducts(documents: ProductSearchDocument[], query: string, limit?: number): SearchResult[]
```

To replace local search with a server-side or indexed service (e.g., Algolia, Typesense, OpenSearch):

1. Create a new service file (e.g., `services/algolia-search-engine.ts`) that
   implements the same `SearchResult[]` return type.
2. Update `useProductSearch.ts` to call the new service instead of `searchProducts`.
3. The `ProductSearchDocument` type and all UI components remain unchanged.
4. The local engine can be kept as a fallback.

For OVI AI integration: the same `useProductSearch` hook can emit an event
(`product_search_submitted`) that the OVI AI engine listens for to provide
contextual suggestions.

---

## 8. Known Data Gaps

| Gap | Location | Impact |
|---|---|---|
| All 56 products have `shortDescription: null` | `chemical-lines-data.ts` | Result cards show "Información oficial en proceso de publicación." |
| All product images are placeholder paths (`/ovi-media/products/…`) | `chemical-lines-data.ts` | Result cards show the `ImageOff` fallback icon |
| Hotelería sector has 0 products (`contentGap` flag) | `chemical-lines-data.ts` | Sector chip shown in InitialState but no products appear in search results |
| No `applications`, `surfaces`, `industries` data yet | All products | Cannot search by surface type or contamination yet |

These gaps are properly handled — the UI degrades gracefully. No data is invented.

---

## 9. Confirmation

- ✅ No product information was invented.
- ✅ All product content comes from `chemical-lines-data.ts`.
- ✅ Hero, Three.js, Navigation (structure), OVI AI, OVI OS, Engineering,
  Solution Lab, and all existing approved functionality were not redesigned.
- ✅ No merge was performed.
