import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export interface CareersTeamSectionProps {
  mainImage: string;
  mainImageAlt?: string;
  secondaryImage: string;
  secondaryImageAlt?: string;
  badgeValue?: string;
  badgeLabel?: string;
  caption?: string;
  eyebrow?: string;
  headingWhite?: string[];
  headingRed?: string;
  description?: string;
  cta?: { label: string; href: string };
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function CareersTeamSection({
  mainImage,
  mainImageAlt = "Team member reviewing building plans",
  secondaryImage,
  secondaryImageAlt = "Construction site",
  badgeValue = "40+",
  badgeLabel = "Employees",
  caption = "Build something meaningful / 01",
  eyebrow = "Building with integrity",
  headingWhite = ["Join the team", "that builds"],
  headingRed = "with purpose.",
  description = "Whether You’re On The Job Site Or Behind The Scenes, Every Team Member Plays A Role In Shaping The Spaces Our Clients Call Home Or Grow Their Businesses In. We Value Skill, Respect Your Time, And Support Your Growth.",
  cta = { label: "See Open Roles", href: "#career-opportunities" },
}: CareersTeamSectionProps) {
  return (
    <section
      className="w-full bg-[#0b0b0b] px-5 py-16 sm:px-8 lg:py-24"
      style={{
        backgroundImage:
          "radial-gradient(circle at 15% 50%, rgba(105,1,6,0.35) 0%, rgba(105,1,6,0) 55%)",
      }}
    >
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Image collage — positioned in % so it scales as one unit */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease }}
          className="relative mx-auto aspect-[600/680] w-full max-w-[600px]"
        >
          <div className="absolute z-20 left-[19.2%] top-[11.8%] h-[70.6%] w-[65.8%] overflow-hidden rounded-[14px] border border-white/10">
            <img src={mainImage} alt={mainImageAlt} className="h-full w-full object-cover" />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent"
            />
            <span className="absolute bottom-[6%] left-[6%] font-space-grotesk text-[10px] uppercase tracking-[1.5px] text-white/80 sm:text-[12px]">
              {caption}
            </span>
          </div>

          <div className="absolute left-0 top-[59.3%] z-10 h-[37%] w-[35.7%] overflow-hidden rounded-[14px] border border-white/10">
            <img src={secondaryImage} alt={secondaryImageAlt} className="h-full w-full object-cover" />
          </div>

          <div className="absolute left-[72.2%] top-[4.4%] z-20 flex aspect-square w-[16.8%] flex-col items-center justify-center rounded-full bg-[#e63946] text-center shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
            <span className="font-space-grotesk text-[16px] font-bold leading-none text-white sm:text-[24px]">
              {badgeValue}
            </span>
            <span className="mt-1 font-space-grotesk text-[7px] uppercase tracking-[0.8px] text-white sm:text-[9px]">
              {badgeLabel}
            </span>
          </div>
        </motion.div>

        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="flex flex-col"
        >
          <div className="flex items-center gap-4">
            <span className="font-space-grotesk text-[13px] uppercase tracking-[0.5px] text-[#d9d9d9]">
              {eyebrow}
            </span>
            <span aria-hidden className="h-px w-[52px] bg-[#e63946]" />
          </div>

          <h2 className="mt-6 max-w-[559px] font-space-grotesk text-[40px] font-bold uppercase leading-[48px] text-white sm:text-[52px] sm:leading-[62px] lg:text-[63px] lg:leading-[76px]">
            {headingWhite.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>

          <span className="mt-1 block bg-gradient-to-r from-[#e63946] to-[#690106] bg-clip-text font-space-grotesk text-[34px] font-medium uppercase leading-[40px] text-transparent sm:text-[44px] sm:leading-[50px] lg:text-[56px] lg:leading-[60px]">
            {headingRed}
          </span>

          <p className="mt-6 max-w-[520px] font-space-grotesk text-[14px] font-medium leading-[24px] text-white">
            {description}
          </p>

          <a
            href={cta.href}
            className="group mt-6 flex h-[37px] w-fit items-center gap-[25px] rounded-[6px] bg-[#e63946] px-[13px] font-space-grotesk text-[13px] font-medium text-white transition-colors hover:bg-[#ee4250]"
          >
            {cta.label}
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
