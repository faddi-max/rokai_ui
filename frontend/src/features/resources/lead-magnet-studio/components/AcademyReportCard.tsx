import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionGlow from "@/shared/components/layout/SectionGlow";
import type { AcademyReport } from "../data/academyReport";

export interface AcademyReportCardProps {
  report: AcademyReport;
}

const eyebrow =
  "font-space-grotesk text-[10px] font-bold uppercase tracking-[1.5px] text-[#e63946]";
const panel = "rounded-[8px] border border-[#2c2c2c] bg-[#0f0f0f]";

function StatRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between font-space-grotesk text-[12px]">
      <span className="text-[#8a8a8a]">{label}</span>
      <span className="font-medium text-[#e63946]">{value}/100</span>
    </div>
  );
}

function CategoryRow({ index, label, score }: { index: number; label: string; score: number }) {
  return (
    <div className="flex items-center gap-4 rounded-[6px] border border-[#2c2c2c] bg-[#0f0f0f] px-5 py-[18px] sm:gap-6">
      <span className="w-5 font-space-grotesk text-[10px] text-[#4a4a4a]">
        {String(index).padStart(2, "0")}
      </span>
      <span className="w-[110px] shrink-0 font-space-grotesk text-[12px] text-[#bdbdbd] sm:w-[130px]">
        {label}
      </span>
      <div
        className="h-[3px] flex-1 bg-[#2a2a2a]"
        role="progressbar"
        aria-valuenow={score}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <motion.div
          className="h-full bg-[#e63946]"
          initial={{ width: 0 }}
          whileInView={{ width: `${score}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <span className="w-[56px] text-right font-space-grotesk text-[12px] font-medium text-white">
        {score}/100
      </span>
    </div>
  );
}

export default function AcademyReportCard({ report }: AcademyReportCardProps) {
  return (
    <SectionGlow>
      <div id="academy-report" className="mx-5 mb-16 flex items-center justify-center sm:mx-8 lg:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-[1360px] overflow-hidden rounded-[14px] border border-[#303030] bg-[#111]"
          style={{
            backgroundImage:
              "radial-gradient(circle at top right, rgba(230,57,70,0.18) 0%, rgba(230,57,70,0) 45%)",
          }}
        >
          <div className="flex flex-col gap-8 px-6 py-10 sm:px-[42px]">
            {/* Header */}
            <div className="border-b border-[#292929] pb-8">
              <div className="flex flex-col gap-2 border-l-2 border-[#e63946] pl-4">
                <span className={eyebrow}>ROKAI / Generated Report</span>
                <h2 className="font-space-grotesk text-[28px] font-bold leading-[1.1] tracking-[-0.5px] text-[#f7f7f5] sm:text-[40px]">
                  Your Academy Identity Framework
                </h2>
                <p className="font-space-grotesk text-[12px] text-[#c0c0c0]">
                  Your personalized academy identity benchmark is ready.
                </p>
              </div>
            </div>

            {/* Score + certification */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <div className={`${panel} flex min-h-[290px] flex-col items-center justify-between px-6 py-7`}>
                <span className="font-space-grotesk text-[12px] font-bold uppercase tracking-[1px] text-[#d9d9d9]">
                  Overall Score
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="font-space-grotesk text-[64px] font-bold leading-none text-[#e63946]">
                    {report.overallScore}
                  </span>
                  <span className="font-space-grotesk text-[16px] text-[#777]">/100</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="font-space-grotesk text-[10px] font-bold uppercase tracking-[0.8px] text-white">
                    {report.level}
                  </span>
                  <span className="font-space-grotesk text-[10px] text-[#666]">{report.levelNote}</span>
                </div>
              </div>

              <div className={`${panel} flex min-h-[290px] flex-col gap-5 px-6 py-7`}>
                <span className="font-space-grotesk text-[12px] font-bold uppercase tracking-[1px] text-[#d9d9d9]">
                  ROKAI Certification Status
                </span>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <span aria-hidden className="h-[7px] w-[7px] rounded-full bg-[#e63946]" />
                    <span className="font-space-grotesk text-[20px] font-bold uppercase text-white">
                      {report.tier}™
                    </span>
                  </div>
                  <span className="pl-5 font-space-grotesk text-[10px] text-[#666]">{report.validity}</span>
                </div>
                <div className="mt-auto flex flex-col gap-3 border-t border-[#292929] pt-4">
                  <StatRow label="Visibility Score" value={report.visibilityScore} />
                  <StatRow label="ROKAI Opportunity Index" value={report.opportunityIndex} />
                </div>
              </div>
            </div>

            {/* Category benchmarks */}
            <div className="flex flex-col gap-4">
              <div className="flex items-end justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <span className="font-space-grotesk text-[10px] font-bold uppercase tracking-[1px] text-[#bcbcbc]">
                    Category Benchmarks
                  </span>
                  <span className="font-space-grotesk text-[11px] text-[#9a9a9a]">
                    Performance across your academy identity system.
                  </span>
                </div>
                <span className="font-space-grotesk text-[9px] uppercase tracking-[0.8px] text-[#555]">
                  {String(report.categories.length).padStart(2, "0")} Categories
                </span>
              </div>
              <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                {report.categories.map((c, i) => (
                  <CategoryRow key={c.name} index={i + 1} label={c.label} score={c.score} />
                ))}
              </div>
            </div>

            {/* Action plan */}
            <div className="flex flex-col gap-4 rounded-[6px] border border-[#e63946]/30 bg-gradient-to-r from-[#e63946]/[0.08] to-transparent px-6 py-6 sm:flex-row sm:items-start">
              <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[4px] border border-[#e63946]/60 text-[#e63946]">
                <ArrowRight size={16} />
              </span>
              <div className="flex flex-col gap-2">
                <span className={eyebrow}>90-Day Quick Wins</span>
                <h3 className="font-space-grotesk text-[15px] font-bold text-white">Your Academy Action Plan</h3>
                <p className="max-w-[820px] font-space-grotesk text-[12px] leading-[19px] text-[#a8a8a8]">
                  {report.actionPlan}
                </p>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </SectionGlow>
  );
}