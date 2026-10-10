import { useState } from "react";
import { motion } from "framer-motion";
import SectionGlow from "@/shared/components/layout/SectionGlow";
import type { SizeChartTableData } from "@/shared/types/sizeChart";

interface SizeChartSectionProps {
  data: SizeChartTableData;
}

const HAIRLINE = "0.73px solid #28282A";
const ROW_HEIGHT = 86.63;

// "157 cm 61.8 in"  ->  { cm: "157", inch: "61.8" }
const CM_IN = /^([\d.–-]+)\s*cm\s+([\d.–-]+)\s*in$/i;

// Splits "Men's BJJ Gi Size Chart (A0–A5)" into a white and a red half.
function splitTitle(title: string) {
  const words = title.trim().split(/\s+/);
  if (words.length < 3) return { white: title, red: "" };
  const mid = Math.ceil(words.length / 2);
  return { white: words.slice(0, mid).join(" "), red: words.slice(mid).join(" ") };
}

function Cell({ value }: { value: string }) {
  const match = value.match(CM_IN);

  if (match) {
    return (
      <div className="flex flex-col gap-1">
        <span className="text-[13px] font-bold leading-none text-white">
          {match[1]}
          <span className="ml-1 text-[9px] font-normal text-white/45">cm</span>
        </span>
        <span className="text-[9px] leading-none text-white/40">{match[2]} in</span>
      </div>
    );
  }

  // Short values (ranges, sizes) are bold; long text (notes) is muted.
  return value.length <= 14 ? (
    <span className="text-[13px] font-bold leading-[16px] text-white">{value}</span>
  ) : (
    <span className="text-[11px] leading-[16px] text-white/60">{value}</span>
  );
}

export default function SizeChartSection({ data }: SizeChartSectionProps) {
  const {
    breadcrumb,
    title,
    description,
    image,
    imageAlt,
    tableLabel,
    unitsLabel,
    noteLabel,
    note,
    headers,
    rows,
  } = data;

  const [activeIndex, setActiveIndex] = useState(0);
  const { white, red } = splitTitle(title);

  // Wide charts (shorts, rashguards) need more room than 3-column belt charts.
  const minWidth = headers.length > 5 ? "min-w-[900px]" : "min-w-[560px]";

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
                {white}
              </span>
              {red && (
                <span className="block text-[28px] text-[#E51B24] sm:text-[34px] lg:text-[42px]">
                  {red}
                </span>
              )}
            </h2>

            {description && (
              <p className="border-l-2 border-[#E51B24] pl-3 font-space-grotesk text-[11px] font-light text-white/60 lg:mt-2">
                {description}
              </p>
            )}
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[1258px] flex-col gap-10 lg:gap-16">
          {/* Image */}
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

          {/* Table card */}
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
              <table className={`w-full ${minWidth} border-collapse font-space-grotesk`}>
                <thead>
                  <tr style={{ height: 61.15, borderBottom: HAIRLINE }}>
                    {headers.map((header, i) => (
                      <th
                        key={`${header}-${i}`}
                        className="px-6 text-left text-[10px] font-bold uppercase leading-[13px] tracking-[0.12em] text-white/70"
                        style={i > 0 ? { borderLeft: HAIRLINE } : undefined}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {rows.map((row, rowIndex) => {
                    const isActive = rowIndex === activeIndex;

                    return (
                      <tr
                        key={`${row[0]}-${rowIndex}`}
                        onMouseEnter={() => setActiveIndex(rowIndex)}
                        className="transition-colors duration-200"
                        style={{
                          height: ROW_HEIGHT,
                          borderBottom: HAIRLINE,
                          backgroundColor: isActive ? "#3C3C3C80" : "transparent",
                        }}
                      >
                        {/* First column = size label */}
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
                                {row[0]}
                              </span>
                              <span className="text-[8px] leading-none text-white/35">
                                {String(rowIndex + 1).padStart(2, "0")}
                              </span>
                            </div>
                          </div>
                        </td>

                        {row.slice(1).map((value, cellIndex) => (
                          <td
                            key={cellIndex}
                            className="px-6"
                            style={{ borderLeft: HAIRLINE }}
                          >
                            {value && <Cell value={value} />}
                          </td>
                        ))}
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