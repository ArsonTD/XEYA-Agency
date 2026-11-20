"use client";

import Link from "next/link";
import { XeyaWordmark } from "@/Ui/components/brand/XeyaLogo";
import FadeContent from "@/Ui/components/core/FadeContent/FadeContent";
import { useCookieConsent } from "@/Ui/hooks/useCookieConsent";
import { LEGAL_LINKS } from "@/Ui/router";
import { scrollToTarget } from "@/Ui/lib/smoothScroll";
import { getCompanyProfile } from "@/infrastructure/container";

const SECTIONS = [
  { id: "principios", label: "Principios" },
  { id: "xeya", label: "Quiénes somos" },
  { id: "portfolio", label: "Portfolio" },
  { id: "servicios", label: "Servicios" },
  { id: "instagram", label: "Instagram" },
  { id: "contacto", label: "Contacto" },
];

const link = "cursor-pointer transition-colors duration-300 hover:text-laser";

export default function Footer() {
  const { descriptor, contact, legal } = getCompanyProfile();
  const { reset } = useCookieConsent();

  const channels = [
    { label: "Instagram", href: contact.instagramUrl },
    { label: "Correo", href: `mailto:${contact.email}` },
    { label: "Teléfono", href: contact.phoneHref },
  ];

  return (
    // Sin fondo ni línea propios: continúa sobre los hilos y el resplandor del cierre de Contacto.
    // El relleno inferior deja sitio a la mitad visible de la marca (y a la barra de navegación).
    <footer className="relative overflow-hidden px-5 pt-10 pb-[max(8rem,10vw)] text-white md:px-8 md:pt-16">
      {/*
        Marca de fondo: grande, a todo el ancho y anclada al final de la página, que
        la corta por la mitad. Muy atenuada y entre niebla (React Bits FadeContent):
        se condensa a medida que el scroll llega al final y se deshace al subir.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-1/2"
      >
        <FadeContent effect="mist" blur={18} scrub={0.6} threshold={0}>
          {/* La opacidad va en el SVG entero: así los trazos que se solapan no se marcan */}
          <XeyaWordmark gap={48} className="w-full opacity-20" />
        </FadeContent>
      </div>

      <div>
        <div className="label relative grid grid-cols-2 gap-x-6 gap-y-8 text-white/85 [text-shadow:0_0_14px_#02080e,0_0_4px_#02080e] sm:grid-cols-3">
          <p className="col-start-1 row-start-1">
            <span className="text-white">{legal.legalName}</span>
            <br />
            {descriptor}
            {legal.taxId && (
              <>
                <br />
                RNC {legal.taxId}
              </>
            )}
          </p>

          <nav
            aria-label="Secciones"
            className="col-start-2 row-span-2 row-start-1 justify-self-end text-right sm:row-span-1 sm:justify-self-center sm:text-left"
          >
            <ul className="space-y-3">
              {SECTIONS.map(({ id, label }) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => scrollToTarget(id)}
                    className={`uppercase ${link}`}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="col-start-1 row-start-2 space-y-3 sm:col-start-3 sm:row-start-1 sm:justify-self-end sm:text-right">
            {channels.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className={link}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Páginas legales y preferencias de cookies */}
      <nav
        aria-label="Legal"
        className="label relative mt-12 text-white/80 [text-shadow:0_0_14px_#02080e,0_0_4px_#02080e]"
      >
        <ul className="flex flex-wrap gap-x-7 gap-y-3">
          {LEGAL_LINKS.map(({ to, label }) => (
            <li key={to}>
              <Link href={to} className={link}>
                {label}
              </Link>
            </li>
          ))}
          <li>
            <button type="button" onClick={reset} className={`uppercase ${link}`}>
              Preferencias de cookies
            </button>
          </li>
          <li className="text-white/70 sm:ml-auto">
            {/* El HTML lleva el año en que se compiló; se tolera que el navegador calcule otro */}
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {legal.legalName} ·{" "}
            {legal.country}
          </li>
        </ul>
      </nav>
    </footer>
  );
}
