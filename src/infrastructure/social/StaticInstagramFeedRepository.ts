import type { InstagramFeedRepository } from "@/domain/social/InstagramFeedRepository";
import type { InstagramPost } from "@/domain/social/InstagramPost";

/**
 * Posts de @xeya.srl (tomados del perfil el 11/11/2026).
 * Para añadir uno nuevo, copia el código del enlace: instagram.com/p/<shortcode>/
 */
const posts: InstagramPost[] = [
  {
    shortcode: "DQpWFAcD44H",
    title: "Bienvenidos a XEYA",
    kind: "post",
    pinned: true,
    aspect: 1.25,
    caption:
      "Todo gran proyecto empieza con una idea. Este es el inicio de la nuestra. Bienvenidos a XEYA.",
  },
  {
    shortcode: "DQzoQ8Vj7qV",
    title: "Lo que somos y hacia dónde vamos",
    kind: "post",
    pinned: true,
    carousel: true,
    caption:
      "Presentamos lo que somos y hacia dónde vamos. Innovación que transforma ideas en soluciones digitales reales.",
  },
  {
    shortcode: "DfgCIZilXhS",
    title: "Crecer de manera sostenible",
    kind: "post",
    caption:
      "Conseguir más clientes puede ayudar a crecer un negocio, pero no garantiza que esté creciendo de manera sostenible.",
  },
  {
    shortcode: "DfV2oupNhof",
    title: "Primer aniversario de XEYA",
    kind: "post",
    caption: "¡Gracias por ser parte del primer aniversario de XEYA!",
  },
  {
    shortcode: "DfTHsCUFWMd",
    title: "Un producto digital sigue evolucionando",
    kind: "post",
    caption: "Lanzar un producto digital no significa que su evolución haya terminado.",
  },
  {
    shortcode: "DfN-DNcFY1b",
    title: "Cuando una buena interfaz no basta",
    kind: "post",
    caption:
      "Un producto digital puede tener una buena interfaz, funcionar correctamente y aun así no cumplir su objetivo.",
  },
  {
    shortcode: "DfGMRtWFUPj",
    title: "Cada función tiene su costo",
    kind: "post",
    caption: "Cada nueva función implica decisiones, tiempo de desarrollo y mantenimiento.",
  },
  {
    shortcode: "De2ulg_tqYf",
    title: "¿Grandes planes para tu negocio?",
    kind: "reel",
    caption: "¿Tienes grandes planes para tu negocio? ¡Cuenta con nosotros!",
  },
  {
    shortcode: "DfBCrCBlTnL",
    title: "Antes del diseño, el problema",
    kind: "post",
    caption:
      "Antes de pensar en cómo se verá un producto digital, hay que entender qué debe resolver.",
  },
  {
    shortcode: "Deu9pQWFXRC",
    title: "Entender el problema primero",
    kind: "post",
    caption:
      "Antes de decidir qué construir, necesitas entender qué problemas estás intentando resolver.",
  },
];

/** Adaptador: lista curada de posts definida en código. */
export class StaticInstagramFeedRepository implements InstagramFeedRepository {
  list(): InstagramPost[] {
    return posts;
  }
}
