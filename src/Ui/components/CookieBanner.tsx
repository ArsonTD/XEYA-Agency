"use client";

import Link from "next/link";
import { useCookieConsent } from "@/Ui/hooks/useCookieConsent";
import { useHydrated } from "@/Ui/hooks/useHydrated";
import ROUTES from "@/Ui/router";

const button =
  "label flex-1 cursor-pointer border px-5 py-3 text-center transition-colors duration-300";

/**
 * Aviso de cookies. Solo aparece mientras el visitante no ha elegido.
 * Aceptar y rechazar pesan lo mismo, y nada de terceros se carga antes de aceptar.
 */
export default function CookieBanner() {
  const { consent, accept, reject } = useCookieConsent();
  // La decisión está guardada en el navegador: el HTML generado no lleva el aviso,
  // para que no parpadee ante quien ya eligió.
  const hydrated = useHydrated();
  if (!hydrated || consent !== "unset") return null;

  return (
    <section
      aria-label="Aviso de cookies"
      className="fixed inset-x-4 bottom-28 z-[55] border border-[rgba(127,212,255,0.28)] bg-panel p-5 text-white shadow-[0_24px_70px_-20px_rgba(0,0,0,0.9)] sm:inset-x-auto sm:bottom-5 sm:left-5 sm:max-w-sm"
    >
      <h2 className="label text-laser">Cookies</h2>
      <p className="mt-3 text-[15px] leading-relaxed text-mist">
        Este sitio no usa cookies de analítica ni de publicidad. Si aceptas, mostramos nuestras
        publicaciones de Instagram, y Meta puede instalar sus propias cookies.{" "}
        <Link
          href={ROUTES.COOKIES}
          className="underline underline-offset-4 transition-colors duration-300 hover:text-laser"
        >
          Política de cookies
        </Link>
      </p>
      <div className="mt-5 flex gap-3">
        <button
          type="button"
          onClick={reject}
          className={`${button} border-white/60 text-white hover:border-laser hover:text-laser`}
        >
          Rechazar
        </button>
        <button
          type="button"
          onClick={accept}
          className={`${button} border-white bg-white text-ink hover:border-laser hover:bg-laser`}
        >
          Aceptar
        </button>
      </div>
    </section>
  );
}
