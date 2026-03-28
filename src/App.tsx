import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { Layout } from "@/components/layout/Layout";
import Index from "./pages/Index.tsx";

const Book = lazy(() => import("./pages/Book.tsx"));
const Legal = lazy(() => import("./pages/Legal.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const notFoundFallback = (
  <div className="flex min-h-dvh w-full items-center justify-center bg-muted" aria-hidden />
);

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <GoogleAnalytics />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/book" element={<Book />} />
              <Route path="/mentions-legales" element={<Legal />} />
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
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
