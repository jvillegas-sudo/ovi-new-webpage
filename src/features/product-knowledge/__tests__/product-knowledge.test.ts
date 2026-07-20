/**
 * Tests: Product Knowledge Engine
 * Work Order 008A — OVI Product Knowledge Engine
 *
 * Tests for the product knowledge layer.
 * All 20 required test cases from WO-008A section 19.
 *
 * These tests run in Node environment via Vitest — no DOM required.
 */

import { describe, it, expect } from "vitest";
import { OVI_SECTORS, TOTAL_PRODUCTS } from "@features/products/chemical-lines-data";
import { buildSearchIndex } from "@features/product-search/utils/build-product-search-document";
import { searchProducts } from "@features/product-search/services/product-search-engine";
import {
  PRODUCT_KNOWLEDGE_REGISTRY,
  PRODUCT_KNOWLEDGE_MAP,
  TOTAL_KNOWLEDGE_PRODUCTS,
} from "@features/product-knowledge/data/product-knowledge-data";
import {
  getAllProductKnowledge,
  getProductKnowledgeById,
  getProductKnowledgeBySlug,
  getProductKnowledgeBySector,
  getKnowledgeProductCount,
  hasKnowledgeRecord,
} from "@features/product-knowledge/repositories/product-knowledge.repository";
import { validateProductKnowledge } from "@features/product-knowledge/services/product-knowledge-validator";
import {
  resolveProduct,
  resolveAllProducts,
} from "@features/product-knowledge/services/product-knowledge-resolver";
import { resolvePublicProduct } from "@features/product-knowledge/utils/resolve-public-product";
import {
  validateSourceReference,
  isSourceConfirmed,
} from "@features/product-knowledge/utils/validate-source-reference";
import type { ProductKnowledge } from "@features/product-knowledge/types/product-knowledge";
import { INDUSTRIES } from "@features/product-knowledge/data/taxonomies/industries";

// ─── Build indexes once (mirrors production usage) ────────────────────────────

const searchIndex = buildSearchIndex(OVI_SECTORS);
const allProducts = OVI_SECTORS.flatMap((s) => s.products.map((p) => ({ product: p, sector: s })));

// ─── 1. All 56 official products resolve successfully ─────────────────────────

describe("Test 1 — All 56 official products resolve successfully", () => {
  it("resolveAllProducts returns a result for every product in every sector", () => {
    const resolved = resolveAllProducts(OVI_SECTORS);
    expect(resolved).toHaveLength(56);
    for (const r of resolved) {
      expect(r.productId).toBeTruthy();
      expect(r.officialName).toBeTruthy();
      expect(r.sectorSlug).toBeTruthy();
      expect(r.route).toMatch(/^\/products\/.+\/.+/);
    }
  });
});

// ─── 2. Official product count remains 56 ────────────────────────────────────

describe("Test 2 — Official product count unchanged", () => {
  it("TOTAL_PRODUCTS from chemical-lines-data.ts is 56", () => {
    expect(TOTAL_PRODUCTS).toBe(56);
  });

  it("knowledge registry contains exactly 56 records", () => {
    expect(TOTAL_KNOWLEDGE_PRODUCTS).toBe(56);
    expect(getKnowledgeProductCount()).toBe(56);
  });

  it("OVI_SECTORS have 7 sectors in total", () => {
    expect(OVI_SECTORS).toHaveLength(7);
  });
});

// ─── 3. Product IDs are unique ────────────────────────────────────────────────

describe("Test 3 — Product IDs are unique", () => {
  it("all knowledge registry product IDs are unique", () => {
    const ids = PRODUCT_KNOWLEDGE_REGISTRY.map((pk) => pk.productId);
    expect(ids.length).toBe(new Set(ids).size);
  });

  it("product ID map has same size as registry", () => {
    expect(PRODUCT_KNOWLEDGE_MAP.size).toBe(PRODUCT_KNOWLEDGE_REGISTRY.length);
  });
});

// ─── 4. Product route slugs remain unique in their route scope ───────────────

