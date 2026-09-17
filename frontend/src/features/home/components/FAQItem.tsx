import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";

type FAQItemProps = {
  faq: { question: string; answer: string };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
};

const FAQItem = ({ faq, index, isOpen, onToggle }: FAQItemProps) => {
  return (
    <div
      className={`border-b border-white/10 border-l-4 pl-6 pr-6 transition-colors duration-300 sm:pl-8 sm:pr-8 ${
        isOpen
          ? "border-l-[#E51B24] bg-gradient-to-r from-[#E51B24]/15 via-[#E51B24]/[0.06] to-transparent"
          : "border-l-transparent"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-6 py-5 text-left sm:py-6"
      >
        <div className="flex items-center gap-4 sm:gap-8">
          <span
            className={`w-6 shrink-0 font-space-grotesk text-[14px] font-bold transition-colors duration-300 sm:w-8 sm:text-[15px] ${
              isOpen ? "text-[#E51B24]" : "text-white/30"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className={`font-space-grotesk text-[16px] font-medium transition-colors duration-300 sm:text-[18px] ${
              isOpen ? "text-white" : "text-white/80"
            }`}
          >
            {faq.question}
          </span>
        </div>

        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 sm:h-9 sm:w-9 ${
            isOpen
              ? "border-[#E51B24] bg-[#E51B24] text-white"
              : "border-white/25 bg-transparent text-white"
          }`}
        >
          {isOpen ? (
            <Minus className="h-3.5 w-3.5" strokeWidth={2.5} />
          ) : (
            <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
          )}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-4 font-space-grotesk text-[14px] font-light leading-[22px] text-white/50 sm:pl-12 sm:pr-16 sm:text-[15px] sm:leading-[24px]">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQItem;