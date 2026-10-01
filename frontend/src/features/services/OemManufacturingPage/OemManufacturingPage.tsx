import HeroSection from "@/shared/components/sections/HeroSection";
import OEMOverviewSection from "./components/OEMOverviewSection";
import { oemHero } from "./data/oemHero";
import { oemhero, oemindustry } from "@/assets";
import WhatWeManufactureGridSection from "../PrivateLabelManufacturingPage/components/WhatWeManufactureGridSection";
import HowWeWorkSection from "@/features/categories/data/HowWeWorkSection";
import IndustrialProtocolSection from "./components/IndustrialProtocolSection";
import DefineBrandPresenceSection from "../PrivateLabelManufacturingPage/components/DefineBrandPresenceSection";
import FAQSection from "@/features/home/components/FAQSection";
import MapSection from "../PrivateLabelManufacturingPage/components/MapSection";
import ProprietaryCapabilitiesSection from "./components/ProprietaryCapabilitiesSection";
import { useAsyncData } from "@/shared/hooks/useAsyncData";
import { servicesService } from "@/shared/api/services/servicesService";

export const OemManufacturingPage = () => {
  const { data } = useAsyncData(() =>
    servicesService.getServicesPageData("oem-manufacturing")
  );
  const hero = data?.hero || oemHero;
  console.log("OEM Manufacturing Page Data:", data); // Debugging line to check the fetched data

  return (
    <>
      <HeroSection {...hero} />
    <OEMOverviewSection image={oemhero}/>
     <IndustrialProtocolSection image={oemindustry} />
    <WhatWeManufactureGridSection />
   
   
     <ProprietaryCapabilitiesSection image={oemhero} />
     <HowWeWorkSection />
     <DefineBrandPresenceSection />
   
 
            <FAQSection />
            <MapSection />
  </>
  );
};