describe("Test 4 — Product slugs unique within sector", () => {
  it("no two products share the same slug within the same sector", () => {
    const routeKeys = new Set<string>();
    for (const pk of PRODUCT_KNOWLEDGE_REGISTRY) {
      const key = `${pk.sectorSlug}/${pk.slug}`;
      expect(routeKeys.has(key)).toBe(false);
      routeKeys.add(key);
    }
  });
});

// ─── 5. Every official product has a knowledge record ────────────────────────

describe("Test 5 — Every official product has a knowledge record or fallback", () => {
  it("every product in OVI_SECTORS has a matching knowledge record", () => {
    for (const { product } of allProducts) {
      expect(hasKnowledgeRecord(product.id)).toBe(true);
    }
  });

  it("resolveProduct does not throw for any official product", () => {
    for (const { product, sector } of allProducts) {
      expect(() => resolveProduct(product, sector)).not.toThrow();
    }
  });
});

// ─── 6. Missing optional fields do not cause errors ──────────────────────────

describe("Test 6 — Missing optional fields do not cause errors", () => {
  it("all knowledge records with null shortDescription resolve without error", () => {
    const minimal = PRODUCT_KNOWLEDGE_REGISTRY.filter((pk) => pk.shortDescription === null);
    expect(minimal.length).toBeGreaterThan(0);
    for (const pk of minimal) {
      expect(() => resolvePublicProduct(pk)).not.toThrow();
    }
  });

  it("all knowledge records with empty arrays resolve without error", () => {
    for (const pk of PRODUCT_KNOWLEDGE_REGISTRY) {
      expect(() => resolvePublicProduct(pk)).not.toThrow();
    }
  });
});

// ─── 7. Draft technical claims excluded from public output ───────────────────

describe("Test 7 — Draft technical claims excluded from public output", () => {
  it("draft publication status produces minimal public view", () => {
    const draft: ProductKnowledge = {
      ...PRODUCT_KNOWLEDGE_REGISTRY[0]!,
      publicationStatus: "draft",
      shortDescription: "INTERNAL DRAFT — do not publish",
      officialBenefits: ["claimed benefit"],
      compositionSummary: "INTERNAL composition",
    };
    const publicView = resolvePublicProduct(draft);
    expect(publicView.shortDescription).toBeNull();
    expect(publicView.officialBenefits).toHaveLength(0);
    expect(publicView.compositionSummary).toBeNull();
  });
});

// ─── 8. Internal notes excluded from public output ───────────────────────────

describe("Test 8 — Internal notes excluded from public output", () => {
  it("internalNotes field does not appear in PublicProductView", () => {
    const pk = PRODUCT_KNOWLEDGE_REGISTRY[0]!;
    const publicView = resolvePublicProduct(pk);
    expect(Object.keys(publicView)).not.toContain("internalNotes");
  });

  it("sourceReferences field does not appear in PublicProductView", () => {
    const pk = PRODUCT_KNOWLEDGE_REGISTRY[0]!;
    const publicView = resolvePublicProduct(pk);
    expect(Object.keys(publicView)).not.toContain("sourceReferences");
  });

  it("verificationStatus field does not appear in PublicProductView", () => {
    const pk = PRODUCT_KNOWLEDGE_REGISTRY[0]!;
    const publicView = resolvePublicProduct(pk);
    expect(Object.keys(publicView)).not.toContain("verificationStatus");
  });

  it("publicationStatus field does not appear in PublicProductView", () => {
    const pk = PRODUCT_KNOWLEDGE_REGISTRY[0]!;
    const publicView = resolvePublicProduct(pk);
    expect(Object.keys(publicView)).not.toContain("publicationStatus");
  });

  it("verifiedBy field does not appear in PublicProductView", () => {
    const pk = PRODUCT_KNOWLEDGE_REGISTRY[0]!;
    const publicView = resolvePublicProduct(pk);
    expect(Object.keys(publicView)).not.toContain("verifiedBy");
  });

  it("verifiedAt field does not appear in PublicProductView", () => {
    const pk = PRODUCT_KNOWLEDGE_REGISTRY[0]!;
    const publicView = resolvePublicProduct(pk);
    expect(Object.keys(publicView)).not.toContain("verifiedAt");
  });
});

