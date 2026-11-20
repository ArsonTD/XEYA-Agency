"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { MARK_BOX, MARK_LINE, MARK_SHARDS } from "@/Ui/components/brand/logoArt";

/*
 * Banda en arco: una cinta blanca curvada hacia arriba con el texto recorriendo
 * la curva y la X de XEYA entre palabra y palabra. Avanza sola muy despacio y,
 * sobre todo, se mueve con el scroll.
 *
 * Todo se dibuja en unidades de diseño (1 unidad = 1 px en una pantalla de
 * 1440 px). En pantallas pequeñas la escala no baja de MIN_SCALE para que la
 * banda y el texto sigan siendo legibles; lo que cambia es cuánto arco se ve.
 */

const DESIGN_WIDTH = 1440;
const MIN_SCALE = 0.62;
const MAX_SCALE = 1.3;

/** Flecha del arco como fracción del ancho visible */
const SAG_RATIO = 0.089;
const THICKNESS = 58;
const FONT_SIZE = 44;
const PADDING = 12;
/** El arco continúa más allá de los bordes para que no se vean sus extremos */
const OVERHANG = 160;

/** Unidades por segundo que avanza sola */
const DRIFT = 16;
/** Unidades que avanza por cada píxel de scroll */
const SCROLL_FACTOR = 0.9;

const BAND = "#f2f5f7";
const INK = "#02080e";
const BRAND_BLUE = "#0563a8";

/** Hueco entre palabras donde va el logo (espacios que no se colapsan) */
const GAP = " ".repeat(5);
/** Alto del logo dentro de la cinta */
const MARK_HEIGHT = THICKNESS * 0.64;
const MARK_SCALE = MARK_HEIGHT / MARK_BOX.height;
const MARK_CENTER = {
  x: MARK_BOX.x + MARK_BOX.width / 2,
  y: MARK_BOX.y + MARK_BOX.height / 2,
};

function geometry(width: number) {
  const sag = width * SAG_RATIO;
  const half = width / 2;
  const radius = (half * half + sag * sag) / (2 * sag);
  const peak = PADDING + THICKNESS / 2;
  const centerY = peak + radius;
  const reach = half + OVERHANG;
  const endY = centerY - Math.sqrt(radius * radius - reach * reach);
  // En los bordes la banda va inclinada y ocupa algo más de alto
  const tilt = half / Math.sqrt(radius * radius - half * half);
  const height = peak + sag + (THICKNESS / 2) * Math.sqrt(1 + tilt * tilt) + PADDING;
  const halfAngle = Math.asin(reach / radius);
  return {
    half,
    radius,
    centerY,
    halfAngle,
    height: Math.ceil(height),
    arcLength: 2 * radius * halfAngle,
    d: `M${-OVERHANG} ${endY.toFixed(2)} A${radius.toFixed(2)} ${radius.toFixed(2)} 0 0 1 ${(width + OVERHANG).toFixed(2)} ${endY.toFixed(2)}`,
  };
}

