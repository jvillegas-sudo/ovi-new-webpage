import { buildMetadata } from "@lib/metadata";
import { ProductsPage } from "@features/products/ProductsPage";

export const metadata = buildMetadata({
  title: "Productos",
  description:
    "Catálogo de productos OVI organizado por sector oficial: Industrial, Biotecnología, Lavandería, Alimentos, Protección y Cuidado Personal, Hotelería e Institucional y Mantenimiento.",
  canonical: "/products",
  keywords: [
    "productos OVI",
    "catálogo oficial OVI",
    "químicos de limpieza",
    "limpieza industrial",
    "biotecnología",
    "lavandería",
    "alimentos",
    "cuidado personal",
    "institucional",
  ],
});

export default function ProductsRoute() {
  return <ProductsPage />;
}
