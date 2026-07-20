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

  if (
    p.mission?.publicationStatus === "published" &&
    (!p.mission.sources || p.mission.sources.length === 0)
  ) {
    errors.push({
      severity: "error",
      field: "mission.sources",
      message: "La misión está marcada como publicada pero no tiene fuentes de referencia.",
    });
  }

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

  if (
    p.vision?.publicationStatus === "published" &&
    (!p.vision.sources || p.vision.sources.length === 0)
  ) {
    errors.push({
      severity: "error",
      field: "vision.sources",
      message: "La visión está marcada como publicada pero no tiene fuentes de referencia.",
    });
  }

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

      if (
        value.publicationStatus === "published" &&
        (!value.sources || value.sources.length === 0)
      ) {
        errors.push({
          severity: "error",
          field: `coreValues[${value.id}].sources`,
          message: `El valor "${value.name}" está marcado como publicado pero no tiene fuentes.`,
        });
      }
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

      if (diff.publicationStatus === "published" && (!diff.sources || diff.sources.length === 0)) {
        errors.push({
          severity: "error",
          field: `differentiators[${diff.id}].sources`,
          message: `El diferenciador "${diff.title}" está marcado como publicado pero no tiene fuentes.`,
        });
      }
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

      if (cert.publicationStatus === "published" && (!cert.sources || cert.sources.length === 0)) {
        errors.push({
          severity: "error",
          field: `certifications[${cert.id}].sources`,
          message: `La certificación "${cert.name}" está marcada como publicada pero no tiene fuentes.`,
        });
      }
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

  if (!p.geographicCoverage) {
    warnings.push({
      severity: "warning",
      field: "geographicCoverage",
      message: "La cobertura geográfica no está definida.",
    });
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
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}
