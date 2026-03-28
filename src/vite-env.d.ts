/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** ID de mesure GA4 (ex. G-XXXXXXXXXX). Optionnel : sans variable, rien n’est chargé. */
  readonly VITE_GA_MEASUREMENT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
