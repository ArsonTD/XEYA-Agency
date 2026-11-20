import RevealLines from "@/Ui/components/core/RevealLines";
import SectionHeader from "@/Ui/components/SectionHeader";
import ServiceCarousel from "@/Ui/components/ServiceCarousel";
import { getCompanyProfile } from "@/infrastructure/container";

interface Props {
  /** La página ya terminó su intro: el carrusel puede prepararse sin esperar al scroll */
  warm?: boolean;
}

export default function Services({ warm = false }: Props) {
  const { services } = getCompanyProfile();

  return (
    <section
      id="servicios"
      className="relative overflow-x-clip px-5 pt-28 pb-16 text-white md:px-8 md:pt-44 md:pb-24"
    >
      <span aria-hidden="true" className="aura top-96 -right-48 h-[520px] w-[520px]" />

      <div className="relative">
        <SectionHeader label="Servicios" line={false} />

        <RevealLines
          lines={["Lo que", <span className="glow-soft">hacemos</span>]}
          className="mt-14 font-display text-[clamp(2rem,8.6vw,9.5rem)] leading-[0.88] font-black tracking-[-0.03em] uppercase md:mt-24"
        />

        <div className="mt-10 md:mt-16">
          <ServiceCarousel services={services} warm={warm} />
        </div>
      </div>
    </section>
  );
}
