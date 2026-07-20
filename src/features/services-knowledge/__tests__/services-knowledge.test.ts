import { describe, expect, it } from "vitest";
import {
  SERVICE_KNOWLEDGE_REGISTRY,
  TOTAL_KNOWLEDGE_SERVICES,
  buildServiceSearchIndex,
  getAllServicesKnowledge,
  getServiceKnowledgeById,
  getServicesKnowledgeByIndustry,
  hasServiceKnowledgeRecord,
  resolvePublicService,
  resolveServiceAIContext,
  validateServicesKnowledge,
} from "@features/services-knowledge";
import type { ServiceKnowledge } from "@features/services-knowledge";

describe("Services Knowledge — registry", () => {
  it("loads all approved services from the legacy source", () => {
    expect(TOTAL_KNOWLEDGE_SERVICES).toBe(10);
    expect(getAllServicesKnowledge()).toHaveLength(10);
  });

  it("keeps service ids unique", () => {
    const ids = SERVICE_KNOWLEDGE_REGISTRY.map((service) => service.serviceId);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("resolves a known service record", () => {
    const service = getServiceKnowledgeById("lavado-flota");
    expect(service).toBeDefined();
    expect(service?.officialName).toBe("Servicio de Lavado de Flota");
    expect(service?.publicationStatus).toBe("published");
  });

  it("supports industry queries", () => {
    const transporteServices = getServicesKnowledgeByIndustry("transporte");
    expect(transporteServices.length).toBeGreaterThan(0);
    expect(transporteServices.every((service) => service.industries.includes("transporte"))).toBe(
      true,
    );
  });

  it("detects service existence by stable id", () => {
    expect(hasServiceKnowledgeRecord("diagnostico-tecnico")).toBe(true);
    expect(hasServiceKnowledgeRecord("servicio-inexistente")).toBe(false);
  });
});

describe("Services Knowledge — resolver", () => {
  it("enriches methodology fields using official service sources", () => {
    const service = getServiceKnowledgeById("lavado-flota")!;

    expect(service.purpose).toContain("lavado técnico");
    expect(service.executionSteps.length).toBeGreaterThan(0);
    expect(service.kpis).toContain("Tiempo de ciclo por unidad");
    expect(service.relatedProjects).toContain("case-001");
  });

  it("builds a public service view for published services", () => {
    const service = getServiceKnowledgeById("diagnostico-tecnico")!;
    const publicView = resolvePublicService(service);

    expect(publicView.serviceId).toBe("diagnostico-tecnico");
    expect(publicView.customerProblems.length).toBeGreaterThan(0);
    expect(publicView.relationships.industryIds).toEqual(service.industries);
  });

  it("does not expose unpublished draft fields", () => {
    const base = getServiceKnowledgeById("lavado-flota")!;
    const draftService: ServiceKnowledge = {
      ...base,
      publicationStatus: "draft",
      shortDescription: "INTERNAL DRAFT",
      businessDescription: "INTERNAL DRAFT",
      customerProblems: ["INTERNAL"],
      commercialBenefits: ["INTERNAL"],
    };

    const publicView = resolvePublicService(draftService);
    expect(publicView.shortDescription).toBeNull();
    expect(publicView.businessDescription).toBeNull();
    expect(publicView.customerProblems).toHaveLength(0);
    expect(publicView.commercialBenefits).toHaveLength(0);
  });

  it("builds AI context for published services only", () => {
    const context = resolveServiceAIContext("limpieza-industrial");
    expect(context).not.toBeNull();
    expect(context?.problemsSolved.length).toBeGreaterThan(0);
    expect(context?.productsInvolved).toBeDefined();
  });

  it("search index includes only published services", () => {
    const documents = buildServiceSearchIndex();
    expect(documents).toHaveLength(TOTAL_KNOWLEDGE_SERVICES);
    expect(documents.some((document) => document.id === "lavado-flota")).toBe(true);
    expect(documents.every((document) => document.keywords.length > 0)).toBe(true);

    const lavadoFlotaDoc = documents.find((document) => document.id === "lavado-flota");
    expect(lavadoFlotaDoc?.keywords.some((keyword) => keyword.includes("trazabilidad"))).toBe(true);
  });
});

describe("Services Knowledge — validator", () => {
  it("validates current registry successfully", () => {
    const result = validateServicesKnowledge();
    if (!result.isValid) {
      console.error(result.errors);
    }
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("detects duplicate ids", () => {
    const base = SERVICE_KNOWLEDGE_REGISTRY[0]!;
    const duplicate: ServiceKnowledge = {
      ...SERVICE_KNOWLEDGE_REGISTRY[1]!,
      serviceId: base.serviceId,
    };

    const result = validateServicesKnowledge([base, duplicate]);
    expect(result.errors.some((error) => error.code === "DUPLICATE_ID")).toBe(true);
  });

  it("detects missing source references", () => {
    const base = SERVICE_KNOWLEDGE_REGISTRY[0]!;
    const invalid: ServiceKnowledge = {
      ...base,
      sourceReferences: [],
    };

    const result = validateServicesKnowledge([invalid]);
    expect(result.errors.some((error) => error.code === "MISSING_SOURCES")).toBe(true);
  });

  it("detects broken relationship references", () => {
    const base = SERVICE_KNOWLEDGE_REGISTRY[0]!;
    const invalid: ServiceKnowledge = {
      ...base,
      products: ["producto-inexistente"],
      relationships: {
        ...base.relationships,
        productIds: ["producto-inexistente"],
      },
    };

    const result = validateServicesKnowledge([invalid]);
    expect(result.errors.some((error) => error.code === "BROKEN_REFERENCE")).toBe(true);
  });

  it("detects invalid relationship mappings", () => {
    const base = SERVICE_KNOWLEDGE_REGISTRY[0]!;
    const invalid: ServiceKnowledge = {
      ...base,
      relationships: {
        ...base.relationships,
        industryIds: [],
      },
    };

    const result = validateServicesKnowledge([invalid]);
    expect(result.errors.some((error) => error.code === "INVALID_RELATIONSHIP")).toBe(true);
  });

  it("detects invalid publication status", () => {
    const base = SERVICE_KNOWLEDGE_REGISTRY[0]!;
    const invalid: ServiceKnowledge = {
      ...base,
      publicationStatus: "published",
      verificationStatus: "unverified",
    };

    const result = validateServicesKnowledge([invalid]);
    expect(result.errors.some((error) => error.code === "INVALID_PUBLICATION_STATUS")).toBe(true);
  });

  it("detects published services without evidence", () => {
    const base = SERVICE_KNOWLEDGE_REGISTRY[0]!;
    const invalid: ServiceKnowledge = {
      ...base,
      sourceReferences: [
        {
          ...base.sourceReferences[0]!,
          verificationStatus: "unverified",
        },
      ],
    };

    const result = validateServicesKnowledge([invalid]);
    expect(result.errors.some((error) => error.code === "PUBLISHED_WITHOUT_EVIDENCE")).toBe(true);
  });
});