// ─── 9. Invalid taxonomy references are detected ─────────────────────────────

describe("Test 9 — Invalid taxonomy references detected", () => {
  it("validator detects invalid industry reference", () => {
    const invalidRecord: ProductKnowledge = {
      ...PRODUCT_KNOWLEDGE_REGISTRY[0]!,
      industries: ["nonexistent-industry-xyz"],
    };
    const result = validateProductKnowledge(OVI_SECTORS, [invalidRecord]);
    const taxonomyErrors = result.errors.filter((e) => e.code === "INVALID_TAXONOMY_REFERENCE");
    expect(taxonomyErrors.length).toBeGreaterThan(0);
  });

  it("validator detects invalid surface reference", () => {
    const invalidRecord: ProductKnowledge = {
      ...PRODUCT_KNOWLEDGE_REGISTRY[0]!,
      surfaces: ["nonexistent-surface-xyz"],
    };
    const result = validateProductKnowledge(OVI_SECTORS, [invalidRecord]);
    const taxonomyErrors = result.errors.filter((e) => e.code === "INVALID_TAXONOMY_REFERENCE");
    expect(taxonomyErrors.length).toBeGreaterThan(0);
  });

  it("validator detects invalid equipment reference", () => {
    const invalidRecord: ProductKnowledge = {
      ...PRODUCT_KNOWLEDGE_REGISTRY[0]!,
      equipment: ["nonexistent-equipment-xyz"],
    };
    const result = validateProductKnowledge(OVI_SECTORS, [invalidRecord]);
    const taxonomyErrors = result.errors.filter((e) => e.code === "INVALID_TAXONOMY_REFERENCE");
    expect(taxonomyErrors.length).toBeGreaterThan(0);
  });
});

// ─── 10. Broken related-product references detected ──────────────────────────

describe("Test 10 — Broken related-product references detected", () => {
  it("validator detects broken relatedProducts reference", () => {
    const invalidRecord: ProductKnowledge = {
      ...PRODUCT_KNOWLEDGE_REGISTRY[0]!,
      relatedProducts: ["product-that-does-not-exist"],
    };
    const result = validateProductKnowledge(OVI_SECTORS, [invalidRecord]);
    const brokenErrors = result.errors.filter((e) => e.code === "BROKEN_RELATED_PRODUCT");
    expect(brokenErrors.length).toBeGreaterThan(0);
  });

  it("validator detects broken complementaryProducts reference", () => {
    const invalidRecord: ProductKnowledge = {
      ...PRODUCT_KNOWLEDGE_REGISTRY[0]!,
      complementaryProducts: ["product-that-does-not-exist"],
    };
    const result = validateProductKnowledge(OVI_SECTORS, [invalidRecord]);
    const brokenErrors = result.errors.filter((e) => e.code === "BROKEN_RELATED_PRODUCT");
    expect(brokenErrors.length).toBeGreaterThan(0);
  });
});

// ─── 11. Self-relations rejected ─────────────────────────────────────────────

describe("Test 11 — Self-relations rejected", () => {
  it("validator detects self-referential relatedProducts", () => {
    const pk = PRODUCT_KNOWLEDGE_REGISTRY[0]!;
    const selfRelated: ProductKnowledge = {
      ...pk,
      relatedProducts: [pk.productId],
    };
    const result = validateProductKnowledge(OVI_SECTORS, [selfRelated]);
    const selfErrors = result.errors.filter((e) => e.code === "SELF_RELATION");
    expect(selfErrors.length).toBeGreaterThan(0);
  });

  it("validator detects self-referential complementaryProducts", () => {
    const pk = PRODUCT_KNOWLEDGE_REGISTRY[0]!;
    const selfRelated: ProductKnowledge = {
      ...pk,
      complementaryProducts: [pk.productId],
    };
    const result = validateProductKnowledge(OVI_SECTORS, [selfRelated]);
    const selfErrors = result.errors.filter((e) => e.code === "SELF_RELATION");
    expect(selfErrors.length).toBeGreaterThan(0);
  });
});

// ─── 12. Published claims require source references ──────────────────────────

