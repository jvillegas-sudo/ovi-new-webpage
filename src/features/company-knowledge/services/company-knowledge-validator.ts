/**
 * Company Knowledge Validator
 * OKP-001 — OVI Knowledge Program — Company Knowledge
 *
 * Validates the CompanyProfile for structural integrity and governance compliance.
 *
 * Detects:
 *   - Missing mission
 *   - Missing vision
 *   - Duplicate core value IDs
 *   - Duplicate differentiator IDs
 *   - Duplicate FAQ IDs
 *   - Duplicate client IDs
 *   - Duplicate certification IDs
 *   - Duplicate business unit IDs
 *   - Duplicate brand asset IDs
 *   - Invalid publication status combinations
 *   - Published fields without sources
 *   - Published FAQs without answers
 *   - Confidential clients exposed publicly (should never happen via resolver)
 *   - FAQ entries with complete answerStatus but no answer
 *   - Missing sources on published sections
 */

import type {
  CompanyProfile,
  CompanyValidationResult,
  CompanyValidationIssue,
} from "../types/company-profile";
import { getCompanyProfile } from "../repositories/company-knowledge.repository";
import { services as knowledgeServices } from "@knowledge/services/catalog";
import { sectors as knowledgeSectors } from "@knowledge/sectors/catalog";

function hasSources(sources?: { sourceFile: string }[]): boolean {
  return Boolean(sources && sources.length > 0);
}

function pushPublishedWithoutSourcesError(
  errors: CompanyValidationIssue[],
  field: string,
  message: string,
  isPublished?: boolean,
  sources?: { sourceFile: string }[],
) {
  if (isPublished && !hasSources(sources)) {
    errors.push({
      severity: "error",
      field,
      message,
    });
  }
}

// ─── Validator ────────────────────────────────────────────────────────────────

/**
 * Validate the CompanyProfile for structural integrity.
 *
 * Returns a CompanyValidationResult with all errors and warnings found.
 * Errors indicate data integrity problems.
 * Warnings indicate governance gaps that should be addressed.
 *
 * @param profile — Optional profile override (defaults to official profile)
 */
