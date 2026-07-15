/**
 * OVI Knowledge Base — Surfaces Catalog
 * FASE 1 · Foundation Order 001
 *
 * Official catalog of surfaces OVI products and protocols can target.
 * Source: Problem specification, product compatibility data from store-data.ts.
 */

import type { OviSurface } from "../types";

export const surfaces: OviSurface[] = [
  {
    id: "acero-inoxidable",
    nombre: "Acero inoxidable",
    descripcion:
      "Material metálico resistente a la corrosión. Común en industria alimentaria, hospitalaria y manufactura.",
    sensibilidadQuimica: "baja",
    notas: "Evitar ácidos fuertes no diluidos. Enjuague inmediato tras aplicación de cloro.",
    status: "activo",
  },
  {
    id: "aluminio",
    nombre: "Aluminio",
    descripcion:
      "Metal liviano con acabado anodizado o natural. Sensible a álcalis fuertes y ácidos concentrados.",
    sensibilidadQuimica: "alta",
    notas: "Validar compatibilidad del producto antes de aplicar. Realizar prueba en área controlada.",
    status: "activo",
  },
  {
    id: "pintura-automotriz",
    nombre: "Pintura automotriz",
    descripcion:
      "Acabado pintado de vehículos y maquinaria. Sensible a solventes agresivos y pH extremos.",
    sensibilidadQuimica: "alta",
    notas: "Usar únicamente productos pH neutro o ligeramente alcalino validados para automotriz.",
    status: "activo",
  },
  {
    id: "vidrio",
    nombre: "Vidrio",
    descripcion:
      "Superficies transparentes de ventanas, parabrisas y paneles. Requiere agentes sin residuo.",
    sensibilidadQuimica: "media",
    notas: "Evitar productos que dejen velo o película residual.",
    status: "activo",
  },
  {
    id: "concreto",
    nombre: "Concreto",
    descripcion:
      "Pisos y muros de concreto sellado o sin sellar. Alta porosidad si no está sellado; requiere mayor dilución.",
    sensibilidadQuimica: "baja",
    notas: "Los ácidos pueden dañar concreto no sellado. Verificar acabado antes de aplicar.",
    status: "activo",
  },
  {
    id: "ceramica",
    nombre: "Cerámica",
    descripcion: "Superficies cerámicas de pisos y paredes. Resistentes a la mayoría de agentes.",
    sensibilidadQuimica: "baja",
    notas: "Las juntas o grout pueden requecer tratamiento diferenciado.",
    status: "activo",
  },
  {
    id: "pvc",
    nombre: "PVC",
    descripcion:
      "Plástico rígido o flexible usado en cañerías, paneles y revestimientos. Sensible a solventes.",
    sensibilidadQuimica: "media",
    notas: "Evitar solventes orgánicos. Preferir soluciones acuosas.",
    status: "activo",
  },
  {
    id: "caucho",
    nombre: "Caucho",
    descripcion:
      "Superficies de goma en sellos, mangueras y cubiertas. Puede degradarse con solventes o ácidos fuertes.",
    sensibilidadQuimica: "alta",
    notas: "Verificar ficha técnica del producto antes de aplicar.",
    status: "activo",
  },
  {
    id: "plastico-tecnico",
    nombre: "Plástico técnico",
    descripcion:
      "Policarbonato, ABS, polipropileno u otros plásticos de ingeniería usados en equipos y paneles.",
    sensibilidadQuimica: "media",
    notas: "Evitar solventes clorados. Validar compatibilidad por tipo de plástico.",
    status: "activo",
  },
  {
    id: "pintura-industrial",
    nombre: "Pintura industrial",
    descripcion:
      "Recubrimientos industriales de alta dureza sobre estructuras metálicas y equipos de proceso.",
    sensibilidadQuimica: "media",
    notas: "Verificar compatibilidad química antes de aplicar agentes alcalinos concentrados.",
    status: "activo",
  },
  {
    id: "concreto-sellado",
    nombre: "Concreto sellado",
    descripcion: "Concreto tratado con sellador polimérico o epoxi. Mayor resistencia química.",
    sensibilidadQuimica: "baja",
    notas: "El sellado protege al sustrato pero puede desprenderse con abrasivos.",
    status: "activo",
  },
  {
    id: "pisos-sellados",
    nombre: "Pisos sellados",
    descripcion:
      "Pisos con acabado sellado polimérico, epoxi o poliuretano. Comunes en plantas industriales.",
    sensibilidadQuimica: "baja",
    notas: "No usar abrasivos. Preferir limpiadores de pH neutro para mantenimiento diario.",
    status: "activo",
  },
];
