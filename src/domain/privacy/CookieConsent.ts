/**
 * Decisión del visitante sobre el contenido de terceros que puede instalar
 * cookies (hoy, las publicaciones incrustadas de Instagram).
 * "unset" = todavía no ha elegido: se trata igual que un rechazo.
 */
export type CookieConsent = "granted" | "denied" | "unset";

/** Solo con una aceptación expresa se carga contenido de terceros. */
export const allowsThirdPartyContent = (consent: CookieConsent): boolean => consent === "granted";

/** Puerto de salida: dónde se guarda la decisión (hoy, el navegador del visitante). */
export interface CookieConsentRepository {
  get(): CookieConsent;
  set(consent: CookieConsent): void;
  /** Avisa cuando la decisión cambia; devuelve cómo dejar de escuchar. */
  subscribe(listener: () => void): () => void;
}
