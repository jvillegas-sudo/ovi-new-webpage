# WORK ORDER 008A — OVI Product Knowledge Engine

**Branch:** `copilot/build-advanced-ovi-website`
**Commit:** see section 28 (Commit SHA)
**Status:** Implemented

---

## 1. Strategic Purpose

Work Order 008A transforms the existing official OVI product catalog into a structured **Product Knowledge Engine** — a governed, extensible knowledge layer that serves as the reusable foundation for:

- Product Search
- Product Experience Platform
- Solution Finder
- OVI AI
- OVI OS
- CRM
- Commercial proposals
- Future e-commerce
- Future mobile applications

The goal is **architecture**, not catalog redesign. No technical information was invented.

---

## 2. Canonical Product Source Selected

**Pattern: Option B — Related knowledge layer keyed by immutable product ID.**

```
Identity layer:   src/features/products/chemical-lines-data.ts
Knowledge layer:  src/features/product-knowledge/
Resolved output:  ResolvedProduct (via resolveProduct / resolveAllProducts)
```

### Why Option B?

- `chemical-lines-data.ts` is already the canonical identity source for all 56 products (WO-023).
- It drives routing (`/products/[sectorSlug]/[productSlug]`), the Product Search index (WO-007), and all product pages.
- Creating a second independent catalog would introduce duplication and sync risk.
- A separate knowledge layer keyed by the same immutable IDs (`{sectorSlug}-{productSlug}`) allows rich field extension without modifying the identity source.
- The resolver service (`product-knowledge-resolver.ts`) merges both layers into a single `ResolvedProduct` for UI consumption.

There is one authoritative resolution path. UI components never manually merge data.

---

## 3. Repository Audit Findings

### Official Sources Inspected

| File                                           | Content Type        | Official?        | Products Covered                 | Fields Supported                                                                      |
| ---------------------------------------------- | ------------------- | ---------------- | -------------------------------- | ------------------------------------------------------------------------------------- |
| `src/features/products/chemical-lines-data.ts` | TypeScript catalog  | ✅ Yes           | All 56                           | id, slug, officialName, sector, status                                                |
| `src/data/products.json`                       | JSON (WO-023.1)     | ✅ Yes           | All 56                           | id, slug, officialName, sectorId; all with `dataCompleteness: "name-and-sector-only"` |
| `src/data/sectors.json`                        | JSON (WO-023.1)     | ✅ Yes           | 7 sectors                        | id, slug, name                                                                        |
| `src/data/product-images-manifest.json`        | JSON manifest       | ✅ Yes           | 56 entries                       | All `status: "missing"`                                                               |
| `src/knowledge/products/catalog.ts`            | TypeScript (WO-002) | ✅ Yes (partial) | ~8 products                      | Rich Spanish model; limited set                                                       |
| `src/knowledge/surfaces/catalog.ts`            | TypeScript (WO-002) | ✅ Yes           | Surfaces                         | id, nombre, sensitivity                                                               |
| `src/knowledge/equipment/catalog.ts`           | TypeScript (WO-002) | ✅ Yes           | Equipment                        | id, nombre, category                                                                  |
| `src/knowledge/` (full)                        | TypeScript (WO-002) | ✅ Yes           | Sectors, contaminants, protocols | Relational model                                                                      |
| `docs/WORK-ORDER-007-PRODUCT-SEARCH.md`        | Markdown            | ✅ Yes           | Search architecture              | —                                                                                     |

### Key Audit Conclusions

1. **All 56 products exist** in `chemical-lines-data.ts` (canonical) and `src/data/products.json`.
2. **All `shortDescription` fields are null** across both sources.
3. **All product images are officially missing** per `product-images-manifest.json`.
4. **Applications, surfaces, industries, equipment, problems** — not populated in any official source for any of the 56 products.
5. **Hotelería sector** has no assigned products; this is acknowledged in the source.
6. The `src/knowledge/products/catalog.ts` (WO-002) contains a partial set of products with a legacy Spanish naming model. It cannot be directly joined to the 56 canonical products without editorial verification. It was not used as a source to populate new fields to avoid invented claims.
7. No official technical data sheets, SDS files, or PDF documents are present in the repository.

---

## 4. Knowledge Architecture

