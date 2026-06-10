/** Affichage FR : « 1 234 vues » */
export function formatYoutubeViewCount(count: number): string {
  const formatted = new Intl.NumberFormat("fr-FR").format(count);
  return count <= 1 ? `${formatted} vue` : `${formatted} vues`;
}

export async function fetchYoutubeViewCount(
  youtubeId: string,
): Promise<number | null> {
  const id = youtubeId.trim();
  if (!id) return null;

  try {
    const res = await fetch(
      `/api/youtube-views?id=${encodeURIComponent(id)}`,
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { viewCount?: number };
    const count = data.viewCount;
    return typeof count === "number" && Number.isFinite(count) ? count : null;
  } catch {
    return null;
  }
}
