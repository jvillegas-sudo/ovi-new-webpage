/**
 * Product Knowledge Types — Public API
 * Work Order 008A — OVI Product Knowledge Engine
 */

export type {
  VerificationStatus,
  PublicationStatus,
  InformationStatus,
} from "./knowledge-governance";

export type { SourceType, SourceReference } from "./source-reference";

export type {
  PresentationAvailabilityStatus,
  ProductPresentation,
  DocumentType,
  ProductDocument,
  MediaType,
  ProductMedia,
  ProductKnowledge,
  PublicProductView,
  KnowledgeValidationError,
  KnowledgeValidationResult,
} from "./product-knowledge";
