import { Play } from "lucide-react";
import { motion } from "framer-motion";
import type { Testimonial } from "@/features/home/data/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
  onPlay?: (testimonial: Testimonial) => void;
}

const TestimonialCard = ({ testimonial, onPlay }: TestimonialCardProps) => {
  const { image, title, subtitle } = testimonial;

  return (
    <motion.button
      type="button"
      onClick={() => onPlay?.(testimonial)}
      whileHover="hover"
      initial="rest"
      animate="rest"
      className="group relative aspect-[365/406] w-full max-w-[440px] overflow-hidden text-left outline-none focus-visible:ring-2 focus-visible:ring-[#E51B24] sm:aspect-[420/540] lg:h-[675px] lg:aspect-auto"
    >
      <motion.img
        src={image}
        alt={title}
        variants={{ rest: { scale: 1 }, hover: { scale: 1.04 } }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

      <motion.span
        variants={{ rest: { scale: 1 }, hover: { scale: 1.08 } }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#E51B24] shadow-[0_8px_24px_rgba(229,27,36,0.45)] sm:h-16 sm:w-16"
      >
        <Play className="ml-0.5 h-5 w-5 fill-white text-white sm:h-6 sm:w-6" />
      </motion.span>

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <p className="font-space-grotesk text-[20px] font-bold leading-[26px] text-white sm:text-[24px] sm:leading-[30px]">
          {title}
        </p>
        <p className="mt-1 font-space-grotesk text-[14px] font-light leading-[18px] text-white/70 sm:text-[16px] sm:leading-[20px]">
          {subtitle}
        </p>
      </div>
    </motion.button>
  );
};

export default TestimonialCard;
