import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/use-in-view";
import { profile } from "@/lib/profile-data";

const keyStats = [
  { label: "Taille", value: "176", unit: "cm" },
  { label: "Poids", value: profile.weight, unit: "kg" },
  { label: "Âge", value: profile.age, unit: "ans" },
  { label: "Âge apparent", value: profile.apparentAge, unit: "ans" },
];

const measurements = [
  ["Poitrine", profile.measurements["Poitrine"]],
  ["Tour de taille", profile.measurements["Tour de taille"]],
  ["Hanches", profile.measurements["Hanches"]],
  ["Entrejambe", profile.measurements["Entrejambe"]],
  ["Cou", profile.measurements["Cou"]],
  ["Tour de tête", profile.measurements["Tour de tête"]],
  ["Veste", profile.measurements["Veste"]],
  ["Pantalon", profile.measurements["Pantalon"]],
  ["Chaussures", profile.measurements["Chaussures"]],
];

const StatsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const showContent = useInView(sectionRef, {
    once: true,
    rootMargin: "120px 0px",
  });

  return (
    <section
      id="mensurations"
      ref={sectionRef}
      className="relative scroll-mt-24 overflow-hidden px-6 pb-12 pt-20 md:pb-16 md:pt-28"
    >
      <div
        className={cn(
          "pointer-events-none absolute bottom-0 left-[12%] top-0 hidden w-px origin-top bg-primary/10 md:block",
          "stats-line-reveal-y",
          showContent && "stats-line-reveal-y--in",
        )}
        style={{ ["--stats-delay" as string]: "0ms" }}
      />

      <div className="mx-auto max-w-5xl">
        <div className="mb-20 md:mb-28">
          <h2
            className={cn(
              "stats-fade-up text-5xl font-light tracking-tight text-foreground/90 md:text-7xl lg:text-8xl",
              showContent && "stats-fade-up--in",
            )}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              ["--stats-delay" as string]: "0ms",
            }}
          >
            Mensurations
          </h2>

          <div
            className={cn(
              "stats-line-reveal-x mt-8 h-px max-w-[4rem] origin-left bg-primary/40",
              showContent && "stats-line-reveal-x--in",
            )}
            style={{ ["--stats-delay" as string]: "300ms" }}
          />
        </div>

        <div className="mb-16 grid grid-cols-2 gap-x-8 gap-y-14 md:mb-20 md:grid-cols-4 md:gap-y-0">
          {keyStats.map((stat, i) => (
            <div
              key={stat.label}
              className={cn(
                "stats-fade-up relative",
                showContent && "stats-fade-up--in",
              )}
              style={{ ["--stats-delay" as string]: `${(i + 1) * 80}ms` }}
            >
              <p
                className="mb-3 text-[10px] uppercase tracking-[0.4em] text-muted-foreground/60"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {stat.label}
              </p>
              <div className="flex items-baseline gap-1.5">
                <span
                  className="text-4xl font-extralight leading-none text-foreground/90 md:text-5xl lg:text-6xl"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {stat.value}
                </span>
                {stat.unit ? (
                  <span className="text-xs uppercase tracking-widest text-primary/50">
                    {stat.unit}
                  </span>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        <div
          className={cn(
            "stats-fade-up mb-8 flex flex-wrap items-baseline gap-x-8 gap-y-2 text-sm text-muted-foreground/70 md:mb-10 md:text-base",
            showContent && "stats-fade-up--in",
          )}
          style={{
            fontFamily: "'Outfit', sans-serif",
            ["--stats-delay" as string]: "400ms",
          }}
        >
          <span>
            <span className="mr-2.5 text-[10px] uppercase tracking-[0.32em] text-muted-foreground/50">
              Yeux
            </span>
            <span className="font-light text-foreground/80">{profile.eyes}</span>
          </span>
          <span className="hidden text-border/60 sm:inline">·</span>
          <span>
            <span className="mr-2.5 text-[10px] uppercase tracking-[0.32em] text-muted-foreground/50">
              Cheveux
            </span>
            <span className="font-light text-foreground/80">{profile.hair}</span>
          </span>
        </div>

        <div className="grid gap-8 md:grid-cols-[1fr_1px_1fr] md:gap-0">
          <div className="space-y-0 md:pr-12">
            {measurements.slice(0, 5).map(([label, value], i) => (
              <div
                key={label}
                className={cn(
                  "stats-fade-up flex items-center justify-between border-b border-border/15 py-3.5",
                  showContent && "stats-fade-up--in",
                )}
                style={{ ["--stats-delay" as string]: `${(i + 6) * 80}ms` }}
              >
                <span
                  className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground/50"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {label}
                </span>
                <span
                  className="text-sm font-light text-foreground/80"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div
            className={cn(
              "stats-line-reveal-y hidden origin-top bg-border/20 md:block",
              showContent && "stats-line-reveal-y--in",
            )}
            style={{ ["--stats-delay" as string]: "600ms" }}
          />

          <div className="space-y-0 md:pl-12">
            {measurements.slice(5).map(([label, value], i) => (
              <div
                key={label}
                className={cn(
                  "stats-fade-up flex items-center justify-between border-b border-border/15 py-3.5",
                  showContent && "stats-fade-up--in",
                )}
                style={{ ["--stats-delay" as string]: `${(i + 11) * 80}ms` }}
              >
                <span
                  className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground/50"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {label}
                </span>
                <span
                  className="text-sm font-light text-foreground/80"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { StatsSection };
