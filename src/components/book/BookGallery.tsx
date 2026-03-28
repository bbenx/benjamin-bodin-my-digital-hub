import { useMemo } from "react";
import { BookItem } from "./BookItem";
import type { BookMediaItem } from "@/lib/book-manifest";

interface BookGalleryProps {
  items: BookMediaItem[];
  isLoading: boolean;
  onItemClick: (index: number) => void;
}

const BookGallery = ({ items, isLoading, onItemClick }: BookGalleryProps) => {
  // Distribute items across 3 columns for true masonry layout
  const columns = useMemo(() => {
    const cols: { item: BookMediaItem; index: number }[][] = [[], [], []];
    items.forEach((item, index) => {
      cols[index % 3].push({ item, index });
    });
    return cols;
  }, [items]);

  if (isLoading) {
    return (
      <div className="mx-auto grid w-full max-w-5xl gap-6 px-4 py-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, col) => (
          <div key={col} className="grid gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="w-full rounded-lg bg-secondary/30 animate-pulse"
                style={{ aspectRatio: i % 2 === 0 ? "9/16" : "16/9" }}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 px-6">
        <p className="text-muted-foreground text-sm tracking-wider uppercase">
          Aucune photo dans cette catégorie
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto grid w-full max-w-5xl gap-6 px-4 py-8 sm:grid-cols-2 lg:grid-cols-3">
      {columns.map((col, colIndex) => (
        <div key={colIndex} className="grid gap-6">
          {col.map(({ item, index }) => (
            <BookItem
              key={item.id}
              item={item}
              onClick={() => onItemClick(index)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export { BookGallery };
