import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { build } from "vite";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const origin = "https://www.benjaminbodin.fr";
const serverDir = resolve(root, ".prerender");

const expectedHeading = {
  "/book": "Book",
  "/videos": "Vidéos",
  "/cv": "Fiche artiste",
  "/mentions-legales": "Mentions légales",
};

export async function prerenderRoutes() {
  rmSync(serverDir, { recursive: true, force: true });

  await build({
    configFile: resolve(root, "vite.config.ts"),
    build: {
      ssr: resolve(root, "src/entry-server.tsx"),
      outDir: serverDir,
      emptyOutDir: true,
    },
  });

  const serverEntry = pathToFileURL(resolve(serverDir, "entry-server.js")).href;
  const { render, PRERENDER_ROUTES } = await import(serverEntry);
  const template = readFileSync(resolve(root, "dist/index.html"), "utf8");
  const manifest = JSON.parse(
    readFileSync(resolve(root, "public/assets/book/manifest.json"), "utf8"),
  );

  if (!template.includes("<!--route-seo-->") || !template.includes("<!--early-chrome-->")) {
    throw new Error("index.html ne contient pas les marqueurs de pré-rendu.");
  }

  for (const route of PRERENDER_ROUTES) {
    const { html, head, state } = await render(route, manifest);
    const canonical = `${origin}${route}`;
    const heading = expectedHeading[route];

    if (!head.includes(canonical)) {
      throw new Error(`Canonique absente pour ${route}`);
    }
    if (!html.includes(heading)) {
      throw new Error(`Contenu « ${heading} » absent pour ${route}`);
    }

    const stateJson = JSON.stringify(state).replace(/</g, "\\u003c");
    let page = template.replace(
      /<!--route-seo-->[\s\S]*?<!--\/route-seo-->/,
      `<!--route-seo-->\n    ${head}\n    <!--/route-seo-->`,
    );
    page = page.replace(/<!--early-chrome-->[\s\S]*?<!--\/early-chrome-->/, "");
    page = page.replace(
      '<div id="root"></div>',
      `<script>window.__PRERENDER_STATE__=${stateJson}</script>\n    <div id="root">${html}</div>`,
    );

    const file = resolve(root, "dist", route.slice(1), "index.html");
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, page);
    console.log(`prerender ${route}`);
  }

  rmSync(serverDir, { recursive: true, force: true });
}
