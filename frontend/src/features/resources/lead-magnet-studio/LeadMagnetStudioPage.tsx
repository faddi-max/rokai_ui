import { motion } from "framer-motion";

import LeadMagnetHero from "./components/LeadMagnetHero";

import AcademyIntelligenceForm from "./components/AcademyIntelligenceForm";

import FAQSection from "@/features/home/components/FAQSection";
import ClientFeedbackSection from "@/features/categories/componnets/ClientFeedbackSection";
import EliteStandardsSection from "./components/EliteStandardsSection";

export default function LeadMagnetStudioPage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full"
    >
      <LeadMagnetHero />
      <EliteStandardsSection />
      <AcademyIntelligenceForm />
      <ClientFeedbackSection />
      <FAQSection />
    </motion.main>
  );
}