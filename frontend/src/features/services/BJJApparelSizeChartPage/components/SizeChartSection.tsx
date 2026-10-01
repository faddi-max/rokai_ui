import { useState } from "react";
import { motion } from "framer-motion";
import SectionGlow from "@/shared/components/layout/SectionGlow";
import type { SizeChartData } from "@/shared/types/sizeChart";

interface SizeChartSectionProps {
  data: SizeChartData;
}

const ROW_HEIGHT = 86.63;
const HAIRLINE = "0.73px solid #28282A";

// Column widths from the design (sum = 100%).
const COLUMN_WIDTHS = ["12.7%", "15.9%", "14%", "14%", "14%", "14%", "15.4%"];

export default function SizeChartSection({ data }: SizeChartSectionProps) {
  const {
    breadcrumb,
    titleWhite,
    titleRed,
    tolerance,
    image,
    imageAlt,
    tableLabel,
    unitsLabel,
    noteLabel,
    note,
    columns,
    rows,
  } = data;

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <SectionGlow className="relative overflow-hidden">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-12 sm:px-8 lg:px-[91px] lg:py-16">
        {/* Heading */}
        <div className="mb-8">
          {breadcrumb && (
            <div className="mb-3 flex items-center gap-3">
              <span className="font-space-grotesk text-[10px] font-medium uppercase tracking-[0.15em] text-white/50">
                {breadcrumb}
              </span>
              <span aria-hidden className="h-px w-8 bg-white/20" />
            </div>
          )}

          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <h2 className="font-space-grotesk font-bold uppercase leading-[1.05]">
              <span className="block text-[32px] text-white sm:text-[40px] lg:text-[48px]">
                {titleWhite}
              </span>
              <span className="block text-[28px] text-[#E51B24] sm:text-[34px] lg:text-[42px]">
                {titleRed}
              </span>
            </h2>

            {tolerance && (
              <p className="border-l-2 border-[#E51B24] pl-3 font-space-grotesk text-[11px] font-light text-white/60 lg:mt-2">
                {tolerance}
              </p>
            )}
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[1258px] flex-col gap-10 lg:gap-16">
          {/* Image — 1258 × 592.83, radius 14, bg #00000057 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[1258/592.83] w-full overflow-hidden rounded-[14px] bg-[#00000057]"
          >
            <img
              src={image}
              alt={imageAlt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-black/35" />
          </motion.div>

          {/* Table card — 1258 wide, radius 14, bg #141415 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full overflow-hidden rounded-[14px] bg-[#141415]"
            style={{
              border: "0.73px solid #2B2B2D",
              boxShadow: "0px 31.85px 89.18px 0px #00000059",
            }}
          >
            {/* Red left accent */}
            <span aria-hidden className="absolute bottom-0 left-0 top-0 z-10 w-[2px] bg-[#E51B24]" />

            {/* Title bar */}
            <div
              className="flex h-[54px] items-center justify-between px-6"
              style={{ borderBottom: HAIRLINE }}
            >
              <span className="flex items-center gap-3 font-space-grotesk text-[10px] font-bold uppercase tracking-[0.15em] text-white">
                <span className="text-[#E51B24]">01</span>
                {tableLabel}
              </span>
              <span className="font-space-grotesk text-[9px] font-medium uppercase tracking-[0.1em] text-white/45">
                {unitsLabel}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] table-fixed border-collapse font-space-grotesk">
                <colgroup>
                  {COLUMN_WIDTHS.map((w, i) => (
                    <col key={i} style={{ width: w }} />
                  ))}
                </colgroup>

                <thead>
                  <tr style={{ height: 61.15, borderBottom: HAIRLINE }}>
                    <th className="px-6 text-left text-[10px] font-bold uppercase tracking-[0.12em] text-white/70">
                      Size
                    </th>
                    {columns.map((col) => (
                      <th
                        key={col.key}
                        className="px-6 text-left text-[10px] font-bold uppercase leading-[13px] tracking-[0.12em] text-white/70"
                        style={{ borderLeft: HAIRLINE }}
                      >
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {rows.map((r, i) => {
                    const isActive = i === activeIndex;
                    return (
                      <tr
                        key={r.size}
                        onMouseEnter={() => setActiveIndex(i)}
                        className="transition-colors duration-200"
                        style={{
                          height: ROW_HEIGHT,
                          borderBottom: HAIRLINE,
                          backgroundColor: isActive ? "#3C3C3C80" : "transparent",
                        }}
                      >
                        <td className="px-6">
                          <div className="flex items-center gap-3">
                            <span
                              aria-hidden
                              className={`h-px w-[14px] transition-colors duration-200 ${
                                isActive ? "bg-[#E51B24]" : "bg-white/25"
                              }`}
                            />
                            <div className="flex flex-col gap-1">
                              <span
                                className={`font-bold leading-none text-white transition-all duration-200 ${
                                  isActive ? "text-[15px]" : "text-[12px]"
                                }`}
                              >
                                {r.size}
                              </span>
                              <span className="text-[8px] leading-none text-white/35">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                            </div>
                          </div>
                        </td>

                        {columns.map((col) => {
                          const value = r.measurements[col.key];
                          return (
                            <td
                              key={col.key}
                              className="px-6"
                              style={{ borderLeft: HAIRLINE }}
                            >
                              {value && (
                                <div className="flex flex-col gap-1">
                                  <span className="text-[13px] font-bold leading-none text-white">
                                    {value.cm}
                                    <span className="ml-1 text-[9px] font-normal text-white/45">
                                      cm
                                    </span>
                                  </span>
                                  <span className="text-[9px] leading-none text-white/40">
                                    {value.inch.toFixed(1)} in
                                  </span>
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Footer note */}
            <p className="flex min-h-[57px] items-center px-6 font-space-grotesk text-[10px] text-white/35">
              <span className="mr-1 font-semibold text-white/50">{noteLabel}</span>
              {note}
            </p>
          </motion.div>
        </div>
      </div>
    </SectionGlow>
  );
}