"use client";

import SectionGlow from "@/shared/components/layout/SectionGlow";
import SectionHeaderblog from "@/shared/components/sections/SectionHeaderblog";
import { motion } from "framer-motion";
import { Check, Gift } from "lucide-react";


interface SponsorshipTier {
  id: string;
  label: string;
  orderVolume: string;
  features: string[];
  bonusText: string;
  value: string;
  active?: boolean;
}

const tiers: SponsorshipTier[] = [
  {
    id: "ascension-starter",
    label: "ASCENSION STARTER",
    orderVolume: "$500 – $1,000",
    features: [
      "Google Maps Boost (Est. $500)",
      "Poster & Flyer Templates (Est. $150)",
      "1-2 Promo Videos (Est. $200)",
    ],
    bonusText: "Social Media Starter Pack Valued at $150",
    value: "$800",
  },
  {
    id: "momentum-builder",
    label: "MOMENTUM BUILDER",
    orderVolume: "$1,001 – $2,000",
    features: [
      "Website Build / Redesign (Est. $1,000+)",
      "Conversion-Optimized Signup Framework (Est. $500)",
      "Branded Tournament Materials (Banners, Cards, Assets) (Est. $350)",
    ],
    bonusText: "Mini Branding Kit Valued at $250",
    value: "$2,650+",
  },
  {
    id: "authority-boost-system",
    label: "AUTHORITY BOOST SYSTEM",
    orderVolume: "$2,001 – $5,000",
    features: [
      "Local SEO Setup (Rank on Google for BJJ Keywords) (Est. $700)",
      "Mentorship Funnel Optimization (Est. $850)",
    ],
    bonusText: "1 Free Custom Gi for Your Top Athlete Valued at $150",
    value: "$3,800+",
    active: true,
  },
  {
    id: "champion-growth-engine",
    label: "CHAMPION GROWTH ENGINE",
    orderVolume: "$5,001 – $8,000",
    features: [
      "Full Lead Generation Campaign (We Run Ads) (Est. $1,500–$2,500)",
      "Tournament/Event Branding Packages (Est. $800)",
      "Advanced Graphic Design Packs (Est. $600)",
    ],
    bonusText: "Dedicated Growth Manager Valued at $850/month",
    value: "$6,000+",
  },
 
];


const cardBase: React.CSSProperties = {
  background: "linear-gradient(94.04deg, #161616 0%, #121212 100%)",
  borderColor: "#303030",
  border:'2px',
  
};
const cardActive: React.CSSProperties = {
  background:
    "linear-gradient(92.55deg, rgba(230, 57, 70, 0.08) 0%, #151515 30%)",
  borderColor: "#E63946A6",
};

function TierCard({ tier, index }: { tier: SponsorshipTier; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={tier.active ? cardActive : cardBase}
      className="relative  flex min-h-[146px] w-full items-center overflow-hidden rounded-[14px] border px-6 py-5 md:px-8"
    >
      <div className="flex w-full  flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
        {/* Tier label + order volume */}
      
<div className="flex min-w-[180px] shrink-0 flex-col gap-1  pl-3">
  <span className="font-space-grotesk text-[11px] font-bold uppercase tracking-wide text-[#E63946]">
    {tier.label}
  </span>
  <span className="text-[11px] text-white/60 md:text-xs">
    Order Volume:{" "}
    <span className="font-semibold text-white">{tier.orderVolume}</span>
  </span>
</div>


<div className="flex flex-1 flex-wrap gap-1.5">
  {tier.features.map((feature) => (
    <div
      key={feature}
      className="flex items-center gap-1 rounded-md border border-white/10 bg-black/20 px-2.5 py-1 text-[10px] leading-tight text-white/80 md:text-[11px]"
    >
      <Check className="h-3 w-3 shrink-0 text-[#E63946]" />
      <span>{feature}</span>
    </div>
  ))}
</div>

        {/* Features */}
        <div className="flex flex-1 flex-wrap gap-1.5">
          {tier.features.map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-1 rounded-md border border-white/10 bg-black/20 px-2.5 py-1 text-[10px] leading-tight text-white/80 md:text-[11px]"
            >
              <Check className="h-3 w-3 shrink-0 text-white/50" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* Bonus */}
        <div className="flex w-fit shrink-0 flex-col items-start gap-0.5 rounded-md border border-white/10 bg-black/40 px-3.5 py-2 text-left lg:items-center lg:text-center">
          <span className="text-[8px] uppercase tracking-widest text-white/40">
            Special Bonus
          </span>
        <span className="flex items-center gap-1.5 whitespace-nowrap text-[11px] font-semibold text-[#E63946] md:text-xs">
  <Gift className="h-3 w-3 shrink-0" />
  {tier.bonusText}
</span>
        </div>

        {/* Unlocked value */}
        <div className="flex shrink-0 flex-col items-start gap-0.5 lg:items-end lg:text-right">
          <span className="text-[8px] uppercase tracking-widest text-white/40">
            Unlocked Value
          </span>
          <span className="font-space-grotesk text-xl font-bold text-[#E51B24] md:text-2xl">
            {tier.value}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function ClubSponsorshipValueSystem() {
  return (
    <SectionGlow>
      <SectionHeaderblog
        eyebrow="Tier & order volume"
        title="CLUB SPONSORSHIP"
        highlight="VALUE SYSTEM."
        description="Your apparel order unlocks additional authority, visibility, branding, and growth benefits."
        accentColor="#E63946"
        highlightGradient="linear-gradient(90deg, #E63946 0%, #690106 100%)"
        highlightFontSize="56px"
        highlightLineHeight="60px"
        highlightFontWeight={500}
        bare
      />

      <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-3 px-5 lg:px-0">
        {tiers.map((tier, index) => (
          <div key={tier.id} className="relative">
            <div className="absolute left-0 top-1/2 h-16 -translate-y-1/2 border-l-2 border-[#E63946]" />

            <TierCard tier={tier} index={index} />
          </div>
        ))}
      </div>
    </SectionGlow>
  );
}