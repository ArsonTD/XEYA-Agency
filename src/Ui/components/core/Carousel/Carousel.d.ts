import type { CSSProperties, ReactElement, ReactNode } from "react";

/** Tarjeta con campos fijos; también se puede pasar una imagen (URL) o un componente propio. */
export interface CarouselCardItem {
  id?: string | number;
  image?: string;
  alt?: string;
  icon?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
}

export type CarouselItem = CarouselCardItem | string | ReactElement;

export interface CarouselProps {
  items?: CarouselItem[];
  /** Ancho máximo en px, o un ancho CSS como "100%" */
  baseWidth?: number | string;
  /** Ancho ÷ alto de cada tarjeta (entre 0,3 y 4) */
  aspectRatio?: number;
  /** Cuánto asoman las tarjetas vecinas, en px */
  peek?: number;
  gap?: number;
  radius?: number;
  /** Marco de cristal alrededor del carrusel */
  frame?: boolean;
  /** Transición entre tarjetas */
  effect?: "tilt" | "slide" | "scale" | "fade" | "cube";
  /** "bars" muestra además el avance del paso automático */
  indicator?: "dots" | "bars" | "counter" | "none";
  arrows?: boolean;
  autoplay?: boolean;
  /** Milisegundos entre un paso automático y el siguiente (mínimo 600) */
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  draggable?: boolean;
  round?: boolean;
  initialIndex?: number;
  theme?: "dark" | "light";
  onChange?: (index: number) => void;
  className?: string;
  style?: CSSProperties;
}

declare const Carousel: (props: CarouselProps) => ReactNode;
export default Carousel;
