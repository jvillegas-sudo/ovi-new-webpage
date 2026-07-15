import { buildMetadata } from "@lib/metadata";
import { OviOpsPage } from "@features/ovi-ops/OviOpsPage";

export const metadata = buildMetadata({
  title: "OVI OPS",
  description:
    "OVI OPS — Plataforma Digital de Operaciones. El puente entre el diagnóstico y la ejecución. Transforma soluciones OVI en proyectos operativos ejecutados con calidad, trazabilidad y evidencia.",
  canonical: "/ovi-ops",
  keywords: [
    "OVI OPS",
    "plataforma de operaciones",
    "gestión de proyectos industriales",
    "órdenes de trabajo digitales",
    "control de calidad en campo",
    "evidencias de servicio",
    "trazabilidad operativa",
    "OVI Ingeniería en Limpieza",
  ],
});

export default function OviOpsRoute() {
  return <OviOpsPage />;
}
