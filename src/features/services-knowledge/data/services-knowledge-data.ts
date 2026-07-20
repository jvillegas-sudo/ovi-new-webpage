import { services as legacyServices } from "@knowledge/services/catalog";
import type { ServiceKnowledge } from "../types/service-knowledge";

function createServiceKnowledgeRecord(service: (typeof legacyServices)[number]): ServiceKnowledge {
  return {
    serviceId: service.id,
    officialName: service.nombre,
    shortDescription: service.resumen ?? null,
    businessDescription: service.descripcion ?? null,
    purpose: null,
    customerProblems: [...service.problemasQueResuelve],
    industries: [...service.sectores],
    products: [...service.productosAsociados],
    engineeringProtocols: [...service.protocolosAsociados],
    equipment: [...service.equiposNecesarios],
    deliverables: [...service.entregables],
    relatedProjects: [],
    relatedDocuments: [],
    relatedCustomers: [],
    images: [],
    videos: [],
    faqs: [],
    operationalNotes: null,
    commercialBenefits: [...service.beneficios],
    technicalBenefits: [],
    differentiators: [],
    requiredSkills: [],
    executionSteps: [],
    kpis: [],
    publicationStatus: "published",
    verificationStatus: "source_confirmed",
    informationStatus: "partial",
    sourceReferences: [
      {
        sourceType: "knowledge_base_file",
        sourceFile: "src/knowledge/services/catalog.ts",
        sourcePage: null,
        sourceSection: service.id,
        verificationStatus: "source_confirmed",
        internalNote:
          "Service baseline imported from approved knowledge catalog without semantic changes.",
      },
    ],
    revision: 1,
    version: "1.0.0",
    relationships: {
      productIds: [...service.productosAsociados],
      industryIds: [...service.sectores],
      projectIds: [],
      customerIds: [],
      documentIds: [],
      engineeringProtocolIds: [...service.protocolosAsociados],
      engineeringEquipmentIds: [...service.equiposNecesarios],
      futureTrainingIds: [],
      futureRegulatoryIds: [],
    },
  };
}

export const SERVICE_KNOWLEDGE_REGISTRY: ServiceKnowledge[] = legacyServices.map((service) =>
  createServiceKnowledgeRecord(service),
);

export const SERVICE_KNOWLEDGE_MAP = new Map(
  SERVICE_KNOWLEDGE_REGISTRY.map((service) => [service.serviceId, service]),
);

export const TOTAL_KNOWLEDGE_SERVICES = SERVICE_KNOWLEDGE_REGISTRY.length;
