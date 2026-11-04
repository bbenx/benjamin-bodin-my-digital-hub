import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  ANALYTICS_CONSENT_EVENT,
  enforceAnalyticsConsent,
  getAnalyticsConsent,
  loadGoogleAnalytics,
} from "@/lib/analytics";

function currentPath() {
  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}

/** Charge gtag uniquement si la mesure d’audience a été acceptée. */
const GoogleAnalytics = () => {
  const location = useLocation();
  const isFirstLocationEffect = useRef(true);

  useEffect(() => {
    const sync = () => {
      if (getAnalyticsConsent() === "granted") {
        loadGoogleAnalytics(currentPath());
        return;
      }
      enforceAnalyticsConsent();
    };

    sync();
    window.addEventListener(ANALYTICS_CONSENT_EVENT, sync);
    return () => window.removeEventListener(ANALYTICS_CONSENT_EVENT, sync);
  }, []);

  useEffect(() => {
    if (isFirstLocationEffect.current) {
      isFirstLocationEffect.current = false;
      return;
    }
    if (getAnalyticsConsent() !== "granted") return;
    loadGoogleAnalytics(
      `${location.pathname}${location.search}${location.hash}`,
    );
  }, [location.pathname, location.search, location.hash]);

  return null;
};

export { GoogleAnalytics };
