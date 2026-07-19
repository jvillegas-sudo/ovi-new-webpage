import { notFound } from "next/navigation";
import { buildMetadata } from "@lib/metadata";
import { ChemicalLinePage } from "@features/products/ChemicalLinePage";
import { getChemicalLineBySlug, CHEMICAL_LINES } from "@features/products/chemical-lines-data";

// ─── Static Params ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return CHEMICAL_LINES.map((line) => ({ line: line.slug }));
}

// ─── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: { params: Promise<{ line: string }> }) {
  const { line: slug } = await params;
  const line = getChemicalLineBySlug(slug);

  if (!line) {
    return buildMetadata({
      title: "Línea no encontrada",
      description: "La línea de productos solicitada no existe en el catálogo OVI.",
      canonical: "/products",
    });
  }

  return buildMetadata({
    title: line.name,
    description: `${line.subtitle}. ${line.description}`,
    canonical: `/products/${line.slug}`,
    keywords: [
      line.name,
      line.badge,
      ...line.industries,
      "OVI Ingeniería en Limpieza",
      "productos químicos industriales",
      "formulaciones biodegradables",
    ],
  });
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default async function ChemicalLineRoute({ params }: { params: Promise<{ line: string }> }) {
  const { line: slug } = await params;
  const line = getChemicalLineBySlug(slug);

  if (!line) {
    notFound();
  }

  return <ChemicalLinePage line={line} />;
}
