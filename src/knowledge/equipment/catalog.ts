/**
 * OVI Knowledge Base — Equipment Catalog
 * FASE 1 · Foundation Order 001
 *
 * Official equipment registry. Data sourced from store-data.ts
 * and product compatibility lists already in the platform.
 */

import type { OviEquipment } from "../types";

export const equipment: OviEquipment[] = [
  {
    id: "ovi-flota-rinse-arch",
    nombre: "OVI Flota Rinse Arch",
    categoria: "sistema-lavado",
    descripcion:
      "Sistema de enjuague para flota y activos de gran volumen con cobertura repetible y reducción de tiempos muertos. Instalación en punto fijo o semimóvil.",
    productosCompatibles: ["ovi-bioclean-pro", "ovi-dose-control-cart"],
    protocolosCompatibles: ["protocolo-p-001", "protocolo-e-004"],
    especificaciones: [
      "Instalación fija o semimóvil",
      "Cobertura uniforme configurada por ingeniería",
      "Compatible con líneas hidráulicas estándar",
      "Control de ciclo automatizable con OVI OS",
    ],
    status: "activo",
  },
  {
    id: "ovi-dose-control-cart",
    nombre: "OVI Dose Control Cart",
    categoria: "dosificacion",
    descripcion:
      "Estación móvil de dosificación y preparación de soluciones para asegurar mezcla consistente, trazabilidad y seguridad operacional.",
    productosCompatibles: [
      "ovi-bioclean-pro",
      "ovi-precision-foam-kit",
      "ovi-surface-guard-x9",
    ],
    protocolosCompatibles: ["protocolo-p-003", "protocolo-g-003"],
    especificaciones: [
      "Múltiples compartimentos de preparación",
      "Sistema de etiquetado operacional",
      "Ruedas industriales para movilidad en patio",
      "Diseñado para control visual de diluciones",
    ],
    status: "activo",
  },
  {
    id: "ovi-precision-foam-kit",
    nombre: "OVI Precision Foam Kit",
    categoria: "espuma",
    descripcion:
      "Kit de espumado técnico para controlar cobertura, tiempo de contacto y visibilidad del protocolo sobre superficies complejas.",
    productosCompatibles: ["ovi-bioclean-pro", "ovi-surface-guard-x9"],
    protocolosCompatibles: ["protocolo-h-001", "protocolo-f-002", "protocolo-p-010"],
    especificaciones: [
      "Acopla a líneas de baja presión o sistemas móviles",
      "Espuma estable y visualmente trazable",
      "Compatible con línea completa de químicos OVI",
    ],
    status: "activo",
  },
  {
    id: "lanza-espuma-tecnica",
    nombre: "Lanza de espuma técnica",
    categoria: "espuma",
    descripcion:
      "Lanza de aplicación de espuma manual para trabajos de precisión en equipos verticales y superficies de difícil acceso.",
    productosCompatibles: ["ovi-bioclean-pro"],
    protocolosCompatibles: ["protocolo-p-011"],
    especificaciones: [
      "Regulación de densidad de espuma",
      "Compatible con sistemas de baja presión",
    ],
    status: "activo",
  },
  {
    id: "aplicador-microfibra-tecnica",
    nombre: "Aplicador de microfibra técnica",
    categoria: "accesorio",
    descripcion:
      "Sistema de aplicación de microfibra para tratamientos de protección y mantenimiento preventivo de superficies sensibles.",
    productosCompatibles: ["ovi-surface-guard-x9"],
    protocolosCompatibles: ["protocolo-f-002", "protocolo-f-003", "protocolo-e-007"],
    especificaciones: [
      "Aplicación sin equipos especiales",
      "Compatible con protectores de superficie",
    ],
    status: "activo",
  },
  {
    id: "pulverizador-baja-presion",
    nombre: "Pulverizador de baja presión",
    categoria: "accesorio",
    descripcion: "Equipo portátil de aspersión para aplicaciones de protectores y mantenimiento.",
    productosCompatibles: ["ovi-surface-guard-x9"],
    protocolosCompatibles: ["protocolo-f-002"],
    especificaciones: [
      "Operación manual o motorizada",
      "Regulación de presión y caudal",
    ],
    status: "activo",
  },
  {
    id: "bomba-refuerzo",
    nombre: "Bomba de refuerzo",
    categoria: "sistema-lavado",
    descripcion: "Bomba auxiliar para refuerzo de presión en sistemas de lavado de flota.",
    productosCompatibles: [],
    protocolosCompatibles: ["protocolo-p-001"],
    especificaciones: [
      "Compatible con OVI Flota Rinse Arch",
      "Configuración de presión ajustable",
    ],
    status: "activo",
  },
];
