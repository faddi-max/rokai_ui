import React from "react";

/**
 * HeroTitle
 * ---------
 * Reusable, fully dynamic hero/title block (matches the "MORE THAN A
 * PARTNERSHIP" screen). Content is never hardcoded here — every page
 * (Ambassador / Affiliate / Sponsorship / Partnership / etc.) supplies its
 * own HERO_CONFIG and this component just renders it.
 *
 * Usage:
 *   <HeroTitle config={HERO_CONFIGS[activeProgramId]} />
 */

export interface HeroTitleLine {
  /** Full text of this line, exactly as it should read */
  text: string;
  /** Optional exact substring of `text` to render in the accent color */
  highlight?: string;
}

export interface HeroTitleConfig {
  /** Small uppercase label above the title, e.g. "PERFORMANCE-DRIVEN CLUB PARTNERSHIP" */
  eyebrow: string;
  /** One or more lines that make up the big heading */
  lines: HeroTitleLine[];
  /** Supporting paragraph under the heading */
  description: string;
  /** Optional override, defaults to ROKAI red */
  accentColor?: string;
}

interface HeroTitleProps {
  config: HeroTitleConfig;
  className?: string;
}

/**
 * Fade-up-in keyframes + stagger utility classes, scoped under `.rokai-hero`
 * so dropping this component into a page never leaks styles elsewhere.
 * Respects prefers-reduced-motion by disabling motion for users who ask for it.
 */
function HeroTitleStyles() {
  return (
    <style>{`
      .rokai-hero .rokai-hero-item {
        opacity: 0;
        transform: translateY(18px);
        animation: rokaiHeroFadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
      }
      .rokai-hero .rokai-hero-glow {
        opacity: 0;
        animation: rokaiHeroGlowIn 1.1s ease-out forwards;
      }
      .rokai-hero .rokai-hero-eyebrow { animation-delay: 0.05s; }
      .rokai-hero .rokai-hero-line-0 { animation-delay: 0.15s; }
      .rokai-hero .rokai-hero-line-1 { animation-delay: 0.28s; }
      .rokai-hero .rokai-hero-line-2 { animation-delay: 0.41s; }
      .rokai-hero .rokai-hero-line-3 { animation-delay: 0.54s; }
      .rokai-hero .rokai-hero-description { animation-delay: 0.62s; }

      @keyframes rokaiHeroFadeUp {
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @keyframes rokaiHeroGlowIn {
        to { opacity: 1; }
      }

      @media (prefers-reduced-motion: reduce) {
        .rokai-hero .rokai-hero-item,
        .rokai-hero .rokai-hero-glow {
          animation: none !important;
          opacity: 1 !important;
          transform: none !important;
        }
      }
    `}</style>
  );
}

function renderLine(line: HeroTitleLine, key: number, accent: string) {
  if (!line.highlight || !line.text.includes(line.highlight)) {
    return (
      <span key={key} className={`rokai-hero-item rokai-hero-line-${key} block`}>
        {line.text}
      </span>
    );
  }

  const parts = line.text.split(line.highlight);

  return (
    <span key={key} className={`rokai-hero-item rokai-hero-line-${key} block`}>
      {parts.map((part, i) => (
        <React.Fragment key={i}>
          {part}
          {i < parts.length - 1 && (
            <span style={{ color: accent }}>{line.highlight}</span>
          )}
        </React.Fragment>
      ))}
    </span>
  );
}

export default function HeroTitle({ config, className = "" }: HeroTitleProps) {
  const accent = config.accentColor || "#E63946";

  return (
    <div
      className={`rokai-hero relative w-full py-10 mb-20 overflow-hidden text-center font-space-grotesk ${className}`}
    >
      <HeroTitleStyles />

      {/* Decorative glow — matches Figma hero background exactly, fades in on load */}
      <div
        aria-hidden
        className="rokai-hero-glow pointer-events-none absolute inset-x-0 top-0 -z-10 h-[418px] w-full"
        style={{
          background:
            "radial-gradient(60.12% 207.11% at 50% -15%, rgba(230, 57, 70, 0.22) 0%, rgba(230, 57, 70, 0) 42%)",
        }}
      />

      {/* Eyebrow label */}
      <span
        className="rokai-hero-item rokai-hero-eyebrow mb-3 inline-block text-[11px] font-bold uppercase tracking-[0.25em]"
        style={{ color: accent }}
      >
        {config.eyebrow}
      </span>

      {/* Heading — tighter leading + tracking + heavier weight to match the reference */}
      <h1 className="mx-auto max-w-4xl text-[34px] font-extrabold uppercase leading-[1.08] tracking-[-0.01em] text-white sm:text-[40px] md:text-[48px] lg:text-[56px]">
        {config.lines.map((line, i) => renderLine(line, i, accent))}
      </h1>

      {/* Supporting description — narrower max-width so it wraps to two lines like the reference */}
      <p className="rokai-hero-item rokai-hero-description mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/60 sm:text-[15px]">
        {config.description}
      </p>
    </div>
  );
}

export { HeroTitle };

/* ------------------------------------------------------------------ */
/* Example per-page configs — drop into the same file where you keep  */
/* PROGRAM_CONFIGS (ProgramForm.tsx) and key by the same programId so */
/* the hero and the form always stay in sync for a given page.        */
/* ------------------------------------------------------------------ */

export const HERO_CONFIGS: Record<string, HeroTitleConfig> = {
  partnership: {
    eyebrow: "Performance-Driven Club Partnership",
    lines: [
      { text: "More Than A Partnership", highlight: "Partnership" },
      { text: "Build A Profitable BJJ Brand" },
      { text: "With Rokai" },
    ],
    description:
      "Step into a performance-driven partnership designed to elevate your academy, strengthen your team identity, and unlock new revenue opportunities without the usual hassle.",
  },
  ambassador: {
    eyebrow: "Athlete & Competitor Program",
    lines: [
      { text: "More Than A Sponsorship", highlight: "Sponsorship" },
      { text: "Represent A Brand Built" },
      { text: "For Competitors" },
    ],
    description:
      "Join an elite collective of BJJ & MMA athletes representing discipline, performance, and custom-engineered gear on and off the mat.",
  },
  affiliate: {
    eyebrow: "Creator & Influencer Program",
    lines: [
      { text: "More Than An Affiliate", highlight: "Affiliate" },
      { text: "Turn Your Audience Into" },
      { text: "A Revenue Stream" },
    ],
    description:
      "Partner with ROKAI to earn high-tier commissions, custom referral links, and exclusive fightwear gear drops for your audience.",
  },
  sponsorship: {
    eyebrow: "Performance-Driven Club Partnership",
    lines: [
      { text: "Unlock Elite Sponsorship &", highlight: "Sponsorship" },
      { text: "Transform Your BJJ Academy" },
      { text: "Into A Recognized Brand" },
    ],
    description:
      "Step into a performance-driven partnership designed to elevate your academy, strengthen your team identity, and unlock new revenue opportunities without the usual hassle.",
  },
};

/** Default config used when a programId doesn't match any key above. */
export const DEFAULT_HERO_CONFIG = HERO_CONFIGS.partnership;