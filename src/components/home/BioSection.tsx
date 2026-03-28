import { Separator } from "@/components/ui/separator";
import { profile } from "@/lib/profile-data";

const BioSection = () => {
  return (
    <section id="bio" className="py-24 md:py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-4xl md:text-5xl font-light tracking-wide text-center mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Bio
        </h2>
        <Separator className="w-12 mx-auto mb-12 md:mb-16 bg-primary/40" />
        <p
          className="text-base md:text-lg font-light leading-relaxed text-muted-foreground text-center"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          {profile.bio}
        </p>
      </div>
    </section>
  );
};

export { BioSection };
