"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FocusEvent,
  type PointerEvent,
  type WheelEvent,
} from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import type { Service } from "@/domain/company/CompanyProfile";
import { useMediaQuery } from "@/Ui/hooks/useMediaQuery";
import { calmMoment } from "@/Ui/lib/calm";
import { EASE } from "@/Ui/lib/motion";
import { prepareTitleFont, renderTitleCard, type TitleCard } from "@/Ui/lib/serviceTitleArt";

// El carrusel dibuja con WebGL (ogl): va en su propio archivo y se descarga aparte del resto.
// Se carga a mano (sin React.lazy) para que se cree justo en el momento tranquilo elegido.
const loadCarousel = () => import("@/Ui/components/core/FlexCarousel/FlexCarousel");
type CarouselComponent = Awaited<ReturnType<typeof loadCarousel>>["default"];

/* Medidas que se le pasan al carrusel. También se usan para saber qué título hay bajo el cursor. */
const WIDE = { cardHeight: 0.34, gap: 56 };
const NARROW = { cardHeight: 0.27, gap: 28 };

/** Segundos entre un avance automático y el siguiente */
const AUTOPLAY_SECONDS = 2;
const AUTOPLAY_SECONDS_TOUCH = 3.6;

/** Tiempo que tarda la fila en asentarse tras moverse (ms) */
const REST_MS = 750;
/** Duración de la entrada del carrusel (ms) */
const INTRO_MS = 2600;

const wrap = (value: number, size: number) =>
  ((((value + size / 2) % size) + size) % size) - size / 2;

/**
 * Qué título queda bajo el cursor. El carrusel dibuja en un canvas y no informa
 * de ello, pero su fila es predecible cuando está quieta: la tarjeta activa va
 * centrada y las demás la siguen a lo ancho según su tamaño y la separación.
 * (El "cristal" solo las desplaza en vertical, así que basta con la posición horizontal.)
 */
function cardUnder(
  clientX: number,
  stage: DOMRect,
  cards: TitleCard[],
  active: number,
  { cardHeight, gap }: { cardHeight: number; gap: number },
): number | null {
  const height = Math.max(24, cardHeight * stage.height);
  const widths = cards.map((card) => card.aspect * height);
  const centers: number[] = [];
  let cursor = 0;
  widths.forEach((width) => {
    centers.push(cursor + width / 2);
    cursor += width + gap;
  });
  const loop = Math.max(cursor, 1);
  const fromCenter = clientX - stage.left - stage.width / 2;

  for (let i = 0; i < cards.length; i++) {
    const distance = wrap(fromCenter - (centers[i] - centers[active]), loop);
    if (Math.abs(distance) <= widths[i] / 2) return i;
  }
  return null;
}

/**
 * Los servicios como una fila de títulos que se dobla (React Bits FlexCarousel).
 * Al pasar el cursor por un título aparece su descripción; con teclado o en
 * pantallas táctiles, se muestra la del título que está en el centro.
 *
 * Dibujar los títulos y crear el lienzo bloquea el navegador un instante: se hace con
 * antelación (`warm`) y en momentos en que la página está quieta, para que no se note
 * como un tirón al hacer scroll. Fuera de pantalla el carrusel no dibuja; su entrada
 * empieza cuando se ve.
 */
