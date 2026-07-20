/**
 * Tests: Company Knowledge Engine
 * OKP-001 — OVI Knowledge Program — Company Knowledge
 *
 * Validates:
 *   - Resolver produces correct PublicCompanyProfile
 *   - Validator detects missing mission, vision and structural issues
 *   - Public profile strips internal governance fields
 *   - Source references are present on published sections
 *   - Missing data (mission, vision, history) is correctly flagged
 *   - AI context is correctly resolved
 *   - Search document is correctly resolved
 *   - No fictional content is introduced
 */

import { describe, it, expect } from "vitest";
import {
  getCompanyProfile,
  getBrandName,
  getTagline,
  getPublishedCoreValues,
  getAllCoreValues,
  getPublishedDifferentiators,
  getPublicClients,
  getAllFAQs,
  getPublishedFAQs,
} from "../repositories/company-knowledge.repository";
import {
  resolveCompanyProfile,
  resolveCompanyAIContext,
  resolveCompanySearchDocument,
} from "../services/company-knowledge-resolver";
import { validateCompanyProfile } from "../services/company-knowledge-validator";
import type { CompanyProfile } from "../types/company-profile";

// ─── 1. Official profile exists and is structurally valid ─────────────────────

describe("Test 1 — Official profile exists and has required identity", () => {
  it("getCompanyProfile returns a profile with correct profileId", () => {
    const profile = getCompanyProfile();
    expect(profile.profileId).toBe("ovi-company-profile");
  });

  it("profile has schemaVersion", () => {
    const profile = getCompanyProfile();
    expect(profile.schemaVersion).toBeTruthy();
  });

  it("profile has informationStatus", () => {
    const profile = getCompanyProfile();
    expect(profile.informationStatus).toBeTruthy();
  });
});

// ─── 2. Official brand identity is correct ────────────────────────────────────

describe("Test 2 — Official brand identity", () => {
  it("getBrandName returns 'OVI'", () => {
    expect(getBrandName()).toBe("OVI");
  });

  it("getTagline returns 'Ingeniería en Limpieza'", () => {
    expect(getTagline()).toBe("Ingeniería en Limpieza");
  });

  it("identity has contactEmail", () => {
    const profile = getCompanyProfile();
    expect(profile.identity?.contactEmail).toBe("info@ovi.com");
  });

  it("identity has linkedin", () => {
    const profile = getCompanyProfile();
    expect(profile.identity?.linkedin).toBe("https://www.linkedin.com/company/ovi");
  });
});

// ─── 3. Core values are populated from official brand pillars ─────────────────

