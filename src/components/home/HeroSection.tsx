import { ChevronDown } from "lucide-react";
import { BlurText } from "@/components/ui/blur-text";
const portrait = "/assets/book/Ludo%202/LYNE9458.webp";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Subtle background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[140px] pointer-events-none" />

      {/* Centered Name + Portrait */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4">
        <div className="relative text-center">
          <div>
            <BlurText
              text="BENJAMIN"
              delay={80}
              animateBy="letters"
              direction="top"
              className="font-bold text-[100px] sm:text-[150px] md:text-[200px] lg:text-[260px] leading-[0.8] tracking-tighter uppercase justify-center whitespace-nowrap"
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
              className="font-bold text-[100px] sm:text-[150px] md:text-[200px] lg:text-[260px] leading-[0.8] tracking-tighter uppercase justify-center whitespace-nowrap"
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
                alt="Benjamin Bodin"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tagline */}
      <div className="absolute bottom-20 sm:bottom-24 md:bottom-28 lg:bottom-36 left-1/2 -translate-x-1/2 w-full px-6">
        <div className="flex justify-center">
          <BlurText
            text="Comédien · Mannequin"
            delay={120}
            animateBy="words"
            direction="top"
            className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] text-center transition-colors duration-300 text-muted-foreground"
            style={{ fontFamily: "'Outfit', sans-serif", letterSpacing: "0.3em" }}
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        type="button"
        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 animate-bounce"
        aria-label="Défiler vers le bas"
        onClick={() => {
          const next = document.getElementById("profil");
          next?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <ChevronDown className="w-6 h-6 md:w-8 md:h-8 text-muted-foreground/50 hover:text-primary transition-colors duration-300" />
      </button>
    </section>
  );
};

export { HeroSection };
