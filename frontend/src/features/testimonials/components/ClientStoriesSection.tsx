import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import SectionGlow from "@/shared/components/layout/SectionGlow";
import SectionHeaderblog from "@/shared/components/sections/SectionHeaderblog";

/* -------------------------------------------------------------------------- */
/*  Types — API-ready                                                         */
/* -------------------------------------------------------------------------- */

export interface ClientStory {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatar?: string;
}

export interface ClientStoriesSectionProps {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  description?: string;
  featured?: ClientStory & { caption?: string };
  stories?: ClientStory[];
}

/* -------------------------------------------------------------------------- */
/*  Default content                                                           */
/*  TODO (content team): replace with real, permissioned client quotes.       */
/* -------------------------------------------------------------------------- */

const DEFAULT_FEATURED: ClientStory & { caption?: string } = {
  id: "featured",
  quote:
    "ROKAI made building our first custom gi line feel effortless. Their team was honest, responsive and delivered exactly what we envisioned ahead of schedule.",
  name: "Alex Morgan",
  role: "Project Client",
  caption: "Verified project testimonial",
};

const DEFAULT_STORIES: ClientStory[] = [
  {
    id: "s1",
    quote:
      "ROKAI made building our first gi line feel effortless. Their team was professional, responsive and delivered exactly what we envisioned.",
    name: "Alex Morgan",
    role: "Project Client",
  },
  {
    id: "s2",
    quote:
      "Reliable, transparent and skilled. ROKAI handled our project with real attention to detail, and the quality of work exceeded our expectations.",
    name: "Aurora Reed",
    role: "Academy Owner",
  },
  {
    id: "s3",
    quote:
      "From the first meeting to final delivery, the process treated our project like a priority. Everything was clear, organized and delivered on time.",
    name: "Sarah Chen",
    role: "Brand Founder",
  },
  {
    id: "s4",
    quote:
      "We worked with several contractors over the years, and ROKAI stands out for professional communication, consistency and attention to detail.",
    name: "Daniel Roth",
    role: "Team Manager",
  },
  {
    id: "s5",
    quote:
      "We chose ROKAI to remake our kit line and it was the best decision. Their timelines were clear, pricing was transparent and the craftsmanship was excellent.",
    name: "Emma Wilson",
    role: "Gym Owner",
  },
  {
    id: "s6",
    quote:
      "Our medical clinic project came with strict specifications. ROKAI handled it with total precision and delivered a result that felt considered from start to finish.",
    name: "Omar Ahmed",
    role: "Procurement Lead",
  },
];

/* -------------------------------------------------------------------------- */
/*  Reusable pieces                                                           */
/* -------------------------------------------------------------------------- */

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || "")
    .join("");
}

function Avatar({ name, avatar, size = "md" }: { name: string; avatar?: string; size?: "sm" | "md" }) {
  const dim = size === "sm" ? "size-7 text-[10px]" : "size-9 text-[11px]";
  return avatar ? (
    <img src={avatar} alt={name} loading="lazy" className={`${dim} shrink-0 rounded-full object-cover`} />
  ) : (
    <span
      aria-hidden
      className={`${dim} flex shrink-0 items-center justify-center rounded-full bg-[#E63946]/20 font-space-grotesk font-bold text-[#E63946]`}
    >
      {getInitials(name)}
    </span>
  );
}

function FeaturedStory({ story }: { story: ClientStory & { caption?: string } }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-1 overflow-hidden rounded-[8px] border border-white/10 lg:grid-cols-[5fr_7fr]"
    >
      {/* Left — red identity card */}
      <div className="relative flex min-h-[220px] flex-col justify-between overflow-hidden bg-[linear-gradient(135deg,#E63946_0%,#8A0F17_100%)] p-6 sm:p-8 lg:min-h-[315px]">
        {/* Decorative rings */}
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -right-16 size-[260px] rounded-full border-[28px] border-white/[0.07]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-10 -right-2 size-[140px] rounded-full border-[18px] border-white/[0.05]"
        />

        <span className="relative font-space-grotesk text-[9px] font-semibold uppercase tracking-[0.15em] text-white/80">
          Featured client story
        </span>

        <Quote className="relative size-8 fill-white text-white" strokeWidth={0} aria-hidden />

        <div className="relative flex items-center gap-3">
          <Avatar name={story.name} avatar={story.avatar} size="sm" />
          <div>
            <p className="font-space-grotesk text-[12px] font-bold leading-none text-white">{story.name}</p>
            <p className="mt-1 font-space-grotesk text-[10px] font-light leading-none text-white/70">{story.role}</p>
          </div>
        </div>
      </div>

      {/* Right — quote */}
      <div className="flex flex-col justify-between gap-8 bg-[#111111] p-6 sm:p-8 lg:px-12 lg:py-10">
        <p
          className="font-space-grotesk font-medium text-white"
          style={{ fontSize: "clamp(20px, 1.6vw + 10px, 30px)", lineHeight: "1.25" }}
        >
          “{story.quote}”
        </p>

        {story.caption && (
          <div className="flex items-center justify-end gap-3">
            <span aria-hidden className="h-px w-8 bg-[#E63946]" />
            <span className="font-space-grotesk text-[10px] font-light text-white/40">{story.caption}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function StoryCard({ story, index }: { story: ClientStory; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: (index % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col rounded-[6px] border border-white/10 bg-[#111111] p-5 transition-colors duration-300 hover:border-[#E63946]/50 sm:p-6"
    >
      <Quote
        className="absolute right-5 top-5 size-4 fill-[#E63946] text-[#E63946] sm:right-6 sm:top-6"
        strokeWidth={0}
        aria-hidden
      />

      <p className="max-w-[92%] font-space-grotesk text-[12px] font-light leading-[19px] text-white/75 sm:text-[13px] sm:leading-[20px]">
        “{story.quote}”
      </p>

      <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-4">
        <Avatar name={story.name} avatar={story.avatar} />
        <div>
          <p className="font-space-grotesk text-[12px] font-bold leading-none text-white">{story.name}</p>
          <p className="mt-1.5 font-space-grotesk text-[10px] font-light leading-none text-white/45">{story.role}</p>
        </div>
      </div>
    </motion.article>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

export default function ClientStoriesSection({
  eyebrow = "What clients say",
  title = "NOT JUST DELIVERED.",
  highlight = "EXPERIENCED.",
  description = "Honest feedback from clients across custom projects, partnerships, product development and professional services.",
  featured = DEFAULT_FEATURED,
  stories = DEFAULT_STORIES,
}: ClientStoriesSectionProps) {
  return (
    <SectionGlow className="relative overflow-hidden">
      {/* Red glow rising from the bottom edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[420px] bg-[radial-gradient(ellipse_60%_100%_at_50%_100%,rgba(230,57,70,0.18),transparent_70%)]"
      />

      <SectionHeaderblog
        bare
        eyebrow={eyebrow}
        title={title}
        highlight={highlight}
        description={description}
        accentColor="#E63946"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1178px] px-5 pb-20 sm:px-8 lg:px-[30px] lg:pb-24">
        <FeaturedStory story={featured} />

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-6 lg:gap-5">
          {stories.map((story, i) => (
            <StoryCard key={story.id} story={story} index={i} />
          ))}
        </div>
      </div>
    </SectionGlow>
  );
}