export default function ServiceCarousel({
  services,
  warm = false,
}: {
  services: Service[];
  warm?: boolean;
}) {
  const stage = useRef<HTMLDivElement>(null);
  const near = useInView(stage, { once: true, margin: "600px 0px" });
  const seen = useInView(stage, { once: true });
  const wide = useMediaQuery("(min-width: 768px)");
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)");
  const measures = wide ? WIDE : NARROW;

  const [cards, setCards] = useState<TitleCard[] | null>(null);
  const [FlexCarousel, setFlexCarousel] = useState<CarouselComponent | null>(null);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [keyboard, setKeyboard] = useState(false);

  const activeIndex = useRef(0);
  const pointerX = useRef<number | null>(null);
  const quietUntil = useRef(0);
  const settle = useRef(0);

  // Si la sección ya está cerca no se espera a que la página esté quieta
  const urgent = useRef(false);
  useEffect(() => {
    urgent.current = near;
  }, [near]);

  // Dibuja los títulos y crea el carrusel: tras la intro de la página o cuando la sección se acerca
  const begin = warm || near;
  useEffect(() => {
    if (!begin) return;
    let alive = true;
    const hurry = () => urgent.current;

    const prepare = async () => {
      await calmMoment(hurry);
      const component = loadCarousel();
      await prepareTitleFont();
      await calmMoment(hurry);
      if (!alive) return;
      const drawn = services.map((service) => renderTitleCard(service.name));
      const { default: Carousel } = await component;
      await calmMoment(hurry);
      if (!alive) return;
      setFlexCarousel(() => Carousel);
      setCards(drawn);
    };

    prepare().catch((error) =>
      console.error("No se pudieron dibujar los títulos de servicios:", error),
    );
    return () => {
      alive = false;
    };
  }, [begin, services]);

  // La entrada del carrusel corre cuando se ve: mientras dura, el cursor no cambia la descripción
  useEffect(() => {
    if (seen && cards) quietUntil.current = performance.now() + INTRO_MS;
  }, [seen, cards]);

  useEffect(() => () => window.clearTimeout(settle.current), []);

  const items = useMemo(
    () =>
      cards?.map((card, i) => ({
        src: card.src,
        alt: services[i].name,
        title: services[i].name,
      })),
    [cards, services],
  );

  const locate = useCallback(() => {
    const element = stage.current;
    if (!element || !cards || pointerX.current === null) {
      setHovered(null);
      return;
    }
    setHovered(
      cardUnder(
        pointerX.current,
        element.getBoundingClientRect(),
        cards,
        activeIndex.current,
        measures,
      ),
    );
  }, [cards, measures]);

  /** La fila se mueve: se oculta la descripción y se recalcula cuando se asienta. */
  const rest = useCallback(() => {
    setHovered(null);
    quietUntil.current = performance.now() + REST_MS;
    window.clearTimeout(settle.current);
    settle.current = window.setTimeout(locate, REST_MS);
  }, [locate]);

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    pointerX.current = event.clientX;
    if (event.buttons !== 0) {
      rest();
      return;
    }
    if (performance.now() >= quietUntil.current) locate();
  };

  const onPointerLeave = () => {
    pointerX.current = null;
    setHovered(null);
  };

  const onWheel = (event: WheelEvent<HTMLDivElement>) => {
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) rest();
  };

  const onFocus = (event: FocusEvent<HTMLDivElement>) => {
    setKeyboard(event.target.matches(":focus-visible"));
  };

  const onChange = useCallback(
    (index: number) => {
      activeIndex.current = index;
      setActive(index);
      rest();
    },
    [rest],
  );

  // Con ratón, la descripción responde al cursor; sin él, a la tarjeta centrada
  const shown = hovered ?? (!canHover || keyboard ? active : null);

  return (
    <div>
      {/* El carrusel es un canvas: el contenido también va como texto para lectores de pantalla */}
      <ul className="sr-only">
        {services.map((service) => (
          <li key={service.name}>
            {service.name}: {service.description}
          </li>
        ))}
      </ul>

      <div
        ref={stage}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerDown={rest}
        onWheel={onWheel}
        onKeyDown={rest}
        onFocus={onFocus}
        onBlur={() => setKeyboard(false)}
        className="relative -mx-5 h-[clamp(220px,30vw,420px)] md:-mx-8"
      >
        {items && FlexCarousel && (
          <FlexCarousel
            items={items}
            preset="liquid"
            intro="rise"
            cardHeight={measures.cardHeight}
            gap={measures.gap}
            squeeze={0.2}
            focusOnClick={false}
            captions={false}
            captureWheel={false}
            // Avanza sola, como un slider infinito; el componente la pausa al pasar el cursor,
            // al enfocarla y al interactuar. Sin cursor va más despacio: ahí la descripción
            // cambia con cada paso y hay que dar tiempo a leerla.
            autoplay
            interval={canHover ? AUTOPLAY_SECONDS : AUTOPLAY_SECONDS_TOUCH}
            onChange={onChange}
            className="mix-blend-screen"
          />
        )}
      </div>

      {/* Sin aria-live: con el avance automático anunciaría cada cambio; el texto ya está en la lista de arriba */}
      <div className="mx-auto flex min-h-[8.5rem] max-w-[60ch] flex-col items-center justify-start text-center">
        <AnimatePresence mode="wait">
          {shown !== null ? (
            <motion.div
              key={shown}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <p className="label text-laser">{services[shown].name}</p>
              <p className="mt-4 text-xl leading-relaxed text-mist md:text-2xl">
                {services[shown].description}
              </p>
            </motion.div>
          ) : (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="label text-white/70"
            >
              Pasa el cursor por un servicio · arrastra para ver más
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
