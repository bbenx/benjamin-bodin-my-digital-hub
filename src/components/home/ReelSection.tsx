import { Play } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { profile } from "@/lib/profile-data";

/** Chemins avec espaces / caractères spéciaux → URL valide pour <video src>. */
function resolveDemoVideoSrc(raw: string): string {
  const t = raw.trim();
  if (!t) return "";
  if (t.startsWith("http://") || t.startsWith("https://")) return t;
  return encodeURI(t);
}

const ReelSection = () => {
  const hasLocalVideo = Boolean(profile.demoVideoSrc?.trim());
  const videoSrc = resolveDemoVideoSrc(profile.demoVideoSrc ?? "");
  const hasEmbed = Boolean(profile.showreelUrl?.trim());
  const showNote =
    Boolean(profile.demoSectionNote) && (hasLocalVideo || hasEmbed);

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

        {showNote ? (
          <p
            className="mx-auto mb-8 max-w-2xl text-pretty text-center text-sm font-light leading-relaxed text-muted-foreground md:mb-10 md:text-base md:leading-relaxed"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {profile.demoSectionNote}
          </p>
        ) : null}

        <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
          {hasLocalVideo ? (
            <video
              className="absolute inset-0 h-full w-full rounded-lg border border-border/30 object-contain bg-black"
              controls
              playsInline
              preload="auto"
              src={videoSrc}
              title="Bande démo — Benjamin Bodin"
            >
              Votre navigateur ne permet pas la lecture de cette vidéo.
            </video>
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