describe("Test 3 — Core values from official brand pillars", () => {
  it("there are exactly 6 core values (The Six Permanent Pillars)", () => {
    expect(getAllCoreValues()).toHaveLength(6);
  });

  it("all 6 core values are published", () => {
    const published = getPublishedCoreValues();
    expect(published).toHaveLength(6);
  });

  it("core value IDs are unique", () => {
    const values = getAllCoreValues();
    const ids = values.map((v) => v.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it("all published core values have sources", () => {
    const published = getPublishedCoreValues();
    for (const value of published) {
      expect(value.sources.length).toBeGreaterThan(0);
    }
  });

  it("ingenieria-en-limpieza pillar is present", () => {
    const values = getAllCoreValues();
    const pillar = values.find((v) => v.id === "ingenieria-en-limpieza");
    expect(pillar).toBeDefined();
    expect(pillar?.name).toBe("Ingeniería en Limpieza");
  });
});

// ─── 4. Validator detects missing mission ─────────────────────────────────────

describe("Test 4 — Validator detects missing mission description", () => {
  it("validation result has a warning for missing mission description", () => {
    const result = validateCompanyProfile();
    const missionWarnings = result.warnings.filter((w) => w.field.startsWith("mission"));
    expect(missionWarnings.length).toBeGreaterThan(0);
    expect(missionWarnings[0].message).toContain("misión");
  });
});

// ─── 5. Validator detects missing vision ──────────────────────────────────────

describe("Test 5 — Validator detects missing vision description", () => {
  it("validation result has a warning for missing vision description", () => {
    const result = validateCompanyProfile();
    const visionWarnings = result.warnings.filter((w) => w.field.startsWith("vision"));
    expect(visionWarnings.length).toBeGreaterThan(0);
    expect(visionWarnings[0].message).toContain("visión");
  });
});

// ─── 6. Validator detects missing history ─────────────────────────────────────

describe("Test 6 — Validator detects missing history", () => {
  it("validation result has a warning for missing history", () => {
    const result = validateCompanyProfile();
    const historyWarnings = result.warnings.filter((w) => w.field === "history");
    expect(historyWarnings.length).toBeGreaterThan(0);
  });
});

// ─── 7. Resolver strips internal fields ──────────────────────────────────────

describe("Test 7 — Resolver strips internal governance fields", () => {
  it("PublicCompanyProfile has no 'sources' field", () => {
    const pub = resolveCompanyProfile();
    expect("sources" in pub).toBe(false);
  });

  it("PublicCompanyProfile has no 'verificationStatus' field", () => {
    const pub = resolveCompanyProfile();
    expect("verificationStatus" in pub).toBe(false);
  });

  it("PublicCompanyProfile.brandName is 'OVI'", () => {
    const pub = resolveCompanyProfile();
    expect(pub.brandName).toBe("OVI");
  });

  it("PublicCompanyProfile.tagline is 'Ingeniería en Limpieza'", () => {
    const pub = resolveCompanyProfile();
    expect(pub.tagline).toBe("Ingeniería en Limpieza");
  });
});

// ─── 8. Resolver excludes unpublished sections ────────────────────────────────

describe("Test 8 — Resolver excludes unpublished sections", () => {
  it("mission is null in public profile (not yet published)", () => {
    const pub = resolveCompanyProfile();
    expect(pub.mission).toBeNull();
  });

  it("vision is null in public profile (not yet published)", () => {
    const pub = resolveCompanyProfile();
    expect(pub.vision).toBeNull();
  });

  it("purpose is null in public profile (draft)", () => {
    const pub = resolveCompanyProfile();
    expect(pub.purpose).toBeNull();
  });
});

// ─── 9. Resolver includes published core values ───────────────────────────────

describe("Test 9 — Resolver includes published core values", () => {
  it("public profile has 6 core values", () => {
    const pub = resolveCompanyProfile();
    expect(pub.coreValues).toHaveLength(6);
  });

  it("public core values have no 'sources' field", () => {
    const pub = resolveCompanyProfile();
    for (const value of pub.coreValues) {
      expect("sources" in value).toBe(false);
    }
  });
});

// ─── 10. Source references are present on identity ───────────────────────────

describe("Test 10 — Source references on published identity", () => {
  it("identity has at least one source reference", () => {
    const profile = getCompanyProfile();
    expect(profile.identity?.sources.length).toBeGreaterThan(0);
  });

  it("identity source references src/config/site.ts", () => {
    const profile = getCompanyProfile();
    const sources = profile.identity?.sources ?? [];
    const siteConfigSource = sources.find((s) => s.sourceFile.includes("site.ts"));
    expect(siteConfigSource).toBeDefined();
  });
});

// ─── 11. No fictional content in brand name or tagline ───────────────────────

describe("Test 11 — No fictional content", () => {
  it("brand name does not contain 'Ventures'", () => {
    expect(getBrandName()).not.toContain("Ventures");
  });

  it("brand name is exactly 'OVI'", () => {
    expect(getBrandName()).toBe("OVI");
  });

  it("tagline is exactly 'Ingeniería en Limpieza'", () => {
    expect(getTagline()).toBe("Ingeniería en Limpieza");
  });
});

// ─── 12. Client references — public clients only ─────────────────────────────

describe("Test 12 — Client visibility governance", () => {
  it("getPublicClients returns only public + published clients", () => {
    const clients = getPublicClients();
    for (const client of clients) {
      expect(client.visibility).toBe("public");
      expect(client.publicationStatus).toBe("published");
    }
  });

  it("EMVARIAS client is present as official reference", () => {
    const clients = getPublicClients();
    const emvarias = clients.find((c) => c.id === "emvarias");
    expect(emvarias).toBeDefined();
  });
});

// ─── 13. FAQs are structured for search and AI ───────────────────────────────

describe("Test 13 — FAQs structured for search and AI", () => {
  it("all FAQ entries have a unique id", () => {
    const faqs = getAllFAQs();
    const ids = faqs.map((f) => f.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it("published FAQs all have answers", () => {
    const published = getPublishedFAQs();
    for (const faq of published) {
      expect(faq.answer).toBeTruthy();
    }
  });

  it("faq-quienes-somos is published and has an answer", () => {
    const faq = getAllFAQs().find((f) => f.id === "faq-quienes-somos");
    expect(faq).toBeDefined();
    expect(faq?.publicationStatus).toBe("published");
    expect(faq?.answer).toBeTruthy();
  });
});

// ─── 14. AI context is correctly resolved ────────────────────────────────────

describe("Test 14 — AI context resolver", () => {
  it("AI context has correct brandName", () => {
    const ctx = resolveCompanyAIContext();
    expect(ctx.brandName).toBe("OVI");
  });

  it("AI context has correct tagline", () => {
    const ctx = resolveCompanyAIContext();
    expect(ctx.tagline).toBe("Ingeniería en Limpieza");
  });

  it("AI context has 6 brand pillar names", () => {
    const ctx = resolveCompanyAIContext();
    expect(ctx.brandPillarNames).toHaveLength(6);
  });

  it("AI context whoIsOvi search answer is populated", () => {
    const ctx = resolveCompanyAIContext();
    expect(ctx.searchAnswers.whoIsOvi).toBeTruthy();
    expect(ctx.searchAnswers.whoIsOvi).toContain("OVI");
  });

  it("AI context mission is null (not yet published)", () => {
    const ctx = resolveCompanyAIContext();
    expect(ctx.mission).toBeNull();
  });

  it("AI context vision is null (not yet published)", () => {
    const ctx = resolveCompanyAIContext();
    expect(ctx.vision).toBeNull();
  });
});

// ─── 15. Search document is correctly resolved ───────────────────────────────

describe("Test 15 — Search document resolver", () => {
  it("search document id is 'company-profile'", () => {
    const doc = resolveCompanySearchDocument();
    expect(doc.id).toBe("company-profile");
  });

  it("search document has brandName 'OVI'", () => {
    const doc = resolveCompanySearchDocument();
    expect(doc.brandName).toBe("OVI");
  });

  it("search document has keywords array", () => {
    const doc = resolveCompanySearchDocument();
    expect(Array.isArray(doc.keywords)).toBe(true);
    expect(doc.keywords.length).toBeGreaterThan(0);
  });

  it("search document has coreValueNames", () => {
    const doc = resolveCompanySearchDocument();
    expect(doc.coreValueNames).toHaveLength(6);
  });

  it("search document faqQuestions includes 'who is OVI' question", () => {
    const doc = resolveCompanySearchDocument();
    const hasWhoIs = doc.faqQuestions.some((q) => q.includes("Quiénes"));
    expect(hasWhoIs).toBe(true);
  });
});

// ─── 16. Validator — no errors on valid profile ──────────────────────────────

describe("Test 16 — Validator on official profile", () => {
  it("official profile passes validation with no errors", () => {
    const result = validateCompanyProfile();
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("official profile has governance warnings for missing content", () => {
    const result = validateCompanyProfile();
    // Warnings expected: mission description, vision description, history, etc.
    expect(result.warnings.length).toBeGreaterThan(0);
  });
});

// ─── 17. Validator — detects duplicate IDs ───────────────────────────────────

describe("Test 17 — Validator detects duplicate core value IDs", () => {
  it("profile with duplicate core value ID reports an error", () => {
    const profile = getCompanyProfile();
    const duplicate: CompanyProfile = {
      ...profile,
      coreValues: [
        ...(profile.coreValues ?? []),
        {
          id: "ingenieria-en-limpieza",
          name: "Duplicado",
          publicationStatus: "draft",
          verificationStatus: "unverified",
          sources: [],
        },
      ],
    };
    const result = validateCompanyProfile(duplicate);
    expect(result.valid).toBe(false);
    const dupError = result.errors.find((e) => e.message.includes("ingenieria-en-limpieza"));
    expect(dupError).toBeDefined();
  });
});

// ─── 18. Validator — detects published FAQ without answer ────────────────────

describe("Test 18 — Validator detects published FAQ without answer", () => {
  it("profile with published FAQ and no answer reports an error", () => {
    const profile = getCompanyProfile();
    const badProfile: CompanyProfile = {
      ...profile,
      faqs: [
        {
          id: "faq-sin-respuesta",
          question: "¿Pregunta sin respuesta?",
          answerStatus: "missing",
          publicationStatus: "published",
          verificationStatus: "unverified",
          sources: [],
        },
      ],
    };
    const result = validateCompanyProfile(badProfile);
    expect(result.valid).toBe(false);
    const faqError = result.errors.find((e) => e.field.includes("faq-sin-respuesta"));
    expect(faqError).toBeDefined();
  });
});

// ─── 19. Differentiators from official brand pillars ─────────────────────────

describe("Test 19 — Differentiators from official brand pillars", () => {
  it("there are published differentiators", () => {
    const published = getPublishedDifferentiators();
    expect(published.length).toBeGreaterThan(0);
  });

  it("differentiator IDs are unique", () => {
    const profile = getCompanyProfile();
    const diffs = profile.differentiators ?? [];
    const ids = diffs.map((d) => d.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("published differentiators all have sources", () => {
    const published = getPublishedDifferentiators();
    for (const diff of published) {
      expect(diff.sources.length).toBeGreaterThan(0);
    }
  });
});

// ─── 20. Profile information status reflects partial state ───────────────────

describe("Test 20 — Profile information status", () => {
  it("informationStatus is 'partial' (mission and vision not yet defined)", () => {
    const profile = getCompanyProfile();
    expect(profile.informationStatus).toBe("partial");
  });
});
