import { profile } from "@/lib/profile-data";

/** Données affichées sur la page Mentions légales. */
export const legal = {
  siteUrl: "https://benjaminbodin.fr",
  publisher: {
    name: profile.name,
    email: profile.email,
    addressLines: ["47 rue Bargue", "75015 Paris", "France"],
    status:
      "Éditeur : personne physique. Site vitrine (présentation et contact). Aucune vente de biens ou services n’est réalisée via ce site.",
  },
  host: {
    name: "Vercel Inc.",
    address: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
    websiteLabel: "vercel.com",
    websiteUrl: "https://vercel.com",
  },
};
