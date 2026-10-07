import { useAsyncData } from "@/shared/hooks/useAsyncData";
import { cataloguesService } from "@/shared/api/services/cataloguesService";
import { DataLoader, PageLoader } from "@/shared/components/feedback";
import ClientFeedbackSection from "../categories/componnets/ClientFeedbackSection";
import HowWeWorkSection from "../categories/data/HowWeWorkSection";
import FAQSection from "../home/components/FAQSection";
import CatalogueHero from "./components/CatalogueHero";
import DownloadGuidesSection from "./components/DownloadGuidesSection";

export default function CataloguePage() {
  const { data, loading, error, refetch } = useAsyncData(() =>
    cataloguesService.getCataloguePageData()
  );

  return (
    <DataLoader
      loading={loading}
      error={error}
      data={data}
      skeleton={<PageLoader message="LOADING ROKAI CATALOGUES..." />}
      onRetry={refetch}
    >
      {(pageData) => (
        <main className="w-full">
          <CatalogueHero hero={pageData.hero} />
          <DownloadGuidesSection guides={pageData.catalogues} />
          <HowWeWorkSection />
          <ClientFeedbackSection />
          <FAQSection />
        </main>
      )}
    </DataLoader>
  );
}