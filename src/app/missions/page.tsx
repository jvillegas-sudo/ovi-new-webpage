import { buildMetadata } from "@lib/metadata";
import { MissionsControlCenter } from "@features/missions/MissionsControlCenter";

export const metadata = buildMetadata({
  title: "OVI Missions",
  description:
    "OVI Missions — Explora operaciones reales resueltas por OVI. Cada misión es una experiencia inmersiva que demuestra cómo OVI transforma activos industriales contaminados en resultados impecables.",
  canonical: "/missions",
  keywords: [
    "OVI Missions",
    "casos de éxito",
    "experiencia inmersiva",
    "limpieza industrial",
    "resultados reales",
  ],
});

export default function MissionsPage() {
  return <MissionsControlCenter />;
}
