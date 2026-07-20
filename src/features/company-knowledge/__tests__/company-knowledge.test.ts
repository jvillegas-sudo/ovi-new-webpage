import { describe, expect, it } from "vitest";
import {
  getAllCoreValues,
  getBrandName,
  getCompanyProfile,
  getPublicClients,
  getPublishedDifferentiators,
  getPublishedFAQs,
  getTagline,
  resolveCompanyAIContext,
  resolveCompanyProfile,
  resolveCompanySearchDocument,
} from "../index";
import { validateCompanyProfile } from "../services/company-knowledge-validator";
import type { CompanyProfile } from "../types/company-profile";

describe("Company Knowledge — official profile", () => {
  it("returns the official profile id and schema version", () => {
    const profile = getCompanyProfile();

    expect(profile.profileId).toBe("ovi-company-profile");
    expect(profile.schemaVersion).toBe("1.0.0");
  });

  it("keeps the official brand identity", () => {
    expect(getBrandName()).toBe("OVI");
    expect(getTagline()).toBe("Ingeniería en Limpieza");
  });

  it("preserves the contact and corporate description", () => {
    const profile = getCompanyProfile();

    expect(profile.identity?.contactEmail).toBe("info@ovi.com");
    expect(profile.identity?.linkedin).toBe("https://www.linkedin.com/company/ovi");
    expect(profile.identity?.description).toContain("diagnóstico técnico");
  });
});

describe("Company Knowledge — mission, vision and history", () => {
  it("publishes the mission with evidence and sources", () => {
    const profile = getCompanyProfile();

    expect(profile.mission?.publicationStatus).toBe("published");
    expect(profile.mission?.description).toContain("química biodegradable");
    expect(profile.mission?.evidence).toBeTruthy();
    expect(profile.mission?.sources.length).toBeGreaterThan(0);
  });

  it("publishes the vision with evidence and sources", () => {
    const profile = getCompanyProfile();

    expect(profile.vision?.publicationStatus).toBe("published");
    expect(profile.vision?.description).toContain("futuro de la industria");
    expect(profile.vision?.evidence).toBeTruthy();
    expect(profile.vision?.sources.length).toBeGreaterThan(0);
  });

  it("publishes the history narrative", () => {
    const profile = getCompanyProfile();

    expect(profile.history?.publicationStatus).toBe("published");
    expect(profile.history?.narrative).toContain("Más de 18 años");
  });

  it("keeps a supported timeline event with date and source reference", () => {
    const timeline = getCompanyProfile().history?.timeline ?? [];

    expect(timeline.length).toBeGreaterThan(0);
    expect(timeline[0]?.date).toBe("2026-07-15");
    expect(timeline[0]?.sourceReference).toBe("public/ovi-dam/metadata/CASE-001-IMG-01.json");
    expect(timeline[0]?.sources.length).toBeGreaterThan(0);
  });
});

