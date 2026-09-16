interface SectionEyebrowProps {
  label: string;
  fullWidth?: boolean;
  textClassName?: string;
  lineClassName?: string;
}

const SectionEyebrow = ({
  label,
  fullWidth = false,
  textClassName = "text-white",
  lineClassName = "border-[#E51B24]",
}: SectionEyebrowProps) => {
  return (
    <div className="flex min-w-0 items-center gap-2 sm:gap-4">
      <span
        className={`min-w-0 font-space-grotesk text-[18px] font-light leading-[22px] sm:text-[25px] sm:leading-[25px] ${textClassName}`}
      >
        {label}
      </span>
      <span
        className={`h-0 shrink-0 border-t-2 ${lineClassName} ${
          fullWidth ? "flex-1" : "w-8 sm:w-[clamp(32px,4vw,61px)]"
        }`}
      />
    </div>
  );
};

export default SectionEyebrow;
