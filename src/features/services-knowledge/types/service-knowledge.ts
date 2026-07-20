import type {
  InformationStatus,
  PublicationStatus,
  VerificationStatus,
} from "@features/product-knowledge/types/knowledge-governance";
import type { SourceReference } from "@features/product-knowledge/types/source-reference";

export interface ServiceRelationshipSet {
  productIds: string[];
  industryIds: string[];
  projectIds: string[];
  /** WO-005: Explicit case study cross-references */
  caseStudyIds: string[];
  customerIds: string[];
  documentIds: string[];
  engineeringProtocolIds: string[];
  engineeringEquipmentIds: string[];
  futureTrainingIds: string[];
  futureRegulatoryIds: string[];
}

export interface ServiceFAQEntry {
  question: string;
  answer: string | null;
}

export interface ServiceKnowledge {
  serviceId: string;
  officialName: string;
  shortDescription: string | null;
  businessDescription: string | null;
  purpose: string | null;
  customerProblems: string[];
  industries: string[];
  products: string[];
  engineeringProtocols: string[];
  equipment: string[];
  deliverables: string[];
  relatedProjects: string[];
  relatedDocuments: string[];
  relatedCustomers: string[];
  /** WO-005: Explicit case study cross-references */
  caseStudyIds: string[];
  images: string[];
  videos: string[];
  faqs: ServiceFAQEntry[];
  operationalNotes: string | null;
  commercialBenefits: string[];
  technicalBenefits: string[];
  differentiators: string[];
  requiredSkills: string[];
  executionSteps: string[];
  kpis: string[];
  publicationStatus: PublicationStatus;
  verificationStatus: VerificationStatus;
  informationStatus: InformationStatus;
  sourceReferences: SourceReference[];
  revision: number;
  version: string;
  relationships: ServiceRelationshipSet;
}

export interface PublicServiceView {
  serviceId: string;
  officialName: string;
  shortDescription: string | null;
  businessDescription: string | null;
  purpose: string | null;
  customerProblems: string[];
  industries: string[];
  products: string[];
  engineeringProtocols: string[];
  equipment: string[];
  deliverables: string[];
  relatedProjects: string[];
  relatedDocuments: string[];
  relatedCustomers: string[];
  /** WO-005: Explicit case study cross-references */
  caseStudyIds: string[];
  images: string[];
  videos: string[];
  faqs: ServiceFAQEntry[];
  operationalNotes: string | null;
  commercialBenefits: string[];
  technicalBenefits: string[];
  differentiators: string[];
  requiredSkills: string[];
  executionSteps: string[];
  kpis: string[];
  informationStatus: InformationStatus;
  version: string;
  relationships: ServiceRelationshipSet;
}

export interface ServiceAIContext {
  serviceId: string;
  officialName: string;
  purpose: string | null;
  businessValue: string[];
  problemsSolved: string[];
  productsInvolved: string[];
  industries: string[];
  capabilities: string[];
}

export interface ServiceSearchDocument {
  id: string;
  officialName: string;
  shortDescription: string | null;
  purpose: string | null;
  customerProblems: string[];
  industries: string[];
  products: string[];
  keywords: string[];
}

export interface ServiceValidationError {
  serviceId: string;
  code:
    | "DUPLICATE_ID"
    | "MISSING_SOURCES"
    | "BROKEN_REFERENCE"
    | "PUBLISHED_WITHOUT_EVIDENCE"
    | "INVALID_RELATIONSHIP"
    | "INVALID_PUBLICATION_STATUS";
  message: string;
}

export interface ServiceValidationResult {
  isValid: boolean;
  errors: ServiceValidationError[];
  warnings: string[];
}
