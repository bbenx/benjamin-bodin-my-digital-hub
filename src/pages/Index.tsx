import { lazy, Suspense } from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { BioSection } from "@/components/home/BioSection";
import { StatsSection } from "@/components/home/StatsSection";
import { ContactSection } from "@/components/home/ContactSection";
import { LazyWhenVisible } from "@/components/ui/lazy-when-visible";
import { PageSeo } from "@/components/seo/PageSeo";
import { SEO_COPY } from "@/lib/seo-config";

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

const Index = () => {
  return (
    <>
      <PageSeo
        title={SEO_COPY.home.title}
        description={SEO_COPY.home.description}
        path="/"
      />
      <HeroSection />
      <BioSection />
      <StatsSection />
      <LazyWhenVisible
        minHeight="min(50vh, 480px)"
        fallback={
          <section
            id="galerie"
            className="scroll-mt-[4.5rem] px-4 pb-8 pt-20 md:px-6 md:pb-20 md:pt-28"
            aria-hidden
          >
            <div className="mx-auto max-w-6xl">
              <div className="mb-8 h-10 animate-pulse rounded bg-muted/10 md:mb-10" />
              <div className="mx-auto h-[min(42vh,320px)] max-w-6xl animate-pulse rounded-lg bg-muted/10 md:h-[min(50vh,480px)]" />
            </div>
          </section>
        }
      >
        <Suspense fallback={null}>
          <GallerySection />
        </Suspense>
      </LazyWhenVisible>
      <LazyWhenVisible
        minHeight="60vh"
        fallback={
          <section
            id="bande-demo"
            className="scroll-mt-24 px-6 pb-10 pt-10 md:py-20"
            aria-hidden
          >
            <div className="mx-auto max-w-4xl">
              <div className="mx-auto mb-8 h-10 w-48 animate-pulse rounded bg-muted/10" />
              <div
                className="w-full animate-pulse rounded-lg bg-muted/10"
                style={{ aspectRatio: "16 / 9" }}
              />
            </div>
          </section>
        }
      >
        <Suspense fallback={null}>
          <ReelSection />
        </Suspense>
      </LazyWhenVisible>
      <ContactSection />
    </>
  );
};

export default Index;
