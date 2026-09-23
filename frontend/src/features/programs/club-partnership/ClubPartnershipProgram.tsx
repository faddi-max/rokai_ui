import { motion } from "framer-motion";
import HeroSection from "@/shared/components/sections/HeroSection";
import { useAsyncData } from "@/shared/hooks/useAsyncData";
import { categoriesService } from "@/shared/api/services/categoriesService";
import { DataLoader, PageLoader } from "@/shared/components/feedback";

import ClientFeedbackSection from "@/features/categories/componnets/ClientFeedbackSection";
import HowWeWorkSection from "@/features/categories/data/HowWeWorkSection";
import FAQSection from "../../home/components/FAQSection";
import ProgramOverviewSection from "../ambassador-program/components/ProgramOverviewSection";
import { clubPartnershipOverview } from "./data/programData";
import WhoIsForSection from "../ambassador-program/components/WhoIsForSection";
import BenefitsSection from "../ambassador-program/components/BenefitsSection";
import WhatYourClubUnlocksSection from "./components/Whatyourclubunlockssection";
import ExpectationsSection from "../ambassador-program/components/ExpectationsSection";
import ROIBreakdownSection from "./components/ROIBreakdownSection";
import GuaranteeSection from "./components/GuaranteeSection";

export default function ClubPartnershipProgram() {
  const { data, loading, error, refetch } = useAsyncData(() =>
    categoriesService.clubPartnershipPageData()
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
 <ProgramOverviewSection
        data={clubPartnershipOverview}
      />
      <WhatYourClubUnlocksSection />
      <ROIBreakdownSection />
      <GuaranteeSection />
    
     <WhoIsForSection />
      <ExpectationsSection /> 
  <FAQSection  />
          </motion.div>
        </motion.div>
      )}
    </DataLoader>
  );
}