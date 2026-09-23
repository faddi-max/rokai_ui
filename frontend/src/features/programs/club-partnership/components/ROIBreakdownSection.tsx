import { motion } from "framer-motion";
import SectionGlow from "@/shared/components/layout/SectionGlow";
import SectionHeaderblog from "@/shared/components/sections/SectionHeaderblog";


type ROIRow = {
  component: string;
  coreBenefit: string;
  businessImpact: string;
  roiPotential: string;
};

const rows: ROIRow[] = [
  {
    component: "Custom Apparel Line",
    coreBenefit: "Stronger academy identity and premium positioning",
    businessImpact: "Supports higher perceived brand value",
    roiPotential: "Potentially stronger product margins",
  },
  {
    component: "E-Commerce Store",
    coreBenefit: "24/7 online sales channel",
    businessImpact: "Expands reach beyond gym members",
    roiPotential: "Creates a new revenue stream",
  },
  {
    component: "Zero-Inventory System",
    coreBenefit: "Reduced upfront stock risk",
    businessImpact: "Limits dead stock and cash-flow pressure",
    roiPotential: "Potential inventory-cost savings",
  },
  {
    component: "Fulfillment & Order Handling",
    coreBenefit: "More hands-off operations",
    businessImpact: "Returns time to coaching and growth",
    roiPotential: "Potential time savings each month",
  },
  {
    component: "Marketing & Growth Support",
    coreBenefit: "Consistent visibility through social and ads",
    businessImpact: "Supports acquisition and merchandise sales",
    roiPotential: "Campaign-dependent return",
  },
  {
    component: "Profit System",
    coreBenefit: "Optimized pricing strategy",
    businessImpact: "Protects margins without weakening demand",
    roiPotential: "Potential net-profit improvement",
  },
  {
    component: "In-Gym Sales System",
    coreBenefit: "Turns existing students into buyers",
    businessImpact: "Creates a stronger retail environment",
    roiPotential: "Repeat monthly purchase potential",
  },
  {
    component: "Launch Campaign",
    coreBenefit: "Creates attention and urgency",
    businessImpact: "Supports early traction and revenue",
    roiPotential: "Faster first-launch momentum",
  },
  {
    component: "Design + Tracking",
    coreBenefit: "Professional branding and performance insight",
    businessImpact: "Improves decisions over time",
    roiPotential: "Potential conversion improvement",
  },
  {
    component: "Bonuses",
    coreBenefit: "Extra growth tools and assets",
    businessImpact: "Accelerates progress without extra setup",
    roiPotential: "$2,500+ stated program value",
  },
];

const columns = [
  { key: "component", label: "Component", width: "22%" },
  { key: "coreBenefit", label: "Core Benefit", width: "32%" },
  { key: "businessImpact", label: "Business Impact", width: "28%" },
  { key: "roiPotential", label: "ROI Potential", width: "18%" },
] as const;

export default function ROIBreakdownSection() {
  return (
    <SectionGlow className="relative overflow-hidden">
       {/* --- Header --- */}
        <SectionHeaderblog
          bare
          eyebrow="Results"
          title="Benefits &"
          highlight="ROI breakdown."
          highlightGradient="linear-gradient(90deg, #E63946 0%, #7A1B22 100%)"
          accentColor="#E63946"
          description="See how each program component can affect positioning, operations and revenue."
        />
      <div className="relative z-10 mx-auto w-full max-w-[1178px] px-5 pb-16 sm:px-8 lg:px-[30px]">
       

        {/* --- Table (tablet & up) --- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-2 hidden w-full overflow-x-auto rounded-[8px] border border-white/10 md:block"
        >
          <table className="w-full min-w-[720px] border-collapse font-space-grotesk">
            <thead>
              <tr className="bg-[#0d0d0d]">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    style={{ width: col.width }}
                    className="whitespace-nowrap border-b border-white/10 px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.06em] text-white lg:px-6"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.component}
                  className={`${
                    i % 2 === 0 ? "bg-[#141414]" : "bg-[#191919]"
                  } transition-colors duration-200 hover:bg-[#1d1d1d]`}
                >
                  <td className="border-b border-white/5 px-4 py-4 align-top text-[13px] font-semibold text-white lg:px-6">
                    {row.component}
                  </td>
                  <td className="border-b border-white/5 px-4 py-4 align-top text-[13px] leading-[1.5] text-white/60 lg:px-6">
                    {row.coreBenefit}
                  </td>
                  <td className="border-b border-white/5 px-4 py-4 align-top text-[13px] leading-[1.5] text-white/60 lg:px-6">
                    {row.businessImpact}
                  </td>
                  <td className="border-b border-white/5 px-4 py-4 align-top text-[13px] font-semibold text-[#E51B24] lg:px-6">
                    {row.roiPotential}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* --- Stacked cards (mobile) --- */}
        <div className="mt-2 flex flex-col gap-3 md:hidden">
          {rows.map((row, i) => (
            <motion.div
              key={row.component}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[8px] border border-white/10 bg-[#141414] p-5"
            >
              <h3 className="font-space-grotesk text-[14px] font-bold text-white">
                {row.component}
              </h3>

              <dl className="mt-3 flex flex-col gap-3">
                <div>
                  <dt className="font-space-grotesk text-[10px] font-semibold uppercase tracking-[0.06em] text-white/40">
                    Core Benefit
                  </dt>
                  <dd className="mt-1 font-space-grotesk text-[13px] leading-[1.5] text-white/70">
                    {row.coreBenefit}
                  </dd>
                </div>
                <div>
                  <dt className="font-space-grotesk text-[10px] font-semibold uppercase tracking-[0.06em] text-white/40">
                    Business Impact
                  </dt>
                  <dd className="mt-1 font-space-grotesk text-[13px] leading-[1.5] text-white/70">
                    {row.businessImpact}
                  </dd>
                </div>
                <div>
                  <dt className="font-space-grotesk text-[10px] font-semibold uppercase tracking-[0.06em] text-white/40">
                    ROI Potential
                  </dt>
                  <dd className="mt-1 font-space-grotesk text-[13px] font-semibold text-[#E51B24]">
                    {row.roiPotential}
                  </dd>
                </div>
              </dl>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionGlow>
  );
}