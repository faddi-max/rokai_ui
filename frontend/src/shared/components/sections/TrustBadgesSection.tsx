import { GraduationCap, ShieldCheck, Star, Users } from "lucide-react";

export type TrustStatItem = {
  type: "trustpilot" | "google" | "guarantee" | "academies" | "brands" | "custom";
  value?: string;
  title: string;
  subtitle: string;
};

const defaultStats: TrustStatItem[] = [
  {
    type: "trustpilot",
    value: "4.8",
    title: "Based on 150+ reviews",
    subtitle: "Read our reviews on Trustpilot",
  },
  {
    type: "google",
    value: "4.9",
    title: "Based on 180+ reviews",
    subtitle: "Read our reviews on Google",
  },
  {
    type: "guarantee",
    value: "100%",
    title: "Satisfaction Guarantee",
    subtitle: "We stand behind our quality.",
  },
  {
    type: "academies",
    title: "Academies Served",
    subtitle: "500+ Academies worldwide",
  },
  {
    type: "brands",
    title: "BJJ Brands Scaled",
    subtitle: "300+ Combat brands",
  },
];

const StatIcon = ({ type }: { type: TrustStatItem["type"] }) => {
  if (type === "trustpilot") {
    return (
      <span className="flex h-7 w-7 shrink-0 items-center justify-center bg-[#00B67A] text-white">
        <Star className="h-4 w-4 fill-current" />
      </span>
    );
  }
  if (type === "google") {
    return (
      <span className="font-space-grotesk text-[28px] font-bold leading-none text-[#4285F4]">
        G
      </span>
    );
  }
  if (type === "guarantee") {
    return <Users className="h-7 w-7 shrink-0 text-[#E51B24]" />;
  }
  if (type === "academies") {
    return <GraduationCap className="h-7 w-7 shrink-0 text-[#E51B24]" />;
  }
  return <ShieldCheck className="h-7 w-7 shrink-0 text-[#E51B24]" />;
};

interface TrustBadgesSectionProps {
  stats?: TrustStatItem[];
  floating?: boolean;
  className?: string;
}

export default function TrustBadgesSection({
  stats = defaultStats,
  floating = false,
  className = "",
}: TrustBadgesSectionProps) {
  return (
    <section
      className={`relative z-10 px-6 sm:px-10 lg:px-16 ${
        floating ? "-mt-10 sm:-mt-12 lg:-mt-14" : "py-12"
      } ${className}`}
    >
      <div className="mx-auto grid w-full max-w-[1250px] grid-cols-1 divide-y divide-[#D8D8D8] rounded-2xl bg-[#F4F4F4] shadow-xl sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-5 lg:divide-x">
        {stats.map((stat, index) => (
          <div
            key={stat.title}
            className={`flex min-w-0 items-center gap-3.5 px-6 py-5 lg:py-6 ${
              index % 2 === 1 ? "sm:border-l sm:border-[#D8D8D8]" : ""
            } ${index >= 2 ? "sm:border-t sm:border-[#D8D8D8] lg:border-t-0" : ""}`}
          >
            <StatIcon type={stat.type} />
            <div className="min-w-0 flex-1">
              {stat.value ? (
                <p className="font-space-grotesk text-xl font-bold leading-none text-black">
                  {stat.value}
                </p>
              ) : (
                <p className="font-space-grotesk text-xs font-bold leading-tight text-black">
                  {stat.title}
                </p>
              )}

              {stat.value && (stat.type === "trustpilot" || stat.type === "google") && (
                <div className="mt-1 flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, starIdx) => (
                    <Star
                      key={starIdx}
                      className="h-2.5 w-2.5 fill-[#E51B24] text-[#E51B24]"
                    />
                  ))}
                </div>
              )}

              {stat.value && (
                <p className="mt-1 font-space-grotesk text-xs font-bold leading-tight text-black">
                  {stat.title}
                </p>
              )}

              <p className="mt-0.5 font-space-grotesk text-[11px] font-light text-black/70">
                {stat.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
