import { GraduationCap, ShieldCheck, Star, Users } from "lucide-react";

type HeroBadge = {
  icon: "trustpilot" | "google" | "guarantee" | "academies" | "brands";
  value?: string;
  title: string;
  subtitle: string;
};

const heroBadges: HeroBadge[] = [
  {
    icon: "trustpilot",
    value: "4.8",
    title: "Based on 150+ reviews",
    subtitle: "Read our reviews on Trustpilot",
  },
  {
    icon: "google",
    value: "4.9",
    title: "Based on 180+ reviews",
    subtitle: "Read our reviews on Google",
  },
  {
    icon: "guarantee",
    value: "100%",
    title: "Satisfaction Guarantee",
    subtitle: "We stand behind our quality.",
  },
  {
    icon: "academies",
    title: "Academies Served",
    subtitle: "500+ Academies",
  },
  {
    icon: "brands",
    title: "BJJ Brand Served",
    subtitle: "300+ BJJ Brands",
  },
];

const HeroBadgeIcon = ({ type }: { type: HeroBadge["icon"] }) => {
  if (type === "trustpilot") {
    return (
      <span className="flex h-7 w-7 shrink-0 items-center justify-center bg-[#00B67A] text-white">
        <Star className="h-4 w-4 fill-current" />
      </span>
    );
  }

  if (type === "google") {
    return <span className="font-space-grotesk text-[28px] font-bold leading-none text-[#4285F4]">G</span>;
  }

  if (type === "guarantee") {
    return <Users className="h-7 w-7 shrink-0 text-[#E51B24]" />;
  }

  if (type === "academies") {
    return <GraduationCap className="h-7 w-7 shrink-0 text-[#E51B24]" />;
  }

  return <ShieldCheck className="h-7 w-7 shrink-0 text-[#E51B24]" />;
};

const HeroTrustBadges = () => {
  return (
    <section className="relative z-10 -mt-10 px-5 sm:-mt-12 sm:px-8 lg:-mt-30 lg:px-0">
      <div className="mx-auto grid w-full max-w-[1140px] grid-cols-1 bg-[#F4F4F4] sm:min-h-[150px] sm:grid-cols-2 lg:grid-cols-5">
        {heroBadges.map((badge, index) => (
          <div
            key={badge.title}
            className={`flex min-w-0 items-center gap-3 px-5 py-5 sm:px-7 lg:px-9 lg:py-0 ${
              index > 0 ? "border-t border-[#D8D8D8]" : ""
            } ${
              index % 2 === 1 ? "sm:border-l sm:border-t-0" : ""
            } ${
              index >= 2 ? "sm:border-t" : ""
            } ${index > 0 ? "lg:border-l lg:border-t-0" : ""}`}
          >
            <HeroBadgeIcon type={badge.icon} />
            <div className="min-w-0 flex-1">
              <div className="min-h-6">
                {badge.value ? (
                  <p className="font-space-grotesk text-[21px] font-normal leading-none text-black">
                    {badge.value}
                  </p>
                ) : (
                  <p className="font-space-grotesk text-[12px] font-bold leading-[14px] text-black">
                    {badge.title}
                  </p>
                )}
              </div>
              {badge.value && (badge.icon === "trustpilot" || badge.icon === "google") && (
                <div className="mt-1 flex items-center gap-px" aria-label="5 star rating">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className="h-[10px] w-[10px] fill-[#E51B24] text-[#E51B24]"
                      strokeWidth={1.5}
                    />
                  ))}
                </div>
              )}
              {badge.value && (
                <p className="mt-1 font-space-grotesk text-[12px] font-bold leading-[14px] text-black">
                  {badge.title}
                </p>
              )}
              <p className="mt-1 font-space-grotesk text-[10px] font-light leading-[12px] text-black/70">
                {badge.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroTrustBadges
