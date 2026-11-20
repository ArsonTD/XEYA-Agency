"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import BusinessCard from "@/Ui/components/BusinessCard";
import CurvedInput from "@/Ui/components/core/CurvedInput/CurvedInput";
import PrivacyConsent from "@/Ui/components/PrivacyConsent";
import RevealLines from "@/Ui/components/core/RevealLines";
import WebThreads from "@/Ui/components/core/WebThreads/WebThreads";
import SectionHeader from "@/Ui/components/SectionHeader";
import toast from "@/Ui/hooks/use-toast";
import { useHydrated } from "@/Ui/hooks/useHydrated";
import { useLiteDevice, useMediaQuery } from "@/Ui/hooks/useMediaQuery";
import { EASE, inView } from "@/Ui/lib/motion";
import { InvalidContactError } from "@/application/sendContact";
import { getCompanyProfile, requestContact } from "@/infrastructure/container";

/* Hilos de fondo (React Bits WebThreads) */
const THREADS = 6;
/** Alcance del hilo más abierto en el borde de la pantalla, por unidad de `spread` */
const REACH = THREADS / 2;
const MAX_SPREAD = 0.18;
/** Cuánto entran los hilos en el pie de página (px) */
const INTO_FOOTER = 240;

interface Props {
  onOpenModal: () => void;
  /** El pie de página: va dentro del cierre para compartir los hilos y el resplandor */
  children?: ReactNode;
}

export default function ContactSection({ onOpenModal, children }: Props) {
  const { contact, descriptor } = getCompanyProfile();
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [accepted, setAccepted] = useState(false);
  // En columnas, los hilos se anudan entre el correo y la tarjeta; apilados, detrás de la tarjeta.
  const sideBySide = useMediaQuery("(min-width: 1024px)");
  // En teléfono los hilos (WebGL) se dibujan a un píxel por punto
  const hydrated = useHydrated();
  const lite = useLiteDevice();

  const layerRef = useRef<HTMLDivElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [weave, setWeave] = useState({ position: 0.5, spread: MAX_SPREAD });

  // El lienzo de los hilos cubre el cierre y el pie. Aquí se calcula a qué altura va
  // el nudo y cuánto pueden abrirse sin cortarse arriba ni invadir de más el pie.
  useEffect(() => {
    const layer = layerRef.current;
    const block = blockRef.current;
    const anchor = sideBySide ? block : cardRef.current;
    if (!layer || !block || !anchor) return undefined;

    const measure = () => {
      const canvas = layer.getBoundingClientRect();
      if (canvas.height <= 0) return;
      const target = anchor.getBoundingClientRect();
      const knot = target.top + target.height / 2 - canvas.top;
      const below = block.getBoundingClientRect().bottom - canvas.top - knot + INTO_FOOTER;
      const next = {
        position: 1 - knot / canvas.height,
        spread: Math.min(MAX_SPREAD, Math.min(knot, below) / (REACH * canvas.height)),
      };
      setWeave((prev) =>
        Math.abs(prev.position - next.position) < 0.002 && Math.abs(prev.spread - next.spread) < 0.002
          ? prev
          : next,
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    [layer, block, anchor].forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sideBySide]);

  const submit = (value: string) => {
    if (isSending) return;
    setIsSending(true);
    requestContact(value, accepted)
      .then(() => {
        setEmail("");
        setAccepted(false);
        toast({ title: "¡Recibido!", description: "Te escribiremos muy pronto a ese correo." });
      })
      .catch((err: unknown) => {
        if (!(err instanceof InvalidContactError)) console.error("Error al enviar el correo:", err);
        toast({
          title: "No se pudo enviar",
          description:
            err instanceof InvalidContactError
              ? err.message
              : "Inténtalo de nuevo o revisa tu conexión.",
        });
      })
      .finally(() => setIsSending(false));
  };

  return (
    <section
      id="contacto"
      className="relative overflow-x-clip px-5 pt-8 text-white md:px-8 md:pt-12"
    >
      <span aria-hidden="true" className="aura top-1/3 left-1/2 h-[620px] w-[620px] -translate-x-1/2" />

      <div className="relative">
        <SectionHeader label="Contacto" line={false} />

        <RevealLines
          lines={["¿Tienes una idea?", <span className="glow-soft">Hagámosla real.</span>]}
          className="relative z-10 mt-14 font-display text-[clamp(1.9rem,7vw,8rem)] leading-[0.9] font-black tracking-[-0.03em] uppercase md:mt-24"
        />

        {/*
          Cierre de la página: el correo rápido, la tarjeta y el pie comparten un
          mismo fondo de hilos de luz, sin línea que los separe.
        */}
        <div className="relative -mx-5 mt-4 md:-mx-8 md:mt-8">
          <div
            ref={layerRef}
            aria-hidden="true"
            className="absolute inset-x-0 -top-48 bottom-0 [mask-image:linear-gradient(to_bottom,transparent,#000_16rem)]"
          >
            {hydrated && (
            <WebThreads
              dpr={lite ? 1 : undefined}
              colors={["#015ddf", "#335dd5"]}
              coreColor="#FFFFFF"
              threadCount={THREADS}
              spread={weave.spread}
              fade={0.12}
              position={weave.position}
              frequency={sideBySide ? 5 : 2.5}
            />
            )}
          </div>

          <div
            ref={blockRef}
            className="relative grid items-center gap-x-16 gap-y-20 px-5 py-20 md:px-8 md:py-32 lg:grid-cols-2"
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inView}
              transition={{ duration: 1, ease: EASE }}
              className="mx-auto flex w-full max-w-[560px] flex-col items-center text-center [text-shadow:0_0_14px_#02080e,0_0_4px_#02080e]"
            >
              <p className="mb-8 text-xl text-mist/85 md:text-2xl">
                Déjanos tu correo y te contactamos.
              </p>
              <CurvedInput
                value={email}
                onChange={setEmail}
                onSubmit={submit}
                type="email"
                name="email"
                ariaLabel="Tu correo electrónico"
                placeholder="tu@correo.com"
                buttonText={isSending ? "Enviando…" : "Hablemos"}
                theme="dark"
                width="100%"
                bend={28}
                height={64}
                backgroundColor="#06121c"
                borderColor="#1f5f96"
                textColor="#ffffff"
                placeholderColor="#7f93a6"
                buttonColor="#1f7fd6"
                buttonTextColor="#ffffff"
                shadowSize="lg"
                shadowColor="#1f7fd6"
              />
              <PrivacyConsent checked={accepted} onChange={setAccepted} className="mt-7" />
              <button
                type="button"
                onClick={onOpenModal}
                className="label group mt-10 inline-flex cursor-pointer items-center gap-2 text-white/65 transition-colors duration-300 hover:text-laser"
              >
                ¿Prefieres contarnos tu idea? Abre el formulario
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 ease-expo group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </motion.div>

            {/* La referencia va fuera de la animación: se mide la posición final de la tarjeta */}
            <div ref={cardRef}>
              <motion.div
                initial={{ opacity: 0, y: 60, rotate: -4 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={inView}
                transition={{ duration: 1.2, ease: EASE }}
                className="flex flex-col items-center gap-7"
              >
                <BusinessCard contact={contact} descriptor={descriptor} />
                <p className="label text-white/55 [text-shadow:0_0_14px_#02080e,0_0_4px_#02080e]">
                  Toca la tarjeta para voltearla
                </p>
              </motion.div>
            </div>
          </div>

          {children}
        </div>
      </div>
    </section>
  );
}
