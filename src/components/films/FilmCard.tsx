import { useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  filmIsPlayable,
  filmPosterSrc,
  type Film,
} from "@/lib/films-data";
import { FilmMeta } from "@/components/films/FilmMeta";

type FilmCardProps = {
  film: Film;
  onPlay: () => void;
};

const FilmCard = ({ film, onPlay }: FilmCardProps) => {
  const playable = filmIsPlayable(film);
  const posterSrc = filmPosterSrc(film);
  const [posterFailed, setPosterFailed] = useState(false);

  const handleClick = () => {
    if (!playable) return;
    onPlay();
  };

  return (
    <article className="w-full max-w-4xl mx-auto">
      <button
        type="button"
        disabled={!playable}
        className={cn(
          "group relative block w-full rounded-lg border border-border/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background",
          playable
            ? "cursor-pointer"
            : "cursor-default",
        )}
        style={{ aspectRatio: "16 / 9" }}
        aria-label={
          playable
            ? `Lire « ${film.title} »`
            : `« ${film.title} » — bientôt disponible`
        }
        onClick={handleClick}
      >
        {posterSrc && !posterFailed ? (
          <img
            src={posterSrc}
            alt=""
            className={cn(
              "absolute inset-0 h-full w-full rounded-lg object-cover transition-[filter,transform] duration-500",
              playable &&
                "brightness-[0.88] saturate-[0.9] group-hover:brightness-95 group-hover:saturate-100",
            )}
            loading="lazy"
            onError={() => setPosterFailed(true)}
          />
        ) : (
          <div className="absolute inset-0 rounded-lg bg-card/60" />
        )}

        <div
          className={cn(
            "absolute inset-0 rounded-lg transition-colors duration-300",
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

      <div className="mt-6 md:mt-8">
        <FilmMeta film={film} />
      </div>
    </article>
  );
};

export { FilmCard };
