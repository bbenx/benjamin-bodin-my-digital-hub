export interface BookCategory {
  id: string;
  label: string;
}

export interface BookMediaItem {
  id: string;
  src: string;
  thumb?: string;
  category: string;
  title: string;
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
