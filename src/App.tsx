import { createElement, lazy, Suspense, type ComponentType, type ReactNode } from "react";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CookieConsent } from "@/components/CookieConsent";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { Layout } from "@/components/layout/Layout";
import { PRERENDER_ROUTES, type PrerenderPath } from "@/lib/site-routes";
import Index from "./pages/Index.tsx";

const pages: Record<PrerenderPath, ComponentType> = {
  "/book": lazy(() => import("./pages/Book.tsx")),
  "/videos": lazy(() => import("./pages/Videos.tsx")),
  "/cv": lazy(() => import("./pages/Cv.tsx")),
  "/mentions-legales": lazy(() => import("./pages/Legal.tsx")),
};
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const pageFallback = (
  <div className="min-h-[50vh] w-full" aria-hidden />
);

const notFoundFallback = (
  <div className="flex min-h-dvh w-full items-center justify-center bg-muted" aria-hidden />
);

export function AppRoutes() {
  return (
    <>
      <GoogleAnalytics />
      <CookieConsent />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Index />} />
          {PRERENDER_ROUTES.map(({ path }) => (
            <Route
              key={path}
              path={path}
              element={
                <Suspense fallback={pageFallback}>
                  {createElement(pages[path])}
                </Suspense>
              }
            />
          ))}
        </Route>
        <Route
          path="*"
          element={
            <Suspense fallback={notFoundFallback}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
}

export function AppProviders({
  children,
  helmetContext,
}: {
  children: ReactNode;
  helmetContext?: { helmet?: HelmetServerState };
}) {
  return (
    <HelmetProvider context={helmetContext}>{children}</HelmetProvider>
  );
}

const App = () => (
  <AppProviders>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </AppProviders>
);

export default App;
