import { motion } from "framer-motion";
import SectionGlow from "@/shared/components/layout/SectionGlow";
import SectionHeaderblog from "@/shared/components/sections/SectionHeaderblog";

export interface ProcessCardData {
  number: string;
  title: string;
  description: string;
}

export interface ManufacturingProofSectionProps {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  headerDescription?: string;
  image: string;
  imageAlt?: string;
  imageEyebrow?: string;
  imageTitle?: string;
  imageDescription?: string;
  cards?: ProcessCardData[];
}

const DEFAULT_CARDS: ProcessCardData[] = [
  {
    number: "01",
    title: "Quality Control",
    description: "Inspection stages built into the production journey.",
  },
  {
    number: "02",
    title: "Production Capabilities",
    description: "Sublimation, embroidery, cut & sew and related production processes.",
  },
  {
    number: "03",
    title: "Production & Support",
    description: "A connected route from approved sample through QC and export.",
  },
];

function ProcessCard({ number, title, description, index }: ProcessCardData & { index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, boxShadow: "0px 0px 12px 2px rgba(229, 27, 36, 0.35)" }}
      className="flex min-h-[161px] w-full flex-col justify-center gap-[10px] rounded-[14px] bg-[#111111] px-6 py-[27px] shadow-[0px_0px_0.37px_2.02px_#E51B243D] sm:px-[34px] lg:flex-1"
    >
      <span className="font-space-grotesk text-[12px] font-normal leading-none text-[#E63946]">
        {number}
      </span>
      <h3 className="font-space-grotesk text-[16px] font-medium uppercase leading-[20px] text-white sm:text-[18px]">
        {title}
      </h3>
      <p className="font-space-grotesk text-[11px] font-normal leading-[16px] text-white/60 sm:text-[12px]">
        {description}
      </p>
    </motion.article>
  );
}

export default function ManufacturingProofSection({
  eyebrow = "Manufacturing proof",
  title = "BUILD AROUND THE",
  highlight = "PROCESS",
  headerDescription = "Our manufacturing model connects factory capability, quality control, production techniques and export into one coordinated workflow.",
  image,
  imageAlt = "ROKAI factory floor with athletes training and finished gis in the foreground",
  imageEyebrow = "Factory capabilities",
  imageTitle = "From floor to finished product.",
  imageDescription = "Factory floor, machinery and production lines form the foundation of every product we make.",
  cards = DEFAULT_CARDS,
}: ManufacturingProofSectionProps) {
  return (
    <SectionGlow className="relative overflow-hidden">
      <SectionHeaderblog
        bare
        eyebrow={eyebrow}
        title={title}
        highlight={highlight}
        description={headerDescription}
        accentColor="#E63946"
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-5 pb-16 sm:px-8 lg:px-[49px] lg:pb-24">
        <div className="flex flex-col gap-[26px] lg:flex-row lg:items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-h-[360px] w-full overflow-hidden rounded-[14px] border border-[#FFFFFF1C] bg-[#111] lg:h-[510px] lg:w-[733px] lg:shrink-0"
          >
            <img
              src={image}
              alt={imageAlt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(179.93deg, rgba(0,0,0,0) 34.09%, rgba(0,0,0,0.9) 93.18%), linear-gradient(0deg, rgba(0,0,0,0.28), rgba(0,0,0,0.28))",
              }}
            />

            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6 sm:p-8 lg:px-[17px] lg:pb-[19px]">
              <span className="font-space-grotesk text-[8px] font-medium uppercase tracking-[0.2em] text-[#E63946]">
                {imageEyebrow}
              </span>
              <h3 className="max-w-[350px] font-space-grotesk text-[32px] font-bold leading-[1.05] text-white sm:text-[32px]">
                {imageTitle}
              </h3>
              <p className="max-w-[400px] font-space-grotesk text-[10px] font-normal leading-[14px] text-white/70 sm:text-[11px]">
                {imageDescription}
              </p>
            </div>
          </motion.div>

          <div className="flex w-full flex-col gap-[13px] lg:w-[583px] lg:shrink-0">
            {cards.map((card, i) => (
              <ProcessCard key={card.title} index={i} {...card} />
            ))}
          </div>
        </div>
      </div>
    </SectionGlow>
  );
}