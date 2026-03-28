import React, { useState } from "react";
import { Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import { useInView } from "framer-motion";
import type { BookMediaItem } from "@/lib/book-manifest";

interface BookItemProps {
  item: BookMediaItem;
  onClick: () => void;
}

const BookItem = ({ item, onClick }: BookItemProps) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const [loaded, setLoaded] = useState(false);
  const imageSrc = item.thumb || item.src;
  const ratio = item.width / item.height;

  return (
    <button
      type="button"
      className="group relative w-full rounded-lg overflow-hidden border border-border/20 bg-card/30 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
      onClick={onClick}
      aria-label={`Voir ${item.title}`}
    >
      <AspectRatio
        ref={ref}
        ratio={ratio}
        className="bg-accent relative size-full rounded-lg"
      >
        <img
          src={imageSrc}
          alt={item.title}
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <p className="text-white text-sm font-medium">{item.title}</p>
        {item.photographer && (
          <p className="text-white/60 text-xs mt-0.5">by {item.photographer}</p>
        )}
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
