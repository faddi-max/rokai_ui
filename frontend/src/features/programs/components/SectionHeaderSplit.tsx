type SectionHeaderSplitProps = {
  eyebrow: string;
  title: string;
  /** Second title line, rendered in red. */
  highlight: string;
  description: string;
  className?: string;
};


export default function SectionHeaderSplit({
  eyebrow,
  title,
  highlight,
  description,
  className = "",
}: SectionHeaderSplitProps) {
  return (
    <header
      className={`mx-auto flex w-full max-w-[1308px] flex-col gap-6 lg:flex-row lg:items-end lg:justify-between ${className}`}
    >
      <div>
        <p className="flex items-center gap-3 text-[12px] leading-none text-white/60">
          {eyebrow}
          <span aria-hidden className="h-px w-10 bg-[#E51B24]" />
        </p>
        <h2 className="mt-4 text-[36px] font-bold uppercase leading-[1.05] tracking-[-0.01em] text-white sm:text-[44px] lg:text-[52px]">
          {title}
          <span className="block text-[#E51B24]">{highlight}</span>
        </h2>
      </div>

      <p className="max-w-[300px] border-l border-white/20 pl-4 text-[13px] leading-[1.5] text-white/70 lg:mb-2">
        {description}
      </p>
    </header>
  );
}
