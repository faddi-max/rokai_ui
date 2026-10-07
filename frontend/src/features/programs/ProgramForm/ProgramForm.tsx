import { useParams } from "react-router-dom";
import {
  partnershipApplicationsService,
  resolveApplicationType,
  type PartnershipApplicationPayload,
} from "@/shared/api/services/partnershipApplicationsService";
import HeroTitle, { DEFAULT_HERO_CONFIG, HERO_CONFIGS } from "./components/HeroTitle";
import PartnershipApplyForm, {
  APPLY_CONFIGS,
  ApplyFormValues,
  DEFAULT_APPLY_CONFIG,
} from "./components/PartnershipApplyForm";

export default function PartnershipPage() {
  const { programId = "partnership" } = useParams<{ programId?: string }>();
  const id = programId.toLowerCase();

  const heroConfig =
    HERO_CONFIGS[id] ||
    (id === "club" ? HERO_CONFIGS.partnership : DEFAULT_HERO_CONFIG);
  const applyConfig =
    APPLY_CONFIGS[id] ||
    (id === "club" ? APPLY_CONFIGS.partnership : DEFAULT_APPLY_CONFIG);

  const handleSubmit = async (values: ApplyFormValues) => {
    const type = resolveApplicationType(id);

    const payload: PartnershipApplicationPayload = {
      type,
      full_name: values.full_name.trim(),
      email: values.email.trim(),
      whatsapp_number: values.whatsapp.trim(),
      gym_academy_name: values.organization ? values.organization.trim() : undefined,
      instagram_website: values.social_handle ? values.social_handle.trim() : undefined,
      number_of_members: values.members ? values.members.trim() : undefined,
      looking_for: values.looking_for ? values.looking_for.trim().toUpperCase() : "BOTH",
      agreed_to_terms: Boolean(values.agree_terms),
    };

    return await partnershipApplicationsService.submitApplication(payload);
  };

  return (
    <section className="bg-[#0A0A0A] py-16 px-5">
      <HeroTitle config={heroConfig} className="mb-14" />
      <PartnershipApplyForm config={applyConfig} onSubmit={handleSubmit} />
    </section>
  );
}