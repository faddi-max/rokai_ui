import { useParams, Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import HeroSection from "@/shared/components/sections/HeroSection";
import { useAsyncData } from "@/shared/hooks/useAsyncData";
import { servicesService, type ServiceItem } from "@/shared/api/services/servicesService";
import { DataLoader, PageLoader } from "@/shared/components/feedback";
import WhyRokaiSection from "@/shared/components/sections/WhyRokaiSection";
import FAQSection from "@/features/home/components/FAQSection";
import TrustBadges from "@/features/home/components/TrustBadges";
import HowWeWorkSection from "@/features/categories/data/HowWeWorkSection";

export default function ServicesPage() {
  const params = useParams<{ slug?: string }>();
  const slug = params.slug;

  const { data, loading, error, refetch } = useAsyncData(
    () => servicesService.getServicesPageData(slug),
    { deps: [slug] }
  );

  return (
    <DataLoader
      loading={loading}
      error={error}
      data={data}
      skeleton={<PageLoader message="LOADING ROKAI SERVICES..." />}
      onRetry={refetch}
    >
      {(pageData) => {
        const { hero, service, allServices } = pageData;

        return (
          <div className="w-full bg-black text-white">
            {/* Dynamic Hero Section */}
            <HeroSection {...hero} />

            {/* Services Overview Grid */}
            <section className="relative overflow-hidden bg-black py-16 sm:py-20 lg:py-24">
              <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-[68px]">
                <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
                  <div>
                    <span className="font-space-grotesk text-xs uppercase tracking-widest text-[#E51B24]">
                      Manufacturing Capabilities
                    </span>
                    <h2 className="mt-2 font-space-grotesk text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                      ROKAI Production Services
                    </h2>
                  </div>
                  <p className="max-w-md font-space-grotesk text-sm font-light text-white/70 sm:text-base">
                    From bespoke product engineering and private labeling to scalable OEM production and global logistics.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {allServices.map((item: ServiceItem) => {
                    const isCurrent = service?.slug === item.slug;

                    return (
                      <Link
                        key={item.id}
                        to={item.href}
                        className={`group relative flex flex-col overflow-hidden rounded-xl border bg-[#130E0F] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#E51B24]/50 hover:shadow-[0_12px_30px_rgba(229,27,36,0.2)] ${
                          isCurrent
                            ? "border-[#E51B24] ring-1 ring-[#E51B24]"
                            : "border-white/10"
                        }`}
                      >
                        <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/60">
                          <img
                            src={item.image}
                            alt={item.imageAlt || item.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#130E0F] via-transparent to-transparent" />
                        </div>

                        <div className="flex flex-1 flex-col justify-between p-5">
                          <div>
                            <h3 className="font-space-grotesk text-lg font-bold text-white transition-colors group-hover:text-[#E51B24]">
                              {item.title}
                            </h3>
                            <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-white/65">
                              {item.description}
                            </p>
                          </div>

                          <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-[#E51B24]">
                            <span>Explore Service</span>
                            <ArrowUpRight
                              size={14}
                              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Supporting Sections */}
            <HowWeWorkSection />
            <WhyRokaiSection />
            <FAQSection />
            <TrustBadges />
          </div>
        );
      }}
    </DataLoader>
  );
}
