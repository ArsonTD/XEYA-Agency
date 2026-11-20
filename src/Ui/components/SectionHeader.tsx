"use client";

import type { ReactNode } from "react";
import { motion, type MotionValue } from "framer-motion";
import ScrambleText from "@/Ui/components/core/ScrambleText";
import { EASE, inView } from "@/Ui/lib/motion";
import { cn } from "@/libs/utils";

interface Props {
  label: string;
  /** Color base (línea y contenido lateral); por defecto, para fondos oscuros */
  className?: string;
  /** Color de la etiqueta */
  accentClass?: string;
  /** Contenido opcional a la derecha */
  aside?: ReactNode;
  /** Dibuja la línea junto a la etiqueta (por defecto, sí) */
  line?: boolean;
  /** Avance de 0 a 1 que se dibuja sobre la propia línea (p. ej. el scroll dentro de la sección) */
  progress?: MotionValue<number>;
}

/** Cabecera de sección: etiqueta que se descifra y una línea que se traza. */
export default function SectionHeader({
  label,
  className = "text-white/50",
  accentClass = "text-laser",
  aside,
  line = true,
  progress,
}: Props) {
  return (
    <motion.div
      initial="hidden"
      whileInView="shown"
      viewport={inView}
      className={cn("label flex items-center gap-4", className)}
    >
      <ScrambleText text={label} className={accentClass} />
      {line && (
        <span aria-hidden="true" className="relative h-px flex-1">
          <motion.span
            className="absolute inset-0 origin-left bg-current opacity-40"
            variants={{
              hidden: { scaleX: 0 },
              shown: { scaleX: 1, transition: { duration: 1.6, ease: EASE } },
            }}
          />
          {/* Avance: la misma línea se va encendiendo de izquierda a derecha */}
          {progress && (
            <motion.span
              style={{ scaleX: progress }}
              className="laser-line absolute inset-0 origin-left"
            />
          )}
        </span>
      )}
      {aside}
    </motion.div>
  );
}
