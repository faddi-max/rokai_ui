import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

type Testimonial = {
  number: string;
  quote: string;
  label: string;
};

const testimonials: Testimonial[] = [
  {
    number: "01",
    quote:
      "Our academy needed durable BJJ uniforms and reliable supply. ROKAI delivered both. The quality of their jiu jitsu gear stands out immediately.",
    label: "Academy Partner",
  },
  {
    number: "02",
    quote:
      "From custom BJJ gear to private label production, ROKAI helped us scale our brand without compromising on quality or performance.",
    label: "Private Label Brand",
  },
];

const StarRow = () => (
  <div className="flex items-center gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className="h-3.5 w-3.5" fill="#E51B24" color="#E51B24" strokeWidth={0} />
    ))}
  </div>
);

const ClientFeedbackSection = () => {
  return (
    <section className="w-full bg-black">
      <div className="mx-auto w-full max-w-[1250px] px-5 py-16 sm:px-8 md:py-20 lg:px-0 lg:py-28">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3">
              <span className="font-space-grotesk text-[13px] font-light text-white/60">
                Client Feedback
              </span>
              <span className="h-0 w-[38px] shrink-0 border-t border-white/25" />
            </div>

            <h2 className="mt-4 font-space-grotesk">
              <span
                className="block font-bold uppercase text-white"
                style={{
                  fontSize: "clamp(28px, 2.6vw + 10px, 40px)",
                  lineHeight: "clamp(32px, 2.6vw + 10px, 44px)",
                }}
              >
                Trusted By Those
              </span>
              <span
                className="block font-bold uppercase"
                style={{
                  fontSize: "clamp(28px, 2.6vw + 10px, 40px)",
                  lineHeight: "clamp(32px, 2.6vw + 10px, 44px)",
                }}
              >
                <span className="text-[#E51B24]">Who Build</span>{" "}
                <span className="text-white">With Us.</span>
              </span>
            </h2>
          </motion.div>
     <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
            className="border-l-2 border-[#E51B24] pl-4 lg:mt-2 lg:max-w-[230px]"
          >
            <p className="font-space-grotesk text-[13px] font-light leading-[19px] text-white/60 sm:text-[14px] sm:leading-[20px]">
              Real feedback from academies and brands that rely on Rokai for consistent quality,
            dependable production and performance-driven BJJ gear.
            </p>
          </motion.div>
       
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:mt-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="relative overflow-hidden rounded-md border border-white/10 bg-[#0d0908] p-6 sm:p-8"
          >
            <span className="absolute left-8 top-0 h-[3px] w-10 bg-[#E51B24]" />
            <Quote
              className="pointer-events-none absolute right-6 top-6 h-16 w-16 text-[#E51B24]/10"
              strokeWidth={0}
              fill="currentColor"
            />

            <StarRow />

            <p className="relative mt-6 max-w-[420px] font-space-grotesk text-[20px] font-medium leading-[28px] text-white sm:text-[22px] sm:leading-[30px]">
              "We've worked with multiple suppliers, but none match this level of{" "}
              <span className="text-[#E51B24]">consistency</span> in custom BJJ apparel and
              manufacturing quality. Every order arrives exactly as expected."
            </p>

            <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-5">
              <span className="font-space-grotesk text-[11px] font-light uppercase tracking-[0.05em] text-white/35">
                Custom BJJ Apparel
              </span>
              <span className="flex items-center gap-2 font-space-grotesk text-[11px] font-light uppercase tracking-[0.05em] text-white/35">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E51B24]" />
                Client Feedback
              </span>
            </div>
          </motion.div>

          <div className="flex flex-col gap-5">
            {testimonials.map((item, index) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: 0.08 * (index + 1), ease: "easeOut" }}
                className="rounded-md border border-white/10 bg-[#0d0908] p-6"
              >
                <div className="flex items-center justify-between">
                  <StarRow />
                  <span className="font-space-grotesk text-[12px] font-light text-white/25">
                    {item.number}
                  </span>
                </div>

                <p className="mt-5 font-space-grotesk text-[13px] font-light leading-[20px] text-white/60 sm:text-[14px] sm:leading-[21px]">
                  "{item.quote}"
                </p>

                <div className="mt-6 flex items-center gap-2 border-t border-white/10 pt-4">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E51B24]" />
                  <span className="font-space-grotesk text-[11px] font-light uppercase tracking-[0.05em] text-white/35">
                    {item.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientFeedbackSection;
