import React, { useState } from "react";
import { Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import { useInView } from "framer-motion";
import {
  bookMediaAltText,
  itemCategoryIds,
  type BookMediaItem,
} from "@/lib/book-manifest";

interface BookItemProps {
  item: BookMediaItem;
  categoryLabelById: Record<string, string>;
  onClick: () => void;
}

const BookItem = ({ item, categoryLabelById, onClick }: BookItemProps) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const [loaded, setLoaded] = useState(false);
  const imageSrc = item.thumb || item.src;
  const ratio = item.width / item.height;
  const alt = bookMediaAltText(item, categoryLabelById);

  return (
    <button
      type="button"
      className="group relative w-full rounded-lg overflow-hidden border border-border/20 bg-card/30 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
      onClick={onClick}
      aria-label={`Voir — ${alt}`}
    >
      <AspectRatio
        ref={ref}
        ratio={ratio}
        className="bg-accent relative size-full rounded-lg"
      >
        <img
          src={imageSrc}
          alt={alt}
          loading="lazy"
          width={item.width}
          height={item.height}
          className={cn(
            "size-full rounded-lg object-cover opacity-0 transition-all duration-1000 ease-in-out group-hover:scale-105",
            {
              "opacity-100": isInView && loaded,
            }
          )}
          onLoad={() => setLoaded(true)}
        />
      </AspectRatio>

      {/* Video overlay */}
      {item.type === "video" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/20">
            <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
          </div>
        </div>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end gap-1.5 p-4">
        <div className="flex flex-wrap gap-1">
          {itemCategoryIds(item).map((catId) => (
            <Badge
              key={catId}
              variant="outline"
              className="w-fit text-[10px] border-white/30 text-white/80"
            >
              {categoryLabelById[catId] ?? catId}
            </Badge>
          ))}
        </div>
        {item.photographer && (
          <p className="text-white/60 text-xs">by {item.photographer}</p>
        )}
      </div>
    </button>
  );
};

export { BookItem };
