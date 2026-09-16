import type { SectionHeaderProps } from "@/shared/types/sections";
import SectionEyebrow from "@/shared/components/ui/SectionEyebrow";

export default function SectionHeader({
  eyebrow,
  titleTop,
  titleBottom,
  description,
  actions,
  align = "between",
}: SectionHeaderProps) {
  return (
    <div
      className={`mb-10 flex flex-col gap-6 lg:mb-14 ${
        align === "between"
          ? "lg:flex-row lg:items-end lg:justify-between"
          : align === "center"
          ? "items-center text-center mx-auto max-w-3xl"
          : "items-start"
      }`}
    >
      <div className="flex flex-col gap-2">
        {eyebrow && <SectionEyebrow label={eyebrow} />}

        <h2 className="font-space-grotesk uppercase">
          <span
            className="block font-bold text-white"
            style={{
              fontSize: "clamp(32px, 3.4vw + 14px, 68px)",
              lineHeight: "clamp(34px, 3.3vw + 12px, 68px)",
              letterSpacing: "0%",
            }}
          >
            {titleTop}
          </span>
          <span
            className="block bg-clip-text font-light text-transparent"
            style={{
              fontSize: "clamp(28px, 2.9vw + 12px, 60px)",
              lineHeight: "clamp(30px, 2.5vw + 10px, 54px)",
              letterSpacing: "0%",
              backgroundImage:
                "linear-gradient(90deg, #E51B24 0%, #690106 100%)",
            }}
          >
            {titleBottom}
          </span>
        </h2>
      </div>

      {actions && <div className="hidden lg:flex items-center gap-4">{actions}</div>}

      {description && (
        <p
          className={`font-space-grotesk font-light text-white/80 ${
            align === "between"
              ? "max-w-md lg:text-left text-base sm:text-lg"
              : "text-base sm:text-lg"
          }`}
          style={{
            fontSize: "clamp(15px, 0.4vw + 13px, 19px)",
            lineHeight: "clamp(21px, 0.5vw + 16px, 26px)",
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
