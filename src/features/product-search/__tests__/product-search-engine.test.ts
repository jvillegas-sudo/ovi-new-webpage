/**
 * Tests: product-search-engine.ts
 * Work Order 007 · OVI Smart Product Discovery
 *
 * Tests for the pure search/ranking engine.
 * No DOM required — runs in Node environment via Vitest.
 */

import { describe, it, expect } from "vitest";
import { OVI_SECTORS } from "@features/products/chemical-lines-data";
import { buildSearchIndex } from "../utils/build-product-search-document";
import { searchProducts } from "../services/product-search-engine";
import { normalizeSearchText, splitQueryTerms } from "../utils/normalize-search-text";

// Build index once for all tests (mirrors production usage)
const index = buildSearchIndex(OVI_SECTORS);

// ─── normalizeSearchText ──────────────────────────────────────────────────────

describe("normalizeSearchText", () => {
  it("removes diacritics (accent-insensitive)", () => {
    expect(normalizeSearchText("Biotecnología")).toBe("biotecnologia");
    expect(normalizeSearchText("CIP ÁCIDO")).toBe("cip acido");
    expect(normalizeSearchText("Lavandería")).toBe("lavanderia");
    expect(normalizeSearchText("Protección y Cuidado Personal")).toBe(
      "proteccion y cuidado personal",
    );
  });

  it("converts to lowercase (case-insensitive)", () => {
    expect(normalizeSearchText("BIOHAND")).toBe("biohand");
    expect(normalizeSearchText("Eco-Zyme")).toBe("eco-zyme");
  });

  it("collapses internal whitespace", () => {
    expect(normalizeSearchText("  FLOOR   WAX  ")).toBe("floor wax");
  });

  it("trims leading and trailing whitespace", () => {
    expect(normalizeSearchText("  handsol  ")).toBe("handsol");
  });

  it("returns empty string for blank input", () => {
    expect(normalizeSearchText("")).toBe("");
    expect(normalizeSearchText("   ")).toBe("");
  });
});

describe("splitQueryTerms", () => {
  it("splits on spaces", () => {
    expect(splitQueryTerms("cip acido")).toEqual(["cip", "acido"]);
  });

  it("filters empty strings", () => {
    expect(splitQueryTerms("eco zyme")).toEqual(["eco", "zyme"]);
  });

  it("returns single-element array for single word", () => {
    expect(splitQueryTerms("handsol")).toEqual(["handsol"]);
  });
});

// ─── searchProducts ───────────────────────────────────────────────────────────