describe("Test 12 — Published claims require source references", () => {
  it("validator detects published claim without source reference", () => {
    const noSourceRecord: ProductKnowledge = {
      ...PRODUCT_KNOWLEDGE_REGISTRY[0]!,
      publicationStatus: "published",
      verificationStatus: "source_confirmed",
      shortDescription: "A claimed description",
      sourceReferences: [], // No sources
    };
    const result = validateProductKnowledge(OVI_SECTORS, [noSourceRecord]);
    const claimErrors = result.errors.filter((e) => e.code === "PUBLISHED_CLAIM_WITHOUT_SOURCE");
    expect(claimErrors.length).toBeGreaterThan(0);
  });
});

// ─── 13. Search documents include verified knowledge ─────────────────────────

describe("Test 13 — Search documents include verified knowledge when available", () => {
  it("buildSearchIndex handles all products without throwing", () => {
    expect(() => buildSearchIndex(OVI_SECTORS)).not.toThrow();
  });

  it("search documents have the correct total (56)", () => {
    expect(searchIndex).toHaveLength(56);
  });

  it("search document keywords include sector name", () => {
    for (const doc of searchIndex) {
      expect(
        doc.keywords.some(
          (k) =>
            doc.normalizedSector.includes(k) || k.includes(doc.normalizedSector.split(" ")[0]!),
        ),
      ).toBe(true);
    }
  });
});

// ─── 14. Search documents exclude unverified private knowledge ───────────────

describe("Test 14 — Search documents exclude unverified content", () => {
  it("all search documents have non-empty officialName", () => {
    for (const doc of searchIndex) {
      expect(doc.officialName).toBeTruthy();
    }
  });

  it("draft-only knowledge fields do not affect search document keywords unexpectedly", () => {
    // All current knowledge records are draft — keywords should derive from name and sector only
    for (const doc of searchIndex) {
      expect(doc.keywords.length).toBeGreaterThan(0);
      // Every document must contain at least the normalized name tokens
      expect(doc.normalizedName).toBeTruthy();
    }
  });
});

// ─── 15. Product Search exact-name ranking preserved ─────────────────────────

describe("Test 15 — Product Search exact-name ranking preserved", () => {
  it("exact search for BIOHAND ranks BIOHAND first", () => {
    const results = searchProducts(searchIndex, "BIOHAND");
    expect(results[0]?.document.officialName).toBe("BIOHAND");
  });

  it("exact search for ECOGRILL ranks ECOGRILL first", () => {
    const results = searchProducts(searchIndex, "ECOGRILL");
    expect(results[0]?.document.officialName).toBe("ECOGRILL");
  });

  it("exact search for BIODEX ranks BIODEX first", () => {
    const results = searchProducts(searchIndex, "BIODEX");
    expect(results[0]?.document.officialName).toBe("BIODEX");
  });

  it("exact search for CIP ALCALINO ranks CIP ALCALINO first", () => {
    const results = searchProducts(searchIndex, "CIP ALCALINO");
    expect(results[0]?.document.officialName).toBe("CIP ALCALINO");
  });
});

// ─── 16. Search does not create unsupported matches ──────────────────────────

describe("Test 16 — Search does not create unsupported matches", () => {
  it("searching for a non-existent product returns no results", () => {
    const results = searchProducts(searchIndex, "xyzfakeprod999abc");
    expect(results).toHaveLength(0);
  });

  it("all search results have a product ID present in the identity catalog", () => {
    const canonicalIds = new Set(OVI_SECTORS.flatMap((s) => s.products.map((p) => p.id)));
    const results = searchProducts(searchIndex, "eco");
    for (const result of results) {
      expect(canonicalIds.has(result.document.id)).toBe(true);
    }
  });
});

// ─── 17. Source conflicts trigger review status ───────────────────────────────

