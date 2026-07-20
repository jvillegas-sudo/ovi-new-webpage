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

function joinLabels(labels: string[]): string | null {
  if (labels.length === 0) return null;
  if (labels.length === 1) return labels[0];
  if (labels.length === 2) return `${labels[0]} y ${labels[1]}`;

  return `${labels.slice(0, -1).join(", ")} y ${labels[labels.length - 1]}`;
}

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

  // ─── History ────────────────────────────────────────────────────────────────
  const history =
    p.history?.publicationStatus === "published"
      ? {
          foundingYear: p.history.foundingYear,
          foundingLocation: p.history.foundingLocation,
          narrative: p.history.narrative,
          timeline: (p.history.timeline ?? [])
            .filter((event) => event.publicationStatus === "published")
            .map((event) => ({
              date: event.date,
              year: event.year,
              event: event.event,
              description: event.description,
              sourceReference: event.sourceReference,
            })),
        }
      : null;

  // ─── Experience ─────────────────────────────────────────────────────────────
  const experience =
    p.experience?.publicationStatus === "published"
      ? {
          years: p.experience.years,
          projects: (p.experience.projects ?? []).map((project) => ({
            id: project.id,
            title: project.title,
            caseStudyId: project.caseStudyId,
            description: project.description,
            evidence: project.evidence,
            status: project.status,
          })),
          industries: p.experience.industries ?? [],
          capabilities: p.experience.capabilities ?? [],
          evidence: p.experience.evidence ?? [],
          status: p.experience.status,
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

  // ─── Corporate Numbers ─────────────────────────────────────────────────────
  const corporateNumbers =
    p.corporateNumbers?.publicationStatus === "published"
      ? {
          yearsInOperation: p.corporateNumbers.yearsInOperation,
          clientsServed: p.corporateNumbers.clientsServed,
          teamSize: p.corporateNumbers.teamSize,
          productCount: p.corporateNumbers.productCount,
          certificationCount: p.corporateNumbers.certificationCount,
          otherFigures: p.corporateNumbers.otherFigures,
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

  // ─── Technology Stack ───────────────────────────────────────────────────────
  const technologyStack =
    p.technologyStack?.publicationStatus === "published"
      ? {
          technologies: p.technologyStack.technologies,
        }
      : null;

  // ─── Brand Assets ────────────────────────────────────────────────────────
  const brandAssets = (p.brandAssets ?? [])
    .filter((a) => a.publicationStatus === "published")
    .map((a) => ({ id: a.id, title: a.title, path: a.path, type: a.type }));

  // ─── Project References ────────────────────────────────────────────────────
  const projectReferences = (p.projectReferences ?? [])
    .filter((project) => project.publicationStatus === "published")
    .map((project) => ({
      id: project.id,
      title: project.title,
      description: project.description,
      caseStudyId: project.caseStudyId,
      imagePath: project.imagePath,
      documentPath: project.documentPath,
      testimonial: project.testimonial,
    }));

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
    history,
    experience,
    coreValues,
    differentiators,
    capabilities,
    businessUnits,
    serviceReferences,
    industryReferences,
    geographicCoverage,
    corporateNumbers,
    certifications,
    technologyStack,
    brandAssets,
    projectReferences,
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

  const history =
    p.history?.publicationStatus === "published" ? (p.history.narrative ?? null) : null;

  const coreValueNames = (p.coreValues ?? [])
    .filter((v) => v.publicationStatus === "published")
    .map((v) => v.name);

  // Brand pillars are modeled as differentiators; we also include core values as pillars
  const brandPillarNames = coreValueNames;

  const capabilityNames = (p.capabilities ?? [])
    .filter((capability) => capability.publicationStatus === "published")
    .map((capability) => capability.name);

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

  const technologyHighlights =
    p.technologyStack?.publicationStatus === "published"
      ? Object.keys(p.technologyStack.technologies ?? {})
      : [];

  const projectReferenceTitles = (p.projectReferences ?? [])
    .filter((project) => project.publicationStatus === "published")
    .map((project) => project.title);

  const publishedExperience = p.experience?.publicationStatus === "published" ? p.experience : null;
  const experienceSummary = publishedExperience
    ? [
        publishedExperience.years,
        publishedExperience.projects?.length
          ? `${publishedExperience.projects.length} referencias oficiales documentadas`
          : null,
        publishedExperience.industries?.length
          ? `${publishedExperience.industries.length} industrias referenciadas`
          : null,
      ]
        .filter(Boolean)
        .join(" · ")
    : null;

  // ─── Search answers ────────────────────────────────────────────────────────
  const whoIsFaq = (p.faqs ?? []).find((f) => f.id === "faq-quienes-somos");
  const whoIsOvi =
    whoIsFaq?.publicationStatus === "published" && whoIsFaq.answer
      ? whoIsFaq.answer
      : `${brandName} es una empresa de ${tagline}.`;

  const differentFaq = (p.faqs ?? []).find((f) => f.id === "faq-que-hace-diferente-ovi");
  const whatMakesOviDifferent =
    differentFaq?.publicationStatus === "published"
      ? (differentFaq.answer ?? null)
      : differentiatorTitles.length > 0
        ? `${brandName} se diferencia por ${differentiatorTitles.join(", ")}.`
        : null;

  const coverageFaq = (p.faqs ?? []).find((f) => f.id === "faq-donde-opera");
  const whereDoesOviOperate =
    coverageFaq?.publicationStatus === "published"
      ? (coverageFaq.answer ?? null)
      : geographicCoverage;

  const servicesFaq = (p.faqs ?? []).find((f) => f.id === "faq-que-servicios-ofrece");
  const whatServicesDoesOviProvide =
    servicesFaq?.publicationStatus === "published"
      ? (servicesFaq.answer ?? null)
      : serviceLabels.length > 0
        ? `${brandName} presta servicios como ${joinLabels(serviceLabels)}.`
        : null;

  const whyFaq = (p.faqs ?? []).find((f) => f.id === "faq-por-que-elegir-ovi");
  const whyChooseOvi =
    whyFaq?.publicationStatus === "published" ? (whyFaq.answer ?? null) : whatMakesOviDifferent;

  const industriesFaq = (p.faqs ?? []).find((f) => f.id === "faq-que-industrias-atiende");
  const whatIndustriesDoesOviServe =
    industriesFaq?.publicationStatus === "published"
      ? (industriesFaq.answer ?? null)
      : industryLabels.length > 0
        ? `${brandName} atiende ${joinLabels(industryLabels)}.`
        : null;

  const certFaq = (p.faqs ?? []).find((f) => f.id === "faq-certificaciones");
  const whatCertificationsDoesOviHave =
    certFaq?.publicationStatus === "published" ? (certFaq.answer ?? null) : null;

  const expFaq = (p.faqs ?? []).find((f) => f.id === "faq-experiencia");
  const whatExperienceDoesOviHave =
    expFaq?.publicationStatus === "published" ? (expFaq.answer ?? null) : experienceSummary;

  return {
    brandName,
    tagline,
    shortDescription,
    mission,
    vision,
    history,
    coreValueNames,
    brandPillarNames,
    capabilityNames,
    industryLabels,
    serviceLabels,
    geographicCoverage,
    differentiatorTitles,
    certificationNames,
    technologyHighlights,
    projectReferenceTitles,
    experienceSummary,
    searchAnswers: {
      whoIsOvi,
      whatMakesOviDifferent,
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
    purposeText: pub.purpose?.description ?? pub.purpose?.brandPromise ?? null,
    missionText: pub.mission?.description ?? null,
    visionText: pub.vision?.description ?? null,
    historyText: pub.history?.narrative ?? null,
    experienceText:
      pub.experience != null
        ? [pub.experience.years, ...pub.experience.evidence].filter(Boolean).join(" · ")
        : null,
    coreValueNames: pub.coreValues.map((v) => v.name),
    capabilityNames: pub.capabilities.map((capability) => capability.name),
    differentiatorTitles: pub.differentiators.map((d) => d.title),
    industryLabels: pub.industryReferences.map((i) => i.label),
    serviceLabels: pub.serviceReferences.map((s) => s.label),
    certificationNames: pub.certifications.map((c) => c.name),
    technologyHighlights: Object.keys(pub.technologyStack?.technologies ?? {}),
    projectReferenceTitles: pub.projectReferences.map((project) => project.title),
    projectReferenceDescriptions: pub.projectReferences.map((project) => project.description ?? ""),
    coverageText: pub.geographicCoverage?.description ?? null,
    faqQuestions,
    faqAnswers,
    answerSnippets: [
      pub.description,
      pub.mission?.description ?? null,
      pub.history?.narrative ?? null,
      pub.experience?.years ?? null,
      ...(pub.experience?.evidence ?? []),
      ...pub.differentiators.map((d) => d.description ?? d.title),
      ...pub.projectReferences.map((project) => project.description ?? project.title),
      ...faqAnswers,
    ].filter(Boolean),
  };
}
