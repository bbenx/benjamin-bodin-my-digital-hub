import { useCallback, useRef, useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { resolvePublicMediaUrl } from "@/lib/media-url";

type FilmLocalVideoProps = {
  videoSrc: string;
  posterSrc?: string;
  title: string;
};

/** Même logique que la bande démo : play custom, contrôles natifs, plein écran navigateur. */
const FilmLocalVideo = ({ videoSrc, posterSrc, title }: FilmLocalVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasStartedRef = useRef(false);
  const [showPlayOverlay, setShowPlayOverlay] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);
  const resolvedSrc = resolvePublicMediaUrl(videoSrc);
  const resolvedPoster = posterSrc ? resolvePublicMediaUrl(posterSrc) : undefined;

  const handleOverlayClick = useCallback(() => {
    void videoRef.current?.play();
  }, []);

  const handleVideoPlay = useCallback(() => {
    hasStartedRef.current = true;
    setShowPlayOverlay(false);
    setHasStarted(true);
    setIsPlaying(true);
  }, []);

  const handleVideoPause = useCallback(() => {
    setIsPlaying(false);
    if (hasStartedRef.current) {
      setShowPlayOverlay(true);
    }
  }, []);

  const handleVideoEnded = useCallback(() => {
    hasStartedRef.current = false;
    setShowPlayOverlay(true);
    setHasStarted(false);
    setIsPlaying(false);
  }, []);

  const handleVideoError = useCallback(() => {
    setHasVideoError(true);
  }, []);

  const handleLoadedData = useCallback(() => {
    if (resolvedPoster || hasStartedRef.current) return;
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    if (video.currentTime === 0) {
      video.currentTime = 0.001;
    }
  }, [resolvedPoster]);

  const videoFilterClass = cn(
    "transition-[filter] duration-500 ease-out",
    showPlayOverlay &&
      "brightness-[0.68] saturate-[0.72] contrast-[1.03]",
    !showPlayOverlay && isPlaying && "brightness-100 saturate-100 contrast-100",
    !showPlayOverlay &&
      !isPlaying &&
      hasStarted &&
      "brightness-[0.9] saturate-[0.82] contrast-[0.98]",
  );

  return (
    <>
      <video
        ref={videoRef}
        className={cn(
          "absolute inset-0 h-full w-full cursor-pointer bg-black object-contain",
          videoFilterClass,
        )}
        controls={hasStarted}
        playsInline
        preload="metadata"
        poster={resolvedPoster}
        title={title}
        onLoadedData={handleLoadedData}
        onPlay={handleVideoPlay}
        onPause={handleVideoPause}
        onEnded={handleVideoEnded}
        onError={handleVideoError}
      >
        <source src={resolvedSrc} type="video/mp4" />
        Votre navigateur ne permet pas la lecture de cette vidéo.
      </video>

      {showPlayOverlay ? (
        <button
          type="button"
          className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center bg-black/45 transition-colors hover:bg-black/55"
          aria-label={`Lire ${title}`}
          onClick={handleOverlayClick}
        >
          <span
            className="pointer-events-none flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-2 border-white/70 bg-white/20 shadow-xl ring-2 ring-white/25 backdrop-blur-sm md:h-28 md:w-28"
            aria-hidden
          >
            <Play
              className="ml-1 h-10 w-10 text-white drop-shadow-md md:h-11 md:w-11"
              strokeWidth={2.25}
            />
          </span>
        </button>
      ) : null}

      {hasVideoError ? (
        <div className="absolute inset-x-4 bottom-4 z-20 rounded-md border border-red-400/40 bg-black/70 px-3 py-2 text-center text-xs text-red-200">
          Impossible de lire la vidéo — vérifiez que le fichier MP4 est bien
          présent.
        </div>
      ) : null}
    </>
  );
};

export { FilmLocalVideo };
