/**
 * Company Knowledge Resolver
 * OKP-001 — OVI Knowledge Program — Company Knowledge
 *
 * Resolves the internal CompanyProfile into safe public-facing output.
 *
 * Rules:
 *   - Internal fields (sources, verificationStatus, governance) are stripped.
 *   - Only sections with publicationStatus === "published" are included.
 *   - No fictional content is ever introduced.
 *   - Confidential client data is never exposed.
 *
 * This resolver is the single authorized source for resolved company data.
 * The website, OVI AI, OVI OS, and all future systems must consume output
 * from this resolver — never the raw CompanyProfile directly.
 */

import type {
  CompanyProfile,
  PublicCompanyProfile,
  CompanyAIContext,
  CompanySearchDocument,
} from "../types/company-profile";
import { getCompanyProfile } from "../repositories/company-knowledge.repository";

// ─── Public Profile Resolver ──────────────────────────────────────────────────

/**
 * Resolve the CompanyProfile into a safe PublicCompanyProfile.
 *
 * Strips all internal governance fields.
 * Only includes sections that are published.
 *
 * @param profile — Optional profile override (defaults to official profile)
 */
export function resolveCompanyProfile(profile?: CompanyProfile): PublicCompanyProfile {
  const p = profile ?? getCompanyProfile();

  // ─── Identity ───────────────────────────────────────────────────────────────
  const brandName = p.identity?.brandName ?? "OVI";
  const tagline = p.identity?.tagline ?? "Ingeniería en Limpieza";
  const description = p.identity?.description ?? "";
  const website =
    p.identity?.publicationStatus === "published" ? (p.identity.website ?? null) : null;
  const contactEmail =
    p.identity?.publicationStatus === "published" ? (p.identity.contactEmail ?? null) : null;
  const linkedin =
    p.identity?.publicationStatus === "published" ? (p.identity.linkedin ?? null) : null;
  const keywords = p.identity?.publicationStatus === "published" ? (p.identity.keywords ?? []) : [];

  // ─── Mission ────────────────────────────────────────────────────────────────
  const mission =
    p.mission?.publicationStatus === "published"
      ? { title: p.mission.title, description: p.mission.description }
      : null;

  // ─── Vision ─────────────────────────────────────────────────────────────────
  const vision =
    p.vision?.publicationStatus === "published"
      ? { title: p.vision.title, description: p.vision.description }
      : null;

  // ─── Purpose ────────────────────────────────────────────────────────────────
  const purpose =
    p.purpose?.publicationStatus === "published"
      ? {
          description: p.purpose.description,
          brandPromise: p.purpose.brandPromise,
        }
      : null;

  // ─── Core Values ────────────────────────────────────────────────────────────
  const coreValues = (p.coreValues ?? [])
    .filter((v) => v.publicationStatus === "published")
    .map((v) => ({ id: v.id, name: v.name, description: v.description }));

  // ─── Differentiators ────────────────────────────────────────────────────────
  const differentiators = (p.differentiators ?? [])
    .filter((d) => d.publicationStatus === "published")
    .map((d) => ({ id: d.id, title: d.title, description: d.description }));

  // ─── Capabilities ────────────────────────────────────────────────────────────
  const capabilities = (p.capabilities ?? [])
    .filter((c) => c.publicationStatus === "published")
    .map((c) => ({ id: c.id, category: c.category, name: c.name, description: c.description }));

  // ─── Business Units ──────────────────────────────────────────────────────────
  const businessUnits = (p.businessUnits ?? [])
    .filter((u) => u.publicationStatus === "published")
    .map((u) => ({ id: u.id, name: u.name, description: u.description }));

  // ─── Service References ───────────────────────────────────────────────────
  const serviceReferences = p.serviceReferences ?? [];

  // ─── Industry References ──────────────────────────────────────────────────
  const industryReferences = p.industryReferences ?? [];

  // ─── Geographic Coverage ─────────────────────────────────────────────────
  const geographicCoverage =
    p.geographicCoverage?.publicationStatus === "published"
      ? {
          countries: p.geographicCoverage.countries,
          regions: p.geographicCoverage.regions,
          description: p.geographicCoverage.description,
        }
      : null;

  // ─── Certifications ──────────────────────────────────────────────────────
  const certifications = (p.certifications ?? [])
    .filter((c) => c.publicationStatus === "published")
    .map((c) => ({
      id: c.id,
      name: c.name,
      issuer: c.issuer,
      expirationDate: c.expirationDate,
    }));

  // ─── Brand Assets ────────────────────────────────────────────────────────
  const brandAssets = (p.brandAssets ?? [])
    .filter((a) => a.publicationStatus === "published")
    .map((a) => ({ id: a.id, title: a.title, path: a.path, type: a.type }));

  // ─── Commercial Positioning ──────────────────────────────────────────────
  const commercialPositioning =
    p.commercialPositioning?.publicationStatus === "published"
      ? {
          primaryStatement: p.commercialPositioning.primaryStatement,
          targetAudience: p.commercialPositioning.targetAudience,
          valueProposition: p.commercialPositioning.valueProposition,
          competitiveAdvantages: p.commercialPositioning.competitiveAdvantages,
        }
      : null;

  // ─── FAQs ────────────────────────────────────────────────────────────────
  // Only include FAQs that are published AND have an answer
  const faqs = (p.faqs ?? [])
    .filter((f) => f.publicationStatus === "published" && f.answer != null)
    .map((f) => ({ id: f.id, question: f.question, answer: f.answer }));

  return {
    brandName,
    tagline,
    description,
    website,
    contactEmail,
    linkedin,
    keywords,
    mission,
    vision,
    purpose,
    coreValues,
    differentiators,
    capabilities,
    businessUnits,
    serviceReferences,
    industryReferences,
    geographicCoverage,
    certifications,
    brandAssets,
    commercialPositioning,
    faqs,
  };
}

