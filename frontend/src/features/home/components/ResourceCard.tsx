import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import type { ToolResource } from "@/features/home/data/toolsResources";
import AnimatedArrow from "@/shared/components/ui/AnimatedArrow";

interface ResourceCardProps {
  resource: ToolResource;
}

const ResourceCard = ({ resource }: ResourceCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover="hover"
      className="group flex h-full flex-col rounded-[20px] bg-white p-3"
    >
      <div className="flex flex-1 flex-col overflow-hidden rounded-[10px] bg-black">
        <div className="aspect-[16/9] w-full overflow-hidden">
          <motion.img
            src={resource.image}
            alt={resource.imageAlt}
            variants={{ rest: { scale: 1 }, hover: { scale: 1.03 } }}
            initial="rest"
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="flex flex-1 flex-col px-5 pb-6 pt-6 sm:px-6 sm:pb-7 sm:pt-7">
          <span
            className="font-space-grotesk font-medium text-white/70"
            style={{ fontSize: "14px", lineHeight: "14px", letterSpacing: "0" }}
          >
            {resource.number}
          </span>

          <h3
            className="mt-4 font-space-grotesk uppercase"
            style={{
              fontSize: "clamp(28px, 1.5vw + 16px, 38px)",
              lineHeight: "1.05",
              letterSpacing: "0",
            }}
          >
            <span
              className="block bg-clip-text font-light text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #E51B24 0%, #690106 100%)",
              }}
            >
              {resource.title}
            </span>
            <span className="block font-bold text-white">
              {resource.subtitle}
            </span>
          </h3>

          <p
            className="mt-5 font-space-grotesk font-light capitalize text-white/80"
            style={{
              fontSize: "clamp(14px, 0.3vw + 13px, 16px)",
              lineHeight: "1.35",
              letterSpacing: "0",
            }}
          >
            {resource.description}
          </p>

          <div className="mt-auto pt-8">
            <a
              href={resource.href}
              className="inline-flex items-center gap-3 rounded-[4px] bg-[#E51B24] px-5 py-3 font-space-grotesk text-[14px] font-medium leading-[16px] text-white transition-colors hover:bg-[#c9161e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span>{resource.buttonText}</span>
              <AnimatedArrow
                icon={ArrowUpRight}
                className="h-4 w-4 shrink-0"
              />
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default ResourceCard;