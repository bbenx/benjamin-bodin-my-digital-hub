import { useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  bookMediaAltText,
  itemCategoryIds,
  type BookMediaItem,
} from "@/lib/book-manifest";

interface BookLightboxProps {
  items: BookMediaItem[];
  currentIndex: number | null;
  categoryLabelById: Record<string, string>;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const BookLightbox = ({
  items,
  currentIndex,
  categoryLabelById,
  onClose,
  onNavigate,
}: BookLightboxProps) => {
  const isOpen = currentIndex !== null;
  const item = currentIndex !== null ? items[currentIndex] : null;

  const goNext = useCallback(() => {
    if (currentIndex === null) return;
    onNavigate((currentIndex + 1) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  const goPrev = useCallback(() => {
    if (currentIndex === null) return;
    onNavigate((currentIndex - 1 + items.length) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, goNext, goPrev]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-none w-screen h-screen p-0 bg-black/95 border-none rounded-none [&>button]:text-white [&>button]:hover:text-primary [&>button]:z-20">
        <DialogTitle className="sr-only">
          {item ? bookMediaAltText(item, categoryLabelById) : "Image"}
        </DialogTitle>
        <DialogDescription className="sr-only">
          Visualisation plein écran
        </DialogDescription>

        {item && (
          <>
            {/* Media */}
            <div className="absolute inset-0 flex items-center justify-center p-4 md:p-12">
              {item.type === "video" ? (
                <video
                  src={item.src}
                  controls
                  autoPlay
                  className="max-h-[85vh] max-w-[90vw] rounded"
                />
              ) : (
                <img
                  src={item.src}
                  alt={bookMediaAltText(item, categoryLabelById)}
                  className="max-h-[85vh] max-w-[90vw] object-contain rounded"
                />
              )}
            </div>

            {/* Navigation arrows */}
            {items.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/40 text-white/70 hover:text-white hover:bg-black/60 transition-all"
                  aria-label="Photo précédente"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/40 text-white/70 hover:text-white hover:bg-black/60 transition-all"
                  aria-label="Photo suivante"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}

            {/* Bottom bar */}
            <div className="absolute bottom-0 left-0 right-0 z-10 p-4 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-between gap-3 text-white">
              <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-3">
                {itemCategoryIds(item).map((catId) => (
                  <Badge
                    key={catId}
                    variant="outline"
                    className="text-[10px] border-white/30 text-white/80"
                  >
                    {categoryLabelById[catId] ?? catId}
                  </Badge>
                ))}
                {item.photographer && (
                  <span className="text-xs text-white/50">by {item.photographer}</span>
                )}
              </div>
              <span className="text-xs text-white/50">
                {currentIndex! + 1} / {items.length}
              </span>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export { BookLightbox };
