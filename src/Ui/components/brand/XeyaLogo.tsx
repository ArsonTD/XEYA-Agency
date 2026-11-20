"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { EASE } from "@/Ui/lib/motion";

/*
 * Logo XEYA redibujado en SVG a partir del arte original (public/brand/xeya-logo.png).
 * Coordenadas en el sistema del arte (1600×1280). Colores planos.
 */

const LETTER_W = 138;
const LETTER_H = 119;

const glyphs = {
  X: <path d="M13 -4 126 123M126 -4 13 123" strokeWidth={30} />,
  E: (
    <>
      <path d="M137 12.5H30Q12.5 12.5 12.5 30V89Q12.5 106.5 30 106.5H137" strokeWidth={25} />
      <path d="M38 60H125" strokeWidth={22} />
    </>
  ),
  Y: (
    <path
      d="M12.5 0V47Q12.5 72 37.5 72H100Q125 72 125 47V0M69 72V119"
      strokeWidth={25}
    />
  ),
  A: (
    <>
      <path d="M12.5 119V30Q12.5 12.5 30 12.5H108Q125.5 12.5 125.5 30V119" strokeWidth={25} />
      <path d="M12.5 77H125.5" strokeWidth={22} />
    </>
  ),
} as const;

type Letter = keyof typeof glyphs;

function Glyph({ letter, x, y = 0 }: { letter: Letter; x: number; y?: number }) {
  return (
    <svg x={x} y={y} width={LETTER_W} height={LETTER_H} viewBox={`0 0 ${LETTER_W} ${LETTER_H}`}>
      <g fill="none" stroke="currentColor">
        {glyphs[letter]}
      </g>
    </svg>
  );
}

/* Piezas del isotipo, en coordenadas del arte */
const LINE = "M760 342 1042 634 1044 760 1037 942 1031 760 1032 640Z";
const SHARDS = [
  { d: "M1132 342H1315L1085 596 1257 363Z", from: { x: 70, y: -70 } },
  { d: "M762 942 992 686 820 921 945 942Z", from: { x: -70, y: 70 } },
  { d: "M1314 942 1083 688 1255 921 1130 942Z", from: { x: 70, y: 70 } },
];

interface MarkProps {
  className?: string;
  /** Clase de color para las esquirlas; por defecto heredan currentColor */
  shardClass?: string;
}

/** Isotipo (la X de trazos). */
export function XeyaMark({ className, shardClass = "fill-current" }: MarkProps) {
  return (
    <svg viewBox="752 334 572 616" className={className} aria-hidden="true">
      <path d={LINE} fill="currentColor" />
      {SHARDS.map((s) => (
        <path key={s.d} d={s.d} className={shardClass} />
      ))}
    </svg>
  );
}

/** Una sola esquirla del isotipo, para composiciones decorativas. */
export function XeyaShard({ className }: { className?: string }) {
  return (
    <svg viewBox="762 686 230 256" className={className} aria-hidden="true">
      <path d={SHARDS[1].d} fill="currentColor" />
    </svg>
  );
}

/** Solo las letras X E Y A, espaciadas de forma uniforme. */
export function XeyaWordmark({ className, gap = 96 }: { className?: string; gap?: number }) {
  const step = LETTER_W + gap;
  return (
    <svg
      viewBox={`0 0 ${step * 3 + LETTER_W} ${LETTER_H}`}
      className={className}
      role="img"
      aria-label="XEYA"
    >
      {(["X", "E", "Y", "A"] as Letter[]).map((l, i) => (
        <Glyph key={l} letter={l} x={i * step} />
      ))}
    </svg>
  );
}

interface LogoProps extends MarkProps {
  /** Reproduce la animación de entrada */
  animated?: boolean;
  onIntroComplete?: () => void;
}

const LETTERS: { letter: Letter; x: number }[] = [
  { letter: "X", x: 252 },
  { letter: "E", x: 540 },
  { letter: "Y", x: 825 },
  { letter: "A", x: 1113 },
];

/** Logotipo horizontal completo, tal como en el arte original. */
export default function XeyaLogo({
  className,
  shardClass = "fill-blue",
  animated = false,
  onIntroComplete,
}: LogoProps) {
  const id = useId();

  return (
    <motion.svg
      viewBox="236 326 1094 632"
      className={className}
      role="img"
      aria-label="XEYA"
      initial={animated ? "hidden" : false}
      animate="shown"
    >
      <defs>
        <clipPath id={`${id}-line`}>
          <motion.rect
            x={750}
            y={330}
            width={310}
            variants={{ hidden: { height: 0 }, shown: { height: 620 } }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
          />
        </clipPath>
      </defs>

      <path d={LINE} fill="currentColor" clipPath={`url(#${id}-line)`} />

      {SHARDS.map((s, i) => (
        <motion.path
          key={s.d}
          d={s.d}
          className={shardClass}
          variants={{
            hidden: { opacity: 0, x: s.from.x, y: s.from.y },
            shown: { opacity: 1, x: 0, y: 0 },
          }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.75 + i * 0.14 }}
        />
      ))}

      {LETTERS.map(({ letter, x }, i) => (
        <motion.g
          key={letter}
          variants={{
            hidden: { opacity: 0, y: 36 },
            shown: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.8, ease: EASE, delay: 1.35 + i * 0.12 }}
          onAnimationComplete={i === LETTERS.length - 1 ? onIntroComplete : undefined}
        >
          <Glyph letter={letter} x={x} y={583} />
        </motion.g>
      ))}
    </motion.svg>
  );
}
