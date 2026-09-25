import { motion } from "framer-motion";
import SectionGlow from "@/shared/components/layout/SectionGlow";
import SectionHeaderblog from "@/shared/components/sections/SectionHeaderblog";
import { servicePerformance } from "@/assets";

/* -------------------------------------------------------------------------- */
/*  Types — API-ready                                                         */
/* -------------------------------------------------------------------------- */

export interface MaterialCallout {
  label: string;
  top: string;
  left: string;
}

export interface QualityRow {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
}

export interface QualitySystemStep {
  number: string;
  label: string;
}

export interface MaterialsQualitySectionProps {
  eyebrow?: string;
  title?: string;
  titleLine2?: string;
  highlight?: string;
  afterHighlight?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  imageWatermark?: string;
  imageCaption?: string;
  callouts?: MaterialCallout[];
  rows?: QualityRow[];
  systemLabel?: string;
  systemTitle?: string;
  systemSteps?: QualitySystemStep[];
}

/* -------------------------------------------------------------------------- */
/*  Default content                                                           */
/* -------------------------------------------------------------------------- */

const DEFAULT_CALLOUTS: MaterialCallout[] = [
  { label: "FABRIC", top: "38%", left: "18%" },
  { label: "STITCHING", top: "54%", left: "36%" },
  { label: "FINISHING", top: "68%", left: "16%" },
];

const DEFAULT_ROWS: QualityRow[] = [
  {
    id: "fabric-options",
    number: "01",
    category: "MATERIAL",
    title: "Fabric Options",
    description: "Select materials according to the product's intended use, performance requirements and feel.",
    tags: ["Fabric Weight", "GSM", "Hand Feel", "Performance"],
  },
  {
    id: "stitching-reinforcement",
    number: "02",
    category: "CONSTRUCTION",
    title: "Stitching & Reinforcement",
    description: "Construction details are considered for durability, fit and repeated training use.",
    tags: ["Stitching", "Reinforced Seams", "Measurements", "Shrinkage Control"],
  },
  {
    id: "color-product-control",
    number: "03",
    category: "CONSISTENCY",
    title: "Color & Product Control",
    description: "Maintain consistency across materials, colors, sizing and repeated production runs.",
    tags: ["Color Consistency", "Size Accuracy", "Batch Control"],
  },
  {
    id: "brand-applied-correctly",
    number: "04",
    category: "BRANDING & FINISHING",
    title: "Your Brand, Applied Correctly.",
    description: "Product branding can be applied through different techniques depending on the material and design.",
    tags: ["Embroidery", "Sublimation", "Screen Print", "Heat Transfer", "Woven Labels"],
  },
];

const DEFAULT_SYSTEM_STEPS: QualitySystemStep[] = [
  { number: "01", label: "Material" },
  { number: "02", label: "Construction" },
  { number: "03", label: "Branding" },
  { number: "04", label: "Inspection" },
  { number: "05", label: "Finished Product" },
];

/* -------------------------------------------------------------------------- */
/*  Image callout marker                                                     */
/* -------------------------------------------------------------------------- */

