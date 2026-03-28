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
    <section id="galerie" className="relative min-h-[100svh] overflow-hidden">
      <div className="relative flex min-h-[100svh] w-full flex-col items-center justify-center">
        {/* Heading */}
        <div className="absolute top-16 z-10 text-center md:top-20">
          <h2
            className="mb-4 text-4xl font-light tracking-wide md:text-5xl"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Galerie
          </h2>
          <Separator className="mx-auto w-12 bg-primary/40" />
        </div>

        {/* 3D Gallery */}
        <div className="h-[min(58vh,520px)] w-full min-h-[280px] max-w-6xl px-2 md:h-[min(70vh,640px)] md:min-h-[320px] md:px-0">
          <CircularGallery items={galleryItems} radius={500} autoRotateSpeed={0.03} />
        </div>

        {/* CTA to full book */}
        <div className="absolute bottom-14 z-10 md:bottom-20">
          <Button
            variant="outline"
            className="gap-2 border-primary/30 text-sm uppercase tracking-wider text-primary hover:bg-primary/10"
            onClick={() => navigate("/book")}
          >
            Voir tout le book
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export { GallerySection };