```
src/features/product-knowledge/
├── types/
│   ├── knowledge-governance.ts     ← VerificationStatus, PublicationStatus, InformationStatus
│   ├── source-reference.ts         ← SourceReference, SourceType
│   ├── product-knowledge.ts        ← Full ProductKnowledge model + PublicProductView
│   └── index.ts
│
├── data/
│   ├── product-knowledge-data.ts   ← 56 minimal knowledge records (PRODUCT_KNOWLEDGE_REGISTRY)
│   └── taxonomies/
│       ├── industries.ts           ← 7 official sector-based industry entries
│       ├── applications.ts         ← Empty (pending official sources)
│       ├── surfaces.ts             ← 6 surface entries from existing knowledge base
│       ├── equipment.ts            ← 2 equipment entries from existing knowledge base
│       ├── problems.ts             ← Empty (pending official sources)
│       └── index.ts
│
├── repositories/
│   └── product-knowledge.repository.ts   ← All query functions
│
├── services/
│   ├── product-knowledge-resolver.ts     ← ResolvedProduct, resolveProduct, resolveAllProducts
│   └── product-knowledge-validator.ts    ← validateProductKnowledge
│
├── utils/
│   ├── resolve-public-product.ts         ← PublicProductView resolver
│   └── validate-source-reference.ts      ← Source reference validation
│
├── __tests__/
│   └── product-knowledge.test.ts         ← 59 tests
│
└── index.ts                              ← Public API barrel
```

---

## 5. Governance Statuses

### VerificationStatus

| Value                       | Meaning                                              |
| --------------------------- | ---------------------------------------------------- |
| `unverified`                | Default; no review has occurred                      |
| `source_confirmed`          | Traceable to an official repository source           |
| `technical_review_required` | Conflicting sources or needs expert review           |
| `technically_verified`      | Reviewed and confirmed by a qualified OVI technician |
| `rejected`                  | Evaluated and deemed unsupported or incorrect        |

### PublicationStatus

| Value            | Meaning                                             |
| ---------------- | --------------------------------------------------- |
| `draft`          | Internal only; excluded from public output          |
| `pending_review` | Populated but awaiting editorial/technical approval |
| `published`      | Approved for public display                         |
| `archived`       | No longer active; retained for history              |

### InformationStatus

| Value                       | Meaning                                           |
| --------------------------- | ------------------------------------------------- |
| `minimal`                   | Only identity fields populated (name, sector)     |
| `partial`                   | Some optional fields populated; record incomplete |
| `complete`                  | All required fields populated and verified        |
| `technical_review_required` | Contains data needing technical validation        |

---

## 6. Source Reference Model

Every populated knowledge field must be traceable to an official source via a `SourceReference`:

```typescript
interface SourceReference {
  sourceType: SourceType; // "catalog_file" | "technical_data_sheet" | ...
  sourceFile: string; // repository-relative path
  sourcePage: number | null;
  sourceSection: string | null;
  verificationStatus: VerificationStatus;
  internalNote: string | null; // NEVER exposed publicly
}
```

Source references are internal governance fields. They are stripped from `PublicProductView` and `ResolvedProduct`.

---

## 7. Taxonomies

### Industries (7 entries)

Maps 1:1 to the seven official OVI sectors from `chemical-lines-data.ts`:
`industrial`, `biotecnologia`, `lavanderia`, `alimentos`, `cuidado-personal`, `hoteleria`, `institucional`

### Surfaces (6 entries)

Sourced from `src/knowledge/surfaces/catalog.ts`:
`acero-inoxidable`, `aluminio`, `concreto-sellado`, `ceramica`, `pisos-sellados`, `vidrio`

Note: Surface-to-product associations require per-product official confirmation. Taxonomy entries exist; product assignments are currently empty.

### Equipment (2 entries)

Sourced from `src/knowledge/equipment/catalog.ts`:
`ovi-flota-rinse-arch`, `ovi-dose-control-cart`

### Applications, Problems

Currently empty — populated only when official sources are verified.

---

## 8. Public Product Resolver

The resolver pipeline:

```
OviProductRecord (identity)
+
ProductKnowledge (knowledge layer)
        ↓
resolvePublicProduct()   ← strips governance fields
        ↓
PublicProductView        ← safe for UI
        ↓
resolveProduct()         ← adds route + image fallback
        ↓
ResolvedProduct          ← consumed by Product Experience Platform
```

### Fallback behavior

When `publicationStatus === "draft"` (all current records):

- All optional fields are empty
- `informationStatus: "minimal"`
- `shortDescription: null`
- UI must display: `"Información oficial en proceso de publicación."`

---

## 9. Validation Rules

The validator (`validateProductKnowledge`) detects:

