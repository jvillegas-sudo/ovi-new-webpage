"use client";

/**
 * FeaturedSolutions — Success Cases Grid
 * Work Order 004 · Home Intelligence Integration
 *
 * Renders success case cards sourced from the Knowledge Base.
 */

import { AnimateStagger, Card, Heading, Text } from "@components/ui";
import type { HomeSuccessCase, HomeLocale } from "@knowledge/home";

interface FeaturedSolutionsProps {
  cases: HomeSuccessCase[];
  locale?: HomeLocale;
}

export function FeaturedSolutions({ cases, locale = "es" }: FeaturedSolutionsProps) {
  return (
    <AnimateStagger className="mt-10 grid gap-6 md:grid-cols-3">
      {cases.map((item) => {
        const content = item.locales[locale];
        return (
          <Card key={item.slug} variant="glass" padding="lg" className="text-left">
            <Heading as="h3" size="md">
              {content.title}
            </Heading>
            <Text className="mt-3">{content.detail}</Text>
          </Card>
        );
      })}
    </AnimateStagger>
  );
}