export default function Marquee({ items }: { items: string[] }) {
  const pathId = `arco-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const wrapper = useRef<HTMLDivElement>(null);
  const measure = useRef<SVGTextElement>(null);
  const textPath = useRef<SVGTextPathElement>(null);
  const markNodes = useRef<(SVGGElement | null)[]>([]);

  /** Ancho del lienzo en unidades de diseño, y píxeles por unidad */
  const [view, setView] = useState({ width: DESIGN_WIDTH, scale: 1 });
  /** Largo de una vuelta del texto y centro de cada hueco, en unidades */
  const [metrics, setMetrics] = useState<{ loop: number; gaps: number[] }>({ loop: 0, gaps: [] });

  const words = useMemo(() => items.map((item) => item.toUpperCase()), [items]);
  const phrase = useMemo(() => words.map((word) => word + GAP).join(""), [words]);
  const shape = useMemo(() => geometry(view.width), [view.width]);
  const { loop, gaps } = metrics;
  const copies = loop > 0 ? Math.ceil(shape.arcLength / loop) + 2 : 1;

  // El lienzo sigue al ancho del contenedor
  useEffect(() => {
    const node = wrapper.current;
    if (!node) return;
    const fit = () => {
      const px = node.clientWidth;
      if (px <= 0) return;
      const scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, px / DESIGN_WIDTH));
      setView({ width: Math.round(px / scale), scale });
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Medidas con la tipografía real: largo de la vuelta y dónde cae cada hueco
  useEffect(() => {
    let alive = true;
    const read = () => {
      const node = measure.current;
      if (!alive || !node) return;
      const centers: number[] = [];
      let index = 0;
      for (const word of words) {
        index += word.length;
        const before = node.getSubStringLength(0, index);
        const gap = node.getSubStringLength(index, GAP.length);
        centers.push(before + gap / 2);
        index += GAP.length;
      }
      setMetrics({ loop: node.getComputedTextLength(), gaps: centers });
    };
    read();
    document.fonts?.ready.then(read);
    return () => {
      alive = false;
    };
  }, [words, phrase]);

  // Movimiento: deriva lenta + scroll
  useEffect(() => {
    const node = wrapper.current;
    const target = textPath.current;
    if (!node || !target || loop <= 0) return;

    /** Coloca el texto y los logos para un desplazamiento dado. */
    const place = (offset: number) => {
      target.setAttribute("startOffset", offset.toFixed(2));
      markNodes.current.forEach((mark, i) => {
        if (!mark) return;
        const copy = Math.floor(i / gaps.length);
        const along = offset + copy * loop + gaps[i % gaps.length];
        if (along < -MARK_HEIGHT || along > shape.arcLength + MARK_HEIGHT) {
          mark.setAttribute("visibility", "hidden");
          return;
        }
        const angle = -shape.halfAngle + along / shape.radius;
        const x = shape.half + shape.radius * Math.sin(angle);
        const y = shape.centerY - shape.radius * Math.cos(angle);
        mark.setAttribute("visibility", "visible");
        mark.setAttribute(
          "transform",
          `translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${((angle * 180) / Math.PI).toFixed(2)})`,
        );
      });
    };

    let offset = -loop;
    place(offset);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let pending = 0;
    let lastScroll = window.scrollY;
    let lastTime = 0;
    let frame = 0;
    let visible = true;

    const onScroll = () => {
      const y = window.scrollY;
      // Al bajar, el texto corre hacia la izquierda; al subir, hacia la derecha
      pending -= ((y - lastScroll) * SCROLL_FACTOR) / view.scale;
      lastScroll = y;
    };

    const tick = (now: number) => {
      const dt = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 0;
      lastTime = now;
      offset += DRIFT * dt + pending;
      pending = 0;
      offset = (((offset % loop) + loop) % loop) - loop;
      place(offset);
      frame = visible ? requestAnimationFrame(tick) : 0;
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frame) {
        lastTime = 0;
        frame = requestAnimationFrame(tick);
      }
    });
    observer.observe(node);
    window.addEventListener("scroll", onScroll, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [loop, gaps, shape, view.scale]);

  const viewBox = `0 0 ${view.width} ${shape.height}`;
  const textStyle = {
    fontFamily: "var(--font-mono)",
    fontSize: FONT_SIZE,
    fontWeight: 700,
    letterSpacing: "0.13em",
  };

  return (
    <div ref={wrapper} aria-hidden="true" className="relative overflow-hidden bg-ink pt-4 md:pt-8">
      {/* La cinta va en su propio SVG: no cambia, así que el navegador no la redibuja */}
      <svg viewBox={viewBox} className="block w-full">
        <path
          d={shape.d}
          fill="none"
          stroke={BAND}
          strokeWidth={THICKNESS}
          style={{ filter: "drop-shadow(0 0 16px rgba(70, 200, 255, 0.35))" }}
        />
      </svg>

      <svg viewBox={viewBox} className="absolute inset-x-0 bottom-0 block w-full">
        <defs>
          <path id={pathId} d={shape.d} />
        </defs>
        <text ref={measure} xmlSpace="preserve" style={{ ...textStyle, visibility: "hidden" }}>
          {phrase}
        </text>
        {loop > 0 && (
          <>
            <text xmlSpace="preserve" dy="0.36em" fill={INK} style={textStyle}>
              <textPath ref={textPath} href={`#${pathId}`} startOffset={-loop} xmlSpace="preserve">
                {phrase.repeat(copies)}
              </textPath>
            </text>

            {/* Un logo por cada hueco, colocado sobre la curva en cada fotograma */}
            {Array.from({ length: copies * gaps.length }, (_, i) => (
              <g
                key={i}
                ref={(node) => {
                  markNodes.current[i] = node;
                }}
                visibility="hidden"
              >
                <g
                  transform={`scale(${MARK_SCALE.toFixed(4)}) translate(${-MARK_CENTER.x} ${-MARK_CENTER.y})`}
                >
                  {MARK_SHARDS.map((d) => (
                    <path key={d} d={d} fill={BRAND_BLUE} />
                  ))}
                  <path d={MARK_LINE} fill={INK} />
                </g>
              </g>
            ))}
          </>
        )}
      </svg>

      <span className="laser-line-soft absolute inset-x-0 bottom-0" />
    </div>
  );
}
