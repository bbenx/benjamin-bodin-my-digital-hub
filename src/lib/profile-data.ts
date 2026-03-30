export const profile = {
  name: "Benjamin Bodin",
  firstName: "BENJAMIN",
  lastName: "BODIN",
  subtitle: "Comédien · Mannequin",
  tagline: "Comédien · Mannequin",
  /** Texte de la section Bio (à personnaliser). */
  bio:
    "Je m’appelle Benjamin, j’ai 35 ans. Comédien et mannequin, je suis aussi très sportif. Bordelais d’origine, je suis monté à Paris l’été dernier — en moto, sur un coup de tête — pour réaliser mes rêves. J’y vis aujourd’hui, en première année au Cours Florent, et je suis représenté par l’agence Céline. Je travaille en France et à l’international.",
  email: "contact@benjaminbodin.fr",
  instagram: {
    handle: "@_benjaminbodin",
    url: "https://instagram.com/_benjaminbodin",
  },
  website: "www.benjaminbodin.fr",
  /**
   * Vidéo locale dans public/videos/ — nom de fichier simple (ASCII) pour éviter les soucis d’URL (ex. bande-demo.mp4).
   * Prioritaire sur showreelUrl. Laisser "" pour le placeholder « à venir ».
   */
  demoVideoSrc: "/videos/bande-demo.mp4",
  /** URL d’intégration YouTube / Vimeo (iframe). Utilisée si demoVideoSrc est vide. */
  showreelUrl: "",
  /** Texte d’intro au-dessus du lecteur (section Bande démo). */
  demoSectionNote:
    "N’ayant pas encore reçu les images de mes tournages, voici une brève vidéo de présentation.",
  measurements: {
    "Taille": "176 cm",
    "Poitrine": "86 cm",
    "Tour de taille": "71 cm",
    "Hanches": "85 cm",
    "Entrejambe": "67 cm",
    "Cou": "34 cm",
    "Tour de tête": "56 cm",
    "Veste": "44",
    "Pantalon": "36",
    "Chaussures": "44",
  },
  hair: "Brun",
  eyes: "Marron / Vert",
  /** Poids affiché à côté de la taille (chiffre seul, l’unité « kg » est dans l’UI). */
  weight: "64",
  /** Âge réel. */
  age: "35",
  /** Fourchette d’âge apparent (casting). */
  apparentAge: "25–35",
  languages: ["Français", "Anglais"],
  skills: ["Mannequinat", "Jeu d’acteur", "Sport de haut niveau"],
  agent: {
    name: "",
    agency: "",
    email: "",
    phone: "",
  },
};
