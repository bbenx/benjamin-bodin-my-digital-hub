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

/**
 * Événement dédié (plus lisible que le « click » sortant automatique de GA4).
 * À voir sous Temps réel → instagram_click, puis Rapports → Engagement → Événements.
 */
export function trackInstagramLinkClick(
  section: "header" | "contact",
  linkUrl: string,
): void {
  const id = getMeasurementId();
  if (!id || typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", "instagram_click", {
    section,
    link_url: linkUrl,
  });
}
