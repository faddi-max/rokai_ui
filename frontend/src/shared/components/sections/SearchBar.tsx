import { useState, type FormEvent } from "react";
import { Search, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export interface ResourceSearchBarProps {
  placeholder?: string;
  buttonText?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export default function ResourceSearchBar({
  placeholder = "Search guides, tools, reports and templates...",
  buttonText = "Search",
  onSearch,
  className = "",
}: ResourceSearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch?.(query.trim());
  };

  return (
   
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative mx-auto w-full max-w-[1180px] px-5  -mt-10 sm:px-8 lg:px-0"
      >
        <form
          onSubmit={handleSubmit}
          className="flex h-[60px] w-full items-center gap-3 rounded-[14px] border border-[#FFFFFF1A] bg-white pl-5 pr-3 shadow-[0px_22px_50px_0px_#00000088] sm:pl-8 sm:pr-[23px] lg:h-[74px]"
        >
          <Search size={16} className="shrink-0 text-[#E63946]" aria-hidden />

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="h-full min-w-0 flex-1 bg-transparent font-space-grotesk text-[13px] text-black placeholder:text-black/40 focus:outline-none"
          />

          <button
            type="submit"
            className="flex h-[37px] w-[106px] shrink-0 items-center justify-center gap-[10px] rounded-[6px] bg-[#E63946] px-[13px] py-1 font-space-grotesk text-[13px] font-medium text-white transition-colors hover:bg-[#d12f3b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E63946]"
          >
            {buttonText}
            <ArrowUpRight size={14} aria-hidden />
          </button>
        </form>
      </motion.div>
    
  );
}