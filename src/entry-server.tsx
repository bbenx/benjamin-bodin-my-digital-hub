/// <reference types="node" />
import { PassThrough } from "node:stream";
import type { ReactElement } from "react";
import { dehydrate } from "@tanstack/react-query";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppProviders, AppRoutes } from "./App";
import { ErrorBoundary } from "./components/ErrorBoundary";
import type { BookManifest } from "./lib/book-manifest";
import { writePrerenderState, type PrerenderState } from "./lib/prerender-state";
import { queryClient } from "./providers/QueryProvider";
import type { HelmetServerState } from "react-helmet-async";

export const PRERENDER_ROUTES = ["/book", "/videos", "/cv", "/mentions-legales"] as const;

type HelmetContext = { helmet?: HelmetServerState };

function renderHtml(element: ReactElement): Promise<string> {
  return new Promise((resolve, reject) => {
    let settled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const finish = (error?: unknown, html?: string) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      if (error) reject(error);
      else resolve(html ?? "");
    };

    const { pipe, abort } = renderToPipeableStream(element, {
      onAllReady() {
        const chunks: Buffer[] = [];
        const stream = new PassThrough();
        stream.on("data", (chunk: Buffer) => chunks.push(Buffer.from(chunk)));
        stream.on("end", () => finish(undefined, Buffer.concat(chunks).toString("utf8")));
        stream.on("error", (error) => finish(error));
        pipe(stream);
      },
      onShellError(error) {
        finish(error);
      },
      onError(error) {
        console.error(error);
      },
    });

    timer = setTimeout(() => {
      abort();
      finish(new Error("Prerender timeout"));
    }, 20000);
  });
}

export async function render(url: string, manifest: BookManifest) {
  queryClient.clear();
  queryClient.setQueryData(["book-manifest"], manifest);

  const bookOrderSeed = Math.floor(Math.random() * 2_000_000_000) + 1;
  writePrerenderState({ bookOrderSeed });

  const helmetContext: HelmetContext = {};

  try {
    const html = await renderHtml(
      <ErrorBoundary>
        <AppProviders helmetContext={helmetContext}>
          <StaticRouter location={url}>
            <AppRoutes />
          </StaticRouter>
        </AppProviders>
      </ErrorBoundary>,
    );

    const helmet = helmetContext.helmet;
    if (!helmet) throw new Error(`Balises SEO absentes pour ${url}`);

    const head = [helmet.title, helmet.priority, helmet.meta, helmet.link]
      .map((part) => part.toString().trim())
      .filter(Boolean)
      .join("\n    ");

    const state: PrerenderState = {
      bookOrderSeed,
      queryState: dehydrate(queryClient, {
        shouldDehydrateQuery: (query) => query.queryKey[0] === "book-manifest",
      }),
    };

    return { html, head, state };
  } finally {
    writePrerenderState(undefined);
  }
}
