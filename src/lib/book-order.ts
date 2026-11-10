/**
 * Les photos sont ajoutées à la fin du manifeste : ce sont les dernières publiées.
 * Les `count` plus récentes passent devant, de la plus récente à la plus ancienne.
 * Le reste est mélangé.
 */
export function pinLatestPublished<T>(
  items: readonly T[],
  random: () => number,
  count = 3,
): T[] {
  const pinnedCount = Math.min(count, items.length);
  const latest = items.slice(-pinnedCount).reverse();
  const rest = items.slice(0, items.length - pinnedCount);
  for (let i = rest.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [rest[i], rest[j]] = [rest[j], rest[i]];
  }
  return [...latest, ...rest];
}
