import HeroSection from "@/shared/components/sections/HeroSection";
import OEMOverviewSection from "./components/OEMOverviewSection";
import { oemHero } from "./data/oemHero";
import { oemhero } from "@/assets";

export const OemManufacturingPage = () => (
  <>
    <HeroSection {...oemHero} />
    <OEMOverviewSection image={oemhero}/>
  </>
);
