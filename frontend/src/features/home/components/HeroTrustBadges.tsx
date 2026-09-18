import { GraduationCap } from "lucide-react";

type ReviewBadge = {
  kind: "review";
  icon: "trustpilot" | "google";
  rating: string;
  starColor: string;
  boldLine: string;
  subtitle: string;
};

type StatBadge = {
  kind: "stat";
  icon: "guarantee" | "academies" | "brand";
  topLine: string;
  caption: string;
  boldLine: string;
  subtitle: string;
};

type HeroBadge = ReviewBadge | StatBadge;

const heroBadges: HeroBadge[] = [
  {
    kind: "review",
    icon: "trustpilot",
    rating: "4.8",
    starColor: "#00B67A",
    boldLine: "Based on 150+ reviews",
    subtitle: "Read our reviews on Trustpilot",
  },
  {
    kind: "review",
    icon: "google",
    rating: "4.9",
    starColor: "#F5B400",
    boldLine: "Based on 180+ reviews",
    subtitle: "Read our reviews on Google",
  },
  {
    kind: "stat",
    icon: "guarantee",
    topLine: "100%",
    caption: "GUARANTEED",
    boldLine: "Satisfaction Guarantee",
    subtitle: "We stand behind our quality.",
  },
  {
    kind: "stat",
    icon: "academies",
    topLine: "Academies",
    caption: "SERVED",
    boldLine: "500+ Academies",
    subtitle: "We stand behind our quality.",
  },
  {
    kind: "stat",
    icon: "brand",
    topLine: "BJJ Brand",
    caption: "SERVED",
    boldLine: "300+ BJJ Brands",
    subtitle: "Trusted B2B Manufacturing",
  },
];

const TrustpilotIcon = () => (
  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[9px] bg-[#00B67A]">
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="white">
      <path d="M12 1.5l2.9 8.9h9.4l-7.6 5.5 2.9 8.9L12 19.3l-7.6 5.5 2.9-8.9L-.3 10.4h9.4z" />
    </svg>
  </span>
);

const GoogleIcon = () => (
  <span className="flex h-11 w-11 shrink-0 items-center justify-center">
    <svg viewBox="0 0 48 48" className="h-9 w-9">
      <path
        fill="#4285F4"
        d="M45.1 24.5c0-1.6-.1-3.1-.4-4.6H24v9.1h11.9c-.5 2.8-2.1 5.1-4.4 6.7v5.5h7.1c4.2-3.8 6.5-9.5 6.5-16.7z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.9 0 10.9-2 14.5-5.3l-7.1-5.5c-2 1.3-4.5 2.1-7.4 2.1-5.7 0-10.5-3.8-12.2-9H4.5v5.7C8.1 41.1 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.8 28.3c-.4-1.3-.7-2.7-.7-4.3s.2-3 .7-4.3v-5.7H4.5C3 16.9 2 20.3 2 24s1 7.1 2.5 10l7.3-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 10.6c3.2 0 6.1 1.1 8.4 3.3l6.3-6.3C34.9 4.1 29.9 2 24 2 15.4 2 8.1 6.9 4.5 14l7.3 5.7c1.7-5.2 6.5-9.1 12.2-9.1z"
      />
    </svg>
  </span>
);

const GuaranteeIcon = () => (
  <span className="flex h-11 w-11 shrink-0 items-center justify-center">
    <svg viewBox="0 0 40 40" className="h-9 w-9" fill="#E51B24">
      <path d="M11 8h14a3 3 0 013 3v7a3 3 0 01-3 3H17l-4 4v-4h-2a3 3 0 01-3-3v-7a3 3 0 013-3z" />
      <circle cx="13" cy="30" r="2.4" />
      <path d="M13 34c-3 0-5.5 1.7-6.4 4.1-.3.9.4 1.9 1.4 1.9h10c1 0 1.7-1 1.4-1.9C18.5 35.7 16 34 13 34z" />
      <circle cx="27" cy="30" r="2.4" />
      <path d="M27 34c-3 0-5.5 1.7-6.4 4.1-.3.9.4 1.9 1.4 1.9h10c1 0 1.7-1 1.4-1.9C32.5 35.7 30 34 27 34z" />
    </svg>
  </span>
);

const BrandIcon = () => (
  <span className="flex h-11 w-11 shrink-0 items-center justify-center">
    <svg viewBox="0 0 40 40" className="h-9 w-9" fill="#E51B24">
      <rect x="4" y="10" width="20" height="15" rx="2.5" />
      <rect x="9" y="16" width="10" height="2.6" rx="1.3" fill="white" />
      <rect x="13" y="25" width="2" height="10" />
      <rect x="8" y="34.5" width="12" height="2" rx="1" />
    </svg>
  </span>
);

const HeroBadgeIcon = ({ badge }: { badge: HeroBadge }) => {
  if (badge.icon === "trustpilot") return <TrustpilotIcon />;
  if (badge.icon === "google") return <GoogleIcon />;
  if (badge.icon === "guarantee") return <GuaranteeIcon />;
  if (badge.icon === "brand") return <BrandIcon />;
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center">
      <GraduationCap className="h-9 w-9 text-[#E51B24]" strokeWidth={2} />
    </span>
  );
};

const StarRow = ({ color }: { color: string }) => (
  <div className="mt-1 flex items-center gap-[2px]" aria-hidden="true">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} viewBox="0 0 20 20" className="h-[11px] w-[11px]" fill={color}>
        <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.49L10 13.97l-4.94 2.73.94-5.49-4-3.9 5.53-.8z" />
      </svg>
    ))}
  </div>
);

const HeroTrustBadges = () => {
  return (
    <section className="relative z-10 -mt-10 px-5 sm:-mt-12 sm:px-8 lg:-mt-16 lg:px-0">
      <div className="mx-auto grid w-full max-w-[1140px] grid-cols-1 rounded-2xl bg-white shadow-[0_20px_50px_-15px_rgba(0,0,0,0.25)] sm:grid-cols-2 lg:grid-cols-5">
        {heroBadges.map((badge, index) => (
          <div
            key={badge.boldLine}
            className={`flex min-w-0 items-start gap-3 px-6 py-7 ${
              index > 0 ? "border-t border-[#EBEBEB] sm:border-t-0" : ""
            } ${index % 2 === 1 ? "sm:border-l" : ""} ${
              index >= 2 ? "sm:border-t sm:border-[#EBEBEB] lg:border-t-0" : ""
            } ${index > 0 ? "lg:border-l lg:border-[#EBEBEB]" : ""}`}
          >
            <HeroBadgeIcon badge={badge} />
            <div className="min-w-0 flex-1 pt-0.5">
              {badge.kind === "review" ? (
                <>
                  <p className="font-space-grotesk text-[19px] font-semibold leading-none text-[#1A1A1A]">
                    {badge.rating}
                  </p>
                  <StarRow color={badge.starColor} />
                </>
              ) : (
                <>
                  <p className="font-space-grotesk text-[17px] font-semibold leading-tight text-[#1A1A1A]">
                    {badge.topLine}
                  </p>
                  <p className="font-space-grotesk text-[11px] font-bold leading-tight tracking-wide text-[#1A1A1A]">
                    {badge.caption}
                  </p>
                </>
              )}
              <p className="mt-2.5 font-space-grotesk text-[12px] font-bold leading-[15px] text-[#1A1A1A]">
                {badge.boldLine}
              </p>
              <p className="mt-0.5 font-space-grotesk text-[11px] font-normal leading-[14px] text-[#9B9B9B]">
                {badge.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroTrustBadges;