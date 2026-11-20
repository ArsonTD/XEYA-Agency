"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { XeyaMark } from "@/Ui/components/brand/XeyaLogo";
import RevealLines from "@/Ui/components/core/RevealLines";
import SectionHeader from "@/Ui/components/SectionHeader";
import { useCookieConsent } from "@/Ui/hooks/useCookieConsent";
import { EASE, inView } from "@/Ui/lib/motion";
import { getCompanyProfile, getInstagramFeed } from "@/infrastructure/container";
import {
  instagramEmbedUrl,
  instagramPermalink,
  type InstagramPost,
} from "@/domain/social/InstagramPost";

/*
 * El embed oficial de Instagram se dibuja siempre a este ancho y se reduce hasta el tamaño
 * de la tarjeta: así su cabecera y sus controles encogen con la imagen, sea cual sea la pantalla.
 */
const EMBED_WIDTH = 540;
/** Alto de la cabecera del embed: se recorta para dejar solo la imagen. */
const EMBED_HEADER = 54;
/** Espacio de sobra bajo la imagen (pie del embed), para que no se corte su carga */
const EMBED_FOOTER = 320;
/**
 * En los posts con varias imágenes, Instagram pone una flecha a la derecha y puntos abajo.
 * No se pueden quitar (el embed es de Instagram), así que la imagen se amplía lo justo,
 * desde su esquina superior izquierda, para que queden fuera por la derecha y por abajo.
 */
const CAROUSEL_ZOOM = 1.1;

/** Encaja la imagen del embed en una ventana cuadrada de `side` px (recorte centrado). */
function embedFrame(side: number, aspect = 0.8, carousel = false) {
  // Sin ampliar, la imagen llena la ventana y lo que sobra se reparte a ambos lados
  const fit = (side * Math.max(1, aspect)) / EMBED_WIDTH;
  const mediaWidth = EMBED_WIDTH * fit;
  const mediaHeight = mediaWidth / aspect;
  const scale = fit * (carousel ? CAROUSEL_ZOOM : 1);
  return {
    width: EMBED_WIDTH,
    height: EMBED_WIDTH / aspect + EMBED_HEADER + EMBED_FOOTER,
    left: (side - mediaWidth) / 2,
    top: (side - mediaHeight) / 2 - EMBED_HEADER * scale,
    transform: `scale(${scale})`,
    transformOrigin: "0 0",
  };
}

/** Ancho en px de un elemento, al día cuando cambia de tamaño. */
function useWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    const observer = new ResizeObserver(() => setWidth(element.clientWidth));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return [ref, width] as const;
}

/**
 * Tarjeta de un post: la imagen recortada del embed y, debajo, de qué va.
 * El embed de Instagram instala cookies de Meta, así que solo se carga si el
 * visitante lo aceptó; si no, queda la tarjeta de marca con el enlace al post.
 */
function PostCard({ post, embed }: { post: InstagramPost; embed: boolean }) {
  const [windowRef, side] = useWidth<HTMLDivElement>();

  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, y: 36 },
        shown: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } },
      }}
    >
      <a
        href={instagramPermalink(post)}
        target="_blank"
        rel="noreferrer"
        aria-label={`${post.title}: ver en Instagram`}
        className="group block"
      >
        <div className="chamfer bg-[rgba(127,212,255,0.25)] p-px transition-colors duration-500 group-hover:bg-laser">
          <div ref={windowRef} className="chamfer relative aspect-square overflow-hidden bg-navy">
            {/* Respaldo de marca mientras carga (o si el embed no está disponible) */}
            <div className="code-pattern absolute inset-0 flex items-center justify-center">
              <XeyaMark shardClass="fill-laser" className="w-16 text-white/80" />
            </div>
            {embed && side > 0 && (
              <iframe
                src={instagramEmbedUrl(post)}
                title={post.title}
                loading="lazy"
                tabIndex={-1}
                scrolling="no"
                className="pointer-events-none absolute max-w-none border-0"
                style={embedFrame(side, post.aspect, post.carousel)}
              />
            )}
          </div>
        </div>

        <div className="mt-5">
          <p className="label text-laser">{post.kind === "reel" ? "Reel" : "Post"}</p>
          <h3 className="mt-2 font-display text-base leading-[1.1] font-extrabold tracking-[-0.01em] text-balance uppercase transition-colors duration-300 group-hover:text-laser md:text-lg">
            {post.title}
          </h3>
        </div>
      </a>
    </motion.li>
  );
}

export default function InstagramFeed() {
  const { contact } = getCompanyProfile();
  const posts = getInstagramFeed(4);
  const { allowed, accept } = useCookieConsent();

  return (
    <section
      id="instagram"
      className="relative overflow-x-clip px-5 pt-8 pb-12 text-white md:px-8 md:pt-12 md:pb-20"
    >
      <span aria-hidden="true" className="aura top-96 -right-40 h-[460px] w-[460px]" />

      <div className="relative">
        <SectionHeader label="Instagram" line={false} />

        <RevealLines
          lines={["Lo último", <span className="glow-soft">en el feed</span>]}
          className="mt-14 font-display text-[clamp(2rem,8.6vw,9.5rem)] leading-[0.88] font-black tracking-[-0.03em] uppercase md:mt-24"
        />

        <motion.ul
          initial="hidden"
          whileInView="shown"
          viewport={inView}
          variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.1 } } }}
          className="mt-16 grid grid-cols-2 gap-x-5 gap-y-12 md:mt-24 md:gap-x-8 lg:grid-cols-4"
        >
          {posts.map((post) => (
            <PostCard key={post.shortcode} post={post} embed={allowed} />
          ))}
        </motion.ul>

        {!allowed && (
          <div className="mx-auto mt-12 flex max-w-xl flex-col items-center gap-5 text-center">
            <p className="text-lg leading-relaxed text-mist">
              Las imágenes vienen de Instagram, que puede instalar cookies de Meta en tu navegador.
              Solo las cargamos si lo aceptas.
            </p>
            <button
              type="button"
              onClick={accept}
              className="label cursor-pointer rounded-full border border-white/60 px-8 py-3.5 text-white transition-colors duration-300 hover:border-laser hover:text-laser"
            >
              Mostrar publicaciones de Instagram
            </button>
          </div>
        )}

        <div className="mt-20 flex justify-center md:mt-28">
          <a
            href={contact.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="label group inline-flex items-center gap-3"
          >
            <span className="rounded-full bg-white px-12 py-4 text-ink transition-colors duration-300 group-hover:bg-laser">
              Ver más en Instagram
            </span>
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink transition-colors duration-300 group-hover:bg-laser">
              <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-expo group-hover:translate-x-0.5" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
