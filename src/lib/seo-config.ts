/** URL canonique du site (www + https). */
export const SITE_URL = "https://www.benjaminbodin.fr";

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export const SITE_NAME = "Benjamin Bodin";

/** Titres & descriptions optimisés longueur (~50–60 / ~150–160 car. utiles pour les SERP). */
export const SEO_COPY = {
  home: {
    title: "Benjamin Bodin — Comédien & mannequin à Paris | Book & contact",
    description:
      "Benjamin Bodin, comédien et mannequin à Paris (Cours Florent). Book photo portrait, éditorial, mode et cinéma — mensurations, showreel et contact pro.",
  },
  book: {
    title: "Book photo — Benjamin Bodin | Portrait, éditorial & mode",
    description:
      "Galerie book de Benjamin Bodin, comédien et mannequin à Paris : portraits, éditorial, mode, lingerie et cinéma — photos couleur & noir et blanc.",
  },
  legal: {
    title: "Mentions légales | Benjamin Bodin",
    description:
      "Mentions légales du site benjaminbodin.fr : éditeur, hébergement Vercel, données personnelles et cookies.",
  },
  notFound: {
    title: "Page introuvable | Benjamin Bodin",
    description: "La page demandée n’existe pas. Retour à l’accueil de Benjamin Bodin — comédien et mannequin.",
  },
} as const;