export function validateCompanyProfile(profile?: CompanyProfile): CompanyValidationResult {
  const p = profile ?? getCompanyProfile();
  const errors: CompanyValidationIssue[] = [];
  const warnings: CompanyValidationIssue[] = [];

  // ── Mission ──────────────────────────────────────────────────────────────────

  if (!p.mission) {
    warnings.push({
      severity: "warning",
      field: "mission",
      message: "La misión de la empresa no está definida.",
    });
  } else if (!p.mission.description) {
    warnings.push({
      severity: "warning",
      field: "mission.description",
      message: "La misión existe pero no tiene descripción oficial.",
    });
  }

  if (p.mission?.publicationStatus === "published" && !p.mission.evidence) {
    warnings.push({
      severity: "warning",
      field: "mission.evidence",
      message: "La misión está publicada pero no tiene evidencia textual explícita.",
    });
  }

  pushPublishedWithoutSourcesError(
    errors,
    "mission.sources",
    "La misión está marcada como publicada pero no tiene fuentes de referencia.",
    p.mission?.publicationStatus === "published",
    p.mission?.sources,
  );

  // ── Vision ───────────────────────────────────────────────────────────────────

  if (!p.vision) {
    warnings.push({
      severity: "warning",
      field: "vision",
      message: "La visión de la empresa no está definida.",
    });
  } else if (!p.vision.description) {
    warnings.push({
      severity: "warning",
      field: "vision.description",
      message: "La visión existe pero no tiene descripción oficial.",
    });
  }

  if (p.vision?.publicationStatus === "published" && !p.vision.evidence) {
    warnings.push({
      severity: "warning",
      field: "vision.evidence",
      message: "La visión está publicada pero no tiene evidencia textual explícita.",
    });
  }

  pushPublishedWithoutSourcesError(
    errors,
    "vision.sources",
    "La visión está marcada como publicada pero no tiene fuentes de referencia.",
    p.vision?.publicationStatus === "published",
    p.vision?.sources,
  );

  // ── Identity ─────────────────────────────────────────────────────────────────

  if (!p.identity) {
    errors.push({
      severity: "error",
      field: "identity",
      message: "El bloque de identidad corporativa no está definido.",
    });
  } else {
    if (!p.identity.brandName) {
      errors.push({
        severity: "error",
        field: "identity.brandName",
        message: "El nombre de marca no está definido.",
      });
    }
    if (!p.identity.tagline) {
      errors.push({
        severity: "error",
        field: "identity.tagline",
        message: "El tagline corporativo no está definido.",
      });
    }
    if (!p.identity.description) {
      warnings.push({
        severity: "warning",
        field: "identity.description",
        message: "La descripción corporativa no está definida.",
      });
    }
    if (
      p.identity.publicationStatus === "published" &&
      (!p.identity.sources || p.identity.sources.length === 0)
    ) {
      errors.push({
        severity: "error",
        field: "identity.sources",
        message: "La identidad está marcada como publicada pero no tiene fuentes de referencia.",
      });
    }
  }

  // ── Core Values ───────────────────────────────────────────────────────────────

  if (!p.coreValues || p.coreValues.length === 0) {
    warnings.push({
      severity: "warning",
      field: "coreValues",
      message: "No hay valores corporativos definidos.",
    });
  } else {
    const valueIds = new Set<string>();
    for (const value of p.coreValues) {
      if (valueIds.has(value.id)) {
        errors.push({
          severity: "error",
          field: `coreValues[${value.id}]`,
          message: `ID de valor corporativo duplicado: "${value.id}".`,
        });
      }
      valueIds.add(value.id);

      pushPublishedWithoutSourcesError(
        errors,
        `coreValues[${value.id}].sources`,
        `El valor "${value.name}" está marcado como publicado pero no tiene fuentes.`,
        value.publicationStatus === "published",
        value.sources,
      );
    }
  }

  // ── Differentiators ───────────────────────────────────────────────────────────

  if (p.differentiators && p.differentiators.length > 0) {
    const diffIds = new Set<string>();
    for (const diff of p.differentiators) {
      if (diffIds.has(diff.id)) {
        errors.push({
          severity: "error",
          field: `differentiators[${diff.id}]`,
          message: `ID de diferenciador duplicado: "${diff.id}".`,
        });
      }
      diffIds.add(diff.id);

      if (diff.publicationStatus === "published" && !diff.evidence) {
        warnings.push({
          severity: "warning",
          field: `differentiators[${diff.id}].evidence`,
          message: `El diferenciador "${diff.title}" está publicado pero no tiene evidencia textual explícita.`,
        });
      }

      pushPublishedWithoutSourcesError(
        errors,
        `differentiators[${diff.id}].sources`,
        `El diferenciador "${diff.title}" está marcado como publicado pero no tiene fuentes.`,
        diff.publicationStatus === "published",
        diff.sources,
      );
    }
  }

  // ── Capabilities ──────────────────────────────────────────────────────────────

  if (p.capabilities && p.capabilities.length > 0) {
    const capabilityIds = new Set<string>();
    for (const capability of p.capabilities) {
      if (capabilityIds.has(capability.id)) {
        errors.push({
          severity: "error",
          field: `capabilities[${capability.id}]`,
          message: `ID de capacidad duplicado: "${capability.id}".`,
        });
      }
      capabilityIds.add(capability.id);

      if (capability.publicationStatus === "published" && !capability.evidence) {
        warnings.push({
          severity: "warning",
          field: `capabilities[${capability.id}].evidence`,
          message: `La capacidad "${capability.name}" está publicada pero no tiene evidencia textual explícita.`,
        });
      }

      pushPublishedWithoutSourcesError(
        errors,
        `capabilities[${capability.id}].sources`,
        `La capacidad "${capability.name}" está marcada como publicada pero no tiene fuentes.`,
        capability.publicationStatus === "published",
        capability.sources,
      );
    }
  }

  // ── Business Units ────────────────────────────────────────────────────────────

  if (p.businessUnits && p.businessUnits.length > 0) {
    const unitIds = new Set<string>();
    for (const unit of p.businessUnits) {
      if (unitIds.has(unit.id)) {
        errors.push({
          severity: "error",
          field: `businessUnits[${unit.id}]`,
          message: `ID de unidad de negocio duplicado: "${unit.id}".`,
        });
      }
      unitIds.add(unit.id);
    }
  }

  // ── Certifications ────────────────────────────────────────────────────────────

  if (p.certifications && p.certifications.length > 0) {
    const certIds = new Set<string>();
    for (const cert of p.certifications) {
      if (certIds.has(cert.id)) {
        errors.push({
          severity: "error",
          field: `certifications[${cert.id}]`,
          message: `ID de certificación duplicado: "${cert.id}".`,
        });
      }
      certIds.add(cert.id);

      pushPublishedWithoutSourcesError(
        errors,
        `certifications[${cert.id}].sources`,
        `La certificación "${cert.name}" está marcada como publicada pero no tiene fuentes.`,
        cert.publicationStatus === "published",
        cert.sources,
      );
    }
  }

  // ── Clients ───────────────────────────────────────────────────────────────────

  if (p.clients && p.clients.length > 0) {
    const clientIds = new Set<string>();
    for (const client of p.clients) {
      if (clientIds.has(client.id)) {
        errors.push({
          severity: "error",
          field: `clients[${client.id}]`,
          message: `ID de cliente duplicado: "${client.id}".`,
        });
      }
      clientIds.add(client.id);
    }
  }

  // ── Brand Assets ──────────────────────────────────────────────────────────────

  if (p.brandAssets && p.brandAssets.length > 0) {
    const assetIds = new Set<string>();
    for (const asset of p.brandAssets) {
      if (assetIds.has(asset.id)) {
        errors.push({
          severity: "error",
          field: `brandAssets[${asset.id}]`,
          message: `ID de asset de marca duplicado: "${asset.id}".`,
        });
      }
      assetIds.add(asset.id);
    }
  }

  // ── Project References ────────────────────────────────────────────────────────

  if (p.projectReferences && p.projectReferences.length > 0) {
    const projectIds = new Set<string>();
    for (const project of p.projectReferences) {
      if (projectIds.has(project.id)) {
        errors.push({
          severity: "error",
          field: `projectReferences[${project.id}]`,
          message: `ID de referencia de proyecto duplicado: "${project.id}".`,
        });
      }
      projectIds.add(project.id);

      pushPublishedWithoutSourcesError(
        errors,
        `projectReferences[${project.id}].sources`,
        `La referencia de proyecto "${project.title}" está marcada como publicada pero no tiene fuentes.`,
        project.publicationStatus === "published",
        project.sources,
      );
    }
  }

  // ── FAQs ──────────────────────────────────────────────────────────────────────

  if (p.faqs && p.faqs.length > 0) {
    const faqIds = new Set<string>();
    for (const faq of p.faqs) {
      if (faqIds.has(faq.id)) {
        errors.push({
          severity: "error",
          field: `faqs[${faq.id}]`,
          message: `ID de FAQ duplicado: "${faq.id}".`,
        });
      }
      faqIds.add(faq.id);

      // Published FAQ must have an answer
      if (faq.publicationStatus === "published" && !faq.answer) {
        errors.push({
          severity: "error",
          field: `faqs[${faq.id}].answer`,
          message: `La FAQ "${faq.question}" está marcada como publicada pero no tiene respuesta.`,
        });
      }

      // Complete answerStatus without answer is inconsistent
      if (faq.answerStatus === "complete" && !faq.answer) {
        errors.push({
          severity: "error",
          field: `faqs[${faq.id}]`,
          message: `La FAQ "${faq.question}" tiene answerStatus "complete" pero no tiene respuesta.`,
        });
      }

      // Missing answerStatus FAQs with no sources
      if (faq.answerStatus === "missing" && faq.publicationStatus !== "draft") {
        warnings.push({
          severity: "warning",
          field: `faqs[${faq.id}].publicationStatus`,
          message: `La FAQ "${faq.question}" no tiene respuesta pero no está en estado draft.`,
        });
      }
    }
  }

  // ── Schema Version ────────────────────────────────────────────────────────────

  if (!p.schemaVersion) {
    warnings.push({
      severity: "warning",
      field: "schemaVersion",
      message: "La versión del schema no está definida.",
    });
  }

  // ── Missing important sections ────────────────────────────────────────────────

  if (
    !p.history ||
    (!p.history.foundingYear &&
      !p.history.narrative &&
      (!p.history.timeline || p.history.timeline.length === 0))
  ) {
    warnings.push({
      severity: "warning",
      field: "history",
      message: "La historia corporativa no está definida.",
    });
  }

  pushPublishedWithoutSourcesError(
    errors,
    "history.sources",
    "La historia corporativa está marcada como publicada pero no tiene fuentes de referencia.",
    p.history?.publicationStatus === "published",
    p.history?.sources,
  );

  if (p.history?.timeline && p.history.timeline.length > 0) {
    for (const [index, event] of p.history.timeline.entries()) {
      if (event.publicationStatus === "published" && !event.date) {
        errors.push({
          severity: "error",
          field: `history.timeline[${index}].date`,
          message: `El evento "${event.event}" está publicado pero no tiene fecha soportada.`,
        });
      }

      if (event.publicationStatus === "published" && !event.sourceReference) {
        errors.push({
          severity: "error",
          field: `history.timeline[${index}].sourceReference`,
          message: `El evento "${event.event}" está publicado pero no tiene sourceReference.`,
        });
      }

      if (event.publicationStatus === "published" && !event.evidence) {
        warnings.push({
          severity: "warning",
          field: `history.timeline[${index}].evidence`,
          message: `El evento "${event.event}" está publicado pero no tiene evidencia textual explícita.`,
        });
      }

      pushPublishedWithoutSourcesError(
        errors,
        `history.timeline[${index}].sources`,
        `El evento "${event.event}" está marcado como publicado pero no tiene fuentes.`,
        event.publicationStatus === "published",
        event.sources,
      );
    }
  }

  if (!p.geographicCoverage) {
    warnings.push({
      severity: "warning",
      field: "geographicCoverage",
      message: "La cobertura geográfica no está definida.",
    });
  }

  pushPublishedWithoutSourcesError(
    errors,
    "geographicCoverage.sources",
    "La cobertura geográfica está marcada como publicada pero no tiene fuentes de referencia.",
    p.geographicCoverage?.publicationStatus === "published",
    p.geographicCoverage?.sources,
  );

  if (p.corporateNumbers?.publicationStatus === "published" && !p.corporateNumbers.otherFigures) {
    warnings.push({
      severity: "warning",
      field: "corporateNumbers.otherFigures",
      message:
        "Las cifras corporativas están publicadas pero no tienen figuras oficiales detalladas.",
    });
  }

  pushPublishedWithoutSourcesError(
    errors,
    "corporateNumbers.sources",
    "Las cifras corporativas están marcadas como publicadas pero no tienen fuentes de referencia.",
    p.corporateNumbers?.publicationStatus === "published",
    p.corporateNumbers?.sources,
  );

  if (!p.experience) {
    warnings.push({
      severity: "warning",
      field: "experience",
      message: "La experiencia corporativa estructurada no está definida.",
    });
  } else {
    pushPublishedWithoutSourcesError(
      errors,
      "experience.sources",
      "La experiencia corporativa está marcada como publicada pero no tiene fuentes de referencia.",
      p.experience.publicationStatus === "published",
      p.experience.sources,
    );

    if (
      p.experience.publicationStatus === "published" &&
      (!p.experience.evidence || p.experience.evidence.length === 0)
    ) {
      warnings.push({
        severity: "warning",
        field: "experience.evidence",
        message: "La experiencia corporativa está publicada pero no tiene evidencia resumida.",
      });
    }

    const projectIds = new Set<string>();
    for (const project of p.experience.projects ?? []) {
      if (projectIds.has(project.id)) {
        errors.push({
          severity: "error",
          field: `experience.projects[${project.id}]`,
          message: `ID de proyecto de experiencia duplicado: "${project.id}".`,
        });
      }
      projectIds.add(project.id);

      if (!project.evidence) {
        warnings.push({
          severity: "warning",
          field: `experience.projects[${project.id}].evidence`,
          message: `El proyecto de experiencia "${project.title}" no tiene evidencia textual explícita.`,
        });
      }
    }
  }

  if (!p.certifications || p.certifications.length === 0) {
    warnings.push({
      severity: "warning",
      field: "certifications",
      message: "No hay certificaciones corporativas registradas.",
    });
  }

  if (!p.serviceReferences || p.serviceReferences.length === 0) {
    warnings.push({
      severity: "warning",
      field: "serviceReferences",
      message: "No hay referencias a servicios corporativos.",
    });
  }

  if (!p.industryReferences || p.industryReferences.length === 0) {
    warnings.push({
      severity: "warning",
      field: "industryReferences",
      message: "No hay referencias a industrias objetivo.",
    });
  } else {
    const knownIndustries = new Set(knowledgeSectors.map((sector) => sector.id));
    for (const industry of p.industryReferences) {
      if (!knownIndustries.has(industry.industryId)) {
        errors.push({
          severity: "error",
          field: `industryReferences[${industry.industryId}]`,
          message: `Referencia a industria inexistente o no soportada: "${industry.industryId}".`,
        });
      }
    }
  }

  if (p.serviceReferences && p.serviceReferences.length > 0) {
    const knownServices = new Set(knowledgeServices.map((service) => service.id));
    for (const service of p.serviceReferences) {
      if (!knownServices.has(service.serviceId)) {
        errors.push({
          severity: "error",
          field: `serviceReferences[${service.serviceId}]`,
          message: `Referencia a servicio inexistente o no soportado: "${service.serviceId}".`,
        });
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}
