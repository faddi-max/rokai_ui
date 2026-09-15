const trustStats = [
  { value: "250+", label: "Global Clients" },
  { value: "30+", label: "Countries Served" },
  { value: "10+ Years", label: "Industry Experience" },
  { value: "1000+", label: "Products Developed" },
  { value: "98%", label: "Client Satisfaction" },
];

const TrustBadges = () => {
  return (
    <section className="w-full bg-black pb-20 pt-20 sm:pb-24 sm:pt-24 lg:pb-28 lg:pt-28">
      <div className="mx-auto w-full max-w-[1250px] px-5 sm:px-8 lg:px-0">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <h2 className="font-space-grotesk uppercase">
            <span
              className="block font-bold leading-[1] text-white"
              style={{ fontSize: "clamp(38px, 3.9vw, 60px)" }}
            >
              TRUSTED BY COMBAT
            </span>
            <span
              className="block bg-clip-text font-light leading-[1] text-transparent"
              style={{
                fontSize: "clamp(30px, 3.5vw, 54px)",
                backgroundImage: "linear-gradient(90deg, #E51B24 0%, #690106 100%)",
              }}
            >
              SPORTS BUSINESS WORLDWIDE
            </span>
          </h2>

          <p className="max-w-[290px] font-space-grotesk text-[clamp(1rem,4.5vw,1.125rem)] font-light leading-[1.35] text-white lg:mt-2">
            Trusted by combat sports brands around the world for exceptional quality, reliable
            manufacturing, and professional service.
          </p>
        </div>

        <div className="mt-10 grid min-h-[102px] grid-cols-1 bg-[#F6F6F6] sm:mt-12 sm:grid-cols-2 lg:mt-14 lg:grid-cols-5">
          {trustStats.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex items-center px-8 py-6 lg:px-9 lg:py-0 ${
                index > 0 ? "border-t border-[#D0D0D0] sm:border-l sm:border-t-0" : ""
              }`}
            >
              <div>
                <p className="font-space-grotesk text-[clamp(1.5rem,7vw,1.75rem)] font-bold leading-[1.15] text-[#E51B24]">
                  {stat.value}
                </p>
                <p className="mt-1 font-space-grotesk text-[clamp(0.9375rem,4vw,1.0625rem)] font-normal leading-[1.3] text-black">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges
