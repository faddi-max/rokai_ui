import { ChevronLeft, ChevronRight } from "lucide-react";

interface GuidesPaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

const arrowClass =
  "flex size-7 items-center justify-center text-white/70 transition-colors hover:text-white disabled:pointer-events-none disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-[#E63946]";

export default function GuidesPagination({ page, totalPages, onChange }: GuidesPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Guides pagination" className="mt-12 flex items-center justify-center gap-3 lg:mt-14">
      <button
        type="button"
        aria-label="Previous page"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className={arrowClass}
      >
        <ChevronLeft size={14} />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => {
        const isActive = n === page;
        return (
          <button
            key={n}
            type="button"
            aria-label={`Page ${n}`}
            aria-current={isActive ? "page" : undefined}
            onClick={() => onChange(n)}
            className={`flex size-[22px] items-center justify-center rounded-full font-space-grotesk text-[10px] font-bold transition-colors duration-200 ${
              isActive ? "bg-[#E63946] text-white" : "text-white/80 hover:text-[#E63946]"
            }`}
          >
            {n}
          </button>
        );
      })}

      <button
        type="button"
        aria-label="Next page"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className={arrowClass}
      >
        <ChevronRight size={14} />
      </button>
    </nav>
  );
}