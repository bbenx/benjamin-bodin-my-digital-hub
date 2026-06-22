import { lazy, Suspense, useEffect, useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { Layout } from "@/components/layout/Layout";
import { QueryProvider } from "@/providers/QueryProvider";
import Index from "./pages/Index.tsx";

const Book = lazy(() => import("./pages/Book.tsx"));
const Cv = lazy(() => import("./pages/Cv.tsx"));
const Videos = lazy(() => import("./pages/Videos.tsx"));
const Legal = lazy(() => import("./pages/Legal.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const Toaster = lazy(() =>
  import("@/components/ui/toaster").then((m) => ({ default: m.Toaster })),
);
const Sonner = lazy(() =>
  import("@/components/ui/sonner").then((m) => ({ default: m.Toaster })),
);

const pageFallback = (
  <div className="min-h-[50vh] w-full" aria-hidden />
);

const notFoundFallback = (
  <div className="flex min-h-dvh w-full items-center justify-center bg-muted" aria-hidden />
);

function DeferredUi() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(() => setReady(true), {
        timeout: 3000,
      });
      return () => window.cancelIdleCallback(id);
    }
    const timer = window.setTimeout(() => setReady(true), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  if (!ready) return null;

  return (
    <Suspense fallback={null}>
      <Toaster />
      <Sonner />
    </Suspense>
  );
}

const App = () => (
  <HelmetProvider>
    <QueryProvider>
      <TooltipProvider>
      <DeferredUi />
      <BrowserRouter>
        <GoogleAnalytics />
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
      </BrowserRouter>
      </TooltipProvider>
    </QueryProvider>
  </HelmetProvider>
);

export default App;
