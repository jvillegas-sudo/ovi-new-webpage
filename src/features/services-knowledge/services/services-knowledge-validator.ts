import { getCompanyProfile } from "@features/company-knowledge/repositories/company-knowledge.repository";
import { documents as knowledgeDocuments } from "@knowledge/documents";
import { equipment as knowledgeEquipment } from "@knowledge/equipment/catalog";
import { officialProducts } from "@knowledge/products/official-catalog";
import { protocols as knowledgeProtocols } from "@knowledge/protocols/catalog";
import { sectors as knowledgeSectors } from "@knowledge/sectors/catalog";
import { SERVICE_KNOWLEDGE_REGISTRY } from "../data/services-knowledge-data";
import type {
  ServiceKnowledge,
  ServiceValidationError,
  ServiceValidationResult,
} from "../types/service-knowledge";

function hasConfirmedSource(service: ServiceKnowledge): boolean {
  return service.sourceReferences.some(
    (reference) =>
      reference.verificationStatus === "source_confirmed" ||
      reference.verificationStatus === "technically_verified",
  );
}

function isKebabCaseId(value: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

function pushBrokenReferenceError(
  errors: ServiceValidationError[],
  serviceId: string,
  relationshipField: string,
  referenceId: string,
): void {
  errors.push({
    serviceId,
    code: "BROKEN_REFERENCE",
    message: `Service "${serviceId}" has broken reference "${referenceId}" in ${relationshipField}.`,
  });
}

function pushInvalidRelationshipError(
  errors: ServiceValidationError[],
  serviceId: string,
  message: string,
): void {
  errors.push({
    serviceId,
    code: "INVALID_RELATIONSHIP",
    message,
  });
}

export function validateServicesKnowledge(
  registry: ServiceKnowledge[] = SERVICE_KNOWLEDGE_REGISTRY,
): ServiceValidationResult {
  const errors: ServiceValidationError[] = [];
  const warnings: string[] = [];

  const serviceIds = new Set<string>();
  const companyProfile = getCompanyProfile();

  const knownProductIds = new Set(officialProducts.map((product) => product.id));
  const knownIndustryIds = new Set(knowledgeSectors.map((sector) => sector.id));
  const knownProtocolIds = new Set(knowledgeProtocols.map((protocol) => protocol.id));
  const knownEquipmentIds = new Set(knowledgeEquipment.map((item) => item.id));
  const knownDocumentIds = new Set(knowledgeDocuments.map((document) => document.id));
  const knownProjectIds = new Set([
    ...(companyProfile.projectReferences ?? []).map((project) => project.id),
    ...(companyProfile.experience?.projects ?? []).map((project) => project.id),
  ]);
  const knownCustomerIds = new Set((companyProfile.clients ?? []).map((client) => client.id));

  for (const service of registry) {
    if (serviceIds.has(service.serviceId)) {
      errors.push({
        serviceId: service.serviceId,
        code: "DUPLICATE_ID",
        message: `Duplicate service ID detected: "${service.serviceId}".`,
      });
    }
    serviceIds.add(service.serviceId);

    if (service.sourceReferences.length === 0) {
      errors.push({
        serviceId: service.serviceId,
        code: "MISSING_SOURCES",
        message: `Service "${service.serviceId}" has no source references.`,
      });
    }

    if (
      service.publicationStatus === "published" &&
      (service.verificationStatus === "unverified" ||
        service.verificationStatus === "technical_review_required")
    ) {
      errors.push({
        serviceId: service.serviceId,
        code: "INVALID_PUBLICATION_STATUS",
        message: `Service "${service.serviceId}" cannot be published with verificationStatus "${service.verificationStatus}".`,
      });
    }

    const hasPublishedClaims =
      service.shortDescription !== null ||
      service.businessDescription !== null ||
      service.purpose !== null ||
      service.customerProblems.length > 0 ||
      service.commercialBenefits.length > 0 ||
      service.technicalBenefits.length > 0;

    if (
      service.publicationStatus === "published" &&
      hasPublishedClaims &&
      !hasConfirmedSource(service)
    ) {
      errors.push({
        serviceId: service.serviceId,
        code: "PUBLISHED_WITHOUT_EVIDENCE",
        message: `Service "${service.serviceId}" is published with claims but has no confirmed source reference.`,
      });
    }

    const relationshipChecks: Array<{
      field: string;
      ids: string[];
      knownIds: Set<string>;
      allowUnknown: boolean;
    }> = [
      { field: "products", ids: service.products, knownIds: knownProductIds, allowUnknown: false },
      {
        field: "industries",
        ids: service.industries,
        knownIds: knownIndustryIds,
        allowUnknown: false,
      },
      {
        field: "engineeringProtocols",
        ids: service.engineeringProtocols,
        knownIds: knownProtocolIds,
        allowUnknown: false,
      },
      {
        field: "equipment",
        ids: service.equipment,
        knownIds: knownEquipmentIds,
        allowUnknown: false,
      },
      {
        field: "relatedProjects",
        ids: service.relatedProjects,
        knownIds: knownProjectIds,
        allowUnknown: false,
      },
      {
        field: "relatedCustomers",
        ids: service.relatedCustomers,
        knownIds: knownCustomerIds,
        allowUnknown: false,
      },
      {
        field: "relatedDocuments",
        ids: service.relatedDocuments,
        knownIds: knownDocumentIds,
        allowUnknown: knownDocumentIds.size === 0,
      },
    ];

    for (const relationship of relationshipChecks) {
      const seen = new Set<string>();
      for (const id of relationship.ids) {
        if (seen.has(id)) {
          pushInvalidRelationshipError(
            errors,
            service.serviceId,
            `Service "${service.serviceId}" has duplicate relationship ID "${id}" in ${relationship.field}.`,
          );
          continue;
        }
        seen.add(id);

        if (!relationship.allowUnknown && !relationship.knownIds.has(id)) {
          pushBrokenReferenceError(errors, service.serviceId, relationship.field, id);
        }
      }
    }

    const relationshipPairs: Array<[string[], string[], string]> = [
      [service.products, service.relationships.productIds, "products"],
      [service.industries, service.relationships.industryIds, "industries"],
      [service.relatedProjects, service.relationships.projectIds, "relatedProjects"],
      [service.relatedCustomers, service.relationships.customerIds, "relatedCustomers"],
      [service.relatedDocuments, service.relationships.documentIds, "relatedDocuments"],
      [
        service.engineeringProtocols,
        service.relationships.engineeringProtocolIds,
        "engineeringProtocols",
      ],
      [service.equipment, service.relationships.engineeringEquipmentIds, "equipment"],
    ];

    for (const [source, target, label] of relationshipPairs) {
      const sourceSorted = [...source].sort();
      const targetSorted = [...target].sort();
      if (sourceSorted.length !== targetSorted.length) {
        pushInvalidRelationshipError(
          errors,
          service.serviceId,
          `Service "${service.serviceId}" has inconsistent relationship mapping for ${label}.`,
        );
        continue;
      }
      for (let i = 0; i < sourceSorted.length; i++) {
        if (sourceSorted[i] !== targetSorted[i]) {
          pushInvalidRelationshipError(
            errors,
            service.serviceId,
            `Service "${service.serviceId}" has inconsistent relationship mapping for ${label}.`,
          );
          break;
        }
      }
    }

    for (const id of service.relationships.futureTrainingIds) {
      if (!isKebabCaseId(id)) {
        pushInvalidRelationshipError(
          errors,
          service.serviceId,
          `Future training reference "${id}" in service "${service.serviceId}" must use stable kebab-case identifier.`,
        );
      }
    }

    for (const id of service.relationships.futureRegulatoryIds) {
      if (!isKebabCaseId(id)) {
        pushInvalidRelationshipError(
          errors,
          service.serviceId,
          `Future regulatory reference "${id}" in service "${service.serviceId}" must use stable kebab-case identifier.`,
        );
      }
    }

    if (service.publicationStatus !== "published" && service.informationStatus === "complete") {
      warnings.push(
        `Service "${service.serviceId}" is marked as complete but is not published; verify governance flow.`,
      );
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}
