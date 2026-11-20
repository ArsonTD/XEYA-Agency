"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import PrivacyConsent from "@/Ui/components/PrivacyConsent";
import toast from "@/Ui/hooks/use-toast";
import { EASE } from "@/Ui/lib/motion";
import { lockScroll } from "@/Ui/lib/smoothScroll";
import { InvalidContactError } from "@/application/sendContact";
import type { Contact } from "@/domain/contact/Contact";
import { sendContact } from "@/infrastructure/container";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const EMPTY: Contact = { name: "", email: "", message: "" };

/* Campo: una superficie apenas más clara que el panel y un filo inferior que se enciende al escribir */
const field =
  "mt-2.5 w-full border-0 border-b border-white/25 bg-white/[0.04] px-4 py-3.5 text-lg text-white transition-[border-color,background-color,box-shadow] duration-300 placeholder:text-white/50 hover:bg-white/[0.06] focus:border-laser focus:bg-white/[0.07] focus:shadow-[0_10px_24px_-14px_rgba(70,200,255,0.9)] focus:outline-none";

export default function ContactModal({ isOpen, onClose }: Props) {
  const [form, setForm] = useState<Contact>(EMPTY);
  const [isSending, setIsSending] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const dialog = useRef<HTMLDivElement>(null);

  // Mientras está abierto: Escape lo cierra, Tab no sale del diálogo y, al cerrar,
  // el foco vuelve a donde estaba.
  useEffect(() => {
    if (!isOpen) return;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const focusable = dialog.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    lockScroll(true);
    document.addEventListener("keydown", onKey);
    return () => {
      lockScroll(false);
      document.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    sendContact(form, accepted)
      .then(() => {
        setForm(EMPTY);
        setAccepted(false);
        toast({ title: "Mensaje enviado", description: "Te responderemos muy pronto." });
        onClose();
      })
      .catch((err: unknown) => {
        console.error("Error al enviar el mensaje:", err);
        toast({
          title: "No se pudo enviar el mensaje",
          description:
            err instanceof InvalidContactError
              ? err.message
              : "Inténtalo de nuevo o revisa tu conexión.",
        });
      })
      .finally(() => setIsSending(false));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-ink/85 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            ref={dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            initial={{ y: 48, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative w-full max-w-lg overflow-hidden border border-[rgba(127,212,255,0.28)] bg-panel text-white shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9),0_0_60px_-20px_rgba(31,127,214,0.55)]"
          >
            {/* Filo de luz arriba y un resplandor tenue al fondo, como en el resto del sitio */}
            <span aria-hidden="true" className="laser-line absolute inset-x-0 top-0" />
            <span aria-hidden="true" className="aura -top-40 -right-40 h-80 w-80 opacity-20" />

            <div className="label relative flex h-14 items-center justify-between border-b border-white/12 pr-3 pl-6 text-white/75 md:pl-9">
              XEYA / Nuevo mensaje
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar formulario"
                className="flex h-8 w-8 cursor-pointer items-center justify-center border border-white/40 text-white/80 transition-colors duration-300 hover:border-laser hover:bg-laser hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              data-lenis-prevent
              className="relative max-h-[80svh] space-y-7 overflow-y-auto p-6 [scrollbar-color:rgba(127,212,255,0.45)_transparent] [scrollbar-width:thin] md:p-9"
            >
              <div>
                <h2
                  id="contact-modal-title"
                  className="font-display text-3xl leading-[0.95] font-black tracking-[-0.02em] uppercase md:text-4xl"
                >
                  Cuéntanos <span className="glow-soft">tu idea</span>
                </h2>
                <p className="mt-4 text-[17px] leading-relaxed text-mist">
                  Déjanos tus datos y una breve descripción. Leemos cada mensaje y te respondemos
                  por correo.
                </p>
              </div>

              <label className="block">
                <span className="label text-white/85">Nombre</span>
                <input
                  type="text"
                  required
                  autoFocus
                  autoComplete="name"
                  placeholder="Tu nombre"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={field}
                />
              </label>

              <label className="block">
                <span className="label text-white/85">Correo</span>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="tu@correo.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={field}
                />
              </label>

              <label className="block">
                <span className="label text-white/85">Mensaje</span>
                <textarea
                  required
                  rows={4}
                  placeholder="Cuéntanos sobre tu proyecto y cómo podemos ayudarte."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${field} resize-none`}
                />
              </label>

              <PrivacyConsent checked={accepted} onChange={setAccepted} />

              <button
                type="submit"
                disabled={isSending}
                className="label group flex w-full cursor-pointer items-center justify-between rounded-full bg-white py-2 pr-2 pl-8 text-ink transition-colors duration-300 hover:bg-laser disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSending ? "Enviando…" : "Enviar mensaje"}
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-white">
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
