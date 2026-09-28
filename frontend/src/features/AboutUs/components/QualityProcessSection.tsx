import { motion } from "framer-motion";
import SectionGlow from "@/shared/components/layout/SectionGlow";
import SectionHeaderblog from "@/shared/components/sections/SectionHeaderblog";
import { aboutenquiry } from "@/assets";

/* -------------------------------------------------------------------------- */
/*  Types — API-ready                                                         */
/* -------------------------------------------------------------------------- */

export interface QualityProcessItem {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface QualityProcessSectionProps {
  eyebrow?: string;
  title?: string;
  titleLine2?: string;
  highlight?: string;
  afterHighlight?: string;
  description?: string;
  backgroundImage?: string;
  items?: QualityProcessItem[];
}

/* -------------------------------------------------------------------------- */
/*  Default content                                                           */
/* -------------------------------------------------------------------------- */

const DEFAULT_ITEMS: QualityProcessItem[] = [
  {
    id: "factory",
    number: "01",
    title: "Factory",
    description: "Show the production floor, machinery and in-house lines.",
  },
  {
    id: "inspection",
    number: "02",
    title: "Inspection",
    description: "Show how quality is checked throughout production.",
  },
  {
    id: "certification",
    number: "03",
    title: "Certification",
    description: "Display only certifications genuinely held by ROKAI.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

export default function QualityProcessSection({
  eyebrow = "Quality & Compliance",
  title = "QUALITY ISN'T A CLAIM",
  titleLine2,
  highlight = "IT'S A PROCESS",
  afterHighlight = "",
  description = "This area should use real ROKAI proof: factory capability, inspection stages and verified certifications or standards.",
  backgroundImage = aboutenquiry,
  items = DEFAULT_ITEMS,
}: QualityProcessSectionProps) {
  return (
    <SectionGlow className="relative overflow-hidden">
      {/* Background photo, heavily darkened */}
      {backgroundImage && (
        <img
          src={backgroundImage}
          alt=""
          aria-hidden
          loading="lazy"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30"
        />
      )}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.55) 45%, rgba(105,1,6,0.45) 100%)",
        }}
      />

      <div className="relative z-10">
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

        <div className="mx-auto w-full max-w-[1178px] px-5 pb-20 pt-6 sm:px-8 lg:px-[30px] lg:pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={`flex flex-col px-0 py-8 lg:min-h-[250px] lg:px-[42px] lg:py-[26px] ${
                  i > 0
                    ? "border-t border-white/10 lg:border-l lg:border-t-0"
                    : ""
                } ${i === 0 ? "lg:pl-[18px]" : ""}`}
              >
                <span className="font-space-grotesk text-[13px] font-medium leading-none text-[#E51B24]">
                  {item.number}
                </span>

                <h3 className="mt-12 font-space-grotesk text-[18px] font-bold leading-[1.2] text-white lg:mt-[62px]">
                  {item.title}
                </h3>

                <p className="mt-4 max-w-[240px] font-space-grotesk text-[14px] font-light leading-[22px] text-white/55">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Bottom rule */}
          <div className="mx-auto mt-2 h-px w-full bg-white/15 lg:w-[calc(100%-36px)]" />
        </div>
      </div>
    </SectionGlow>
  );
}