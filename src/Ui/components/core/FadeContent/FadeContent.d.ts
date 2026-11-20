import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

export interface FadeContentProps extends Omit<HTMLAttributes<HTMLDivElement>, "onAnimationStart"> {
  children?: ReactNode;
  /** Contenedor con scroll propio (elemento o selector); por defecto, la ventana */
  container?: Element | string | null;
  /** Cómo aparece el contenido: fundido, enfoque, revelado, o a través de grano, niebla o píxeles */
  effect?: "fade" | "focus" | "develop" | "dissolve" | "mist" | "pixel";
  /** Desenfoque inicial: `true` (10px) o los px que se indiquen */
  blur?: boolean | number;
  /** Segundos (o milisegundos si es mayor que 10) */
  duration?: number;
  ease?: string;
  delay?: number;
  /** Parte de la pantalla que debe recorrer el elemento antes de aparecer (0–1) */
  threshold?: number;
  initialOpacity?: number;
  stagger?: number;
  staggerFrom?: "start" | "center" | "end" | "edges" | "random" | number;
  trigger?: "scroll" | "mount";
  /** `false` lo vuelve a ocultar y a mostrar cada vez que sale y entra */
  once?: boolean;
  exit?: boolean;
  /** Liga la aparición al scroll; un número suaviza el seguimiento (segundos) */
  scrub?: boolean | number;
  disappearAfter?: number;
  disappearDuration?: number;
  disappearEase?: string;
  onStart?: () => void;
  onComplete?: () => void;
  onDisappearanceComplete?: () => void;
  className?: string;
  style?: CSSProperties;
}

declare const FadeContent: (props: FadeContentProps) => ReactNode;
export default FadeContent;
