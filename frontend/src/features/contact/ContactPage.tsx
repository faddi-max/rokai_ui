import { abouthero } from "@/assets";
import ContactHero from "./components/ContactHero";
import GeneralInquirySection from "./components/GeneralInquirySection";
import FindRokaiSection from "./components/FindRokaiSection";
import StartProjectCtaSection from "../AboutUs/components/StartProjectCtaSection";

export const ContactPage = () => {
  return (
    <div>
     <ContactHero image={abouthero}  />
     <GeneralInquirySection
  onSubmit={()=>{}}
/>
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
}