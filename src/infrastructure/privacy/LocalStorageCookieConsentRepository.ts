import { BROWSER_STORAGE } from "@/domain/privacy/BrowserStorage";
import type { CookieConsent, CookieConsentRepository } from "@/domain/privacy/CookieConsent";

const COOKIE_CONSENT_KEY = BROWSER_STORAGE.cookieConsent;

const isChoice = (value: unknown): value is "granted" | "denied" =>
  value === "granted" || value === "denied";

/**
 * Adaptador: guarda la decisión en el `localStorage` del visitante.
 * Si el navegador lo bloquea (modo privado), la decisión vive solo en memoria
 * y se vuelve a preguntar en la siguiente visita.
 */
export class LocalStorageCookieConsentRepository implements CookieConsentRepository {
  private memory: CookieConsent = "unset";
  private readonly listeners = new Set<() => void>();

  get(): CookieConsent {
    try {
      const stored = window.localStorage.getItem(COOKIE_CONSENT_KEY);
      if (isChoice(stored)) return stored;
      return this.memory;
    } catch {
      return this.memory;
    }
  }

  set(consent: CookieConsent): void {
    this.memory = consent;
    try {
      if (consent === "unset") window.localStorage.removeItem(COOKIE_CONSENT_KEY);
      else window.localStorage.setItem(COOKIE_CONSENT_KEY, consent);
    } catch {
      // Sin almacenamiento disponible: queda la copia en memoria.
    }
    this.listeners.forEach((listener) => listener());
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    // Otra pestaña del mismo sitio cambió la decisión
    const onStorage = (event: StorageEvent) => {
      if (event.key === COOKIE_CONSENT_KEY) listener();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      this.listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  }
}
