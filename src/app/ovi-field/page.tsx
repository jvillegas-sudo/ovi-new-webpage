import { buildMetadata } from "@lib/metadata";
import { OviFieldPage } from "@features/ovi-field/OviFieldPage";

export const metadata = buildMetadata({
  title: "OVI Field",
  description:
    "OVI Field — Plataforma inteligente de operaciones en campo. Digitaliza la ejecución completa de servicios OVI: órdenes de trabajo, checklists dinámicos, registro fotográfico, materiales, firma digital y cierre con sincronización a OVI OS.",
  canonical: "/ovi-field",
  keywords: [
    "OVI Field",
    "operaciones en campo",
    "órdenes de trabajo digitales",
    "checklist dinámico industrial",
    "registro fotográfico de servicios",
    "firma digital de actas",
    "trazabilidad de servicios de limpieza",
    "OVI Ingeniería en Limpieza",
  ],
});

export default function OviFieldRoute() {
  return <OviFieldPage />;
}
