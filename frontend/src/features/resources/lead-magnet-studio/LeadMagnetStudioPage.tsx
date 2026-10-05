import { motion } from "framer-motion";

import LeadMagnetHero from "./components/LeadMagnetHero";

import FAQSection from "@/features/home/components/FAQSection";
import ClientFeedbackSection from "@/features/categories/componnets/ClientFeedbackSection";

export default function LeadMagnetStudioPage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full"
    >
      <LeadMagnetHero />
        <ClientFeedbackSection />
           <FAQSection />
     
    </motion.main>
  );
}
