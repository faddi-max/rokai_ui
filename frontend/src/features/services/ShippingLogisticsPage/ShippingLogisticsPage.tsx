import { motion } from "framer-motion";
import HeroSection from "@/shared/components/sections/HeroSection";
import { useAsyncData } from "@/shared/hooks/useAsyncData";
import { servicesService } from "@/shared/api/services/servicesService";
import { DataLoader, PageLoader } from "@/shared/components/feedback";

import HowWeWorkSection from "@/features/categories/data/HowWeWorkSection";

import FAQSection from "@/features/home/components/FAQSection";
import MapSection from "../PrivateLabelManufacturingPage/components/MapSection";
import DefineBrandPresenceSection from "../PrivateLabelManufacturingPage/components/DefineBrandPresenceSection";

import { shippinglabelhero } from "./data/shippinglabelHero";
import ShippingOverviewSection from "./components/shippingOverviewSection";
import { shippingoverview, shippingproperty, shippingprotocol } from "@/assets";
import ShippingProprietaryCapabilities from "./components/shippingProprietaryCapabilities";
import WhatWeManufactureGridSection from "../PrivateLabelManufacturingPage/components/WhatWeManufactureGridSection";
import ShippingProtocolSection from "./components/shippingProtocolSection";

export default function ShippingLogisticsPage() {
  const { data, loading, error, refetch } = useAsyncData(() =>
    servicesService.getServicesPageData("shipping-logistics")
  );

  return (
    <DataLoader
      loading={loading}
      error={error}
      data={data}
      skeleton={<PageLoader message="LOADING PROGRAM DETAILS..." />}
      onRetry={refetch}
    >
      {(pageData) => (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full"
        >
            <HeroSection {...shippinglabelhero} />
            <ShippingOverviewSection image={shippingoverview} />
            <ShippingProtocolSection image={shippingprotocol} />
            <WhatWeManufactureGridSection />
            <ShippingProprietaryCapabilities image={shippingproperty}/>
  
     <HowWeWorkSection />
     <DefineBrandPresenceSection />
   
 
            <FAQSection />
            <MapSection />
           
         
        </motion.div>
      )}
    </DataLoader>
  );
}