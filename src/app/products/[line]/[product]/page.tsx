import { notFound } from "next/navigation";
import { buildMetadata } from "@lib/metadata";
import { ProductDetailPage } from "@features/products/ProductDetailPage";
import {
  getProductBySlug,
  getSectorBySlug,
  OVI_SECTORS,
} from "@features/products/chemical-lines-data";

export async function generateStaticParams() {
  return OVI_SECTORS.flatMap((sector) =>
    sector.products.map((product) => ({ line: sector.slug, product: product.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ line: string; product: string }>;
}) {
  const { line, product } = await params;
  const sector = getSectorBySlug(line);
  const productRecord = getProductBySlug(line, product);

  if (!sector || !productRecord) {
    return buildMetadata({
      title: "Producto no encontrado",
      description: "El producto solicitado no existe en el catálogo de OVI.",
      canonical: "/products",
    });
  }

  return buildMetadata({
    title: `${productRecord.officialName} | ${sector.officialName}`,
    description: `Detalle inicial de ${productRecord.officialName} en el sector ${sector.officialName}.`,
    canonical: `/products/${line}/${product}`,
    keywords: [
      productRecord.officialName,
      sector.officialName,
      "OVI",
      "limpieza profesional",
      "productos químicos",
    ],
  });
}

export default async function ProductRoute({
  params,
}: {
  params: Promise<{ line: string; product: string }>;
}) {
  const { line, product } = await params;
  const sector = getSectorBySlug(line);
  const productRecord = getProductBySlug(line, product);

  if (!sector || !productRecord) {
    notFound();
  }

  return <ProductDetailPage sector={sector} product={productRecord} />;
}
