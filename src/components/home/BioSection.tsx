import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { profile } from "@/lib/profile-data";

function resolvePublicMediaUrl(raw: string): string {
  const t = raw.trim();
  if (!t) return "";
  if (t.startsWith("http://") || t.startsWith("https://")) return t;
  return encodeURI(t);
}

const BioSection = () => {
  const [isPresentationExpanded, setIsPresentationExpanded] = useState(false);
  const presentationVideoSrc = resolvePublicMediaUrl(
    profile.presentationVideoSrc ?? "",
  );
  return (
    <section
      id="bio"
      className="scroll-mt-24 pt-14 md:pt-20 pb-12 md:pb-16 px-6"
    >
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-4xl md:text-5xl font-light tracking-wide text-center mb-3"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Bio
        </h2>
        <Separator className="w-12 mx-auto mb-7 md:mb-9 bg-primary/40" />
        <p
          className="text-base md:text-lg font-light leading-relaxed text-muted-foreground text-center"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          {profile.bio}
        </p>

        <div className="mt-6 md:mt-8 flex flex-col items-center">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-white/80 bg-white px-7 py-3 text-sm font-medium tracking-[0.08em] text-black uppercase transition-none hover:border-primary hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            onClick={() => setIsPresentationExpanded((prev) => !prev)}
            aria-expanded={isPresentationExpanded}
            aria-controls="presentation-video-content"
            disabled={!presentationVideoSrc}
          >
            {isPresentationExpanded
              ? "Masquer la vidéo de presentation"
              : "Voir la vidéo de presentation"}
          </button>

          {isPresentationExpanded && presentationVideoSrc ? (
            <div id="presentation-video-content" className="mt-6 w-full max-w-3xl">
              <video
                className="w-full rounded-lg border border-border/30 bg-black"
                controls
                playsInline
                preload="metadata"
                src={presentationVideoSrc}
                title="Vidéo de présentation — Benjamin Bodin"
              >
                Votre navigateur ne permet pas la lecture de cette vidéo.
              </video>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export { BioSection };
