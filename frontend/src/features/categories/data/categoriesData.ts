import {
  trainingGiCategoryImage,
  competitionGiCategoryImage,
  manufactureRashguardImage,
  manufactureShortsImage,
  manufactureGlovesImage,
  productCardImage,
  scalingBrandsImage,
  avatar1,
  avatar2,
  avatar3,
  avatar4,
} from "@/assets";
import type {
  ContentCardData,
  FAQItemData,
  PageHeroProps,
  ProcessStep,
  SplitMediaData,
} from "@/shared/types/sections";

export const categoriesHeroData: PageHeroProps = {
  eyebrow: "BJJ APPAREL & UNIFORMS",
  headingLine1: "ENGINEERED FOR",
  headingLine2: "GRAPPLING MASTERY",
  headingHighlight: "PRODUCT CATEGORIES",
  description:
    "Explore our complete range of custom combat sports apparel — from IBJJF-compliant competition Gis to durable no-gi rashguards, engineered specifically for clubs, academy franchises, and growing brands.",
  primaryCta: {
    label: "Explore Catalog",
    href: "#catalog",
  },
  secondaryCta: {
    label: "Request Fabric Samples",
    href: "/contact#samples",
  },
  avatars: [avatar1, avatar2, avatar3, avatar4],
  joinText: "Over 50,000+ gis manufactured for 500+ academies globally",
  heroImage: trainingGiCategoryImage,
  productCard: {
    image: productCardImage,
    name: "R-Pro Competition Gi",
    subtitle: "350 GSM Pearl Weave",
  },
};

export const categoriesCardsData: ContentCardData[] = [
  {
    id: "training-gis",
    title: "BJJ Training Gis",
    subtitle: "450 GSM Pearl Weave Cotton",
    description:
      "Heavy-duty daily uniforms built for intense sparring. Triple-reinforced seam construction, vulcanized rubber lapel, and 10oz ripstop pants with custom drawstring cord.",
    image: trainingGiCategoryImage,
    tags: ["Daily Grind", "450 GSM", "Pre-Shrunk"],
    badge: "Most Popular",
    ctaText: "Configure Training Gi",
    ctaHref: "/contact?product=training-gi",
    variant: "light",
  },
  {
    id: "competition-gis",
    title: "BJJ Competition Gis",
    subtitle: "350-400 GSM Ultralight Tech",
    description:
      "Certified 100% compliant with IBJJF 2026 regulations. Laser-cut tailored fit, tapered sleeves, reinforced knee padding, and minimal water retention for weigh-in day advantage.",
    image: competitionGiCategoryImage,
    tags: ["IBJJF Legal", "Ultralight", "Anti-Grip Lapel"],
    badge: "Tournament Grade",
    ctaText: "Configure Competition Gi",
    ctaHref: "/contact?product=competition-gi",
    variant: "light",
  },
  {
    id: "custom-rashguards",
    title: "Performance Rashguards",
    subtitle: "85/15 Poly-Spandex Blend",
    description:
      "Zero-chafing 6-panel flatlock compression gear. Full Italian dye-sublimation print that never cracks or peels, with internal silicone waistband grips that prevent riding up during rolling.",
    image: manufactureRashguardImage,
    tags: ["No-Gi", "Sublimation", "Anti-Bacterial"],
    badge: "Ranked & Custom",
    ctaText: "Configure Rashguards",
    ctaHref: "/contact?product=rashguard",
    variant: "light",
  },
  {
    id: "fight-shorts",
    title: "Grappling & Fight Shorts",
    subtitle: "4-Way Stretch Microfiber",
    description:
      "Ultra-durable, zero-hardware design without metal or zippers. Features reinforced high side slits for unrestricted guard recovery and dual-velcro interlocking waistband.",
    image: manufactureShortsImage,
    tags: ["No-Gi Shorts", "Side Slits", "Zero Hardware"],
    badge: "IBJJF Legal",
    ctaText: "Configure Fight Shorts",
    ctaHref: "/contact?product=fight-shorts",
    variant: "light",
  },
  {
    id: "team-apparel",
    title: "Team Hoodies & Apparel",
    subtitle: "380 GSM Heavyweight Fleece",
    description:
      "Premium academy lifestyle wear including heavyweight hoodies, joggers, podium tees, and tracksuits with high-density direct embroidery or chenille patch finishes.",
    image: productCardImage,
    tags: ["Heavyweight", "Embroidery", "Academy Merch"],
    badge: "High Margin",
    ctaText: "Configure Teamwear",
    ctaHref: "/contact?product=teamwear",
    variant: "light",
  },
  {
    id: "protective-gear",
    title: "Gloves & Protective Gear",
    subtitle: "Multi-Density EVA & Genuine Leather",
    description:
      "Competition MMA gloves, shin guards, training mitts, and customized academy rank belts. Built with shock-absorbing foam layering and secure hook-and-loop closures.",
    image: manufactureGlovesImage,
    tags: ["MMA", "Impact Absorption", "Belts"],
    badge: "Safety Certified",
    ctaText: "Configure Protective Gear",
    ctaHref: "/contact?product=gear",
    variant: "light",
  },
];

