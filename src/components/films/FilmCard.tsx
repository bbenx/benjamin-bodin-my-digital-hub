import { useState } from "react";
import { ExternalLink, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackFilmPlay } from "@/lib/analytics";
import {
  filmIsPlayable,
  filmPosterSrc,
  resolveFilmYoutubeId,
  youtubeWatchUrl,
  type Film,
} from "@/lib/films-data";
import { FilmMeta } from "@/components/films/FilmMeta";

type FilmCardProps = {
  film: Film;
};

const FilmCard = ({ film }: FilmCardProps) => {
  const playable = filmIsPlayable(film);
  const youtubeId = resolveFilmYoutubeId(film);
  const posterSrc = filmPosterSrc(film);
  const [posterFailed, setPosterFailed] = useState(false);

  const openOnYoutube = () => {
    if (!youtubeId) return;
    trackFilmPlay({ film_id: film.id, film_title: film.title });
    window.open(youtubeWatchUrl(youtubeId), "_blank", "noopener,noreferrer");
  };

  return (
    <article className="w-full max-w-4xl mx-auto">
      <div className="mb-6 md:mb-8">
        <FilmMeta film={film} showNote={false} />
      </div>

      <button
        type="button"
        disabled={!playable}
        className={cn(
          "group relative block w-full overflow-hidden rounded-lg border border-border/30 bg-black focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background",
          playable ? "cursor-pointer" : "cursor-default",
        )}
        style={{ aspectRatio: "16 / 9" }}
        aria-label={
          playable
            ? `Regarder « ${film.title} » sur YouTube`
            : `« ${film.title} » — bientôt disponible`
        }
        onClick={openOnYoutube}
      >
        {posterSrc && !posterFailed ? (
          <img
            src={posterSrc}
            alt=""
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-[filter,transform] duration-500",
              playable &&
                "brightness-[0.88] saturate-[0.9] group-hover:brightness-95 group-hover:saturate-100",
            )}
            loading="lazy"
            onError={() => setPosterFailed(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-card/60" />
        )}

        <div
          className={cn(
            "absolute inset-0 transition-colors duration-300",
            playable ? "bg-black/40 group-hover:bg-black/50" : "bg-black/55",
          )}
        />

        <span className="absolute inset-0 z-10 flex items-center justify-center">
          <span
            className={cn(
              "flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-2 shadow-xl ring-2 backdrop-blur-sm transition-transform duration-300 md:h-28 md:w-28",
              playable
                ? "border-white/70 bg-white/20 ring-white/25 group-hover:scale-105"
                : "border-primary/30 bg-primary/10 ring-primary/15",
            )}
            aria-hidden
          >
            <Play
              className={cn(
                "ml-1 h-10 w-10 drop-shadow-md md:h-11 md:w-11",
                playable ? "text-white" : "text-primary/50",
              )}
              strokeWidth={2.25}
            />
          </span>
        </span>

        {!playable ? (
          <span className="absolute inset-x-0 bottom-5 z-10 text-center text-xs tracking-[0.2em] uppercase text-muted-foreground">
            Bientôt disponible
          </span>
        ) : null}
      </button>

      {playable ? (
        <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs tracking-[0.12em] uppercase text-muted-foreground">
          <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden />
          S’ouvre sur YouTube dans un nouvel onglet
        </p>
      ) : null}

      {film.note ? (
        <p className="mt-5 md:mt-6 text-center text-sm font-light leading-relaxed text-muted-foreground/80">
          {film.note}
        </p>
      ) : null}
    </article>
  );
};

export { FilmCard };
