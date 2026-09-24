import { useParams } from "react-router-dom";

import { programsService } from "@/shared/api/services/programsService";
import HeroTitle, { DEFAULT_HERO_CONFIG, HERO_CONFIGS } from "./components/HeroTitle";
import PartnershipApplyForm, { APPLY_CONFIGS, ApplyFormValues, DEFAULT_APPLY_CONFIG } from "./components/PartnershipApplyForm";
import Header, { DEFAULT_HEADER_CONFIG } from "./components/Header";

export default function ProgramApplyPage() {
  const { programId = "" } = useParams<{ programId: string }>();
  const id = programId.toLowerCase();

  const heroConfig = HERO_CONFIGS[id] || DEFAULT_HERO_CONFIG;
  const applyConfig = APPLY_CONFIGS[id] || DEFAULT_APPLY_CONFIG;

  const handleSubmit = async (values: ApplyFormValues) => {
    const response = await programsService.submitProgramApplication({
      program_id: id,
      program_name: applyConfig.brandName,
      full_name: values.full_name,
      email: values.email,
      phone: values.whatsapp,
      social_handle: values.social_handle,
      organization: values.organization,
      role: values.looking_for,
      experience_years: values.members,
      message: "",
      agree_terms: values.agree_terms,
    });
    return response;
  };

  return (
    <div className="bg-[#0A0A0A]">
    
      <section className="px-5 pb-16 pt-6 sm:px-8 lg:px-12">
        <HeroTitle config={heroConfig} className="mb-14" />
        <PartnershipApplyForm config={applyConfig} onSubmit={handleSubmit} />
      </section>
    </div>
  );
}

export { ProgramApplyPage };