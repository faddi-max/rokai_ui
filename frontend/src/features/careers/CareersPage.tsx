import { abouthero,  mainimage,
  secondaryimage, } from "@/assets";

import ContactHero from "@/features/contact/components/ContactHero";
import MarqueeBar from "./components/MarqueeBar";
import CareersTeamSection from "./components/CareersTeamSection";
import ClientFeedbackSection from "../categories/componnets/ClientFeedbackSection";
import FAQSection from "../home/components/FAQSection";
import CareerCultureSection from "./components/CareerCultureSection";
import WhyWorkWithUsSection from "./components/WhyWorkWithUsSection";
import FounderSpeakSection from "./components/FounderSpeakSection";
import OpenRolesSection from "./components/OpenRolesSection";


const CAREERS_MARQUEE_ITEMS = [
  "Craftsmanship",
  "Integrity",
  "Growth",
  "Responsibility",
  "Community",
  "Excellence",
];

export default function CareersPage() {
  return (
    <main>
      <ContactHero
        image={abouthero}
        imageAlt="ROKAI apparel"
        eyebrow="Careers at Rokai"
        headingWhite="Build your future"
        headingRed="with purpose"
        description="At Brikly, we're not just constructing homes and commercial spaces, we're building trust, opportunity, and lasting impact across Central Texas. Join people who take pride in what they build and how they build it."
        primaryCta={{ label: "Explore our Roles", href: "#career-opportunities" }}
        secondaryCta={{ label: "Our Culture", href: "/contact" }}
        iscontactPage={false}
      />

      <MarqueeBar items={CAREERS_MARQUEE_ITEMS} />

      <CareersTeamSection
        mainImage={mainimage}
        secondaryImage={secondaryimage}
      />
      <CareerCultureSection />
      <WhyWorkWithUsSection />
      <FounderSpeakSection />
      <OpenRolesSection />
      <ClientFeedbackSection />
      <FAQSection />
    </main>
  );
}