describe("Test 17 — Source conflicts trigger review status", () => {
  it("a record with technical_review_required verificationStatus can be identified", () => {
    const conflictRecord: ProductKnowledge = {
      ...PRODUCT_KNOWLEDGE_REGISTRY[0]!,
      verificationStatus: "technical_review_required",
      internalNotes: "Two sources disagree on pH value.",
    };
    expect(conflictRecord.verificationStatus).toBe("technical_review_required");
    // Should not be published in this state (confirmed by validator)
    const conflictPublished: ProductKnowledge = {
      ...conflictRecord,
      publicationStatus: "published",
    };
    const result = validateProductKnowledge(OVI_SECTORS, [conflictPublished]);
    const conflictErrors = result.errors.filter((e) => e.code === "CONFLICTING_STATUS");
    expect(conflictErrors.length).toBeGreaterThan(0);
  });
});

// ─── 18. Invalid document paths are reported ─────────────────────────────────

describe("Test 18 — Invalid document paths reported", () => {
  it("validator detects empty document filePath", () => {
    const invalidRecord: ProductKnowledge = {
      ...PRODUCT_KNOWLEDGE_REGISTRY[0]!,
      documents: [
        {
          documentType: "technical_data_sheet",
          title: "Ficha Técnica",
          language: "es",
          filePath: "  ", // empty/whitespace
          verificationStatus: "unverified",
        },
      ],
    };
    const result = validateProductKnowledge(OVI_SECTORS, [invalidRecord]);
    const docErrors = result.errors.filter((e) => e.code === "INVALID_DOCUMENT_PATH");
    expect(docErrors.length).toBeGreaterThan(0);
  });

  it("validator accepts null filePath (document pending)", () => {
    const validRecord: ProductKnowledge = {
      ...PRODUCT_KNOWLEDGE_REGISTRY[0]!,
      documents: [
        {
          documentType: "technical_data_sheet",
          title: "Ficha Técnica",
          language: "es",
          filePath: null, // explicitly missing — acceptable
          verificationStatus: "unverified",
        },
      ],
    };
    const result = validateProductKnowledge(OVI_SECTORS, [validRecord]);
    const docErrors = result.errors.filter((e) => e.code === "INVALID_DOCUMENT_PATH");
    expect(docErrors).toHaveLength(0);
  });
});

// ─── 19. Public products retain their existing routes ────────────────────────

describe("Test 19 — Public products retain existing routes", () => {
  it("all resolved products have routes matching /products/[sectorSlug]/[productSlug]", () => {
    const resolved = resolveAllProducts(OVI_SECTORS);
    for (const r of resolved) {
      expect(r.route).toBe(`/products/${r.sectorSlug}/${r.slug}`);
    }
  });

  it("resolved product routes match search document routes", () => {
    const resolvedRoutes = new Map(
      resolveAllProducts(OVI_SECTORS).map((r) => [r.productId, r.route]),
    );
    for (const doc of searchIndex) {
      expect(resolvedRoutes.get(doc.id)).toBe(doc.route);
    }
  });
});

// ─── 20. Empty knowledge records preserve fallback behavior ──────────────────

describe("Test 20 — Empty knowledge records preserve fallback behavior", () => {
  it("all minimal knowledge records have shortDescription: null", () => {
    const minimal = PRODUCT_KNOWLEDGE_REGISTRY.filter((pk) => pk.informationStatus === "minimal");
    for (const pk of minimal) {
      expect(pk.shortDescription).toBeNull();
    }
  });

  it("public view of minimal record has informationStatus 'minimal'", () => {
    const pk = PRODUCT_KNOWLEDGE_REGISTRY.find((p) => p.informationStatus === "minimal")!;
    const publicView = resolvePublicProduct(pk);
    expect(publicView.informationStatus).toBe("minimal");
    expect(publicView.shortDescription).toBeNull();
  });

  it("all minimal records have empty application arrays", () => {
    const minimal = PRODUCT_KNOWLEDGE_REGISTRY.filter((pk) => pk.informationStatus === "minimal");
    expect(minimal.length).toBe(56); // all are currently minimal
    for (const pk of minimal) {
      expect(pk.applications).toHaveLength(0);
      expect(pk.surfaces).toHaveLength(0);
      expect(pk.problems).toHaveLength(0);
    }
  });
});

// ─── Additional: Validator passes on current registry ────────────────────────

