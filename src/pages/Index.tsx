import { HeroSection } from "@/components/home/HeroSection";
import { BioSection } from "@/components/home/BioSection";
import { StatsSection } from "@/components/home/StatsSection";
import { GallerySection } from "@/components/home/GallerySection";
import { ReelSection } from "@/components/home/ReelSection";
import { ContactSection } from "@/components/home/ContactSection";

const Index = () => {
  return (
    <>
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
