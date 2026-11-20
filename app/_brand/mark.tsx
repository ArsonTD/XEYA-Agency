/*
 * La X de XEYA tal como está en el icono de la pestaña (public/favicon.svg): línea blanca y
 * esquirlas azul láser sobre el fondo tinta del sitio. La usan las imágenes que se generan al compilar
 * (vista previa al compartir e icono para iPhone). Si cambia el favicon, se cambia aquí.
 */

const VIEW_BOX = "658 262 760 760";
const LINE = "M760 342 1042 634 1044 760 1037 942 1031 760 1032 640Z";
const SHARDS = [
  "M1132 342H1315L1085 596 1257 363Z",
  "M762 942 992 686 820 921 945 942Z",
  "M1314 942 1083 688 1255 921 1130 942Z",
];

interface Props {
  /** Lado de la X, en px */
  size: number;
  /** Grosor extra de los trazos, en unidades del arte: más en tamaños pequeños, para que se lea */
  bold?: number;
}

/** Fondo tinta a todo el lienzo con la X centrada. */
export function FaviconMark({ size, bold = 8 }: Props) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#02080e",
      }}
    >
      <svg width={size} height={size} viewBox={VIEW_BOX}>
        <path d={LINE} fill="#ffffff" stroke="#ffffff" strokeWidth={bold} strokeLinejoin="round" />
        {SHARDS.map((d) => (
          <path
            key={d}
            d={d}
            fill="#46c8ff"
            stroke="#46c8ff"
            strokeWidth={bold / 2}
            strokeLinejoin="round"
          />
        ))}
      </svg>
    </div>
  );
}