describe("Company Knowledge — structured experience", () => {
  it("publishes structured experience with years, projects, industries and capabilities", () => {
    const experience = getCompanyProfile().experience;

    expect(experience?.publicationStatus).toBe("published");
    expect(experience?.years).toBe("Más de 18 años");
    expect(experience?.projects).toHaveLength(3);
    expect(experience?.industries).toHaveLength(7);
    expect(experience?.capabilities).toContain("Diagnóstico técnico");
    expect(experience?.evidence?.length).toBeGreaterThan(0);
  });

  it("uses unique ids for experience projects", () => {
    const projects = getCompanyProfile().experience?.projects ?? [];
    const ids = projects.map((project) => project.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it("references CASE-001 as an official project", () => {
    const project = getCompanyProfile().experience?.projects?.find(
      (item) => item.caseStudyId === "CASE-001",
    );

    expect(project?.title).toBe("Flota de transporte pesado");
    expect(project?.evidence).toContain("tiempo de ciclo");
  });
});

describe("Company Knowledge — services, industries, capabilities and differentiators", () => {
  it("keeps the six permanent pillars as core values", () => {
    expect(getAllCoreValues()).toHaveLength(6);
  });

  it("references official services without duplicating the service domain", () => {
    const serviceReferences = getCompanyProfile().serviceReferences ?? [];

    expect(serviceReferences.length).toBeGreaterThan(0);
    expect(serviceReferences.some((service) => service.serviceId === "lavado-flota")).toBe(true);
    expect(serviceReferences.some((service) => service.serviceId === "diagnostico-tecnico")).toBe(
      true,
    );
  });

  it("references official industries from the industry knowledge source", () => {
    const industryReferences = getCompanyProfile().industryReferences ?? [];

    expect(industryReferences).toHaveLength(7);
    expect(industryReferences.some((industry) => industry.industryId === "transporte")).toBe(true);
    expect(industryReferences.some((industry) => industry.industryId === "alimentos")).toBe(true);
  });

  it("publishes company capabilities with evidence", () => {
    const capabilities = getCompanyProfile().capabilities ?? [];

    expect(capabilities.length).toBeGreaterThan(0);
    expect(capabilities.every((capability) => capability.evidence)).toBe(true);
  });

  it("publishes differentiators with evidence", () => {
    const differentiators = getPublishedDifferentiators();

    expect(differentiators.length).toBeGreaterThan(0);
    expect(differentiators.every((item) => item.evidence)).toBe(true);
  });
});

describe("Company Knowledge — public profile resolver", () => {
  it("strips internal governance fields", () => {
    const profile = resolveCompanyProfile();

    expect("sources" in profile).toBe(false);
    expect("verificationStatus" in profile).toBe(false);
  });

  it("publishes mission, vision, history and experience", () => {
    const profile = resolveCompanyProfile();

    expect(profile.mission?.description).toContain("química biodegradable");
    expect(profile.vision?.description).toContain("futuro de la industria");
    expect(profile.history?.narrative).toContain("Más de 18 años");
    expect(profile.history?.timeline).toHaveLength(1);
    expect(profile.experience?.projects).toHaveLength(3);
  });

  it("publishes corporate numbers, technology and project references", () => {
    const profile = resolveCompanyProfile();

    expect(profile.corporateNumbers?.otherFigures?.experiencia).toBe("Más de 18 años");
    expect(profile.technologyStack?.technologies?.Automation).toBeTruthy();
    expect(profile.projectReferences).toHaveLength(3);
  });

  it("keeps only public clients", () => {
    const clients = getPublicClients();

    expect(clients).toHaveLength(1);
    expect(clients[0]?.displayName).toBe("EMVARIAS");
  });
});

describe("Company Knowledge — AI context", () => {
  it("builds a richer structured AI context", () => {
    const context = resolveCompanyAIContext();

    expect(context.brandName).toBe("OVI");
    expect(context.mission).toContain("química biodegradable");
    expect(context.vision).toContain("responsables con el medio ambiente");
    expect(context.history).toContain("Más de 18 años");
    expect(context.capabilityNames).toContain("Diagnóstico técnico");
    expect(context.technologyHighlights).toContain("Artificial Intelligence");
    expect(context.projectReferenceTitles).toContain("Flota de transporte pesado");
    expect(context.experienceSummary).toContain("3 referencias oficiales");
  });

  it("answers the key company questions naturally", () => {
    const answers = resolveCompanyAIContext().searchAnswers;

    expect(answers.whoIsOvi).toContain("OVI");
    expect(answers.whatMakesOviDifferent).toContain("diagnóstico técnico");
    expect(answers.whyChooseOvi).toContain("socio de largo plazo");
    expect(answers.whatServicesDoesOviProvide).toContain("lavado de flota");
    expect(answers.whatIndustriesDoesOviServe).toContain("transporte");
    expect(answers.whatExperienceDoesOviHave).toContain("18 años");
    expect(answers.whereDoesOviOperate).toContain("Colombia y la región");
  });
});

describe("Company Knowledge — search document", () => {
  it("enriches the search document with history, experience and technology", () => {
    const document = resolveCompanySearchDocument();

    expect(document.id).toBe("company-profile");
    expect(document.missionText).toContain("química biodegradable");
    expect(document.historyText).toContain("Más de 18 años");
    expect(document.experienceText).toContain("3 casos oficiales");
    expect(document.technologyHighlights).toContain("OVI OS");
    expect(document.projectReferenceTitles).toContain("Flota de transporte pesado");
  });

  it("includes natural answer snippets for search indexing", () => {
    const document = resolveCompanySearchDocument();

    expect(document.answerSnippets.length).toBeGreaterThan(0);
    expect(document.answerSnippets.some((snippet) => snippet.includes("diagnóstico técnico"))).toBe(
      true,
    );
    expect(
      document.faqQuestions.some((question) => question.includes("¿Qué hace diferente a OVI?")),
    ).toBe(true);
  });
});

describe("Company Knowledge — validation", () => {
  it("validates the official profile without errors", () => {
    const result = validateCompanyProfile();

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("still reports missing corporate sections that have no evidence", () => {
    const result = validateCompanyProfile();

    expect(result.warnings.some((warning) => warning.field === "certifications")).toBe(true);
  });

  it("detects duplicate experience project ids", () => {
    const profile = getCompanyProfile();
    const duplicate: CompanyProfile = {
      ...profile,
      experience: profile.experience && {
        ...profile.experience,
        projects: [
          ...(profile.experience.projects ?? []),
          {
            id: "case-001-flota-transporte-pesado",
            title: "Duplicado",
            status: "complete",
          },
        ],
      },
    };

    const result = validateCompanyProfile(duplicate);

    expect(result.valid).toBe(false);
    expect(result.errors.some((error) => error.field.includes("experience.projects"))).toBe(true);
  });

  it("detects broken service references", () => {
    const profile = getCompanyProfile();
    const broken: CompanyProfile = {
      ...profile,
      serviceReferences: [
        ...(profile.serviceReferences ?? []),
        { serviceId: "servicio-inexistente", label: "Inexistente" },
      ],
    };

    const result = validateCompanyProfile(broken);

    expect(result.valid).toBe(false);
    expect(
      result.errors.some((error) =>
        error.field.includes("serviceReferences[servicio-inexistente]"),
      ),
    ).toBe(true);
  });

  it("detects broken industry references", () => {
    const profile = getCompanyProfile();
    const broken: CompanyProfile = {
      ...profile,
      industryReferences: [
        ...(profile.industryReferences ?? []),
        { industryId: "industria-inexistente", label: "Industria inexistente" },
      ],
    };

    const result = validateCompanyProfile(broken);

    expect(result.valid).toBe(false);
    expect(
      result.errors.some((error) =>
        error.field.includes("industryReferences[industria-inexistente]"),
      ),
    ).toBe(true);
  });

  it("detects published timeline events without date or source reference", () => {
    const profile = getCompanyProfile();
    const broken: CompanyProfile = {
      ...profile,
      history: profile.history && {
        ...profile.history,
        timeline: [
          {
            event: "Evento inválido",
            publicationStatus: "published",
            verificationStatus: "source_confirmed",
            sources: [],
          },
        ],
      },
    };

    const result = validateCompanyProfile(broken);

    expect(result.valid).toBe(false);
    expect(result.errors.some((error) => error.field.includes("history.timeline[0].date"))).toBe(
      true,
    );
    expect(
      result.errors.some((error) => error.field.includes("history.timeline[0].sourceReference")),
    ).toBe(true);
  });
});

describe("Company Knowledge — publication governance", () => {
  it("publishes FAQs only when answers exist", () => {
    const faqs = getPublishedFAQs();

    expect(faqs.length).toBeGreaterThan(0);
    expect(faqs.every((faq) => faq.answer)).toBe(true);
  });

  it("does not reintroduce the forbidden OVI Ventures brand", () => {
    expect(getBrandName()).not.toContain("Ventures");
  });
});
