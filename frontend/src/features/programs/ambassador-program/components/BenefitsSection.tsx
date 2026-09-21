import SectionGlow from "@/shared/components/layout/SectionGlow";
import StepCard from "@/shared/components/sections/StepCard";
import SectionTitle from "./SectionTitle";

/* -------------------------------------------------------------------------- */
/*  Types — API-ready                                                         */
/* -------------------------------------------------------------------------- */

export interface Benefit {
  id: string | number;
  title: string;
  bullets: string[];
  footer: string;
}

export interface BenefitsSectionProps {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  benefits?: Benefit[];
}

/* -------------------------------------------------------------------------- */
/*  Default content                                                           */
/* -------------------------------------------------------------------------- */

const DEFAULT_BENEFITS: Benefit[] = [
  {
    id: 1,
    title: "Official ROKAI Gear Package",
    bullets: ["Premium competition Gi", "Rash guards", "Training apparel"],
    footer: "$150–$300 annually",
  },
  {
    id: 2,
    title: "Performance Recognition",
    bullets: [
      "Featured as official ROKAI athlete",
      "Tagged in campaigns",
      "Brand visibility across platforms",
    ],
    footer: "Priceless exposure",
  },
  {
    id: 3,
    title: "Content & Social Boost Support",
    bullets: ["Featured content reposts", "Highlight reels support", "Athlete spotlight campaigns"],
    footer: "$500+ visibility boost",
  },
  {
    id: 4,
    title: "Competition Support (Selective)",
    bullets: ["Support for major tournaments", "Product sponsorship for events"],
    footer: "Variable (performance-based)",
  },
  {
    id: 5,
    title: "Performance-Based Growth Path",
    bullets: ["Sponsored athlete tier", "Paid collaborations", "Brand campaigns"],
    footer: "Variable (performance-based)",
  },
  {
    id: 6,
    title: "Brand Building Opportunity",
    bullets: ["Build authority", "Increase visibility", "Strengthen personal brand in BJJ community"],
    footer: "Long-term career leverage",
  },
];

const HEADING_GRADIENT = "linear-gradient(90deg, #E63946 0%, #690106 100%)";

// Space Grotesk / 500 / 56px / 60px line-height / uppercase (scaled down on small screens)
const HEADING_CLASS =
  "font-space-grotesk font-medium uppercase tracking-normal text-[36px] leading-[42px] sm:text-[46px] sm:leading-[52px] lg:text-[56px] lg:leading-[60px]";

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

export default function BenefitsSection({
  eyebrow = "The Syndicate Program",
  title = "WHAT",
  highlight = "AMBASSADORS GET.",
  benefits = DEFAULT_BENEFITS,
}: BenefitsSectionProps) {
  return (
    <SectionGlow className="relative overflow-hidden">
      {/* Dark-red haze behind the heading */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(ellipse_55%_100%_at_50%_0%,rgba(230,57,70,0.16),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-[1440px] px-5 pb-20 pt-14 sm:px-8 md:px-10 lg:px-[49px] lg:pb-[100px] lg:pt-[56px]">
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          highlight={highlight}
          highlightGradient={HEADING_GRADIENT}
          headingClassName={HEADING_CLASS}
        />

        <div className="mx-auto mt-12 grid max-w-[1155px] grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:mt-[90px] lg:grid-cols-3 lg:gap-x-[34px] lg:gap-y-[45px]">
          {benefits.map((benefit, i) => (
            <StepCard
              key={benefit.id}
              variant="benefit"
              index={i + 1}
              title={benefit.title}
              bullets={benefit.bullets}
              footer={benefit.footer}
              showArrow
            />
          ))}
        </div>
      </div>
    </SectionGlow>
  );
}
