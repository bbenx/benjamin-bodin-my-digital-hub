import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  OPEN_ANALYTICS_CONSENT_EVENT,
  getAnalyticsConsent,
  isGoogleAnalyticsEnabled,
  setAnalyticsConsent,
} from "@/lib/analytics";

const CookieConsent = () => {
  const [open, setOpen] = useState(
    () => isGoogleAnalyticsEnabled() && getAnalyticsConsent() === null,
  );

  useEffect(() => {
    if (!isGoogleAnalyticsEnabled()) return;

    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_ANALYTICS_CONSENT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_ANALYTICS_CONSENT_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && getAnalyticsConsent() !== null) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open || !isGoogleAnalyticsEnabled()) return null;

  const choose = (value: "granted" | "denied") => {
    setAnalyticsConsent(value);
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-border/60 bg-background/95 px-6 pt-4 shadow-[0_-12px_40px_rgba(0,0,0,0.35)] backdrop-blur-md pb-[max(1rem,env(safe-area-inset-bottom))]"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p
            id="cookie-consent-title"
            className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground/80 mb-2"
          >
            Mesure d’audience
          </p>
          <p className="text-sm font-light leading-relaxed text-foreground/80">
            Google Analytics n’est chargé que si vous l’acceptez. Aucun cookie de
            mesure n’est déposé avant ce choix.{" "}
            <Link
              to="/mentions-legales"
              className="text-primary/80 underline-offset-4 hover:text-primary hover:underline"
            >
              En savoir plus
            </Link>
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            className="h-9 min-w-[7.5rem] border border-foreground/25 px-4 text-[11px] tracking-[0.2em] uppercase text-foreground/80 transition-colors hover:border-foreground/50 hover:text-foreground"
            onClick={() => choose("denied")}
          >
            Refuser
          </button>
          <button
            type="button"
            className="h-9 min-w-[7.5rem] bg-primary px-4 text-[11px] tracking-[0.2em] uppercase text-primary-foreground transition-colors hover:bg-primary/90"
            onClick={() => choose("granted")}
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
};

export { CookieConsent };
