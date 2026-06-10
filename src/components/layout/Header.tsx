import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Clapperboard, Menu, X, Instagram, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  trackEmailClick,
  trackFilmmakersLinkClick,
  trackInstagramLinkClick,
  trackLogoClick,
  trackNavMenuClick,
} from "@/lib/analytics";
import { profile } from "@/lib/profile-data";

/** Même logique que Layout : retards pour le layout (header fixe, images). */
function scrollToHashTarget(id: string) {
  const scrollOnce = () => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  scrollOnce();
  window.setTimeout(scrollOnce, 120);
  window.setTimeout(scrollOnce, 400);
}

const menuItems = [
  { label: "ACCUEIL", href: "/", type: "route" as const },
  { label: "BOOK", href: "/book", type: "route" as const },
  { label: "VIDÉOS", href: "/videos", type: "route" as const },
  { label: "BANDE DÉMO", href: "#bande-demo", type: "anchor" as const },
  { label: "CV", href: "/cv", type: "route" as const },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const showOpaqueHeader = scrolled || !isHomePage;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const handleNavClick = (item: (typeof menuItems)[number]) => {
    setIsMenuOpen(false);

    trackNavMenuClick({
      label: item.label,
      target: item.href,
      link_type: item.type,
    });

    if (item.type === "anchor") {
      const raw = item.href.startsWith("#") ? item.href.slice(1) : item.href;
      const id = decodeURIComponent(raw);

      if (location.pathname !== "/") {
        void navigate({ pathname: "/", hash: id });
        return;
      }

      /* Même # que l’URL actuelle : navigate ne fait rien → scroll manuel. */
      const currentId = location.hash
        ? decodeURIComponent(location.hash.slice(1))
        : "";
      if (currentId === id) {
        scrollToHashTarget(id);
        return;
      }

      void navigate({ pathname: "/", hash: id }, { replace: true });
      return;
    }
    void navigate(item.href);
  };

  const isActive = (item: (typeof menuItems)[number]) => {
    if (item.type === "route") {
      return location.pathname === item.href && !location.hash;
    }
    if (item.type === "anchor") {
      return location.pathname === "/" && location.hash === item.href;
    }
    return false;
  };

  const handleLogoClick = () => {
    if (location.pathname !== "/") {
      trackLogoClick("navigate_home");
      void navigate("/");
      return;
    }
    if (location.hash) {
      trackLogoClick("clear_hash");
      void navigate("/", { replace: true });
    } else {
      trackLogoClick("scroll_top");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow,border-color] duration-300",
        showOpaqueHeader &&
          "border-b border-border/30 bg-background/95 shadow-sm backdrop-blur-md",
      )}
    >
      <div className="px-4 py-3.5 sm:px-6">
        <nav className="relative z-10 mx-auto grid max-w-screen-2xl grid-cols-[1fr_auto_1fr] items-center">
          {/* Menu — colonne gauche */}
          <div className="relative justify-self-start">
            <button
              ref={buttonRef}
              type="button"
              className="p-1.5 text-muted-foreground transition-colors duration-300 hover:text-foreground sm:p-2"
              aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2} />
              ) : (
                <Menu className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2} />
              )}
            </button>

            {isMenuOpen && (
              <div
                ref={menuRef}
                className="absolute left-0 top-full z-[100] mt-2 w-[220px] rounded-lg border border-border/30 bg-background p-4 shadow-2xl md:w-[260px] md:bg-background/95 md:backdrop-blur-md"
              >
                {menuItems.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    className={cn(
                      "block w-full cursor-pointer py-1.5 px-2 text-left text-lg font-bold tracking-tight transition-colors duration-300 md:text-xl",
                      isActive(item)
                        ? "text-primary"
                        : "text-foreground hover:text-primary",
                    )}
                    onClick={() => handleNavClick(item)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* B — colonne centrale, vraiment au milieu de l’écran */}
          <button
            type="button"
            onClick={handleLogoClick}
            className="justify-self-center text-3xl text-foreground transition-colors duration-300 hover:text-primary sm:text-4xl"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
            aria-label="Retour en haut de la page"
          >
            B
          </button>

          {/* Icônes — colonne droite */}
          <div className="flex flex-nowrap items-center justify-self-end gap-0 sm:gap-1 md:gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="p-1.5 text-muted-foreground transition-colors duration-300 hover:text-primary sm:p-2"
              aria-label="Envoyer un e-mail"
              onClick={() => trackEmailClick("header")}
            >
              <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
            </a>
            <a
              href={profile.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-muted-foreground transition-colors duration-300 hover:text-primary sm:p-2"
              aria-label="Instagram"
              onClick={() =>
                trackInstagramLinkClick("header", profile.instagram.url)
              }
            >
              <Instagram className="h-5 w-5 sm:h-6 sm:w-6" />
            </a>
            <a
              href={profile.filmmakers.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-muted-foreground transition-colors duration-300 hover:text-primary sm:p-2"
              aria-label="Profil casting sur Filmmakers"
              onClick={() =>
                trackFilmmakersLinkClick(profile.filmmakers.url, "header")
              }
            >
              <Clapperboard className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.75} />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export { Header };
