import type { Film } from "@/lib/films-data";

type FilmMetaProps = {
  film: Film;
  titleClassName?: string;
  align?: "center" | "left";
  showNote?: boolean;
};

const FilmMeta = ({
  film,
  titleClassName = "text-2xl md:text-3xl",
  align = "center",
  showNote = true,
}: FilmMetaProps) => {
  const alignClass = align === "center" ? "text-center" : "text-left";

  return (
    <div className={alignClass}>
      <p
        className={`font-light tracking-wide text-foreground ${titleClassName}`}
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        «&nbsp;{film.title}&nbsp;»
      </p>
      <p className="mt-2 text-sm md:text-[15px] leading-relaxed">
        <span className="font-medium text-primary">{film.role}</span>
        <span className="text-muted-foreground/40 mx-2" aria-hidden>
          ·
        </span>
        <span className="font-light text-foreground/85">{film.format}</span>
        <span className="text-muted-foreground/40 mx-2" aria-hidden>
          ·
        </span>
        <span className="font-light text-foreground/85">{film.year}</span>
      </p>
      {film.director ? (
        <p className="mt-1.5 text-sm font-light text-muted-foreground">
          Réal. {film.director}
        </p>
      ) : null}
      {showNote && film.note ? (
        <p className="mt-1.5 text-sm font-light text-muted-foreground/80">
          {film.note}
        </p>
      ) : null}
    </div>
  );
};

export { FilmMeta };
