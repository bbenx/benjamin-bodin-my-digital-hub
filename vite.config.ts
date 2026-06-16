import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import type { OutputChunk } from "rollup";

/** Précharge les chunks JS critiques pour accélérer le premier rendu React. */
function modulePreloadPlugin(): Plugin {
  return {
    name: "module-preload",
    transformIndexHtml: {
      order: "post",
      handler(html, ctx) {
        if (!ctx.bundle) return html;

        const chunks = Object.values(ctx.bundle).filter(
          (item): item is OutputChunk => item.type === "chunk",
        );

        const shouldPreload = (chunk: OutputChunk) => {
          if (chunk.fileName.includes("react-pdf")) return false;
          if (chunk.fileName.includes("motion")) return false;
          if (chunk.isEntry) return true;
          if (/^react-dom-/.test(chunk.fileName)) return true;
          if (/^react-[^/]+\.js$/.test(chunk.fileName)) return true;
          if (/^router-/.test(chunk.fileName)) return true;
          return false;
        };

        const preload = chunks
          .filter(shouldPreload)
          .map(
            (chunk) =>
              `<link rel="modulepreload" crossorigin href="/${chunk.fileName}">`,
          )
          .join("\n    ");

        if (!preload) return html;
        return html.replace("</head>", `    ${preload}\n  </head>`);
      },
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), modulePreloadPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("framer-motion")) return "motion";
          if (id.includes("@tanstack/react-query")) return "query";
          if (id.includes("react-router")) return "router";
          if (id.includes("react-dom")) return "react-dom";
          if (id.includes("/react/") || id.endsWith("/react/index.js")) return "react";
        },
      },
    },
  },
});
