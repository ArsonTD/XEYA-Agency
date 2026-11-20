"use client";

import { useId } from "react";
import Link from "next/link";
import ROUTES from "@/Ui/router";
import { cn } from "@/libs/utils";

interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

/**
 * Casilla de consentimiento de los formularios: sin marcar por defecto y con
 * enlace a la Política de privacidad (se abre aparte para no perder lo escrito).
 */
export default function PrivacyConsent({ checked, onChange, className }: Props) {
  const id = useId();

  return (
    <div className={cn("flex items-start gap-3 text-left", className)}>
      <input
        id={id}
        type="checkbox"
        required
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-laser"
      />
      <label htmlFor={id} className="cursor-pointer text-[15px] leading-relaxed text-mist">
        He leído y acepto la{" "}
        <Link
          href={ROUTES.PRIVACY}
          target="_blank"
          rel="noopener"
          className="text-white underline underline-offset-4 transition-colors duration-300 hover:text-laser"
        >
          Política de privacidad
          <span className="sr-only"> (se abre en una pestaña nueva)</span>
        </Link>
        . XEYA usará estos datos solo para responder a mi solicitud.
      </label>
    </div>
  );
}
