import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Separator } from "@/components/ui/separator";
import { CircularGallery, type GalleryItem } from "@/components/ui/circular-gallery";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { fetchBookManifest } from "@/lib/book-manifest";

const GallerySection = () => {
  const navigate = useNavigate();

  const { data: manifest } = useQuery({
    queryKey: ["book-manifest"],
    queryFn: fetchBookManifest,
  });

  // Pick a spread of images from the manifest for the 3D gallery
  const galleryItems: GalleryItem[] = (() => {
    if (!manifest || manifest.items.length === 0) return [];

    // Take up to 10 images, evenly spaced through the list
    const total = manifest.items.length;
    const count = Math.min(10, total);
    const step = total / count;

    return Array.from({ length: count }, (_, i) => {
      const item = manifest.items[Math.floor(i * step)];
      return {
        common: item.title,
        binomial: item.category,
        photo: {
          url: item.src,
          text: item.title,
          by: item.photographer,
        },
      };
    });
  })();

  if (galleryItems.length === 0) return null;

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
              items={galleryItems}
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
