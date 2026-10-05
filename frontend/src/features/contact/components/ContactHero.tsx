import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Button from "@/shared/components/ui/Button";

interface HeroCta {
  label: string;
  href: string;
}

export interface ContactHeroProps {
  image: string;
  imageAlt?: string;
  imageOpacity?: number;
  eyebrow?: string;
  headingWhite?: string;
  headingRed?: string;
  description?: string;
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
  quickLinks?: string[];
  iscontactPage?: boolean;
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
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function ContactHero({
  image,
  imageAlt = "Rokai gi detail",
  imageOpacity = 0.32,
  eyebrow = "Contact Rokai",
  headingWhite = "Let's Start",
  headingRed = "A Conversation",
  description = "Have a question about ROKAI, our products, manufacturing capabilities, partnerships or services? Tell us what you need and our team will get back to you.",
  primaryCta = { label: "Send an Enquiry", href: "#enquiry" },
  secondaryCta = { label: "Find Rokai", href: "#location" },
  quickLinks = ["General Inquiries", "Partnerships", "Manufacturing", "Support"],
  iscontactPage = true,
}: ContactHeroProps) {
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
          className="font-space-grotesk text-[11px] font-bold uppercase leading-[16px] tracking-[2px] text-[#E63946]"
        >
          {eyebrow}
        </motion.span>

        <motion.h1
          variants={item}
          className="mt-3 font-space-grotesk text-[32px] font-bold uppercase leading-[1.1] sm:text-[38px] lg:text-[68px]"
        >
          <span className="block text-white">{headingWhite}</span>
          <span className="block text-[#E63946]">{headingRed}</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-4 max-w-[560px] font-space-grotesk text-[13px] font-normal leading-[1.6] text-white/80 sm:text-[14px]"
        >
          {description}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-6 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
        >
          <Button
            href={primaryCta.href}
            variant="outline"
            icon={ArrowUpRight}
            weight="medium"
            size="12px"
            className="h-[38px] w-full px-5 sm:w-auto"
          >
            {primaryCta.label}
          </Button>
          <Button
            href={secondaryCta.href}
            weight="medium"
            size="12px"
            className="h-[38px] w-full px-5 sm:w-auto"
          >
            {secondaryCta.label}
          </Button>
        </motion.div>
            
{iscontactPage && quickLinks.length > 0 && (
  <motion.div
    variants={item}
    className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5"
  >
    {quickLinks.map((link, i) => (
      <span key={link} className="flex items-center gap-3">
        {i > 0 && (
          <span aria-hidden className="text-[10px] text-white/25">
            |
          </span>
        )}
        <span className="font-space-grotesk text-[9px] font-medium uppercase tracking-[0.1em] text-white/40">
          {link}
        </span>
      </span>
    ))}
  </motion.div>
)}

        
      </motion.div>
    </section>
  );
}