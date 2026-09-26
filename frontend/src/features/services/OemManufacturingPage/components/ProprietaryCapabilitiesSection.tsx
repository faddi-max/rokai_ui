import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import SectionGlow from "@/shared/components/layout/SectionGlow";
import SectionHeaderblog from "@/shared/components/sections/SectionHeaderblog";
import Button from "@/shared/components/ui/Button";

export interface CapabilityItemData {
  number: string;
  label: string;
}

export interface ProprietaryCapabilitiesSectionProps {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  headerDescription?: string;
  paragraph?: string;
  capabilities?: CapabilityItemData[];
  ctaText?: string;
  ctaHref?: string;
  image: string;
  imageAlt?: string;
  imageLabel?: string;
  imageNumber?: string;
}

const DEFAULT_CAPABILITIES: CapabilityItemData[] = [
  { number: "01", label: "End-to-End Product Excellence" },
  { number: "02", label: "Advanced Manufacturing Capabilities" },
  { number: "03", label: "Dedicated Technical Excellence" },
  { number: "04", label: "Custom Textile Formulations" },
];

function CapabilityRow({ number, label }: CapabilityItemData) {
  return (
    <div className="flex h-[44px] items-center gap-4 border-b border-[#303030]">
      <span className="font-space-grotesk text-[11px] font-bold text-[#E51B24]">{number}</span>
      <span className="font-space-grotesk text-[13px] font-normal leading-[18px] text-white/80">
        {label}
      </span>
    </div>
  );
}

export default function ProprietaryCapabilitiesSection({
  eyebrow = "Proprietary OEM capabilities",
  title = "ONE MANUFACTURING",
  highlight = "PARTNER COMPLETE CONTROL.",
  headerDescription = "Technical expertise and manufacturing infrastructure to build high-quality products around your brand.",
  paragraph = "Rokai's proprietary OEM capabilities give businesses access to the technical infrastructure and manufacturing expertise required to develop and produce high-quality combat sports products.",
  capabilities = DEFAULT_CAPABILITIES,
  ctaText = "Contact Us",
  ctaHref = "/contact",
  image,
  imageAlt = "Rokai OEM manufacturing — worker on the production floor",
  imageLabel = "Built through discipline",
  imageNumber = "ROKAI",
}: ProprietaryCapabilitiesSectionProps) {
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

      <div className="relative mx-auto max-w-[1180px] px-5 pb-20 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-start  lg:gap-16"
        >
          <div className="relative w-full shrink-0 overflow-hidden rounded-[14px] border border-[#363636] bg-[#111] lg:w-[480px]">
            <img
              src={image}
              alt={imageAlt}
              className="h-[420px] w-full object-cover object-center lg:h-[593px]"
            />

            <div
              className="pointer-events-none absolute inset-0 rounded-[14px]"
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

          <div className="flex p-10 w-full flex-col gap-[10px] border-l border-[#3B3B3B]  lg:w-[636px] ">
            <p className="font-space-grotesk py-4 text-[18px] font-normal leading-[27px] tracking-[0%] text-white">
              {paragraph}
            </p>

            <div className="mt-2 flex flex-col">
              {capabilities.map((item) => (
                <CapabilityRow key={item.number} {...item} />
              ))}
            </div>

            <Button
              href={ctaHref}
              icon={ArrowUpRight}
              weight="medium"
              size="13px"
              className="mt-4 h-[40px] w-fit px-5"
            >
              {ctaText}
            </Button>
          </div>
        </motion.div>
      </div>
    </SectionGlow>
  );
}