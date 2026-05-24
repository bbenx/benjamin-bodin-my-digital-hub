import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import {
  cvExperiences,
  cvFormation,
  cvIdentity,
  cvOtherSkills,
  type CvTimelineEntry,
} from "@/lib/cv-data";
import { PageSeo } from "@/components/seo/PageSeo";
import { SEO_COPY } from "@/lib/seo-config";

function TimelineList({ entries }: { entries: CvTimelineEntry[] }) {
  return (
    <ul className="space-y-5">
      {entries.map((entry) => (
        <li
          key={`${entry.period}-${entry.title}`}
          className="grid gap-1 sm:grid-cols-[7.5rem_1fr] sm:gap-6"
        >
          <p className="text-sm font-medium tracking-wide text-primary tabular-nums">
            {entry.period}
          </p>
          <div>
            <p className="text-sm md:text-[15px] font-light leading-relaxed text-foreground/90">
              {entry.title}
            </p>
            {entry.details && entry.details.length > 0 ? (
              <ul className="mt-2 space-y-1 text-sm font-light leading-relaxed text-muted-foreground">
                {entry.details.map((line) => (
                  <li key={line} className="pl-4 relative before:absolute before:left-0 before:content-['–']">
                    {line}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}

function SectionHeading({ children }: { children: string }) {
  return (
    <h2 className="text-[10px] tracking-[0.35em] uppercase text-primary mb-6 underline underline-offset-4 decoration-primary/50">
      {children}
    </h2>
  );
}

const Cv = () => {
  return (
    <div className="pt-24 pb-20 px-6">
      <PageSeo
        title={SEO_COPY.cv.title}
        description={SEO_COPY.cv.description}
        path="/cv"
      />
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 text-center">
          <h1
            className="text-4xl md:text-5xl font-light tracking-wide mb-3"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Fiche artiste
          </h1>
          <Separator className="w-12 mx-auto bg-primary/40" />
          <p
            className="mt-5 text-sm md:text-base font-light text-muted-foreground"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {cvIdentity.name}
          </p>
        </div>

        <div
          className="space-y-14 text-sm md:text-[15px] font-light leading-relaxed"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          <section>
            <SectionHeading>Identité</SectionHeading>
            <dl className="grid gap-3 sm:grid-cols-2">
              <div>
                <dt className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/70 mb-1">
                  Téléphone
                </dt>
                <dd>
                  <a
                    href={`tel:${cvIdentity.phone.replace(/\s/g, "")}`}
                    className="text-foreground/90 hover:text-primary transition-colors"
                  >
                    {cvIdentity.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/70 mb-1">
                  E-mail
                </dt>
                <dd>
                  <a
                    href={`mailto:${cvIdentity.email}`}
                    className="text-foreground/90 hover:text-primary transition-colors break-all"
                  >
                    {cvIdentity.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/70 mb-1">
                  Date de naissance
                </dt>
                <dd className="text-foreground/90">{cvIdentity.birthDate}</dd>
              </div>
              <div>
                <dt className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/70 mb-1">
                  Taille
                </dt>
                <dd className="text-foreground/90">{cvIdentity.height}</dd>
              </div>
              <div>
                <dt className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/70 mb-1">
                  Cheveux / yeux
                </dt>
                <dd className="text-foreground/90">
                  {cvIdentity.hair} · {cvIdentity.eyes}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/70 mb-1">
                  Permis
                </dt>
                <dd className="text-foreground/90">{cvIdentity.permits}</dd>
              </div>
            </dl>
          </section>

          <section>
            <SectionHeading>Formation artistique</SectionHeading>
            <TimelineList entries={cvFormation} />
          </section>

          <section>
            <SectionHeading>Expériences artistiques</SectionHeading>
            <div className="space-y-10">
              {cvExperiences.map((group) => (
                <div key={group.label}>
                  <h3 className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
                    {group.label}
                  </h3>
                  <TimelineList entries={group.entries} />
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionHeading>Autres compétences</SectionHeading>
            <ul className="space-y-4">
              {cvOtherSkills.map((skill) => (
                <li
                  key={skill.label}
                  className="grid gap-1 sm:grid-cols-[7.5rem_1fr] sm:gap-6"
                >
                  <p className="text-sm font-medium tracking-wide text-primary">
                    {skill.label}
                  </p>
                  <p className="text-sm md:text-[15px] text-foreground/90">
                    {skill.value}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <p className="mt-16 text-center">
          <Link
            to="/"
            className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground/60 hover:text-primary transition-colors"
          >
            Retour à l’accueil
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Cv;
