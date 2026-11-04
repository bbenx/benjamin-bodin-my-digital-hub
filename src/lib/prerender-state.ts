import type { BookManifest } from "@/lib/book-manifest";

export type PrerenderState = {
  bookOrderSeed?: number;
  bookManifest?: BookManifest;
};

const globalState = globalThis as typeof globalThis & {
  __PRERENDER_STATE__?: PrerenderState;
};

export function readPrerenderState(): PrerenderState | undefined {
  return globalState.__PRERENDER_STATE__;
}

export function writePrerenderState(state: PrerenderState | undefined) {
  if (state) globalState.__PRERENDER_STATE__ = state;
  else delete globalState.__PRERENDER_STATE__;
}

/** Même suite aléatoire au pré-rendu et à l'hydratation quand un seed est fourni. */
export function createPageRandom(): () => number {
  const seed = readPrerenderState()?.bookOrderSeed;
  if (typeof seed !== "number") return Math.random;

  let value = seed % 2147483647;
  if (value <= 0) value += 2147483646;

  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}
