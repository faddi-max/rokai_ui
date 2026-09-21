import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeaderblog from "@/shared/components/sections/SectionHeaderblog";
import SectionGlow from "@/shared/components/layout/SectionGlow";
import { whatisambassador } from "@/assets";

const badges = [
  { label: "Mindset", description: "Discipline beyond the mats" },
  { label: "Consistency", description: "Long-term commitment" },
  { label: "Representation", description: "Professional presence" },
];

export default function ProgramOverviewSection() {
  return (
    <SectionGlow className="relative overflow-hidden">
      <SectionHeaderblog
        eyebrow="A selective partnership"
        title="What is the"
        highlight="ROKAI AMBASSADOR"
        afterHighlight=" PROGRAM?"
        highlightPosition="start"
        accentColor="#E63946"
        bare
      />

      <div className="relative mx-auto max-w-[1440px] px-5 pb-24 sm:px-8 md:px-10 lg:px-[130px]">
        {/* --- Article: image + copy --- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-16"
        >
          <div className="relative w-full shrink-0 overflow-hidden rounded-[6px] border border-[#363636] lg:w-[480px]">
            <img
              src={whatisambassador}
              alt="Brazilian Jiu-Jitsu athlete training"
              className="h-[400px] w-full object-cover object-bottom lg:h-[593px]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 from-[45%] to-black/80" />
            <div className="absolute bottom-[21px] left-[23px] right-[23px] flex items-center justify-between border-t border-white/35 pt-2">
              <span className="font-space-grotesk text-[10px] font-semibold uppercase tracking-[1.5px] text-[#f7f7f5]">
                Built through discipline
              </span>
              <span className="font-space-grotesk text-[10px] font-semibold uppercase tracking-[1.5px] text-[#e63946]">
                ROKAI / 01
              </span>
            </div>
          </div>

          <div className="flex w-full flex-col lg:max-w-[636px]">
            <span className="font-space-grotesk text-[13px] font-bold uppercase leading-[20px] tracking-[1.8px] text-[#555]">
              01 — Program Overview
            </span>

            <div className="mt-7 flex flex-col gap-5 border-l border-[#3b3b3b] pl-[31px]">
              <p className="font-space-grotesk text-[15px] font-normal leading-[24.75px] text-white">
                The ROKAI Ambassador Program is a selective partnership built for Brazilian
                Jiu-Jitsu athletes who live the values of discipline, performance, and constant
                growth on and off the mats. This isn't a typical sponsorship you casually apply
                for. It's an invitation into a system designed to elevate athletes who already
                stand out through their mindset, consistency, and commitment to the art.
              </p>
              <p className="font-space-grotesk text-[15px] font-normal leading-[24.75px] text-white">
                We don't look for numbers alone, we look for presence, professionalism, and the
                ability to represent something bigger than yourself.
              </p>
              <p className="font-space-grotesk text-[15px] font-medium leading-[24.75px] text-white">
                ROKAI Ambassadors don't just compete—they represent discipline in training,
                resilience in competition, and evolution in every phase of their journey.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-3 border-l-[3px] border-[#e63946] bg-[#e6394614] px-[19px] py-[18px]">
              <span className="relative mt-0.5 size-[9px] shrink-0 rounded-full bg-[#e63946] shadow-[0_0_0_6px_rgba(230,57,70,0.12)]" />
              <div className="flex flex-col gap-1">
                <span className="font-space-grotesk text-[10px] font-bold uppercase tracking-[1.44px] text-[#e63946]">
                  Limited selection
                </span>
                <span className="font-space-grotesk text-[13px] font-bold uppercase leading-[20px] text-white">
                  Only a few athletes will be selected this month.
                </span>
              </div>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-6">
              
            <a    href="#apply"
                className="flex h-[37px] items-center gap-[25px] rounded-[6px] bg-[#e63946] px-[13px] font-space-grotesk text-[13px] font-medium uppercase tracking-[1.08px] text-white transition hover:opacity-90"
              >
                Apply to become an ambassador
                <ArrowUpRight size={16} />
              </a>
              
              <a  href="#selection-process"
                className="font-space-grotesk text-[11px] uppercase tracking-[0.99px] text-[#999] hover:text-white"
              >
                View selection process
              </a>
            </div>
          </div>
        </motion.div>

        {/* --- Badges strip --- */}
        <div className="relative z-10 mt-16 grid grid-cols-1 divide-y divide-[#303030] border-y border-[#303030] sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:mt-20">
          {badges.map((badge, index) => (
            <div key={badge.label} className={`py-8 ${index === 0 ? "sm:pr-6" : "sm:px-6"}`}>
              <p className="font-space-grotesk text-[12px] font-bold text-white">{badge.label}</p>
              <p className="mt-1.5 font-space-grotesk text-[10px] uppercase tracking-[0.8px] text-[#777]">
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Watermark — bleeds off the bottom-right corner of the section, behind the badges */}
      <span
        aria-hidden
        className="pointer-events-none mb-10 absolute bottom-0 right-0 z-0 translate-y-[35%] translate-x-[1%] select-none whitespace-nowrap font-space-grotesk text-[120px] font-bold uppercase leading-none text-white/5 lg:text-[201.6px] lg:tracking-[-14.11px]"
      >
        AMBASSADOR
      </span>
    </SectionGlow>
  );
}