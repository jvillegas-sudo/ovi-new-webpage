import { buildMetadata } from "@lib/metadata";
import { EngineeringPage } from "@features/engineering/EngineeringPage";

export const metadata = buildMetadata({
  title: "OVI Engineering",
  description:
    "OVI Engineering — Metodología de Ingeniería en Limpieza para soluciones operacionales personalizadas. Diagnóstico, diseño, implementación, medición y optimización continua.",
  canonical: "/engineering",
  keywords: [
    "OVI Engineering",
    "ingeniería en limpieza",
    "metodología operacional",
    "soluciones personalizadas",
    "diagnóstico operacional",
    "protocolos de limpieza industrial",
    "OVI Ingeniería en Limpieza",
    "optimización operativa",
    "impacto ambiental limpieza",
  ],
});

export default function EngineeringRoute() {
  return <EngineeringPage />;
}
