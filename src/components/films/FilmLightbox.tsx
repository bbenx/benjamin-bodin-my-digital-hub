import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { FilmMeta } from "@/components/films/FilmMeta";
import {
  resolveFilmYoutubeId,
  youtubeEmbedUrl,
  type Film,
} from "@/lib/films-data";

type FilmLightboxProps = {
  film: Film | null;
  onClose: () => void;
};

const FilmLightbox = ({ film, onClose }: FilmLightboxProps) => {
  const youtubeId = film ? resolveFilmYoutubeId(film) : null;
  const isOpen = film !== null && youtubeId !== null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-none w-screen h-[100dvh] p-0 bg-black/95 border-none rounded-none flex flex-col [&>button]:text-white [&>button]:hover:text-primary [&>button]:z-20">
        <DialogTitle className="sr-only">
          {film ? `Lecture — « ${film.title} »` : "Lecture vidéo"}
        </DialogTitle>
        <DialogDescription className="sr-only">
          Lecteur vidéo plein écran
        </DialogDescription>

        {film && youtubeId ? (
          <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-5 px-4 pb-8 pt-14 md:gap-6 md:px-10 md:pb-10 md:pt-16">
            <div className="w-full max-w-5xl shrink-0">
              <FilmMeta
                film={film}
                titleClassName="text-3xl md:text-4xl"
                align="center"
              />
            </div>

            <div
              className="relative w-full max-w-5xl shrink-0 overflow-hidden rounded-lg border border-border/30 bg-black"
              style={{ aspectRatio: "16 / 9" }}
            >
              <iframe
                src={youtubeEmbedUrl(youtubeId)}
                title={`« ${film.title} » — Benjamin Bodin`}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export { FilmLightbox };
