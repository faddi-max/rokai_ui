import { motion } from "framer-motion";
import SectionGlow from "@/shared/components/layout/SectionGlow";
import SectionHeaderblog from "@/shared/components/sections/SectionHeaderblog";
import { careerImage } from "@/assets";

/* -------------------------------------------------------------------------- */
/*  Types — API-ready                                                         */
/* -------------------------------------------------------------------------- */

export interface PerkItem {
  number: string;
  title: string;
  description: string;
}

export interface WhyWorkWithUsSectionProps {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  description?: string;
  perks?: PerkItem[];
  image?: string;
  imageAlt?: string;
}

/* -------------------------------------------------------------------------- */
/*  Default content                                                           */
/* -------------------------------------------------------------------------- */

const DEFAULT_PERKS: PerkItem[] = [
  {
    number: "01",
    title: "Team-first environment",
    description:
      "Work alongside people who value collaboration, communication, and shared responsibility.",
  },
  {
    number: "02",
    title: "Competitive pay & benefits",
    description:
      "We recognize the contribution you bring to every project and every client relationship.",
  },
  {
    number: "03",
    title: "Projects worth being proud of",
    description:
      "Work on licensed projects that create visible, lasting impact in the community.",
  },
  {
    number: "04",
    title: "Career growth",
    description:
      "Learn from experienced professionals and build the skills needed for your next opportunity.",
  },
  {
    number: "05",
    title: "Respect from top to bottom",
    description:
      "A culture where people are heard, valued, and treated with professionalism.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Row — 672 x 129, 2 columns (number | text), column-gap 20, border-b 1px   */
/* -------------------------------------------------------------------------- */

function PerkRow({ perk, index }: { perk: PerkItem; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-[32px_1fr] items-start gap-x-5 border-b border-[#FFFFFF1A] py-6 first:border-t-0 sm:grid-cols-[48px_1fr] lg:h-[129px] lg:py-0 lg:pt-[38px]"
    >
      <span className="pt-[5px] font-space-grotesk text-[11px] font-normal leading-none text-[#E63946]">
        {perk.number}
      </span>

      <div className="flex min-w-0 flex-col gap-2">
        <h3 className="font-space-grotesk text-[20px] font-medium leading-[26px] text-white sm:text-[22px]">
          {perk.title}
        </h3>
        <p className="max-w-[460px] font-space-grotesk text-[13px] font-normal leading-[19px] text-white/60">
          {perk.description}
        </p>
      </div>
    </motion.li>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

export default function WhyWorkWithUsSection({
  eyebrow = "Building trust",
  title = "WHY WORK",
  highlight = "WITH US?",
  description = "At Brikly, you’re more than just a team member you’re a builder of homes, dreams, and communities.",
  perks = DEFAULT_PERKS,
  image = careerImage,
  imageAlt = "ROKAI product design studio",
}: WhyWorkWithUsSectionProps) {
  return (
    <SectionGlow className="relative overflow-hidden">
      <SectionHeaderblog
        bare
        eyebrow={eyebrow}
        title={title}
        highlight={highlight}
        highlightGradient="linear-gradient(90deg, #E63946 0%, #C0252F 100%)"
        accentColor="#E63946"
        description={description}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-16 sm:px-8 lg:px-[49px] lg:pb-24">
        {/* Frame: 1280 wide · left list 672 · gap 78 · image fills the rest (530) */}
        <div className="grid grid-cols-1 gap-10 lg:max-w-[1280px] lg:grid-cols-[672px_minmax(0,1fr)] lg:gap-[78px]">
          {/* LEFT — perks list */}
          <ul className="flex w-full flex-col border-t border-[#FFFFFF1A]">
            {perks.map((perk, i) => (
              <PerkRow key={perk.number} perk={perk} index={i} />
            ))}
          </ul>

          {/* RIGHT — image panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[530/587] w-full overflow-hidden rounded-[14px] bg-[#0000005E] shadow-[0px_0px_32px_12px_#E6394640] lg:aspect-auto lg:min-h-[587px]"
          >
            <img
              src={image}
              alt={imageAlt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </SectionGlow>
  );
}
