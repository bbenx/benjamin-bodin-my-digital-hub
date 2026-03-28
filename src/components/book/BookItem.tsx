import { useState } from "react";
import { Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { BookMediaItem } from "@/lib/book-manifest";

interface BookItemProps {
  item: BookMediaItem;
  onClick: () => void;
}

const BookItem = ({ item, onClick }: BookItemProps) => {
  const [loaded, setLoaded] = useState(false);
  const imageSrc = item.thumb || item.src;

  return (
    <button
      type="button"
      className="group relative w-full rounded-lg overflow-hidden border border-border/20 bg-card/30 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
      onClick={onClick}
      aria-label={`Voir ${item.title}`}
    >
      {/* Skeleton placeholder */}
      {!loaded && (
        <div
          className="w-full bg-secondary/50 animate-pulse"
          style={{ aspectRatio: `${item.width} / ${item.height}` }}
        />
      )}

      <img
        src={imageSrc}
        alt={item.title}
        loading="lazy"
        width={item.width}
        height={item.height}
        className={cn(
          "w-full h-auto transition-transform duration-500 group-hover:scale-105",
          !loaded && "absolute opacity-0"
        )}
        onLoad={() => setLoaded(true)}
      />

      {/* Video overlay */}
      {item.type === "video" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/20">
            <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
          </div>
        </div>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <p className="text-white text-sm font-medium">{item.title}</p>
        <Badge
          variant="outline"
          className="mt-1 w-fit text-[10px] border-white/30 text-white/80"
        >
          {item.category}
        </Badge>
      </div>
    </button>
  );
};

export { BookItem };
