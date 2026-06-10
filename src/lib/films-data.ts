/** Métrages et vidéos intégrales — source unique pour la page /videos. */

export type Film = {
  id: string;
  title: string;
  year: string;
  role: string;
  format: string;
  director?: string;
  note?: string;
  /**
   * MP4 local dans public/videos/ (H.264) — lecture sur le site, sans YouTube.
   * Prioritaire sur youtubeId.
   */
  videoSrc?: string;
  /** ID ou URL YouTube — repli embed, ou vignette si videoSrc est défini */
  youtubeId?: string;
  /** Affiche locale sous public/ ; sinon miniature YouTube si youtubeId est défini */
  posterSrc?: string;
};

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

export function filmHasLocalVideo(film: Film): boolean {
  return Boolean(film.videoSrc?.trim());
}

export function filmIsPlayable(film: Film): boolean {
  return filmHasLocalVideo(film) || resolveFilmYoutubeId(film) !== null;
}

/**
 * Ajouter une vidéo : une entrée ici.
 * Préférer videoSrc (MP4 dans public/videos/, &lt; 100 Mo pour Git).
 * youtubeId : repli ou vignette uniquement.
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
    // videoSrc: "/videos/stinville-festival.mp4", // lecteur custom — décommenter quand le MP4 est ajouté
    youtubeId: "https://youtu.be/UjNlZFQ4t80",
  },
  {
    id: "le-nez",
    title: "Le nez",
    year: "2026",
    role: "1er rôle",
    format: "Court métrage",
    director: "Matthias Lauber",
    note: "Adaptation de la nouvelle de Nikolaï Gogol",
  },
];
