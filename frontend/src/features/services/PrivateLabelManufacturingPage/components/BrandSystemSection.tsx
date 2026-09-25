import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionGlow from "@/shared/components/layout/SectionGlow";
import SectionHeaderblog from "@/shared/components/sections/SectionHeaderblog";
import { brandmanufacture } from "@/assets";

/* -------------------------------------------------------------------------- */
/*  Types — API-ready                                                         */
/* -------------------------------------------------------------------------- */

export interface BrandSystemTab {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  watermark: string;
  caption: string;
}

export interface BrandSystemSectionProps {
  eyebrow?: string;
  title?: string;
  titleLine2?: string;
  highlight?: string;
  afterHighlight?: string;
  description?: string;
  tabs?: BrandSystemTab[];
  footerLabel?: string;
  footerSteps?: string[];
}

/* -------------------------------------------------------------------------- */
/*  Default content                                                           */
/* -------------------------------------------------------------------------- */

const DEFAULT_TABS: BrandSystemTab[] = [
  {
    id: "logo",
    number: "01",
    title: "Logo",
    description: "Placement & application",
    image: brandmanufacture,
    imageAlt: "Custom boxing glove product development",
    watermark: "ROKAI / PRIVATE LABEL",
    caption: "CUSTOM PRODUCT DEVELOPMENT",
  },
  {
    id: "labels",
    number: "02",
    title: "Labels",
    description: "Woven & printed labels",
    image: "",
    imageAlt: "Woven and printed label detail",
    watermark: "ROKAI / PRIVATE LABEL",
    caption: "CUSTOM PRODUCT DEVELOPMENT",
  },
  {
    id: "colors",
    number: "03",
    title: "Colors",
    description: "Custom color direction",
    image: "",
    imageAlt: "Custom colorway development",
    watermark: "ROKAI / PRIVATE LABEL",
    caption: "CUSTOM PRODUCT DEVELOPMENT",
  },
  {
    id: "fabric",
    number: "04",
    title: "Fabric",
    description: "Weight & performance",
    image: "",
    imageAlt: "Fabric weight and performance testing",
    watermark: "ROKAI / PRIVATE LABEL",
    caption: "CUSTOM PRODUCT DEVELOPMENT",
  },
  {
    id: "stitching",
    number: "05",
    title: "Stitching",
    description: "Construction & reinforcement",
    image: "",
    imageAlt: "Reinforced stitching construction",
    watermark: "ROKAI / PRIVATE LABEL",
    caption: "CUSTOM PRODUCT DEVELOPMENT",
  },
  {
    id: "prints",
    number: "06",
    title: "Prints",
    description: "Sublimation & transfers",
    image: "",
    imageAlt: "Sublimation print and transfers",
    watermark: "ROKAI / PRIVATE LABEL",
    caption: "CUSTOM PRODUCT DEVELOPMENT",
  },
  {
    id: "packaging",
    number: "07",
    title: "Packaging",
    description: "Bags, boxes & inserts",
    image: "",
    imageAlt: "Custom packaging bags and boxes",
    watermark: "ROKAI / PRIVATE LABEL",
    caption: "CUSTOM PRODUCT DEVELOPMENT",
  },
];

const DEFAULT_FOOTER_STEPS = ["IDEA", "PRODUCT", "EXPERIENCE"];

/* -------------------------------------------------------------------------- */
/*  Tab item                                                                  */
/* -------------------------------------------------------------------------- */

function TabItem({
  tab,
  isActive,
  isLast,
  onSelect,
}: {
  tab: BrandSystemTab;
  isActive: boolean;
  isLast: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative flex h-[145px] w-full shrink-0 flex-col justify-center gap-2 px-5 py-4 text-left transition-colors duration-300 sm:w-[177px] ${
        !isLast ? "border-r border-white/10" : ""
      } ${isActive ? "bg-black/25" : "bg-[#111111] hover:bg-black/20"}`}
    >
      {/* Top accent bar */}
      <span
        aria-hidden
        className={`absolute left-0 top-0 h-[2px] bg-[#E63946] transition-all duration-300 ${
          isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
        }`}
      />

      <span
        className={`font-space-grotesk text-[11px] font-bold uppercase tracking-wide transition-colors duration-300 ${
          isActive ? "text-[#E63946]" : "text-white/40 group-hover:text-[#E63946]"
        }`}
      >
        {tab.number}
      </span>

      <span className="font-space-grotesk text-[16px] font-bold text-white">
        {tab.title}
      </span>

      <span className="font-space-grotesk text-[12px] font-light leading-[16px] text-white/45">
        {tab.description}
      </span>
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

export default function BrandSystemSection({
  eyebrow = "Customization",
  title = "YOUR BRAND.",
  titleLine2,
  highlight = "A REVENUE",
  afterHighlight = " SYSTEM.",
  description = "Every product can be developed around your visual identity, product requirements and customer experience.",
  tabs = DEFAULT_TABS,
  footerLabel = "YOUR BRAND SYSTEM",
  footerSteps = DEFAULT_FOOTER_STEPS,
}: BrandSystemSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTab = tabs[activeIndex];

  return (
    <SectionGlow className="relative overflow-hidden">
      <SectionHeaderblog
        bare
        eyebrow={eyebrow}
        title={title}
        titleLine2={titleLine2}
        highlight={highlight}
        afterHighlight={afterHighlight}
        highlightPosition="start"
        accentColor="#E51B24"
        description={description}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1178px] px-5 pb-16 sm:px-8 lg:px-[30px]">
        {/* Hero image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[8px] border border-white/10 bg-[#0d0d0d] sm:aspect-[1108/380]">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeTab.id}
              src={activeTab.image}
              alt={activeTab.imageAlt}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

          {/* Number badge, top right */}
          <span className="absolute right-4 top-4 font-space-grotesk text-[11px] font-bold uppercase tracking-wide text-[#E63946]">
            {activeTab.number}
          </span>

          {/* Watermark + caption, bottom left */}
          <div className="absolute bottom-5 left-6 flex flex-col gap-1">
            <span className="font-space-grotesk text-[10px] font-semibold uppercase tracking-[0.15em] text-[#E63946]">
              {activeTab.watermark}
            </span>
            <span className="font-space-grotesk text-[16px] font-bold uppercase text-white sm:text-[18px]">
              {activeTab.caption}
            </span>
          </div>
        </div>

        {/* Tabs row */}
        <div className="mt-0 flex w-full flex-wrap overflow-hidden rounded-b-[8px] border border-t-0 border-white/10 bg-[#111111] sm:flex-nowrap">
          {tabs.map((tab, i) => (
            <TabItem
              key={tab.id}
              tab={tab}
              isActive={i === activeIndex}
              isLast={i === tabs.length - 1}
              onSelect={() => setActiveIndex(i)}
            />
          ))}
        </div>

        {/* Footer breadcrumb */}
        <div className="mt-10 flex flex-col items-center gap-2 text-center">
          <span className="font-space-grotesk text-[10px] font-semibold uppercase tracking-[0.2em] text-[#555555]">
            {footerLabel}
          </span>
          <div className="flex items-center gap-2">
            {footerSteps.map((step, i) => (
              <span key={step} className="flex items-center gap-2">
                <span
                  className={`font-space-grotesk text-[11px] font-semibold uppercase tracking-wide ${
                    i === 1 ? "text-white" : "text-white"
                  }`}
                >
                  {step}
                </span>
                {i < footerSteps.length - 1 && (
                  <span aria-hidden className="text-[10px] text-[#E63946]">
                    →
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </SectionGlow>
  );
}