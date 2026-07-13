/**
 * NavLinks
 *
 * Client component for the navigation link list.
 * Subscribes to the engine's active nav href so the correct link
 * is visually highlighted as the user scrolls through scenes.
 */

"use client";

import Link from "next/link";
import { useCallback } from "react";

import { useNavigation } from "@/engine/hooks/use-navigation";
import { useStoryEngine } from "@/engine/hooks/use-story-engine";

interface NavItem {
  readonly label: string;
  readonly href: string;
}

interface NavLinksProps {
  items: readonly NavItem[];
}

export const NavLinks = ({ items }: NavLinksProps) => {
  const engine = useStoryEngine();
  const { activeNavHref } = useNavigation();
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith("#")) return;

      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;

      event.preventDefault();
      engine.scroll.scrollTo(target, { duration: 1 });
    },
    [engine.scroll],
  );

  return (
    <nav
      aria-label="Main navigation"
      className="flex max-w-[70vw] items-center gap-2 overflow-x-auto py-1 md:max-w-none md:gap-4"
    >
      {items.map((item) => {
        const isActive = activeNavHref === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={(event) => handleClick(event, item.href)}
            aria-current={isActive ? "page" : undefined}
            className={[
              "rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] whitespace-nowrap transition-colors duration-200 md:text-sm",
              isActive
                ? "border-brand-primary/50 bg-brand-primary/10 text-brand-primary"
                : "border-white/10 bg-white/5 text-text-secondary hover:text-text-primary",
            ].join(" ")}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};
