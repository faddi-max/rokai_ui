import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Button from "@/shared/components/ui/Button";

interface HeroCta {
  label: string;
  href: string;
}

export interface BespokeHeroProps {
  image: string;
  imageAlt?: string;
  imageOpacity?: number;
  lineOne?: string;
  lineTwo?: string;
  lineThree?: string;
  description?: string;
  primaryCta?: HeroCta;
}

const BG_COLOR = "#111111";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function BespokeHero({
  image,
  imageAlt = "Custom combat sports apparel being developed for a brand",
  imageOpacity = 0.12,
  lineOne = "Bespoke",
  lineTwo = "and",
  lineThree = "Customization",
  description = "Create fully customized BJJ apparel and jiu jitsu uniforms with unique designs, branding and precision detailing.",
  primaryCta = { label: "Explore Categories", href: "/categories" },
}: BespokeHeroProps) {
  return (
    <section
      className="relative overflow-hidden lg:h-[449px]"
      style={{ backgroundColor: BG_COLOR }}
    >
      {/* Background image @ 32% opacity over #111111 */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src={image}
          alt={imageAlt}
          className="h-full w-full object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: BG_COLOR, opacity: 1 - imageOpacity }}
        />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col justify-center px-5 py-12 sm:px-8 md:px-10 lg:h-full lg:px-[50px] lg:py-0"
      >
        <motion.h1
          variants={item}
          className="font-space-grotesk text-[38px] font-bold uppercase leading-[44px] text-white sm:text-[48px] sm:leading-[56px] lg:text-[56px] lg:leading-[64px]"
        >
          <span className="block">{lineOne}</span>
          <span className="block">{lineTwo}</span>
          <span className="block text-[#E51B24]">{lineThree}</span>
        </motion.h1>

        {/* Two-segment underline mark */}
        <motion.div variants={item} aria-hidden className="mt-3 flex items-center gap-2">
          <span className="h-[3px] w-[72px] bg-white" />
          <span className="h-[3px] w-[18px] bg-white" />
        </motion.div>

        <motion.p
          variants={item}
          className="mt-5 max-w-[700px] font-space-grotesk text-[15px] font-normal leading-[24px] text-white sm:text-[18px] sm:leading-[30px]"
        >
          {description}
        </motion.p>

        <motion.div variants={item} className="mt-5">
          <Button
            href={primaryCta.href}
            icon={ArrowUpRight}
            weight="medium"
            size="14px"
            className="h-[44px] w-fit px-5"
          >
            {primaryCta.label}
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}