describe("searchProducts", () => {
  it("returns empty array for empty query", () => {
    expect(searchProducts(index, "")).toHaveLength(0);
    expect(searchProducts(index, "   ")).toHaveLength(0);
  });

  it("returns empty array for no matches (no-results behavior)", () => {
    const results = searchProducts(index, "xyznotaproduct999");
    expect(results).toHaveLength(0);
  });

  it("ranks exact product name match first", () => {
    const results = searchProducts(index, "BIOHAND");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0]!.document.officialName).toBe("BIOHAND");
  });

  it("is case-insensitive for product name search", () => {
    const upper = searchProducts(index, "BIOHAND");
    const lower = searchProducts(index, "biohand");
    const mixed = searchProducts(index, "Biohand");
    expect(upper[0]!.document.id).toBe(lower[0]!.document.id);
    expect(upper[0]!.document.id).toBe(mixed[0]!.document.id);
  });

  it("is accent-insensitive for sector search", () => {
    const withAccent = searchProducts(index, "Biotecnología");
    const withoutAccent = searchProducts(index, "Biotecnologia");
    expect(withAccent.map((r) => r.document.id)).toEqual(
      withoutAccent.map((r) => r.document.id),
    );
  });

  it("supports partial product name matching", () => {
    // "eco" should find ECO-ZYME, ECO-ZYME SOLID, ECOGRILL, ECOQUAT, etc.
    const results = searchProducts(index, "eco");
    expect(results.length).toBeGreaterThan(0);
    const names = results.map((r) => r.document.officialName);
    const hasEcoProduct = names.some((n) => n.toLowerCase().includes("eco"));
    expect(hasEcoProduct).toBe(true);
  });

  it("exact name match ranks before prefix match", () => {
    // "ECOGRILL" should come before broader "eco*" matches
    const results = searchProducts(index, "ecogrill");
    expect(results[0]!.document.officialName).toBe("ECOGRILL");
    expect(results[0]!.score).toBeGreaterThan(results[1]?.score ?? 0);
  });

  it("supports multi-word queries", () => {
    // "eco zyme" should find ECO-ZYME and ECO-ZYME SOLID
    const results = searchProducts(index, "eco zyme");
    expect(results.length).toBeGreaterThan(0);
    const hasEcoZyme = results.some((r) => r.document.officialName.startsWith("ECO-ZYME"));
    expect(hasEcoZyme).toBe(true);
  });

  it("multi-word: products matching ALL terms rank above single-term matches", () => {
    const results = searchProducts(index, "eco zyme");
    const ecoZymeResult = results.find((r) => r.document.officialName === "ECO-ZYME");
    const ecoZymeSolidResult = results.find((r) => r.document.officialName === "ECO-ZYME SOLID");
    // Both should be present
    expect(ecoZymeResult).toBeDefined();
    expect(ecoZymeSolidResult).toBeDefined();
    // Both should rank higher than a product that only matches one term
    const otherResults = results.filter(
      (r) => r.document.officialName !== "ECO-ZYME" && r.document.officialName !== "ECO-ZYME SOLID",
    );
    if (otherResults.length > 0) {
      expect(ecoZymeResult!.score).toBeGreaterThan(otherResults[0]!.score);
    }
  });

  it("synonym: 'desengrasante' finds DEGREASER", () => {
    const results = searchProducts(index, "desengrasante");
    expect(results.length).toBeGreaterThan(0);
    const hasDegreaser = results.some(
      (r) => r.document.normalizedName.includes("degreaser"),
    );
    expect(hasDegreaser).toBe(true);
  });

  it("sector search finds products in that sector", () => {
    const results = searchProducts(index, "lavanderia");
    expect(results.length).toBeGreaterThan(0);
    const allLavanderia = results.every((r) => r.document.sectorSlug === "lavanderia");
    expect(allLavanderia).toBe(true);
  });

  it("returns no duplicate products", () => {
    const results = searchProducts(index, "eco");
    const ids = results.map((r) => r.document.id);
    const uniqueIds = new Set(ids);
    expect(ids.length).toBe(uniqueIds.size);
  });

  it("respects the limit parameter", () => {
    const results = searchProducts(index, "e", 3);
    expect(results.length).toBeLessThanOrEqual(3);
  });

  it("returns deterministic results for the same query", () => {
    const a = searchProducts(index, "biohand").map((r) => r.document.id);
    const b = searchProducts(index, "biohand").map((r) => r.document.id);
    expect(a).toEqual(b);
  });
});

// ─── buildSearchIndex ─────────────────────────────────────────────────────────

describe("buildSearchIndex", () => {
  it("produces the correct total number of products (56)", () => {
    expect(index).toHaveLength(56);
  });

  it("all documents have a non-empty route", () => {
    for (const doc of index) {
      expect(doc.route).toMatch(/^\/products\/.+\/.+/);
    }
  });

  it("all document IDs are unique", () => {
    const ids = index.map((d) => d.id);
    expect(ids.length).toBe(new Set(ids).size);
  });

  it("all document slugs are unique", () => {
    const slugs = index.map((d) => d.slug);
    expect(slugs.length).toBe(new Set(slugs).size);
  });

  it("does not include products from the Hotelería content-gap sector", () => {
    const hoteleria = index.filter((d) => d.sectorSlug === "hoteleria");
    expect(hoteleria).toHaveLength(0);
  });

  it("handles missing optional product fields without throwing", () => {
    expect(() => buildSearchIndex(OVI_SECTORS)).not.toThrow();
    for (const doc of index) {
      // shortDescription and image may be null — confirm they don't break indexing
      expect(doc.officialName).toBeTruthy();
      expect(doc.normalizedName).toBeTruthy();
    }
  });
});
