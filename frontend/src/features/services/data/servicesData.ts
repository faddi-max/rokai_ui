import {
  manufacturingProcessImage,
  engineeredBenchmarkImage,
  problemSolversImage,
  scalingBrandsImage,
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  manufactureGiImage,
} from "@/assets";
import type {
  ContentCardData,
  FAQItemData,
  ProcessStep,
  SplitMediaData,
} from "@/shared/types/sections";
import type { HeroContent } from "@/shared/types/hero";

export const servicesHeroData: HeroContent = {
  headingLines: [
    { text: "END-TO-END" },
    { text: "COMBAT SPORTS" },
    { text: "MANUFACTURING SERVICES", highlight: true },
  ],
  description:
    "We act as your dedicated production facility. From proprietary pattern creation and AI-assisted sizing to certified raw material procurement and global direct-to-gym shipping.",
  primaryCta: {
    label: "Explore Our Capabilities",
    href: "#capabilities",
  },
  secondaryCta: {
    label: "Book a Factory Consultation",
    href: "/contact#consultation",
  },
  secondaryRow: {
    type: "join",
    avatars: [avatar1, avatar2, avatar3, avatar4],
    joinText: "Over 1.2M garments produced with 99.4% on-time delivery rate",
  },
  visual: {
    type: "image",
    image: manufacturingProcessImage,
    imageAlt: "Rokai garment manufacturing process",
  },
};

export const serviceCapabilitiesCards: ContentCardData[] = [
  {
    id: "oem-odm",
    title: "Full OEM / ODM Manufacturing",
    subtitle: "Custom Cut & Sew Uniforms",
    description:
      "Whether you provide an exact CAD tech pack or just an initial hand sketch, our master pattern makers produce exact physical prototypes and scale from 50 to 50,000 units with uniform consistency.",
    image: manufactureGiImage,
    tags: ["Custom Patterns", "High Volume", "Prototyping"],
    badge: "Core Service",
    ctaText: "Discuss OEM Project",
    ctaHref: "/contact?service=oem",
    variant: "light",
  },
  {
    id: "ai-sizing",
    title: "AI Pattern Grading & Sizing",
    subtitle: "Zero Sizing Guesswork",
    description:
      "Our proprietary AI sizing algorithm computes optimal shrinkage allowance across cotton weaves, ensuring your sizes remain true fit wash after wash without erratic batch shrinkage.",
    image: engineeredBenchmarkImage,
    tags: ["AI Sizing", "Shrinkage Control", "CAD Grading"],
    badge: "Proprietary Tech",
    ctaText: "See How It Works",
    ctaHref: "/contact?service=ai-sizing",
    variant: "light",
  },
  {
    id: "embroidery-print",
    title: "High-Density Embroidery & Sublimation",
    subtitle: "Laser-Guided Stitching",
    description:
      "State-of-the-art 24-head Tajima embroidery machines and industrial Italian dye-sublimation printers render intricate crests, micro-text, and vibrant color gradients that withstand years of friction.",
    image: problemSolversImage,
    tags: ["Tajima Machines", "Italian Inks", "No Cracking"],
    badge: "Precision Craft",
    ctaText: "Explore Branding Options",
    ctaHref: "/contact?service=embroidery",
    variant: "light",
  },
  {
    id: "private-label",
    title: "Private Label & Custom Packaging",
    subtitle: "Retail-Ready Presentation",
    description:
      "Transform your uniforms into a luxury lifestyle experience. Custom woven damask neck labels, rubberized patches, hang tags, barcode stickers, and biodegradable frosted zip pouches.",
    image: scalingBrandsImage,
    tags: ["Custom Labels", "Hang Tags", "Eco Packaging"],
    badge: "Turnkey Branding",
    ctaText: "View Packaging Kits",
    ctaHref: "/contact?service=private-label",
    variant: "light",
  },
];

export const servicesProcessSteps: ProcessStep[] = [
  {
    stepNumber: "01",
    title: "Technical Discovery",
    subtitle: "Fabric & Specs",
    description:
      "We analyze your design requirements, target price point, GSM weight, and weave specifications to establish a rock-solid production blueprint.",
  },
  {
    stepNumber: "02",
    title: "Rapid Prototyping",
    subtitle: "7-10 Day Turnaround",
    description:
      "Our sampling workshop cuts, sews, and embroiders a golden prototype for you to roll in, stress test, and approve prior to volume cutting.",
  },
  {
    stepNumber: "03",
    title: "Batch Manufacturing",
    subtitle: "Strict QA Gates",
    description:
      "Bulk cutting, automated stitching, seam reinforcement, and triple-point inspection at each workstation ensure defect rates below 0.2%.",
  },
  {
    stepNumber: "04",
    title: "Fulfillment & Customs",
    subtitle: "DDP To Your Door",
    description:
      "We manage export customs, ocean/air freight, and final mile delivery with duties pre-paid (DDP), right to your academy warehouse.",
  },
];

export const labTestingSplitData: SplitMediaData = {
  eyebrow: "QUALITY ASSURANCE",
  titleTop: "RIGOROUS LABORATORY",
  titleBottom: "TESTING PROTOCOLS",
  headingHighlight: "ZERO COMPROMISES",
  description:
    "Combat sports apparel endures violent friction, sweat salinity, and extreme tension. That's why every batch of fabric is subjected to Martindale abrasion checks, seam burst testing, and color-fastness stress testing before leaving our facility.",
  secondaryDescription:
    "We provide certified lab reports with every commercial production run, guaranteeing that your gear exceeds international athletic textile standards.",
  media: {
    src: problemSolversImage,
    alt: "Fabric tensile testing in textile laboratory",
    isVideo: false,
  },
  mediaPosition: "left",
  checklist: [
    "Tensile seam burst strength tested over 450N",
    "Pre-wash & post-wash shrinkage verification",
    "Chlorine and salt water color fastness grading",
    "Formaldehyde and toxic dye-free certification",
  ],
  cta: {
    text: "Review Quality Standards",
    href: "/resources",
  },
  secondaryCta: {
    text: "Request Lab Certificate",
    href: "/contact#lab",
  },
};

export const servicesFaqs: FAQItemData[] = [
  {
    id: "serv-faq-1",
    question: "Do you offer white-label / unbranded manufacturing?",
    answer:
      "Yes. Over 70% of our production volume is private-label. We manufacture products entirely unbranded or custom-labeled with your academy or retail brand identity.",
  },
  {
    id: "serv-faq-2",
    question: "How do you protect our intellectual property and design tech packs?",
    answer:
      "We execute standard Bilateral Non-Disclosure Agreements (NDAs) before reviewing any client tech packs. Your proprietary patterns and artwork remain strictly confidential and will never be reproduced for third parties.",
  },
  {
    id: "serv-faq-3",
    question: "What is your sampling policy and sample cost?",
    answer:
      "We produce bespoke prototypes tailored to your exact specifications. Sample fees cover pattern digitized drafting and courier delivery, and are 100% credited back toward your commercial production run upon order placement.",
  },
  {
    id: "serv-faq-4",
    question: "Can you handle international customs clearance and shipping?",
    answer:
      "Yes. We offer complete DDP (Delivered Duty Paid) shipping to the USA, Canada, UK, Europe, Australia, and the UAE. Customs tariffs and logistics are handled completely by our freight forwarding team.",
  },
];
