import { Link } from "react-router-dom";
import { PageSeo } from "@/components/seo/PageSeo";
import { SEO_COPY } from "@/lib/seo-config";

const NotFound = () => {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background px-6 text-center">
      <PageSeo
        title={SEO_COPY.notFound.title}
        description={SEO_COPY.notFound.description}
        noindex
      />
      <p className="mb-3 text-[10px] tracking-[0.35em] uppercase text-primary">404</p>
      <h1
        className="mb-4 text-4xl font-light tracking-wide md:text-5xl"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        Page introuvable
      </h1>
      <p className="mb-8 max-w-md text-sm font-light text-muted-foreground">
        Cette adresse ne correspond à aucune page.
      </p>
      <Link
        to="/"
        className="text-[11px] tracking-[0.2em] uppercase text-primary underline underline-offset-4"
      >
        Retour à l’accueil
      </Link>
    </div>
  );
};

export default NotFound;
