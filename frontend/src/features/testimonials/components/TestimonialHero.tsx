import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { testimonialHeroData } from "../data/testimonialHeroData";

export interface TestimonialHeroData {
  image: string;
  imageOpacity?: number;
  eyebrow: string;
  headingWhite: string;
  headingRed: string;
  description: string;
  rating: string;
  ratingCaption: string;
}

const BG_COLOR = "#111111";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function TestimonialHero() {
  const {
    image,
    imageOpacity = 0.32,
    eyebrow,
    headingWhite,
    headingRed,
    description,
    rating,
    ratingCaption,
  }: TestimonialHeroData = testimonialHeroData;

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: BG_COLOR }}
    >
      <div className="pointer-events-none absolute inset-0">
        <img src={image} alt="" className="h-full w-full object-cover object-center" />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: BG_COLOR, opacity: 1 - imageOpacity }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(145,18,27,0.22)_0%,transparent_68%)]" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex min-h-[390px] w-full max-w-[1512px] flex-col items-center justify-center px-5 py-14 text-center sm:min-h-[440px] sm:px-8 lg:min-h-[480px] lg:px-16"
      >
        <motion.span
          variants={item}
          className="font-space-grotesk text-[9px] font-bold uppercase leading-[14px] tracking-[2px] text-[#E63946]"
        >
          {eyebrow}
        </motion.span>

        <motion.h1
          variants={item}
          className="mt-2 font-space-grotesk text-[28px] font-bold uppercase leading-[1.02] sm:text-[42px] lg:text-[68px]"
        >
          <span className="block text-white">{headingWhite}</span>
          <span className="block text-[#E63946]">{headingRed}</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-3 max-w-[560px] font-space-grotesk text-[11px] font-normal leading-[1.5] text-white/75 sm:text-[13px]"
        >
          {description}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-4 flex flex-col items-center"
        >
          <span className="font-space-grotesk text-[15px] lg:text-[62px] font-bold leading-none text-white sm:text-[22px]">
            {rating}
            </span>
          <div className="mt-4 flex items-center gap-0.5" aria-label={`${rating} rating`}>
            {Array.from({ length: 5 }, (_, index) => (
              <Star
                key={index}
                aria-hidden="true"
                className="size-5 fill-[#E63946] text-[#E63946]"
                strokeWidth={1.5}
              />
            ))}
          </div>
          <span className="mt-3 font-space-grotesk text-[15px] font-normal leading-[12px] text-white/50 sm:text-[15px]">
            {ratingCaption}
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}