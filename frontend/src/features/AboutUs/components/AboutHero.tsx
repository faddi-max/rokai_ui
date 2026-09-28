import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Button from "@/shared/components/ui/Button";

interface HeroCta {
  label: string;
  href: string;
}

export interface AboutHeroProps {
  image: string;
  imageAlt?: string;
  imageOpacity?: number;
  eyebrow?: string;
  lineOne?: string;
  lineTwo?: string;
  lineThree?: string;
  description?: string;
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
}

const BG_COLOR = "#111111";

const GLOWS = [
  { width: 315, height: 315, top: 167, left: 688, color: "#E51B2487" },
  { width: 329, height: 329, top: 383, left: 919, color: "#E51B2487" },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function AboutHero({
  image,
  imageAlt = "Rokai combat sports apparel",
  imageOpacity = 0.32,
  eyebrow = "About Rokai",
  lineOne = "Combat Sports.",
  lineTwo = "Manufactured",
  lineThree = "For You",
  description = "ROKAI is a combat sports and fightwear manufacturing partner for brands, academies, teams, retailers and industry partners. We connect product development, manufacturing, quality control and export to turn ideas into finished products.",
  primaryCta = { label: "Discover Our Story", href: "#story" },
  secondaryCta = { label: "How we build", href: "#process" },
}: AboutHeroProps) {
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: BG_COLOR }}
    >
      <div className="pointer-events-none absolute inset-0">
        <img src={image} alt={imageAlt} className="h-full w-full object-cover object-center" />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: BG_COLOR, opacity: 1 - imageOpacity }}
        />

        <div className="relative hidden h-full max-w-[1512px] lg:block">
          {GLOWS.map((glow, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                width: glow.width,
                height: glow.height,
                top: glow.top,
                left: glow.left,
                backgroundColor: glow.color,
                filter: "blur(500px)",
              }}
            />
          ))}
        </div>

        <div
          className="absolute -right-1/3 -top-1/4 h-[70vw] w-[70vw] max-h-[420px] max-w-[420px] rounded-full lg:hidden"
          style={{ backgroundColor: "#E51B2470", filter: "blur(120px)" }}
        />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex min-h-[520px] w-full max-w-[1512px] flex-col items-center justify-center px-5 py-16 text-center sm:px-8 lg:min-h-[600px] lg:px-16"
      >
        <motion.span
          variants={item}
          className="font-space-grotesk text-[12px] font-bold uppercase leading-[16px] tracking-[2px] text-[#E63946]"
        >
          {eyebrow}
        </motion.span>

        <motion.h1
          variants={item}
          className="mt-4 flex flex-col items-center font-space-grotesk text-[40px] font-bold uppercase leading-[100%] sm:text-[54px] lg:gap-[7px] lg:text-[68px]"
        >
          <span
            className="tracking-[-1.74px] text-white"
            style={{ WebkitTextStroke: "1px #FFFFFF" }}
          >
            {lineOne}
          </span>
          <span
            className="tracking-[0.26px]"
            style={{ WebkitTextStroke: "1px #FFFFFF", WebkitTextFillColor: "transparent" }}
          >
            {lineTwo}
          </span>
          <span className="text-[#E63946]">{lineThree}</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-[750px] font-space-grotesk text-[14px] font-normal leading-[1.5] text-white/85 sm:text-[16px]"
        >
          {description}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-7 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
        >
          <Button
            href={primaryCta.href}
            variant="outline"
            icon={ArrowUpRight}
            weight="medium"
            size="13px"
            className="h-[40px] w-full px-5 sm:w-auto"
          >
            {primaryCta.label}
          </Button>
          <Button
            href={secondaryCta.href}
            weight="medium"
            size="13px"
            className="h-[40px] w-full px-5 sm:w-auto"
          >
            {secondaryCta.label}
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}