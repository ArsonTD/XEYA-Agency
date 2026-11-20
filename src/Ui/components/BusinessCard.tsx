"use client";

import { useState, type PointerEvent } from "react";
import { motion, useMotionTemplate, useSpring } from "framer-motion";
import { XeyaMark, XeyaShard, XeyaWordmark } from "@/Ui/components/brand/XeyaLogo";
import type { ContactChannels } from "@/domain/company/CompanyProfile";

const MAX_TILT = 14;
const SPRING = { stiffness: 180, damping: 18, mass: 0.6 };

/** Reverso de la tarjeta impresa, tal cual sale del arte original (PDF) */
const CARD_BACK = "/brand/card-back.webp";

interface Props {
  contact: ContactChannels;
  descriptor: string;
}

/** Tarjeta de presentación: se inclina en 3D con el cursor y se voltea al hacer clic. */
export default function BusinessCard({ contact, descriptor }: Props) {
  const [flipped, setFlipped] = useState(false);

  const tiltX = useSpring(0, SPRING);
  const tiltY = useSpring(0, SPRING);
  const flip = useSpring(0, { stiffness: 90, damping: 16 });
  const transform = useMotionTemplate`rotateX(${tiltX}deg) rotateY(${tiltY}deg) rotateY(${flip}deg)`;

  const onMove = (e: PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType === "touch") return;
    const rect = e.currentTarget.getBoundingClientRect();
    tiltY.set(((e.clientX - rect.left) / rect.width - 0.5) * 2 * MAX_TILT);
    tiltX.set((0.5 - (e.clientY - rect.top) / rect.height) * 2 * MAX_TILT);
  };

  const onLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  const toggle = () => {
    const next = !flipped;
    setFlipped(next);
    flip.set(next ? 180 : 0);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      aria-label={`XEYA, ${descriptor}: tarjeta de presentación. ${flipped ? "Ver el frente" : "Ver los datos de contacto"}`}
      className="block w-full max-w-[640px] cursor-pointer [perspective:1400px] focus-visible:outline-white"
    >
      <motion.div
        style={{ transform, transformStyle: "preserve-3d" }}
        className="relative aspect-[7/4] w-full shadow-[0_40px_90px_-30px_rgba(31,127,214,0.55)] [container-type:inline-size]"
      >
        {/* Frente */}
        <div className="card-face flex flex-col items-center justify-center text-white">
          <XeyaShard className="absolute top-[31%] -left-[7%] w-[20%]" />
          <XeyaShard className="absolute top-[31%] -right-[7%] w-[20%] -scale-x-100" />
          <XeyaMark className="w-[12%]" />
          <XeyaWordmark className="mt-[3%] w-[22%]" />
          <div className="mt-[4.5%] flex w-[56%] items-center gap-[4%] text-white/85">
            <span className="h-px flex-1 bg-white/60" />
            <span className="text-[2.1cqw] tracking-[0.55em] whitespace-nowrap uppercase">
              {descriptor}
            </span>
            <span className="h-px flex-1 bg-white/60" />
          </div>
        </div>

        {/* Reverso: la imagen de la tarjeta real */}
        <div className="card-face" style={{ transform: "rotateY(180deg)" }}>
          <img
            src={CARD_BACK}
            alt={`Reverso de la tarjeta de XEYA: código QR de Instagram, teléfono ${contact.phone}, web ${contact.website} y correo ${contact.email}`}
            width={1400}
            height={800}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="h-full w-full object-cover"
          />
        </div>
      </motion.div>
    </button>
  );
}
