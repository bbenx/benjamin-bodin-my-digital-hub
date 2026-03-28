import { BookItem } from "./BookItem";
import type { BookMediaItem } from "@/lib/book-manifest";

interface BookGalleryProps {
  items: BookMediaItem[];
  isLoading: boolean;
  onItemClick: (index: number) => void;
}

const BookGallery = ({ items, isLoading, onItemClick }: BookGalleryProps) => {
  if (isLoading) {
    return (
      <div className="book-masonry px-6 max-w-6xl mx-auto py-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="w-full rounded-lg bg-secondary/30 animate-pulse mb-4"
            style={{ height: `${200 + (i % 3) * 80}px` }}
          />
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
    <div className="book-masonry px-6 max-w-6xl mx-auto py-8">
      {items.map((item, index) => (
        <BookItem
          key={item.id}
          item={item}
          onClick={() => onItemClick(index)}
        />
      ))}
    </div>
  );
};

export { BookGallery };
