import { useState } from "react";
import { motion } from "framer-motion";
import FAQItem from "./FAQItem";
import { faqs } from "@/features/home/data/faqs";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

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
            <div className="flex items-center gap-4">
              <span className="font-space-grotesk text-[20px] font-light leading-[25px] text-white sm:text-[24px] sm:leading-[30px]">
                FAQs
              </span>
              <span className="h-0 w-[56px] shrink-0 border-t-2 border-[#E51B24]" />
            </div>

            <h2 className="mt-5 font-space-grotesk">
              <span className="block font-bold text-white" style={{ fontSize: "clamp(38px, 3.2vw + 10px, 56px)", lineHeight: "clamp(40px, 3.2vw + 10px, 54px)" }}>
                FREQUENTLY
              </span>
              <span
                className="block bg-clip-text font-light text-transparent"
                style={{
                  fontSize: "clamp(38px, 3.2vw + 10px, 56px)",
                  lineHeight: "clamp(40px, 3.2vw + 10px, 54px)",
                  backgroundImage: "linear-gradient(90deg, #E51B24 0%, #690106 100%)",
                }}
              >
                ASKED QUESTIONS
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
            className="font-space-grotesk font-light text-white lg:mt-1 lg:max-w-[290px] lg:text-left"
            style={{ fontSize: "clamp(16px, 0.3vw + 14px, 18px)", lineHeight: "clamp(22px, 0.35vw + 19px, 25px)" }}
          >
            Quick answers to common questions about orders, customization, production, and delivery.
          </motion.p>
        </div>

        <div className="mt-14 flex flex-col gap-4 sm:mt-[72px] sm:gap-[17px]">
          {faqs.map((faq, index) => (
            <FAQItem
              key={faq.question}
              faq={faq}
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
