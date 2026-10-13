interface SectionEyebrowProps {
  label: string;
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  textClassName?: string;
  lineClassName?: string;
}

const SectionEyebrow = ({
  label,
  fullWidth = false,
  size = "md",
  className = "",
  textClassName = "text-white",
  lineClassName = "border-[#E51B24]",
}: SectionEyebrowProps) => {
  const sizeClass =
    size === "sm"
      ? "text-[14px] leading-[18px] sm:text-[16px] sm:leading-[20px]"
      : "text-[18px] leading-[22px] sm:text-[25px] sm:leading-[25px]";

  return (
    <div className={`flex min-w-0 items-center gap-2 sm:gap-4 ${className}`}>
      <span className={`min-w-0 font-space-grotesk font-light ${sizeClass} ${textClassName}`}>
        {label}
      </span>
      <span
        className={`h-0 shrink-0 border-t-2 ${lineClassName} ${fullWidth ? "flex-1" : "w-8 sm:w-[clamp(32px,4vw,61px)]"}`}
      />
    </div>
  );
};

export default SectionEyebrow;
