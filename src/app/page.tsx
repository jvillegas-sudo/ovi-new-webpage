import { Button, Container, Heading, Section, Text } from "@/components";
import { services } from "@/features/services";
import { TechnologyScene } from "@/scenes/technology";

export default function HomePage() {
  return (
    <>
      <Section className="service-section relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="service-section-panel" />
        <div className="service-section-floor-glow" />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-5xl text-center">
          <Heading className="text-4xl font-black uppercase leading-tight text-white md:text-6xl md:leading-[1.1]">
            Soluciones biodegradables para limpieza, mantenimiento y desinfección
          </Heading>
        </div>

        <div className="mt-20 grid gap-16 lg:grid-cols-3 lg:gap-10 xl:gap-14">
          {services.map((service) => (
            <article key={service.title} className="mx-auto flex w-full max-w-sm flex-col items-center text-center">
              <div className="relative mb-10 flex h-80 w-full items-center justify-center">
                <div aria-hidden="true" className="service-hexagon-clip service-hexagon-glow" />
                <div aria-hidden="true" className="service-hexagon-clip service-hexagon-highlight" />
                <div aria-hidden="true" className="service-hexagon-clip service-hexagon-base" />
                <div aria-hidden="true" className="service-orb-glow" />
                <div
                  aria-hidden="true"
                  className={`service-visual-frame relative z-10 h-72 w-72 overflow-hidden rounded-full border border-white/12 ${service.visualClassName}`}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.2),transparent_30%)]" />
                </div>
              </div>

              <h3 className="text-3xl font-extrabold tracking-tight text-white md:text-[2rem]">{service.title}</h3>
              <Text className="mt-6 max-w-[19rem] text-lg leading-relaxed text-[#c8d1ff] md:max-w-[21rem]">
                {service.description}
              </Text>
              <Button
                type="button"
                variant="cta"
                size="xl"
                aria-label={`Ver más sobre ${service.title}`}
                className="mt-10 min-w-52 font-extrabold uppercase tracking-wide"
              >
                Ver más
              </Button>
            </article>
          ))}
        </div>
      </Container>
    </Section>

    {/* Sprint 005 — Technology Experience */}
    <TechnologyScene />
    </>
  );
}
