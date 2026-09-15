import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import type { ToolResource } from "@/features/home/data/toolsResources";

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
      className="group relative min-h-[390px] overflow-hidden bg-[#F6F6F6] sm:min-h-[350px] lg:h-[267px] lg:min-h-0"
    >
      <motion.img
        src={resource.image}
        alt={resource.imageAlt}
        variants={{ rest: { scale: 1 }, hover: { scale: 1.025 } }}
        initial="rest"
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute bottom-0 right-0 h-[44%] w-full object-cover object-center sm:h-full sm:w-[48%]"
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#F6F6F6] via-[#F6F6F6]/90 to-transparent sm:bg-gradient-to-r sm:from-[#F6F6F6] sm:via-[#F6F6F6]/90 sm:via-[28%] sm:to-transparent" />

      <div className="relative z-10 flex h-full w-full max-w-full flex-col items-start px-6 pb-6 pt-7 sm:max-w-[55%] sm:px-7 sm:pb-7 sm:pt-8 lg:max-w-[56%] lg:px-8 lg:pb-7 lg:pt-8">
        <h3 className="font-space-grotesk text-[clamp(1.25rem,6vw,1.5rem)] leading-[0.9] tracking-[0]">
          <span className="block font-bold text-black">{resource.title}</span>
          <span
            className="mt-1 block bg-clip-text font-light text-transparent"
            style={{
              backgroundImage: "linear-gradient(90deg, #E51B24 0%, #690106 100%)",
            }}
          >
            {resource.subtitle}
          </span>
        </h3>

        <p className="mt-6 font-space-grotesk text-[clamp(0.875rem,4vw,1rem)] font-light leading-[1.3] text-black">
          {resource.description}
        </p>

        <a
          href={resource.href}
          className="mt-auto inline-flex items-center gap-3 bg-[#E51B24] px-4 py-3 text-[12px] font-medium uppercase leading-[14px] text-white transition-colors hover:bg-[#c9161e] sm:px-5 sm:py-3.5"
        >
          <span className="font-space-grotesk">{resource.buttonText}</span>
          <ArrowUpRight className="h-4 w-4 shrink-0" />
        </a>
      </div>
    </motion.article>
  );
};

export default ResourceCard;
