import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="pt-5 pb-8 px-6">
      <Separator className="mb-5 bg-border/50" />
      <div className="max-w-6xl mx-auto px-2">
        <p className="text-center text-[10px] md:text-[11px] tracking-[0.2em] md:tracking-widest uppercase text-muted-foreground/50 leading-relaxed">
          <span>&copy; 2026 Benjamin Bodin &mdash; Comédien &amp; Mannequin</span>
          <span className="text-muted-foreground/25 mx-2 sm:mx-3" aria-hidden>
            ·
          </span>
          <Link
            to="/book"
            className="text-muted-foreground/55 hover:text-primary/85 transition-colors underline-offset-4 hover:underline"
          >
            Book photo
          </Link>
          <span className="text-muted-foreground/25 mx-2 sm:mx-3" aria-hidden>
            ·
          </span>
          <Link
            to="/mentions-legales"
            className="text-muted-foreground/55 hover:text-primary/85 transition-colors underline-offset-4 hover:underline"
          >
            Mentions légales
          </Link>
        </p>
      </div>
    </footer>
  );
};

export { Footer };
