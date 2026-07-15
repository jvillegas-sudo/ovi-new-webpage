/**
 * OVI Knowledge Home — Sector Display Config
 * Work Order 004 · Home Intelligence Integration
 *
 * Maps KB sector IDs to Lucide icon names and brand color tokens.
 * The Knowledge Base sector entities do not carry visual metadata — this module bridges them.
 */

export interface SectorDisplayConfig {
  /** Matches `OviKnowledgeSector.id` */
  sectorId: string;
  /** Lucide icon name (imported in components) */
  iconName: "Factory" | "Cpu" | "MonitorSmartphone" | "Wrench" | "TrendingUp" | "Sparkles" | "CheckCircle2";
  /** Tailwind/CSS-variable class for icon color */
  colorClass: string;
}

export const sectorDisplayConfigs: SectorDisplayConfig[] = [
  {
    sectorId: "transporte",
    iconName: "Factory",
    colorClass: "text-[var(--color-brand-primary)]",
  },
  {
    sectorId: "industria",
    iconName: "Cpu",
    colorClass: "text-[var(--color-brand-secondary)]",
  },
  {
    sectorId: "institucional",
    iconName: "MonitorSmartphone",
    colorClass: "text-[var(--color-brand-accent)]",
  },
  {
    sectorId: "hospitalario",
    iconName: "Wrench",
    colorClass: "text-[var(--color-brand-primary)]",
  },
  {
    sectorId: "energia",
    iconName: "TrendingUp",
    colorClass: "text-[var(--color-brand-secondary)]",
  },
  {
    sectorId: "retail",
    iconName: "Sparkles",
    colorClass: "text-[var(--color-brand-accent)]",
  },
  {
    sectorId: "alimentos",
    iconName: "CheckCircle2",
    colorClass: "text-[var(--color-brand-primary)]",
  },
  {
    sectorId: "infraestructura",
    iconName: "TrendingUp",
    colorClass: "text-[var(--color-brand-secondary)]",
  },
];

/** Lookup by sectorId — returns default config if not found */
export function getSectorDisplayConfig(sectorId: string): SectorDisplayConfig {
  return (
    sectorDisplayConfigs.find((c) => c.sectorId === sectorId) ?? {
      sectorId,
      iconName: "Factory",
      colorClass: "text-[var(--color-brand-primary)]",
    }
  );
}
