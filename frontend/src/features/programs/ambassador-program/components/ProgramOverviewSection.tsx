import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeaderblog from "@/shared/components/sections/SectionHeaderblog";
import SectionGlow from "@/shared/components/layout/SectionGlow";
import type { ProgramOverviewData } from "../data/programData";

type ProgramOverviewSectionProps = {
  data: ProgramOverviewData;
};

export default function ProgramOverviewSection({
  data,
}: ProgramOverviewSectionProps) {
  return (
    <SectionGlow className="relative overflow-hidden">
      <SectionHeaderblog
        eyebrow={data.eyebrow}
        title={data.title}
        highlight={data.highlight}
        afterHighlight={data.afterHighlight}
        highlightPosition="start"
        accentColor="#E63946"
        bare
      />

      <div className="relative mx-auto max-w-[1440px] px-5 pb-24 sm:px-8 md:px-10 lg:px-[130px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-16"
        >
          {/* IMAGE */}
          <div className="relative w-full shrink-0 overflow-hidden rounded-[6px] border border-[#363636] bg-[#111] lg:w-[480px]">
            <img
              src={data.image}
              alt={data.imageAlt}
              className="h-[400px] w-full object-cover object-center lg:h-[593px]"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent from-[45%] to-black/80" />

            <div className="absolute bottom-[21px] left-[23px] right-[23px] flex items-center justify-between border-t border-white/35 pt-2">
              <span className="font-space-grotesk text-[10px] font-semibold uppercase tracking-[1.5px] text-[#f7f7f5]">
                {data.imageLabel}
              </span>

              <span className="font-space-grotesk text-[10px] font-semibold uppercase tracking-[1.5px] text-[#e63946]">
                {data.imageNumber}
              </span>
            </div>
          </div>

          {/* CONTENT */}
          <div className="flex w-full flex-col lg:max-w-[636px]">
            <span className="font-space-grotesk text-[13px] font-bold uppercase leading-[20px] tracking-[1.8px] text-[#555]">
              {data.overviewLabel}
            </span>

            <div className="mt-7 flex flex-col gap-5 border-l border-[#3b3b3b] pl-[31px]">
              {data.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={`font-space-grotesk text-[15px] leading-[24.75px] text-white ${
                    index === data.paragraphs.length - 1
                      ? "font-medium"
                      : "font-normal"
                  }`}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* SELECTION / HIGHLIGHT BOX */}
            <div className="mt-8 flex items-center gap-3 border-l-[3px] border-[#e63946] bg-[#e6394614] px-[19px] py-[18px]">
              <span className="relative mt-0.5 size-[9px] shrink-0 rounded-full bg-[#e63946] shadow-[0_0_0_6px_rgba(230,57,70,0.12)]" />

              <div className="flex flex-col gap-1">
                <span className="font-space-grotesk text-[10px] font-bold uppercase tracking-[1.44px] text-[#e63946]">
                  {data.selectionLabel}
                </span>

                <span className="font-space-grotesk text-[13px] font-bold uppercase leading-[20px] text-white">
                  {data.selectionText}
                </span>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="mt-9 flex flex-wrap items-center gap-6">
              <a
                href={data.primaryCtaHref}
                className="flex h-[37px] items-center gap-[25px] rounded-[6px] bg-[#e63946] px-[13px] font-space-grotesk text-[13px] font-medium uppercase tracking-[1.08px] text-white transition hover:opacity-90"
              >
                {data.primaryCta}

                <ArrowUpRight size={16} />
              </a>

              <a
                href={data.secondaryCtaHref}
                className="font-space-grotesk text-[11px] uppercase tracking-[0.99px] text-[#999] transition hover:text-white"
              >
                {data.secondaryCta}
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* DYNAMIC WATERMARK */}
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 z-0 mb-10 translate-x-[1%] translate-y-[35%] select-none whitespace-nowrap font-space-grotesk text-[120px] font-bold uppercase leading-none tracking-normal text-white/5 lg:text-[201.6px] lg:tracking-[-14.11px]"
      >
        {data.watermark}
      </span>
    </SectionGlow>
  );
}