// ─── AI Context Resolver ──────────────────────────────────────────────────────

/**
 * Resolve the CompanyProfile into a structured context for OVI AI.
 *
 * The AI must consume this structured context — never raw JSON.
 * Only verified and published information is included.
 *
 * @param profile — Optional profile override (defaults to official profile)
 */
export function resolveCompanyAIContext(profile?: CompanyProfile): CompanyAIContext {
  const p = profile ?? getCompanyProfile();

  const brandName = p.identity?.brandName ?? "OVI";
  const tagline = p.identity?.tagline ?? "Ingeniería en Limpieza";
  const shortDescription = p.identity?.description ?? `${brandName} — ${tagline}`;

  const mission =
    p.mission?.publicationStatus === "published" ? (p.mission.description ?? null) : null;

  const vision =
    p.vision?.publicationStatus === "published" ? (p.vision.description ?? null) : null;

  const coreValueNames = (p.coreValues ?? [])
    .filter((v) => v.publicationStatus === "published")
    .map((v) => v.name);

  // Brand pillars are modeled as differentiators; we also include core values as pillars
  const brandPillarNames = coreValueNames;

  const industryLabels = (p.industryReferences ?? []).map((i) => i.label);

  const serviceLabels = (p.serviceReferences ?? []).map((s) => s.label);

  const geographicCoverage =
    p.geographicCoverage?.publicationStatus === "published"
      ? (p.geographicCoverage.description ?? null)
      : null;

  const differentiatorTitles = (p.differentiators ?? [])
    .filter((d) => d.publicationStatus === "published")
    .map((d) => d.title);

  const certificationNames = (p.certifications ?? [])
    .filter((c) => c.publicationStatus === "published")
    .map((c) => c.name);

  // ─── Search answers ────────────────────────────────────────────────────────
  const whoIsFaq = (p.faqs ?? []).find((f) => f.id === "faq-quienes-somos");
  const whoIsOvi =
    whoIsFaq?.publicationStatus === "published" && whoIsFaq.answer
      ? whoIsFaq.answer
      : `${brandName} es una empresa de ${tagline}.`;

  const coverageFaq = (p.faqs ?? []).find((f) => f.id === "faq-donde-opera");
  const whereDoesOviOperate =
    coverageFaq?.publicationStatus === "published" ? (coverageFaq.answer ?? null) : null;

  const servicesFaq = (p.faqs ?? []).find((f) => f.id === "faq-que-servicios-ofrece");
  const whatServicesDoesOviProvide =
    servicesFaq?.publicationStatus === "published" ? (servicesFaq.answer ?? null) : null;

  const whyFaq = (p.faqs ?? []).find((f) => f.id === "faq-por-que-elegir-ovi");
  const whyChooseOvi = whyFaq?.publicationStatus === "published" ? (whyFaq.answer ?? null) : null;

  const industriesFaq = (p.faqs ?? []).find((f) => f.id === "faq-que-industrias-atiende");
  const whatIndustriesDoesOviServe =
    industriesFaq?.publicationStatus === "published" ? (industriesFaq.answer ?? null) : null;

  const certFaq = (p.faqs ?? []).find((f) => f.id === "faq-certificaciones");
  const whatCertificationsDoesOviHave =
    certFaq?.publicationStatus === "published" ? (certFaq.answer ?? null) : null;

  const expFaq = (p.faqs ?? []).find((f) => f.id === "faq-experiencia");
  const whatExperienceDoesOviHave =
    expFaq?.publicationStatus === "published" ? (expFaq.answer ?? null) : null;

  return {
    brandName,
    tagline,
    shortDescription,
    mission,
    vision,
    coreValueNames,
    brandPillarNames,
    industryLabels,
    serviceLabels,
    geographicCoverage,
    differentiatorTitles,
    certificationNames,
    searchAnswers: {
      whoIsOvi,
      whereDoesOviOperate,
      whatServicesDoesOviProvide,
      whyChooseOvi,
      whatIndustriesDoesOviServe,
      whatCertificationsDoesOviHave,
      whatExperienceDoesOviHave,
    },
  };
}

// ─── Search Document Resolver ─────────────────────────────────────────────────

/**
 * Resolve the CompanyProfile into a flat search index document.
 * Enables future search to answer common corporate questions.
 *
 * @param profile — Optional profile override (defaults to official profile)
 */
export function resolveCompanySearchDocument(profile?: CompanyProfile): CompanySearchDocument {
  const p = profile ?? getCompanyProfile();
  const pub = resolveCompanyProfile(p);

  const faqQuestions = pub.faqs.map((f) => f.question);
  const faqAnswers = pub.faqs.map((f) => f.answer ?? "").filter(Boolean);

  return {
    id: "company-profile",
    brandName: pub.brandName,
    tagline: pub.tagline,
    description: pub.description,
    keywords: pub.keywords,
    missionText: pub.mission?.description ?? null,
    visionText: pub.vision?.description ?? null,
    coreValueNames: pub.coreValues.map((v) => v.name),
    differentiatorTitles: pub.differentiators.map((d) => d.title),
    industryLabels: pub.industryReferences.map((i) => i.label),
    serviceLabels: pub.serviceReferences.map((s) => s.label),
    certificationNames: pub.certifications.map((c) => c.name),
    coverageText: pub.geographicCoverage?.description ?? null,
    faqQuestions,
    faqAnswers,
  };
}
