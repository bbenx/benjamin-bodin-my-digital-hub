import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Separator } from "@/components/ui/separator";
import { BookFilters } from "@/components/book/BookFilters";
import { BookGallery } from "@/components/book/BookGallery";
import { BookLightbox } from "@/components/book/BookLightbox";
import {
  fetchBookManifest,
  itemCategoryIds,
  itemPalette,
  type BookSortOrder,
} from "@/lib/book-manifest";

const Book = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activePalette, setActivePalette] = useState<"all" | "bw" | "color">(
    "all",
  );
  const [sortOrder, setSortOrder] = useState<BookSortOrder | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const { data: manifest, isLoading } = useQuery({
    queryKey: ["book-manifest"],
    queryFn: fetchBookManifest,
  });

  const filteredItems = useMemo(() => {
    if (!manifest) return [];

    let items = [...manifest.items];

    if (activeCategory !== "all") {
      items = items.filter((item) =>
        itemCategoryIds(item).includes(activeCategory),
      );
    }

    if (activePalette !== "all") {
      items = items.filter(
        (item) => itemPalette(item) === activePalette,
      );
    }

    if (sortOrder === "newest" || sortOrder === "oldest") {
      items.sort((a, b) => {
        const byDate =
          sortOrder === "newest"
            ? b.date.localeCompare(a.date)
            : a.date.localeCompare(b.date);
        if (byDate !== 0) return byDate;
        return a.id.localeCompare(b.id, undefined, { numeric: true });
      });
    }

    return items;
  }, [manifest, activeCategory, activePalette, sortOrder]);

  const categoryLabelById = useMemo(() => {
    const map: Record<string, string> = {};
    manifest?.categories.forEach((c) => {
      map[c.id] = c.label;
    });
    return map;
  }, [manifest]);

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
  };

  const handlePaletteChange = (val: "all" | "bw" | "color") => {
    setActivePalette(val);
  };

  return (
    <div className="pt-24">
      {/* Page heading */}
      <div className="text-center px-6 pb-8">
        <h1
          className="text-5xl md:text-6xl font-light tracking-wide mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Book
        </h1>
        <Separator className="w-12 mx-auto bg-primary/40" />
      </div>

      {/* Filters */}
      <BookFilters
        categories={manifest?.categories ?? []}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        activePalette={activePalette}
        onPaletteChange={handlePaletteChange}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
      />

      {/* Gallery */}
      <BookGallery
        items={filteredItems}
        isLoading={isLoading}
        categoryLabelById={categoryLabelById}
        onItemClick={(index) => setLightboxIndex(index)}
      />

      {/* Lightbox */}
      <BookLightbox
        items={filteredItems}
        currentIndex={lightboxIndex}
        categoryLabelById={categoryLabelById}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
};

export default Book;
