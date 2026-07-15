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
      "Patios de flota, terminales, centros logísticos y empresas de transporte público y de carga. OVI atiende flotas de hasta 7,000 unidades por mes con protocolos de lavado técnico estandarizados, gestión hídrica controlada y documentación de cada ciclo.",
    desafios: [
      "Reducir tiempos de ciclo de lavado sin sacrificar calidad",
      "Minimizar consumo de agua por unidad atendida",
      "Estandarizar protocolos entre múltiples operadores",
      "Gestionar correctamente las aguas residuales del proceso",
    ],
    productosRelacionados: ["ovi-biodex", "ovi-solwash", "ovi-flota-rinse-arch", "ovi-dose-control-cart"],
    serviciosRelacionados: ["lavado-flota", "auditoria-patio", "optimizacion-hidrica"],
    protocolosRelacionados: ["P-001", "P-003"],
    status: "activo",
  },
  {
    id: "industria",
    nombre: "Industria",
    descripcion:
      "Plantas de manufactura, metalmecánica, automotriz, petrolera, procesamiento de alimentos y operaciones industriales. OVI diseña protocolos de desengrase con OVI Biodex y OVI JP 35 para remover grasas minerales e industriales con trazabilidad completa y cumplimiento normativo.",
    desafios: [
      "Remover grasa pesada y residuos adheridos sin detener producción",
      "Asegurar compatibilidad con superficies y equipos de proceso",
      "Documentar y auditar intervenciones de limpieza",
      "Cumplir normativas HACCP y de inocuidad alimentaria",
    ],
    productosRelacionados: [
      "ovi-biodex",
      "ovi-jp35",
      "ovi-ecoseal",
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
    productosRelacionados: ["ovi-ecoseal", "ovi-precision-foam-kit", "ovi-dose-control-cart"],
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
    productosRelacionados: ["ovi-ecoseal", "ovi-flota-rinse-arch", "ovi-dose-control-cart"],
    serviciosRelacionados: ["levantamiento-activos", "mantenimiento-preventivo", "soporte-campo"],
    protocolosRelacionados: ["E-004", "E-007"],
    status: "activo",
  },
  {
    id: "institucional",
    nombre: "Institucional",
    descripcion:
      "Hospitales, universidades, colegios, edificios corporativos, centros comerciales e instalaciones de alto tráfico. OVI diseña programas de mantenimiento preventivo con OVI Ecoseal y OVI Ecoshine para mantener pisos, cristales y superficies impecables con mínimo impacto en la experiencia del usuario.",
    desafios: [
      "Estandarizar limpieza en múltiples superficies y zonas",
      "Mantener imagen y estándares con alto volumen de personas",
      "Capacitar personal operativo con alta rotación",
      "Verificar cumplimiento de protocolos continuamente",
    ],
    productosRelacionados: [
      "ovi-ecoseal",
      "ovi-ecoshine",
      "ovi-eco-wax",
      "ovi-precision-foam-kit",
      "ovi-dose-control-cart",
    ],
    serviciosRelacionados: ["diseno-protocolo", "capacitacion-personal", "mantenimiento-preventivo"],
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
    productosRelacionados: ["ovi-ecoseal", "ovi-precision-foam-kit"],
    serviciosRelacionados: ["diseno-protocolo", "mantenimiento-preventivo"],
    protocolosRelacionados: ["F-001", "F-002"],
    status: "activo",
  },
  {
    id: "alimentos",
    nombre: "Alimentos",
    descripcion:
      "Plantas de procesamiento, cocinas industriales y operaciones de producción alimentaria con estrictos requerimientos de inocuidad y cumplimiento normativo. OVI aplica protocolos HACCP con OVI Biodex y OVI Precision Foam Kit para garantizar la seguridad en superficies de contacto directo.",
    desafios: [
      "Eliminar biofilm y residuos orgánicos en superficies de contacto",
      "Cumplir protocolos HACCP y BPM en cada ciclo",
      "Documentar y trazar cada intervención de limpieza",
      "Usar únicamente productos validados para entornos alimentarios",
    ],
    productosRelacionados: [
      "ovi-biodex",
      "ovi-precision-foam-kit",
      "ovi-ecoseal",
      "ovi-dose-control-cart",
    ],
    serviciosRelacionados: ["diagnostico-tecnico", "implementacion-protocolo", "diseno-protocolo"],
    protocolosRelacionados: ["P-010", "P-011"],
    status: "activo",
  },
];
