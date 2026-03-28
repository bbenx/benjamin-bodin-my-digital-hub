import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { initGoogleAnalytics, trackPageView } from "@/lib/analytics";

/** Initialise GA4 et envoie un page_view à chaque navigation (React Router). */
const GoogleAnalytics = () => {
  const location = useLocation();
  const isFirstLocationEffect = useRef(true);

  useEffect(() => {
    initGoogleAnalytics();
  }, []);

  useEffect(() => {
    const path = `${location.pathname}${location.search}${location.hash}`;
    /* Le premier page_view part avec le config initial dans initGoogleAnalytics. */
    if (isFirstLocationEffect.current) {
      isFirstLocationEffect.current = false;
      return;
    }
    trackPageView(path);
  }, [location.pathname, location.search, location.hash]);

  return null;
};

export { GoogleAnalytics };
