import { motion } from "framer-motion";
import SectionGlow from "@/shared/components/layout/SectionGlow";
import SectionHeaderblog from "@/shared/components/sections/SectionHeaderblog";
import { labelmanufacture1, labelmanufacture2, labelmanufacture3, labelmanufacture4 } from "@/assets";

/* -------------------------------------------------------------------------- */
/*  Types — API-ready                                                         */
/* -------------------------------------------------------------------------- */

export interface ManufactureItem {
  id: string;
  image: string;
  imageAlt: string;
  title: string;
  description: string;
}

export interface WhatWeManufactureGridSectionProps {
  eyebrow?: string;
  title?: string;
  titleLine2?: string;
  highlight?: string;
  description?: string;
  items?: ManufactureItem[];
}

/* -------------------------------------------------------------------------- */
/*  Default content                                                           */
/* -------------------------------------------------------------------------- */

const DEFAULT_ITEMS: ManufactureItem[] = [
  {
    id: "bjj-gis",
    image: labelmanufacture1,
    imageAlt: "Custom BJJ Gi with soccer ball and cleats",
    title: "BJJ Gis",
    description: "Custom cuts, colors, patches and construction.",
  },
  {
    id: "no-gi-shorts",
    image: labelmanufacture2,
    imageAlt: "Athlete skiing in No-Gi shorts gear",
    title: "No-Gi Shorts",
    description: "Performance shorts developed around your specifications.",
  },
  {
    id: "spats",
    image: labelmanufacture3,
    imageAlt: "Athlete training in compression spats",
    title: "Spats",
    description: "Training-ready compression wear for your collection.",
  },
  {
    id: "rash-guards",
    image: labelmanufacture4,
    imageAlt: "Athletes training in rash guards",
    title: "Rash Guards",
    description: "Custom sublimation, compression and branding.",
  },
  {
    id: "compression-wear",
    image: labelmanufacture1,
    imageAlt: "Athlete skiing in compression wear",
    title: "Compression Wear",
    description: "Performance shorts developed around your specifications.",
  },
  {
    id: "fight-shorts",
    image: labelmanufacture2,
    imageAlt: "Custom fight shorts with soccer ball",
    title: "Fight Shorts",
    description: "Custom cuts, colors, patches and construction.",
  },
  {
    id: "training-apparel",
    image: labelmanufacture3,
    imageAlt: "Athletes training in custom apparel",
    title: "Training Apparel",
    description: "Custom sublimation, compression and branding.",
  },
  {
    id: "teamwear",
    image: labelmanufacture4,
    imageAlt: "Athlete training in teamwear",
    title: "Teamwear",
    description: "Training-ready compression wear for your collection.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Card                                                                      */
/* -------------------------------------------------------------------------- */

function ManufactureCard({ item, index }: { item: ManufactureItem; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        y: -4,
        borderColor: "rgba(255, 255, 255, 0.25)",
      }}
      className="group flex h-full w-full flex-col overflow-hidden rounded-[12px] border border-white/10 bg-[#111111] transition-colors duration-300"
    >
      <div className="relative aspect-[301/165] w-full shrink-0 overflow-hidden">
        <img
          src={item.image}
          alt={item.imageAlt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 px-5 py-5">
        <h3
          className="font-space-grotesk font-medium"
          style={{
            fontSize: "25px",
            lineHeight: "30px",
            letterSpacing: "0%",
            color: "#F6F6F4",
          }}
        >
          {item.title}
        </h3>
        <p
          className="font-space-grotesk font-light"
          style={{
            fontSize: "15px",
            lineHeight: "18px",
            letterSpacing: "0%",
            color: "#C0C0C0",
          }}
        >
          {item.description}
        </p>
      </div>
    </motion.article>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

export default function WhatWeManufactureGridSection({
  eyebrow = "Product Range",
  title = "WHAT WE",
  titleLine2,
  highlight = "MANUFACTURE",
  description = "Build a complete collection around your brand from core BJJ products to training and teamwear.",
  items = DEFAULT_ITEMS,
}: WhatWeManufactureGridSectionProps) {
  return (
    <SectionGlow className="relative overflow-hidden">
      <SectionHeaderblog
        bare
        eyebrow={eyebrow}
        title={title}
        titleLine2={titleLine2}
        highlight={highlight}
        highlightPosition="start"
        accentColor="#E51B24"
        description={description}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 py-16 sm:px-8 lg:px-[30px]">
        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <ManufactureCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </SectionGlow>
  );
}