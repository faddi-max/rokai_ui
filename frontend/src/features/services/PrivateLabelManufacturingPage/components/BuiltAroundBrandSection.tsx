import { motion } from "framer-motion";
import SectionGlow from "@/shared/components/layout/SectionGlow";
import SectionHeaderblog from "@/shared/components/sections/SectionHeaderblog";
import { manufacturebrand1, manufacturebrand2, manufacturebrand3, manufacturebrand4, manufacturebrand5 } from "@/assets";

/* -------------------------------------------------------------------------- */
/*  Types — API-ready                                                         */
/* -------------------------------------------------------------------------- */

export interface BuiltAroundBrandCard {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface BuiltAroundBrandSectionProps {
  eyebrow?: string;
  title?: string;
  titleLine2?: string;
  highlight?: string;
  afterHighlight?: string;
  description?: string;
  cards?: BuiltAroundBrandCard[];
}

/* -------------------------------------------------------------------------- */
/*  Default content                                                           */
/* -------------------------------------------------------------------------- */

const DEFAULT_CARDS: BuiltAroundBrandCard[] = [
  {
    id: "custom-branding",
    number: "01",
    title: "CUSTOM BRANDING",
    description: "Labels, logos, patches, trims and finishing details built around your identity.",
    image: manufacturebrand1,
    imageAlt: "Custom branding detail on fabric",
  },
  {
    id: "premium-fabrics",
    number: "02",
    title: "PREMIUM FABRICS",
    description: "Select materials based on performance, weight, feel and intended use.",
    image: manufacturebrand2,
    imageAlt: "Premium fabric roll close-up",
  },
  {
    id: "labels-packaging",
    number: "03",
    title: "LABELS & PACKAGING",
    description: "Carry your brand through every customer touchpoint.",
    image: manufacturebrand3,
    imageAlt: "Branded packaging box",
  },
  {
    id: "flexible-moq",
    number: "04",
    title: "FLEXIBLE MOQ",
    description: "Production options for emerging brands and established collections.",
    image: manufacturebrand4,
    imageAlt: "Production line fabric rolls",
  },
  {
    id: "quality-control",
    number: "05",
    title: "QUALITY CONTROL",
    description: "Inspection checkpoints help maintain consistency before delivery.",
    image: manufacturebrand5,
    imageAlt: "Quality control inspection of apparel",
  },
  {
    id: "global-shipping",
    number: "06",
    title: "GLOBAL SHIPPING",
    description: "Finished products prepared for delivery to markets around the world.",
    image: manufacturebrand2,
    imageAlt: "Global shipping and logistics",
  },
];

/* -------------------------------------------------------------------------- */
/*  Card                                                                      */
/* -------------------------------------------------------------------------- */

function BrandCard({ card, index }: { card: BuiltAroundBrandCard; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        y: -6,
        borderColor: "rgba(229, 27, 36, 0.55)",
        boxShadow: "0px 12px 26px 5px rgba(229, 27, 36, 0.3)",
      }}
      style={{ boxShadow: "0px 0px 9.37px 4.02px #E51B2447" }}
      className="group relative flex h-full min-h-[228px] w-full flex-col justify-end overflow-hidden rounded-[8.03px] border border-white/10 bg-[#111111] px-[34px] py-[27px] transition-all duration-300"
    >
      {/* Background image */}
      {card.image && (
        <img
          src={card.image}
          alt={card.imageAlt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover  opacity-40 transition-transform duration-500 ease-out group-hover:scale-105"
        />
      )}

      {/* Dark scrim so text stays legible over the photo */}
      <div className="pointer-events-none  absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/85 to-[#111111]/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-[40px]">
        <div className="mb-2 flex items-center gap-3">
          <span className="font-space-grotesk text-[13px] font-medium leading-none text-white/70">
            {card.number}
          </span>
          <span aria-hidden className="h-px w-8 bg-[#E51B24]" />
        </div>

        <h3
          className="font-space-grotesk uppercase text-white"
          style={{
            fontWeight: 500,
            fontSize: "26px",
            lineHeight: "25px",
            letterSpacing: "0%",
          }}
        >
          {card.title}
        </h3>

        <p
          className="font-space-grotesk"
          style={{
            fontWeight: 400,
            fontSize: "15px",
            lineHeight: "100%",
            letterSpacing: "0%",
            color: "#C0C0C0",
          }}
        >
          {card.description}
        </p>
      </div>
    </motion.article>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

export default function BuiltAroundBrandSection({
  eyebrow = "Why Rokai",
  title = "BUILT AROUND",
  titleLine2,
  highlight = "OUR BRAND",
  afterHighlight = ".",
  description = "A manufacturing partner should give your product more than a logo. It should help you build a consistent product system.",
  cards = DEFAULT_CARDS,
}: BuiltAroundBrandSectionProps) {
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
        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <BrandCard key={card.id} card={card} index={i} />
          ))}
        </div>
      </div>
    </SectionGlow>
  );
}