import { bespokehero } from "@/assets";
import BespokeHero from "./components/BespokeHero";
import BespokeFeaturesSection from "./components/BespokeFeaturesSection";
import HowWeWorkSection from "@/features/categories/data/HowWeWorkSection";
import ClientFeedbackSection from "@/features/categories/componnets/ClientFeedbackSection";
import FAQSection from "@/features/home/components/FAQSection";
import CustomizationSection from "@/shared/components/sections/CustomizationSection";
import { DataLoader } from "@/shared/components/feedback";
import { useAsyncData } from "@/shared/hooks/useAsyncData";
import {
  customizationService,
  buildSliderItems,
} from "@/shared/api/services/customizationService";

export default function BespokeCustomizationPage() {
  const { data, loading, error, refetch } = useAsyncData(() =>
    customizationService.getCustomizationCategories()
  );

  return (
    <>
      <BespokeHero image={bespokehero} />
      <BespokeFeaturesSection />

      <DataLoader
        loading={loading}
        error={error}
        data={data}
    
        skeleton={<div className="min-h-[600px] bg-black" aria-busy="true" />}
        onRetry={refetch}
      >
        {(categories) => (
          <CustomizationSection
            categories={categories}
            sliderItems={buildSliderItems(categories)}
          />
        )}
      </DataLoader>

      <HowWeWorkSection />
      <ClientFeedbackSection />
      <FAQSection />
    </>
  );
}