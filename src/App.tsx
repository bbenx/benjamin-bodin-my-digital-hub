import { lazy, Suspense, type ReactNode } from "react";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CookieConsent } from "@/components/CookieConsent";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { Layout } from "@/components/layout/Layout";
import Index from "./pages/Index.tsx";

const Book = lazy(() => import("./pages/Book.tsx"));
const Cv = lazy(() => import("./pages/Cv.tsx"));
const Videos = lazy(() => import("./pages/Videos.tsx"));
const Legal = lazy(() => import("./pages/Legal.tsx"));
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
          <Route
            path="/book"
            element={
              <Suspense fallback={pageFallback}>
                <Book />
              </Suspense>
            }
          />
          <Route
            path="/videos"
            element={
              <Suspense fallback={pageFallback}>
                <Videos />
              </Suspense>
            }
          />
          <Route
            path="/cv"
            element={
              <Suspense fallback={pageFallback}>
                <Cv />
              </Suspense>
            }
          />
          <Route
            path="/mentions-legales"
            element={
              <Suspense fallback={pageFallback}>
                <Legal />
              </Suspense>
            }
          />
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
