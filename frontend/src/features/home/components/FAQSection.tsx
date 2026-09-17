import { useState } from "react";
import { motion } from "framer-motion";
import FAQItem from "./FAQItem";
import { faqs } from "@/features/home/data/faqs";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full bg-black">
      <div className="mx-auto w-full max-w-[1250px] px-5 py-16 sm:px-8 md:py-20 lg:px-0 lg:py-28">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3">
              <span className="font-space-grotesk text-[13px] font-medium uppercase tracking-[0.08em] text-white">
                FAQ
              </span>
              <span className="h-0 w-[38px] shrink-0 border-t-2 border-[#E51B24]" />
            </div>

            <h2 className="mt-4 font-space-grotesk">
              <span
                className="block font-bold uppercase text-white"
                style={{
                  fontSize: "clamp(32px, 3.2vw + 10px, 46px)",
                  lineHeight: "clamp(36px, 3.2vw + 10px, 50px)",
                }}
              >
                Frequently
              </span>
              <span
                className="block bg-clip-text font-bold uppercase text-transparent"
                style={{
                  fontSize: "clamp(32px, 3.2vw + 10px, 46px)",
                  lineHeight: "clamp(36px, 3.2vw + 10px, 50px)",
                  backgroundImage: "linear-gradient(90deg, #E51B24 0%, #690106 100%)",
                }}
              >
                Asked Questions
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
              Quick answers to common queries about orders, customization, production, and
              delivery.
            </p>
          </motion.div>
        </div>

        <div className="mt-12 flex flex-col sm:mt-16">
          {faqs.map((faq, index) => (
            <FAQItem
              key={faq.question}
              faq={faq}
              index={index}
              isOpen={activeIndex === index}
              onToggle={() => setActiveIndex(activeIndex === index ? -1 : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;