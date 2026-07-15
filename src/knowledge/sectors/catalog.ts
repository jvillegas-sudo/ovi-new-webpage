/**
 * OVI Knowledge Base — Sectors Catalog
 * FASE 1 · Foundation Order 001
 *
 * Official catalog of sectors served by OVI.
 * Source: Problem specification, store-data.ts, SolutionLabWorkspace.tsx.
 */

import type { OviSector } from "../types";

export const sectors: OviSector[] = [
  {
    id: "transporte",
    nombre: "Transporte",
    descripcion:
      "Patios de flota, terminales, centros logísticos y empresas de transporte público y de carga. Operaciones de alto volumen con requerimientos de continuidad y estandarización.",
    desafios: [
      "Reducir tiempos de ciclo de lavado sin sacrificar calidad",
      "Minimizar consumo de agua por unidad",
      "Estandarizar protocolos entre múltiples operadores",
      "Gestionar correctamente las aguas residuales del proceso",
    ],
    productosRelacionados: ["ovi-bioclean-pro", "ovi-flota-rinse-arch", "ovi-dose-control-cart"],
    serviciosRelacionados: ["lavado-flota", "auditoria-patio", "optimizacion-hidrica"],
    protocolosRelacionados: ["P-001", "P-003"],
    status: "activo",
  },
  {
    id: "industria",
    nombre: "Industria",
    descripcion:
      "Plantas de manufactura, metalmecánica, procesamiento de alimentos y operaciones industriales que requieren desempeño técnico, trazabilidad y compatibilidad normativa.",
    desafios: [
      "Remover grasa pesada y residuos adheridos sin detener producción",
      "Asegurar compatibilidad con superficies y equipos de proceso",
      "Documentar y auditar intervenciones de limpieza",
      "Cumplir normativas HACCP y de inocuidad alimentaria",
    ],
    productosRelacionados: [
      "ovi-bioclean-pro",
      "ovi-surface-guard-x9",
      "ovi-precision-foam-kit",
      "ovi-dose-control-cart",
    ],
    serviciosRelacionados: ["limpieza-industrial", "diagnostico-tecnico", "implementacion-protocolo"],
    protocolosRelacionados: ["P-010", "P-011"],
    status: "activo",
  },
  {
    id: "hospitales",
    nombre: "Hospitales",
    descripcion:
      "Infraestructura hospitalaria, clínicas y centros de salud con requerimientos críticos de desinfección, control de infecciones y diferenciación de zonas por nivel de riesgo.",
    desafios: [
      "Mantener niveles de desinfección de alto nivel en áreas críticas",
      "Diferenciar protocolos por nivel de asepsia requerido",
      "Controlar infecciones asociadas al entorno",
      "Gestionar residuos hospitalarios adecuadamente",
    ],
    productosRelacionados: ["ovi-surface-guard-x9", "ovi-precision-foam-kit", "ovi-dose-control-cart"],
    serviciosRelacionados: ["limpieza-industrial", "capacitacion-personal", "diseno-protocolo"],
    protocolosRelacionados: ["H-001", "H-002", "H-003"],
    status: "activo",
  },
  {
    id: "energia",
    nombre: "Energía",
    descripcion:
      "Generadoras, plantas de transmisión y activos energéticos expuestos a aceites, partículas y condiciones climáticas extremas. Intervención segura y controlada.",
    desafios: [
      "Limpiar activos en operación con riesgo eléctrico",
      "Proteger superficies expuestas a intemperie y residuos de proceso",
      "Equilibrar seguridad, disponibilidad y protección de infraestructura",
      "Documentar cada intervención para auditoría",
    ],
    productosRelacionados: ["ovi-surface-guard-x9", "ovi-flota-rinse-arch", "ovi-dose-control-cart"],
    serviciosRelacionados: ["levantamiento-activos", "mantenimiento-preventivo", "soporte-campo"],
    protocolosRelacionados: ["E-004", "E-007"],
    status: "activo",
  },
  {
    id: "institucional",
    nombre: "Institucional",
    descripcion:
      "Hospitales, universidades, edificios corporativos, centros comerciales e instalaciones de alto tráfico. Experiencia del usuario dependiente de disciplina operacional constante.",
    desafios: [
      "Estandarizar limpieza en múltiples superficies y zonas",
      "Mantener imagen y estándares con alto volumen de personas",
      "Capacitar personal operativo con alta rotación",
      "Verificar cumplimiento de protocolos continuamente",
    ],
    productosRelacionados: [
      "ovi-surface-guard-x9",
      "ovi-precision-foam-kit",
      "ovi-dose-control-cart",
    ],
    serviciosRelacionados: ["diseno-protocolo", "capacitacion-personal", "verificacion-cumplimiento"],
    protocolosRelacionados: ["H-001", "F-002"],
    status: "activo",
  },
  {
    id: "retail",
    nombre: "Retail",
    descripcion:
      "Tiendas, centros comerciales y espacios de venta al público con altos estándares de presentación y limpieza visible.",
    desafios: [
      "Mantener pisos y superficies impecables durante la operación",
      "Intervenir con mínimo impacto en la experiencia del cliente",
      "Gestionar suciedad de alto tráfico peatonal",
    ],
    productosRelacionados: ["ovi-surface-guard-x9", "ovi-precision-foam-kit"],
    serviciosRelacionados: ["diseno-protocolo", "mantenimiento-preventivo"],
    protocolosRelacionados: ["F-001", "F-002"],
    status: "activo",
  },
  {
    id: "alimentos",
    nombre: "Alimentos",
    descripcion:
      "Plantas de procesamiento, cocinas industriales y operaciones de producción alimentaria con estrictos requerimientos de inocuidad y cumplimiento normativo.",
    desafios: [
      "Eliminar biofilm y residuos orgánicos en superficies de contacto",
      "Cumplir protocolos HACCP y BPM",
      "Documentar y trazar cada ciclo de limpieza",
      "Usar únicamente productos food-grade o validados para alimentos",
    ],
    productosRelacionados: [
      "ovi-bioclean-pro",
      "ovi-precision-foam-kit",
      "ovi-surface-guard-x9",
      "ovi-dose-control-cart",
    ],
    serviciosRelacionados: ["diagnostico-tecnico", "implementacion-protocolo", "auditoria-cumplimiento"],
    protocolosRelacionados: ["P-010", "P-011"],
    status: "activo",
  },
];
