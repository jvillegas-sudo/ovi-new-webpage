"use client";

/**
 * Layout Component: Navbar
 *
 * Fixed navigation bar with glassmorphism effect on scroll.
 * Features:
 *   - Transparent on page load, glass on scroll
 *   - Mobile hamburger menu with animated drawer
 *   - Active link detection
 *   - Keyboard accessible
 *   - Skip-to-content link for screen readers
 *
 * Architecture:
 *   Navbar is a "client component" because it needs:
 *   - Scroll event listener
 *   - usePathname for active links
 *   - Animation state
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@utils/cn";
import { siteConfig } from "@config/site";
import { navbarSlide, mobileMenu, staggerContainer, staggerItem } from "@animations/variants";
import { Button } from "@components/ui/Button";
import { Container } from "@components/ui/Container";
import { ProductSearchTrigger } from "@features/product-search";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  // Detect scroll position for background transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <>
      {/* Skip to main content — accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-lg focus:bg-[var(--color-brand-primary)] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-black"
      >
        Ir al contenido principal
      </a>

      <motion.header
        className={cn(
          "fixed top-0 right-0 left-0 z-[var(--z-navbar)]",
          "transition-all duration-300",
          isScrolled
            ? "border-b border-[var(--color-border-subtle)] bg-[rgba(5,5,8,0.85)] backdrop-blur-xl"
            : "bg-transparent",
        )}
        variants={navbarSlide}
        initial="hidden"
        animate="visible"
        role="banner"
      >
        <Container>
          <nav
            className="flex h-16 items-center justify-between md:h-20"
            aria-label="Navegación principal"
          >
            {/* Logo */}
            <Link
              href="/"
              className="group flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-[var(--color-brand-primary)]"
              aria-label="OVI — Inicio"
            >
              <span className="text-xl font-black tracking-tighter text-[var(--color-brand-primary)] transition-all duration-200 group-hover:text-white">
                OVI
              </span>
              <span className="hidden text-xs font-medium tracking-widest text-[var(--color-text-secondary)] sm:block">
                — INGENIERÍA EN LIMPIEZA
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <ul className="hidden items-center gap-1 lg:flex">
              {siteConfig.nav.main.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "rounded-lg px-3 py-2 text-sm font-medium",
                      "transition-colors duration-200",
                      "hover:text-[var(--color-brand-primary)]",
                      "focus-visible:outline-2 focus-visible:outline-[var(--color-brand-primary)]",
                      pathname === link.href
                        ? "text-[var(--color-brand-primary)]"
                        : "text-[var(--color-text-secondary)]",
                    )}
                    aria-current={pathname === link.href ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Desktop CTA + Mobile Menu Toggle */}
            <div className="flex items-center gap-3">
              {/* Product Search trigger — desktop */}
              <ProductSearchTrigger variant="nav" className="hidden lg:inline-flex" />

              <Button variant="primary" size="sm" className="hidden lg:inline-flex" rounded="full">
                <Link href={siteConfig.nav.cta.href}>{siteConfig.nav.cta.label}</Link>
              </Button>

              {/* Mobile menu toggle */}
              <button
                className={cn(
                  "flex size-10 items-center justify-center rounded-lg lg:hidden",
                  "text-[var(--color-text-secondary)]",
                  "hover:bg-[var(--glass-bg)] hover:text-[var(--color-text-primary)]",
                  "transition-colors duration-200",
                  "focus-visible:outline-2 focus-visible:outline-[var(--color-brand-primary)]",
                )}
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                aria-expanded={isMobileOpen}
                aria-controls="mobile-menu"
                aria-label={isMobileOpen ? "Cerrar menú" : "Abrir menú"}
              >
                {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </nav>
        </Container>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              id="mobile-menu"
              className="border-t border-[var(--color-border-subtle)] bg-[rgba(5,5,8,0.95)] backdrop-blur-xl lg:hidden"
              variants={mobileMenu}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Container>
                <motion.ul
                  className="flex flex-col py-6"
                  variants={staggerContainer(0.06)}
                  initial="hidden"
                  animate="visible"
                >
                  {siteConfig.nav.main.map((link) => (
                    <motion.li key={link.href} variants={staggerItem}>
                      <Link
                        href={link.href}
                        className={cn(
                          "block rounded-lg px-4 py-3 text-base font-medium",
                          "transition-colors duration-200",
                          "hover:bg-[var(--glass-bg)] hover:text-[var(--color-brand-primary)]",
                          pathname === link.href
                            ? "text-[var(--color-brand-primary)]"
                            : "text-[var(--color-text-secondary)]",
                        )}
                        aria-current={pathname === link.href ? "page" : undefined}
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}

                  <motion.li variants={staggerItem} className="mt-4 px-4">
                    <Button variant="primary" fullWidth size="lg" rounded="full">
                      <Link href={siteConfig.nav.cta.href}>{siteConfig.nav.cta.label}</Link>
                    </Button>
                  </motion.li>

                  {/* Product search — mobile */}
                  <motion.li variants={staggerItem} className="mt-2 px-4">
                    <ProductSearchTrigger
                      variant="nav"
                      className="w-full justify-center rounded-full border border-[var(--color-border-default)] py-3 text-sm"
                    />
                  </motion.li>
                </motion.ul>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
