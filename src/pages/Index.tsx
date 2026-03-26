import { Instagram, Mail, ExternalLink } from "lucide-react";

const links = [
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://instagram.com/benjaminbodin",
    display: "@benjaminbodin",
  },
  {
    icon: ExternalLink,
    label: "Book",
    href: "https://benjaminbodin.com/book",
    display: "Mon Book",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:contact@benjaminbodin.com",
    display: "contact@benjaminbodin.com",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 relative overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-10 max-w-md w-full">
        {/* Avatar placeholder */}
        <div className="w-36 h-36 rounded-full border-2 border-border bg-secondary flex items-center justify-center overflow-hidden">
          <span className="text-muted-foreground text-xs font-light tracking-widest uppercase">
            Photo
          </span>
        </div>

        {/* Name & title */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-light tracking-wide text-foreground">
            Benjamin Bodin
          </h1>
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground font-light">
            Comédien · Mannequin
          </p>
        </div>

        {/* Separator */}
        <div className="w-12 h-px bg-primary/40" />

        {/* Links */}
        <div className="w-full flex flex-col gap-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.label !== "Email" ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group flex items-center gap-4 px-6 py-4 rounded-lg border border-border bg-card hover:border-primary/40 transition-all duration-300"
            >
              <link.icon className="w-5 h-5 text-primary/70 group-hover:text-primary transition-colors" />
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {link.label}
                </span>
                <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                  {link.display}
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <p className="text-[11px] text-muted-foreground/50 tracking-widest uppercase mt-6">
          benjaminbodin.com
        </p>
      </div>
    </div>
  );
};

export default Index;