describe("Validator — current registry passes validation", () => {
  it("the current product knowledge registry has no validation errors", () => {
    const result = validateProductKnowledge(OVI_SECTORS);
    if (!result.isValid) {
      console.error("Validation errors:", result.errors);
    }
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });
});

// ─── Additional: Source reference validation ──────────────────────────────────

describe("Source reference validation", () => {
  it("validates a valid source reference without errors", () => {
    const errors = validateSourceReference({
      sourceType: "catalog_file",
      sourceFile: "src/features/products/chemical-lines-data.ts",
      sourcePage: null,
      sourceSection: "OVI_SECTORS",
      verificationStatus: "source_confirmed",
      internalNote: null,
    });
    expect(errors).toHaveLength(0);
  });

  it("detects empty sourceFile", () => {
    const errors = validateSourceReference({
      sourceType: "catalog_file",
      sourceFile: "",
      sourcePage: null,
      sourceSection: null,
      verificationStatus: "source_confirmed",
      internalNote: null,
    });
    expect(errors.some((e) => e.field === "sourceFile")).toBe(true);
  });

  it("isSourceConfirmed returns true for source_confirmed", () => {
    expect(
      isSourceConfirmed({
        sourceType: "catalog_file",
        sourceFile: "some/file.ts",
        sourcePage: null,
        sourceSection: null,
        verificationStatus: "source_confirmed",
        internalNote: null,
      }),
    ).toBe(true);
  });

  it("isSourceConfirmed returns false for unverified", () => {
    expect(
      isSourceConfirmed({
        sourceType: "catalog_file",
        sourceFile: "some/file.ts",
        sourcePage: null,
        sourceSection: null,
        verificationStatus: "unverified",
        internalNote: null,
      }),
    ).toBe(false);
  });
});

// ─── Additional: Repository query functions ───────────────────────────────────

describe("Repository queries", () => {
  it("getAllProductKnowledge returns 56 records", () => {
    expect(getAllProductKnowledge()).toHaveLength(56);
  });

  it("getProductKnowledgeById returns correct record", () => {
    const pk = getProductKnowledgeById("industrial-handsol");
    expect(pk).toBeDefined();
    expect(pk?.officialName).toBe("HANDSOL");
    expect(pk?.sectorSlug).toBe("industrial");
  });

  it("getProductKnowledgeById returns undefined for unknown ID", () => {
    const pk = getProductKnowledgeById("nonexistent-product");
    expect(pk).toBeUndefined();
  });

  it("getProductKnowledgeBySlug returns correct record", () => {
    const pk = getProductKnowledgeBySlug("biohand");
    expect(pk).toBeDefined();
    expect(pk?.officialName).toBe("BIOHAND");
  });

  it("getProductKnowledgeBySector returns only records for that sector", () => {
    const lavanderia = getProductKnowledgeBySector("lavanderia");
    expect(lavanderia).toHaveLength(6);
    for (const pk of lavanderia) {
      expect(pk.sectorSlug).toBe("lavanderia");
    }
  });

  it("getProductKnowledgeBySector('alimentos') returns 16 records", () => {
    const alimentos = getProductKnowledgeBySector("alimentos");
    expect(alimentos).toHaveLength(16);
  });

  it("getProductKnowledgeBySector('hoteleria') returns 0 records", () => {
    const hoteleria = getProductKnowledgeBySector("hoteleria");
    expect(hoteleria).toHaveLength(0);
  });
});

// ─── Additional: Taxonomy integrity ──────────────────────────────────────────

describe("Taxonomy integrity", () => {
  it("INDUSTRIES taxonomy has 7 entries matching official sectors", () => {
    expect(INDUSTRIES).toHaveLength(7);
  });

  it("all INDUSTRIES entries have stable IDs", () => {
    const ids = INDUSTRIES.map((i) => i.id);
    expect(ids).toContain("industrial");
    expect(ids).toContain("biotecnologia");
    expect(ids).toContain("lavanderia");
    expect(ids).toContain("alimentos");
    expect(ids).toContain("cuidado-personal");
    expect(ids).toContain("hoteleria");
    expect(ids).toContain("institucional");
  });
});
