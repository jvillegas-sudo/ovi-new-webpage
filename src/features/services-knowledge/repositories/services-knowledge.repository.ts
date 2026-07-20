import type { PublicationStatus } from "@features/product-knowledge/types/knowledge-governance";
import { SERVICE_KNOWLEDGE_MAP, SERVICE_KNOWLEDGE_REGISTRY } from "../data/services-knowledge-data";
import type { ServiceKnowledge } from "../types/service-knowledge";

export function getAllServicesKnowledge(): ServiceKnowledge[] {
  return SERVICE_KNOWLEDGE_REGISTRY;
}

export function getServiceKnowledgeById(serviceId: string): ServiceKnowledge | undefined {
  return SERVICE_KNOWLEDGE_MAP.get(serviceId);
}

export function getPublishedServicesKnowledge(): ServiceKnowledge[] {
  return SERVICE_KNOWLEDGE_REGISTRY.filter((service) => service.publicationStatus === "published");
}

export function getServicesKnowledgeByIndustry(industryId: string): ServiceKnowledge[] {
  return SERVICE_KNOWLEDGE_REGISTRY.filter((service) => service.industries.includes(industryId));
}

export function getServicesKnowledgeByProduct(productId: string): ServiceKnowledge[] {
  return SERVICE_KNOWLEDGE_REGISTRY.filter((service) => service.products.includes(productId));
}

export function getServicesKnowledgeByPublicationStatus(
  publicationStatus: PublicationStatus,
): ServiceKnowledge[] {
  return SERVICE_KNOWLEDGE_REGISTRY.filter(
    (service) => service.publicationStatus === publicationStatus,
  );
}

export function getServicesKnowledgeCount(): number {
  return SERVICE_KNOWLEDGE_REGISTRY.length;
}

export function hasServiceKnowledgeRecord(serviceId: string): boolean {
  return SERVICE_KNOWLEDGE_MAP.has(serviceId);
}
