import { useState } from "react";
import { motion } from "framer-motion";
import SectionGlow from "@/shared/components/layout/SectionGlow";
import type { FabricCollection } from "@/shared/types/fabrics";

interface FabricsSectionProps {
  data: FabricCollection;
}

const HAIRLINE = "0.73px solid #242424";
const COLUMN_WIDTHS = ["16%", "11%", "13%", "22%", "22%", "16%"];
const HEADERS = [
  "Fabric Name",
  "GSM / Weave Type",
  "Composition",
  "Key Features",
  "Athletic Benefits",
  "Training Tier / Use Case",
];

export default function FabricsSection({ data }: FabricsSectionProps) {
  const {
    id,
    breadcrumb,
    titleWhite,
    titleRed,
    description,
    image,
    imageAlt,
    tableLabel,
    tableMeta,
    note,
    rows,
  } = data;

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <SectionGlow className="relative overflow-hidden">
      <div
        id={id}
        className="mx-auto w-full max-w-[1440px] scroll-mt-40 px-5 py-12 sm:px-8 lg:px-[91px] lg:py-16"
      >
        {/* Header */}
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="font-space-grotesk text-[10px] font-medium uppercase tracking-[0.15em] text-white/50">
                {breadcrumb}
              </span>
              <span aria-hidden className="h-px w-8 bg-white/20" />
            </div>
            <h2 className="font-space-grotesk font-bold uppercase leading-[1.05]">
              <span className="block text-[32px] text-white sm:text-[40px] lg:text-[48px]">
                {titleWhite}
              </span>
              <span className="block text-[32px] text-[#E51B24] sm:text-[40px] lg:text-[48px]">
                {titleRed}
              </span>
            </h2>
          </div>

          <p className="max-w-[340px] border-l-2 border-[#E51B24] pl-4 font-space-grotesk text-[12px] font-light leading-[19px] text-white/65">
            {description}
          </p>
        </div>

        {/* Image + table — 64px gap, both centered in the 1440 frame */}
        <div className="flex w-full flex-col items-center gap-10 lg:gap-16">
          {/* Image: 1258 × 616, radius 14, bg #00000057 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[1258/616] w-full max-w-[1258px] overflow-hidden rounded-[14px] bg-[#00000057]"
          >
            <img
              src={image}
              alt={imageAlt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-black/30" />
          </motion.div>

          {/* Table card: 1265 × 912.12, radius 15.37, bg #171717 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex w-full max-w-[1265px] flex-col overflow-hidden bg-[#171717] lg:h-[912.12px]"
            style={{
              borderRadius: "15.37px",
              border: HAIRLINE,
              boxShadow: "0px 21.96px 49.41px 0px #00000024",
            }}
          >
            {/* Card header */}
            <div
              className="flex h-[54px] shrink-0 items-center justify-between px-6"
              style={{ borderBottom: HAIRLINE }}
            >
              <span className="flex items-center gap-3 font-space-grotesk text-[10px] font-bold uppercase tracking-[0.15em] text-white">
                <span aria-hidden className="size-[6px] rounded-full bg-[#E51B24]" />
                {tableLabel}
              </span>
              {tableMeta && (
                <span className="font-space-grotesk text-[9px] font-medium uppercase tracking-[0.1em] text-white/45">
                  {tableMeta}
                </span>
              )}
            </div>

            {/* Table: flex-1 so the rows stretch to fill the fixed card height */}
            <div className="min-h-0 flex-1 overflow-x-auto">
              <table className="h-full w-full min-w-[1000px] table-fixed border-collapse font-space-grotesk">
                <colgroup>
                  {COLUMN_WIDTHS.map((w, i) => (
                    <col key={i} style={{ width: w }} />
                  ))}
                </colgroup>

                <thead>
                  <tr style={{ height: 52, borderBottom: HAIRLINE }}>
                    {HEADERS.map((h, i) => (
                      <th
                        key={h}
                        className="px-6 text-left text-[9px] font-bold uppercase leading-[12px] tracking-[0.12em] text-white/60"
                        style={i > 0 ? { borderLeft: HAIRLINE } : undefined}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {rows.map((r, i) => {
                    const isActive = i === activeIndex;
                    return (
                      <tr
                        key={r.id}
                        onMouseEnter={() => setActiveIndex(i)}
                        className="align-middle transition-colors duration-200"
                        style={{
                          minHeight: 100,
                          borderBottom: i === rows.length - 1 ? undefined : HAIRLINE,
                          backgroundColor: isActive ? "#3C3C3C80" : "transparent",
                        }}
                      >
                        {/* Fabric name */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <span aria-hidden className="h-[34px] w-[2px] shrink-0 bg-[#E51B24]" />
                            <div>
                              <span className="block text-[9px] font-bold uppercase tracking-[0.12em] text-white">
                                {r.brand}
                              </span>
                              <span className="mt-0.5 block text-[13px] font-bold leading-[16px] text-white">
                                {r.name}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* GSM / weave */}
                        <td className="px-6 py-5" style={{ borderLeft: HAIRLINE }}>
                          <span className="block text-[12px] font-bold text-white">{r.gsm}</span>
                          <span className="mt-1 block text-[9px] text-white/40">{r.weave}</span>
                        </td>

                        {/* Composition */}
                        <td className="px-6 py-5" style={{ borderLeft: HAIRLINE }}>
                          <span className="block text-[11px] font-bold leading-[15px] text-white">
                            {r.composition}
                          </span>
                          {r.compositionNote && (
                            <span className="block text-[11px] font-bold leading-[15px] text-white">
                              {r.compositionNote}
                            </span>
                          )}
                        </td>

                        {/* Key features */}
                        <td
                          className="px-6 py-5 text-[10px] leading-[16px] text-white/55"
                          style={{ borderLeft: HAIRLINE }}
                        >
                          {r.keyFeatures}
                        </td>

                        {/* Athletic benefits */}
                        <td
                          className="px-6 py-5 text-[10px] leading-[16px] text-white/55"
                          style={{ borderLeft: HAIRLINE }}
                        >
                          {r.athleticBenefits}
                        </td>

                        {/* Training tier / use case */}
                        <td className="px-6 py-5" style={{ borderLeft: HAIRLINE }}>
                          <span
                            aria-hidden
                            className={`mb-2 block h-[2px] w-[18px] transition-colors duration-200 ${
                              isActive ? "bg-[#E51B24]" : "bg-[#E51B24]/80"
                            }`}
                          />
                          {r.useCase.map((u) => (
                            <span
                              key={u}
                              className="block text-[10px] leading-[14px] text-white/80"
                            >
                              {u}
                            </span>
                          ))}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Footnote */}
            <p
              className="flex min-h-[48px] shrink-0 items-center px-6 font-space-grotesk text-[10px] text-white/35"
              style={{ borderTop: HAIRLINE }}
            >
              <span className="mr-1 font-bold uppercase text-white/55">ROKAI Fabric System</span>
              <span className="mr-1 text-white/35">-</span>
              {note}
            </p>
          </motion.div>
        </div>
      </div>
    </SectionGlow>
  );
}