import { motion } from "framer-motion";
import SectionGlow from "../layout/SectionGlow";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  highlight: string;
  afterHighlight?: string;
  /** White text rendered inline right before the highlight, on the same line (e.g. "BUILD YOUR " + "BRAND."). */
  highlightPrefix?: string;
  highlightPosition?: "line" | "start";
  description?: string;
  accentColor?: string;
  highlightGradient?: string;
  highlightFontSize?: string;
  highlightLineHeight?: string;
  highlightFontWeight?: number | string;
  bare?: boolean;
}

export default function SectionHeaderblog({
  eyebrow,
  title,
  highlight,
  afterHighlight,
  highlightPrefix,
  highlightPosition = "line",
  description,
  accentColor = "#E51B24",
  highlightGradient,
  highlightFontSize,
  highlightLineHeight,
  highlightFontWeight,
  bare = false,
}: SectionHeaderProps) {
  const highlightStyle: React.CSSProperties = {
    ...(highlightGradient
      ? {
          backgroundImage: highlightGradient,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          WebkitTextFillColor: "transparent",
        }
      : { color: accentColor }),
    ...(highlightFontSize && { fontSize: highlightFontSize }),
    ...(highlightLineHeight && { lineHeight: highlightLineHeight }),
    ...(highlightFontWeight && { fontWeight: highlightFontWeight }),
  };

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`flex lg:m-25 m-5 flex-col gap-6 mb-10 ${
        description ? "md:flex-row md:items-start md:justify-between" : ""
      }`}
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
            className="h-px w-10"
            style={{ backgroundColor: accentColor, transformOrigin: "0 0" }}
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
          {highlightPosition === "start" ? (
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="block"
            >
              <span style={highlightStyle}>{highlight}</span>
              {afterHighlight && <span className="text-white">{afterHighlight}</span>}
            </motion.span>
          ) : (
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="block"
            >
              {highlightPrefix && <span className="text-white">{highlightPrefix}</span>}
              <span style={highlightStyle}>{highlight}</span>
            </motion.span>
          )}
        </h2>
      </div>
      {description && (
        <motion.p
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="max-w-xs border-l-2 pl-4 text-sm text-white/60"
          style={{ borderColor: accentColor }}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );

  return bare ? content : <SectionGlow>{content}</SectionGlow>;
}