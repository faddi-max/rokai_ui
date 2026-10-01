import {
  jackets as jacketsImage,
  pants as pantsImage,
  rashguards as rashguardsImage,
} from "@/assets";
import type {
  FabricCollection,
  FabricRow,
  FabricsHeroData,
  FabricsPageData,
} from "@/shared/types/fabrics";

const FOOTNOTE =
  "Fabric specifications may vary slightly depending on the product and manufacturing process.";

const row = (
  id: string,
  name: string,
  gsm: string,
  weave: string,
  composition: string,
  compositionNote: string,
  keyFeatures: string,
  athleticBenefits: string,
  useCase: string[]
): FabricRow => ({
  id,
  brand: "ROKAI",
  name,
  gsm,
  weave,
  composition,
  compositionNote,
  keyFeatures,
  athleticBenefits,
  useCase,
});

// PLACEHOLDER CONTENT: replace every row with the real Figma copy.
const jackets: FabricCollection = {
  id: "jackets",
  breadcrumb: "Fabric Guide",
  titleWhite: "JACKETS",
  titleRed: "COLLECTION",
  description:
    "Every ROKAI fabric is engineered around a specific balance of weight, durability, comfort and performance. Explore the construction behind each weave and its ideal use.",
  image: jacketsImage,
  imageAlt: "ROKAI competition jacket fabric specifications chart on a gym wall",
  tableLabel: "Fabric Specifications",
  tableMeta: "ROKAI Fabric Guide",
  note: FOOTNOTE,
  rows: [
    row("eco", "EcoWeave™", "350 GSM", "Pearl Weave", "100% Cotton", "Pre-shrunk",
      "Lightweight 350 GSM jacket with a soft hand feel and fast drying time.",
      "Strong airflow and reduced weight for long training sessions.",
      ["Training", "Lightweight", "Daily Use"]),
    row("pango", "PangoWeave™", "450 GSM", "Pearl Weave", "100% Cotton", "Pre-shrunk",
      "Balanced 450 GSM construction for durability and comfort.",
      "Reliable grip resistance and structure during high-intensity rolling.",
      ["Training", "Mid-Weight"]),
    row("therm", "ThermWeave™", "550 GSM", "Pearl Weave", "100% Cotton", "Pre-shrunk",
      "Dense 550 GSM weave with reinforced stitching zones.",
      "Excellent tear resistance for heavy gripping and academy use.",
      ["Heavyweight", "High-Durability", "Academy"]),
    row("sport", "SportWeave™", "425 GSM", "Gold Weave", "100% Cotton", "Pre-shrunk",
      "Slim-profile 425 GSM gold weave with a competition cut.",
      "Reduced bulk and quick movement for tournament performance.",
      ["Competition", "Lightweight"]),
    row("prime", "PrimePlus™", "600 GSM", "Ripstop Blend", "Cotton / Poly Blend", "Reinforced",
      "Premium 600 GSM blend built for the toughest training demands.",
      "Maximum durability with consistent fit after repeated washes.",
      ["Heavyweight", "Premium", "Long-Term Use"]),
  ],
};

const pants: FabricCollection = {
  ...jackets,
  id: "pants",
  titleWhite: "PANTS",
  image: pantsImage,
  imageAlt: "ROKAI pants fabric specifications chart on a gym wall",
  rows: [
    row("p-eco", "EcoWeave™ Pants", "250 GSM", "Ripstop", "100% Cotton", "Pre-shrunk",
      "Light ripstop construction with a gusseted crotch.",
      "Free movement and breathability for guard work.",
      ["Training", "Lightweight"]),
    row("p-flex", "FlexTwill™", "300 GSM", "Twill", "Cotton / Poly Blend", "Stretch",
      "Twill weave with a stretch-friendly cut.",
      "Comfortable range of motion with stable knee reinforcement.",
      ["Training", "Daily Use"]),
    row("p-pro", "ProRip™", "350 GSM", "Ripstop", "100% Cotton", "Reinforced",
      "Reinforced knees and double-stitched seams.",
      "Handles heavy sparring without wear at stress points.",
      ["Academy", "High-Durability"]),
    row("p-comp", "CompLite™", "240 GSM", "Ripstop", "Cotton / Poly Blend", "Lightweight",
      "Competition-weight pants with a tapered ankle.",
      "Lower weight and a fast-drying finish for tournament days.",
      ["Competition"]),
    row("p-elite", "EliteTwill™", "380 GSM", "Twill", "100% Cotton", "Premium",
      "Premium twill with a soft finish and strong seams.",
      "Long-term durability with a consistent fit.",
      ["Premium", "Long-Term Use"]),
  ],
};

const rashguards: FabricCollection = {
  ...jackets,
  id: "rashguards",
  titleWhite: "RASHGUARDS",
  image: rashguardsImage,
  imageAlt: "ROKAI rashguard fabric specifications chart on a gym wall",
  rows: [
    row("r-core", "CoreStretch™", "200 GSM", "4-Way Stretch", "85% Polyester / 15% Spandex", "Compression",
      "Four-way stretch with flatlock seams.",
      "Compression support and reduced friction in no-gi training.",
      ["No-Gi", "Training"]),
    row("r-dry", "DryFlex™", "180 GSM", "Mesh Knit", "88% Polyester / 12% Spandex", "Moisture-wicking",
      "Moisture-wicking knit with a breathable back panel.",
      "Stays dry and light through long sessions.",
      ["No-Gi", "Lightweight"]),
    row("r-pro", "ProCompress™", "220 GSM", "4-Way Stretch", "80% Polyester / 20% Spandex", "High compression",
      "High-compression fabric with a sublimation-ready surface.",
      "Muscle support and sharp, durable graphics.",
      ["Competition", "Sublimation"]),
    row("r-ult", "UltraShield™", "240 GSM", "Interlock", "90% Polyester / 10% Spandex", "Anti-odor",
      "Anti-odor finish with reinforced stitching.",
      "Hygiene and durability for daily academy use.",
      ["Academy", "Daily Use"]),
    row("r-max", "MaxFit™", "210 GSM", "4-Way Stretch", "82% Polyester / 18% Spandex", "Premium",
      "Premium stretch with a contoured cut.",
      "A second-skin fit with strong rebound after washing.",
      ["Premium", "Competition"]),
  ],
};

export const fabricsHeroData: FabricsHeroData = {
  breadcrumb: "Fabrics",
  titleWhite: "ROKAI DURA-TECH™",
  titleRed: "TRAINING GI COLLECTION",
  tabs: [
    { id: "jackets", label: "Dura-Tech Jackets" },
    { id: "pants", label: "Dura-Tech Pants" },
    { id: "rashguards", label: "Essence Pants" },
    { id: "essence-jackets", label: "Essence Jackets" },
    { id: "compliant", label: "Compliant Gi Jackets" },
    { id: "shorts", label: "Grappling Short" },
  ],
};

export const fabricsPageFallback: FabricsPageData = {
  hero: fabricsHeroData,
  collections: [jackets, pants, rashguards],
};