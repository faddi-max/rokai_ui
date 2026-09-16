import {
  clubPartnershipImage,
  sponsorshipProgramImage,
  ambassadorProgramImage,
  affiliateProgramImage,
  scalingBrandsImage,
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  productCardImage,
} from "@/assets";
import type {
  ContentCardData,
  FAQItemData,
  PageHeroProps,
  ProcessStep,
  SplitMediaData,
} from "@/shared/types/sections";

export const programsHeroData: PageHeroProps = {
  eyebrow: "PARTNERSHIP PROGRAMS & ACADEMY SOLUTIONS",
  headingLine1: "ENGINEERING INFINITE",
  headingLine2: "GROWTH FOR COMBAT",
  headingHighlight: "ACADEMIES & BRANDS",
  description:
    "Empowering BJJ academies, head coaches, and emerging combat brands with high-margin custom apparel, priority factory slots, and dedicated brand incubation services.",
  primaryCta: {
    label: "Explore Programs",
    href: "#programs-catalog",
  },
  secondaryCta: {
    label: "Apply For Partnership",
    href: "/contact#partnership",
  },
  avatars: [avatar1, avatar2, avatar3, avatar4],
  joinText: "Over 500+ academies and 40+ combat brands grow with Rokai",
  heroImage: clubPartnershipImage,
  productCard: {
    image: productCardImage,
    name: "Academy Pro Gi Kit",
    subtitle: "Turnkey Pro Shop Bundle",
  },
};

export const programsCardsData: ContentCardData[] = [
  {
    id: "club-partnership",
    title: "Academy Wholesale Club",
    subtitle: "High-Margin Pro Shop Merch",
    description:
      "Turn your gym into a branded powerhouse. Supply your students with battle-tested gis, rashguards, and apparel tailored with your academy crest while securing up to 65% retail margins.",
    image: clubPartnershipImage,
    tags: ["Academies", "Custom Patches", "Wholesale Pricing"],
    badge: "Most Popular",
    ctaText: "Join Academy Club",
    ctaHref: "/contact?program=academy-club",
    variant: "light",
  },
  {
    id: "brand-incubator",
    title: "Brand Incubator & OEM",
    subtitle: "For Rising Fightwear Labels",
    description:
      "Looking to launch your own combat sports brand? We provide turnkey CAD pattern design, custom trim packaging, lower MOQ tiering, and dedicated tech pack engineering support.",
    image: sponsorshipProgramImage,
    tags: ["Brand Launch", "Low MOQ", "Packaging Kits"],
    badge: "Turnkey OEM",
    ctaText: "Launch Your Label",
    ctaHref: "/contact?program=brand-incubator",
    variant: "light",
  },
  {
    id: "athlete-sponsorship",
    title: "Athlete Sponsorship Program",
    subtitle: "Tournament & Podium Outfitting",
    description:
      "We equip elite competitors and championship teams with certified IBJJF tournament uniforms, personalized fight kits, and competition travel packages.",
    image: ambassadorProgramImage,
    tags: ["Athletes", "IBJJF Certified", "Custom Fight Kits"],
    badge: "Competitive",
    ctaText: "Apply For Sponsorship",
    ctaHref: "/contact?program=athlete-sponsorship",
    variant: "light",
  },
  {
    id: "affiliate-ambassador",
    title: "Affiliate & Ambassador",
    subtitle: "Monetize Your Combat Following",
    description:
      "Earn recurring commissions by promoting trusted Rokai fightwear. Includes personalized discount codes, promotional media kits, and monthly payouts.",
    image: affiliateProgramImage,
    tags: ["Affiliates", "Commissions", "Media Kits"],
    badge: "Passive Revenue",
    ctaText: "Become An Affiliate",
    ctaHref: "/contact?program=affiliate",
    variant: "light",
  },
];

export const academySplitData: SplitMediaData = {
  eyebrow: "PRO SHOP ECONOMICS",
  titleTop: "MAXIMIZE GYM RETENTION &",
  titleBottom: "BOOST PRO SHOP PROFITS",
  headingHighlight: "UP TO 65% MARGINS",
  description:
    "Stocking generic gear leaves money on the table. When your students wear custom uniforms featuring your gym logo, student retention improves and word-of-mouth referrals soar across the local combat sports community.",
  secondaryDescription:
    "Our volume tiered pricing gives gym owners direct factory pricing starting at just 20 units per run, backed by on-time delivery guarantees.",
  media: {
    src: scalingBrandsImage,
    alt: "BJJ academy students rolling in custom Gis",
    isVideo: false,
  },
  mediaPosition: "right",
  checklist: [
    "Generous wholesale discounts starting at only 20 pieces",
    "Free 3D digital mockup before sample manufacturing",
    "Consistent fabric dye lots with no discoloration over washes",
    "Reorder portal with fast 3-week batch reproduction",
  ],
  cta: {
    text: "Calculate Wholesale Savings",
    href: "/contact#quote",
  },
  secondaryCta: {
    text: "Download Wholesale Guide",
    href: "/resources",
  },
};

export const programSteps: ProcessStep[] = [
  {
    stepNumber: "01",
    title: "Submit Application",
    subtitle: "Tell Us About Your Gym",
    description:
      "Fill out our brief partnership intake with your gym location, current student count, and apparel needs.",
  },
  {
    stepNumber: "02",
    title: "Consultation & Tiering",
    subtitle: "Custom Wholesale Rate",
    description:
      "Our team reviews your specs within 24 hours and assigns your account to our wholesale or OEM partner tier.",
  },
  {
    stepNumber: "03",
    title: "Sample & Fit Check",
    subtitle: "Free Physical Sample",
    description:
      "Receive custom branded samples to test sizing, inspect lapel sturdiness, and verify student fit.",
  },
  {
    stepNumber: "04",
    title: "Production & Delivery",
    subtitle: "Doorstep DDP Shipping",
    description:
      "Place your production orders with real-time status tracking and guaranteed on-time doorstep delivery.",
  },
];

export const programsFaqs: FAQItemData[] = [
  {
    id: "prog-faq-1",
    question: "What are the requirements to join the Academy Wholesale Club?",
    answer:
      "Any registered martial arts academy, BJJ school, MMA gym, or university fight club qualifies. There are zero enrollment fees. You just need an initial order of 20 pieces across mixed sizes.",
  },
  {
    id: "prog-faq-2",
    question: "Can we sell Rokai manufactured uniforms at our own retail price?",
    answer:
      "Yes. You have 100% control over your retail pricing. Most academies sell our custom 450 GSM Gis for $140–$180 after ordering at our $55–$70 wholesale bracket, netting high margins per student.",
  },
  {
    id: "prog-faq-3",
    question: "How does the Affiliate & Ambassador commission system work?",
    answer:
      "Affiliates receive a unique tracking code offering their followers 10% off Rokai online catalog items while earning up to 15% net commission on every completed order paid out monthly via PayPal or Direct Deposit.",
  },
  {
    id: "prog-faq-4",
    question: "What support is provided for the Brand Incubator program?",
    answer:
      "Brand Incubator partners receive 1-on-1 technical design assistance, custom barcode and packaging sourcing, access to low MOQ test runs, and direct shipping logistics directly into Amazon FBA or your local warehouse.",
  },
];