| Code                                 | Description                                                                                 |
| ------------------------------------ | ------------------------------------------------------------------------------------------- |
| `DUPLICATE_ID`                       | Two records share the same productId                                                        |
| `DUPLICATE_SLUG`                     | Two products in the same sector share a slug                                                |
| `MISSING_OFFICIAL_NAME`              | officialName is empty                                                                       |
| `INVALID_SECTOR_REFERENCE`           | sectorSlug not in official 7 sectors                                                        |
| `INVALID_TAXONOMY_REFERENCE`         | Reference to unknown industry, surface, equipment, or problem                               |
| `BROKEN_RELATED_PRODUCT`             | relatedProducts/complementaryProducts/alternativeProducts references a non-existent product |
| `SELF_RELATION`                      | Product references itself in any relation field                                             |
| `INVALID_DOCUMENT_PATH`              | Document has non-null but empty filePath                                                    |
| `INVALID_MEDIA_PATH`                 | Gallery entry has empty URL                                                                 |
| `PUBLICATION_WITHOUT_MINIMUM_FIELDS` | Published product missing officialName                                                      |
| `PUBLISHED_CLAIM_WITHOUT_SOURCE`     | Published product has claims but no confirmed source reference                              |
| `CONFLICTING_STATUS`                 | Published + unverified or published + technical_review_required                             |
| `DUPLICATE_ALIAS`                    | Same alias used by two different products                                                   |
| `ORPHAN_KNOWLEDGE_RECORD`            | Knowledge record has no matching identity product                                           |
| `MISSING_KNOWLEDGE_RECORD`           | Identity product has no knowledge record                                                    |

---

## 10. Search Integration

`build-product-search-document.ts` (WO-007) was updated to optionally consume verified `ProductKnowledge`:

**Extended search field inclusion (when knowledge is source_confirmed or technically_verified):**

- `aliases` → additional name variants
- `keywords` → controlled keyword set
- `customerLanguageTerms` → plain-language customer terms
- `industries`, `applications`, `surfaces`, `equipment`, `problems` → taxonomy IDs

**Ranking priority preserved from WO-007:**

1. Exact official product name (100)
2. Official name prefix (80)
3. Official name partial match (60)
4. Synonym expansion (40)
5. Sector name match (20)
6. Keyword token match (10)

Extended rankings (when knowledge is populated):

- Official alias → up to synonym priority
- Controlled knowledge keyword → keyword token priority
- Customer language term → keyword token priority
- Application, industry, surface, equipment, problem → keyword token priority

**Preserved from WO-007:** keyboard behavior, Cmd/Ctrl+K shortcut, accessibility, navigation triggers, result routes, no-results behavior, recent products.

**Only verified knowledge is included.** `draft` records never affect the search index.

---

## 11. Product Experience Platform Compatibility

The `ResolvedProduct` interface from `product-knowledge-resolver.ts` is designed to support all planned Product Experience Platform sections:

| Section                | Fields                                                             |
| ---------------------- | ------------------------------------------------------------------ |
| Hero                   | officialName, shortDescription, primaryImage                       |
| What problem it solves | problems, soils, residues, contaminationTypes                      |
| Applications           | applications, industries, surfaces, areas, processes, environments |
| Benefits               | officialBenefits, differentiators                                  |
| Presentations          | presentations                                                      |
| Documents              | documents (technical_data_sheet, safety_data_sheet, etc.)          |
| Related products       | relatedProducts, complementaryProducts, alternativeProducts        |
| Related services       | relatedServices                                                    |
| Engineering support    | (route-based)                                                      |
| OVI AI                 | resolvedProduct passed as context                                  |
| Solution Lab           | problems, industries, applications                                 |
| OVI OS                 | (route-based)                                                      |
| Final quotation CTA    | productId, officialName, sectorSlug                                |

The Product Experience Platform must consume `resolveProduct(product, sector)` — never raw `ProductKnowledge` records.

---

## 12. How to Add Verified Information

**Requirements before adding any field:**

1. Identify an official source (technical data sheet, catalog, SDS, or verified repository document).
2. Confirm the information is factually accurate and unambiguous.
3. Set `verificationStatus: "source_confirmed"` (or `"technically_verified"` after expert review).

**Steps:**

```typescript
// In product-knowledge-data.ts, find the record and update:
createMinimalKnowledge(...)  // ← Remove and replace with explicit record

{
  productId: "industrial-handsol",
  // ...existing identity fields...
  informationStatus: "partial",
  verificationStatus: "source_confirmed",
  publicationStatus: "pending_review",  // Do NOT publish until approved

  sourceReferences: [
    {
      sourceType: "technical_data_sheet",
      sourceFile: "docs/fichas-tecnicas/handsol.pdf",
      sourcePage: 1,
      sourceSection: "Descripción del producto",
      verificationStatus: "source_confirmed",
      internalNote: null,
    },
  ],

  shortDescription: "Desinfectante de manos de alto poder formulado para industria.", // from source
  // ...other verified fields
}
```

**Then run validation:**

```bash
npm test  # includes knowledge validation
npm run type-check
```

---

## 13. How to Handle Conflicting Sources

When two official sources disagree on a field value:

1. Set `verificationStatus: "technical_review_required"`.
2. Set `publicationStatus: "draft"` or `"pending_review"` — **never publish**.
3. Set `internalNotes` to describe the conflict.
4. Add source references for both conflicting sources.
5. Flag in the completion report.

