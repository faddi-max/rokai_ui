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
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: "easeOut" }}
      className={`border-b border-white/10 border-l-4 pl-6 pr-6 transition-all duration-300 sm:pl-8 sm:pr-8 ${
        isOpen
          ? "border-l-[#E51B24] bg-gradient-to-r from-[#E51B24]/15 via-[#E51B24]/[0.06] to-transparent shadow-[0_4px_20px_rgba(229,27,36,0.1)]"
          : "border-l-transparent hover:border-l-white/30 hover:bg-white/[0.02]"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="group flex w-full items-center justify-between gap-6 py-5 text-left sm:py-6"
      >
        <div className="flex items-center gap-4 sm:gap-8">
          <span
            className={`w-6 shrink-0 font-space-grotesk text-[14px] font-bold transition-all duration-300 sm:w-8 sm:text-[15px] ${
              isOpen ? "scale-110 text-[#E51B24]" : "text-white/30 group-hover:text-white/60"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className={`font-space-grotesk text-[16px] font-medium transition-all duration-300 group-hover:translate-x-1 sm:text-[18px] ${
              isOpen ? "text-white" : "text-white/80 group-hover:text-white"
            }`}
          >
            {faq.question}
          </span>
        </div>

        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 sm:h-9 sm:w-9 ${
            isOpen
              ? "border-[#E51B24] bg-[#E51B24] text-white shadow-[0_0_12px_rgba(229,27,36,0.5)]"
              : "border-white/25 bg-transparent text-white group-hover:border-white/50 group-hover:bg-white/10"
          }`}
        >
          {isOpen ? (
            <Minus className="h-3.5 w-3.5" strokeWidth={2.5} />
          ) : (
            <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
          )}
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-4 font-space-grotesk text-[14px] font-light leading-[22px] text-white/60 sm:pl-12 sm:pr-16 sm:text-[15px] sm:leading-[24px]">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FAQItem;