import HeroSection from "@/shared/components/sections/HeroSection";
import { catalogueHeroContent } from "../data/catalogueHeroContent";
import type { HeroContent } from "@/shared/types/hero";

interface CatalogueHeroProps {
  hero?: HeroContent;
}

export default function CatalogueHero({ hero = catalogueHeroContent }: CatalogueHeroProps) {
  return <HeroSection {...hero} fullWidthBackground />;
}