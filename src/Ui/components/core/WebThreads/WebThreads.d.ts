import type { CSSProperties, ReactNode } from "react";

export interface WebThreadsProps {
  /** Degradado entre hilos, del primero al último (hasta seis colores) */
  colors?: string[];
  /** Color caliente donde los hilos se cruzan y convergen */
  coreColor?: string;
  backgroundColor?: string;
  lightMode?: boolean;
  /** Número de hilos, hasta 24 */
  threadCount?: number;
  speed?: number;
  frequency?: number;
  /** Cuánto se abren los hilos al alejarse del nudo */
  spread?: number;
  taper?: number;
  /** Altura del tejido, de 0 (abajo) a 1 (arriba) */
  position?: number;
  /** Dónde convergen los hilos a lo ancho, de 0 a 1 */
  pinch?: number;
  nodes?: number;
  angle?: number;
  glow?: number;
  falloff?: number;
  thickness?: number;
  brightness?: number;
  opacity?: number;
  depth?: number;
  pulses?: number;
  mirror?: boolean;
  shimmer?: boolean;
  /** Desvanece los hilos hacia ambos extremos */
  fade?: number;
  grain?: number;
  intro?: boolean;
  mouseInteraction?: boolean;
  mouseStrength?: number;
  pulseOnClick?: boolean;
  paused?: boolean;
  dpr?: number;
  className?: string;
  style?: CSSProperties;
}

declare const WebThreads: (props: WebThreadsProps) => ReactNode;
export default WebThreads;
