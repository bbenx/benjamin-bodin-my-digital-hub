import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { CircularGallery, type GalleryItem } from "@/components/ui/circular-gallery";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Placeholder gallery items — will be replaced with actual portfolio photos
const galleryData: GalleryItem[] = [
  {
    common: "Portrait",
    binomial: "Studio",
    photo: {
      url: "/assets/book/placeholder-1.jpg",
      text: "Portrait studio",
      by: "",
    },
  },
  {
    common: "Éditorial",
    binomial: "Mode",
    photo: {
      url: "/assets/book/placeholder-2.jpg",
      text: "Éditorial mode",
      by: "",
    },
  },
  {
    common: "Cinéma",
    binomial: "Court-métrage",
    photo: {
      url: "/assets/book/placeholder-3.jpg",
      text: "Cinéma",
      by: "",
    },
  },
  {
    common: "Défilé",
    binomial: "Runway",
    photo: {
      url: "/assets/book/placeholder-4.jpg",
      text: "Défilé",
      by: "",
    },
  },
  {
    common: "Commercial",
    binomial: "Publicité",
    photo: {
      url: "/assets/book/placeholder-5.jpg",
      text: "Commercial",
      by: "",
    },
  },
  {
    common: "Portrait",
    binomial: "Extérieur",
    photo: {
      url: "/assets/book/placeholder-6.jpg",
      text: "Portrait extérieur",
      by: "",
    },
  },
];

const GallerySection = () => {
  const navigate = useNavigate();

  return (
    <section id="galerie" className="relative">
      {/* Scrollable height for the circular gallery rotation */}
      <div className="w-full" style={{ height: "300vh" }}>
        <div className="w-full h-screen sticky top-0 flex flex-col items-center justify-center overflow-hidden">
          {/* Heading */}
          <div className="absolute top-20 z-10 text-center">
            <h2
              className="text-4xl md:text-5xl font-light tracking-wide mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Galerie
            </h2>
            <Separator className="w-12 mx-auto mb-4 bg-primary/40" />
            <p className="text-sm text-muted-foreground tracking-wider">
              Faites défiler pour explorer
            </p>
          </div>

          {/* 3D Gallery */}
          <div className="w-full h-full">
            <CircularGallery
              items={galleryData}
              radius={500}
              autoRotateSpeed={0.03}
            />
          </div>

          {/* CTA to full book */}
          <div className="absolute bottom-20 z-10">
            <Button
              variant="outline"
              className="border-primary/30 text-primary hover:bg-primary/10 tracking-wider uppercase text-sm gap-2"
              onClick={() => navigate("/book")}
            >
              Voir tout le book
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { GallerySection };
