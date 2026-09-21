import { motion } from "framer-motion";
import HeroSection from "@/shared/components/sections/HeroSection";
import { useAsyncData } from "@/shared/hooks/useAsyncData";
import { categoriesService } from "@/shared/api/services/categoriesService";
import { DataLoader, PageLoader } from "@/shared/components/feedback";
import ProgramOverviewSection from "./components/ProgramOverviewSection";
import PartnershipSection from "./components/PartnershipSection";
import WhoIsForSection from "./components/WhoIsForSection";
import BenefitsSection from "./components/BenefitsSection";
import ExpectationsSection from "./components/ExpectationsSection";;
import ClientFeedbackSection from "@/features/categories/componnets/ClientFeedbackSection";
import HowWeWorkSection from "@/features/categories/data/HowWeWorkSection";
import FAQSection from "../../home/components/FAQSection";
export default function AmbassadorProgramPage() {
  const { data, loading, error, refetch } = useAsyncData(() =>
    categoriesService.getAmbassadorPageData()
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
           <ProgramOverviewSection />
           <PartnershipSection />
           <WhoIsForSection />
           <BenefitsSection />
           <ExpectationsSection />
            <HowWeWorkSection />
  <ClientFeedbackSection />
  <FAQSection  />
          </motion.div>
        </motion.div>
      )}
    </DataLoader>
  );
}