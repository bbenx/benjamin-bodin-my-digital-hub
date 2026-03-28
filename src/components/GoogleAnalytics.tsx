import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "@/lib/analytics";

/** Premier page_view : balise gtag dans index.html. Ici : uniquement les changements de route. */
const GoogleAnalytics = () => {
  const location = useLocation();
  const isFirstLocationEffect = useRef(true);

  useEffect(() => {
    const path = `${location.pathname}${location.search}${location.hash}`;
    if (isFirstLocationEffect.current) {
      isFirstLocationEffect.current = false;
      return;
    }
    trackPageView(path);
  }, [location.pathname, location.search, location.hash]);

  return null;
};

export { GoogleAnalytics };
