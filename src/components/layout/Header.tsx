import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Instagram, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { profile } from "@/lib/profile-data";

const menuItems = [
  { label: "ACCUEIL", href: "/", type: "route" as const },
  { label: "BOOK", href: "/book", type: "route" as const },
  { label: "MENSURATIONS", href: "#mensurations", type: "anchor" as const },
  { label: "BANDE DÉMO", href: "#bande-demo", type: "anchor" as const },
  { label: "CONTACT", href: "#contact", type: "anchor" as const },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

    if (item.type === "anchor") {
      if (location.pathname !== "/") {
        navigate("/" + item.href);
      } else {
        const el = document.querySelector(item.href);
        el?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(item.href);
    }
  };

  const isActive = (item: (typeof menuItems)[number]) => {
    if (item.type === "route") {
      return location.pathname === item.href;
    }
    return false;
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-6 py-5 transition-all duration-300",
        scrolled &&
          "bg-background border-b border-border/30 md:bg-background/80 md:backdrop-blur-md"
      )}
    >
      <nav className="flex items-center justify-between max-w-screen-2xl mx-auto">
        {/* Menu Button */}
        <div className="relative">
          <button
            ref={buttonRef}
            type="button"
            className="p-2 transition-colors duration-300 z-50 text-muted-foreground hover:text-foreground"
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-7 h-7 transition-colors duration-300" strokeWidth={2} />
            ) : (
              <Menu className="w-7 h-7 transition-colors duration-300" strokeWidth={2} />
            )}
          </button>

          {isMenuOpen && (
            <div
              ref={menuRef}
              className="absolute top-full left-0 w-[220px] md:w-[260px] shadow-2xl mt-2 ml-2 p-4 rounded-lg z-[100] bg-background border border-border/30 md:bg-background/95 md:backdrop-blur-md"
            >
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className={cn(
                    "block w-full text-left text-lg md:text-xl font-bold tracking-tight py-1.5 px-2 cursor-pointer transition-colors duration-300",
                    isActive(item)
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  )}
                  onClick={() => handleNavClick(item)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Signature */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="text-4xl text-foreground hover:text-primary transition-colors duration-300"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
        >
          B
        </button>

        <div className="flex flex-nowrap items-center gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="p-2 text-muted-foreground hover:text-primary transition-colors duration-300"
            aria-label="Envoyer un e-mail"
          >
            <Mail className="w-6 h-6" />
          </a>
          <a
            href={profile.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-muted-foreground hover:text-primary transition-colors duration-300"
            aria-label="Instagram"
          >
            <Instagram className="w-6 h-6" />
          </a>
        </div>
      </nav>
    </header>
  );
};

export { Header };
