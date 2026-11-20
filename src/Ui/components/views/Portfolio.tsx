"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { usePrefersReducedMotion } from "@/Ui/hooks/useMediaQuery";
import { ArrowUpRight } from "lucide-react";
import Carousel from "@/Ui/components/core/Carousel/Carousel";
import CurvedLoop from "@/Ui/components/core/CurvedLoop/CurvedLoop";
import { LaptopMockup, PhoneMockup } from "@/Ui/components/devices/DeviceMockups";
import { liveHost, screensFor, type Project } from "@/domain/portfolio/Project";
import { getProjects } from "@/infrastructure/container";
import { cn } from "@/libs/utils";

/*
 * Tope de tamaño de los dispositivos según el alto de la pantalla, para que una
 * tarjeta nunca sea más alta que la ventana en pantallas bajas.
 */
const STAGE_ROOM = "(100svh - 23rem)";

/** Tiempo que cada proyecto queda en pantalla antes de pasar al siguiente (ms) */
const AUTOPLAY_MS = 6000;

/* Colores del carrusel: barras de avance en azul láser sobre un riel tenue. */
const CAROUSEL_VARS = {
  "--carousel-ink": "var(--color-laser)",
  "--carousel-faint": "rgba(255, 255, 255, 0.25)",
} as CSSProperties;

/* Flechas como los botones circulares del resto del sitio: blancas, y azules al pasar el cursor. */
const ARROWS =
  "[&_.carousel-arrow]:size-12! [&_.carousel-arrow]:bg-white! [&_.carousel-arrow]:bg-none! [&_.carousel-arrow]:text-ink! [&_.carousel-arrow]:shadow-none! [&_.carousel-arrow:not(:disabled):hover]:bg-laser! [&_.carousel-controls]:gap-5!";

interface StageProps {
  project: Project;
  /** 0 = todavía entrando · 1 = en su sitio */
  focus: MotionValue<number>;
  still: boolean;
}

/**
 * Los dispositivos del proyecto: laptop sola, laptop con un teléfono delante,
 * o un abanico de teléfonos cuando el proyecto es solo móvil.
 */
function DeviceStage({ project, focus, still }: StageProps) {
  const [laptop] = screensFor(project, "laptop");
  const phones = screensFor(project, "phone");

  const phoneY = useTransform(focus, [0, 1], ["18%", "0%"]);
  const leftX = useTransform(focus, [0, 1], ["44%", "0%"]);
  const rightX = useTransform(focus, [0, 1], ["-44%", "0%"]);
  const leftTurn = useTransform(focus, [0, 1], [0, -5]);
  const rightTurn = useTransform(focus, [0, 1], [0, 5]);

  if (laptop) {
    const [phone] = phones;
    return (
      <div className={cn("relative", phone && "pb-[5%]")}>
        <LaptopMockup screen={laptop} className={phone ? "w-[92%]" : "w-full"} />
        {phone && (
          <motion.div
            style={still ? undefined : { y: phoneY }}
            className="absolute right-0 bottom-0 w-[18%]"
          >
            <PhoneMockup screen={phone} />
          </motion.div>
        )}
      </div>
    );
  }

  const [main, left, right] = phones;
  if (!main) return null;

  return (
    <div className="flex items-end justify-center">
      {left && (
        <motion.div
          style={still ? { rotate: -5 } : { x: leftX, rotate: leftTurn }}
          className="relative -mr-[8%] mb-[6%] w-[32%] md:-mr-[5%] md:w-[26%]"
        >
          <PhoneMockup screen={left} />
        </motion.div>
      )}
      <div className="relative z-10 w-[38%] md:w-[30%]">
        <PhoneMockup screen={main} />
      </div>
      {right && (
        <motion.div
          style={still ? { rotate: 5 } : { x: rightX, rotate: rightTurn }}
          className="relative -ml-[8%] mb-[6%] w-[32%] md:-ml-[5%] md:w-[26%]"
        >
          <PhoneMockup screen={right} />
        </motion.div>
      )}
    </div>
  );
}

/**
 * El contenido de un proyecto: dispositivos a un lado y, al otro, nombre,
 * etiquetas, descripción y enlace. Cuando la sección entra en pantalla los
 * dispositivos se levantan de frente y los teléfonos se despliegan; después
 * quedan quietos, de modo que cada tarjeta llega ya formada al deslizarse.
 */
