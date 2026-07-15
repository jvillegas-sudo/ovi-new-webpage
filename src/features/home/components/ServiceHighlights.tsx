"use client";

/**
 * ServiceHighlights — Services Bullets Grid
 * Work Order 004 · Home Intelligence Integration
 *
 * Renders service description bullets sourced from the Knowledge Base home section.
 */

import { Wrench } from "lucide-react";
import { AnimateStagger, Card, Text } from "@components/ui";
import type { HomeServicesSection, HomeLocale } from "@knowledge/home";

interface ServiceHighlightsProps {
  section: HomeServicesSection;
  locale?: HomeLocale;
}

export function ServiceHighlights({ section, locale = "es" }: ServiceHighlightsProps) {
  const content = section.locales[locale];
  return (
    <AnimateStagger className="mt-12 grid gap-6 md:grid-cols-2">
      {content.bullets.map((bullet) => (
        <Card
          key={bullet}
          variant="glass"
          padding="lg"
          className="flex items-start gap-4"
        >
          <Wrench className="mt-1 h-5 w-5 text-[var(--color-brand-primary)]" />
          <Text textColor="primary" weight="medium">
            {bullet}
          </Text>
        </Card>
      ))}
    </AnimateStagger>
  );
}
