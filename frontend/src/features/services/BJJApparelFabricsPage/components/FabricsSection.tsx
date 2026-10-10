import { useState } from "react";
import { motion } from "framer-motion";
import SectionGlow from "@/shared/components/layout/SectionGlow";
import type { FabricTableData } from "@/shared/types/fabrics";

interface FabricsSectionProps {
  data: FabricTableData;
}

const HAIRLINE = "0.73px solid #242424";

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

// "1. Cotton … 2. Twill …" or "A • B • C"  ->  separate lines
function splitItems(text: string): string[] {
  const numberedMarkers = text.match(/(?:^|\s)\d{1,2}\.\s/g)?.length ?? 0;

  if (numberedMarkers >= 2) {
    return text.split(/(?:^|\s)\d{1,2}\.\s+/).map((s) => s.trim()).filter(Boolean);
  }
  if (text.includes("•")) {
    return text.split("•").map((s) => s.trim()).filter(Boolean);
  }
  return [text];
}

// "220 GSM / Compression Lycra Inner" -> ["220 GSM", "Compression Lycra Inner"]
function splitSpec(text: string): [string, string] {
  const i = text.indexOf(" / ");
  return i === -1 ? [text, ""] : [text.slice(0, i), text.slice(i + 3)];
}

// Splits "Griappling" + " / " lines for the last (use case) column
function splitUseCase(text: string): string[] {
  return text.split(" / ").map((s) => s.trim()).filter(Boolean);
}

// Splits the title in two halves (white / red)
function splitTitle(title: string) {
  const words = title.trim().split(/\s+/);
  if (words.length < 3) return { white: title, red: "" };
  const mid = Math.ceil(words.length / 2);
  return { white: words.slice(0, mid).join(" "), red: words.slice(mid).join(" ") };
}

function TextCell({ value, bold = false }: { value: string; bold?: boolean }) {
  if (!value) return null;

  const items = splitItems(value);

  if (items.length > 1) {
    return (
      <ul className="flex flex-col gap-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-[10px] leading-[16px] text-white/55">
            <span aria-hidden className="mt-[7px] h-px w-2 shrink-0 bg-[#E51B24]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  return bold ? (
    <span className="block text-[11px] font-bold leading-[15px] text-white">{value}</span>
  ) : (
    <span className="block text-[10px] leading-[16px] text-white/55">{value}</span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

export default function FabricsSection({ data }: FabricsSectionProps) {
  const {
    id,
    breadcrumb,
    title,
    description,
    image,
    imageAlt,
    tableLabel,
    tableMeta,
    note,
    headers,
    rows,
  } = data;

  const [activeIndex, setActiveIndex] = useState(0);
  const { white, red } = splitTitle(title);

  const lastIndex = headers.length - 1;
  const hasUseCaseColumn = /use case|tier/i.test(headers[lastIndex] ?? "");
  const compositionIndex = headers.findIndex((h) => /composition/i.test(h));

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
                {white}
              </span>
              {red && (
                <span className="block text-[32px] text-[#E51B24] sm:text-[40px] lg:text-[48px]">
                  {red}
                </span>
              )}
            </h2>
          </div>

          {description && (
            <p className="max-w-[340px] border-l-2 border-[#E51B24] pl-4 font-space-grotesk text-[12px] font-light leading-[19px] text-white/65">
              {description}
            </p>
          )}
        </div>

        <div className="flex w-full flex-col items-center gap-10 lg:gap-16">
          {/* Image */}
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

          {/* Table card (height follows the content) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex w-full max-w-[1265px] flex-col overflow-hidden bg-[#171717]"
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

            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] table-fixed border-collapse font-space-grotesk">
                <thead>
                  <tr style={{ height: 52, borderBottom: HAIRLINE }}>
                    {headers.map((h, i) => (
                      <th
                        key={`${h}-${i}`}
                        className={`px-6 text-left text-[9px] font-bold uppercase leading-[12px] tracking-[0.12em] text-white/60 ${
                          i === 0 ? "w-[17%]" : ""
                        }`}
                        style={i > 0 ? { borderLeft: HAIRLINE } : undefined}
                      >
                        {h}
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
                        className="align-top transition-colors duration-200"
                        style={{
                          borderBottom: rowIndex === rows.length - 1 ? undefined : HAIRLINE,
                          backgroundColor: isActive ? "#3C3C3C80" : "transparent",
                        }}
                      >
                        {row.map((value, cellIndex) => {
                          const cellStyle =
                            cellIndex > 0 ? { borderLeft: HAIRLINE } : undefined;

                          /* Column 0: fabric name */
                          if (cellIndex === 0) {
                            return (
                              <td key={cellIndex} className="px-6 py-5">
                                <div className="flex items-start gap-3">
                                  <span
                                    aria-hidden
                                    className="mt-0.5 h-[34px] w-[2px] shrink-0 bg-[#E51B24]"
                                  />
                                  <div>
                                    <span className="block text-[9px] font-bold uppercase tracking-[0.12em] text-white">
                                      ROKAI
                                    </span>
                                    <span className="mt-0.5 block text-[13px] font-bold leading-[16px] text-white">
                                      {value.replace(/^ROKAI\s+/i, "")}
                                    </span>
                                  </div>
                                </div>
                              </td>
                            );
                          }

                          /* Column 1: GSM / weave */
                          if (cellIndex === 1) {
                            const [main, sub] = splitSpec(value);
                            return (
                              <td key={cellIndex} className="px-6 py-5" style={cellStyle}>
                                <span className="block text-[12px] font-bold text-white">
                                  {main}
                                </span>
                                {sub && (
                                  <span className="mt-1 block text-[9px] text-white/40">{sub}</span>
                                )}
                              </td>
                            );
                          }

                          /* Last column: use case / tier */
                          if (hasUseCaseColumn && cellIndex === lastIndex) {
                            return (
                              <td key={cellIndex} className="px-6 py-5" style={cellStyle}>
                                {value && (
                                  <>
                                    <span
                                      aria-hidden
                                      className={`mb-2 block h-[2px] w-[18px] transition-colors duration-200 ${
                                        isActive ? "bg-[#E51B24]" : "bg-[#E51B24]/80"
                                      }`}
                                    />
                                    {splitUseCase(value).map((u) => (
                                      <span
                                        key={u}
                                        className="block text-[10px] leading-[14px] text-white/80"
                                      >
                                        {u}
                                      </span>
                                    ))}
                                  </>
                                )}
                              </td>
                            );
                          }

                          /* Everything else (composition, features, benefits…) */
                          return (
                            <td key={cellIndex} className="px-6 py-5" style={cellStyle}>
                              <TextCell
                                value={value}
                                bold={cellIndex === compositionIndex && value.length <= 40}
                              />
                            </td>
                          );
                        })}
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