import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Separator } from "@/components/ui/separator";
import { BookFilters } from "@/components/book/BookFilters";
import { BookGallery } from "@/components/book/BookGallery";
import { BookLightbox } from "@/components/book/BookLightbox";
import {
  fetchBookManifest,
  itemCategoryIds,
} from "@/lib/book-manifest";

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
      items = items.filter((item) =>
        itemCategoryIds(item).includes(activeCategory),
      );
    }

    // Sort
    items.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return b.date.localeCompare(a.date);
        case "name":
          return a.title.localeCompare(b.title);
        case "category":
          return itemCategoryIds(a)
            .join(",")
            .localeCompare(itemCategoryIds(b).join(","));
        default:
          return 0;
      }
    });

    return items;
  }, [manifest, activeCategory, sortBy]);

  const categoryLabelById = useMemo(() => {
    const map: Record<string, string> = {};
    manifest?.categories.forEach((c) => {
      map[c.id] = c.label;
    });
    return map;
  }, [manifest]);

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
