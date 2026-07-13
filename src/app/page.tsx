import { Container, Heading, Section, Text } from "@/components";
import { services } from "@/features/services";
import { IndustrialApplicationsScene } from "@/scenes/industrial-applications";
import { LaboratoryScene } from "@/scenes/laboratory";
import { ProductsScene } from "@/scenes/products";
import { TechnologyScene } from "@/scenes/technology";

const implementedScenes = [
  {
    label: "Technology",
    href: "#technology",
    status: "Ready for review",
    description: "Network-driven molecular storytelling with progressive headlines and capability reveals.",
  },
  {
    label: "Laboratory",
    href: "#laboratory",
    status: "Ready for review",
    description: "Interactive digital lab with stations, overlays, and reduced-motion fallback coverage.",
  },
  {
    label: "Industries",
    href: "#industries",
    status: "Ready for review",
    description: "Sector walkthrough with environment switching, metrics, and guided scene navigation.",
  },
  {
    label: "Products",
    href: "#products",
    status: "Ready for review",
    description: "Immersive product ecosystem with comparison, filtering, and inspection states.",
  },
] as const;

const placeholderModules = [
  {
    title: "Biotechnology Narrative",
    status: "Placeholder",
    description:
      "Use this temporary section to review pacing, hierarchy, and content density before the dedicated scene is produced.",
  },
  {
    title: "Impact Dashboard",
    status: "Placeholder",
    description:
      "Reserve this module for KPI storytelling, proof points, and commercial outcomes tied to the completed experiences above.",
  },
  {
    title: "OVI OS + Contact",
    status: "Placeholder",
    description:
      "Keep the final stretch reviewable with lightweight messaging until the operating system and contact funnel are designed.",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <Section
        id="solutions"
        className="service-section relative overflow-hidden py-20 sm:py-24 md:py-28"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="service-section-panel" />
          <div className="service-section-floor-glow" />
        </div>

        <Container className="relative z-10">
          <div className="grid gap-14 xl:grid-cols-[1.1fr_0.9fr] xl:items-start">
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-secondary">
                Review Sprint · Developer Preview Build
              </p>
              <Heading className="mt-5 text-4xl font-black uppercase leading-tight text-white sm:text-5xl md:text-6xl md:leading-[1.05]">
                Soluciones biodegradables para limpieza, mantenimiento y desinfección
              </Heading>
              <Text className="mt-6 max-w-3xl text-base leading-8 text-[#d9e1ff] sm:text-lg">
                This pass is focused on polish only: the completed scenes are connected, the
                homepage is review-ready, and the unfinished modules are represented with
                intentional placeholder content instead of broken navigation.
              </Text>

              <div className="mt-8 flex flex-wrap gap-3">
                {implementedScenes.map((scene) => (
                  <a
                    key={scene.href}
                    href={scene.href}
                    className="rounded-full border border-white/15 bg-white/8 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:border-brand-primary/50 hover:bg-brand-primary/10"
                  >
                    Jump to {scene.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {implementedScenes.map((scene) => (
                <article
                  key={scene.label}
                  className="rounded-[1.75rem] border border-white/10 bg-bg-glass/80 p-5 shadow-glass backdrop-blur-xl"
                >
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-brand-primary">
                    {scene.status}
                  </p>
                  <h2 className="mt-3 text-2xl font-black uppercase tracking-tight text-white">
                    {scene.label}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-text-secondary">{scene.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-16 grid gap-16 lg:grid-cols-3 lg:gap-10 xl:gap-14">
            {services.map((service) => (
              <article
                key={service.title}
                className="mx-auto flex w-full max-w-sm flex-col items-center text-center"
              >
                <div className="relative mb-10 flex h-72 w-full items-center justify-center sm:h-80">
                  <div aria-hidden="true" className="service-hexagon-clip service-hexagon-glow" />
                  <div
                    aria-hidden="true"
                    className="service-hexagon-clip service-hexagon-highlight"
                  />
                  <div aria-hidden="true" className="service-hexagon-clip service-hexagon-base" />
                  <div aria-hidden="true" className="service-orb-glow" />
                  <div
                    aria-hidden="true"
                    className={`service-visual-frame relative z-10 h-64 w-64 overflow-hidden rounded-full border border-white/12 sm:h-72 sm:w-72 ${service.visualClassName}`}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.2),transparent_30%)]" />
                  </div>
                </div>

                <h3 className="text-3xl font-extrabold tracking-tight text-white md:text-[2rem]">
                  {service.title}
                </h3>
                <Text className="mt-6 max-w-[19rem] text-lg leading-relaxed text-[#c8d1ff] md:max-w-[21rem]">
                  {service.description}
                </Text>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <TechnologyScene />
      <LaboratoryScene />
      <IndustrialApplicationsScene />
      <ProductsScene />

      <Section id="company" className="relative overflow-hidden py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-primary">
              Temporary placeholder modules
            </p>
            <Heading className="mt-5 text-3xl font-black uppercase text-white sm:text-4xl">
              Review the current implementation without unfinished sections getting in the way
            </Heading>
            <Text className="mt-5 text-base leading-8 text-text-secondary sm:text-lg">
              The next sprint can replace these blocks with fully designed scenes. For now they
              preserve story continuity, responsive spacing, and navigation coverage.
            </Text>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {placeholderModules.map((module) => (
              <article
                key={module.title}
                className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-glass"
              >
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-brand-secondary">
                  {module.status}
                </p>
                <h2 className="mt-3 text-2xl font-black uppercase tracking-tight text-white">
                  {module.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-text-secondary">{module.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="contact" className="border-t border-white/10 py-16 sm:py-20">
        <Container>
          <div className="grid gap-8 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glass lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-primary">
                Contact placeholder
              </p>
              <Heading className="mt-4 text-3xl font-black uppercase text-white sm:text-4xl">
                Ready for review, not for net-new scope
              </Heading>
              <Text className="mt-4 max-w-2xl text-base leading-8 text-text-secondary">
                Sprint 009 should build on this polished review build by replacing placeholder
                modules, tightening performance budgets, and turning the temporary navigation into
                final information architecture.
              </Text>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-text-muted">
                  Current focus
                </p>
                <p className="mt-3 text-lg font-black uppercase tracking-tight text-white">
                  Stability, reviewability, and responsive polish
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-text-muted">
                  Next sprint
                </p>
                <p className="mt-3 text-lg font-black uppercase tracking-tight text-white">
                  Replace placeholders with final modules and measured content
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
