import { motion } from "framer-motion";
import SectionGlow from "../layout/SectionGlow";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
}

export default function SectionHeaderblog({
  eyebrow,
  title,
  highlight,
  description,
}: SectionHeaderProps) {
  return (
    <SectionGlow>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex lg:m-25 m-5 flex-col gap-6 mb-10 md:flex-row md:items-start md:justify-between"
      >
        <div>
          <div className="mb-3 flex items-center gap-3">
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="font-space-grotesk text-xs uppercase tracking-widest text-white/70"
            >
              {eyebrow}
            </motion.span>
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ originX: 0 }}
              className="h-px w-10 bg-[#E51B24]"
            />
          </div>
          <h2 className="font-space-grotesk text-3xl font-bold uppercase leading-[1.1] md:text-4xl lg:text-5xl">
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="block text-white"
            >
              {title}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="block text-[#E51B24]"
            >
              {highlight}
            </motion.span>
          </h2>
        </div>
        <motion.p
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="max-w-xs border-l-2 border-[#E51B24] pl-4 text-sm text-white/60"
        >
          {description}
        </motion.p>
      </motion.div>
    </SectionGlow>
  );
}