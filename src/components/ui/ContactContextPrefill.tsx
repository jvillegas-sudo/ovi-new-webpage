"use client";

/**
 * ContactContextPrefill — Work Order 013
 *
 * Reads the accumulated Experience Context (sector, diagnosis, product) and
 * pre-fills the ContactForm message field with a concise technical summary.
 * This removes duplicate data collection for users who completed Lab / AI / Store.
 */

import { useMemo } from "react";
import { ContactForm } from "@components/ui/ContactForm";
import { useExperienceContextStore } from "@store/experience-context.store";

// Map Experience Context industryId → contact form sector option value
const INDUSTRY_TO_SECTOR: Record<string, string> = {
  transporte: "transporte-logistica",
  "transporte-logistica": "transporte-logistica",
  manufactura: "manufactura-industria",
  "industria-pesada": "manufactura-industria",
  alimentos: "manufactura-industria",
  construccion: "construccion-obra",
  salud: "salud-saneamiento",
  hotelera: "comercio-inmobiliario",
  institucional: "comercio-inmobiliario",
};

export function ContactContextPrefill() {
  const ctx = useExperienceContextStore();

  const prefill = useMemo(() => {
    const hasContext = Boolean(ctx.lastUpdated);
    if (!hasContext) return undefined;

    // Build prefill message from accumulated context
    const lines: string[] = [];

    if (ctx.industryId) {
      lines.push(`Sector: ${ctx.industryId.replace(/-/g, " ")}`);
    }
    if (ctx.assetType) {
      lines.push(`Activo: ${ctx.assetType.replace(/-/g, " ")}`);
    }
    if (ctx.contaminationId) {
      lines.push(`Tipo de suciedad: ${ctx.contaminationId.replace(/-/g, " ")}`);
    }
    if (ctx.contaminationLevel) {
      lines.push(`Nivel de contaminación: ${ctx.contaminationLevel}`);
    }
    if (ctx.diagnosis) {
      lines.push(`\nDiagnóstico OVI: ${ctx.diagnosis}`);
    }
    if (ctx.primaryProductName) {
      lines.push(`Producto recomendado: ${ctx.primaryProductName}`);
    }
    if (ctx.serviceName) {
      lines.push(`Servicio recomendado: ${ctx.serviceName}`);
    }
    if (ctx.clientGoal) {
      lines.push(`\nObjetivo: ${ctx.clientGoal.replace(/-/g, " ")}`);
    }
    if (ctx.expectedBenefit) {
      lines.push(`Beneficio esperado: ${ctx.expectedBenefit}`);
    }

    lines.push(
      "\nPor favor, contácteme para coordinar una visita técnica y evaluar la implementación de esta solución.",
    );

    const mappedIndustry = ctx.industryId ? (INDUSTRY_TO_SECTOR[ctx.industryId] ?? "") : "";

    return {
      industry: mappedIndustry,
      message: lines.join("\n"),
    };
  }, [ctx]);

  return <ContactForm prefill={prefill} />;
}
