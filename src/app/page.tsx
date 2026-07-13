import { Button, Container, Heading, Section, Text } from "@/components";
import { services } from "@/features/services";

const HEXAGON_CLIP_PATH_CLASS = "[clip-path:polygon(25%_5%,75%_5%,100%_50%,75%_95%,25%_95%,0_50%)]";
const SECTION_PANEL_CLASS =
  "absolute left-[-18%] top-0 h-[28rem] w-[52rem] bg-[#24357f] [clip-path:polygon(0_0,100%_0,58%_100%,0_100%)] opacity-95";
const HEXAGON_GLOW_CLASS = "absolute top-5 h-64 w-64 bg-[rgba(53,73,170,0.32)] blur-sm";
const HEXAGON_HIGHLIGHT_CLASS =
  "absolute top-11 h-56 w-56 bg-[linear-gradient(180deg,rgba(126,196,255,0.72)_0%,rgba(31,51,130,0.58)_32%,rgba(31,44,118,0.88)_100%)]";
const HEXAGON_BASE_CLASS = "absolute top-16 h-52 w-52 bg-[rgba(24,35,99,0.9)]";
const ORB_GLOW_CLASS =
  "absolute top-8 h-14 w-14 rounded-full bg-[radial-gradient(circle,rgba(170,223,255,0.95)_0%,rgba(108,170,255,0.65)_42%,transparent_75%)] blur-md";

export default function HomePage() {
  return (
    <Section className="relative overflow-hidden bg-[#16235d] py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className={SECTION_PANEL_CLASS} />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-[radial-gradient(circle_at_center,rgba(41,63,150,0.24),transparent_70%)]" />
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
                <div aria-hidden="true" className={`${HEXAGON_GLOW_CLASS} ${HEXAGON_CLIP_PATH_CLASS}`} />
                <div aria-hidden="true" className={`${HEXAGON_HIGHLIGHT_CLASS} ${HEXAGON_CLIP_PATH_CLASS}`} />
                <div aria-hidden="true" className={`${HEXAGON_BASE_CLASS} ${HEXAGON_CLIP_PATH_CLASS}`} />
                <div aria-hidden="true" className={ORB_GLOW_CLASS} />
                <div
                  aria-hidden="true"
                  className={`relative z-10 h-72 w-72 overflow-hidden rounded-full border border-white/12 shadow-[0_18px_40px_rgba(4,10,35,0.4)] ${service.visualClassName}`}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.2),transparent_30%)]" />
                </div>
              </div>

              <h3 className="text-3xl font-extrabold tracking-tight text-white md:text-[2rem]">{service.title}</h3>
              <Text className="mt-6 max-w-[19rem] text-lg leading-10 text-[#c8d1ff] md:max-w-[21rem] md:leading-10">
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
  );
}
