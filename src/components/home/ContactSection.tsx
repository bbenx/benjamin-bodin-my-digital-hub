import { Mail, Instagram, Building2, Phone } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { profile } from "@/lib/profile-data";

const ContactSection = () => {
  const hasAgent = profile.agent.name || profile.agent.agency;

  return (
    <section id="contact" className="scroll-mt-24 pt-24 pb-5 md:pb-6 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <h2
          className="text-4xl md:text-5xl font-light tracking-wide text-center mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Contact
        </h2>
        <Separator className="w-12 mx-auto mb-16 bg-primary/40" />

        <div className={`grid ${hasAgent ? "md:grid-cols-2" : "md:grid-cols-1"} gap-12 max-w-2xl mx-auto`}>
          <div className="flex flex-row flex-wrap items-center justify-center gap-x-10 gap-y-4">
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex items-center gap-3 transition-colors duration-300"
            >
              <Mail className="w-5 h-5 shrink-0 text-primary/60 group-hover:text-primary transition-colors" />
              <span className="text-foreground group-hover:text-primary transition-colors">
                {profile.email}
              </span>
            </a>

            <a
              href={profile.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 transition-colors duration-300"
            >
              <Instagram className="w-5 h-5 shrink-0 text-primary/60 group-hover:text-primary transition-colors" />
              <span className="text-foreground group-hover:text-primary transition-colors">
                {profile.instagram.handle}
              </span>
            </a>
          </div>

          {/* Agent info */}
          {hasAgent && (
            <div className="space-y-6">
              <h3 className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">
                Agent
              </h3>

              {profile.agent.agency && (
                <div className="flex items-center gap-4">
                  <Building2 className="w-5 h-5 text-primary/60" />
                  <span className="text-foreground">{profile.agent.agency}</span>
                </div>
              )}

              {profile.agent.name && (
                <div className="flex items-center gap-4">
                  <span className="w-5" />
                  <span className="text-muted-foreground">{profile.agent.name}</span>
                </div>
              )}

              {profile.agent.email && (
                <a
                  href={`mailto:${profile.agent.email}`}
                  className="group flex items-center gap-4 transition-colors duration-300"
                >
                  <Mail className="w-5 h-5 text-primary/60 group-hover:text-primary transition-colors" />
                  <span className="text-foreground group-hover:text-primary transition-colors">
                    {profile.agent.email}
                  </span>
                </a>
              )}

              {profile.agent.phone && (
                <a
                  href={`tel:${profile.agent.phone}`}
                  className="group flex items-center gap-4 transition-colors duration-300"
                >
                  <Phone className="w-5 h-5 text-primary/60 group-hover:text-primary transition-colors" />
                  <span className="text-foreground group-hover:text-primary transition-colors">
                    {profile.agent.phone}
                  </span>
                </a>
              )}
            </div>
          )}
        </div>

        {/* Tagline — desktop: une ligne lisible ; mobile: césure équilibrée */}
        <p
          className="mx-auto mt-8 w-full max-w-4xl text-pretty text-center text-sm font-light leading-relaxed text-muted-foreground md:mt-11 md:text-base md:leading-normal md:tracking-wide"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          Pour toute demande d’informations ou de booking, n’hésitez pas à me contacter.
        </p>
      </div>
    </section>
  );
};

export { ContactSection };
