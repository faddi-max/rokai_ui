const HEADLINE_RED = "#C0252F";

const DEFAULT_HEADING =
  "font-space-grotesk text-[38px] font-bold uppercase leading-[1.27] tracking-[-0.5px] sm:text-[46px] lg:text-[52px]";

interface SectionTitleProps {
  eyebrow: string;
  title: string;
  highlight: string;
  /** Colour of the short rule after the eyebrow. */
  lineColor?: string;
  /** CSS gradient for the highlight line. When set, it replaces the flat red. */
  highlightGradient?: string;
  /** Replaces the default heading typography (size / weight / leading). */
  headingClassName?: string;
  className?: string;
}

/** Eyebrow (text + short rule) followed by a two-line white / accent heading. */
export default function SectionTitle({
  eyebrow,
  title,
  highlight,
  lineColor = "#E63946",
  highlightGradient,
  headingClassName = DEFAULT_HEADING,
  className = "",
}: SectionTitleProps) {
  return (
    <div className={className}>
      <div className="flex items-center gap-[10px]">
        <span className="font-space-grotesk text-[16px] font-normal leading-[20px] text-[#b5b5b5]">
          {eyebrow}
        </span>
        <span aria-hidden className="h-px w-[52px]" style={{ backgroundColor: lineColor }} />
      </div>

      <h2 className={`mt-[21px] ${headingClassName}`}>
        <span className="block text-white">{title}</span>
        {highlightGradient ? (
          <span
            className="block w-fit"
            style={{
              backgroundImage: highlightGradient,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
            {highlight}
          </span>
        ) : (
          <span className="block" style={{ color: HEADLINE_RED }}>
            {highlight}
          </span>
        )}
      </h2>
    </div>
  );
}