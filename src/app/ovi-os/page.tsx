import { buildMetadata } from "@lib/metadata";
import { OviOsPage } from "@features/ovi-os/OviOsPage";

export const metadata = buildMetadata({
  title: "OVI OS",
  description:
    "OVI OS — La plataforma inteligente para gestionar soluciones de Ingeniería en Limpieza. Centralice operaciones, analice indicadores y optimice procesos con inteligencia artificial.",
  canonical: "/ovi-os",
  keywords: [
    "OVI OS",
    "plataforma operacional limpieza",
    "gestión de proyectos limpieza industrial",
    "analítica operacional",
    "protocolos de limpieza",
    "OVI Ingeniería en Limpieza",
    "misión de control operacional",
  ],
});

export default function OviOsRoute() {
  return <OviOsPage />;
}
