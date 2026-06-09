/** Métrages et vidéos intégrales — source unique pour la page /videos. */

export type Film = {
  id: string;
  title: string;
  year: string;
  role: string;
  format: string;
  director?: string;
  note?: string;
  /** ID YouTube (11 car.) ou URL — vide = vignette « à venir » */
  youtubeId?: string;
  /** Affiche locale sous public/ ; sinon miniature YouTube si youtubeId est défini */
  posterSrc?: string;
};

export const filmsPageIntro =
  "Versions intégrales — métrages et spectacles";

/** Extrait l’ID YouTube depuis une URL ou un ID brut. */
export function parseYoutubeId(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  if (/^[\w-]{11}$/.test(trimmed)) return trimmed;

  try {
    const url = new URL(trimmed);
    if (url.hostname.includes("youtu.be")) {
      const id = url.pathname.slice(1).split("/")[0];
      return id && /^[\w-]{11}$/.test(id) ? id : null;
    }
    const v = url.searchParams.get("v");
    if (v && /^[\w-]{11}$/.test(v)) return v;
    const embedMatch = url.pathname.match(/\/embed\/([\w-]{11})/);
    if (embedMatch?.[1]) return embedMatch[1];
  } catch {
    return null;
  }
  return null;
}

export function resolveFilmYoutubeId(film: Film): string | null {
  if (!film.youtubeId?.trim()) return null;
  return parseYoutubeId(film.youtubeId);
}

export function youtubePosterUrl(
  youtubeId: string,
  quality: "max" | "hq" = "max",
): string {
  const file = quality === "max" ? "maxresdefault" : "hqdefault";
  return `https://img.youtube.com/vi/${youtubeId}/${file}.jpg`;
}

export function youtubeEmbedUrl(youtubeId: string, origin: string): string {
  const params = new URLSearchParams({
    autoplay: "1",
    modestbranding: "1",
    rel: "0",
    origin,
  });
  return `https://www.youtube.com/embed/${youtubeId}?${params.toString()}`;
}

export function filmPosterSrc(film: Film): string | null {
  const youtubeId = resolveFilmYoutubeId(film);
  if (film.posterSrc?.trim()) return film.posterSrc.trim();
  if (youtubeId) return youtubePosterUrl(youtubeId);
  return null;
}

export function filmIsPlayable(film: Film): boolean {
  return resolveFilmYoutubeId(film) !== null;
}

/**
 * Ajouter un métrage : une entrée ici (+ poster optionnel dans public/assets/films/).
 * youtubeId : ID ou lien YouTube non répertorié.
 */
/** Ordre : chrono global inversé (plus récent en premier). */
export const films: Film[] = [
  {
    id: "stinville-festival",
    title: "Stinville Festival — sketch absurde",
    year: "2026",
    role: "Écrit & joué",
    format: "Spectacle vivant",
    note: "Catégorie fictive « meilleur acteur pour un film d’animation », trophée reçu en direct · En présence de Mathieu Turi et Jodie Ruth-Forest",
    youtubeId: "https://youtu.be/R6QIB1YnpRc",
  },
  {
    id: "le-nez",
    title: "Le nez",
    year: "2026",
    role: "1er rôle",
    format: "Court métrage",
    note: "Adaptation de la nouvelle de Nikolaï Gogol",
  },
];
