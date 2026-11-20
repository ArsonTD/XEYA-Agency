export interface InstagramPost {
  /** Código corto del post: instagram.com/p/<shortcode>/ */
  shortcode: string;
  kind: "post" | "reel";
  /** Titular corto para mostrarlo en la web */
  title: string;
  caption: string;
  pinned?: boolean;
  /** Proporción ancho/alto de la imagen. Por defecto 4:5 (0.8). */
  aspect?: number;
  /** El post tiene varias imágenes: Instagram le pone una flecha y puntos encima */
  carousel?: boolean;
}

export const instagramPermalink = (post: InstagramPost) =>
  `https://www.instagram.com/${post.kind === "reel" ? "reel" : "p"}/${post.shortcode}/`;

export const instagramEmbedUrl = (post: InstagramPost) =>
  `https://www.instagram.com/p/${post.shortcode}/embed/`;
