import { HeroSection } from "@/components/home/HeroSection";
import { BioSection } from "@/components/home/BioSection";
import { StatsSection } from "@/components/home/StatsSection";
import { GallerySection } from "@/components/home/GallerySection";
import { ReelSection } from "@/components/home/ReelSection";
import { ContactSection } from "@/components/home/ContactSection";
import { PageSeo } from "@/components/seo/PageSeo";
import { SEO_COPY } from "@/lib/seo-config";

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
      <GallerySection />
      <ReelSection />
      <ContactSection />
    </>
  );
};

export default Index;
