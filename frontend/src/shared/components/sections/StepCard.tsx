import { motion } from "framer-motion";
import { Step } from "@/features/programs/data/steps.data";

type StepCardProps = Omit<Step, "id" | "description"> & {
  /** 1-based position; rendered as "01", "02"… */
  index: number;
  /** "step" = title + description (default). "benefit" = title + bullets + footer. */
  variant?: "step" | "benefit";
  /** Step variant: short paragraph under the title. */
  description?: string;
  /** Benefit variant: bullet list under the title. */
  bullets?: string[];
  /** Benefit variant: red highlight line pinned to the bottom of the card. */
  footer?: string;
  /** Top-right ↗ icon. Off for cards that aren't actions. */
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
  variant = "step",
  title,
  description,
  bullets,
  footer,
  accent = true,
  showArrow = true,
  href,
  className = "",
}: StepCardProps) {
  const number = String(index).padStart(2, "0");
  const isBenefit = variant === "benefit";

  const body = (
    <>
      {/* Header: 01 ── ↗ (shared by both variants) */}
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

      {isBenefit ? (
        <>
          <h3 className="mt-10 font-space-grotesk text-[22px] font-medium uppercase leading-[1.15] text-white transition-colors duration-300 group-hover:text-[#E51B24]">
            {title}
          </h3>

          {bullets && bullets.length > 0 && (
            <ul className="mt-6 flex flex-col">
              {bullets.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-[10px] font-space-grotesk text-[13px] leading-[19px] text-white/70 transition-colors duration-300 group-hover:text-white/90"
                >
                  <span
                    aria-hidden
                    className="mt-[8px] size-[3px] shrink-0 rounded-full bg-white/60"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}

          {footer && (
            <p className="mt-auto border-t border-white/10 pt-[26px] text-center font-space-grotesk text-[12px] leading-[16px] text-[#E63946]">
              {footer}
            </p>
          )}
        </>
      ) : (
        <div className="mt-10 sm:mt-auto">
          <h3 className="font-space-grotesk text-[22px] font-bold leading-[1.15] tracking-[-0.01em] text-white transition-colors duration-300 group-hover:text-[#E51B24] sm:text-[26px]">
            {title}
          </h3>
          {description && (
            <p className="mt-2 max-w-[272px] font-space-grotesk text-[13px] leading-[1.4] text-white/70 transition-colors duration-300 group-hover:text-white/90">
              {description}
            </p>
          )}
        </div>
      )}
    </>
  );

  const sizeClassName = isBenefit
    ? "min-h-[320px] px-7 pb-7 pt-8 sm:px-9 lg:h-[320px]"
    : "min-h-[241px] px-7 py-8 sm:px-11 sm:py-11 lg:h-[241px]";

  const baseClassName = `group flex w-full max-w-[360.16px] flex-col rounded-[8.03px] border border-white/10 bg-[#111111] shadow-[0px_0px_9.37px_4.02px_#E51B2447] transition-all duration-300 ${sizeClassName} ${className}`;

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