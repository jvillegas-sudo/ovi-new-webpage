"use client";

/**
 * IndustryCards — Sectors Grid
 * Work Order 004 · Home Intelligence Integration
 *
 * Renders sector cards sourced from the Knowledge Base + display config.
 */

import {
  Factory,
  Cpu,
  MonitorSmartphone,
  Wrench,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  type LucideProps,
} from "lucide-react";
import { AnimateStagger, Card, Heading, Text } from "@components/ui";
import type { HomeDisplaySector, HomeLocale } from "@knowledge/home";
import type { SectorDisplayConfig } from "@knowledge/home";

type LucideIcon = (props: LucideProps) => JSX.Element;

const ICON_MAP: Record<SectorDisplayConfig["iconName"], LucideIcon> = {
  Factory: Factory as LucideIcon,
  Cpu: Cpu as LucideIcon,
  MonitorSmartphone: MonitorSmartphone as LucideIcon,
  Wrench: Wrench as LucideIcon,
  TrendingUp: TrendingUp as LucideIcon,
  Sparkles: Sparkles as LucideIcon,
  CheckCircle2: CheckCircle2 as LucideIcon,
};

interface IndustryCardsProps {
  sectors: HomeDisplaySector[];
  locale?: HomeLocale;
}

export function IndustryCards({ sectors, locale = "es" }: IndustryCardsProps) {
  return (
    <AnimateStagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {sectors.map((sector) => {
        const Icon = ICON_MAP[sector.iconName];
        return (
          <Card key={sector.id} variant="glow" padding="md" className="flex h-full flex-col">
            <Icon className={`h-8 w-8 ${sector.colorClass}`} />
            <Heading as="h3" size="md" className="mt-4">
              {sector.nombre}
            </Heading>
            <Text size="sm" className="mt-2 flex-1">
              {sector.descripcion}
            </Text>
          </Card>
        );
      })}
    </AnimateStagger>
  );
}
