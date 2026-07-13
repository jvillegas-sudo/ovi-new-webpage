import Link from "next/link";

import { Container } from "@/components/atoms/container";
import { NavLinks } from "@/components/organisms/nav-links";
import { siteConfig } from "@/config/site";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-nav border-b border-white/10 bg-bg-glass/80 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="text-sm font-semibold tracking-[0.24em] text-text-primary">
          OVI
        </Link>
        {/*
          NavLinks is a client component that subscribes to the engine's
          active navigation href so the correct link is highlighted as the
          user scrolls through scenes.
        */}
        <NavLinks items={siteConfig.navigation} />
      </Container>
    </header>
  );
};
