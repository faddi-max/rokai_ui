import HeroSection from "@/shared/components/sections/HeroSection";
import { catalogueHeroContent } from "../data/catalogueHeroContent";

export default function CatalogueHero() {
  return <HeroSection {...catalogueHeroContent} fullWidthBackground />;
}