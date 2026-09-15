import {
  clubPartnershipImage,
  sponsorshipProgramImage,
  ambassadorProgramImage,
  affiliateProgramImage,
} from "@/assets";

export interface PartnershipProgram {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaHref: string;
}

export const partnershipProgramsHeading = {
  titleTop: "ROKAI: FUELING THE GRIND.",
  titleBottomLines: ["ENGINEERING INFINITE", "PARTNERSHIPS."],
  description:
    "Empowering BJJ academies, coaches and brands with scalable solutions. Our programs are built to strengthen your identity, increase revenue and unify your students through premium BJJ apparel.",
};

export const partnershipPrograms: PartnershipProgram[] = [
  {
    id: "club-partnership",
    image: clubPartnershipImage,
    title: "Club Partnership Program",
    subtitle: "TURN YOUR ACADEMY INTO A BRANDED BJJ POWERHOUSE",
    description:
      "We help BJJ academies design and manufacture premium custom apparel that strengthens team identity, increases student retention, and opens new revenue opportunities through branded merchandise.",
    ctaText: "Limited partnerships available each month.",
    ctaHref: "#club-partnership-program",
  },
  {
    id: "sponsorship",
    image: sponsorshipProgramImage,
    title: "Sponsorship Program",
    subtitle: "EXCLUSIVE BJJ SPONSORSHIP FOR SELECTED ACADEMIES ONLY",
    description:
      "We partner with a limited number of serious BJJ gyms each month to provide high-performance custom gear and branding support. If you qualify, you'll be contacted for onboarding immediately.",
    ctaText: "Limited partnerships available each month.",
    ctaHref: "#sponsorship-program",
  },
  {
    id: "ambassador",
    image: ambassadorProgramImage,
    title: "Ambassador Program",
    subtitle: "REP PREMIUM BJJ APPAREL AND GROW YOUR PERSONAL BRAND",
    description: "Earn commissions while promoting high-performance Jiu Jitsu apparel.",
    ctaText: "Join The Rokai Inner Circle",
    ctaHref: "#ambassador-program",
  },
  {
    id: "affiliate",
    image: affiliateProgramImage,
    title: "Affiliate Program",
    subtitle: "MONETIZE YOUR AUDIENCE WITH PREMIUM BJJ GEAR AND APPAREL",
    description: "Earn passive income by offering trusted Brazilian Jiu Jitsu gear.",
    ctaText: "Start Earning Commissions",
    ctaHref: "#affiliate-program",
  },
];
