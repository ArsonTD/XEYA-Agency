"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { usePrefersReducedMotion } from "@/Ui/hooks/useMediaQuery";

interface WordProps {
  text: string;
  accent: boolean;
  progress: MotionValue<number>;
  index: number;
  total: number;
  still: boolean;
}

/** Palabra que se "enciende" según avanza el scroll. */
function LitWord({ text, accent, progress, index, total, still }: WordProps) {
  const start = index / total;
  // Apagadas, pero legibles: las de color láser parten de más arriba porque contrastan menos
  const opacity = useTransform(progress, [start, start + 1 / total], [accent ? 0.62 : 0.4, 1]);
  return (
    <motion.span style={still ? undefined : { opacity }} className={accent ? "glow-text" : undefined}>
      {text}{" "}
    </motion.span>
  );
}

interface Props {
  text: string;
  /** Cuántas palabras del final van en color láser */
  accent?: number;
  as?: "h2" | "h3";
  className?: string;
}

/** Titular cuyas palabras se van encendiendo una a una a medida que entra en pantalla. */
export default function LitHeadline({ text, accent = 0, as: Tag = "h3", className }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  const still = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.95", "end 0.6"] });
  const words = text.split(/\s+/).filter(Boolean);

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <LitWord
          key={`${i}-${word}`}
          text={word}
          accent={i >= words.length - accent}
          progress={scrollYProgress}
          index={i}
          total={words.length}
          still={still}
        />
      ))}
    </Tag>
  );
}
