import { useEffect, useMemo, useRef, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { BookFilters } from "@/components/book/BookFilters";
import { BookGallery } from "@/components/book/BookGallery";
import { BookLightbox } from "@/components/book/BookLightbox";
import {
  trackBookFilterChange,
  trackBookLightboxOpen,
} from "@/lib/analytics";
import {
  loadBookManifest,
  rememberBookManifest,
  itemCategoryIds,
  itemPalette,
  type BookManifest,
  type BookSortOrder,
} from "@/lib/book-manifest";
import { PageSeo } from "@/components/seo/PageSeo";
import { compareByPublication, pinLatestPublished } from "@/lib/book-order";
import { createPageRandom, readPrerenderState } from "@/lib/prerender-state";
import { SEO_COPY } from "@/lib/seo-config";

function useBookManifest() {
  const prerendered = readPrerenderState()?.bookManifest;
  const [manifest, setManifest] = useState<BookManifest | undefined>(() => {
    if (prerendered) rememberBookManifest(prerendered);
    return prerendered;
  });
  const [isLoading, setIsLoading] = useState(prerendered == null);

  useEffect(() => {
    if (prerendered) return;
    let cancelled = false;
    loadBookManifest()
      .then((data) => {
        if (!cancelled) setManifest(data);
      })
      .catch(() => {
        if (!cancelled) setManifest(undefined);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [prerendered]);

  return { manifest, isLoading };
}

function BookPage() {
  const randomRef = useRef<(() => number) | null>(null);
  if (!randomRef.current) randomRef.current = createPageRandom();

  const [activeCategory, setActiveCategory] = useState("all");
  const [activePalette, setActivePalette] = useState<"all" | "bw" | "color">(
    "all",
  );
  const [sortOrder, setSortOrder] = useState<BookSortOrder | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const { manifest, isLoading } = useBookManifest();

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
      items.sort((a, b) => compareByPublication(a, b, sortOrder));
    } else if (activeCategory === "all") {
      items = pinLatestPublished(items, randomRef.current);
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
    trackBookFilterChange({ filter_type: "category", value: id });
    setActiveCategory(id);
    setActivePalette("all");
    if (id === "polas" && sortOrder === null) {
      setSortOrder("newest");
    }
  };

  const handlePaletteChange = (val: "all" | "bw" | "color") => {
    trackBookFilterChange({ filter_type: "palette", value: val });
    setActivePalette(val);
  };

  const handleSortOrderChange = (order: BookSortOrder | null) => {
    trackBookFilterChange({
      filter_type: "sort",
      value: order ?? "manifest",
    });
    setSortOrder(order);
  };

  const handleGalleryItemClick = (index: number) => {
    const item = filteredItems[index];
    if (item) {
      const labels = itemCategoryIds(item)
        .map((id) => categoryLabelById[id])
        .filter(Boolean)
        .join(" · ");
      trackBookLightboxOpen({
        item_id: item.id,
        ...(labels ? { category_label: labels } : {}),
      });
    }
    setLightboxIndex(index);
  };

  return (
    <div className="pt-page">
      <PageSeo
        title={SEO_COPY.book.title}
        description={SEO_COPY.book.description}
        path="/book"
      />
      {/* Page heading */}
      <div className="text-center px-6 pb-4 md:pb-6">
        <h1
          className="text-5xl md:text-6xl font-light tracking-wide mb-3"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Book
          <span className="sr-only">
            {" "}
            photographique — Benjamin Bodin, comédien et mannequin
          </span>
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
        onSortOrderChange={handleSortOrderChange}
      />

      {/* Gallery */}
      <BookGallery
        items={filteredItems}
        isLoading={isLoading}
        readingOrder={sortOrder === "newest" || sortOrder === "oldest"}
        categoryLabelById={categoryLabelById}
        onItemClick={handleGalleryItemClick}
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

function Book() {
  return <BookPage />;
}

export default Book;
