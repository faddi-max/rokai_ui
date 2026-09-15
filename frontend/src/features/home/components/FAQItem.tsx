import { Plus, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { FAQ } from "@/features/home/data/faqs";

interface FAQItemProps {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem = ({ faq, isOpen, onToggle }: FAQItemProps) => {
  return (
    <div>
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={onToggle}
        className="flex min-h-[74px] w-full items-center justify-between gap-6 bg-[#F6F6F6] px-5 py-5 text-left sm:min-h-[82px] sm:px-7 sm:py-4"
      >
        <span className="font-space-grotesk text-[21px] font-light leading-[28px] text-[#E51B24] sm:text-[30px] sm:leading-[38px]">
          {faq.question}
        </span>
        {isOpen ? (
          <X className="h-8 w-8 shrink-0 text-black sm:h-10 sm:w-10" strokeWidth={1.5} />
        ) : (
          <Plus className="h-8 w-8 shrink-0 text-black sm:h-10 sm:w-10" strokeWidth={1.5} />
        )}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && faq.answer && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="overflow-hidden border border-[#F6F6F6] border-t-0 bg-black"
          >
            <p className="px-5 py-5 font-space-grotesk text-[16px] font-light leading-[23px] text-white sm:px-7 sm:py-6 sm:text-[18px] sm:leading-[24px]">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQItem;
