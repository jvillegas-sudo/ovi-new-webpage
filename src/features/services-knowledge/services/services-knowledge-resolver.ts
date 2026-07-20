import { normalizeSearchText } from "@features/product-search/utils/normalize-search-text";
import {
  getPublishedServicesKnowledge,
  getServiceKnowledgeById,
} from "../repositories/services-knowledge.repository";
import type {
  PublicServiceView,
  ServiceAIContext,
  ServiceKnowledge,
  ServiceSearchDocument,
} from "../types/service-knowledge";

function uniqueNormalizedTokens(values: string[]): string[] {
  const normalized = values.map((value) => normalizeSearchText(value)).filter(Boolean);
  return Array.from(new Set(normalized));
}

function buildDraftPublicServiceView(service: ServiceKnowledge): PublicServiceView {
  return {
    serviceId: service.serviceId,
    officialName: service.officialName,
    shortDescription: null,
    businessDescription: null,
    purpose: null,
    customerProblems: [],
    industries: [],
    products: [],
    engineeringProtocols: [],
    equipment: [],
    deliverables: [],
    relatedProjects: [],
    relatedDocuments: [],
    relatedCustomers: [],
    caseStudyIds: [],
    images: [],
    videos: [],
    faqs: [],
    operationalNotes: null,
    commercialBenefits: [],
    technicalBenefits: [],
    differentiators: [],
    requiredSkills: [],
    executionSteps: [],
    kpis: [],
    informationStatus: "minimal",
    version: service.version,
    relationships: {
      productIds: [],
      industryIds: [],
      projectIds: [],
      caseStudyIds: [],
      customerIds: [],
      documentIds: [],
      engineeringProtocolIds: [],
      engineeringEquipmentIds: [],
      futureTrainingIds: [],
      futureRegulatoryIds: [],
    },
  };
}

export function resolvePublicService(service: ServiceKnowledge): PublicServiceView {
  if (service.publicationStatus !== "published") {
    return buildDraftPublicServiceView(service);
  }

  return {
    serviceId: service.serviceId,
    officialName: service.officialName,
    shortDescription: service.shortDescription,
    businessDescription: service.businessDescription,
    purpose: service.purpose,
    customerProblems: [...service.customerProblems],
    industries: [...service.industries],
    products: [...service.products],
    engineeringProtocols: [...service.engineeringProtocols],
    equipment: [...service.equipment],
    deliverables: [...service.deliverables],
    relatedProjects: [...service.relatedProjects],
    relatedDocuments: [...service.relatedDocuments],
    relatedCustomers: [...service.relatedCustomers],
    caseStudyIds: [...service.caseStudyIds],
    images: [...service.images],
    videos: [...service.videos],
    faqs: [...service.faqs],
    operationalNotes: service.operationalNotes,
    commercialBenefits: [...service.commercialBenefits],
    technicalBenefits: [...service.technicalBenefits],
    differentiators: [...service.differentiators],
    requiredSkills: [...service.requiredSkills],
    executionSteps: [...service.executionSteps],
    kpis: [...service.kpis],
    informationStatus: service.informationStatus,
    version: service.version,
    relationships: {
      productIds: [...service.relationships.productIds],
      industryIds: [...service.relationships.industryIds],
      projectIds: [...service.relationships.projectIds],
      caseStudyIds: [...service.relationships.caseStudyIds],
      customerIds: [...service.relationships.customerIds],
      documentIds: [...service.relationships.documentIds],
      engineeringProtocolIds: [...service.relationships.engineeringProtocolIds],
      engineeringEquipmentIds: [...service.relationships.engineeringEquipmentIds],
      futureTrainingIds: [...service.relationships.futureTrainingIds],
      futureRegulatoryIds: [...service.relationships.futureRegulatoryIds],
    },
  };
}

export function resolvePublishedServicesPublicView(): PublicServiceView[] {
  return getPublishedServicesKnowledge().map(resolvePublicService);
}

export function resolveServiceAIContext(serviceId: string): ServiceAIContext | null {
  const service = getServiceKnowledgeById(serviceId);
  if (!service || service.publicationStatus !== "published") {
    return null;
  }

  const capabilities = Array.from(
    new Set([
      ...service.equipment,
      ...service.engineeringProtocols,
      ...service.deliverables,
      ...service.executionSteps,
      ...service.requiredSkills,
    ]),
  );

  return {
    serviceId: service.serviceId,
    officialName: service.officialName,
    purpose: service.purpose,
    businessValue: [...service.commercialBenefits, ...service.technicalBenefits],
    problemsSolved: [...service.customerProblems],
    productsInvolved: [...service.products],
    industries: [...service.industries],
    capabilities,
  };
}

export function resolveServiceSearchDocument(
  service: ServiceKnowledge,
): ServiceSearchDocument | null {
  if (service.publicationStatus !== "published") {
    return null;
  }

  const keywords = uniqueNormalizedTokens([
    service.officialName,
    service.shortDescription ?? "",
    service.businessDescription ?? "",
    service.purpose ?? "",
    ...service.customerProblems,
    ...service.industries,
    ...service.products,
    ...service.engineeringProtocols,
    ...service.equipment,
    ...service.deliverables,
  ]);

  return {
    id: service.serviceId,
    officialName: service.officialName,
    shortDescription: service.shortDescription,
    purpose: service.purpose,
    customerProblems: [...service.customerProblems],
    industries: [...service.industries],
    products: [...service.products],
    keywords,
  };
}

export function buildServiceSearchIndex(): ServiceSearchDocument[] {
  return getPublishedServicesKnowledge()
    .map(resolveServiceSearchDocument)
    .filter((document): document is ServiceSearchDocument => document !== null);
}
