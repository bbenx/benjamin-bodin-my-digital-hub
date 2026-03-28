import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { legal } from "@/lib/legal-data";

const Legal = () => {
  return (
    <div className="pt-24 pb-20 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-12">
          <h1
            className="text-4xl md:text-5xl font-light tracking-wide mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Mentions légales
          </h1>
          <Separator className="w-12 bg-primary/40" />
        </div>

        <div
          className="space-y-12 text-sm md:text-[15px] font-light leading-relaxed text-foreground/80"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          <section>
            <h2 className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground/70 mb-4">
              Éditeur du site
            </h2>
            <p className="mb-2">{legal.publisher.name}</p>
            {legal.publisher.addressLines.map((line) => (
              <p key={line} className="text-muted-foreground">
                {line}
              </p>
            ))}
            <p className="mt-3">
              <a
                href={`mailto:${legal.publisher.email}`}
                className="text-primary/80 hover:text-primary underline-offset-4 hover:underline transition-colors"
              >
                {legal.publisher.email}
              </a>
            </p>
            <p className="mt-4 text-muted-foreground">{legal.publisher.status}</p>
          </section>

          <section>
            <h2 className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground/70 mb-4">
              Hébergement
            </h2>
            <p className="mb-1">{legal.host.name}</p>
            <p className="text-muted-foreground mb-3">{legal.host.address}</p>
            <p>
              <a
                href={legal.host.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary/80 hover:text-primary underline-offset-4 hover:underline transition-colors"
              >
                {legal.host.websiteLabel}
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground/70 mb-4">
              Propriété intellectuelle
            </h2>
            <p className="text-muted-foreground">
              L’ensemble du contenu de ce site (textes, visuels, book photographique, structure)
              est protégé. Toute reproduction ou utilisation non autorisée est interdite sauf accord
              préalable de l’éditeur ou des titulaires des droits concernés.
            </p>
          </section>

          <section>
            <h2 className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground/70 mb-4">
              Données personnelles
            </h2>
            <p className="text-muted-foreground">
              Ce site est une vitrine : il ne comporte pas de formulaire collectant des données.
              Le contact s’effectue via votre messagerie (lien e-mail). Pour toute question relative
              aux données personnelles, vous pouvez écrire à{" "}
              <a
                href={`mailto:${legal.publisher.email}`}
                className="text-primary/80 hover:text-primary underline-offset-4 hover:underline transition-colors"
              >
                {legal.publisher.email}
              </a>
              .
            </p>
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

export default Legal;