function CalloutMarker({ callout }: { callout: MaterialCallout }) {
  return (
    <span
      style={{ top: callout.top, left: callout.left }}
      className="absolute flex items-center gap-2 rounded-[6px] border border-white/10 bg-black/70 px-3 py-1.5 backdrop-blur-sm"
    >
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#E51B24]" />
      <span className="font-space-grotesk text-[10px] font-semibold uppercase tracking-[0.1em] text-white">
        {callout.label}
      </span>
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Row (right-hand list item)                                               */
/* -------------------------------------------------------------------------- */

function QualityRowItem({ row, index }: { row: QualityRow; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`flex gap-4 py-6 ${index > 0 ? "border-t border-white/10" : ""}`}
    >
      <span className="shrink-0 font-space-grotesk text-[13px] font-bold leading-none text-[#E51B24]">
        {row.number}
      </span>

      <div className="flex flex-1 flex-col gap-2">
        <span className="font-space-grotesk text-[10px] font-semibold uppercase tracking-[0.12em] text-white/35">
          {row.category}
        </span>

        <h3 className="font-space-grotesk text-[18px] font-bold text-white sm:text-[19px]">
          {row.title}
        </h3>

        <p className="max-w-[480px] font-space-grotesk text-[13px] font-light leading-relaxed text-white/55">
          {row.description}
        </p>

        <div className="mt-2 flex flex-wrap gap-2">
          {row.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-[4px] border border-white/10 bg-white/[0.03] px-2.5 py-1 font-space-grotesk text-[11px] font-light text-white/55"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Bottom "Quality System" step tracker — separate strip, top border only   */
/* -------------------------------------------------------------------------- */

function SystemStepTracker({
  label,
  title,
  steps,
}: {
  label: string;
  title: string;
  steps: QualitySystemStep[];
}) {
  return (
    <div
      className="mx-auto flex w-full max-w-[1187px] flex-col gap-6 px-1 py-7 sm:flex-row sm:items-center sm:justify-between"
      style={{ borderTop: "1.37px solid #FFFFFF1A" }}
    >
      <div className="flex flex-col gap-1.5">
        <span className="font-space-grotesk text-[10px] font-semibold uppercase tracking-[0.15em] text-[#E51B24]">
          {label}
        </span>
        <span className="font-space-grotesk text-[15px] font-bold uppercase text-white sm:text-[16px]">
          {title}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
        {steps.map((step, i) => (
          <span key={step.number} className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="font-space-grotesk text-[11px] font-bold text-[#E51B24]">
                {step.number}
              </span>
              <span className="font-space-grotesk text-[12px] font-medium text-white/70">
                {step.label}
              </span>
            </span>
            {i < steps.length - 1 && (
              <span aria-hidden className="text-white/25">
                →
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

export default function MaterialsQualitySection({
  eyebrow = "Materials & Quality",
  title = "PERFORMANCE STARTS",
  titleLine2,
  highlight = "UNDER THE",
  afterHighlight = " SURFACE.",
  description = "Product quality is more than appearance. Materials, construction, stitching and finishing all influence how a BJJ product performs and lasts.",
  image = servicePerformance,
  imageAlt = "Close-up of boxing gloves showing fabric and stitching detail",
  imageWatermark = "ROKAI / PRODUCTION",
  imageCaption = "ENGINEERED FOR PERFORMANCE",
  callouts = DEFAULT_CALLOUTS,
  rows = DEFAULT_ROWS,
  systemLabel = "QUALITY SYSTEM",
  systemTitle = "FROM MATERIAL TO FINISHED PRODUCT",
  systemSteps = DEFAULT_SYSTEM_STEPS,
}: MaterialsQualitySectionProps) {
  return (
    <SectionGlow className="relative overflow-hidden">
      <SectionHeaderblog
        bare
        eyebrow={eyebrow}
        title={title}
        titleLine2={titleLine2}
        highlight={highlight}
        afterHighlight={afterHighlight}
        highlightPosition="start"
        accentColor="#E51B24"
        description={description}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-[30px]">
        <div
          className="w-full overflow-hidden"
          style={{
            borderRadius: "19.13px",
            background: "#151515",
            border: "1.37px solid #FFFFFF17",
          }}
        >
          <div className="grid grid-cols-1 items-stretch lg:grid-cols-[1fr_1.05fr]">
            {/* LEFT — image stretched to match right column's height */}
            <div className="relative m-4 overflow-hidden rounded-[14px] lg:m-6 lg:mr-3">
              <div className="relative h-[420px] w-full overflow-hidden rounded-[14px] lg:h-full lg:min-h-[520px]">
                <img
                  src={image}
                  alt={imageAlt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.85) 100%)",
                  }}
                />

                {callouts.map((callout) => (
                  <CalloutMarker key={callout.label} callout={callout} />
                ))}

                <div className="absolute bottom-6 left-6 flex flex-col gap-1">
                  <span className="font-space-grotesk text-[10px] font-semibold uppercase tracking-[0.15em] text-[#E51B24]">
                    {imageWatermark}
                  </span>
                  <span className="font-space-grotesk text-[16px] font-bold uppercase text-white sm:text-[18px]">
                    {imageCaption}
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT — rows */}
            <div className="flex flex-col justify-center px-6 py-6 lg:py-8 lg:pl-3 lg:pr-8">
              {rows.map((row, i) => (
                <QualityRowItem key={row.id} row={row} index={i} />
              ))}
            </div>
          </div>

          {/* BOTTOM — separate step tracker strip, top border only, centered to 1187px */}
         
        </div>
         <div className="px-6 pb-6 lg:px-8">
            <SystemStepTracker label={systemLabel} title={systemTitle} steps={systemSteps} />
          </div>
      </div>

      <div className="h-16 sm:h-20 lg:h-24" />
    </SectionGlow>
  );
}