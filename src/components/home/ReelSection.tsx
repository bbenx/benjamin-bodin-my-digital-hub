import { useCallback, useRef, useState } from "react";
import { Play } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { profile } from "@/lib/profile-data";

/** Chemins avec espaces / caractères spéciaux → URL valide pour src / poster. */
function resolvePublicMediaUrl(raw: string): string {
  const t = raw.trim();
  if (!t) return "";
  if (t.startsWith("http://") || t.startsWith("https://")) return t;
  return encodeURI(t);
}

/**
 * Présentation courte : gros play au centre, puis lecture avec son (geste utilisateur).
 * Pause via le comportement natif du navigateur (clic sur la vidéo / contrôles) — pas de
 * onClick custom, sinon double toggle (pause puis reprise). À la pause : overlay gris + play.
 */
function DemoLocalVideo({
  videoSrc,
  posterSrc,
}: {
  videoSrc: string;
  posterSrc: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasStartedRef = useRef(false);
  const [showPlayOverlay, setShowPlayOverlay] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);

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

  const videoFilterClass = cn(
    "transition-[filter] duration-500 ease-out",
    showPlayOverlay &&
      "brightness-[0.68] saturate-[0.72] contrast-[1.03]",
    !showPlayOverlay &&
      isPlaying &&
      "brightness-100 saturate-100 contrast-100",
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
          "absolute inset-0 h-full w-full cursor-pointer rounded-lg border border-border/30 object-contain bg-black",
          videoFilterClass,
        )}
        controls={hasStarted}
        playsInline
        preload={posterSrc ? "metadata" : "none"}
        poster={posterSrc || undefined}
        title="Bande démo — Benjamin Bodin"
        onPlay={handleVideoPlay}
        onPause={handleVideoPause}
        onEnded={handleVideoEnded}
        onError={handleVideoError}
      >
        <source src={videoSrc} type="video/mp4" />
        Votre navigateur ne permet pas la lecture de cette vidéo.
      </video>

      {showPlayOverlay ? (
        <button
          type="button"
          className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center rounded-lg bg-black/45 transition-colors hover:bg-black/55"
          aria-label="Lire la présentation vidéo"
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
          Impossible de lire la vidéo sur ce navigateur.
        </div>
      ) : null}
    </>
  );
}

const ReelSection = () => {
  const hasLocalVideo = Boolean(profile.demoVideoSrc?.trim());
  const videoSrc = resolvePublicMediaUrl(profile.demoVideoSrc ?? "");
  const posterSrc = resolvePublicMediaUrl(profile.demoVideoPoster ?? "");
  const hasEmbed = Boolean(profile.showreelUrl?.trim());

  return (
    <section id="bande-demo" className="scroll-mt-24 py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-4xl md:text-5xl font-light tracking-wide text-center mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Bande démo
        </h2>
        <Separator className="w-12 mx-auto mb-16 bg-primary/40" />

        <div
          id="bande-demo-content"
          className="relative w-full"
          style={{ aspectRatio: "16 / 9" }}
        >
          {hasLocalVideo ? (
            <DemoLocalVideo videoSrc={videoSrc} posterSrc={posterSrc} />
          ) : hasEmbed ? (
            <iframe
              src={profile.showreelUrl}
              title="Bande démo — Benjamin Bodin"
              className="absolute inset-0 w-full h-full rounded-lg border border-border/30"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg border border-border/30 bg-card/50">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary/30">
                <Play className="ml-1 h-8 w-8 text-primary/50" />
              </div>
              <p className="text-sm tracking-[0.2em] text-muted-foreground uppercase">
                Bande démo à venir
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export { ReelSection };
