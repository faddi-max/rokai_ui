import { ArrowUpRight, ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeaderblog from "@/shared/components/sections/SectionHeaderblog";
import Button from "@/shared/components/ui/Button";
import { resourcetool } from "@/assets";

export interface ToolStat {
  value: string;
  label: string;
}

export interface ToolCardData {
  id: string;
  label: string;
  title: string;
  description: string;
  featured?: boolean;
}

export interface InteractiveToolsSectionProps {
  eyebrow?: string;
  titleWhite?: string;
  titleRed?: string;
  description?: string;
  stats?: ToolStat[];
  ctaText?: string;
  ctaHref?: string;
  image?: string;
  imageAlt?: string;
  tools?: ToolCardData[];
}

const DEFAULT_STATS: ToolStat[] = [
  { value: "05", label: "Live Tools" },
  { value: "Free", label: "To Access" },
  { value: "Fast", label: "Instant Results" },
];

const DEFAULT_TOOLS: ToolCardData[] = [
  {
    id: "seo-title-analyzer",
    label: "Optimization Tool",
    title: "SEO Title Analyzer",
    description: "Test title clarity and length.",
  },
  {
    id: "product-copy-checker",
    label: "Optimization Tool",
    title: "Product Copy Checker",
    description: "Improve product-page copy.",
  },
  {
    id: "order-margin-calculator",
    label: "Business Tool",
    title: "Order Margin Calculator",
    description: "Estimate order profitability.",
  },
  {
    id: "gi-sizing-scanner",
    label: "Featured Tool",
    title: "Gi Sizing Scanner →",
    description: "Build a more accurate size recommendation.",
    featured: true,
  },
];

function ToolCard({ label, title, description, featured, index }: ToolCardData & { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className={`flex h-full min-h-[150px] w-full max-w-[312.49px] flex-col rounded-[13.33px] px-5 py-5 shadow-[0px_0px_9px_0px_#E6394647] transition-colors duration-300 ${
        featured ? "bg-[#E63946]" : "border border-white/10 bg-[#111111] hover:border-[#E63946]/40"
      }`}
    >
      <span
        className={`font-space-grotesk text-[10px] font-bold uppercase tracking-[0.08em] ${
          featured ? "text-white/75" : "text-[#E63946]"
        }`}
      >
        {label}
      </span>

      <h3
        className={`mt-10 font-space-grotesk text-[16px] font-bold leading-[1.25] ${
          featured ? "text-white" : "text-white"
        }`}
      >
        {title}
      </h3>

      <p
        className={`mt-2 font-space-grotesk text-[13px] leading-[1.4] ${
          featured ? "text-white/85" : "text-white/50"
        }`}
      >
        {description}
      </p>
    </motion.div>
  );
}

export default function InteractiveToolsSection({
  eyebrow = "Featured workspace",
  titleWhite = "INTERACTIVE SEO",
  titleRed = "& DATA TOOLS.",
  description = "Calculate margins, validate decisions and access practical tools designed for combat-sports brands and academies.",
  stats = DEFAULT_STATS,
  ctaText = "Try All Tools",
  ctaHref = "#tools",
  image = resourcetool,
  imageAlt = "ROKAI SEO and data tools workspace preview",
  tools = DEFAULT_TOOLS,
}: InteractiveToolsSectionProps) {
  return (
    <>
      <SectionHeaderblog
        bare
        eyebrow={eyebrow}
        title={titleWhite}
        highlight={titleRed}
        description={description}
        accentColor="#E63946"
      />

      <div className="relative py-10 z-10 mx-auto grid w-full max-w-[1178px] grid-cols-1 gap-10 px-5 pb-16 sm:px-8 lg:grid-cols-2 lg:gap-14 lg:px-[30px]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-5">
            {stats.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-5">
                {i > 0 && <span aria-hidden className="h-8 w-px bg-white/15" />}
                <div>
                  <p className="font-space-grotesk text-[20px] font-bold leading-none text-[#E63946]">
                    {stat.value}
                  </p>
                  <p className="mt-1.5 font-space-grotesk text-[10px] uppercase tracking-wide text-white/50">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Button href={ctaHref} icon={ArrowUpRight} weight="medium" size="13px" className="h-[40px] w-fit px-5">
            {ctaText}
          </Button>

          <div className="relative aspect-[548/336] w-full max-w-[548px] overflow-hidden rounded-[14px] bg-[#00000033]">
            {image ? (
              <img src={image} alt={imageAlt} className="h-full w-full object-cover" loading="lazy" />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <ImageIcon className="h-8 w-8 text-white/15" strokeWidth={1.5} />
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:ml-auto">
          {tools.map((tool, i) => (
            <ToolCard key={tool.id} index={i} {...tool} />
          ))}
        </div>
      </div>
    </>
  );
}