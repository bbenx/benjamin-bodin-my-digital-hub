import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import { ErrorBoundary } from "./components/ErrorBoundary.tsx";
import "./index.css";

if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

const rootEl = document.getElementById("root")!;
const app = (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

if (rootEl.hasChildNodes()) {
  hydrateRoot(rootEl, app);
} else {
  createRoot(rootEl).render(app);
}

document.getElementById("early-chrome")?.remove();
