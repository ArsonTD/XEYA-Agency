import type { ReactNode } from "react";
import Link from "next/link";
import { XeyaWordmark } from "@/Ui/components/brand/XeyaLogo";
import CookieBanner from "@/Ui/components/CookieBanner";
import ROUTES, { LEGAL_LINKS } from "@/Ui/router";
import { getCompanyProfile } from "@/infrastructure/container";

interface Props {
  title: string;
  /** Fecha de la última revisión del texto, ya escrita para leerse */
  updated: string;
  children: ReactNode;
}

/**
 * Marco común de las páginas legales: sobrio, de lectura cómoda y sin animaciones.
 * El título de la pestaña lo pone cada página con su `metadata` (carpeta `app`).
 */
export default function LegalLayout({ title, updated, children }: Props) {
  const { legal } = getCompanyProfile();

  return (
    <div className="min-h-screen bg-ink text-white">
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>

      <header className="flex items-center justify-between gap-6 border-b border-white/15 px-5 py-5 md:px-8">
        <Link href={ROUTES.HOME} aria-label="XEYA, ir al inicio" className="block">
          <XeyaWordmark className="h-4 w-auto" />
        </Link>
        <Link
          href={ROUTES.HOME}
          className="label text-white/80 transition-colors duration-300 hover:text-laser"
        >
          Volver al inicio
        </Link>
      </header>

      <main id="contenido" className="mx-auto max-w-[78ch] px-5 py-16 md:py-24">
        <p className="label text-laser">Legal</p>
        <h1 className="mt-5 font-display text-[clamp(2rem,6vw,3.75rem)] leading-[1] font-black tracking-[-0.02em] text-balance uppercase">
          {title}
        </h1>
        <p className="mt-5 text-mist">Última actualización: {updated}</p>

        <div className="legal mt-4">{children}</div>
      </main>

      <footer className="border-t border-white/15 px-5 py-10 md:px-8">
        <nav aria-label="Páginas legales">
          <ul className="label flex flex-wrap gap-x-8 gap-y-3 text-white/80">
            {LEGAL_LINKS.map(({ to, label }) => (
              <li key={to}>
                <Link href={to} className="transition-colors duration-300 hover:text-laser">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="label mt-6 text-white/70">
          © {new Date().getFullYear()} {legal.legalName} · {legal.country}
        </p>
      </footer>

      <CookieBanner />
    </div>
  );
}
