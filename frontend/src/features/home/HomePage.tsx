import SeoHead from "@/shared/seo/SeoHead";
import { homeSeo, homeJsonLd } from "./data/home.seo";
import CategoriesSection from "../../shared/components/sections/CategoriesSection";
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
import CapabilitiesSection from "./components/CapabilitiesSection";
import WhyRokaiSection from "@/shared/components/sections/WhyRokaiSection";

export default function HomePage() {
  return (
    <>
      <SeoHead {...homeSeo} jsonLd={homeJsonLd} />
      <main className="min-h-screen">
        <HeroSection />
        <HeroTrustBadges />
        <CategoriesSection
          eyebrow="Combat sports apparel categories"
          headingLine1="Fightwear developed for"
          headingLine2="your sport and brand."
          description="From training essentials to competition-ready fightwear, ROKAI develops apparel systems around the demands of each combat sport."
          categories={categories}
        />
        <ScalingBrandsSection />
        <TestimonialsSection />
        <ManufacturingProcessSection />
        <PartnershipProgramsSection />
        <CapabilitiesSection />
        <WhyRokaiSection />
        <SustainabilityGoalsSection />
        <WhatWeManufactureSection />
        <ToolsResourcesSection />
        <FAQSection />
        <TrustBadges />
      </main>
    </>
  );
}