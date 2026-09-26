import HeroSection from "@/shared/components/sections/HeroSection";

import HowWeWorkSection from "@/features/categories/data/HowWeWorkSection";

import DefineBrandPresenceSection from "../PrivateLabelManufacturingPage/components/DefineBrandPresenceSection";
import FAQSection from "@/features/home/components/FAQSection";
import MapSection from "../PrivateLabelManufacturingPage/components/MapSection";
import { customelabelhero } from "./data/customlabelHero";
import LabelOverviewSection from "./components/LabelOverviewSection";
import { labeloverview, labelproperty, labelprotocol } from "@/assets";
import LabelProcessSection from "../PrivateLabelManufacturingPage/components/LabelProcessSection";
import LabelProtocolSection from "./components/LabelProtocolSection";
import WhatWeManufactureGridSection from "../PrivateLabelManufacturingPage/components/WhatWeManufactureGridSection";
import LabelProprietaryCapabilities from "./components/LabelProprietaryCapabilities";



export const CustomLabelPackagingPage = () => (
  <>
    <HeroSection {...customelabelhero} />
    <LabelOverviewSection image={labeloverview} />
   <LabelProtocolSection image={labelprotocol}/>
   <WhatWeManufactureGridSection />
   <LabelProprietaryCapabilities image={labelproperty} />
     <HowWeWorkSection />
     <DefineBrandPresenceSection />
   
 
            <FAQSection />
            <MapSection />
  </>
);
