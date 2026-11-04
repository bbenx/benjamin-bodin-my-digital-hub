/**
 * Google Analytics 4, chargé seulement après consentement.
 * VITE_GA_MEASUREMENT_ID doit être défini au build (local .env + Vercel).
 *
 * Événements personnalisés : voir Temps réel / Engagement → Événements dans GA4.
 */

const CONSENT_STORAGE_KEY = "bb-analytics-consent";

/** Choix enregistré (acceptation ou refus). */
export const ANALYTICS_CONSENT_EVENT = "bb-analytics-consent";

/** Demande d’ouvrir à nouveau la bannière (pied de page, mentions légales). */
export const OPEN_ANALYTICS_CONSENT_EVENT = "bb-open-analytics-consent";

export type AnalyticsConsent = "granted" | "denied";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const getMeasurementId = () =>
  import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() || "";

let analyticsScriptRequested = false;

export function isGoogleAnalyticsEnabled(): boolean {
  return Boolean(getMeasurementId());
}

export function getAnalyticsConsent(): AnalyticsConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const value = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (value === "granted" || value === "denied") return value;
  } catch {
    return null;
  }
  return null;
}

function gaDisableKey(id: string) {
  return `ga-disable-${id}`;
}

function setGoogleAnalyticsDisabled(disabled: boolean) {
  const id = getMeasurementId();
  if (!id || typeof window === "undefined") return;
  (window as unknown as Record<string, boolean>)[gaDisableKey(id)] = disabled;
}

function clearGoogleAnalyticsCookies() {
  if (typeof document === "undefined") return;
  const hostname = window.location.hostname;
  const domains = new Set<string>(["", hostname, `.${hostname}`]);
  const parts = hostname.split(".");
  if (parts.length >= 2) {
    domains.add(`.${parts.slice(-2).join(".")}`);
  }

  const names = document.cookie
    .split(";")
    .map((part) => part.split("=")[0]?.trim() ?? "")
    .filter(
      (name) => name === "_ga" || name === "_gid" || name.startsWith("_ga_"),
    );

  for (const name of names) {
    for (const domain of domains) {
      const domainAttr = domain ? `; domain=${domain}` : "";
      document.cookie = `${name}=; Max-Age=0; path=/${domainAttr}`;
    }
  }
}

export function setAnalyticsConsent(value: AnalyticsConsent): void {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    // Stockage indisponible : le choix s’applique au moins à cette page.
  }

  if (value === "denied") {
    setGoogleAnalyticsDisabled(true);
    clearGoogleAnalyticsCookies();
  } else {
    setGoogleAnalyticsDisabled(false);
  }

  window.dispatchEvent(
    new CustomEvent(ANALYTICS_CONSENT_EVENT, { detail: value }),
  );
}

export function openAnalyticsConsentPreferences(): void {
  window.dispatchEvent(new Event(OPEN_ANALYTICS_CONSENT_EVENT));
}

/** Sans accord enregistré, bloque la mesure et retire d’éventuels cookies GA déjà posés. */
export function enforceAnalyticsConsent(): void {
  if (getAnalyticsConsent() === "granted") return;
  setGoogleAnalyticsDisabled(true);
  clearGoogleAnalyticsCookies();
}

function canTrack(): boolean {
  return (
    isGoogleAnalyticsEnabled() &&
    getAnalyticsConsent() === "granted" &&
    typeof window !== "undefined" &&
    typeof window.gtag === "function"
  );
}

/** Injecte gtag.js une seule fois, puis envoie la page courante. */
export function loadGoogleAnalytics(pagePath: string): void {
  const id = getMeasurementId();
  if (!id || typeof window === "undefined") return;
  if (getAnalyticsConsent() !== "granted") return;

  setGoogleAnalyticsDisabled(false);

  if (!analyticsScriptRequested) {
    analyticsScriptRequested = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // La bibliothèque gtag lit l’objet `arguments`, pas un tableau.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments as unknown);
    };
    window.gtag("js", new Date());
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
    document.head.appendChild(script);
  }

  trackPageView(pagePath);
}

type EngagementParams = Record<
  string,
  string | number | boolean | undefined | null
>;

/** Envoie un événement GA4 (nom en snake_case, ≤ 40 car. recommandé). */
export function trackEngagement(
  eventName: string,
  params?: EngagementParams,
): void {
  if (!canTrack() || !window.gtag) return;

  const payload = Object.fromEntries(
    Object.entries(params ?? {}).filter(
      ([, v]) => v !== undefined && v !== null && v !== "",
    ),
  ) as Record<string, string | number | boolean>;

  window.gtag("event", eventName, payload);
}

export function trackPageView(pagePath: string): void {
  const id = getMeasurementId();
  if (!id || !canTrack() || !window.gtag) return;

  window.gtag("config", id, {
    page_path: pagePath,
    page_location: window.location.href,
    page_title: document.title,
    send_page_view: true,
  });
}

export function trackInstagramLinkClick(
  section: "header" | "contact",
  linkUrl: string,
): void {
  trackEngagement("instagram_click", { section, link_url: linkUrl });
}

export function trackFilmmakersLinkClick(
  linkUrl: string,
  section: "header" | "contact" = "contact",
): void {
  trackEngagement("filmmakers_click", {
    section,
    link_url: linkUrl,
  });
}

export function trackViewFullBookClick(): void {
  trackEngagement("view_full_book_click", {
    source: "gallery_section",
    destination_path: "/book",
  });
}

export function trackNavMenuClick(payload: {
  label: string;
  target: string;
  link_type: "route" | "anchor";
}): void {
  trackEngagement("nav_menu_click", {
    menu_label: payload.label,
    target: payload.target,
    link_type: payload.link_type,
  });
}

export function trackLogoClick(action: "scroll_top" | "clear_hash" | "navigate_home"): void {
  trackEngagement("logo_click", { action });
}

export function trackEmailClick(
  location: "header" | "contact_primary" | "contact_agent",
): void {
  trackEngagement("email_click", { location });
}

export function trackPhoneClick(location: "contact_agent"): void {
  trackEngagement("phone_click", { location });
}

export function trackLegalFooterClick(): void {
  trackEngagement("legal_footer_click", { destination_path: "/mentions-legales" });
}

export function trackCvPdfDownload(): void {
  trackEngagement("cv_pdf_download", { page_path: "/cv" });
}

export function trackHeroScrollDownClick(): void {
  trackEngagement("hero_scroll_down_click", { target_section: "bio" });
}

export function trackBookLightboxOpen(payload: {
  item_id: string;
  category_label?: string;
}): void {
  trackEngagement("book_lightbox_open", {
    item_id: payload.item_id,
    ...(payload.category_label && { category_label: payload.category_label }),
  });
}

export function trackBookLightboxNav(direction: "prev" | "next"): void {
  trackEngagement("book_lightbox_nav", { direction });
}

export function trackBookFilterChange(payload: {
  filter_type: "category" | "palette" | "sort";
  value: string;
}): void {
  trackEngagement("book_filter_change", {
    filter_type: payload.filter_type,
    value: payload.value,
  });
}

export function trackFilmPlay(payload: {
  film_id: string;
  film_title: string;
}): void {
  trackEngagement("film_play", {
    film_id: payload.film_id,
    film_title: payload.film_title,
    page_path: "/videos",
  });
}
