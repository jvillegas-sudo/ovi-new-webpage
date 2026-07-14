import { buildMetadata } from "@lib/metadata";
import { ProductsPage } from "@features/products/ProductsPage";

export const metadata = buildMetadata({
  title: "Productos",
  description:
    "Portafolio de productos OVI Ingeniería en Limpieza: formulaciones biodegradables, equipos de aplicación, accesorios y servicios técnicos para industria, flota e instituciones.",
  canonical: "/products",
  keywords: [
    "productos OVI",
    "desengrasante industrial",
    "formulación biodegradable",
    "químicos de limpieza",
    "equipos de limpieza",
    "lavado de flota",
    "OVI Ingeniería en Limpieza",
    "soluciones de limpieza industrial",
  ],
});

export default function ProductsRoute() {
  return <ProductsPage />;
}
