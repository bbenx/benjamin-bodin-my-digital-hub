type PublishedItem = {
  id: string;
  date: string;
  published?: string;
};

/** Date de mise en ligne, ou à défaut la date du shooting. */
export function publicationDate(item: PublishedItem): string {
  return item.published || item.date;
}

export function compareByPublication(
  a: PublishedItem,
  b: PublishedItem,
  order: "newest" | "oldest",
): number {
  const byDate =
    order === "newest"
      ? publicationDate(b).localeCompare(publicationDate(a))
      : publicationDate(a).localeCompare(publicationDate(b));
  if (byDate !== 0) return byDate;
  return a.id.localeCompare(b.id, undefined, { numeric: true });
}

/**
 * Les trois photos à la date de publication la plus récente passent devant.
 * Le reste est mélangé.
 */
export function pinLatestPublished<T extends PublishedItem>(
  items: readonly T[],
  random: () => number,
  count = 3,
): T[] {
  const pinned = [...items]
    .sort((a, b) => {
      const byDate = publicationDate(b).localeCompare(publicationDate(a));
      if (byDate !== 0) return byDate;
      return b.id.localeCompare(a.id, undefined, { numeric: true });
    })
    .slice(0, Math.min(count, items.length));
  const pinnedIds = new Set(pinned.map((item) => item.id));
  const rest = items.filter((item) => !pinnedIds.has(item.id));
  for (let i = rest.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [rest[i], rest[j]] = [rest[j], rest[i]];
  }
  return [...pinned, ...rest];
}
