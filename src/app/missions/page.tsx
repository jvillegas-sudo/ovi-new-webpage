import { buildMetadata } from "@lib/metadata";
import { MissionsControlCenter } from "@features/missions/MissionsControlCenter";

export const metadata = buildMetadata({
  title: "OVI Misiones",
  description:
    "OVI Misiones — Explore operaciones reales resueltas por OVI. Cada misión es una experiencia inmersiva que demuestra cómo OVI transforma activos industriales contaminados en resultados medibles.",
  canonical: "/missions",
  keywords: [
    "OVI Misiones",
    "casos de éxito",
    "experiencia inmersiva",
    "limpieza industrial",
    "resultados reales",
  ],
});

export default function MissionsPage() {
  return <MissionsControlCenter />;
}
