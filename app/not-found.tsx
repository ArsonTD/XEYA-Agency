import type { Metadata } from "next";
import Link from "next/link";
import { XeyaWordmark } from "@/Ui/components/brand/XeyaLogo";
import ROUTES from "@/Ui/router";

export const metadata: Metadata = { title: "Página no encontrada" };

/** Dirección que no existe: mismo aspecto sobrio que las páginas legales y vuelta al inicio. */
export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-ink px-5 py-16 text-center text-white">
      <Link href={ROUTES.HOME} aria-label="XEYA, ir al inicio" className="block">
        <XeyaWordmark className="h-4 w-auto" />
      </Link>
      <p className="label mt-14 text-laser">Error 404</p>
      <h1 className="mt-5 font-display text-[clamp(2rem,6vw,3.75rem)] leading-[1] font-black tracking-[-0.02em] text-balance uppercase">
        Página no encontrada
      </h1>
      <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-mist">
        La dirección que abriste no existe o cambió de lugar.
      </p>
      <Link
        href={ROUTES.HOME}
        className="label mt-10 rounded-full border border-white/60 px-8 py-3.5 text-white transition-colors duration-300 hover:border-laser hover:text-laser"
      >
        Volver al inicio
      </Link>
    </main>
  );
}
