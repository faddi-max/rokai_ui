import { motion } from "framer-motion";
import { Step } from "@/features/programs/data/steps.data";

type StepCardProps = Omit<Step, "id"> & {
  /** 1-based position; rendered as "01", "02"… */
  index: number;
  /** Top-right ↗ icon. Off for cards that aren't actions (e.g. benefits). */
  showArrow?: boolean;
  className?: string;
};

function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export default function StepCard({
  index,
  title,
  description,
  accent = true,
  showArrow = true,
  href,
  className = "",
}: StepCardProps) {
  const number = String(index).padStart(2, "0");

  const body = (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-space-grotesk text-[13px] font-bold leading-none text-white/60 transition-transform duration-300 group-hover:scale-110 group-hover:text-white">
            {number}
          </span>
          <span
            aria-hidden
            className={`h-px w-8 transition-all duration-300 group-hover:w-12 group-hover:bg-[#E51B24] ${
              accent ? "bg-[#E51B24]" : "bg-white/30"
            }`}
          />
        </div>
        {showArrow && (
          <ArrowUpRight
            className={`transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:scale-110 group-hover:text-[#E51B24] ${
              accent ? "text-white" : "text-white/60"
            }`}
          />
        )}
      </div>

      <div className="mt-10 sm:mt-auto">
        <h3 className="font-space-grotesk text-[22px] font-bold leading-[1.15] tracking-[-0.01em] text-white transition-colors duration-300 group-hover:text-[#E51B24] sm:text-[26px]">
          {title}
        </h3>
        <p className="mt-2 max-w-[272px] font-space-grotesk text-[13px] leading-[1.4] text-white/70 transition-colors duration-300 group-hover:text-white/90">
          {description}
        </p>
      </div>
    </>
  );

  const baseClassName = `group flex min-h-[241px] w-full max-w-[360.16px] flex-col rounded-[8.03px] border border-white/10 bg-[#111111] px-7 py-8 shadow-[0px_0px_9.37px_4.02px_#E51B2447] transition-all duration-300 sm:px-11 sm:py-11 lg:h-[241px] ${className}`;

  const motionProps = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.5, delay: (index - 1) * 0.12, ease: [0.22, 1, 0.36, 1] },
    whileHover: {
      y: -8,
      scale: 1.02,
      borderColor: "rgba(229, 27, 36, 0.5)",
      boxShadow: "0px 12px 28px 6px rgba(229, 27, 36, 0.38)",
    },
  };

  return href ? (
    <motion.a
      href={href}
      {...motionProps}
      className={`${baseClassName} focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E51B24]`}
    >
      {body}
    </motion.a>
  ) : (
    <motion.article {...motionProps} className={baseClassName}>
      {body}
    </motion.article>
  );
}