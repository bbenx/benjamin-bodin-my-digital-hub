import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Separator } from "@/components/ui/separator";
import { BookFilters } from "@/components/book/BookFilters";
import { BookGallery } from "@/components/book/BookGallery";
import { BookLightbox } from "@/components/book/BookLightbox";
import { fetchBookManifest } from "@/lib/book-manifest";

const Book = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const { data: manifest, isLoading } = useQuery({
    queryKey: ["book-manifest"],
    queryFn: fetchBookManifest,
  });

  const filteredItems = useMemo(() => {
    if (!manifest) return [];

    let items = [...manifest.items];

    // Filter by category
    if (activeCategory !== "all") {
      items = items.filter((item) => item.category === activeCategory);
    }

    // Sort
    items.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return b.date.localeCompare(a.date);
        case "name":
          return a.title.localeCompare(b.title);
        case "category":
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

    return items;
  }, [manifest, activeCategory, sortBy]);

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
        onCategoryChange={setActiveCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* Gallery */}
      <BookGallery
        items={filteredItems}
        isLoading={isLoading}
        onItemClick={(index) => setLightboxIndex(index)}
      />

      {/* Lightbox */}
      <BookLightbox
        items={filteredItems}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
};

export default Book;
