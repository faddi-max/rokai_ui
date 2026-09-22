import {
  clubPartnershipImage,
  sponsorshipProgramImage,
  ambassadorProgramImage,
  affiliateProgramImage,
} from "@/assets";

export interface PartnershipStat {
  line1: string;
  line2: string;
  line3: string;
}

export interface PartnershipProgram {
  id: string;
  image: string;
  eyebrow: string;
  headingRed: string;
  headingWhite: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  stat: PartnershipStat;
}

export const partnershipProgramsHeading = {
  eyebrow: "Partnerships",
  titleWhite: "PARTNER WITH",
  titleRed: "ROKAI",
  description:
    "Programs for combat sports brands, academies, athletes and partners building with ROKAI.",
};

export const partnershipPrograms: PartnershipProgram[] = [
  {
    id: "club-partnership",
    image: clubPartnershipImage,
    eyebrow: "Club Partnership Program",
    headingRed: "Grow Your Academy",
    headingWhite: "With ROKAI",
    description:
      "Custom apparel and teamwear developed around your academy's identity, with production support built for bulk orders and member merchandise.",
    ctaText: "Join the Program",
    ctaHref: "#club-partnership-program",
    // TODO (content team): no verified figure exists yet for this program.
    // Replace with a real, approved stat before publishing — see doc's
    // Editorial Guardrails on unsupported numerical claims.
    stat: { line1: "Built For", line2: "Academies", line3: "Worldwide" },
  },
  {
    id: "sponsorship",
    image: sponsorshipProgramImage,
    eyebrow: "Sponsorship Program",
    headingRed: "Take Your Academy",
    headingWhite: "Further",
    description:
      "Selective support for academies through custom gear, branding and long-term manufacturing partnership.",
    ctaText: "Explore Sponsorship",
    ctaHref: "#sponsorship-program",
    stat: { line1: "Selective", line2: "Partner", line3: "Program" },
  },
  {
    id: "ambassador",
    image: ambassadorProgramImage,
    eyebrow: "Ambassador Program",
    headingRed: "Represent ROKAI.",
    headingWhite: "Inspire Others.",
    description:
      "A selective partnership for athletes who represent discipline, performance and the values ROKAI is built on.",
    ctaText: "Join the Inner Circle",
    ctaHref: "/programs#ambassador",
    stat: { line1: "Limited", line2: "Athlete", line3: "Selection" },
  },
  {
    id: "affiliate",
    image: affiliateProgramImage,
    eyebrow: "Affiliate Program",
    headingRed: "Share the Gear.",
    headingWhite: "Earn With ROKAI.",
    description:
      "Recommend performance-driven combat sports apparel to your audience and earn commission on qualifying orders.",
    ctaText: "Start Earning",
    ctaHref: "/programs",
    stat: { line1: "Commission", line2: "On Every", line3: "Referral" },
  },
];