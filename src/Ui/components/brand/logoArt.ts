/*
 * Trazos del logo XEYA como datos, para dibujarlo fuera de React (por ejemplo
 * en un canvas). Son los mismos que usa XeyaLogo.tsx; si cambian allí, cambian aquí.
 */

/** Caja del isotipo en coordenadas del arte */
export const MARK_BOX = { x: 752, y: 334, width: 572, height: 616 };

/** Línea blanca de la X */
export const MARK_LINE = "M760 342 1042 634 1044 760 1037 942 1031 760 1032 640Z";

/** Las tres esquirlas azules */
export const MARK_SHARDS = [
  "M1132 342H1315L1085 596 1257 363Z",
  "M762 942 992 686 820 921 945 942Z",
  "M1314 942 1083 688 1255 921 1130 942Z",
];

/** Cada letra del logotipo ocupa esta caja y se dibuja con trazos */
export const LETTER_BOX = { width: 138, height: 119 };

export const LETTER_STROKES: { d: string; width: number }[][] = [
  // X
  [{ d: "M13 -4 126 123M126 -4 13 123", width: 30 }],
  // E
  [
    { d: "M137 12.5H30Q12.5 12.5 12.5 30V89Q12.5 106.5 30 106.5H137", width: 25 },
    { d: "M38 60H125", width: 22 },
  ],
  // Y
  [{ d: "M12.5 0V47Q12.5 72 37.5 72H100Q125 72 125 47V0M69 72V119", width: 25 }],
  // A
  [
    { d: "M12.5 119V30Q12.5 12.5 30 12.5H108Q125.5 12.5 125.5 30V119", width: 25 },
    { d: "M12.5 77H125.5", width: 22 },
  ],
];
