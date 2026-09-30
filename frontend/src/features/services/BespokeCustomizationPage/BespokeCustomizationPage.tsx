import { bespokehero } from "@/assets";
import BespokeHero from "./components/BespokeHero";
import BespokeFeaturesSection from "./components/BespokeFeaturesSection";
import HowWeWorkSection from "@/features/categories/data/HowWeWorkSection";
import ClientFeedbackSection from "@/features/categories/componnets/ClientFeedbackSection";
import FAQSection from "@/features/home/components/FAQSection";
import CustomizationSection from "@/shared/components/sections/CustomizationSection";

export default function BespokeCustomizationPage() {
  return (
    <>
      <BespokeHero image={bespokehero} />
      <BespokeFeaturesSection />
      <CustomizationSection /> 
      <HowWeWorkSection />
      <ClientFeedbackSection />
      <FAQSection />
    </>
  );
}