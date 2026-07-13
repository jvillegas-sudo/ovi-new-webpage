/**
 * NavLinks
 *
 * Client component for the navigation link list.
 * Subscribes to the engine's active nav href so the correct link
 * is visually highlighted as the user scrolls through scenes.
 */

"use client";

import Link from "next/link";

import { useNavigation } from "@/engine/hooks/use-navigation";

interface NavItem {
  readonly label: string;
  readonly href: string;
}

interface NavLinksProps {
  items: readonly NavItem[];
}

export const NavLinks = ({ items }: NavLinksProps) => {
  const { activeNavHref } = useNavigation();

  return (
    <nav aria-label="Main navigation" className="hidden gap-6 md:flex">
      {items.map((item) => {
        const isActive = activeNavHref === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={[
              "text-sm transition-colors duration-200",
              isActive
                ? "text-brand-primary"
                : "text-text-secondary hover:text-text-primary",
            ].join(" ")}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};
