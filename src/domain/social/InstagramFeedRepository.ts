import type { InstagramPost } from "./InstagramPost";

/** Puerto de salida: origen de los posts (lista curada hoy, Graph API mañana). */
export interface InstagramFeedRepository {
  list(): InstagramPost[];
}
