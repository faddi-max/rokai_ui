import { Play } from "lucide-react";
import { motion } from "framer-motion";
import type { Testimonial } from "@/features/home/data/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
  onPlay?: (testimonial: Testimonial) => void;
}

const TestimonialCard = ({ testimonial, onPlay }: TestimonialCardProps) => {
  const { image, clientType, country, project, productCategory } = testimonial;

  return (
    <motion.button
      type="button"
      onClick={() => onPlay?.(testimonial)}
      whileHover="hover"
      initial="rest"
      animate="rest"
      className="group relative aspect-[6/5.4] w-full overflow-hidden rounded-sm text-left outline-none focus-visible:ring-2 focus-visible:ring-[#E51B24]"
    >
      <motion.img
        src={image}
        alt={`${clientType} in ${country} — ${project}`}
        variants={{ rest: { scale: 1 }, hover: { scale: 1.04 } }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-white/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3">
        <motion.span
          variants={{ rest: { scale: 1 }, hover: { scale: 1.08 } }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E51B24] shadow-[0_8px_24px_rgba(229,27,36,0.45)] sm:h-16 sm:w-16"
        >
          <motion.span
            variants={{ rest: { scale: 1 }, hover: { scale: 1.25 } }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <Play className="ml-0.5 h-5 w-5 fill-white text-white sm:h-6 sm:w-6" />
          </motion.span>
        </motion.span>

        <span className="font-space-grotesk text-[13px] font-light text-white/90 sm:text-[14px]">
          Watch Our Story
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <p className="font-space-grotesk text-[18px] font-bold leading-[24px] text-[#E51B24] sm:text-[20px] sm:leading-[26px]">
          {clientType} — {country}
        </p>
        <p className="mt-1 font-space-grotesk text-[13px] font-light leading-[17px] text-white/70 sm:text-[14px] sm:leading-[18px]">
          {project} · {productCategory}
        </p>
      </div>
    </motion.button>
  );
};

export default TestimonialCard;