import { ChevronDown } from "lucide-react";
import { trackHeroScrollDownClick } from "@/lib/analytics";
import { profile } from "@/lib/profile-data";

const portraitMobile = "/assets/hero-portrait-360.webp";
const portraitDesktop = "/assets/hero-portrait.webp";

const heroNameClass =
  "block font-bold uppercase leading-[0.8] tracking-tighter text-[clamp(2.5rem,16vw,6.25rem)] sm:text-[clamp(3.75rem,17vw,9.375rem)] md:text-[clamp(5rem,22vw,12.5rem)] lg:text-[16.25rem]";

const heroNameStyle = {
  color: "hsl(175 35% 40%)",
  fontFamily:
    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Fira Code', monospace",
} as const;

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
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[min(600px,80dvh)] w-[min(600px,90vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[140px]" />

      <div className="flex flex-1 flex-col items-center justify-center px-4 pt-[var(--site-header-height)]">
        <div className="relative w-full text-center">
          <span className={heroNameClass} style={heroNameStyle}>
            BENJAMIN
          </span>
          <span className={heroNameClass} style={heroNameStyle}>
            BODIN
          </span>

          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
            <div className="h-[115px] w-[70px] overflow-hidden rounded-full border border-border/30 shadow-2xl sm:h-[155px] sm:w-[95px] md:h-[190px] md:w-[115px] lg:h-[225px] lg:w-[135px]">
              <img
                src={portraitMobile}
                srcSet={`${portraitMobile} 360w, ${portraitDesktop} 540w`}
                sizes="135px"
                alt="Portrait de Benjamin Bodin, comédien et mannequin"
                className="h-full w-full object-cover"
                width={135}
                height={225}
                fetchPriority="high"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>

        <p
          className="mt-8 text-center text-[16px] text-muted-foreground sm:mt-10 sm:text-[18px] md:mt-12 md:text-[21px] lg:text-[24px]"
          style={{
            fontFamily: "system-ui, -apple-system, 'Outfit', sans-serif",
            letterSpacing: "0.3em",
          }}
        >
          {profile.tagline}
        </p>
      </div>

      <div className="z-10 flex shrink-0 justify-center pb-6 sm:pb-8 md:pb-10">
        <div className="animate-bounce">
          <button
            type="button"
            className="flex size-11 touch-manipulation items-center justify-center rounded-full text-muted-foreground/50 transition-colors hover:text-primary md:size-12"
            aria-label="Défiler vers le bas"
            onClick={() => {
              trackHeroScrollDownClick();
              document.getElementById("bio")?.scrollIntoView({ behavior: "smooth" });
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
