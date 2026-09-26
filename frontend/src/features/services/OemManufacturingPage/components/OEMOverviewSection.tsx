import { Check } from "lucide-react";
import { motion } from "framer-motion";
import SectionGlow from "@/shared/components/layout/SectionGlow";
import SectionHeaderblog from "@/shared/components/sections/SectionHeaderblog";
import { oemhero } from "@/assets";

export interface OEMOverviewSectionProps {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  headerDescription?: string;
  image: string;
  imageAlt?: string;
  imageLabel?: string;
  imageNumber?: string;
  paragraphs?: string[];
  infrastructureLabel?: string;
  infrastructureItems?: string[];
  watermark?: string;
}

const DEFAULT_PARAGRAPHS = [
  "OEM (Original Equipment Manufacturing) at Rokai is the solution for businesses seeking high-quality, custom combat sports gear tailored to their brand. Our OEM service empowers you to bring your vision to life with production support from concept through delivery.",
  "We combine specialized manufacturing, material expertise and strict quality control so your products stay consistent as your brand scales.",
];

const DEFAULT_INFRASTRUCTURE_ITEMS = [
  "ISO-Certified Quality Management",
  "Scalability with Production",
  "State-of-the-Art Facility",
  "Advanced Textile Engineering Labs",
];

function ChecklistRow({ label }: { label: string }) {
  return (
    <li className="flex items-start gap-2">
      <Check size={13} strokeWidth={3} className="mt-[3px] shrink-0 text-[#2FB574]" aria-hidden />
      <span className="font-space-grotesk text-[13px] leading-[19px] text-white/80">{label}</span>
    </li>
  );
}

export default function OEMOverviewSection({
  eyebrow = "What is OEM manufacturing at Rokai",
  title = "MANUFACTURING BUILT",
  highlight = "AROUND YOUR BRAND.",
  headerDescription = "OEM (Original Equipment Manufacturing) at Rokai is the solution for businesses seeking high quality, custom combat sports gear tailored to their brand.",
  image = oemhero,
  imageAlt = "Rokai OEM manufacturing — worker on the production floor",
  imageLabel = "Built through discipline",
  imageNumber = "ROKAI / OEM",
  paragraphs = DEFAULT_PARAGRAPHS,
  infrastructureLabel = "The Technical Infrastructure",
  infrastructureItems = DEFAULT_INFRASTRUCTURE_ITEMS,
  watermark = "OEM",
}: OEMOverviewSectionProps) {
  return (
    <SectionGlow className="relative overflow-hidden">
      <SectionHeaderblog
        bare
        eyebrow={eyebrow}
        title={title}
        highlight={highlight}
        description={headerDescription}
        accentColor="#E51B24"
      />

      <div className="relative mx-auto max-w-[1440px] px-5 pb-20 sm:px-8 md:px-10 lg:px-[49px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-16"
        >
          <div className="relative w-full shrink-0 overflow-hidden rounded-[12px] border border-[#363636] bg-[#111] lg:w-[478px]">
            <img
              src={image}
              alt={imageAlt}
              className="h-[420px] w-full object-cover object-center lg:h-[591px]"
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

          <div className="flex w-full flex-col justify-center lg:max-w-[636px]">
            <div className="flex flex-col gap-5">
              {paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className="font-space-grotesk text-[18px] font-normal leading-[27px] tracking-[0%] text-white"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-9">
              <h3 className="font-space-grotesk text-[15px] font-bold uppercase tracking-[0.04em] text-white">
                {infrastructureLabel}
              </h3>

              <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                {infrastructureItems.map((item) => (
                  <ChecklistRow key={item} label={item} />
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 z-0 mb-10 translate-x-[1%] translate-y-[35%] select-none whitespace-nowrap font-space-grotesk text-[120px] font-bold uppercase leading-none text-white/5 lg:text-[201.6px] lg:tracking-[-14.11px]"
      >
        {watermark}
      </span>
    </SectionGlow>
  );
}
