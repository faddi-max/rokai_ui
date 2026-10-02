import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionGlow from "@/shared/components/layout/SectionGlow";
import SectionTitle from "@/features/programs/ambassador-program/components/SectionTitle";
import GuideCard from "./GuideCard";
import GuidesPagination from "./GuidesPagination";
import { guides as defaultGuides, GUIDES_PER_PAGE, type Guide } from "../data/guides.data";

interface DownloadGuidesSectionProps {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  description?: string;
  guides?: Guide[];
}

const HEADING_CLASS =
  "font-space-grotesk font-bold uppercase tracking-normal text-[34px] leading-[40px] sm:text-[44px] sm:leading-[50px] lg:text-[52px] lg:leading-[56px]";

export default function DownloadGuidesSection({
  eyebrow = "Resource Center",
  title = "DOWNLOAD OUR",
  highlight = "GUIDES",
  description = "Discover a complete range of BJJ apparel, jiu jitsu gear, and custom gear BJJ built for athletes and brands.",
  guides = defaultGuides,
}: DownloadGuidesSectionProps) {
  const [page, setPage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  const totalPages = Math.max(1, Math.ceil(guides.length / GUIDES_PER_PAGE));

  const visibleGuides = useMemo(
    () => guides.slice((page - 1) * GUIDES_PER_PAGE, page * GUIDES_PER_PAGE),
    [guides, page]
  );

  // Bring the grid back into view when the page changes (skip initial mount)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [page]);

  return (
    <SectionGlow className="relative overflow-hidden">
      {/* Red glow rising from the bottom edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[420px] bg-[radial-gradient(ellipse_60%_100%_at_50%_100%,rgba(230,57,70,0.2),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-[1440px] px-5 pb-20 pt-14 sm:px-8 md:px-10 lg:px-[49px] lg:pb-[100px] lg:pt-[56px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between"
        >
          <SectionTitle
            eyebrow={eyebrow}
            title={title}
            highlight={highlight}
            lineColor="#E63946"
            highlightGradient="linear-gradient(90deg, #E63946 0%, #C0252F 100%)"
            headingClassName={HEADING_CLASS}
          />

          <p className="max-w-[300px] font-space-grotesk text-[12px] font-normal border-l-2 border-red-500 p-2 leading-[18px] text-white/70 sm:text-[13px] lg:mt-[8px] lg:leading-[19px]">
            {description}
          </p>
        </motion.div>

        {/* Grid */}
        <div ref={gridRef} className="mx-auto mt-10 max-w-[1178px] scroll-mt-28 lg:mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {visibleGuides.map((guide, i) => (
                <GuideCard key={guide.id} guide={guide} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          <GuidesPagination page={page} totalPages={totalPages} onChange={setPage} />
        </div>
      </div>
    </SectionGlow>
  );
}