/**
 * Layout Component: Footer
 *
 * Site-wide footer with:
 *   - Navigation groups
 *   - Brand/tagline
 *   - Social links
 *   - Legal links and copyright
 *
 * Semantic: uses <footer> element with role="contentinfo"
 */

import Link from "next/link";
import { siteConfig } from "@config/site";
import { Container } from "@components/ui/Container";

export function Footer() {
  return (
    <footer
      className="border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)]"
      role="contentinfo"
    >
      <Container>
        <div className="py-16">
          {/* Top section: brand + nav groups */}
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-5">
            {/* Brand */}
            <div className="col-span-2 lg:col-span-2">
              <Link href="/" className="inline-flex items-center gap-2" aria-label="OVI — Inicio">
                <span className="text-xl font-black tracking-tighter text-[var(--color-brand-primary)]">
                  OVI
                </span>
                <span className="text-xs font-medium tracking-widest text-[var(--color-text-secondary)]">
                  — INGENIERÍA EN LIMPIEZA
                </span>
              </Link>

              <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--color-text-tertiary)]">
                {siteConfig.description}
              </p>

              {/* Social links */}
              <div className="mt-6 flex items-center gap-3">
                {siteConfig.social.linkedin && (
                  <a
                    href={siteConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-9 items-center justify-center rounded-lg border border-[var(--color-border-subtle)] text-[var(--color-text-tertiary)] transition-all duration-200 hover:border-[var(--color-border-default)] hover:text-[var(--color-text-primary)]"
                    aria-label="OVI en LinkedIn"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                )}
              </div>
            </div>

            {/* Nav groups */}
            {siteConfig.footer.groups.map((group) => (
              <div key={group.title}>
                <h3 className="mb-4 text-xs font-semibold tracking-widest text-[var(--color-text-tertiary)] uppercase">
                  {group.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-[var(--color-text-secondary)] transition-colors duration-200 hover:text-[var(--color-brand-primary)]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom section: copyright + legal */}
          <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[var(--color-border-subtle)] pt-8 sm:flex-row sm:items-center">
            <p className="text-xs text-[var(--color-text-tertiary)]">
              {siteConfig.footer.copyright}
            </p>

            <ul className="flex items-center gap-4">
              {siteConfig.footer.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-[var(--color-text-tertiary)] transition-colors duration-200 hover:text-[var(--color-text-secondary)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}
