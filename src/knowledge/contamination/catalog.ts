/**
 * OVI Knowledge Base — Contamination Types Catalog
 * FASE 1 · Foundation Order 001
 *
 * Official catalog of contamination types recognized by OVI.
 * Source: Problem specification, existing product/service data.
 */

import type { OviContaminationType } from "../types";

export const contaminationTypes: OviContaminationType[] = [
  {
    id: "grasa-pesada",
    nombre: "Grasa pesada",
    descripcion:
      "Acumulación densa de lípidos y grasas de origen industrial o mecánico. Alta adherencia a superficies metálicas y de proceso.",
    dificultadRemocion: "alta",
    sectoresHabituales: ["industria", "transporte", "energia"],
    status: "activo",
  },
  {
    id: "aceite",
    nombre: "Aceite",
    descripcion:
      "Residuos de aceites minerales, hidráulicos o de corte. Forman película adherente que atrae partículas sólidas.",
    dificultadRemocion: "alta",
    sectoresHabituales: ["industria", "transporte", "energia"],
    status: "activo",
  },
  {
    id: "carbonilla",
    nombre: "Carbonilla",
    descripcion:
      "Partículas de carbono provenientes de combustión incompleta. Se incrusta en superficies porosas y metálicas expuestas al calor.",
    dificultadRemocion: "alta",
    sectoresHabituales: ["transporte", "energia", "industria"],
    status: "activo",
  },
  {
    id: "oxido",
    nombre: "Óxido",
    descripcion:
      "Corrosión superficial por oxidación de metales ferrosos. Requiere agentes ácidos o abrasivos controlados para remoción.",
    dificultadRemocion: "crítica",
    sectoresHabituales: ["industria", "energia", "transporte"],
    status: "activo",
  },
  {
    id: "biofilm",
    nombre: "Biofilm",
    descripcion:
      "Película microbiana adherente formada por colonias bacterianas. Alta resistencia a desinfectantes convencionales. Riesgo sanitario en industria alimentaria y hospitalaria.",
    dificultadRemocion: "crítica",
    sectoresHabituales: ["alimentos", "hospitales", "institucional"],
    status: "activo",
  },
  {
    id: "sarro",
    nombre: "Sarro",
    descripcion:
      "Depósitos calcáreos y minerales provenientes del agua dura. Frecuente en superficies expuestas a agua o vapor.",
    dificultadRemocion: "media",
    sectoresHabituales: ["institucional", "alimentos", "hospitales"],
    status: "activo",
  },
  {
    id: "lodo",
    nombre: "Lodo",
    descripcion:
      "Mezcla de tierra, agua y residuos orgánicos. Común en patios de operaciones, plantas de tratamiento y zonas exteriores.",
    dificultadRemocion: "media",
    sectoresHabituales: ["transporte", "industria", "energia"],
    status: "activo",
  },
  {
    id: "polvo-industrial",
    nombre: "Polvo industrial",
    descripcion:
      "Partículas finas de origen mecánico, minero o de manufactura. Penetra en equipos y superficies porosas causando desgaste prematuro.",
    dificultadRemocion: "baja",
    sectoresHabituales: ["industria", "energia", "transporte"],
    status: "activo",
  },
  {
    id: "residuos-organicos",
    nombre: "Residuos orgánicos",
    descripcion:
      "Materia orgánica de origen alimentario, biológico o vegetal. Fuente de proliferación bacteriana y olores.",
    dificultadRemocion: "media",
    sectoresHabituales: ["alimentos", "hospitales", "institucional"],
    status: "activo",
  },
  {
    id: "residuos-quimicos",
    nombre: "Residuos químicos",
    descripcion:
      "Restos de productos químicos industriales, solventes o reactivos. Requieren manejo especial y compatibilidad estricta con superficies.",
    dificultadRemocion: "alta",
    sectoresHabituales: ["industria", "energia", "hospitales"],
    status: "activo",
  },
  {
    id: "recontaminacion-superficial",
    nombre: "Recontaminación superficial",
    descripcion:
      "Depósito rápido de polvo fino, humedad ambiental o marcas de tráfico sobre superficies recién limpiadas.",
    dificultadRemocion: "baja",
    sectoresHabituales: ["institucional", "retail", "hospitales"],
    status: "activo",
  },
  {
    id: "espuma-residual",
    nombre: "Espuma residual",
    descripcion:
      "Restos de detergente o agente limpiador no enjuagado correctamente. Puede afectar la siguiente etapa de limpieza o dejar manchas.",
    dificultadRemocion: "baja",
    sectoresHabituales: ["transporte", "industria"],
    status: "activo",
  },
];
