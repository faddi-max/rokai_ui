import { motion } from "framer-motion";
import HeroSection from "@/shared/components/sections/HeroSection";
import { useAsyncData } from "@/shared/hooks/useAsyncData";
import { categoriesService } from "@/shared/api/services/categoriesService";
import { DataLoader, PageLoader } from "@/shared/components/feedback";
import SectionHeaderblog from "@/shared/components/sections/SectionHeaderblog";
import HowWeWorkSection from "@/features/categories/data/HowWeWorkSection";
import ClientFeedbackSection from "@/features/categories/componnets/ClientFeedbackSection";
import FAQSection from "@/features/home/components/FAQSection";
import ProgramOverviewSection from "../ambassador-program/components/ProgramOverviewSection";
import { ambassadorProgramOverview, sponsorshipProgramOverview } from "../ambassador-program/data/programData";
import ClubSponsorshipValueSystem from "./components/ClubSponsorshipValueSystem";
import EquipYourAcademySection from "./components/EquipYourAcademySection";
import HeroTrustBadges from "@/features/home/components/HeroTrustBadges";


export default function SponsorshipProgram() {
  const { data, loading, error, refetch } = useAsyncData(() =>
    categoriesService.getsponsershipPageData()
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

<HeroTrustBadges />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
     <ProgramOverviewSection
           data={sponsorshipProgramOverview}
         />
         
         <ClubSponsorshipValueSystem />
         <EquipYourAcademySection />
            <HowWeWorkSection />
  <ClientFeedbackSection />
  <FAQSection  />
           
          </motion.div>
        </motion.div>
      )}
    </DataLoader>
  );
}