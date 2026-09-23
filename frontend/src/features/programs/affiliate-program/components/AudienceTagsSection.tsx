import { motion } from "framer-motion";
import SectionGlow from "@/shared/components/layout/SectionGlow";

interface AudienceTagsSectionProps {
  tags: string[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const tagVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function AudienceTagsSection({ tags }: AudienceTagsSectionProps) {
  return (
    <div>
      <SectionGlow>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-3 px-5 pb-10 pt-6 sm:gap-4 sm:pb-16 sm:pt-8"
        >
          {tags.map((tag) => (
            <motion.span
              key={tag}
              variants={tagVariants}
              whileHover={{
                scale: 1.06,
                y: -3,
                boxShadow: "0px 8px 24px rgba(230, 57, 70, 0.5)",
              }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className="cursor-pointer rounded-lg border border-[#E63946]/40 bg-[#E63946] px-4 py-2.5 font-space-grotesk text-sm font-medium text-white shadow-md transition-colors hover:bg-[#ee4250] sm:px-6 sm:py-3 sm:text-base"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </SectionGlow>
    </div>
  );
}