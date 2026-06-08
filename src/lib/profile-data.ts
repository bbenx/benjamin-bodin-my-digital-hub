export const profile = {
  name: "Benjamin Bodin",
  firstName: "BENJAMIN",
  lastName: "BODIN",
  subtitle: "Comédien · Mannequin",
  tagline: "Comédien · Mannequin",
  /** Texte de la section Bio (à personnaliser). */
  bio:
    "Benjamin, 35 ans, sportif dans l'âme, basé à Paris.\n\nBordelais d'origine, je suis monté l'été dernier, en moto, sur un coup de tête, pour réaliser mes rêves : devenir comédien et mannequin ! Formé aux Cours Florent, ce sont maintenant mes métiers.\n\nJe suis aujourd'hui représenté par les agences \"Céline\", \"John Doe\", \"Cute Models\" et la JJ Agency.\n\nFrançais d'origine, je suis également résident permanent canadien et ouvert aux opportunités outre-Atlantique.",
  email: "contact@benjaminbodin.fr",
  instagram: {
    handle: "@_benjaminbodin",
    url: "https://instagram.com/_benjaminbodin",
  },
  website: "www.benjaminbodin.fr",
  /**
   * Vidéo locale dans public/videos/ — préférer du H.264 dans un conteneur .mp4 pour la compatibilité navigateurs
   * (les .mov iPhone sont souvent en HEVC : lecture impossible sur Chrome / Firefox). Prioritaire sur showreelUrl.
   * Laisser "" pour le placeholder « à venir ».
   */
  demoVideoSrc: "/videos/bande-demo.mp4",
  /**
   * Vignette avant lecture (attribut poster du lecteur). Chemin sous public/ ou URL https.
   * Chaîne vide = fond noir jusqu’au play (pas de vignette fichier ; sinon la 1re image vidéo réapparaît).
   */
  demoVideoPoster: "/assets/book/MAJ POLA/Portrait.jpg",
  /** URL d’intégration YouTube / Vimeo (iframe). Utilisée si demoVideoSrc est vide. */
  showreelUrl: "",
  /** Court texte sous le titre « Bande démo », au-dessus de la vidéo (vide = masqué). */
  demoSectionIntro: "",
  /** Vidéo de présentation affichée sous la bio via un bouton dépliant. */
  presentationVideoSrc: "/videos/video-presentation-web.mp4",
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
  /** Ville principale (casting, fiche artiste). */
  city: "Paris",
  /** Villes secondaires (pieds à terre). */
  secondaryCities: [
    "Annecy",
    "Bordeaux",
    "Lille",
    "Lyon",
    "Montpellier",
    "Nantes",
    "Nice",
    "Porto-Vecchio",
    "Royan",
    "Strasbourg",
  ],
  skills: ["Mannequinat", "Jeu d’acteur", "Sport de haut niveau"],
  agent: {
    name: "",
    agency: "",
    email: "",
    phone: "",
  },
};
