import { aboutenquiry, abouthero, aboutprocess, aboutsell } from "@/assets";
import AboutHero from "./components/AboutHero";
import RokaiDifferenceSection from "./components/RokaiDifferenceSection";
import ManufacturingProofSection from "./components/ManufacturingProofSection";
import AboutCustomManufacturingSection from "./components/AboutCustomManufacturingSection";
import EnquiryToExportSection from "./components/EnquiryToExportSection";
import DifferentBuyersSection from "./components/DifferentBuyersSection";
import StoryBehindSection from "./components/StoryBehindSection";
import QualityProcessSection from "./components/QualityProcessSection";
import SustainabilityGoalsSection from "../home/components/SustainabilityGoalsSection";
import StartProjectCtaSection from "./components/StartProjectCtaSection";

export default function AboutUs() {
    return <>
       <AboutHero image={abouthero} />
       <RokaiDifferenceSection image={aboutsell} />
       <ManufacturingProofSection image={aboutprocess} />
       <AboutCustomManufacturingSection />
       <EnquiryToExportSection image={aboutenquiry} />
       <DifferentBuyersSection />
       <StoryBehindSection />
       <QualityProcessSection />
       <SustainabilityGoalsSection />
       <StartProjectCtaSection />
    </>;
}