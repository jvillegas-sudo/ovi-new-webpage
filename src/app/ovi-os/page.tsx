import { buildMetadata } from "@lib/metadata";
import { OviOsPage } from "@features/ovi-os/OviOsPage";

export const metadata = buildMetadata({
  title: "OVI OS",
  description:
    "OVI OS — Portal privado para clientes de OVI con dashboard, proyectos, servicios, diagnósticos, documentación, soporte e integración con OVI Core, OVI AI, OVI Lab y OVI Catálogo Técnico.",
  canonical: "/ovi-os",
  keywords: [
    "OVI OS",
    "portal privado de clientes",
    "gestión de proyectos limpieza industrial",
    "dashboard de servicios y diagnósticos",
    "documentación técnica industrial",
    "OVI Ingeniería en Limpieza",
    "misión de control operacional",
  ],
});

export default function OviOsRoute() {
  return <OviOsPage />;
}
