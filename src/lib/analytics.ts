/**
 * Suivi des navigations SPA (premier chargement = balise dans index.html).
 * VITE_GA_MEASUREMENT_ID doit être défini au build (local .env + Vercel).
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const getMeasurementId = () =>
  import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() || "";

export function isGoogleAnalyticsEnabled(): boolean {
  return Boolean(getMeasurementId());
}

/** Appelé après le premier affichage quand la route React change. */
export function trackPageView(pagePath: string): void {
  const id = getMeasurementId();
  if (!id || typeof window === "undefined" || !window.gtag) return;

  window.gtag("config", id, {
    page_path: pagePath,
    page_location: window.location.href,
    page_title: document.title,
    send_page_view: true,
  });
}
