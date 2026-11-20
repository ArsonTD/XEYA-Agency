import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from "react";

export interface StarBorderProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children?: ReactNode;
  color?: string;
  trailColor?: string;
  duration?: number;
  direction?: "clockwise" | "counterclockwise";
  stars?: number;
  trailLength?: number;
  thickness?: number;
  radius?: number;
  glow?: number;
  sparkle?: boolean;
  hover?: "lap" | "brighten" | "reveal" | "none";
  clickPulse?: boolean;
  theme?: "dark" | "light";
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  className?: string;
  style?: CSSProperties;
}

declare const StarBorder: (props: StarBorderProps) => ReactNode;
export default StarBorder;
