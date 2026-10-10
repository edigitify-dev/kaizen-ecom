import ZipperPreloader from "@/components/preloader/ZipperPreloader";
import HeroSection from "@/components/hero/HeroSection";
import ProductRail from "@/components/products/ProductRail";
import MovementSection from "@/components/hero/MovementSection";
import CollectionSection from "@/components/collections/CollectionSection";
import BrandStory from "@/components/story/BrandStory";
import JournalSection from "@/components/journal/JournalSection";

export default function Home() {
  return (
    <>
      <ZipperPreloader />
      <HeroSection />
      <ProductRail />
      <MovementSection />
      <CollectionSection />
      <BrandStory />
      <JournalSection />
    </>
  );
}
