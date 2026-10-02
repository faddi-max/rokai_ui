import { ArrowUpRight, Download } from "lucide-react";
import { motion } from "framer-motion";
import type { Guide } from "../data/guides.data";

interface GuideCardProps {
  guide: Guide;
  index: number;
}

export default function GuideCard({ guide, index }: GuideCardProps) {
  const { title, description, image, imageAlt, fileType, downloadHref, openHref } = guide;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group flex h-full w-full flex-col rounded-[10px] border border-white/10 bg-[#161616] p-2 transition-colors duration-300 hover:border-[#E63946]/50"
    >
      {/* Image */}
      <div className="relative aspect-[236/165] w-full overflow-hidden rounded-[6px] bg-[#0d0d0d]">
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <span className="absolute left-2.5 top-2.5 flex h-[26px] items-center rounded-[4px] bg-[#7A1B22] px-2 font-space-grotesk text-[10px] font-bold uppercase leading-none text-white">
          {fileType}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-3 pb-4 pt-4 sm:px-4">
        <h3 className="font-space-grotesk text-[20px] font-bold uppercase leading-[24px] text-[#E63946] sm:text-[22px]">
          {title}
        </h3>

        <p className="mt-3 max-w-[220px] font-space-grotesk text-[12px] font-normal leading-[18px] text-white/85">
          {description}
        </p>

        <span aria-hidden className="mt-4 block h-px w-10 bg-[#E63946]" />

        <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-5">
          <a
            href={downloadHref}
            download
            className="inline-flex h-[34px] items-center gap-2 rounded-[4px] bg-[#E63946] px-3.5 font-space-grotesk text-[11px] font-medium text-white transition-colors hover:bg-[#c9161e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Download Now
            <Download size={12} aria-hidden />
          </a>

          <a
            href={openHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-[34px] items-center gap-2 rounded-[4px] bg-white px-3.5 font-space-grotesk text-[11px] font-medium text-black transition-colors hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Open Now
            <ArrowUpRight size={12} aria-hidden />
          </a>
        </div>
      </div>
    </motion.article>
  );
}