

import { programsService } from "@/shared/api/services/programsService";
import { useParams } from "react-router-dom";
import HeroTitle, { HERO_CONFIGS } from "./components/HeroTitle";
import PartnershipApplyForm, { APPLY_CONFIGS } from "./components/PartnershipApplyForm";

export default function PartnershipPage() {
  const { programId = "partnership" } = useParams<{ programId?: string }>();

  return (
    <section className="bg-[#0A0A0A] py-16 px-5">
      <HeroTitle config={HERO_CONFIGS[programId]} className="mb-14" />

      <PartnershipApplyForm
        config={APPLY_CONFIGS[programId]}
        onSubmit={(values) =>
          programsService.submitProgramApplication({
            program_id: programId,
            program_name: APPLY_CONFIGS[programId].brandName,
            full_name: values.full_name,
            email: values.email,
            phone: values.whatsapp,
            social_handle: values.social_handle,
            organization: values.organization,
            role: values.looking_for,
            experience_years: values.members,
            message: "",
            agree_terms: values.agree_terms,
          })
        }
      />
    </section>
  );
}