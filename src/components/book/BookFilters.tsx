import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { BookCategory } from "@/lib/book-manifest";

interface BookFiltersProps {
  categories: BookCategory[];
  activeCategory: string;
  onCategoryChange: (id: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

const BookFilters = ({
  categories,
  activeCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
}: BookFiltersProps) => {
  return (
    <div className="sticky top-[72px] z-30 bg-background/90 backdrop-blur-md border-b border-border/30 py-4 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category filters */}
        <div className="overflow-x-auto w-full sm:w-auto">
          <ToggleGroup
            type="single"
            value={activeCategory}
            onValueChange={(val) => {
              if (val) onCategoryChange(val);
            }}
            className="flex-nowrap"
          >
            <ToggleGroupItem
              value="all"
              className="text-xs tracking-wider uppercase px-4 data-[state=on]:bg-primary/10 data-[state=on]:text-primary whitespace-nowrap"
            >
              Tous
            </ToggleGroupItem>
            {categories.map((cat) => (
              <ToggleGroupItem
                key={cat.id}
                value={cat.id}
                className="text-xs tracking-wider uppercase px-4 data-[state=on]:bg-primary/10 data-[state=on]:text-primary whitespace-nowrap"
              >
                {cat.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        {/* Sort */}
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-[140px] text-xs tracking-wider uppercase border-border/30">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="name">Nom</SelectItem>
            <SelectItem value="category">Catégorie</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export { BookFilters };
