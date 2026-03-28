import { Play } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { profile } from "@/lib/profile-data";

const ReelSection = () => {
  return (
    <section id="bande-demo" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <h2
          className="text-4xl md:text-5xl font-light tracking-wide text-center mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Bande démo
        </h2>
        <Separator className="w-12 mx-auto mb-16 bg-primary/40" />

        {/* Video container */}
        <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
          {profile.showreelUrl ? (
            <iframe
              src={profile.showreelUrl}
              title="Bande démo — Benjamin Bodin"
              className="absolute inset-0 w-full h-full rounded-lg border border-border/30"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg border border-border/30 bg-card/50">
              <div className="w-20 h-20 rounded-full border-2 border-primary/30 flex items-center justify-center mb-6">
                <Play className="w-8 h-8 text-primary/50 ml-1" />
              </div>
              <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground">
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
