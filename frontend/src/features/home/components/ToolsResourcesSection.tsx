import { motion } from "framer-motion";
import ResourceCard from "./ResourceCard";
import {
  toolsResources,
  toolsResourcesHeading,
} from "@/features/home/data/toolsResources";

const ToolsResourcesSection = () => {
  const { titleTop, titleBottom, description } = toolsResourcesHeading;

  return (
    <section className="w-full bg-black">
      <div className="mx-auto w-full max-w-[1250px] px-5 py-16 sm:px-8 md:py-20 lg:px-0 lg:py-24">
        <div className="mb-10 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-start lg:justify-between">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="font-space-grotesk text-white"
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

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
            className="font-space-grotesk font-light text-white lg:max-w-[420px] lg:text-left"
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
