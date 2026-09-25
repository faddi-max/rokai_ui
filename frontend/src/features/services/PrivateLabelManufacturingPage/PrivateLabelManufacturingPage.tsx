import { motion } from "framer-motion";
import HeroSection from "@/shared/components/sections/HeroSection";
import { useAsyncData } from "@/shared/hooks/useAsyncData";
import { categoriesService } from "@/shared/api/services/categoriesService";
import { DataLoader, PageLoader } from "@/shared/components/feedback";

import HowWeWorkSection from "@/features/categories/data/HowWeWorkSection";
import ClientFeedbackSection from "@/features/categories/componnets/ClientFeedbackSection";
import FAQSection from "@/features/home/components/FAQSection";
import PrivateLabelProcessSection from "./components/PrivateLabelProcessSection";
import WhatWeManufactureGridSection from "./components/WhatWeManufactureGridSection";
import BuiltAroundBrandSection from "./components/BuiltAroundBrandSection";
import BrandSystemSection from "./components/BrandSystemSection";
import DesignToProductSection from "./components/DesignToProductSection";
import MaterialsQualitySection from "./components/MaterialsQualitySection";
import BrandingPackagingSection from "./components/BrandingPackagingSection";
import ProductionFitSection from "./components/ProductionFitSection";
import PreviousWorkSection from "./components/PreviousWorkSection";
import WhoWeManufactureForSection from "./components/WhoWeManufactureForSection";
import MapSection from "./components/MapSection";
import DefineBrandPresenceSection from "./components/DefineBrandPresenceSection";




export default function PrivateLabelManufacturingPage() {
  const { data, loading, error, refetch } = useAsyncData(() =>
    categoriesService.ServicesPrivateLabelManufacture()
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
          <HeroSection {...pageData.hero} />
          <PrivateLabelProcessSection />
          <WhatWeManufactureGridSection />
          <BuiltAroundBrandSection />
          <BrandSystemSection />
          <DesignToProductSection />


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
    
            <HowWeWorkSection />
            <MaterialsQualitySection />
            <BrandingPackagingSection />
            <ProductionFitSection />
            <PreviousWorkSection />
            <WhoWeManufactureForSection />
            <DefineBrandPresenceSection />
 
            <FAQSection />
            <MapSection />
           
          </motion.div>
        </motion.div>
      )}
    </DataLoader>
  );
}