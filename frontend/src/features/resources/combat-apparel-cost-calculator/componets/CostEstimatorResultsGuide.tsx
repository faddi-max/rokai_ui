import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  costBreakdownItems,
  costFactors,
  fabricSwatches,
  quoteCta,
  pricingScenarios,
  type FabricSwatch,
} from "../data/resultsGuide.data";

const DARK_CARD_BG = "#0C0C0D";
const CTA_BG =
  "linear-gradient(100deg, rgba(230,57,70,0.28) 0%, rgba(120,24,32,0.16) 40%, #0E0E0E 100%)";
const FABRIC_CARD_BG =
  "linear-gradient(135deg, rgba(230,57,70,0.42) 0%, rgba(120,24,32,0.28) 38%, #0E0E0E 78%)";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
};

/* CSS fallback textures so the section renders without photo assets. */
const TEXTURES: Record<FabricSwatch["texture"], string> = {
  satin:
    "linear-gradient(115deg, #0a0a0a 0%, #2b2b2e 22%, #101012 38%, #3a3a3d 55%, #0d0d0f 72%, #232326 100%)",
  spandex:
    "radial-gradient(circle at 20% 30%, #4a4a4d 0 2px, transparent 3px), radial-gradient(circle at 60% 60%, #3a3a3d 0 2px, transparent 3px), linear-gradient(135deg, #151517, #26262a)",
  nylon:
    "linear-gradient(100deg, #1b1b1d 0%, #333336 30%, #121214 55%, #2a2a2d 80%, #1a1a1c 100%)",
  knit:
    "repeating-linear-gradient(45deg, #2a2a2d 0 2px, #131315 2px 5px), linear-gradient(#111, #111)",
};

function Heading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <span className="font-space-grotesk text-[9px] font-medium uppercase tracking-[0.15em] text-[#E63946]">
        {eyebrow}
      </span>
      <h2 className="mt-2 font-space-grotesk text-[24px] font-bold leading-[1.15] text-white sm:text-[28px]">
        {title}
      </h2>
      <p className="mt-3 max-w-[560px] font-space-grotesk text-[11px] font-normal leading-[17px] text-white/50 sm:text-[12px]">
        {description}
      </p>
    </div>
  );
}

function SwatchTile({ swatch, index }: { swatch: FabricSwatch; index: number }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease }}
      className="group flex flex-col overflow-hidden rounded-[6px] border border-white/10 bg-[#0B0B0B] transition-colors duration-300 hover:border-[#E63946]/50"
    >
      <div className="aspect-[3/1.6] w-full overflow-hidden bg-black sm:aspect-[3/1.35]">
        {swatch.image ? (
          <img
            src={swatch.image}
            alt={swatch.imageAlt}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div
            role="img"
            aria-label={swatch.imageAlt}
            className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-105"
            style={{ background: TEXTURES[swatch.texture], backgroundSize: swatch.texture === "spandex" ? "10px 10px, 14px 14px, 100% 100%" : undefined }}
          />
        )}
      </div>
      <figcaption className="flex h-[28px] items-center justify-center border-t border-white/10 px-1 text-center font-space-grotesk text-[8px] font-normal leading-none text-white/80 sm:text-[9px]">
        {swatch.label}
      </figcaption>
    </motion.figure>
  );
}

function FabricDetails() {
  return (
    <motion.div
      {...fadeUp}
      transition={{ duration: 0.55, ease }}
      className="rounded-[12px] border border-white/10 p-5 sm:p-6"
      style={{ background: FABRIC_CARD_BG }}
    >
      <Heading
        eyebrow="Material inspiration"
        title="Fabric & material details"
        description="Fabric appearance and texture can influence the feel, performance and positioning of your apparel range. Final materials are confirmed during quotation."
      />
      <div className="mt-5 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        {fabricSwatches.map((s, i) => (
          <SwatchTile key={s.id} swatch={s} index={i} />
        ))}
      </div>
    </motion.div>
  );
}

