"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { EASE, inView } from "@/Ui/lib/motion";

/** Titular cuyas líneas suben una a una desde una máscara al entrar en pantalla. */
export default function RevealLines({
  lines,
  className,
}: {
  lines: ReactNode[];
  className?: string;
}) {
  return (
    <motion.h2
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={inView}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.1 } } }}
    >
      {lines.map((line, i) => (
        <span key={i} className="-my-[0.2em] block overflow-hidden py-[0.2em]">
          <motion.span
            className="block"
            variants={{
              hidden: { y: "135%" },
              shown: { y: 0, transition: { duration: 1.1, ease: EASE } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  );
}
