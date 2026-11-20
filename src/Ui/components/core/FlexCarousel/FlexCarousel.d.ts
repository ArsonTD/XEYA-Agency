import type { CSSProperties, ReactNode } from "react";

export interface FlexCarouselItem {
  src: string;
  alt?: string;
  title?: string;
  subtitle?: string;
}

export interface FlexCarouselProps {
  /** Imágenes de la fila. Sin ellas, el componente carga fotos de muestra de un tercero. */
  items?: FlexCarouselItem[];
  /** Forma de partida del "cristal" invisible que dobla la fila */
  preset?: "liquid" | "ribbon" | "vortex" | "arch";
  intro?: "rise" | "bloom" | "spin" | "deal" | "none";
  /** "natural" respeta la proporción de cada imagen */
  fit?: "natural" | "portrait" | "square" | "landscape";
  /** Alto de las tarjetas como fracción del alto del contenedor */
  cardHeight?: number;
  /** Separación entre tarjetas, en px */
  gap?: number;
  radius?: number;
  lensWidth?: number;
  lensHeight?: number;
  tilt?: number;
  roundness?: number;
  bend?: number;
  reach?: number;
  curl?: "twist" | "rise" | "fall";
  /** Separación en arcoíris de la luz donde el cristal dobla las imágenes */
  dispersion?: number;
  liquid?: number;
  followCursor?: boolean;
  /** Cuánto encogen las tarjetas mientras la fila se mueve rápido */
  squeeze?: number;
  /** Al pulsar una tarjeta, la centra y la abre */
  focusOnClick?: boolean;
  autoplay?: boolean;
  interval?: number;
  /** Título de la tarjeta centrada y contador, dibujados por el componente */
  captions?: boolean;
  /** Si la rueda vertical mueve el carrusel (y no la página) al pasar por encima */
  captureWheel?: boolean;
  /** Se llama cuando otra tarjeta llega al centro */
  onChange?: (index: number, item: FlexCarouselItem) => void;
  onSelect?: (index: number, item: FlexCarouselItem) => void;
  className?: string;
  style?: CSSProperties;
}

declare const FlexCarousel: (props: FlexCarouselProps) => ReactNode;
export default FlexCarousel;
