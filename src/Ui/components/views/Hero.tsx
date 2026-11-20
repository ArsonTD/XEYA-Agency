"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import XeyaLogo from "@/Ui/components/brand/XeyaLogo";
import LaserFlow from "@/Ui/components/core/LaserFlow/LaserFlow";
import type { LaserTrailSegment } from "@/Ui/components/core/LaserFlow/LaserFlow";
import { useHydrated } from "@/Ui/hooks/useHydrated";
import { useLiteDevice } from "@/Ui/hooks/useMediaQuery";
import { getCompanyProfile } from "@/infrastructure/container";

interface HeroProps {
  onIntroComplete: () => void;
}

/* Marco del arte del logotipo: x 236–1330, y 326–958 */
const ART = { x: 236, y: 326, width: 1094, height: 632 };

/** Punto del arte → fracción de la caja del logotipo */
const at = (x: number, y: number): [number, number] => [
  (x - ART.x) / ART.width,
  (y - ART.y) / ART.height,
];

/*
 * Superficie donde cae el láser: el borde superior de la esquirla azul de
 * arriba (x 1132–1315, y 342). El haz cae a un 30 % de ese borde (x ≈ 1187).
 */
const SURFACE = { left: "81.9%", right: "1.4%", top: "2.5%", height: 1 };
const BEAM_AT = 0.3;

/*
 * Recorrido del rayo sobre lo azul, en coordenadas del arte. `from` es la
 * distancia acumulada desde donde cae el haz. Son tres trazos: baja por la
 * esquirla superior hasta su punta y, tras el hueco del centro de la X, baja
 * por cada esquirla inferior, dobla la esquina y termina en la punta de su
 * base. `radius` hace que el rayo cubra todo el ancho de la esquirla.
 */
const ROUTE: {
  a: [number, number];
  b: [number, number];
  from: number;
  /** Medio ancho que el rayo debe cubrir, en unidades del arte; [inicio, fin] */
  radius?: [number, number];
}[] = [
  // Esquirla superior: del punto de caída a la esquina y diagonal abajo hasta la punta.
  // Aquí el rayo cubre todo el ancho de la esquirla: ancho arriba y en cuña hasta la punta.
  { a: [1187, 346], b: [1288, 352], from: 0, radius: [5, 15] },
  { a: [1288, 352], b: [1086, 595], from: 101, radius: [17, 0] },
  // Esquirla inferior izquierda: de la punta a la esquina (cuña que se abre)
  // y por la base hasta su punta (cuña que se cierra). Algo más fino que la
  // esquirla, para que el azul asome a los lados.
  { a: [992, 688], b: [791, 931], from: 556, radius: [0, 10] },
  { a: [791, 931], b: [943, 941], from: 871, radius: [8, 0] },
  // Esquirla inferior derecha: lo mismo, en espejo
  { a: [1083, 690], b: [1285, 931], from: 515, radius: [0, 10] },
  { a: [1285, 931], b: [1132, 941], from: 830, radius: [8, 0] },
];
/** Distancia a la que el frente ya salió por la punta más lejana */
const ROUTE_END = 1150;

const SEGMENTS: LaserTrailSegment[] = ROUTE.map(({ a, b, from, radius }) => ({
  a: at(...a),
  b: at(...b),
  at: from / ART.width,
  radius: radius && [radius[0] / ART.width, radius[1] / ART.width],
}));

/** Velocidad del frente (unidades del arte por segundo): lento en los bordes, rápido en las bajadas. */
function pace(distance: number) {
  const s = distance * ART.width;
  let speed: number;
  if (s < 103) speed = 300;
  else if (s < 417) speed = 340 + ((s - 103) / 314) * 420;
  else if (s < 830) speed = 760;
  else speed = 420;
  return speed / ART.width;
}

export default function Hero({ onIntroComplete }: HeroProps) {
  const { tagline } = getCompanyProfile();
  const sectionRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const surfaceRef = useRef<HTMLSpanElement>(null);
  const [beam, setBeam] = useState(0.75);
  // El láser es WebGL a pantalla completa: en teléfono se dibuja a un píxel por punto
  // (la pantalla de un iPhone tiene 2 o 3), que es de cuatro a nueve veces menos trabajo.
  const hydrated = useHydrated();
  const lite = useLiteDevice();

  const trail = useMemo(
    () => ({
      boxRef: logoRef,
      segments: SEGMENTS,
      pace,
      // Espera a que las esquirlas del logo terminen de colocarse
      delay: 1.1,
      limit: ROUTE_END / ART.width,
      // Mucho más fino que el haz, para que el azul se vea a los lados
      width: 0.22,
      brightness: 0.9,
    }),
    [],
  );

  // El haz se alinea con la esquirla sea cual sea el tamaño de pantalla.
  useEffect(() => {
    const section = sectionRef.current;
    const surface = surfaceRef.current;
    if (!section || !surface) return;
    const align = () => {
      const box = section.getBoundingClientRect();
      const rect = surface.getBoundingClientRect();
      if (box.width > 0) setBeam((rect.left + rect.width * BEAM_AT - box.left) / box.width);
    };
    align();
    const observer = new ResizeObserver(align);
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative flex min-h-svh flex-col overflow-hidden bg-ink text-white"
    >
      {/* Logo */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-8 py-10">
        <div ref={logoRef} className="relative w-[min(86vw,1040px,118svh)]">
          <span ref={surfaceRef} aria-hidden="true" style={SURFACE} className="absolute" />
          <h1 className="sr-only">XEYA — {tagline}</h1>
          <XeyaLogo
            animated
            onIntroComplete={onIntroComplete}
            className="relative w-full text-white"
          />
        </div>
      </div>

      {/* Láser por encima del logo: la luz se suma a lo que tiene debajo */}
      <div className="pointer-events-none absolute inset-0 z-20 mix-blend-screen">
        {hydrated && (
        <LaserFlow
          dpr={lite ? 1 : undefined}
          surfaceRef={surfaceRef}
          beamPosition={beam}
          color="#1f7fd6"
          intensity={1.6}
          beamWidth={1.2}
          flare={1.1}
          spread={0.9}
          spill={1}
          fog={0.2}
          dust={1.4}
          trail={trail}
        />
        )}
      </div>
    </section>
  );
}
