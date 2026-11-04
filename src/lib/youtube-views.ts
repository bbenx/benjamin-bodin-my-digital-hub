import { useEffect, useState } from "react";

const VIEW_COUNT_STALE_MS = 60 * 60 * 1000;

const viewCountCache = new Map<string, { count: number | null; at: number }>();
const viewCountPending = new Map<string, Promise<number | null>>();

function readFreshViewCount(youtubeId: string): number | null | undefined {
  const hit = viewCountCache.get(youtubeId);
  if (!hit || Date.now() - hit.at > VIEW_COUNT_STALE_MS) return undefined;
  return hit.count;
}

function loadViewCount(youtubeId: string): Promise<number | null> {
  const fresh = readFreshViewCount(youtubeId);
  if (fresh !== undefined) return Promise.resolve(fresh);

  const pending = viewCountPending.get(youtubeId);
  if (pending) return pending;

  const request = fetchYoutubeViewCount(youtubeId).then((count) => {
    viewCountCache.set(youtubeId, { count, at: Date.now() });
    viewCountPending.delete(youtubeId);
    return count;
  });
  viewCountPending.set(youtubeId, request);
  return request;
}

/** Compteur live, mis en cache une heure. `undefined` tant que la réponse n’est pas là. */
export function useYoutubeViewCount(youtubeId: string | null): number | null | undefined {
  const [count, setCount] = useState<number | null | undefined>(() =>
    youtubeId ? readFreshViewCount(youtubeId) : undefined,
  );

  useEffect(() => {
    if (!youtubeId) return;
    const fresh = readFreshViewCount(youtubeId);
    if (fresh !== undefined) {
      setCount(fresh);
      return;
    }

    let cancelled = false;
    loadViewCount(youtubeId).then((value) => {
      if (!cancelled) setCount(value);
    });
    return () => {
      cancelled = true;
    };
  }, [youtubeId]);

  return youtubeId ? count : undefined;
}

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
