/**
 * Lo único que este sitio guarda en el navegador del visitante (almacenamiento
 * local, sin datos personales). La Política de cookies lo lista tal cual: si se
 * añade una clave aquí, hay que explicarla allí.
 */
export const BROWSER_STORAGE = {
  /** Decisión sobre el contenido de terceros (Instagram) */
  cookieConsent: "xeya:cookie-consent",
  /** Turno que hace rotar el orden de las credenciales del equipo */
  teamTurn: "xeya:team-turn",
} as const;
