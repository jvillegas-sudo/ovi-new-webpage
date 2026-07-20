export type {
  InformationStatus,
  PublicationStatus,
  VerificationStatus,
  SourceType,
  SourceReference,
  ServiceRelationshipSet,
  ServiceFAQEntry,
  ServiceKnowledge,
  PublicServiceView,
  ServiceAIContext,
  ServiceSearchDocument,
  ServiceValidationError,
  ServiceValidationResult,
} from "./types";

export {
  SERVICE_KNOWLEDGE_REGISTRY,
  SERVICE_KNOWLEDGE_MAP,
  TOTAL_KNOWLEDGE_SERVICES,
} from "./data/services-knowledge-data";

export {
  getAllServicesKnowledge,
  getServiceKnowledgeById,
  getPublishedServicesKnowledge,
  getServicesKnowledgeByIndustry,
  getServicesKnowledgeByProduct,
  getServicesKnowledgeByPublicationStatus,
  getServicesKnowledgeCount,
  hasServiceKnowledgeRecord,
} from "./repositories/services-knowledge.repository";

export {
  resolvePublicService,
  resolvePublishedServicesPublicView,
  resolveServiceAIContext,
  resolveServiceSearchDocument,
  buildServiceSearchIndex,
} from "./services/services-knowledge-resolver";

export { validateServicesKnowledge } from "./services/services-knowledge-validator";
