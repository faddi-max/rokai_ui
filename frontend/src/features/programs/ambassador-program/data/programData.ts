import {
  whatisambassador,
sponser
} from "@/assets";

export type ProgramOverviewData = {
  eyebrow: string;
  title: string;
  highlight: string;
  afterHighlight: string;

  image: string;
  imageAlt: string;
  imageLabel: string;
  imageNumber: string;

  overviewLabel: string;

  paragraphs: string[];

  selectionLabel: string;
  selectionText: string;

  primaryCta: string;
  primaryCtaHref: string;

  secondaryCta: string;
  secondaryCtaHref: string;

  watermark: string;
};

export const ambassadorProgramOverview: ProgramOverviewData = {
  eyebrow: "A selective partnership",

  title: "What is the",

  highlight: "ROKAI AMBASSADOR",

  afterHighlight: " PROGRAM?",

  image: whatisambassador,

  imageAlt: "Brazilian Jiu-Jitsu athlete training",

  imageLabel: "Built through discipline",

  imageNumber: "ROKAI / 01",

  overviewLabel: "01 — Program Overview",

  paragraphs: [
    "The ROKAI Ambassador Program is a selective partnership built for Brazilian Jiu-Jitsu athletes who live the values of discipline, performance, and constant growth on and off the mats. This isn't a typical sponsorship you casually apply for. It's an invitation into a system designed to elevate athletes who already stand out through their mindset, consistency, and commitment to the art.",

    "We don't look for numbers alone, we look for presence, professionalism, and the ability to represent something bigger than yourself.",

    "ROKAI Ambassadors don't just compete—they represent discipline in training, resilience in competition, and evolution in every phase of their journey.",
  ],

  selectionLabel: "Limited selection",

  selectionText: "Only a few athletes will be selected this month.",

  primaryCta: "Apply to become an ambassador",

  primaryCtaHref: "#apply",

  secondaryCta: "View selection process",

  secondaryCtaHref: "#selection-process",

  watermark: "AMBASSADOR",
};
export const sponsorshipProgramOverview: ProgramOverviewData = {
  eyebrow: "More than sponsorship",

  title: "IT'S A",

  highlight: "GROWTH ENGINE",

  afterHighlight: " FOR YOUR ACADEMY.",

  image: sponser,

  imageAlt: "Brazilian Jiu-Jitsu club training",

  imageLabel: "Built through discipline",

  imageNumber: "ROKAI / 01",

  overviewLabel: "01 — Program Overview",

  paragraphs: [
    "ROKAI doesn't just sponsor teams. We build dominant academies. This is not about free gear. This is about giving your club a competitive edge, a stronger brand presence, and a scalable revenue stream.",

    "While other brands send products, we integrate as your dedicated production partner, controlling everything from fiber to freight, so you never face delays, inconsistency, or quality compromises again.",

    "We understand the culture, the expectations, and what it takes to operate professionally and grow faster.",
  ],

  selectionLabel: "Limited selection",

  selectionText: "ONLY A FEW ATHLETES WILL BE SELECTED THIS MONTH.",

  primaryCta: "Apply for sponsorship",

  primaryCtaHref: "#apply",

  secondaryCta: "View sponsorship process",

  secondaryCtaHref: "#selection-process",

  watermark: "SPONSORSHIP",
};