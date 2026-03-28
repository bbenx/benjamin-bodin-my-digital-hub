/**
 * Suivi des navigations SPA (premier chargement = balise dans index.html).
 * VITE_GA_MEASUREMENT_ID doit être défini au build (local .env + Vercel).
 *
 * Événements personnalisés : voir Temps réel / Engagement → Événements dans GA4.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const getMeasurementId = () =>
  import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() || "";

type EngagementParams = Record<
  string,
  string | number | boolean | undefined | null
>;

/** Envoie un événement GA4 (nom en snake_case, ≤ 40 car. recommandé). */
export function trackEngagement(
  eventName: string,
  params?: EngagementParams,
): void {
  const id = getMeasurementId();
  if (!id || typeof window === "undefined" || !window.gtag) return;

  const payload = Object.fromEntries(
    Object.entries(params ?? {}).filter(
      ([, v]) => v !== undefined && v !== null && v !== "",
    ),
  ) as Record<string, string | number | boolean>;

  window.gtag("event", eventName, payload);
}

export function isGoogleAnalyticsEnabled(): boolean {
  return Boolean(getMeasurementId());
}

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

export function trackInstagramLinkClick(
  section: "header" | "contact",
  linkUrl: string,
): void {
  trackEngagement("instagram_click", { section, link_url: linkUrl });
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
