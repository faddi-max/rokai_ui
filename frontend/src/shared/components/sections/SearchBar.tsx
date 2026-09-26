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
    <section className={`relative w-full -top-14   pt-2  ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto w-full max-w-[1140px] px-5 sm:px-8 lg:px-0"
      >
        <form
          onSubmit={handleSubmit}
          className="flex h-[52px] w-full items-center gap-3 rounded-full bg-white pl-6 pr-2 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.45)] sm:h-[56px]"
        >
          <Search size={18} className="shrink-0 text-black/40" aria-hidden />

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="h-full min-w-0 flex-1 bg-transparent font-space-grotesk text-[13px] text-black placeholder:text-black/40 focus:outline-none sm:text-sm"
          />

          <button
            type="submit"
            className="flex h-[40px] shrink-0 items-center gap-2 rounded-full bg-[#E51B24] px-5 font-space-grotesk text-[13px] font-medium text-white transition hover:bg-[#c9161e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E51B24] sm:h-[44px] sm:px-6 sm:text-sm"
          >
            {buttonText}
            <ArrowUpRight size={14} aria-hidden />
          </button>
        </form>
      </motion.div>
    </section>
  );
}