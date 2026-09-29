import { useNavigate, useParams } from "react-router-dom";
import { LEGAL_DOCUMENTS } from "./data/legalDocuments";
import LegalPageLayout from "@/shared/components/sections/LegalPageLayout";
import { abouthero } from "@/assets";

export default function PrivacyPolicy() {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();
  const activeSlug = LEGAL_DOCUMENTS.some((d) => d.slug === slug) ? slug! : LEGAL_DOCUMENTS[0].slug;

  return (
    <LegalPageLayout
      documents={LEGAL_DOCUMENTS}
      activeSlug={activeSlug}
      onTabChange={(newSlug) => navigate(`/legal/${newSlug}`)}
      image={abouthero}
      imageAlt="Rokai combat sports apparel"
    />
  );
}