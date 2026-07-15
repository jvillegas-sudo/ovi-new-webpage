"use client";

/**
 * KnowledgeHighlights — Engineering Pillars List
 * Work Order 004 · Home Intelligence Integration
 *
 * Renders the engineering pillar bullet list sourced from the Knowledge Base.
 */

import { CheckCircle2 } from "lucide-react";
import { Card, Text } from "@components/ui";
import type { HomeEngineeringSection, HomeLocale } from "@knowledge/home";

interface KnowledgeHighlightsProps {
  section: HomeEngineeringSection;
  locale?: HomeLocale;
}

export function KnowledgeHighlights({ section, locale = "es" }: KnowledgeHighlightsProps) {
  const content = section.locales[locale];
  return (
    <Card variant="glass" padding="lg" className="rounded-2xl border border-[var(--color-border-default)]">
      <ul className="space-y-5">
        {content.pillars.map((pillar) => (
          <li key={pillar.text} className="flex items-start gap-4">
            <CheckCircle2 className="mt-1 h-5 w-5 text-[var(--color-brand-accent)]" />
            <Text textColor="primary" weight="medium">
              {pillar.text}
            </Text>
          </li>
        ))}
      </ul>
    </Card>
  );
}
