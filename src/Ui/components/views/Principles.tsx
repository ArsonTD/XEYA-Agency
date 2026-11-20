"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import SectionHeader from "@/Ui/components/SectionHeader";
import type { CompanyValue, Principle } from "@/domain/company/CompanyProfile";
import { useHydrated } from "@/Ui/hooks/useHydrated";
import { usePrefersReducedMotion } from "@/Ui/hooks/useMediaQuery";
import { EASE } from "@/Ui/lib/motion";
import { scrollToPosition } from "@/Ui/lib/smoothScroll";
import { getCompanyProfile } from "@/infrastructure/container";
import { cn } from "@/libs/utils";

interface Step {
  key: string;
  /** La palabra grande: "Misión" */
  word: string;
  principle: Principle;
  values?: CompanyValue[];
}

/* La vista queda fija a una pantalla de alto: los tamaños crecen con el ancho, pero con tope según el
   alto (svh) para que palabra, enunciado y texto quepan también en portátiles bajos. */
const WORD =
  "font-display text-[length:clamp(3.2rem,min(13vw,20svh),13rem)] leading-[0.92] font-black tracking-[-0.04em] uppercase glow-soft";
const TITLE =
  "font-display text-[length:clamp(1.3rem,min(2.4vw,4.6svh),2.3rem)] leading-[1.1] font-extrabold tracking-[-0.02em] text-balance uppercase";
const BODY =
  "max-w-[58ch] text-lg leading-[1.55] text-mist md:text-xl lg:text-[length:clamp(1.25rem,min(0.65rem_+_1.15vw,3.5svh),1.875rem)]";
const VALUE_NAME =
  "text-[1.0625rem] leading-snug font-semibold text-white md:text-xl lg:text-[length:clamp(1.25rem,min(0.65rem_+_1.15vw,3.5svh),1.875rem)]";
const VALUE_TEXT =
  "mt-1.5 text-[0.9375rem] leading-normal text-mist md:text-lg lg:text-[length:clamp(1.125rem,min(0.55rem_+_0.95vw,3.1svh),1.6rem)]";

/* Pantallas muy bajas (teléfonos pequeños o en horizontal): el contenido no cabe en una vista fija. */
const SHORT_SCREEN = "(max-height: 620px)";

/* La palabra cambia letra a letra: las que salen se van hacia donde va el scroll y las nuevas llegan detrás. */
const word = {
  enter: {},
  center: { transition: { staggerChildren: 0.035 } },
  exit: { transition: { staggerChildren: 0.02 } },
};
const letter = {
  enter: (direction: number) => ({ y: direction > 0 ? "115%" : "-115%" }),
  center: { y: 0, transition: { duration: 0.7, ease: EASE } },
  exit: (direction: number) => ({
    y: direction > 0 ? "-115%" : "115%",
    transition: { duration: 0.4, ease: [0.7, 0, 0.84, 0] as const },
  }),
};
const content = {
  enter: (direction: number) => ({ opacity: 0, y: 28 * direction }),
  center: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay: 0.15 } },
  exit: (direction: number) => ({ opacity: 0, y: -20 * direction, transition: { duration: 0.3 } }),
};

