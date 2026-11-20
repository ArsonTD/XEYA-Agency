"use client";

import { useCookieConsent } from "@/Ui/hooks/useCookieConsent";

const STATUS = {
  granted: "Has aceptado mostrar las publicaciones de Instagram.",
  denied: "Has rechazado mostrar las publicaciones de Instagram.",
  unset: "Todavía no has elegido. Mientras tanto, no se carga contenido de Instagram.",
} as const;

const choice =
  "label cursor-pointer border px-6 py-3 transition-colors duration-300 disabled:cursor-default disabled:opacity-60";

/** Estado actual del consentimiento y botones para cambiarlo. */
export default function CookiePreferences() {
  const { consent, accept, reject } = useCookieConsent();

  return (
    <div className="mt-6 border border-[rgba(127,212,255,0.28)] bg-panel p-6">
      <p role="status" className="!mt-0">
        <strong>Tu elección actual:</strong> {STATUS[consent]}
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={reject}
          disabled={consent === "denied"}
          className={`${choice} border-white/60 text-white hover:border-laser hover:text-laser`}
        >
          Rechazar
        </button>
        <button
          type="button"
          onClick={accept}
          disabled={consent === "granted"}
          className={`${choice} border-white bg-white text-ink hover:border-laser hover:bg-laser`}
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}
