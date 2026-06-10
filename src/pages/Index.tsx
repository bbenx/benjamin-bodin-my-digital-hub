import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { HeroSection } from "@/components/home/HeroSection";
import { BioSection } from "@/components/home/BioSection";
import { StatsSection } from "@/components/home/StatsSection";
import { GallerySection } from "@/components/home/GallerySection";
import { ReelSection } from "@/components/home/ReelSection";
import { ContactSection } from "@/components/home/ContactSection";
import { PageSeo } from "@/components/seo/PageSeo";
import { fetchBookManifest } from "@/lib/book-manifest";
import { SEO_COPY } from "@/lib/seo-config";

const Index = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    void queryClient.prefetchQuery({
      queryKey: ["book-manifest"],
      queryFn: fetchBookManifest,
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
      <BioSection />
      <StatsSection />
      <GallerySection />
      <ReelSection />
      <ContactSection />
    </>
  );
};

export default Index;
