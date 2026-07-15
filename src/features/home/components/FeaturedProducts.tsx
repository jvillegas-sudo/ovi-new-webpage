"use client";

/**
 * FeaturedProducts — Products Section
 * Work Order 004 · Home Intelligence Integration
 *
 * Renders product description bullets and CTA sourced from the Knowledge Base home section.
 */

import Link from "next/link";
import { AnimateIn, AnimateStagger, Button, Card, Text } from "@components/ui";
import type { HomeProductsSection, HomeLocale } from "@knowledge/home";

interface FeaturedProductsProps {
  section: HomeProductsSection;
  locale?: HomeLocale;
}

export function FeaturedProducts({ section, locale = "es" }: FeaturedProductsProps) {
  const content = section.locales[locale];
  return (
    <>
      <AnimateStagger className="mt-12 grid gap-6 md:grid-cols-2">
        {content.bullets.map((bullet) => (
          <Card key={bullet} variant="solid" padding="lg">
            <Text textColor="primary" weight="medium">
              {bullet}
            </Text>
          </Card>
        ))}
      </AnimateStagger>
      <AnimateIn animation="slideUp" delay={0.2}>
        <div className="mt-10 text-center">
          <Link href="/store">
            <Button size="lg">{content.cta}</Button>
          </Link>
        </div>
      </AnimateIn>
    </>
  );
}
