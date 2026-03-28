/**
 * Google Analytics 4 (gtag). Activé seulement si VITE_GA_MEASUREMENT_ID est défini.
 * Côté France / RGPD : prévoir une bannière de consentement avant d’activer le suivi
 * si tu utilises des cookies non essentiels (voir documentation Google « Consent Mode »).
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const getMeasurementId = () =>
  import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() || "";

let gtagInitialized = false;

export function isGoogleAnalyticsEnabled(): boolean {
  return Boolean(getMeasurementId());
}

/** Charge gtag.js une seule fois (file d’attente dataLayer avant chargement du script). */
export function initGoogleAnalytics(): void {
  const id = getMeasurementId();
  if (gtagInitialized || !id || typeof window === "undefined") return;
  gtagInitialized = true;

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };

  window.gtag("js", new Date());
  window.gtag("config", id, { send_page_view: false });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);
}

/** À appeler à chaque changement de route (SPA). */
export function trackPageView(pagePath: string): void {
  const id = getMeasurementId();
  if (!id || typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", "page_view", {
    page_path: pagePath,
    page_location: window.location.href,
    page_title: document.title,
  });
}
