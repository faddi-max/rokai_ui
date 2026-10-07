import { abouthero } from "@/assets";
import ContactHero from "./components/ContactHero";
import GeneralInquirySection, {
  type GeneralInquiryValues,
} from "./components/GeneralInquirySection";
import FindRokaiSection from "./components/FindRokaiSection";
import StartProjectCtaSection from "../AboutUs/components/StartProjectCtaSection";
import { inquiriesService } from "@/shared/api/services/inquiriesService";

export const ContactPage = () => {
  const handleInquirySubmit = async (values: GeneralInquiryValues) => {
    return await inquiriesService.submitInquiry({
      name: values.name.trim(),
      brand_name: values.brandName.trim(),
      email: values.email.trim(),
      inquiry_type: values.inquiryType.trim(),
      message: values.message.trim(),
      attachment: values.attachment,
    });
  };

  return (
    <div>
      <ContactHero image={abouthero} />
      <div id="general-inquiry">
        <GeneralInquirySection onSubmit={handleInquirySubmit} />
      </div>
      <FindRokaiSection />
      <StartProjectCtaSection
        eyebrow="Have a product in mind"
        title="READY TO MOVE FROM"
        highlight="CONVERSATION TO CREATION?"
        description="If your inquiry is about manufacturing, specifications, sampling or production, take the next step through ROKAI's dedicated project process."
        secondaryCta={{ label: "Send a General Inquiry", href: "#general-inquiry" }}
        primaryCta={{ label: "Start a project", href: "/programs/apply/partnership" }}
      />
    </div>
  );
};

export default ContactPage;