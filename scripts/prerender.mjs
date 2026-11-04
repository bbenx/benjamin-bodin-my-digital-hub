import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { build } from "vite";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const origin = "https://www.benjaminbodin.fr";
const serverDir = resolve(root, ".prerender");

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

  const writePage = (route, html, head, state, file) => {
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
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, page);
    console.log(`prerender ${route}`);
  };

  for (const route of PRERENDER_ROUTES) {
    const { html, head, state } = await render(route.path, manifest);
    const canonical = `${origin}${route.path}`;

    if (!head.includes(canonical)) {
      throw new Error(`Canonique absente pour ${route.path}`);
    }
    if (!html.includes(route.heading)) {
      throw new Error(`Contenu « ${route.heading} » absent pour ${route.path}`);
    }

    writePage(route.path, html, head, state, resolve(root, "dist", route.path.slice(1), "index.html"));
  }

  const notFound = await render("/adresse-inconnue", manifest);
  if (!notFound.head.includes("noindex")) {
    throw new Error("La page 404 n’est pas en noindex");
  }
  if (notFound.head.includes("rel=\"canonical\"")) {
    throw new Error("La page 404 ne doit pas avoir de canonique");
  }
  if (!notFound.html.includes("Page introuvable")) {
    throw new Error("Contenu de la page 404 absent");
  }
  writePage("/404", notFound.html, notFound.head, notFound.state, resolve(root, "dist/404.html"));

  rmSync(serverDir, { recursive: true, force: true });
}