The validator will detect and report `CONFLICTING_STATUS` if a `technical_review_required` record is set to `published`.

---

## 14. How to Attach Official Documents

1. Confirm the document file exists in the repository (e.g., `public/docs/fichas-tecnicas/`).
2. Add a `ProductDocument` entry:

```typescript
documents: [
  {
    documentType: "technical_data_sheet",
    title: "Ficha Técnica HANDSOL",
    language: "es",
    filePath: "/docs/fichas-tecnicas/handsol.pdf",
    verificationStatus: "source_confirmed",
  },
];
```

3. Add a source reference pointing to the same file.
4. The validator will detect empty/invalid paths. Never use placeholder paths.

---

## 15. How to Attach Official Images

1. Confirm the image file exists (check `product-images-manifest.json` status).
2. Set `primaryImage` to the verified public path:

```typescript
primaryImage: "/ovi-media/products/industrial/handsol.webp",
```

3. Add a source reference with `sourceType: "repository_document"`.
4. The resolver will use this over the identity-layer image when set.

Currently, all 56 product images have `status: "missing"` per `product-images-manifest.json`. Do not set `primaryImage` until images are officially imported via the DAM pipeline.

---

## 16. Known Data Gaps

| Gap                                    | Scope                      | Status                                                   |
| -------------------------------------- | -------------------------- | -------------------------------------------------------- |
| `shortDescription`                     | All 56 products            | `null` — no official source found                        |
| `applications`                         | All 56 products            | Empty — no official source found                         |
| `surfaces`                             | All 56 products            | Empty — product-to-surface mapping requires verification |
| `industries`                           | Populated with sector only | Subsector detail not officially verified                 |
| `equipment`                            | All 56 products            | Empty — requires per-product technical verification      |
| `problems`                             | All 56 products            | Empty — no official source found                         |
| `primaryImage`                         | All 56 products            | `null` — all images are officially missing               |
| `documents`                            | All 56 products            | No PDFs or documents present in repository               |
| `presentations`                        | All 56 products            | No presentation data in any official source              |
| `pH`, `dilution`, `compositionSummary` | All 56 products            | No technical sheets in repository                        |
| Hotelería products                     | Entire sector              | No products officially assigned                          |

---

## 17. Products Requiring Technical Review

None currently. All records are `verificationStatus: "unverified"` with `publicationStatus: "draft"`.

Records will move to `technical_review_required` when conflicting sources are found during enrichment.

---

## 18. Future Administration Approach

The model supports future administration via:

- **Stable identifiers:** `productId` is immutable and matches `chemical-lines-data.ts`.
- **Revision counter:** Increment `revision` on each authorized update.
- **Governance statuses:** Explicit pipeline: `draft` → `pending_review` → `published`.
- **Source references:** Every change requires an official source citation.
- **Timestamps:** `updatedAt` and `verifiedAt` for audit trail.
- **Validator:** Run before every publish action.

A future administration dashboard should:

1. Present one product at a time.
2. Require a source file reference before saving any field.
3. Call `validateProductKnowledge()` before allowing publication.
4. Never allow `publicationStatus: "published"` with `verificationStatus: "unverified"`.
5. Strip internal fields before sending data to client components.

---

## Appendix: Files Created / Modified

### Created

- `src/features/product-knowledge/types/knowledge-governance.ts`
- `src/features/product-knowledge/types/source-reference.ts`
- `src/features/product-knowledge/types/product-knowledge.ts`
- `src/features/product-knowledge/types/index.ts`
- `src/features/product-knowledge/data/taxonomies/industries.ts`
- `src/features/product-knowledge/data/taxonomies/applications.ts`
- `src/features/product-knowledge/data/taxonomies/surfaces.ts`
- `src/features/product-knowledge/data/taxonomies/equipment.ts`
- `src/features/product-knowledge/data/taxonomies/problems.ts`
- `src/features/product-knowledge/data/taxonomies/index.ts`
- `src/features/product-knowledge/data/product-knowledge-data.ts`
- `src/features/product-knowledge/repositories/product-knowledge.repository.ts`
- `src/features/product-knowledge/services/product-knowledge-resolver.ts`
- `src/features/product-knowledge/services/product-knowledge-validator.ts`
- `src/features/product-knowledge/utils/resolve-public-product.ts`
- `src/features/product-knowledge/utils/validate-source-reference.ts`
- `src/features/product-knowledge/index.ts`
- `src/features/product-knowledge/__tests__/product-knowledge.test.ts`
- `docs/WORK-ORDER-008A-PRODUCT-KNOWLEDGE-ENGINE.md`

### Modified

- `src/features/product-search/utils/build-product-search-document.ts` — WO-008A knowledge integration