export const fabricSpecsSplitData: SplitMediaData = {
  eyebrow: "MATERIAL SCIENCE",
  titleTop: "PRECISION WEAVES &",
  titleBottom: "ENGINEERED FABRICS",
  headingHighlight: "FABRICS THAT LAST",
  description:
    "Every roll of fabric is tested for tensile strength, shrinkage rate, and color fastness before cutting. We offer organic cotton, recycled polyester, and specialized ripstop blends tailored to your exact climate and academy needs.",
  secondaryDescription:
    "Our AI-assisted pattern cutting guarantees less than 1.5% shrinkage variance across all batches — saving academy owners from irregular sizing headaches.",
  media: {
    src: scalingBrandsImage,
    alt: "Fabric inspection and cutting floor",
    isVideo: true,
  },
  mediaPosition: "right",
  checklist: [
    "Pre-shrunk Pearl Weave (350 GSM to 550 GSM)",
    "Antimicrobial & moisture-wicking synthetic treatments",
    "Reinforced 10oz to 12oz diamond and ripstop pants",
    "Sublimation inks meeting OEKO-TEX Standard 100",
  ],
  cta: {
    text: "Order Fabric Swatch Kit",
    href: "/contact#samples",
  },
  secondaryCta: {
    text: "Download Spec Sheet",
    href: "/resources",
  },
};

export const orderingSteps: ProcessStep[] = [
  {
    stepNumber: "01",
    title: "Select Style & Specs",
    subtitle: "Weave & Weight",
    description:
      "Choose your gi weave, pants material, cut (slim, standard, husky), and colorway from our comprehensive catalog.",
  },
  {
    stepNumber: "02",
    title: "Upload Tech Pack or Logo",
    subtitle: "Free Mockup",
    description:
      "Send your academy crest, sponsor patches, and color codes. Our designers render a production-ready 3D preview within 48 hours.",
  },
  {
    stepNumber: "03",
    title: "Pre-Production Sample",
    subtitle: "Hands-on Approval",
    description:
      "We produce a physical sample for you to roll in, inspect sizing, and sign off on fabric quality before mass production.",
  },
  {
    stepNumber: "04",
    title: "Bulk Delivery to Door",
    subtitle: "Global Express",
    description:
      "Your order is manufactured, multi-point QC inspected, individually polybagged, and dispatched directly to your gym.",
  },
];

export const categoriesFaqs: FAQItemData[] = [
  {
    id: "cat-faq-1",
    question: "What are your minimum order quantities (MOQ) for custom Gis?",
    answer:
      "Our standard minimum order quantity for custom Gis with your academy patches, embroidery, and custom pant cut is 20 units. For fully bespoke colorways or custom dyes, our MOQ starts at 50 units.",
  },
  {
    id: "cat-faq-2",
    question: "Are your competition Gis legal for IBJJF and AJP tournaments?",
    answer:
      "Yes. All of our competition Gi models are built to strict IBJJF uniform guidelines (collar thickness, sleeve circumference, fabric GSM, and patch positioning). We provide compliance certification with every batch.",
  },
  {
    id: "cat-faq-3",
    question: "Can we mix and match sizes in a single bulk order?",
    answer:
      "Absolutely. You can distribute your order across any combination of adult (A0 to A5), female (F1 to F4), and kids sizes (M00 to M4) without extra fees.",
  },
  {
    id: "cat-faq-4",
    question: "How long does production take from design approval to delivery?",
    answer:
      "Typical sample production takes 7 to 10 days. Bulk production takes 3 to 4 weeks depending on order size. Express air shipping takes 4 to 7 business days directly to your gym doorstep.",
  },
];
