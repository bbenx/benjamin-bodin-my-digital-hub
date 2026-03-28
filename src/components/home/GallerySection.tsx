import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Separator } from "@/components/ui/separator";
import { CircularGallery, type GalleryItem } from "@/components/ui/circular-gallery";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import {
  bookMediaAltText,
  fetchBookManifest,
  itemCategoryIds,
  itemPalette,
  type BookMediaItem,
} from "@/lib/book-manifest";

/** Répartit `n` choix sur `pool` en gardant un écart régulier (ordre du manifest). */
function spreadPick(pool: BookMediaItem[], n: number): BookMediaItem[] {
  if (n <= 0 || pool.length === 0) return [];
  if (pool.length === 1) return Array.from({ length: n }, () => pool[0]);
  return Array.from({ length: n }, (_, j) => {
    const t = n === 1 ? 0.5 : j / (n - 1);
    return pool[Math.round(t * (pool.length - 1))];
  });
}

/** Jusqu’à `count` images en alternant N&B / couleur pour le carrousel d’accueil. */
function pickAlternatingForCarousel(
  items: BookMediaItem[],
  count: number,
): BookMediaItem[] {
  const bw = items.filter((it) => itemPalette(it) === "bw");
  const color = items.filter((it) => itemPalette(it) === "color");

  const nBwSlots = Math.ceil(count / 2);
  const nColorSlots = Math.floor(count / 2);
  const bwPicks = spreadPick(bw, nBwSlots);
  const colorPicks = spreadPick(color, nColorSlots);

  const out: BookMediaItem[] = [];
  for (let i = 0; i < count; i++) {
    if (i % 2 === 0) {
      const b = bwPicks[Math.floor(i / 2)];
      if (b) out.push(b);
      else {
        const fallback =
          colorPicks[Math.min(Math.floor(i / 2), colorPicks.length - 1)];
        if (fallback) out.push(fallback);
      }
    } else {
      const c = colorPicks[Math.floor(i / 2)];
      if (c) out.push(c);
      else {
        const fallback =
          bwPicks[Math.min(Math.floor((i + 1) / 2), bwPicks.length - 1)];
        if (fallback) out.push(fallback);
      }
    }
  }
  return out;
}

const GallerySection = () => {
  const navigate = useNavigate();

  const { data: manifest } = useQuery({
    queryKey: ["book-manifest"],
    queryFn: fetchBookManifest,
  });

  const categoryLabelById = useMemo(() => {
    if (!manifest) return {} as Record<string, string>;
    return Object.fromEntries(manifest.categories.map((c) => [c.id, c.label]));
  }, [manifest]);

  // Pick a spread of images from the manifest for the 3D gallery
  const galleryItems: GalleryItem[] = useMemo(() => {
    if (!manifest || manifest.items.length === 0) return [];

    const count = Math.min(10, manifest.items.length);
    const picked = pickAlternatingForCarousel(manifest.items, count);

    return picked.map((item) => {
      const labels = itemCategoryIds(item).map(
        (id) => categoryLabelById[id] ?? id,
      );
      return {
        binomial: labels.join(" · "),
        photo: {
          url: item.src,
          text: bookMediaAltText(item, categoryLabelById),
          by: item.photographer,
        },
      };
    });
  }, [manifest, categoryLabelById]);

  return (
    <section
      id="galerie"
      className="relative min-h-[100svh] overflow-hidden"
    >
      {galleryItems.length > 0 ? (
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
      ) : null}
    </section>
  );
};

export { GallerySection };