function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLElement>(null);
  const still = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.3"] });

  const focus = useTransform(scrollYProgress, [0.15, 1], [0, 1]);
  const tilt = useTransform(focus, [0, 1], [22, 0]);
  const scale = useTransform(focus, [0, 1], [0.9, 1]);
  const floor = useTransform(focus, [0, 1], [0.25, 1]);
  const detailOpacity = useTransform(focus, [0.5, 1], [0, 1]);
  const detailY = useTransform(focus, [0.5, 1], [20, 0]);

  const host = liveHost(project);
  // Alto aproximado de cada composición respecto a su ancho: laptop 0.62, teléfonos 0.74
  const stageRatio = screensFor(project, "laptop").length > 0 ? 0.62 : 0.74;

  const stage = (
    <motion.div
      style={
        still
          ? undefined
          : { rotateX: tilt, scale, transformPerspective: 1400, transformOrigin: "50% 100%" }
      }
    >
      <DeviceStage project={project} focus={focus} still={still} />
    </motion.div>
  );

  return (
    <article ref={ref} className="grid items-center gap-x-12 gap-y-10 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <div className="mx-auto w-full" style={{ maxWidth: `calc(${STAGE_ROOM} / ${stageRatio})` }}>
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.name}: ver en vivo`}
              draggable={false}
              className="block"
            >
              {stage}
            </a>
          ) : (
            stage
          )}
          {/* La superficie sobre la que descansan los dispositivos */}
          <motion.span
            aria-hidden="true"
            style={still ? undefined : { scaleX: floor }}
            className="laser-line-soft mx-auto mt-[4%] block w-[88%]"
          />
        </div>
      </div>

      <div className="lg:col-span-5 lg:pl-4">
        <h3 className="font-display text-[clamp(1.75rem,3.4vw,3.25rem)] leading-[1] font-black tracking-[-0.03em] text-balance uppercase">
          {project.name}
        </h3>

        <ul className="mt-6 flex flex-wrap gap-2.5">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="label rounded-full border border-[rgba(127,212,255,0.35)] px-4 py-2 text-mist"
            >
              {tag}
            </li>
          ))}
        </ul>

        <motion.div style={still ? undefined : { opacity: detailOpacity, y: detailY }}>
          <p className="mt-8 max-w-[48ch] text-lg leading-[1.7] text-mist/85 md:text-xl">
            {project.description}
          </p>

          {project.liveUrl && (
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                draggable={false}
                className="label group inline-flex items-center gap-4 rounded-full border border-white/45 py-1.5 pr-1.5 pl-6 text-white transition-colors duration-300 hover:border-laser"
              >
                Ver en vivo
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink transition-colors duration-300 group-hover:bg-laser">
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
              {host && <span className="label text-white/60 normal-case">{host}</span>}
            </div>
          )}
        </motion.div>
      </div>
    </article>
  );
}

export default function Portfolio() {
  const projects = getProjects();

  // El carrusel pide una proporción fija para todas las tarjetas: se calcula midiendo
  // el contenido, de modo que la más alta quepa entera a cualquier ancho de pantalla.
  const contents = useRef<(HTMLDivElement | null)[]>([]);
  const [aspect, setAspect] = useState(2.2);

  useEffect(() => {
    const measure = () => {
      const boxes = contents.current.filter((box): box is HTMLDivElement => box !== null);
      if (boxes.length === 0) return;
      const width = boxes[0].offsetWidth;
      const tallest = Math.max(...boxes.map((box) => box.offsetHeight));
      if (width <= 0 || tallest <= 0) return;
      const next = Math.round((width / tallest) * 100) / 100;
      setAspect((current) => (Math.abs(current - next) < 0.02 ? current : next));
    };

    measure();
    const observer = new ResizeObserver(measure);
    contents.current.forEach((box) => box && observer.observe(box));
    return () => observer.disconnect();
  }, [projects]);

  const cards = useMemo(
    () =>
      projects.map((project, i) => (
        <div
          key={project.slug}
          className="flex h-full items-center rounded-[28px] border border-[rgba(127,212,255,0.16)] bg-[#040c15] text-white"
        >
          <div
            ref={(box) => {
              contents.current[i] = box;
            }}
            className="w-full p-6 md:p-10 xl:p-12"
          >
            <ProjectCard project={project} />
          </div>
        </div>
      )),
    [projects],
  );

  return (
    <section
      id="portfolio"
      className="relative overflow-x-clip px-5 pt-4 pb-28 text-white md:px-8 md:pt-8 md:pb-44"
    >
      <span aria-hidden="true" className="aura top-[30rem] -right-48 h-[520px] w-[520px]" />
      <span aria-hidden="true" className="aura top-1/2 -left-56 h-[520px] w-[520px]" />

      <div className="relative">
        <h2 className="sr-only">Proyectos</h2>
        {/*
          Titular en bucle (React Bits CurvedLoop), a todo el ancho de la página.
          El arco se dibuja fuera de la caja del SVG: el relleno le reserva ese
          espacio, y `min-h-0!` anula el alto de pantalla completa que trae la demo.
        */}
        <div
          aria-hidden="true"
          className="-mx-5 pt-[3vw] pb-[6.5vw] md:-mx-8 [&_.curved-loop-jacket]:min-h-0!"
        >
          {/* El separador es el isotipo de XEYA: el carácter U+E000 de la fuente "XEYA Mark" */}
          <CurvedLoop
            marqueeText="Proyectos"
            separator={""}
            separatorColor="#46c8ff"
            color="#ffffff"
            className="font-display"
            fontSize={150}
            fontWeight={900}
            letterSpacing={-3}
            curveAmount={300}
            speed={1.5}
            scrollBoost={0.6}
          />
        </div>
        <p className="mx-auto mt-6 max-w-[120ch] text-center text-lg leading-relaxed text-balance text-mist/75 md:mt-8 md:text-xl">
          Sitios y productos que hoy están en producción: puntos de venta, pedidos por WhatsApp,
          facturación electrónica y tiendas en línea.
        </p>

        {/*
          Carrusel (React Bits Carousel): los proyectos pasan de lado, solos cada
          pocos segundos o con las flechas; también se pueden arrastrar. Se detiene
          al pasar el cursor, al enfocarlo y mientras se arrastra.
        */}
        <Carousel
          items={cards}
          baseWidth="100%"
          aspectRatio={aspect}
          effect="slide"
          gap={32}
          radius={28}
          frame={false}
          arrows
          indicator="bars"
          autoplay
          autoplayDelay={AUTOPLAY_MS}
          pauseOnHover
          loop
          theme="dark"
          style={CAROUSEL_VARS}
          className={cn("mx-auto mt-16 max-w-[1560px]! md:mt-24", ARROWS)}
        />
      </div>
    </section>
  );
}
