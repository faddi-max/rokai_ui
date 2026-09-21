import { motion } from "framer-motion";
import ResourceCard from "./ResourceCard";
import {
  toolsResources,
  toolsResourcesHeading,
} from "@/features/home/data/toolsResources";

const ToolsResourcesSection = () => {
  const { eyebrow, titleTop, titleBottom, description } =
    toolsResourcesHeading;

  return (
    <section className="relative w-full overflow-hidden bg-black">
      {/* Top red glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[320px]"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 0%, rgba(229, 27, 36, 0.22) 0%, rgba(0, 0, 0, 0) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1250px] px-5 py-16 sm:px-8 md:py-20 lg:px-0 lg:py-24">
        <div className="mb-10 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="mb-4 block font-space-grotesk font-medium uppercase text-[#E51B24]"
              style={{
                fontSize: "clamp(12px, 0.2vw + 11px, 14px)",
                lineHeight: "1",
                letterSpacing: "0.2em",
              }}
            >
              {eyebrow}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.04, ease: "easeOut" }}
              className="font-space-grotesk uppercase text-white"
            >
              <span
                className="block font-bold"
                style={{
                  fontSize: "clamp(38px, 3.4vw + 14px, 70px)",
                  lineHeight: "clamp(40px, 3.3vw + 12px, 68px)",
                  letterSpacing: "0",
                }}
              >
                {titleTop}
              </span>
              <span
                className="block bg-clip-text font-light text-transparent"
                style={{
                  fontSize: "clamp(32px, 2.9vw + 12px, 60px)",
                  lineHeight: "clamp(34px, 2.5vw + 10px, 51px)",
                  letterSpacing: "0",
                  backgroundImage:
                    "linear-gradient(90deg, #E51B24 0%, #690106 100%)",
                }}
              >
                {titleBottom}
              </span>
            </motion.h2>
          </div>

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

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-6">
          {toolsResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsResourcesSection;