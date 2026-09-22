"use client";

import SectionGlow from "@/shared/components/layout/SectionGlow";
import SectionHeaderblog from "@/shared/components/sections/SectionHeaderblog";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, ShieldCheck, X } from "lucide-react";


const cardStyle: React.CSSProperties = {
  background: "linear-gradient(94.04deg, #161616 0%, #121212 100%)",
  borderColor: "#303030",
};

interface TierRow {
  tier: string;
  apparelOrder: string;
  totalValue: string;
  roi: string;
}

const tierRows: TierRow[] = [
  { tier: "Ascension Starter", apparelOrder: "$500–$1,000", totalValue: "~$800", roi: "2x" },
  { tier: "Momentum Builder", apparelOrder: "$1,001–$2,000", totalValue: "~$2,650+", roi: "3x–4x" },
  { tier: "Authority Boost", apparelOrder: "$2,001–$5,000", totalValue: "~$3,800+", roi: "3x+" },
  { tier: "Champion Engine", apparelOrder: "$5,001–$8,000", totalValue: "~$6,000+", roi: "5x–7x" },
  { tier: "Legend Status", apparelOrder: "$8,001–$10,000+", totalValue: "~$10,000+", roi: "8x–15x" },
];

function TierValueTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={cardStyle}
      className="overflow-hidden rounded-[14px] border"
    >
      {/* header row */}
      <div className="grid grid-cols-[1.4fr_1fr_1fr_0.6fr] gap-2 bg-black/30 px-6 py-3">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-white/40">Tier</span>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-white/40">
          Apparel Order
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-white/40">
          Total Value
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-white/40">ROI</span>
      </div>

      {/* rows */}
      <div>
        {tierRows.map((row, i) => (
          <div
            key={row.tier}
            className={`grid grid-cols-[1.4fr_1fr_1fr_0.6fr] items-center gap-2 px-6 py-3.5 ${
              i !== tierRows.length - 1 ? "border-b border-white/5" : ""
            }`}
          >
            <span className="text-[13px] font-medium text-white">{row.tier}</span>
            <span className="text-[13px] text-white/60">{row.apparelOrder}</span>
            <span className="text-[13px] text-white/60">{row.totalValue}</span>
            <span className="text-[13px] font-bold text-[#E63946]">{row.roi}</span>
          </div>
        ))}
      </div>

      {/* footer CTA */}
      <div className="flex flex-col items-start gap-3 border-t border-white/10 bg-black/20 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-[11px] leading-snug text-white/50">
          Get the complete partnership guide and see how your club can benefit. Includes pricing,
          process &amp; exclusive club benefits.
        </p>
        <button className="flex shrink-0 items-center gap-1.5 rounded-md bg-[#E63946] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#d12f3b]">
          Download PDF
          <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </motion.div>
  );
}

interface Guarantee {
  title: string;
  description: string;
}

const guarantees: Guarantee[] = [
  {
    title: "QUALITY DOMINANCE",
    description: "Any product below our site standard is replaced immediately, no questions asked.",
  },
  {
    title: "VISIBILITY GROWTH",
    description:
      "Your club WILL look stronger and more professional — or we upgrade your bonuses for free.",
  },
  {
    title: "PRIORITY PRODUCTION",
    description: "Your apparel never waits in regular queues. Your club's moved ahead of everyone else.",
  },
];

function GuaranteesCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={cardStyle}
      className="flex flex-col gap-4 rounded-[14px] border px-6 py-5"
    >
      <div>
        <div className="mb-2 flex items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#E63946]">
            Security &amp; confidence
          </span>
          <span className="h-px w-8 bg-[#E63946]" />
        </div>
        <h3 className="font-space-grotesk text-base font-bold uppercase text-white">
          Rokai Iron-Clad Guarantees
        </h3>
      </div>

      <div className="flex flex-col gap-3">
        {guarantees.map((g) => (
          <div
            key={g.title}
            className="flex items-start gap-3 border-t border-white/5 pt-3 first:border-t-0 first:pt-0"
          >
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#E63946]/50 text-[#E63946]">
              <ShieldCheck className="h-3.5 w-3.5" />
            </span>
            <div>
              <p className="font-space-grotesk text-[11px] font-bold uppercase tracking-wide text-[#E63946]">
                {g.title}
              </p>
              <p className="mt-1 text-[11px] leading-snug text-white/50">{g.description}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function FinalMessageBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.5,
        delay: 0.2,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative mx-auto mt-4 flex min-h-[376px] w-full max-w-[1180px] flex-col justify-between gap-6 overflow-hidden rounded-[14px] border border-white/10 px-6 py-6 md:flex-row md:items-center md:px-8"
      style={{
        background:
          "linear-gradient(100.39deg, #0B0B0B 0%, #171010 100%)",
      }}
    >
      {/* Top gradient line */}
      <div
        className="absolute left-0 top-0 h-[3px] w-full"
        style={{
          background:
            "linear-gradient(90deg, #E63946 0%, rgba(230, 57, 70, 0) 100%)",
        }}
      />

      {/* left */}
      <div className="flex max-w-md flex-col gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#E63946]">
              Final Message to Clubs
            </span>

            <span className="h-px w-8 bg-[#E63946]" />
          </div>

          <p className="font-space-grotesk lg:text-3xl font-bold uppercase leading-snug text-white md:text-2xl ">
            You&apos;re getting{" "}
            <span className="text-[#E63946]">$800 to $10,000+</span> in value
            for simply ordering what your athletes already need.
          </p>
        </div>

        <div className="inline-flex w-fit flex-col gap-1 rounded-md border border-white/10 bg-black/30 px-4 py-2.5">
          <span className="text-[10px] uppercase tracking-widest text-white/40">
            Your competitors get:
          </span>

          <span className="flex items-center gap-1.5 text-xs font-semibold text-[#E63946]">
            <X className="h-3.5 w-3.5" />
            Nothing.
          </span>
        </div>
      </div>

      {/* right */}
      <div className="flex w-full max-w-sm flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          {["Dominance", "Authority", "Growth", "Prestige"].map((tag) => (
            <div
              key={tag}
              className="flex items-center gap-1.5 bg-[#181818]  rounded-md border border-white/10  px-3 py-2.5 text-[14px] font-medium text-white/80"
            >
              <Check className="h-3.5 w-3.5 shrink-0 text-white/80" />
              {tag}
            </div>
          ))}
        </div>

        <button className="flex w-full items-center justify-center gap-1.5 rounded-md bg-gradient-to-r from-[#E63946] to-[#b3202b] py-3 text-sm font-semibold uppercase text-white transition hover:opacity-90">
          Maximum Visibility
          <ArrowUpRight className="h-4 w-4" />
        </button>

        <p className="text-center text-[9px] italic text-white/30 md:text-left">
          *Think the next club founder prestige driver sponsorship system in
          the BJJ world.
        </p>
      </div>
    </motion.div>
  );
}
export default function EquipYourAcademySection() {
  return (
    <SectionGlow>
      <SectionHeaderblog
        eyebrow="Value recap summary"
        title="EQUIP YOUR ACADEMY."
        highlightPrefix="BUILD YOUR "
        highlight="BRAND."
        description="Everything you need to equip your academy with world-class gear and build your local brand."
        accentColor="#E63946"
        bare
      />
      <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 gap-4 px-5 lg:grid-cols-[1.5fr_1fr] lg:px-0 py-5">
        <TierValueTable />
        <GuaranteesCard />
      </div>
      <FinalMessageBanner />
    </SectionGlow>
  );
}