import { lazy, Suspense, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { HeroSection } from "@/components/home/HeroSection";
import { PageSeo } from "@/components/seo/PageSeo";
import { fetchBookManifest } from "@/lib/book-manifest";
import { SEO_COPY } from "@/lib/seo-config";

const BioSection = lazy(() =>
  import("@/components/home/BioSection").then((m) => ({
    default: m.BioSection,
  })),
);
const StatsSection = lazy(() =>
  import("@/components/home/StatsSection").then((m) => ({
    default: m.StatsSection,
  })),
);
const GallerySection = lazy(() =>
  import("@/components/home/GallerySection").then((m) => ({
    default: m.GallerySection,
  })),
);
const ReelSection = lazy(() =>
  import("@/components/home/ReelSection").then((m) => ({
    default: m.ReelSection,
  })),
);
const ContactSection = lazy(() =>
  import("@/components/home/ContactSection").then((m) => ({
    default: m.ContactSection,
  })),
);

function deferIdle(task: () => void): () => void {
  if (typeof window.requestIdleCallback === "function") {
    const id = window.requestIdleCallback(task, { timeout: 4000 });
    return () => window.cancelIdleCallback(id);
  }
  const timer = window.setTimeout(task, 2000);
  return () => window.clearTimeout(timer);
}

const Index = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    return deferIdle(() => {
      void queryClient.prefetchQuery({
        queryKey: ["book-manifest"],
        queryFn: fetchBookManifest,
      });
    });
  }, [queryClient]);

  return (
    <>
      <PageSeo
        title={SEO_COPY.home.title}
        description={SEO_COPY.home.description}
        path="/"
      />
      <HeroSection />
      <Suspense fallback={null}>
        <BioSection />
      </Suspense>
      <Suspense fallback={null}>
        <StatsSection />
      </Suspense>
      <Suspense fallback={null}>
        <GallerySection />
      </Suspense>
      <Suspense fallback={null}>
        <ReelSection />
      </Suspense>
      <Suspense fallback={null}>
        <ContactSection />
      </Suspense>
    </>
  );
};

export default Index;
