import CategoriesSection from "../../shared/components/sections/CategoriesSection";
import EngineeredBenchmarkSection from "./components/EngineeredBenchmarkSection";
import FAQSection from "./components/FAQSection";
import HeroSection from "./components/HeroSection";
import HeroTrustBadges from "./components/HeroTrustBadges";
import ManufacturingProcessSection from "./components/ManufacturingProcessSection";
import PartnershipProgramsSection from "./components/PartnershipProgramsSection";

import ScalingBrandsSection from "./components/ScalingBrandsSection";
import SustainabilityGoalsSection from "./components/SustainabilityGoalsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import ToolsResourcesSection from "./components/ToolsResourcesSection";
import TrustBadges from "./components/TrustBadges";
import WhatWeManufactureSection from "./components/WhatWeManufactureSection";
import { categories } from "./data/categories";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <HeroTrustBadges />
        <CategoriesSection
        eyebrow="Premium Quality"
        headingLine1="BJJ Apparel"
        headingLine2="Categories"
        description="Technical fightwear developed around movement, durability and a clear brand point of view."
        categories={categories}
      />
      <ScalingBrandsSection />
      <TestimonialsSection />
      <ManufacturingProcessSection />
      <PartnershipProgramsSection />
      <EngineeredBenchmarkSection />
    
      <SustainabilityGoalsSection />
      <WhatWeManufactureSection />
      <ToolsResourcesSection />
      <FAQSection />
      <TrustBadges />
    </div>
  );
}
