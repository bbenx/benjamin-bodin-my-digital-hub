import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { BookCategory, BookSortOrder } from "@/lib/book-manifest";

interface BookFiltersProps {
  categories: BookCategory[];
  activeCategory: string;
  onCategoryChange: (id: string) => void;
  activePalette: "all" | "bw" | "color";
  onPaletteChange: (val: "all" | "bw" | "color") => void;
  sortOrder: BookSortOrder | null;
  onSortOrderChange: (order: BookSortOrder | null) => void;
}

const BookFilters = ({
  categories,
  activeCategory,
  onCategoryChange,
  activePalette,
  onPaletteChange,
  sortOrder,
  onSortOrderChange,
}: BookFiltersProps) => {
  return (
    <div className="sticky top-[72px] z-30 border-b border-border/30 bg-background/90 px-6 py-4 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col gap-4">
        <div className="w-full overflow-x-auto [-webkit-overflow-scrolling:touch] sm:w-auto">
          <ToggleGroup
            type="single"
            value={activeCategory}
            onValueChange={(val) => {
              if (val) onCategoryChange(val);
            }}
            className="w-max flex-nowrap justify-start gap-1.5"
          >
            <ToggleGroupItem
              value="all"
              className="whitespace-nowrap px-4 text-xs uppercase tracking-wider data-[state=on]:bg-primary/10 data-[state=on]:text-primary"
            >
              Tous
            </ToggleGroupItem>
            {categories.map((cat) => (
              <ToggleGroupItem
                key={cat.id}
                value={cat.id}
                className="whitespace-nowrap px-4 text-xs uppercase tracking-wider data-[state=on]:bg-primary/10 data-[state=on]:text-primary"
              >
                {cat.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Trier
            </span>
            <Select
              value={sortOrder ?? ""}
              onValueChange={(v) => {
                if (v === "manifest") onSortOrderChange(null);
                else onSortOrderChange(v as BookSortOrder);
              }}
            >
              <SelectTrigger className="h-9 w-[min(100%,200px)] border-border/30 text-xs sm:w-[200px]">
                <SelectValue placeholder="Trier par date…" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manifest" className="text-xs">
                  Ordre du book
                </SelectItem>
                <SelectItem value="newest" className="text-xs">
                  Plus récent
                </SelectItem>
                <SelectItem value="oldest" className="text-xs">
                  Plus ancien
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full overflow-x-auto [-webkit-overflow-scrolling:touch] sm:w-auto">
            <ToggleGroup
              type="single"
              value={activePalette}
              onValueChange={(val) => {
                if (val) onPaletteChange(val as "all" | "bw" | "color");
              }}
              className="w-max flex-nowrap justify-start gap-1.5"
            >
              <ToggleGroupItem
                value="all"
                className="whitespace-nowrap px-4 text-xs uppercase tracking-wider data-[state=on]:bg-primary/10 data-[state=on]:text-primary"
              >
                Toutes tonalités
              </ToggleGroupItem>
              <ToggleGroupItem
                value="bw"
                className="whitespace-nowrap px-4 text-xs uppercase tracking-wider data-[state=on]:bg-primary/10 data-[state=on]:text-primary"
              >
                Noir et blanc
              </ToggleGroupItem>
              <ToggleGroupItem
                value="color"
                className="whitespace-nowrap px-4 text-xs uppercase tracking-wider data-[state=on]:bg-primary/10 data-[state=on]:text-primary"
              >
                Couleur
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export { BookFilters };
