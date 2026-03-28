import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="py-8 px-6">
      <Separator className="mb-8 bg-border/50" />
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-2">
        <p className="text-[11px] text-muted-foreground/50 tracking-widest uppercase">
          &copy; 2026 Benjamin Bodin &mdash; Comédien &amp; Mannequin
        </p>
      </div>
    </footer>
  );
};

export { Footer };