/** Enunciado y texto de un principio (o la lista de valores). */
function StepContent({ step }: { step: Step }) {
  return (
    <div className="grid gap-x-12 gap-y-5 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <p className="label text-laser">{step.principle.label}</p>
        <p className={cn(TITLE, "mt-4")}>{step.principle.title}</p>
      </div>
      <div className="lg:col-span-7">
        {step.values ? (
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 md:gap-x-12 md:gap-y-8">
            {step.values.map((value) => (
              <div key={value.name}>
                <dt className={VALUE_NAME}>{value.name}</dt>
                <dd className={VALUE_TEXT}>{value.description}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className={BODY}>{step.principle.body}</p>
        )}
      </div>
    </div>
  );
}

export default function Principles() {
  const { mission, vision, valuesIntro, values } = getCompanyProfile();
  const steps: Step[] = [
    { key: "mision", word: "Misión", principle: mission },
    { key: "vision", word: "Visión", principle: vision },
    { key: "valores", word: "Valores", principle: valuesIntro, values },
  ];

  const still = usePrefersReducedMotion();
  const hydrated = useHydrated();
  // Se decide una sola vez: en el móvil, la barra del navegador cambia el alto al hacer scroll
  const [short] = useState(
    () => typeof window !== "undefined" && window.matchMedia(SHORT_SCREEN).matches,
  );

  // Con "reducir movimiento" o en pantallas muy bajas no se fija ni se anima nada.
  // El HTML generado lleva la vista fija: el tamaño de pantalla solo se conoce en el navegador.
  return still || (hydrated && short) ? (
    <StackedPrinciples steps={steps} />
  ) : (
    <PinnedPrinciples steps={steps} />
  );
}

/** Los tres principios uno debajo del otro, sin vista fija ni animación. */
function StackedPrinciples({ steps }: { steps: Step[] }) {
  return (
    <section id="principios" className="relative px-5 py-24 text-white md:px-8 md:py-36">
      <SectionHeader label="Principios" />
      <h2 className="sr-only">Principios: misión, visión y valores</h2>
      <div className="mt-14 flex flex-col gap-20 md:mt-24">
        {steps.map((step) => (
          <article key={step.key}>
            <h3 className={WORD}>{step.word}</h3>
            <div className="mt-8">
              <StepContent step={step} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/** Vista fija a pantalla completa: la palabra y su contenido cambian según avanza el scroll. */
function PinnedPrinciples({ steps }: { steps: Step[] }) {
  const track = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  // 1 = se avanza hacia abajo · -1 = se vuelve hacia arriba
  const [direction, setDirection] = useState(1);
  const shown = useRef(0);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const next = Math.min(steps.length - 1, Math.max(0, Math.floor(progress * steps.length)));
    if (next === shown.current) return;
    setDirection(next > shown.current ? 1 : -1);
    shown.current = next;
    setActive(next);
  });

  /** Lleva el scroll al tramo de un paso (para los botones de arriba). */
  const goTo = (index: number) => {
    const element = track.current;
    if (!element) return;
    const top = element.getBoundingClientRect().top + window.scrollY;
    const travel = element.offsetHeight - window.innerHeight;
    scrollToPosition(top + ((index + 0.5) / steps.length) * travel);
  };

  const step = steps[active];

  return (
    <section id="principios" className="relative text-white">
      <h2 className="sr-only">Principios: misión, visión y valores</h2>
      {/* La parte visible cambia con el scroll: el contenido completo va aparte para lectores de pantalla */}
      <div className="sr-only">
        {steps.map((item) => (
          <article key={item.key}>
            <h3>
              {item.principle.label}: {item.principle.title}
            </h3>
            {item.values ? (
              <ul>
                {item.values.map((value) => (
                  <li key={value.name}>
                    {value.name}: {value.description}
                  </li>
                ))}
              </ul>
            ) : (
              <p>{item.principle.body}</p>
            )}
          </article>
        ))}
      </div>

      {/* Recorrido: una pantalla de scroll por paso, con la vista fija mientras tanto */}
      <div ref={track} style={{ height: `${steps.length * 100}svh` }}>
        <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden px-5 pt-[min(4rem,8svh)] pb-[min(8rem,19svh)] md:px-8 md:pt-[min(6rem,11svh)] md:pb-[min(9rem,20svh)]">
          <span aria-hidden="true" className="aura top-1/4 -left-52 h-[520px] w-[520px]" />
          <span aria-hidden="true" className="aura -right-52 bottom-0 h-[480px] w-[480px]" />

          <div className="relative">
            <SectionHeader
              label="Principios"
              progress={scrollYProgress}
              aside={
                <nav aria-label="Misión, visión y valores">
                  <ul className="flex gap-4 md:gap-6">
                    {steps.map((item, i) => (
                      <li key={item.key}>
                        <button
                          type="button"
                          onClick={() => goTo(i)}
                          aria-current={i === active ? "step" : undefined}
                          className={cn(
                            "cursor-pointer uppercase transition-colors duration-300",
                            i === active ? "text-white" : "text-white/60 hover:text-laser",
                          )}
                        >
                          {item.word}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              }
            />
          </div>

          <div aria-hidden="true" className="relative flex flex-1 flex-col justify-center">
            {/* La palabra: recta, enorme, y con el relevo letra a letra tras una máscara */}
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.p
                key={step.key}
                custom={direction}
                variants={word}
                initial="enter"
                animate="center"
                exit="exit"
                className={cn(WORD, "-my-[0.12em] flex [overflow-y:clip] py-[0.12em]")}
              >
                {[...step.word].map((character, i) => (
                  <motion.span key={i} custom={direction} variants={letter} className="inline-block">
                    {character}
                  </motion.span>
                ))}
              </motion.p>
            </AnimatePresence>

            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={step.key}
                custom={direction}
                variants={content}
                initial="enter"
                animate="center"
                exit="exit"
                className="mt-[min(2rem,3.5svh)] md:mt-[min(3rem,5svh)]"
              >
                <StepContent step={step} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
