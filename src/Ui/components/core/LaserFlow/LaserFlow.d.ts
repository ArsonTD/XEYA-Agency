import type { HTMLAttributes, ReactNode, RefObject } from "react";

export interface LaserTrailSegment {
  /** Inicio y fin del tramo, como fracción (x, y) de la caja de referencia */
  a: [number, number];
  b: [number, number];
  /** Distancia acumulada hasta el inicio del tramo, en anchos de la caja */
  at: number;
  /** Tramo que cae en hilo, gotea y se desvanece */
  drip?: boolean;
  /** Grosor del tramo respecto al del recorrido; [inicio, fin] para que se afine */
  width?: number | [number, number];
  /**
   * Medio ancho que el rayo debe cubrir en el tramo, en anchos de la caja;
   * [inicio, fin] para una cuña que se estrecha.
   */
  radius?: number | [number, number];
}

/** Extensión de XEYA: recorrido por el que el rayo sigue bajando tras tocar la superficie. */
export interface LaserTrail {
  /** Elemento cuya caja sirve de referencia para las coordenadas de los tramos */
  boxRef: RefObject<HTMLElement | null>;
  /** Hasta 10 tramos */
  segments: LaserTrailSegment[];
  /** Velocidad del frente según lo recorrido, en anchos de la caja por segundo */
  pace: (distance: number) => number;
  /** Segundos de espera tras el impacto del rayo */
  delay?: number;
  /** Distancia a la que el frente se detiene */
  limit?: number;
  /** Grosor del rayo en el recorrido respecto al haz (1 = igual) */
  width?: number;
  /** Brillo del rayo en el recorrido respecto al haz (1 = igual) */
  brightness?: number;
}

export interface LaserFlowProps extends HTMLAttributes<HTMLDivElement> {
  trail?: LaserTrail;
  surfaceRef?: RefObject<HTMLElement | null>;
  beamPosition?: number;
  surfaceLevel?: number;
  color?: string;
  intensity?: number;
  beamWidth?: number;
  flare?: number;
  spread?: number;
  spill?: number;
  fog?: number;
  dust?: number;
  streaks?: number;
  dots?: number;
  pulse?: number;
  speed?: number;
  seed?: number;
  mouseInteraction?: boolean;
  revealImage?: string;
  revealRadius?: number;
  revealOpacity?: number;
  intro?: boolean;
  theme?: "dark" | "light";
  paused?: boolean;
  dpr?: number;
}

export declare const LaserFlow: (props: LaserFlowProps) => ReactNode;
export default LaserFlow;
