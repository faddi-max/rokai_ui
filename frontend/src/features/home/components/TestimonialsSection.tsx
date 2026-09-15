import { motion } from "framer-motion";
import TestimonialCard from "./TestimonialCard";
import { testimonials, testimonialsHeading } from "@/features/home/data/testimonials";

const TestimonialsSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(150,15,20,0.3),transparent_60%)]" />

      <div className="relative mx-auto w-full max-w-[1512px] px-6 py-16 sm:px-10 md:py-20 lg:px-16 lg:py-24">
        <div className="mb-10 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="font-space-grotesk text-white">
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
              className="mt-1 block bg-clip-text font-light text-transparent"
              style={{
                fontSize: "clamp(30px, 2.9vw + 12px, 60px)",
                lineHeight: "clamp(30px, 2.5vw + 10px, 51px)",
                letterSpacing: "0%",
                backgroundImage:
                  "linear-gradient(90deg, #E51B24 0%, #690106 100%)",
              }}
            >
              {testimonialsHeading.titleBottom}
            </span>
          </h2>

          <p
            className="font-space-grotesk font-extralight text-white lg:max-w-[420px] lg:text-left"
            style={{
              fontSize: "clamp(16px, 0.5vw + 14px, 20px)",
              lineHeight: "clamp(21px, 0.6vw + 17px, 25px)",
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
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
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
      </div>
    </section>
  );
};

export default TestimonialsSection;
