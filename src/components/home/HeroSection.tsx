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

const heroShellStyle = {
  minHeight: "100vh",
  position: "relative" as const,
  overflowX: "hidden" as const,
};

const HeroSection = () => {
  return (
    <section
      className="relative flex min-h-screen w-full max-w-full flex-col overflow-x-hidden"
      style={heroShellStyle}
    >
      <h1 className="sr-only" style={visuallyHiddenStyle}>
        Benjamin Bodin — Comédien et mannequin à Paris
      </h1>
      {/* Subtle background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[140px] pointer-events-none" />

      {/* Centered Name + Portrait */}
      <div className="absolute left-1/2 top-[calc(50%-1rem)] w-full -translate-x-1/2 -translate-y-1/2 px-4 sm:top-[calc(50%-1.25rem)] md:top-[calc(50%-1.5rem)] lg:top-[calc(50%-1.75rem)]">
        <div className="relative text-center">
          <div>
            <BlurText
              text="BENJAMIN"
              delay={80}
              animateBy="letters"
              direction="top"
              className="font-bold leading-[0.8] tracking-tighter uppercase justify-center text-[clamp(2.5rem,16vw,6.25rem)] sm:text-[clamp(3.75rem,17vw,9.375rem)] md:text-[clamp(5rem,22vw,12.5rem)] lg:text-[16.25rem]"
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
              className="font-bold leading-[0.8] tracking-tighter uppercase justify-center text-[clamp(2.5rem,16vw,6.25rem)] sm:text-[clamp(3.75rem,17vw,9.375rem)] md:text-[clamp(5rem,22vw,12.5rem)] lg:text-[16.25rem]"
              style={{
                color: "hsl(175 35% 40%)",
                fontFamily: "'Fira Code', monospace",
              }}
            />
          </div>

          {/* Portrait overlapping text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-[70px] h-[115px] sm:w-[95px] sm:h-[155px] md:w-[115px] md:h-[190px] lg:w-[135px] lg:h-[225px] rounded-full overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-110 cursor-pointer border border-border/30">
              <img
                src={portrait}
                alt="Portrait de Benjamin Bodin, comédien et mannequin"
                className="w-full h-full object-cover"
                fetchPriority="high"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tagline */}
      <div className="absolute inset-x-0 bottom-48 px-6 sm:bottom-40 lg:bottom-40">
        <div className="flex justify-center">
          <BlurText
            text={profile.tagline}
            delay={120}
            animateBy="words"
            direction="top"
            className="text-[16px] sm:text-[18px] md:text-[21px] lg:text-[24px] text-center transition-colors duration-300 text-muted-foreground"
            style={{ fontFamily: "'Outfit', sans-serif", letterSpacing: "0.3em" }}
          />
        </div>
      </div>

      {/* Scroll indicator — bounce sur un wrapper pour ne pas écraser le centrage (transform) */}
      <div className="absolute inset-x-0 bottom-28 z-10 flex justify-center sm:bottom-24 md:bottom-14">
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
