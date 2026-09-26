import { motion } from "framer-motion";
import SectionGlow from "@/shared/components/layout/SectionGlow";
import SectionHeaderblog from "@/shared/components/sections/SectionHeaderblog";

export interface IndustrialProtocolStat {
  value: string;
  label: string;
}

export interface IndustrialProtocolSectionProps {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  headerDescription?: string;
  paragraphs?: string[];
  stats?: IndustrialProtocolStat[];
  image: string;
  imageAlt?: string;
  imageLabel?: string;
  imageNumber?: string;
}

const DEFAULT_PARAGRAPHS = [
  "Why risk your supply chain with agents? Partner directly with the heavy-duty facility that understands the physics of grappling. With over 25 years of OEM mastery, we provide the industrial stability required to keep your brand in stock globally.",
  "We combine specialized manufacturing, material expertise and strict quality control so your products stay consistent as your brand scales.",
];

const DEFAULT_STATS: IndustrialProtocolStat[] = [
  { value: "10,000+", label: "Garments" },
  { value: "14 Days", label: "Production Cycle" },
];

export default function IndustrialProtocolSection({
  eyebrow = "The OEM advantage",
  title = "THE ROKAI",
  highlight = "INDUSTRIAL PROTOCOL.",
  headerDescription = "Unmatched Capacity. Unrivaled Precision.",
  paragraphs = DEFAULT_PARAGRAPHS,
  stats = DEFAULT_STATS,
  image,
  imageAlt = "Rokai OEM manufacturing — quality checking finished garments",
  imageLabel = "Built through discipline",
  imageNumber = "ROKAI / OEM",
}: IndustrialProtocolSectionProps) {
  return (
    <div className="relative overflow-hidden bg-black">
      <SectionHeaderblog
        bare
        eyebrow={eyebrow}
        title={title}
        highlight={highlight}
        description={headerDescription}
        accentColor="#E51B24"
      />

      <div className="relative mx-auto max-w-[1180px] px-5 pb-20 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16"
        >
          <div className="flex w-full flex-col gap-8 lg:w-[478px] lg:pt-20">
            <div className="flex flex-col gap-5 border-l-2 border-[#978f8f] pl-5">
              {paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className="font-space-grotesk text-[14px] font-light leading-[22px] text-white/70 sm:text-[15px] sm:leading-[24px]"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="flex items-center gap-6">
              {stats.map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-6">
                  {i >= 0 && <span aria-hidden className="h-9 w-px bg-[#E51B24]" />}
                  <div>
                    <p className="font-space-grotesk text-[24px] font-bold leading-none text-white sm:text-[28px]">
                      {stat.value}
                    </p>
                    <p className="mt-2 font-space-grotesk text-[11px] uppercase tracking-wide text-white/50">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative w-full  lg:w-[479px] shrink-0 overflow-hidden rounded-[12px] border border-[#363636] bg-[#111] lg:w-[636px]">
            <img
              src={image}
              alt={imageAlt}
              className="h-[300px] w-full object-cover object-center sm:h-[360px] lg:h-[500px]"
            />

            <div
              className="pointer-events-none absolute inset-0 rounded-[12px]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.8) 100%)",
              }}
            />

            <div className="absolute bottom-[21px] left-[23px] right-[23px] flex items-center justify-between border-t border-white/35 pt-2">
              <span className="font-space-grotesk text-[10px] font-semibold uppercase tracking-[1.5px] text-[#f7f7f5]">
                {imageLabel}
              </span>
              <span className="font-space-grotesk text-[10px] font-semibold uppercase tracking-[1.5px] text-[#e63946]">
                {imageNumber}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}