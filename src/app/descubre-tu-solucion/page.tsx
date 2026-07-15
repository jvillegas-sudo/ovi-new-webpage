import { buildMetadata } from "@lib/metadata";
import { SolutionJourneyPage } from "@features/solution-journey/SolutionJourneyPage";

export const metadata = buildMetadata({
  title: "Descubre tu Solución",
  description:
    "Descubre tu Solución OVI — Un recorrido guiado desde tu problema hasta la solución exacta. Sin buscar productos. Sin formularios. OVI entiende tu desafío y te entrega el diagnóstico, el protocolo, el servicio y el producto en una sola pantalla.",
  canonical: "/descubre-tu-solucion",
  keywords: [
    "descubre tu solución",
    "recorrido guiado limpieza",
    "diagnóstico industrial",
    "solución de limpieza",
    "protocolo limpieza industrial",
    "OVI Ingeniería en Limpieza",
    "desengrasante industrial",
    "limpieza técnica",
  ],
});

export default function DescubreTuSolucionRoute() {
  return <SolutionJourneyPage />;
}
