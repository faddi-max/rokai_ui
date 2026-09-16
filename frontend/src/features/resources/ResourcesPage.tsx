import { useState } from "react";
import {
  Download,
  FileText,
  Layers,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import SectionEyebrow from "@/shared/components/ui/SectionEyebrow";
import Button from "@/shared/components/ui/Button";
import FAQSection from "@/shared/components/sections/FAQSection";
import TrustBadgesSection from "@/shared/components/sections/TrustBadgesSection";
import CTASection from "@/shared/components/sections/CTASection";
import { useAsyncData } from "@/shared/hooks/useAsyncData";
import { resourcesService } from "@/shared/api/services/resourcesService";
import { DataLoader, PageLoader } from "@/shared/components/feedback";

export default function ResourcesPage() {
  const { data, loading, error, refetch } = useAsyncData(() =>
    resourcesService.getResourcesPageData()
  );

  const [unitSystem, setUnitSystem] = useState<"imperial" | "metric">("imperial");
  const [downloadedId, setDownloadedId] = useState<string | null>(null);

  const handleDownload = (id: string, title: string) => {
    setDownloadedId(id);
    setTimeout(() => setDownloadedId(null), 3500);
    console.log(`Downloading resource: ${title}`);
  };

  return (
    <DataLoader
      loading={loading}
      error={error}
      data={data}
      skeleton={<PageLoader message="LOADING SPEC SHEETS & SIZING DATA..." />}
      onRetry={refetch}
    >
      {(pageData) => (
        <div className="bg-black text-white selection:bg-[#E51B24] selection:text-white">
          {/* Hero Header */}
          <section className="relative overflow-hidden bg-black pb-12 pt-8 lg:pb-16 lg:pt-14">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(229,27,36,0.18),transparent_70%)]" />

            <div className="relative mx-auto max-w-[1512px] px-6 text-center sm:px-10 lg:px-16">
              <SectionEyebrow label="TECHNICAL DOWNLOADS & SIZING MATRICES" />

              <h1 className="mt-6 font-space-grotesk text-[clamp(2.5rem,6vw,4.5rem)] font-bold uppercase leading-[1.05] text-white">
                PRODUCTION RESOURCES &
                <br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #E51B24 0%, #690106 100%)",
                  }}
                >
                  TECHNICAL ASSETS
                </span>
              </h1>

              <div className="mx-auto mt-4 h-[3px] w-20 bg-white" />

              <p className="mx-auto mt-6 max-w-2xl font-space-grotesk text-base leading-relaxed text-white/80 sm:text-lg">
                Download our official 2026 apparel catalog, vector tech pack starter
                files, IBJJF compliance checklists, and academy sizing guides.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button
                  href="#downloads"
                  variant="outline"
                  icon={Download}
                  weight="medium"
                >
                  Browse Downloads
                </Button>
                <Button
                  href="#sizing-matrix"
                  variant="primary"
                  icon={Layers}
                  weight="medium"
                >
                  View Gi Sizing Chart
                </Button>
              </div>
            </div>
          </section>

          {/* Floating Trust Badges */}
          <TrustBadgesSection floating />

          {/* Downloadable Assets Grid */}
          <section id="downloads" className="py-16 lg:py-24">
            <div className="mx-auto max-w-[1250px] px-6 sm:px-10 lg:px-0">
              <div className="mb-12 text-center sm:text-left">
                <SectionEyebrow label="PRODUCTION TOOLKIT" />
                <h2 className="mt-3 font-space-grotesk text-3xl sm:text-4xl font-bold uppercase text-white">
                  DOWNLOAD SPEC SHEETS & TEMPLATES
                </h2>
                <p className="mt-2 max-w-2xl font-space-grotesk text-sm sm:text-base text-white/70">
                  Zero fluff. Real technical assets used by professional fightwear designers and gym owners.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {pageData.resources.map((res) => (
                  <div
                    key={res.id}
                    className="group flex flex-col justify-between rounded-2xl border border-white/15 bg-[#121212] p-6 transition-all duration-300 hover:border-[#E51B24] hover:bg-[#161616]"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-space-grotesk text-xs uppercase tracking-wider text-[#E51B24]">
                          {res.category}
                        </span>
                        {res.badge && (
                          <span className="rounded bg-white/10 px-2.5 py-0.5 font-space-grotesk text-[10px] font-bold text-white">
                            {res.badge}
                          </span>
                        )}
                      </div>

                      <div className="mt-4 flex items-start gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-white group-hover:bg-[#E51B24] group-hover:text-white transition-colors">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-space-grotesk text-lg font-bold leading-snug text-white group-hover:text-[#E51B24] transition-colors">
                            {res.title}
                          </h3>
                          <p className="mt-1 font-space-grotesk text-xs text-white/50">
                            {res.format} • {res.fileSize}
                          </p>
                        </div>
                      </div>

                      <p className="mt-4 font-space-grotesk text-sm leading-relaxed text-white/70">
                        {res.description}
                      </p>
                    </div>

                    <div className="mt-6 border-t border-white/10 pt-4">
                      <button
                        onClick={() => handleDownload(res.id, res.title)}
                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/20 bg-black/60 py-2.5 font-space-grotesk text-xs font-bold uppercase tracking-wider text-white transition-colors hover:border-[#E51B24] hover:bg-[#E51B24]"
                      >
                        {downloadedId === res.id ? (
                          <>
                            <CheckCircle className="h-4 w-4 text-white" />
                            Downloaded!
                          </>
                        ) : (
                          <>
                            <Download className="h-4 w-4" />
                            Download Asset
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Interactive Sizing Chart Matrix */}
          <section id="sizing-matrix" className="border-t border-white/10 bg-[#0d0d0d] py-16 lg:py-24">
            <div className="mx-auto max-w-[1250px] px-6 sm:px-10 lg:px-0">
              <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
                <div>
                  <SectionEyebrow label="GARMENT SPECIFICATIONS" />
                  <h2 className="mt-3 font-space-grotesk text-3xl sm:text-4xl font-bold uppercase text-white">
                    OFFICIAL BJJ GI SIZING MATRIX
                  </h2>
                  <p className="mt-2 max-w-2xl font-space-grotesk text-sm sm:text-base text-white/70">
                    Pre-shrunk sanforized cotton measurements. Designed for optimal IBJJF sleeve span and jacket skirt overlap.
                  </p>
                </div>

                {/* Unit Toggle */}
                <div className="flex items-center rounded-lg border border-white/20 bg-black p-1">
                  <button
                    onClick={() => setUnitSystem("imperial")}
                    className={`rounded-md px-4 py-1.5 font-space-grotesk text-xs font-bold uppercase transition-all ${
                      unitSystem === "imperial"
                        ? "bg-[#E51B24] text-white"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    Imperial (lbs / ft)
                  </button>
                  <button
                    onClick={() => setUnitSystem("metric")}
                    className={`rounded-md px-4 py-1.5 font-space-grotesk text-xs font-bold uppercase transition-all ${
                      unitSystem === "metric"
                        ? "bg-[#E51B24] text-white"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    Metric (kg / cm)
                  </button>
                </div>
              </div>

              {/* Sizing Table */}
              <div className="mt-8 overflow-hidden rounded-2xl border border-white/15 bg-black">
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-space-grotesk text-sm">
                    <thead className="border-b border-white/15 bg-neutral-900/80 text-xs font-bold uppercase tracking-wider text-white">
                      <tr>
                        <th className="px-6 py-4 text-[#E51B24]">Gi Size</th>
                        <th className="px-6 py-4">Height Range</th>
                        <th className="px-6 py-4">Weight Range</th>
                        <th className="px-6 py-4">Weight Division Fit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {pageData.sizingMatrix.map((row) => (
                        <tr key={row.size} className="hover:bg-white/[0.03] transition-colors">
                          <td className="whitespace-nowrap px-6 py-4 font-bold text-white">
                            <span className="inline-block rounded bg-[#E51B24]/10 px-2.5 py-1 text-[#E51B24]">
                              {row.size}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-white/80">
                            {unitSystem === "imperial" ? row.heightFt : row.heightCm}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-white/80">
                            {unitSystem === "imperial" ? row.weightLbs : row.weightKg}
                          </td>
                          <td className="px-6 py-4 text-white/60">
                            {row.recommendedFor}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <p className="mt-4 font-space-grotesk text-xs text-white/50">
                * Note: For academies requiring proprietary patterns (slim cuts, oversized lapels, or custom sleeve allowances), our pattern grading team creates bespoke grade files tailored to your demographic.
              </p>
            </div>
          </section>

          {/* Fabric Comparison Spotlight */}
          <section className="py-16 lg:py-24">
            <div className="mx-auto max-w-[1250px] px-6 sm:px-10 lg:px-0">
              <div className="mb-10 text-center sm:text-left">
                <SectionEyebrow label="MATERIAL COMPARISON" />
                <h2 className="mt-3 font-space-grotesk text-3xl sm:text-4xl font-bold uppercase text-white">
                  BJJ WEAVE SELECTION GUIDE
                </h2>
              </div>

              <div className="grid gap-6 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/15 bg-[#121212] p-6 sm:p-8">
                  <span className="font-space-grotesk text-xs font-bold uppercase tracking-wider text-[#E51B24]">
                    Tournament Ultralight
                  </span>
                  <h3 className="mt-2 font-space-grotesk text-2xl font-bold text-white">
                    350 GSM Pearl Weave
                  </h3>
                  <p className="mt-3 font-space-grotesk text-sm text-white/70">
                    Engineered for weigh-in day advantages. Highly breathable with minimal water and sweat retention. IBJJF compliant.
                  </p>
                  <ul className="mt-6 flex flex-col gap-2 font-space-grotesk text-xs text-white/80">
                    <li className="flex items-center gap-2">
                      <Sparkles className="h-3.5 w-3.5 text-[#E51B24]" />
                      Ideal for competition season & hot climates
                    </li>
                    <li className="flex items-center gap-2">
                      <Sparkles className="h-3.5 w-3.5 text-[#E51B24]" />
                      Weight: ~1.2 kg total uniform
                    </li>
                  </ul>
                </div>

                <div className="rounded-2xl border-2 border-[#E51B24] bg-gradient-to-b from-[#18090a] to-[#121212] p-6 sm:p-8 shadow-xl shadow-[#E51B24]/10">
                  <div className="flex items-center justify-between">
                    <span className="font-space-grotesk text-xs font-bold uppercase tracking-wider text-[#E51B24]">
                      Daily Academy Workhorse
                    </span>
                    <span className="rounded bg-[#E51B24] px-2 py-0.5 font-space-grotesk text-[10px] font-bold text-white">
                      Industry Standard
                    </span>
                  </div>
                  <h3 className="mt-2 font-space-grotesk text-2xl font-bold text-white">
                    450 GSM Pearl Weave
                  </h3>
                  <p className="mt-3 font-space-grotesk text-sm text-white/70">
                    The golden standard for academy membership uniforms. Optimal balance of grip resistance, longevity, and everyday comfort.
                  </p>
                  <ul className="mt-6 flex flex-col gap-2 font-space-grotesk text-xs text-white/80">
                    <li className="flex items-center gap-2">
                      <Sparkles className="h-3.5 w-3.5 text-[#E51B24]" />
                      Tested for 3+ years of intense daily rolling
                    </li>
                    <li className="flex items-center gap-2">
                      <Sparkles className="h-3.5 w-3.5 text-[#E51B24]" />
                      Weight: ~1.5 kg total uniform
                    </li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-white/15 bg-[#121212] p-6 sm:p-8">
                  <span className="font-space-grotesk text-xs font-bold uppercase tracking-wider text-[#E51B24]">
                    Heavyweight Armored
                  </span>
                  <h3 className="mt-2 font-space-grotesk text-2xl font-bold text-white">
                    550 GSM Gold / Double
                  </h3>
                  <p className="mt-3 font-space-grotesk text-sm text-white/70">
                    Extremely dense, stiff lapel structure that frustrates opponent grip fighting. Traditional old-school judo/bjj hand feel.
                  </p>
                  <ul className="mt-6 flex flex-col gap-2 font-space-grotesk text-xs text-white/80">
                    <li className="flex items-center gap-2">
                      <Sparkles className="h-3.5 w-3.5 text-[#E51B24]" />
                      Maximum grip breaking difficulty
                    </li>
                    <li className="flex items-center gap-2">
                      <Sparkles className="h-3.5 w-3.5 text-[#E51B24]" />
                      Weight: ~1.9 kg total uniform
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <FAQSection
            header={{
              eyebrow: "RESOURCES & SPECS",
              titleTop: "QUESTIONS ABOUT",
              titleBottom: "TECH PACKS & SIZING",
              description:
                "Everything you need to know about utilizing our digital templates and sizing charts.",
            }}
            faqs={pageData.faqs}
          />

          {/* Closing CTA */}
          <CTASection
            eyebrow="READY FOR PHYSICAL SAMPLES?"
            titleTop="REQUEST OUR PHYSICAL"
            titleHighlight="SWATCH BOOK & SAMPLES"
            description="Touch, feel, and roll in our actual production textiles before placing a volume order. Express dispatched in 24 hours."
            primaryCta={{
              label: "Request Fabric Swatch Kit",
              href: "/contact#swatches",
            }}
            secondaryCta={{
              label: "Book Pattern Consultation",
              href: "/contact#consultation",
            }}
          />
        </div>
      )}
    </DataLoader>
  );
}
