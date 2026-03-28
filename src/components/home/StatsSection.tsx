import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { profile } from "@/lib/profile-data";

const StatsSection = () => {
  const measurementEntries = Object.entries(profile.measurements);

  return (
    <section id="profil" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <h2
          className="text-4xl md:text-5xl font-light tracking-wide text-center mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Profil
        </h2>
        <Separator className="w-12 mx-auto mb-16 bg-primary/40" />

        {/* Details row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="text-center">
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1">
              Cheveux
            </p>
            <p className="text-lg text-foreground">{profile.hair}</p>
          </div>
          <div className="text-center">
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1">
              Yeux
            </p>
            <p className="text-lg text-foreground">{profile.eyes}</p>
          </div>
          <div className="text-center">
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1">
              Tranche d'âge
            </p>
            <p className="text-lg text-foreground">{profile.ageRange}</p>
          </div>
          <div className="text-center">
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1">
              Langues
            </p>
            <p className="text-lg text-foreground">{profile.languages.join(" / ")}</p>
          </div>
        </div>

        {/* Measurements grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
          {measurementEntries.map(([label, value]) => (
            <div key={label} className="text-center py-4 rounded-lg border border-border/30 bg-card/30">
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1">
                {label}
              </p>
              <p className="text-xl font-light text-foreground">{value}</p>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="flex flex-wrap justify-center gap-3">
          {profile.skills.map((skill) => (
            <Badge
              key={skill}
              variant="outline"
              className="text-sm tracking-wider px-4 py-1.5 border-primary/30 text-primary"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
};

export { StatsSection };
