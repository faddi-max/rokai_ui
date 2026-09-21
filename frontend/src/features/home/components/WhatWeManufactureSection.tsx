import SectionEyebrow from "./SectionEyebrow";
import ProductSlider from "./ProductSlider";
import {
  manufactureProducts,
  whatWeManufactureHeading,
} from "@/features/home/data/manufactureProducts";
import { motion } from "framer-motion";

const WhatWeManufactureSection = () => {
  const { eyebrow, titleTop, titleBottom, description } =
    whatWeManufactureHeading;

  return (
    <section className="relative w-full overflow-hidden bg-black">
      {/* Bottom red glow behind the slider */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[75%]"
        style={{
          background:
            "radial-gradient(70% 80% at 50% 100%, rgba(229, 27, 36, 0.28) 0%, rgba(105, 1, 6, 0.12) 45%, rgba(0, 0, 0, 0) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1512px] px-6 py-16 sm:px-10 md:py-20 lg:px-12 lg:py-24">
        <SectionEyebrow label={eyebrow} />

        <div className="mb-10 mt-2 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="font-space-grotesk uppercase">
            <span
              className="block font-bold text-white"
              style={{
                fontSize: "clamp(32px, 3.4vw + 14px, 70px)",
                lineHeight: "clamp(34px, 3.3vw + 12px, 68px)",
                letterSpacing: "0%",
              }}
            >
              {titleTop}
            </span>
            <span
              className="block bg-clip-text font-light text-transparent"
              style={{
                fontSize: "clamp(28px, 2.9vw + 12px, 60px)",
                lineHeight: "clamp(28px, 2.5vw + 10px, 51px)",
                letterSpacing: "0%",
                backgroundImage:
                  "linear-gradient(90deg, #E51B24 0%, #690106 100%)",
              }}
            >
              {titleBottom}
            </span>
          </h2>

            <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
            className="border-l border-red-500 pl-5 font-space-grotesk font-light text-white/80 lg:max-w-[420px] lg:text-left"
            style={{
              fontSize: "clamp(16px, 0.5vw + 14px, 20px)",
              lineHeight: "clamp(21px, 0.6vw + 17px, 25px)",
              letterSpacing: "0",
            }}
          >
            {description}
          </motion.p>
        </div>

        <ProductSlider products={manufactureProducts} />
      </div>
    </section>
  );
};

export default WhatWeManufactureSection;