import { motion } from "framer-motion";
import SectionGlow from "@/shared/components/layout/SectionGlow";
import SectionHeaderblog from "@/shared/components/sections/SectionHeaderblog";
import { servicemanufacturehero } from "@/assets";

/* -------------------------------------------------------------------------- */
/*  Types — API-ready                                                         */
/* -------------------------------------------------------------------------- */

export interface AudienceCard {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface WhoWeManufactureForSectionProps {
  eyebrow?: string;
  title?: string;
  titleLine2?: string;
  highlight?: string;
  afterHighlight?: string;
  description?: string;
  cards?: AudienceCard[];
}

/* -------------------------------------------------------------------------- */
/*  Default content                                                           */
/* -------------------------------------------------------------------------- */

const DEFAULT_CARDS: AudienceCard[] = [
  {
    id: "bjj-brands",
    title: "BJJ Brands",
    description: "Private label collections built around a distinct identity.",
    image: servicemanufacturehero,
    imageAlt: "BJJ athlete training at sunset",
  },
  {
    id: "mma-brands",
    title: "MMA Brands",
    description: "Performance products for combat-sports customers.",
    image: servicemanufacturehero,
    imageAlt: "MMA athlete training at sunset",
  },
  {
    id: "martial-arts-academies",
    title: "Martial Arts Academies",
    description: "Custom academy apparel and uniforms.",
    image: servicemanufacturehero,
    imageAlt: "Martial arts academy athlete training",
  },
  {
    id: "bjj-teams",
    title: "BJJ Teams",
    description: "Coordinated teamwear and custom gear.",
    image: servicemanufacturehero,
    imageAlt: "BJJ team athlete training",
  },
  {
    id: "gyms",
    title: "Gyms",
    description: "Branded apparel for members and communities.",
    image: servicemanufacturehero,
    imageAlt: "Gym member training",
  },
  {
    id: "sportswear-startups",
    title: "Sportswear Startups",
    description: "Product development for emerging brands.",
    image: servicemanufacturehero,
    imageAlt: "Athlete testing sportswear prototype",
  },
  {
    id: "retailers",
    title: "Retailers",
    description: "Private label ranges for retail channels.",
    image: servicemanufacturehero,
    imageAlt: "Retail apparel athlete shot",
  },
  {
    id: "online-apparel-brands",
    title: "Online Apparel Brands",
    description: "Products developed for direct-to-consumer stores.",
    image: servicemanufacturehero,
    imageAlt: "Athlete for online apparel brand shoot",
  },
];

/* -------------------------------------------------------------------------- */
/*  Card                                                                      */
/* -------------------------------------------------------------------------- */

function AudienceCardItem({ card, index }: { card: AudienceCard; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        y: -3,
        borderColor: "rgba(230, 57, 70, 0.8)",
      }}
      style={{ border: "1px solid #E6394669" }}
      className="flex h-full w-full max-w-[403px] items-center justify-between gap-4 rounded-[10px] bg-[#111111] px-[18px] py-4 transition-colors duration-300"
    >
      <div className="h-[92px] w-[136px] shrink-0 overflow-hidden rounded-[5px] bg-white/5">
        <img
          src={card.image}
          alt={card.imageAlt}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <h3
          className="font-space-grotesk"
          style={{
            fontWeight: 700,
            fontSize: "17px",
            lineHeight: "25.5px",
            letterSpacing: "0%",
            color: "#F6F6F4",
          }}
        >
          {card.title}
        </h3>
        <p className="font-space-grotesk text-[12px] font-light leading-[16px] text-white/45">
          {card.description}
        </p>
      </div>
    </motion.article>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

export default function WhoWeManufactureForSection({
  eyebrow = "Who We Manufacture For",
  title = "BUILT FOR BRANDS THAT",
  titleLine2,
  highlight = "WANT TO STAND",
  afterHighlight = " OUT.",
  description = "From specialist combat-sports brands to academies and new sportswear startups.",
  cards = DEFAULT_CARDS,
}: WhoWeManufactureForSectionProps) {
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

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 pb-16 sm:px-8 lg:px-[30px]">
        <div className="grid w-full grid-cols-1 place-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <AudienceCardItem key={card.id} card={card} index={i} />
          ))}
        </div>
      </div>
    </SectionGlow>
  );
}