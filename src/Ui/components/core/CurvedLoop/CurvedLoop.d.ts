import type { ReactNode } from "react";

export interface CurvedLoopProps {
  /** Texto que recorre el trazo en bucle */
  marqueeText?: string;
  shape?: "arc" | "wave" | "circle" | "line";
  color?: string;
  /** Marca entre repeticiones (p. ej. ✦ o /) */
  separator?: string;
  separatorColor?: string;
  direction?: "left" | "right";
  speed?: number;
  /** Cuánto acelera el bucle al hacer scroll en la página (0 lo desactiva) */
  scrollBoost?: number;
  /** En el arco, la caída en el centro (negativo arquea hacia arriba) */
  curveAmount?: number;
  /** Tamaño de letra en px para un bucle de 1440px de ancho */
  fontSize?: number;
  fontWeight?: number | string;
  letterSpacing?: number;
  /** Cuánto se desvanece cada lado, de 0 a 1 */
  edgeFade?: number;
  outline?: boolean;
  /** Permite arrastrar y lanzar el texto */
  interactive?: boolean;
  pauseOnHover?: boolean;
  /** Clases para el texto (p. ej. la fuente) */
  className?: string;
}

declare const CurvedLoop: (props: CurvedLoopProps) => ReactNode;
export default CurvedLoop;
