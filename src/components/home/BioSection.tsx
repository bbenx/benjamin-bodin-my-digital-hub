import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { profile } from "@/lib/profile-data";

const PRESENTATION_HASH = "presentation";

function resolvePublicMediaUrl(raw: string): string {
  const t = raw.trim();
  if (!t) return "";
  if (t.startsWith("http://") || t.startsWith("https://")) return t;
  return encodeURI(t);
}

function getVideoMimeType(src: string): string {
  const normalized = src.toLowerCase();
  if (normalized.endsWith(".mov")) return "video/quicktime";
  if (normalized.endsWith(".webm")) return "video/webm";
  return "video/mp4";
}

const BioSection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isPresentationExpanded, setIsPresentationExpanded] = useState(false);
  const [hasPresentationVideoError, setHasPresentationVideoError] =
    useState(false);
  const presentationVideoRef = useRef<HTMLVideoElement>(null);
  const presentationVideoSrc = resolvePublicMediaUrl(
    profile.presentationVideoSrc ?? "",
  );
  const presentationVideoType = getVideoMimeType(presentationVideoSrc);

  const currentHash = location.hash
    ? decodeURIComponent(location.hash.slice(1))
    : "";

  useEffect(() => {
    if (currentHash === PRESENTATION_HASH && presentationVideoSrc) {
      setIsPresentationExpanded(true);
    }
  }, [currentHash, presentationVideoSrc]);

  useLayoutEffect(() => {
    if (!isPresentationExpanded || !presentationVideoSrc) return;
    const el = presentationVideoRef.current;
    if (!el) return;
    void el.play().catch(() => {});
  }, [isPresentationExpanded, presentationVideoSrc]);

  useLayoutEffect(() => {
    if (!isPresentationExpanded || currentHash !== PRESENTATION_HASH) return;
    const target = document.getElementById(PRESENTATION_HASH);
    if (!target) return;
    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [isPresentationExpanded, currentHash]);

  const togglePresentation = () => {
    setIsPresentationExpanded((prev) => {
      const next = !prev;
      if (next) {
        void navigate(
          { pathname: "/", hash: PRESENTATION_HASH },
          { replace: true },
        );
      } else {
        setHasPresentationVideoError(false);
        if (currentHash === PRESENTATION_HASH) {
          void navigate({ pathname: "/", hash: "" }, { replace: true });
        }
      }
      return next;
    });
  };
  return (
    <section
      id="bio"
      className="scroll-mt-24 pt-14 md:pt-20 pb-12 md:pb-16 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <div className="max-w-3xl mx-auto">
        <h2
          className="text-4xl md:text-5xl font-light tracking-wide text-center mb-3"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Bio
        </h2>
        <Separator className="w-12 mx-auto mb-7 md:mb-9 bg-primary/40" />
        <p
          className="whitespace-pre-line text-base md:text-lg font-light leading-relaxed text-muted-foreground text-center"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          {profile.bio}
        </p>

        </div>

        <div
          id={PRESENTATION_HASH}
          className="scroll-mt-page mt-6 flex flex-col items-center md:mt-8"
        >
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border-2 border-primary bg-white px-7 py-3 text-sm font-medium tracking-[0.08em] text-primary uppercase shadow-sm transition-colors duration-200 hover:border-primary hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-40"
            onClick={togglePresentation}
            aria-expanded={isPresentationExpanded}
            aria-controls="presentation-video-content"
            disabled={!presentationVideoSrc}
          >
            {isPresentationExpanded
              ? "Masquer la vidéo de présentation"
              : "Voir la vidéo de présentation"}
          </button>

          {isPresentationExpanded && presentationVideoSrc ? (
            <div id="presentation-video-content" className="mt-6 w-full">
              <div
                className="relative w-full overflow-hidden rounded-lg border border-border/30 bg-black"
                style={{ aspectRatio: "16 / 9" }}
              >
                <video
                  ref={presentationVideoRef}
                  className="absolute inset-0 h-full w-full object-contain"
                  controls
                  playsInline
                  preload="auto"
                  title="Vidéo de présentation — Benjamin Bodin"
                  onError={() => setHasPresentationVideoError(true)}
                >
                  <source src={presentationVideoSrc} type={presentationVideoType} />
                  Votre navigateur ne permet pas la lecture de cette vidéo.
                </video>
              </div>
              {hasPresentationVideoError ? (
                <p className="mt-2 text-center text-xs text-red-300">
                  Impossible de lire la vidéo sur ce navigateur.
                </p>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export { BioSection };
