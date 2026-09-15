import Footer from "@/shared/components/layout/Footer";
import Navbar from "@/shared/components/layout/Navbar";
import CategoriesSection from "./components/CategoriesSection";
import EngineeredBenchmarkSection from "./components/EngineeredBenchmarkSection";
import FAQSection from "./components/FAQSection";
import HeroSection from "./components/HeroSection";
import HeroTrustBadges from "./components/HeroTrustBadges";
import ManufacturingProcessSection from "./components/ManufacturingProcessSection";
import PartnershipProgramsSection from "./components/PartnershipProgramsSection";
import ProblemSolversSection from "./components/ProblemSolversSection";
import ScalingBrandsSection from "./components/ScalingBrandsSection";
import SustainabilityGoalsSection from "./components/SustainabilityGoalsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import ToolsResourcesSection from "./components/ToolsResourcesSection";
import TrustBadges from "./components/TrustBadges";
import WhatWeManufactureSection from "./components/WhatWeManufactureSection";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <HeroTrustBadges />
      <CategoriesSection />
      <ScalingBrandsSection />
      <TestimonialsSection />
      <ManufacturingProcessSection />
      <PartnershipProgramsSection />
      <EngineeredBenchmarkSection />
      <ProblemSolversSection />
      <SustainabilityGoalsSection />
      <WhatWeManufactureSection />
      <ToolsResourcesSection />
      <FAQSection />
      <TrustBadges />
      <Footer />
    </main>
  );
}
