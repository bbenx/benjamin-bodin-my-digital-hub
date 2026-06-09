import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { FilmCard } from "@/components/films/FilmCard";
import { PageSeo } from "@/components/seo/PageSeo";
import { films } from "@/lib/films-data";
import { SEO_COPY } from "@/lib/seo-config";

const Videos = () => {
  const [playingFilmId, setPlayingFilmId] = useState<string | null>(null);

  return (
    <div className="pt-24 pb-16">
      <PageSeo
        title={SEO_COPY.videos.title}
        description={SEO_COPY.videos.description}
        path="/videos"
      />

      <div className="text-center px-6 pb-8">
        <h1
          className="text-5xl md:text-6xl font-light tracking-wide mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Vidéos
          <span className="sr-only">
            {" "}
            — métrages intégraux de Benjamin Bodin, comédien
          </span>
        </h1>
        <Separator className="w-12 mx-auto bg-primary/40" />
      </div>

      <div className="px-6 space-y-16 md:space-y-20">
        {films.length > 0 ? (
          films.map((film) => (
            <FilmCard
              key={film.id}
              film={film}
              isPlaying={playingFilmId === film.id}
              onPlay={() => setPlayingFilmId(film.id)}
            />
          ))
        ) : (
          <p className="text-center text-sm tracking-[0.15em] uppercase text-muted-foreground">
            Aucune vidéo pour le moment
          </p>
        )}
      </div>
    </div>
  );
};

export default Videos;
