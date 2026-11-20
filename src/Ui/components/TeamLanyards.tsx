"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";
import type { TeamMember } from "@/domain/company/CompanyProfile";
import { useLiteDevice, useMediaQuery } from "@/Ui/hooks/useMediaQuery";
import { useTeamTurn } from "@/Ui/hooks/useTeamTurn";
import { prepareBadgeFonts, renderBadge, renderStrap, type BadgeArt } from "@/Ui/lib/badgeArt";
import { calmMoment } from "@/Ui/lib/calm";
import { rotate } from "@/Ui/lib/visitRotation";

// three.js pesa: el Lanyard va en su propio archivo y se descarga aparte del resto de la página.
// Se carga a mano (sin React.lazy) para que cada credencial se cree justo cuando le toca:
// con lazy, React retrasa la primera y acaba creándola junto con la segunda.
const loadLanyard = () => import("@/Ui/components/core/Lanyard/Lanyard");
type LanyardComponent = Awaited<ReturnType<typeof loadLanyard>>["default"];

/** Cada credencial cuelga a una altura distinta para que no parezcan una fila rígida */
const STRAP_LENGTHS = [0.34, 0.56, 0.42];

/*
 * En teléfono tres credenciales en fila quedan diminutas: van una por fila, más
 * grandes y con la cinta corta, cada una colgando de su propia línea.
 */
const ROW_QUERY = "(min-width: 640px)";
const PHONE = { size: 0.8, strapLength: 0.26 };

/** Lo necesario para colgar las credenciales: sus imágenes y, para la versión 3D, el componente */
interface Kit {
  /** Sin componente: versión ligera, la credencial se muestra como imagen */
  Lanyard: LanyardComponent | null;
  badges: BadgeArt[];
  strap: string;
}

/** Cada credencial fija se balancea a su ritmo, para que no vayan a la vez */
const SWAY_DELAYS = ["0s", "-2.1s", "-3.7s"];

/**
 * Credencial como imagen (teléfonos y tabletas): la misma tarjeta que dibuja el Lanyard,
 * colgada de una cinta y con un balanceo suave hecho en CSS. Sin WebGL ni three.js.
 */
function StaticBadge({ front, index }: { front: string; index: number }) {
  return (
    <div className="flex h-full justify-center overflow-hidden">
      <div
        className="flex h-full origin-top animate-sway flex-col items-center"
        style={{ animationDelay: SWAY_DELAYS[index % SWAY_DELAYS.length] }}
      >
        {/* Cinta y enganche */}
        <span aria-hidden="true" className="w-4 flex-1 bg-blue" />
        <span aria-hidden="true" className="-mt-1 h-3.5 w-7 rounded-[3px] bg-[#4b5560]" />
        <img
          src={front}
          alt=""
          className="-mt-1 h-[78%] w-auto rounded-[5%] border border-[rgba(127,212,255,0.22)] shadow-[0_18px_40px_-18px_rgba(0,0,0,0.9)]"
        />
        <span className="h-[5%]" />
      </div>
    </div>
  );
}

/**
 * Tres credenciales colgantes (Lanyard de React Bits), una por persona del equipo.
 * Los lugares rotan en cada visita: nadie queda siempre en la misma posición.
 *
 * Crear cada credencial bloquea el navegador algo más de una décima de segundo (lienzo
 * WebGL, reflejos, sombreadores). Para que no se note como un tirón al hacer scroll, se
 * preparan con antelación (`warm`), de una en una y en momentos en que la página está quieta.
 * Fuera de pantalla no dibujan nada: su animación de entrada empieza cuando se ven.
 *
 * En teléfonos y tabletas no se usa el Lanyard: tres escenas 3D con física son demasiado
 * para un móvil, así que cada credencial se muestra como imagen (ver `StaticBadge`).
 */
export default function TeamLanyards({ team, warm = false }: { team: TeamMember[]; warm?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inRow = useMediaQuery(ROW_QUERY);
  const lite = useLiteDevice();
  const turn = useTeamTurn(team.length);
  const people = useMemo(() => rotate(team, turn), [team, turn]);
  const near = useInView(ref, { once: true, margin: "700px 0px" });
  const [kit, setKit] = useState<Kit | null>(null);
  /** Cuántas credenciales están ya creadas */
  const [hung, setHung] = useState(0);

  // Si la sección ya está cerca no se espera a que la página esté quieta
  const urgent = useRef(false);
  useEffect(() => {
    urgent.current = near;
  }, [near]);

  const begin = warm || near;
  useEffect(() => {
    if (!begin) return;
    let alive = true;
    const hurry = () => urgent.current;

    const prepare = async () => {
      await calmMoment(hurry);
      // En la versión ligera three.js ni se descarga
      const component = lite ? null : loadLanyard();
      await prepareBadgeFonts();
      const badges: BadgeArt[] = [];
      for (const person of people) {
        await calmMoment(hurry);
        if (!alive) return;
        badges.push(await renderBadge(person));
      }
      const Lanyard = component ? (await component).default : null;
      if (!alive) return;
      setKit({ Lanyard, badges, strap: renderStrap() });
      for (let count = 1; count <= people.length; count++) {
        await calmMoment(hurry);
        if (!alive) return;
        setHung(count);
      }
    };

    prepare().catch((error) => console.error("No se pudieron dibujar las credenciales:", error));
    return () => {
      alive = false;
    };
  }, [begin, people, lite]);

  return (
    <div ref={ref} className="grid grid-cols-1 sm:grid-cols-3">
      {people.map((person, i) => (
        <figure key={person.name} className="relative min-w-0 pb-7 sm:pb-0">
          {/* En teléfono, la segunda y la tercera cuelgan de su propia línea */}
          {i > 0 && (
            <span aria-hidden="true" className="laser-line-soft absolute inset-x-0 top-0 sm:hidden" />
          )}
          <div className="h-[min(106vw,420px)] sm:h-[clamp(240px,58vw,560px)] lg:h-[clamp(380px,33vw,540px)]">
            {kit && !kit.Lanyard && i < hung && <StaticBadge front={kit.badges[i].front} index={i} />}
            {kit?.Lanyard && i < hung && (
              <kit.Lanyard
                frontImage={kit.badges[i].front}
                backImage={kit.badges[i].back}
                strapImage={kit.strap}
                cardColor="#06121c"
                strapColor="#0563a8"
                metal="graphite"
                finish="glossy"
                cornerRadius={0.22}
                size={inRow ? 0.6 : PHONE.size}
                strapLength={inRow ? STRAP_LENGTHS[i % STRAP_LENGTHS.length] : PHONE.strapLength}
                breeze={0.22}
              />
            )}
          </div>
          {/* El nombre y el cargo ya van impresos en la tarjeta; esto es para lectores de pantalla */}
          <figcaption className="sr-only">
            {person.name}, {person.role}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
