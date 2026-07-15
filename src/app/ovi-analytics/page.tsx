import { buildMetadata } from "@lib/metadata";
import { OviAnalyticsPage } from "@features/ovi-analytics/OviAnalyticsPage";

export const metadata = buildMetadata({
  title: "OVI Analytics",
  description:
    "OVI Analytics — Executive Intelligence Dashboard. Transforma los datos operativos de OVI OS, OVI Field, OVI Lab y OVI Core en indicadores ejecutivos de alto valor para la toma de mejores decisiones.",
  canonical: "/ovi-analytics",
  keywords: [
    "OVI Analytics",
    "dashboard ejecutivo",
    "indicadores operativos industriales",
    "indicadores ambientales",
    "análisis de tendencias",
    "reportes ejecutivos",
    "inteligencia operativa",
    "OVI Ingeniería en Limpieza",
  ],
});

export default function OviAnalyticsRoute() {
  return <OviAnalyticsPage />;
}
