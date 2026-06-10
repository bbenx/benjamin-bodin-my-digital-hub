import { ChevronDown } from "lucide-react";
import { BlurText } from "@/components/ui/blur-text";
import { trackHeroScrollDownClick } from "@/lib/analytics";
import { profile } from "@/lib/profile-data";
const portrait = "/assets/book/Ludo%202/LYNE9458.webp";

/** Recoupe la logique `sr-only` si le CSS Tailwind n’est pas encore chargé. */
const visuallyHiddenStyle = {
  position: "absolute" as const,
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap" as const,
  border: 0,
};

const HeroSection = () => {
  return (
    <section className="relative flex min-h-[100dvh] w-full max-w-full flex-col overflow-x-hidden">
      <h1 className="sr-only" style={visuallyHiddenStyle}>
        Benjamin Bodin — Comédien et mannequin à Paris
      </h1>
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[min(600px,80dvh)] w-[min(600px,90vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[140px]" />

      {/* Nom + portrait centrés dans la zone visible sous le header */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 pt-[var(--site-header-height)]">
        <div className="relative w-full text-center">
          <div>
            <BlurText
              text="BENJAMIN"
              delay={80}
              animateBy="letters"
              direction="top"
              className="justify-center font-bold uppercase leading-[0.8] tracking-tighter text-[clamp(2.5rem,16vw,6.25rem)] sm:text-[clamp(3.75rem,17vw,9.375rem)] md:text-[clamp(5rem,22vw,12.5rem)] lg:text-[16.25rem]"
              style={{
                color: "hsl(175 35% 40%)",
                fontFamily: "'Fira Code', monospace",
              }}
            />
          </div>
          <div>
            <BlurText
              text="BODIN"
              delay={80}
              animateBy="letters"
              direction="top"
              className="justify-center font-bold uppercase leading-[0.8] tracking-tighter text-[clamp(2.5rem,16vw,6.25rem)] sm:text-[clamp(3.75rem,17vw,9.375rem)] md:text-[clamp(5rem,22vw,12.5rem)] lg:text-[16.25rem]"
              style={{
                color: "hsl(175 35% 40%)",
                fontFamily: "'Fira Code', monospace",
              }}
            />
          </div>

          {/* Portrait overlapping text */}
          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
            <div className="h-[115px] w-[70px] cursor-pointer overflow-hidden rounded-full border border-border/30 shadow-2xl transition-transform duration-300 hover:scale-110 sm:h-[155px] sm:w-[95px] md:h-[190px] md:w-[115px] lg:h-[225px] lg:w-[135px]">
              <img
                src={portrait}
                alt="Portrait de Benjamin Bodin, comédien et mannequin"
                className="h-full w-full object-cover"
                fetchPriority="high"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 md:mt-12">
          <BlurText
            text={profile.tagline}
            delay={120}
            animateBy="words"
            direction="top"
            className="text-center text-[16px] text-muted-foreground transition-colors duration-300 sm:text-[18px] md:text-[21px] lg:text-[24px]"
            style={{ fontFamily: "'Outfit', sans-serif", letterSpacing: "0.3em" }}
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="z-10 flex shrink-0 justify-center pb-6 sm:pb-8 md:pb-10">
        <div className="animate-bounce">
          <button
            type="button"
            className="flex size-11 touch-manipulation items-center justify-center rounded-full text-muted-foreground/50 transition-colors hover:text-primary md:size-12"
            aria-label="Défiler vers le bas"
            onClick={() => {
              trackHeroScrollDownClick();
              const next = document.getElementById("bio");
              next?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <ChevronDown className="size-6 md:size-8" />
          </button>
        </div>
      </div>
    </section>
  );
};

export { HeroSection };
