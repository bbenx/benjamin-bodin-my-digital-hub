/** Contenu de la fiche artiste / CV (source : CV Artistique Benjamin BODIN). */

export const cvIdentity = {
  name: "Benjamin BODIN",
  phone: "+33 6 48 35 50 42",
  email: "Benjaminbodin.model@gmail.com",
  birthDate: "09/08/1990",
  height: "176 cm",
  permits: "A, B, Bateau (côtier & fluvial)",
  hair: "Brun",
  eyes: "Noisette / vert",
} as const;

export type CvTimelineEntry = {
  period: string;
  title: string;
  details?: string[];
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
        title: "Collection été Nature et Découverte, BioBurger, L’Habit Français",
      },
      {
        period: "Mars 2026",
        title: "Garnier",
      },
    ],
  },
  {
    label: "Métrages",
    entries: [
      {
        period: "2026",
        title:
          "1er rôle — court métrage « Le nez » (adaptation de la nouvelle de Nikolaï Gogol)",
      },
      {
        period: "2026",
        title:
          "Acteur réel Instagram (défi Lena Situation) — Marjori Daviaud",
      },
      {
        period: "2026",
        title:
          "1er rôle — court métrage « Papa ou rien » de Tess Bonhomme — Goldenrod Revision",
      },
      {
        period: "2026",
        title:
          "2e rôle — court métrage « Casino » de Alexandra Lesca, Aimie Lefevre, Clémence Le Guyon et Jérémy Gaudin",
      },
      {
        period: "2025",
        title: "Figurant — long métrage « Quasimodo » de Jean-François Richet",
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
