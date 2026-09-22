import { motion } from "framer-motion";
import SectionEyebrow from "./SectionEyebrow";
import TestimonialCard from "./TestimonialCard";
import {
  testimonials,
  testimonialsHeading,
  trustStats,
} from "@/features/home/data/testimonials";

const TestimonialsSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(150,15,20,0.3),transparent_60%)]" />

      <div className="relative mx-auto w-full max-w-[1512px] px-6 py-16 sm:px-10 md:py-20 lg:px-16 lg:py-24">
        <div className="mb-10 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <SectionEyebrow label={testimonialsHeading.eyebrow} />

            <h2 className="mt-3 font-space-grotesk text-white">
              <span
                className="block font-bold"
                style={{
                  fontSize: "clamp(36px, 3.4vw + 14px, 70px)",
                  lineHeight: "clamp(36px, 3.3vw + 12px, 68px)",
                  letterSpacing: "0%",
                }}
              >
                {testimonialsHeading.titleTop}
              </span>
              <span
                className="mt-1 block bg-clip-text font-bold text-transparent"
                style={{
                  fontSize: "clamp(36px, 3.4vw + 14px, 70px)",
                  lineHeight: "clamp(36px, 3.3vw + 12px, 68px)",
                  letterSpacing: "0%",
                  backgroundImage:
                    "linear-gradient(90deg, #E51B24 0%, #690106 100%)",
                }}
              >
                {testimonialsHeading.titleBottom}
              </span>
            </h2>
          </div>

          <p
            className="max-w-[300px] border-l border-[#E51B24]/60 pl-4 font-space-grotesk font-light text-white/70 lg:max-w-[320px] lg:text-left"
            style={{
              fontSize: "clamp(14px, 0.4vw + 13px, 16px)",
              lineHeight: "clamp(19px, 0.5vw + 15px, 22px)",
              letterSpacing: "0%",
            }}
          >
            {testimonialsHeading.description}
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.12 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </motion.div>

     <div className="mt-10 flex flex-col gap-8 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between lg:mt-14">
          <div className="flex flex-wrap items-center gap-y-5">
            {trustStats.map((stat, index) => (
              <div key={stat.label} className="flex items-center">
                <div className="pr-5 sm:pr-8">
                  <p className="font-space-grotesk text-[18px] font-bold leading-[22px] text-white xs:text-[20px] sm:text-[22px]">
                    {stat.label}
                  </p>
                  <p className="mt-1.5 whitespace-nowrap font-space-grotesk text-[10px] font-light leading-[13px] text-white/50 sm:text-[12px]">
                    {stat.label}
                  </p>
                </div>
                {index < trustStats.length - 1 && (
                  <div className="mr-5 h-9 w-px bg-white/15 sm:mr-8" />
                )}
              </div>
            ))}
          </div>
 
          <a
            href="/blogs"
            className="group inline-flex w-full items-center justify-center gap-1.5 rounded-[6px] bg-[#E51B24] px-5 py-2.5 font-space-grotesk text-[13px] font-medium text-white transition-colors hover:bg-[#c9161e] sm:w-fit sm:justify-start"
          >
            View Our Blogs
            <svg
              width="12"
              height="12"
              viewBox="0 0 14 14"
              fill="none"
              className="shrink-0"
            >
              <path
                d="M4 10L10 4M10 4H5M10 4V9"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;