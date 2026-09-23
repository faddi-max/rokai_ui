"use client";

import SectionGlow from "@/shared/components/layout/SectionGlow";
import SectionHeaderblog from "@/shared/components/sections/SectionHeaderblog";
import { motion } from "framer-motion";
import { ArrowRight, Check, Gift } from "lucide-react";

interface SponsorshipTier {
  id: string;
  number: string;
  category: string;
  title: string;
  orderVolume: string;
  value: string;
  features: string[];
  special: string[];
  badge?: string;
  active?: boolean;
}

const tiers: SponsorshipTier[] = [
  {
    id: "associate-starter",
    number: "01",
    category: "ASSOCIATE STARTER",
    title: "Associate Starter",
    orderVolume: "$500 – $1,000",
    value: "$800",
    features: [
      "Google Maps Boost (Est. $500)",
      "Poster & Flyer Templates (Est. $150)",
      "1–2 Promo Videos (Est. $200)",
    ],
    special: [
      "Social Media Starter Pack",
      "Starter-level visibility support",
    ],
  },
  {
    id: "industry-builder",
    number: "02",
    category: "INDUSTRY BUILDER",
    title: "Industry Builder",
    orderVolume: "$1,001 – $2,000",
    value: "$2,650+",
    features: [
      "Website Build / Redesign (Est. $1,000+)",
      "Conversion-Optimized Signup Framework (Est. $500)",
      "Branded Tournament / Athlete Presence (Est. $350)",
    ],
    special: [
      "Mini Branding Kit",
      "Brand visibility support",
    ],
  },
  {
    id: "authority-boost",
    number: "03",
    category: "AUTHORITY BOOST ENGINE",
    title: "Authority Boost",
    orderVolume: "$2,001 – $5,000",
    value: "$3,800+",
    features: [
      "Local SEO Starter Pack for Google (Est. $1,500)",
      "Mentorship / Funnel Optimization (Est. $850)",
    ],
    special: [
      "One Free Custom Gi",
      "Athlete / club visibility support",
    ],
  },
  {
    id: "champion-growth",
    number: "04",
    category: "CHAMPION GROWTH ENGINE",
    title: "Champion Growth",
    orderVolume: "$5,001 – $8,000",
    value: "$6,000+",
    features: [
      "Full Lead Generation Campaign (Est. $2,500–$5,000)",
      "Tournament / Event Branding Package (Est. $800)",
      "Advanced Graphic Design Pack (Est. $600)",
    ],
    special: [
      "Dedicated Growth Manager",
      "Ongoing growth support",
    ],
  },
  {
    id: "legend-status",
    number: "05",
    category: "LEGEND STATUS PARTNERSHIP",
    title: "Legend Status",
    orderVolume: "$8,001+",
    value: "$10,000+",
    features: [
      "Long-Term Multi-Sport Marketing Campaigns (Est. $4,000+)",
      "Full Branding Overhaul — Logo, Identity System (Est. $1,500+)",
      "Influencer Video Editing (Est. $800)",
    ],
    special: [
      "VIP Priority Production Line",
      "Priority support during peak season",
    ],
  },
];

function TierCard({
  tier,
  index,
}: {
  tier: SponsorshipTier;
  index: number;
}) {
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
      className="group relative flex h-full flex-col overflow-hidden rounded-[16px]  border border-[#2A2A2A]  bg-[linear-gradient(180deg,#161616_0%,#121212_100%)] px-5 py-6 transition-all duration-300 hover:-translate-y-3 hover:border-[#E63946] hover:bg-[linear-gradient(180deg,#E63946_0%,#8A0F17_100%)] hover:shadow-[0_20px_50px_rgba(230,57,70,0.35)]"
    >
      {/* Top Gradient Border */}
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-[2px]"
        style={{
          background:
            "radial-gradient(50% 35.53% at 50% 0%, #E63946 0%, #2C2C2C 100%)",
        }}
      />

      {tier.badge && (
        <div className="absolute inset-x-0 top-0 bg-black/25 py-1.5 text-center">
          <span className="font-space-grotesk text-[9px] font-bold uppercase tracking-widest text-white">
            {tier.badge}
          </span>
        </div>
      )}

      <div
        className={`flex flex-1 flex-col ${
          tier.badge ? "mt-6" : ""
        }`}
      >
        {/* Eyebrow */}
        <span className="font-space-grotesk text-[10px] font-bold uppercase tracking-wide text-[#E63946] transition-colors duration-300 group-hover:text-white/80">
          {tier.number} / {tier.category}
        </span>

        {/* Title */}
        <h3 className="font-space-grotesk mt-2 text-lg font-bold text-white">
          {tier.title}
        </h3>

        {/* Order Volume */}
        <p className="mt-1 text-[11px] text-white/50 transition-colors duration-300 group-hover:text-white/70">
          Order Volume:{" "}
          <span className="font-semibold text-white">
            {tier.orderVolume}
          </span>
        </p>

        {/* Divider */}
        <div className="my-4 h-px w-full bg-white/10 transition-colors duration-300 group-hover:bg-white/20" />

        {/* Unlocked Value */}
        <span className="text-[9px] uppercase tracking-widest text-white/40 transition-colors duration-300 group-hover:text-white/70">
          Unlocked Value
        </span>

        <span className="font-space-grotesk mt-1 text-3xl font-bold text-[#E63946] transition-colors duration-300 group-hover:text-white/70">
          {tier.value}
        </span>

        {/* Divider */}
        <div className="my-4 h-px w-full bg-white/10 transition-colors duration-300 group-hover:bg-white/20" />

        {/* Features */}
        <ul className="flex flex-col gap-2">
          {tier.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-1.5 text-[11px] leading-snug text-white/70 transition-colors duration-300 group-hover:text-white/90"
            >
              <Check className="mt-0.5 h-3 w-3 shrink-0 text-[#E63946] transition-colors duration-300 group-hover:text-white" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="flex-1" />

        {/* Divider */}
        <div className="my-4 h-px w-full bg-white/10 transition-colors duration-300 group-hover:bg-white/20" />

        {/* Special Value */}
        <span className="text-[9px] uppercase tracking-widest text-white/40 transition-colors duration-300 group-hover:text-white/70">
          Special Value
        </span>

        <ul className="mt-2 flex flex-col gap-1.5">
          {tier.special.map((item) => (
            <li
              key={item}
              className="flex items-center gap-1.5 text-[11px] font-medium text-white"
            >
              <Gift className="h-3 w-3 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <button
        type="button"
        className="mt-6 flex w-full items-center justify-center gap-1.5 rounded-md border border-white/15 py-2.5 text-[11px] font-bold uppercase tracking-wide text-white/80 transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-[#8A0F17]"
      >
        Explore Free Tier
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
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

      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-4 px-5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5 lg:px-0">
        {tiers.map((tier, index) => (
          <TierCard
            key={tier.id}
            tier={tier}
            index={index}
          />
        ))}
      </div>
    </SectionGlow>
  );
}