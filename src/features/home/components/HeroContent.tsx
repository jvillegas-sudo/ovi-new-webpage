"use client";

/**
 * HeroContent — Cinematic Hero Text Overlay
 * Work Order 004 · Home Intelligence Integration
 *
 * Purely presentational: renders hero badge, title, subtitle, and scroll CTA.
 * Receives typed props from HomeCinematicJourney — no internal hardcoding.
 */

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Badge, Button, Container, Heading, Text } from "@components/ui";
import type { HeroLocaleContent } from "@knowledge/home";

interface HeroContentProps {
  hero: HeroLocaleContent;
  /** Whether the scroll indicator should be visible */
  showScrollIndicator?: boolean;
}

export function HeroContent({ hero, showScrollIndicator = true }: HeroContentProps) {
  return (
    <Container className="relative z-10">
      <div className="flex min-h-screen flex-col items-center justify-center text-center">
        <Badge variant="accent" className="mb-6">
          {hero.badge}
        </Badge>
        <Heading
          as="h1"
          size="6xl"
          align="center"
          className="max-w-4xl text-[var(--color-text-primary)]"
        >
          {hero.title}
        </Heading>
        <Text
          size="lg"
          align="center"
          className="mx-auto mt-6 max-w-2xl text-[var(--color-text-secondary)]"
        >
          {hero.subtitle}
        </Text>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link href="/contact">
            <Button size="lg">▶ Iniciar la Experiencia</Button>
          </Link>
          <Link href="/store">
            <Button variant="outline" size="lg">
              OVI Catálogo
            </Button>
          </Link>
        </div>
        {showScrollIndicator && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="h-6 w-6 text-[var(--color-text-tertiary)]" />
          </div>
        )}
      </div>
    </Container>
  );
}
