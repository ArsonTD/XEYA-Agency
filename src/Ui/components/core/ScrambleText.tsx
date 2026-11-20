"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const GLYPHS = "XEYA<>/\\_+=01";

/** Texto que se "descifra" de izquierda a derecha al entrar en pantalla. Pensado para tipografía mono. */
export default function ScrambleText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { once: true, margin: "-8% 0px" });
  const reduced = useReducedMotion();
  const [output, setOutput] = useState(text);

  useEffect(() => {
    if (!visible || reduced) return;
    const total = text.length + 10;
    let frame = 0;
    const id = window.setInterval(() => {
      frame += 1;
      const revealed = Math.floor((frame / total) * text.length);
      setOutput(
        text
          .split("")
          .map((char, i) =>
            i < revealed || char === " "
              ? char
              : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          )
          .join(""),
      );
      if (frame >= total) {
        window.clearInterval(id);
        setOutput(text);
      }
    }, 34);
    return () => window.clearInterval(id);
  }, [visible, reduced, text]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{output}</span>
    </span>
  );
}
