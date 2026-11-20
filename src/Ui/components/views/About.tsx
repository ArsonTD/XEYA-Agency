"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import LitHeadline from "@/Ui/components/core/LitHeadline";
import SectionHeader from "@/Ui/components/SectionHeader";
import TeamLanyards from "@/Ui/components/TeamLanyards";
import { useTeamTurn } from "@/Ui/hooks/useTeamTurn";
import { EASE, inView } from "@/Ui/lib/motion";
import { scrollToTarget } from "@/Ui/lib/smoothScroll";
import { rotate } from "@/Ui/lib/visitRotation";
import { FOUNDERS_SLOT } from "@/domain/company/CompanyProfile";
import { getCompanyProfile } from "@/infrastructure/container";

/** Resalta los nombres del equipo dentro de un párrafo. */
function highlightNames(text: string, names: string[]): ReactNode[] {
  if (names.length === 0) return [text];
  const escaped = names.map((name) => name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  return text.split(new RegExp(`(${escaped.join("|")})`, "g")).map((part, i) =>
    names.includes(part) ? (
      <strong key={i} className="font-semibold text-white">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

interface Props {
  /** La página ya terminó su intro: las credenciales 3D pueden prepararse sin esperar al scroll */
  warm?: boolean;
}

export default function About({ warm = false }: Props) {
  const { story, team, tagline } = getCompanyProfile();
  const names = team.map((person) => person.name);
  // Quienes fundaron la empresa se nombran en el mismo orden en que cuelgan sus credenciales,
  // que rota en cada visita: ninguno de los dos va siempre primero.
  const turn = useTeamTurn(team.length);
  const founders = rotate(team, turn)
    .filter((person) => person.founder)
    .map((person) => person.name);
  const teamStory = story.team.replace(FOUNDERS_SLOT, founders.join(" y "));

  return (
    <section id="xeya" className="relative overflow-x-clip px-5 pb-20 text-white md:px-8 md:pb-28">
      <span aria-hidden="true" className="aura top-10 -left-40 h-[420px] w-[420px]" />
      <span aria-hidden="true" className="aura -right-56 bottom-96 h-[520px] w-[520px]" />

      <div className="relative grid items-start gap-x-12 gap-y-20 lg:grid-cols-12">
        {/* El equipo: las credenciales cuelgan de la línea superior y, debajo, quiénes son */}
        <div className="lg:col-span-7">
          <TeamLanyards team={team} warm={warm} />

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 1, ease: EASE }}
            className="mx-auto mt-10 max-w-[120ch] text-center md:mt-14"
          >
            <h3 className="font-display text-2xl leading-none font-extrabold tracking-[-0.02em] uppercase md:text-4xl">
              El equipo
            </h3>
            <p className="mt-6 text-lg leading-[1.75] text-pretty text-mist/85 md:text-xl md:leading-[1.7]">
              {highlightNames(teamStory, names)}
            </p>
          </motion.div>
        </div>

        {/* Qué es XEYA, en una frase y un párrafo */}
        <div className="lg:col-span-5 lg:pt-16">
          <SectionHeader label="¿Quiénes somos?" line={false} />
          <LitHeadline
            as="h2"
            text={tagline}
            accent={2}
            className="mt-10 font-display text-[clamp(1.55rem,7.2vw,5rem)] leading-[0.96] font-black tracking-[-0.03em] uppercase md:mt-14 lg:text-[3.05vw]"
          />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 1, ease: EASE, delay: 0.15 }}
          >
            <p className="mt-8 max-w-[46ch] text-xl leading-relaxed text-mist/85 md:mt-10">
              {story.today}
            </p>

            {/* En teléfono van los dos en una fila, más compactos; desde `sm`, a su tamaño completo */}
            <div className="mt-10 flex items-center gap-x-2 gap-y-5 sm:flex-wrap sm:gap-x-8 md:mt-12">
              {/* Principal: píldora blanca con la flecha en su propio círculo */}
              <button
                type="button"
                onClick={() => scrollToTarget("contacto")}
                className="label group inline-flex shrink-0 cursor-pointer items-center gap-1.5 tracking-[0.1em] whitespace-nowrap sm:gap-3 sm:tracking-[0.16em]"
              >
                <span className="rounded-full bg-white px-4 py-3.5 text-ink transition-colors duration-300 group-hover:bg-laser sm:px-10 sm:py-4">
                  Hablemos
                </span>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink transition-colors duration-300 group-hover:bg-laser sm:h-12 sm:w-12">
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </button>
              {/* Secundario: la misma píldora, solo con borde */}
              <button
                type="button"
                onClick={() => scrollToTarget("portfolio")}
                className="label group inline-flex shrink-0 cursor-pointer items-center gap-2.5 rounded-full border border-white/45 py-1.5 pr-1.5 pl-4 tracking-[0.1em] whitespace-nowrap text-white transition-colors duration-300 hover:border-laser sm:gap-4 sm:pl-7 sm:tracking-[0.16em]"
              >
                Ver proyectos
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-ink transition-colors duration-300 group-hover:bg-laser sm:h-10 sm:w-10">
                  <ArrowDown className="h-4 w-4 transition-transform duration-500 ease-expo group-hover:translate-y-0.5" />
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
