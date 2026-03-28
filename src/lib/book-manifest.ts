export interface BookCategory {
  id: string;
  label: string;
}

export interface BookMediaItem {
  id: string;
  src: string;
  thumb?: string;
  /** Une catégorie (`"portrait"`) ou plusieurs (`["portrait","editorial"]`) pour les filtres. */
  category: string | string[];
  title: string;
  photographer: string;
  date: string;
  type: "photo" | "video";
  width: number;
  height: number;
}

export interface BookManifest {
  categories: BookCategory[];
  items: BookMediaItem[];
}

export async function fetchBookManifest(): Promise<BookManifest> {
  const res = await fetch("/assets/book/manifest.json");
  if (!res.ok) throw new Error("Failed to load book manifest");
  return res.json();
}

export function itemCategoryIds(item: Pick<BookMediaItem, "category">): string[] {
  const c = item.category;
  return Array.isArray(c) ? c : [c];
}

/** Alt / aria sans le nom de fichier — catégories et photographe. */
export function bookMediaAltText(
  item: Pick<BookMediaItem, "category" | "photographer">,
  categoryLabels?: Record<string, string>,
): string {
  const ids = itemCategoryIds(item);
  const catPart = ids.map((id) => categoryLabels?.[id] ?? id).join(" · ");
  const by = item.photographer?.trim();
  return by ? `${catPart} — ${by}` : catPart;
}
