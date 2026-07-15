import { buildMetadata } from "@lib/metadata";
import { OviCommandCenterPage } from "@features/ovi-command-center/OviCommandCenterPage";

export const metadata = buildMetadata({
  title: "OVI Command Center",
  description:
    "OVI Command Center — Centro de Control Inteligente. Unifica OVI OS, OVI Field, OVI AI, OVI Store, OVI Lab y OVI Analytics en una única vista ejecutiva para responder en menos de 10 segundos: ¿Mi operación está funcionando correctamente?",
  canonical: "/ovi-command-center",
  keywords: [
    "OVI Command Center",
    "centro de control inteligente",
    "vista ejecutiva industrial",
    "alertas operativas",
    "timeline de servicios",
    "activos críticos",
    "recomendaciones IA",
    "búsqueda global",
    "OVI Ingeniería en Limpieza",
  ],
});

export default function OviCommandCenterRoute() {
  return <OviCommandCenterPage />;
}
