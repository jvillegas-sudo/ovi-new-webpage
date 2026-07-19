import { notFound } from "next/navigation";
import { buildMetadata } from "@lib/metadata";
import { ChemicalLinePage } from "@features/products/ChemicalLinePage";
import { getSectorBySlug, OVI_SECTORS } from "@features/products/chemical-lines-data";

export async function generateStaticParams() {
  return OVI_SECTORS.map((sector) => ({ line: sector.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ line: string }> }) {
  const { line: slug } = await params;
  const sector = getSectorBySlug(slug);

  if (!sector) {
    return buildMetadata({
      title: "Sector no encontrado",
      description: "El sector de productos solicitado no existe en el catálogo OVI.",
      canonical: "/products",
    });
  }

  return buildMetadata({
    title: `${sector.officialName} | Productos OVI`,
    description: `Sector ${sector.officialName} del catálogo oficial OVI. ${sector.products.length} productos cargados.`,
    canonical: `/products/${sector.slug}`,
    keywords: [
      "productos OVI",
      "catálogo OVI",
      sector.officialName,
      "limpieza profesional",
      "ingeniería en limpieza",
    ],
  });
}

export default async function SectorRoute({ params }: { params: Promise<{ line: string }> }) {
  const { line: slug } = await params;
  const sector = getSectorBySlug(slug);

  if (!sector) {
    notFound();
  }

  return <ChemicalLinePage line={sector} />;
}
