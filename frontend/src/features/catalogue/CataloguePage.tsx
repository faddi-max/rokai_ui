import ClientFeedbackSection from "../categories/componnets/ClientFeedbackSection";
import HowWeWorkSection from "../categories/data/HowWeWorkSection";
import FAQSection from "../home/components/FAQSection";
import CatalogueHero from "./components/CatalogueHero";
import DownloadGuidesSection from "./components/DownloadGuidesSection";

export default function CataloguePage() {
  return (
    <main className="w-full">
      <CatalogueHero />
       <DownloadGuidesSection />
      <HowWeWorkSection />
      <ClientFeedbackSection />
      <FAQSection />
    </main>
  );
}