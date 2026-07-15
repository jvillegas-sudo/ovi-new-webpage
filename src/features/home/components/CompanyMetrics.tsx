"use client";

/**
 * CompanyMetrics — Home Identity Stats Grid
 * Work Order 004 · Home Intelligence Integration
 *
 * Renders the four identity metric cards sourced from the Knowledge Base.
 */

import { AnimateStagger, Card, Text } from "@components/ui";
import type { HomeIdentityMetric, HomeLocale } from "@knowledge/home";

interface CompanyMetricsProps {
  metrics: HomeIdentityMetric[];
  locale?: HomeLocale;
}

export function CompanyMetrics({ metrics, locale = "es" }: CompanyMetricsProps) {
  return (
    <AnimateStagger className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => {
        const content = metric.locales[locale];
        return (
          <Card key={metric.slug} variant="solid" padding="lg" className="text-center">
            <Text as="p" size="xl" weight="bold" className="text-[var(--color-brand-primary)]">
              {content.value}
            </Text>
            <Text className="mt-2">{content.label}</Text>
          </Card>
        );
      })}
    </AnimateStagger>
  );
}
