import { motion } from "framer-motion";
import HeroSection from "@/shared/components/sections/HeroSection";
import { useAsyncData } from "@/shared/hooks/useAsyncData";
import { categoriesService } from "@/shared/api/services/categoriesService";
import { DataLoader, PageLoader } from "@/shared/components/feedback";

import HowWeWorkSection from "@/features/categories/data/HowWeWorkSection";
import ClientFeedbackSection from "@/features/categories/componnets/ClientFeedbackSection";
import FAQSection from "@/features/home/components/FAQSection";
import TrendingBlogsSection from "../blogs/components/TrendingBlogsSection";


export default function ResourcesPage() {
  const { data, loading, error, refetch } = useAsyncData(() =>
    categoriesService.getresourcesPageData()
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
    
         
        
         <TrendingBlogsSection />  
  <FAQSection  />
           
          </motion.div>
        </motion.div>
      )}
    </DataLoader>
  );
}