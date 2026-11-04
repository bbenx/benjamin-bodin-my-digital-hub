/** Pages publiques pré-rendues au build. L’accueil est le `index.html` de Vite. */
export const PRERENDER_ROUTES = [
  { path: "/book", heading: "Book" },
  { path: "/videos", heading: "Vidéos" },
  { path: "/cv", heading: "Fiche artiste" },
  { path: "/mentions-legales", heading: "Mentions légales" },
] as const;

export type PrerenderPath = (typeof PRERENDER_ROUTES)[number]["path"];
