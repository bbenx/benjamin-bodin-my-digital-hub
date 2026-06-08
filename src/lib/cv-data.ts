/** Contenu de la fiche artiste / CV (source : CV Artistique Benjamin BODIN). */

import { profile } from "@/lib/profile-data";

const secondaryCitiesMid = Math.ceil(profile.secondaryCities.length / 2);

export const cvIdentity = {
  name: "Benjamin BODIN",
  phone: "+33 6 48 35 50 42",
  email: "contact@benjaminbodin.fr",
  birthDate: "09/08/1990",
  age: profile.age,
  city: profile.city,
  piedsATerreLine1: profile.secondaryCities
    .slice(0, secondaryCitiesMid)
    .join(" · "),
  piedsATerreLine2: profile.secondaryCities.slice(secondaryCitiesMid).join(" · "),
  languages: profile.languages.join(" · "),
  height: "176 cm",
  permits: "A, B, Bateau (côtier & fluvial)",
  hairEyes: "Brun / Noisette-vert",
} as const;

export type CvTimelineEntry = {
  period: string;
  /** Ligne simple (pub, mannequinat, formation…) */
  title?: string;
  details?: string[];
  /** Métrage structuré */
  role?: string;
  format?: string;
  film?: string;
  director?: string;
  note?: string;
};

export const cvFormation: CvTimelineEntry[] = [
  {
    period: "Avril 2026",
    title: "Formation casting et jeu d’acteur avec Hervé Jakubowicz",
  },
  {
    period: "2025 – 2026",
    title: "Cours Florent — 1ère année avec Cendrine Orcier (théâtre)",
    details: [
      "Britannicus, acte II, scène II — rôle Narcisse",
      "Monologue Pulp Fiction — Capitaine Koons face au jeune Butch",
      "Roméo et Juliette, acte I, scène I — Roméo et Benvolio",
    ],
  },
];

export type CvExperienceGroup = {
  label: string;
  entries: CvTimelineEntry[];
};

export const cvExperiences: CvExperienceGroup[] = [
  {
    label: "Pub",
    entries: [
      {
        period: "Mai 2026",
        title: "Nature et Découverte, BioBurger, L’Habit Français",
      },
      {
        period: "Mars 2026",
        title: "Garnier",
      },
    ],
  },
  {
    label: "Mannequinat",
    entries: [
      {
        period: "Mars 2026",
        title: "Défilé Paris Fashion Week — UFD",
      },
      {
        period: "Juin 2026",
        title: "Défilé designers — émission de variété Wow The World",
        details: [
          "Épisode spécial mode (saison 2) · en présence de Gong Jun, Liu Yuning, Sun Honglei, Chen He…",
          "Saison 1 : 300 M+ de vues cumulées (Tencent Video · WeTV · Douyin)",
        ],
      },
    ],
  },
  {
    label: "Spectacle vivant",
    entries: [
      {
        period: "Avril 2026",
        title: "Stinville Festival — sketch absurde (écrit & joué)",
        details: [
          "Catégorie fictive « meilleur acteur pour un film d’animation », trophée reçu en direct (identique aux lauréats)",
          "En présence de Mathieu Turi et Jodie Ruth-Forest et ~150 spectateurs",
        ],
      },
    ],
  },
  {
    label: "Métrages",
    entries: [
      {
        period: "2026",
        role: "1er rôle",
        format: "Court métrage",
        film: "Le nez",
        note: "Adaptation de la nouvelle de Nikolaï Gogol",
      },
      {
        period: "2026",
        role: "1er rôle",
        format: "Court métrage",
        film: "Papa ou rien",
        director: "Tess Bonhomme",
        note: "Goldenrod Revision",
      },
      {
        period: "2026",
        role: "2e rôle",
        format: "Court métrage",
        film: "Casino",
        director:
          "Alexandra Lesca, Aimie Lefevre, Clémence Le Guyon & Jérémy Gaudin",
      },
      {
        period: "2025",
        role: "Figurant",
        format: "Long métrage",
        film: "Quasimodo",
        director: "Jean-François Richet",
      },
    ],
  },
];

export const cvOtherSkills = [
  {
    label: "Sports",
    value:
      "Parachutisme, snowboard, crossfit, football (gardien de but), moto, bateau",
  },
  {
    label: "Musique",
    value: "DJ",
  },
] as const;