function ReadResults() {
  return (
    <motion.div
      {...fadeUp}
      transition={{ duration: 0.55, ease }}
      className="rounded-[12px] border border-white/10 p-5 sm:p-6"
      style={{ background: DARK_CARD_BG }}
    >
      <Heading
        eyebrow="Read your results"
        title="What your estimate tells you"
        description="The results panel is designed to make the key numbers easy to scan. Use these figures to compare early product concepts — not as a final supplier quotation."
      />

      <div className="mt-5 grid grid-cols-1 gap-3 lg:grid-cols-2">
        {/* Cost breakdown */}
        <div className="rounded-[6px] border border-white/10 bg-black/30 p-4 sm:p-5">
          <h3 className="font-space-grotesk text-[12px] font-bold text-white sm:text-[13px]">
            Cost breakdown
          </h3>
          <p className="mt-2 font-space-grotesk text-[9px] leading-[14px] text-white/50 sm:text-[10px]">
            Understand the main cost groups behind your planning estimate.
          </p>
          <dl className="mt-4">
            {costBreakdownItems.map((row) => (
              <div
                key={row.id}
                className="flex items-center justify-between gap-4 border-t border-white/10 py-2.5 font-space-grotesk text-[9px] sm:text-[10px]"
              >
                <dt className="text-white/60">{row.label}</dt>
                <dd className="text-right font-bold text-white">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Pricing scenarios */}
        <div className="rounded-[6px] border border-white/10 bg-black/30 p-4 sm:p-5">
          <h3 className="font-space-grotesk text-[12px] font-bold text-white sm:text-[13px]">
            Pricing scenarios
          </h3>
          <p className="mt-2 font-space-grotesk text-[9px] leading-[14px] text-white/50 sm:text-[10px]">
            Use the indicative price scenarios to explore how your cost base could translate into selling prices.
          </p>
          <ul className="mt-4 flex flex-col gap-2">
            {pricingScenarios.map((p) => (
              <li
                key={p.id}
                className="flex gap-2 font-space-grotesk text-[9px] leading-[14px] text-white/50 sm:text-[10px]"
              >
                <span aria-hidden className="mt-[5px] size-[3px] shrink-0 rounded-full bg-white/70" />
                <span>
                  <strong className="font-bold text-white/80">{p.term}:</strong> {p.description}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

function CostFactors() {
  return (
    <motion.div
      {...fadeUp}
      transition={{ duration: 0.55, ease }}
      className="rounded-[12px] border border-white/10 p-5 sm:p-6"
      style={{ background: DARK_CARD_BG }}
    >
      <Heading
        eyebrow="Before you request a quote"
        title="What affects your final manufacturing cost?"
        description="A production quote depends on the complete technical brief. These are common specification areas the ROKAI team may need to confirm before pricing can be finalized."
      />
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {costFactors.map((f, i) => (
          <motion.article
            key={f.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: (i % 3) * 0.07, ease }}
            whileHover={{ y: -3, borderColor: "rgba(230, 57, 70, 0.4)" }}
            className="flex min-h-[78px] items-start gap-3 rounded-[6px] border border-white/10 bg-black/30 p-3.5"
          >
            <span className="flex size-[22px] shrink-0 items-center justify-center rounded-full border border-[#E63946]/30 bg-[#E63946]/15 font-space-grotesk text-[9px] font-bold text-[#E63946]">
              {f.letter}
            </span>
            <div className="min-w-0">
              <h3 className="font-space-grotesk text-[10px] font-bold leading-[13px] text-white sm:text-[11px]">
                {f.title}
              </h3>
              <p className="mt-1.5 font-space-grotesk text-[8px] leading-[12px] text-white/50 sm:text-[9px] sm:leading-[13px]">
                {f.description}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.div>
  );
}

export function QuoteCta() {
  return (
    <motion.div
      {...fadeUp}
      transition={{ duration: 0.55, ease }}
      className="flex flex-col gap-6 rounded-[12px] border border-[#E63946]/40 p-5 sm:p-6 md:flex-row md:items-center md:justify-between"
      style={{ background: CTA_BG }}
    >
      <div>
        <span className="font-space-grotesk text-[9px] font-medium uppercase tracking-[0.15em] text-[#E63946]">
          {quoteCta.eyebrow}
        </span>
        <h2 className="mt-2 font-space-grotesk text-[24px] font-bold leading-[1.15] text-white sm:text-[28px]">
          {quoteCta.title}
        </h2>
        <p className="mt-3 max-w-[520px] font-space-grotesk text-[11px] leading-[17px] text-white/50 sm:text-[12px]">
          {quoteCta.description}
        </p>
      </div>
      <a
        href={quoteCta.href}
        className="flex h-[44px] shrink-0 items-center justify-center gap-1.5 rounded-[4px] bg-[#E63946] px-8 font-space-grotesk text-[11px] font-bold uppercase tracking-[0.04em] text-white transition-colors hover:bg-[#ee4250] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:min-w-[270px]"
      >
        {quoteCta.label}
        <ArrowUpRight size={12} aria-hidden />
      </a>
    </motion.div>
  );
}

export default function CostEstimatorResultsGuide() {
  return (
    <section className="relative w-full bg-transparent">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-5 px-5 pb-14 pt-2 sm:px-8 lg:gap-6 lg:pb-20">
        <FabricDetails />
        <ReadResults />
        <CostFactors />
        <QuoteCta />
      </div>
    </section>
  );
}
