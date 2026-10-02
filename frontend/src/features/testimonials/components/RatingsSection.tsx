import { ArrowUpRight, Star } from "lucide-react";
import { motion } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*  Types - API-ready                                                         */
/* -------------------------------------------------------------------------- */

export interface RatingPlatform {
  id: "google" | "trustpilot";
  eyebrow: string;
  titleLead: string; // e.g. "Our Google"
  titleTail: string; // e.g. "rating."
  description: string;
  rating: string;
  reviewLabel: string;
  sideText: string;
  ctaLabel: string;
  ctaHref: string;
  theme: "dark" | "light";
}

export interface RatingsSectionProps {
  platforms?: RatingPlatform[];
}

/* -------------------------------------------------------------------------- */
/*  Default content                                                           */
/*  TODO (content team): ratings and review counts must be verified against   */
/*  the live Google / Trustpilot profiles before publishing, and the links    */
/*  replaced with the real profile URLs.                                      */
/* -------------------------------------------------------------------------- */

const DEFAULT_PLATFORMS: RatingPlatform[] = [
  {
    id: "google",
    eyebrow: "Social proof, verified",
    titleLead: "Our Google",
    titleTail: "rating.",
    description:
      "See what our customers and business partners are saying about their experience with Rokai.",
    rating: "4.9",
    reviewLabel: "Verified reviews · Google",
    sideText: "Read verified reviews and share your own experience with Rokai.",
    ctaLabel: "Visit our Google Reviews",
    ctaHref: "#google-reviews",
    theme: "dark",
  },
  {
    id: "trustpilot",
    eyebrow: "",
    titleLead: "Our TrustPilot",
    titleTail: "rating.",
    description:
      "See what our customers and business partners are saying about their experience with Rokai.",
    rating: "4.9",
    reviewLabel: "Verified reviews · Trustpilot",
    sideText: "Read verified reviews and share your own experience with Rokai.",
    ctaLabel: "Review on TrustPilot",
    ctaHref: "#trustpilot-reviews",
    theme: "light",
  },
];

/* -------------------------------------------------------------------------- */
/*  Reusable pieces                                                           */
/* -------------------------------------------------------------------------- */

function PlatformIcon({ id }: { id: RatingPlatform["id"] }) {
  if (id === "google") {
    return (
      <span
        aria-hidden
        className="flex size-8 items-center justify-center rounded-full bg-white font-space-grotesk text-[15px] font-bold leading-none text-[#4285F4]"
      >
        G
      </span>
    );
  }
  return (
    <span aria-hidden className="flex size-8 items-center justify-center rounded-full bg-white">
      <Star className="size-4 fill-[#00B67A] text-[#00B67A]" strokeWidth={0} />
    </span>
  );
}

function StarRow({ id }: { id: RatingPlatform["id"] }) {
  const color = id === "google" ? "fill-[#FBBC04] text-[#FBBC04]" : "fill-[#00B67A] text-[#00B67A]";
  return (
    <div className="flex items-center gap-1" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 * i, duration: 0.3 }}
        >
          <Star className={`size-3 ${color}`} strokeWidth={0} />
        </motion.span>
      ))}
    </div>
  );
}

function RatingCard({ platform }: { platform: RatingPlatform }) {
  const isLight = platform.theme === "light";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className={`flex w-full max-w-[260px] flex-col items-center gap-3 rounded-[10px] border px-6 py-6 transition-colors duration-300 ${
        isLight
          ? "border-white bg-white"
          : "border-white/10 bg-[#111111] hover:border-[#E63946]/40"
      }`}
    >
      <PlatformIcon id={platform.id} />
      <p
        className={`font-space-grotesk text-[34px] font-bold leading-none ${
          isLight ? "text-[#111111]" : "text-white"
        }`}
      >
        {platform.rating}
      </p>
      <StarRow id={platform.id} />
      <p
        className={`font-space-grotesk text-[9px] font-light ${
          isLight ? "text-black/50" : "text-white/40"
        }`}
      >
        {platform.reviewLabel}
      </p>
    </motion.div>
  );
}

function RatingRow({ platform, index }: { platform: RatingPlatform; index: number }) {
  return (
    <div className="grid grid-cols-1 items-center gap-7 sm:gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-12">
      {/* Left - eyebrow, title, description */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center text-center lg:items-start lg:text-left"
      >
        {platform.eyebrow && (
          <span className="mb-3 font-space-grotesk text-[9px] font-bold uppercase tracking-[0.15em] text-[#E63946]">
            {platform.eyebrow}
          </span>
        )}

        <h2 className="font-space-grotesk text-[32px] font-bold leading-[1.1] text-white sm:text-[38px] lg:text-[50px]">
          <span className="block">{platform.titleLead}</span>
          <span className="block">{platform.titleTail}</span>
        </h2>

        <p className="mt-3 max-w-[300px] font-space-grotesk text-[11px] font-light leading-[17px] text-white/60 sm:text-[12px] sm:leading-[18px]">
          {platform.description}
        </p>
      </motion.div>

      {/* Center - rating card */}
      <div className="flex justify-center">
        <RatingCard platform={platform} />
      </div>

      {/* Right - side text + CTA */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center gap-3 text-center lg:ml-auto lg:items-end lg:text-right"
      >
        <p className="max-w-[240px] font-space-grotesk text-[12px] font-light leading-[18px] text-white/45 sm:text-[13px] lg:max-w-[200px] lg:text-[15px] lg:leading-[16px]">
          {platform.sideText}
        </p>
        <a
          href={platform.ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[38px] max-w-full items-center justify-center gap-2 rounded-[4px] bg-[#E63946] px-3.5 py-2 text-center font-space-grotesk text-[12px] font-medium leading-tight text-white transition-colors hover:bg-[#c9161e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-[13px] lg:min-h-[30px] lg:py-1.5 lg:text-[15px]"
        >
          {platform.ctaLabel}
          <ArrowUpRight size={11} aria-hidden />
        </a>
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

export default function RatingsSection({ platforms = DEFAULT_PLATFORMS }: RatingsSectionProps) {
  return (
    <div className="relative bg-black overflow-hidden">
      {/* Red glow rising from the bottom edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[360px] bg-[radial-gradient(ellipse_60%_100%_at_50%_100%,rgba(230,57,70,0.16),transparent_70%)]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1178px] flex-col gap-12 px-5 py-10 sm:gap-14 sm:px-8 sm:py-14 lg:gap-16 lg:px-[30px] lg:py-20">
        {platforms.map((platform, i) => (
          <RatingRow key={platform.id} platform={platform} index={i} />
        ))}
      </div>
    </div>
  );
}