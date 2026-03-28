import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initGoogleAnalytics, trackPageView } from "@/lib/analytics";

/** Initialise GA4 et envoie un page_view à chaque navigation (React Router). */
const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    initGoogleAnalytics();
  }, []);

  useEffect(() => {
    const path = `${location.pathname}${location.search}${location.hash}`;
    trackPageView(path);
  }, [location.pathname, location.search, location.hash]);

  return null;
};

export { GoogleAnalytics };
