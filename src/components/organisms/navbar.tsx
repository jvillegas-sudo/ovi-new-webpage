import Link from "next/link";

import { siteConfig } from "@/config/site";
import { Container } from "@/components/atoms/container";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-nav border-b border-white/10 bg-bg-glass/80 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="text-sm font-semibold tracking-[0.24em] text-text-primary">
          OVI
        </Link>
        <nav aria-label="Main navigation" className="hidden gap-6 md:flex">
          {siteConfig.navigation.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-text-secondary hover:text-text-primary">
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
};
