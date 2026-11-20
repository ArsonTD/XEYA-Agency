import type { InstagramFeedRepository } from "@/domain/social/InstagramFeedRepository";

/** Caso de uso: posts a mostrar, con los fijados primero. */
export const makeGetInstagramFeed =
  (repository: InstagramFeedRepository) =>
  (limit = 8) => {
    const posts = repository.list();
    return [...posts.filter((p) => p.pinned), ...posts.filter((p) => !p.pinned)].slice(0, limit);
  };
