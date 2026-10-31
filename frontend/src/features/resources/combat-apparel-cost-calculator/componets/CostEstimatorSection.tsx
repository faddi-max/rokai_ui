import { useMemo, useState } from "react";
import { ArrowUpRight, Check, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import {
  MIN_QTY, RETAIL_MULTIPLIER, WHOLESALE_MARKUP,
  brandingOptions, complexities, countries, currencies, decorationMethods,
  designLocations, fabricWeights, fabrics, productTypes, qualityLevels,
  shippingPrefs, sizeRanges, specialTrims, styleOptions, timelines,
  type BrandingKey, type Option,
} from "../data/costEstimator.data";

/* -------------------------------------------------------------------------- */
/*  State                                                                     */
/* -------------------------------------------------------------------------- */

interface FormState {
  product: string; quantity: string; styles: string; sizeRange: string;
  fabric: string; weight: string; quality: string;
  decoration: string; complexity: string; locations: string; trims: string;
  branding: Record<BrandingKey, boolean>;
  country: string; shipping: string; timeline: string; currency: string;
}

const INITIAL: FormState = {
  product: "mma-shorts", quantity: "300", styles: "1", sizeRange: "standard",
  fabric: "polyester", weight: "standard", quality: "core",
  decoration: "sublimation", complexity: "standard", locations: "1-2", trims: "none",
  branding: { wovenLabel: false, printedLabel: true, hangtag: false, polybag: true, packaging: false },
  country: "us", shipping: "standard", timeline: "flexible", currency: "USD",
};

interface Results {
  mfgUnit: number; landedUnit: number; wholesale: number; retail: number;
  base: number; custom: number; ship: number;
  mfgTotal: number; landedTotal: number; margin: number;
}

const f = (list: Option[], v: string) => list.find((o) => o.value === v)?.factor ?? 1;

function calculate(s: FormState): Results {
  const qty = Number(s.quantity);
  const qtyDiscount = qty >= 1000 ? 0.88 : qty >= 500 ? 0.93 : qty >= 200 ? 0.97 : 1;

  const base =
    f(productTypes, s.product) * f(fabrics, s.fabric) * f(fabricWeights, s.weight) *
    f(qualityLevels, s.quality) * f(complexities, s.complexity) * f(styleOptions, s.styles) *
    f(sizeRanges, s.sizeRange) * f(timelines, s.timeline) * qtyDiscount;

  const branding = brandingOptions.reduce((sum, o) => sum + (s.branding[o.value] ? o.cost : 0), 0);
  const custom =
    f(decorationMethods, s.decoration) * f(designLocations, s.locations) +
    f(specialTrims, s.trims) + branding;

  const ship = 1.4 * f(countries, s.country) * f(shippingPrefs, s.shipping);

  const mfgUnit = base + custom;
  const landedUnit = mfgUnit + ship;
  const wholesale = landedUnit * WHOLESALE_MARKUP;
  const retail = wholesale * RETAIL_MULTIPLIER;

  return {
    mfgUnit, landedUnit, wholesale, retail, base, custom, ship,
    mfgTotal: mfgUnit * qty, landedTotal: landedUnit * qty,
    margin: ((retail - landedUnit) / retail) * 100,
  };
}

/* -------------------------------------------------------------------------- */
/*  Small pieces                                                              */
/* -------------------------------------------------------------------------- */

export const labelClass = "mb-2 block font-space-grotesk text-[11px] font-normal leading-none text-white/70";

export const controlClass =
  "h-[46px] w-full rounded-[4px] border border-[#2A2A2A] bg-[#0B0B0B] px-4 font-space-grotesk text-[14px] text-white transition-colors duration-200 hover:border-[#3a3a3a] focus:border-[#E63946] focus:outline-none focus:ring-1 focus:ring-[#E63946]/40";

export function Select({
  label, value, options, onChange,
}: { label: string; value: string; options: { value: string; label: string }[]; onChange: (v: string) => void }) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${controlClass} cursor-pointer appearance-none pr-10`}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value} className="bg-[#0B0B0B]">{o.label}</option>
          ))}
        </select>
        <ChevronDown size={14} aria-hidden className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/60" />
      </div>
    </div>
  );
}

export function GroupHeading({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-[22px] w-[24px] items-center justify-center rounded-[3px] border border-[#E63946]/40 bg-[#E63946]/15 font-space-grotesk text-[10px] font-medium leading-none text-[#E63946]">
        {number}
      </span>
      <h3 className="font-space-grotesk text-[15px] font-bold text-white">{title}</h3>
    </div>
  );
}

export function CardHeader({ title, meta }: { title: string; meta: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 px-6 py-[18px]">
      <h2 className="font-space-grotesk text-[18px] font-bold text-white sm:text-[20px]">{title}</h2>
      <span className="font-space-grotesk text-[10px] font-medium uppercase tracking-[0.12em] text-[#E63946]">{meta}</span>
    </div>
  );
}

function CheckPill({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label
      className={`flex h-[38px] cursor-pointer items-center gap-2.5 rounded-[4px] border bg-[#0B0B0B] px-3.5 font-space-grotesk text-[12px] text-white/80 transition-colors duration-200 hover:border-[#3a3a3a] ${
        checked ? "border-[#E63946]/40" : "border-[#2A2A2A]"
      }`}
    >
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="sr-only" />
      <span
        aria-hidden
        className={`flex size-[14px] shrink-0 items-center justify-center rounded-[2px] ${checked ? "bg-[#E63946]" : "bg-white"}`}
      >
        {checked && <Check size={10} strokeWidth={3.5} className="text-white" />}
      </span>
      {label}
    </label>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex min-h-[78px] flex-col justify-between rounded-[4px] border border-white/10 bg-[#0B0B0B] p-3.5">
      <span className="font-space-grotesk text-[10px] font-normal text-white/50">{label}</span>
      <span className="font-space-grotesk text-[22px] font-bold leading-none text-white">{value}</span>
    </div>
  );
}

function BreakdownRow({ label, value, pct }: { label: string; value: string; pct: number }) {
  return (
    <div>
      <div className="flex items-center justify-between font-space-grotesk text-[12px] text-white/60">
        <span>{label}</span>
        <span className="text-white/80">{value}</span>
      </div>
      <div className="mt-2 h-[3px] w-full bg-white/10">
        <div className="h-full bg-[#E63946] transition-[width] duration-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function TotalRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-t border-white/10 py-3.5 font-space-grotesk text-[12px] text-white/60">
      <span>{label}</span>
      <span className="text-white/80">{value}</span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

export default function CostEstimatorSection() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [results, setResults] = useState<Results | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((p) => ({ ...p, [key]: value }));

  const currency = currencies.find((c) => c.value === form.currency) ?? currencies[0];

  const money = (usd: number, digits = 2) =>
    `${currency.symbol}${(usd * currency.rate).toLocaleString("en-US", {
      minimumFractionDigits: digits, maximumFractionDigits: digits,
    })}`;

  const handleCalculate = () => {
    const qty = Number(form.quantity);
    if (!Number.isInteger(qty) || qty < MIN_QTY) {
      setError(`Minimum planning quantity is ${MIN_QTY} units.`);
      return;
    }
    setError(null);
    setResults(calculate(form));
  };

  const handleReset = () => {
    setForm(INITIAL);
    setResults(null);
    setError(null);
  };

  const summary = useMemo(() => {
    if (!results) return "";
    const productLabel = productTypes.find((p) => p.value === form.product)?.label;
    return [
      `ROKAI estimate — ${productLabel}, ${form.quantity} units`,
      `Landed cost / unit: ${money(results.landedUnit)}`,
      `Manufacturing / unit: ${money(results.mfgUnit)}`,
      `Estimated landed total: ${money(results.landedTotal, 0)}`,
      `Preliminary planning estimate only.`,
    ].join("\n");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results, form.product, form.quantity, form.currency]);

  const handleCopy = async () => {
    if (!summary) return;
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { /* clipboard unavailable */ }
  };

  const dash = "—";
  const pct = (v: number) => (results ? Math.round((v / results.landedUnit) * 100) : 0);

  return (
    <section className="relative w-full bg-transparent">
      <div className="mx-auto w-full max-w-[1180px] px-5 py-10 sm:px-8 lg:py-14">
        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1.72fr)_minmax(0,1fr)] lg:gap-5">
          {/* ------------------------------ INPUTS ------------------------------ */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-[10px] border border-white/10 bg-[#111111]"
          >
            <CardHeader title="Configure your product" meta="01 / Inputs" />

            <div className="flex flex-col gap-7 px-6 py-6">
              {/* 01 */}
              <div className="flex flex-col gap-5">
                <GroupHeading number="01" title="Product & production" />
                <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
                  <Select label="Product type" value={form.product} options={productTypes} onChange={(v) => set("product", v)} />
                  <div>
                    <label className={labelClass}>Total quantity (units)</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={form.quantity}
                      onChange={(e) => set("quantity", e.target.value.replace(/\D/g, "").slice(0, 7))}
                      aria-invalid={!!error}
                      className={`${controlClass} ${error ? "!border-[#E63946]" : ""}`}
                    />
                    <p className={`mt-2 font-space-grotesk text-[10px] ${error ? "text-[#ff6b75]" : "text-white/40"}`}>
                      {error ?? `Minimum planning quantity: ${MIN_QTY} units`}
                    </p>
                  </div>
                  <Select label="Number of styles" value={form.styles} options={styleOptions} onChange={(v) => set("styles", v)} />
                  <Select label="Size range" value={form.sizeRange} options={sizeRanges} onChange={(v) => set("sizeRange", v)} />
                </div>
              </div>

              {/* 02 */}
              <div className="flex flex-col gap-5">
                <GroupHeading number="02" title="Fabric & quality" />
                <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
                  <Select label="Fabric selection" value={form.fabric} options={fabrics} onChange={(v) => set("fabric", v)} />
                  <Select label="Fabric weight" value={form.weight} options={fabricWeights} onChange={(v) => set("weight", v)} />
                </div>
                <div>
                  <span className={labelClass}>Quality level</span>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {qualityLevels.map((q) => {
                      const active = form.quality === q.value;
                      return (
                        <button
                          key={q.value}
                          type="button"
                          onClick={() => set("quality", q.value)}
                          aria-pressed={active}
                          className={`h-[44px] rounded-[4px] border font-space-grotesk text-[12px] font-bold transition-colors duration-200 ${
                            active
                              ? "border-[#E63946]/50 bg-[#E63946]/15 text-white"
                              : "border-[#2A2A2A] bg-[#0B0B0B] text-white/80 hover:border-[#3a3a3a]"
                          }`}
                        >
                          {q.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 03 */}
              <div className="flex flex-col gap-5">
                <GroupHeading number="03" title="Customization & construction" />
                <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
                  <Select label="Decoration method" value={form.decoration} options={decorationMethods} onChange={(v) => set("decoration", v)} />
                  <Select label="Production complexity" value={form.complexity} options={complexities} onChange={(v) => set("complexity", v)} />
                  <Select label="Design locations" value={form.locations} options={designLocations} onChange={(v) => set("locations", v)} />
                  <Select label="Special trims / features" value={form.trims} options={specialTrims} onChange={(v) => set("trims", v)} />
                </div>
              </div>

              {/* 04 */}
              <div className="flex flex-col gap-5">
                <GroupHeading number="04" title="Branding & packaging" />
                <div className="flex flex-wrap gap-2.5">
                  {brandingOptions.map((o) => (
                    <CheckPill
                      key={o.value}
                      label={o.label}
                      checked={form.branding[o.value]}
                      onChange={(v) => set("branding", { ...form.branding, [o.value]: v })}
                    />
                  ))}
                </div>
              </div>

              {/* 05 */}
              <div className="flex flex-col gap-5">
                <GroupHeading number="05" title="Destination & delivery" />
                <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
                  <Select label="Destination country" value={form.country} options={countries} onChange={(v) => set("country", v)} />
                  <Select label="Shipping preference" value={form.shipping} options={shippingPrefs} onChange={(v) => set("shipping", v)} />
                  <Select label="Production timeline" value={form.timeline} options={timelines} onChange={(v) => set("timeline", v)} />
                  <Select label="Display currency" value={form.currency} options={currencies} onChange={(v) => set("currency", v)} />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleCalculate}
                  className="flex h-[48px] flex-1 items-center justify-center gap-1.5 rounded-[4px] bg-[#E63946] px-5 font-space-grotesk text-[12px] font-bold uppercase tracking-[0.04em] text-white transition-colors hover:bg-[#ee4250] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Calculate my estimate
                  <ArrowUpRight size={13} aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="h-[48px] rounded-[4px] border border-[#2A2A2A] bg-[#0B0B0B] px-6 font-space-grotesk text-[12px] font-bold text-white transition-colors hover:border-white/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Reset
                </button>
              </div>
            </div>
          </motion.div>

          {/* ------------------------------ RESULTS ----------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-[10px] border border-white/10 bg-[#111111] lg:sticky lg:top-[100px]"
          >
            <CardHeader title="Your cost snapshot" meta="02 / Results" />

            <div className="flex flex-col gap-3 px-5 py-5">
              {/* Hero number */}
              <div
                className="rounded-[4px] border border-[#E63946]/40 p-4"
                style={{ background: "linear-gradient(135deg, rgba(230,57,70,0.22) 0%, rgba(230,57,70,0.04) 100%)" }}
              >
                <span className="font-space-grotesk text-[9px] font-medium uppercase tracking-[0.15em] text-white/60">
                  Estimated landed cost
                </span>
                <p className="mt-3 font-space-grotesk text-[44px] font-bold leading-none text-white">
                  {results ? money(results.landedTotal, 0) : `${currency.symbol}${dash}`}
                </p>
                <p className="mt-3 font-space-grotesk text-[10px] text-white/50">
                  Per unit: {results ? money(results.landedUnit) : dash}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Stat label="Manufacturing / unit" value={results ? money(results.mfgUnit) : dash} />
                <Stat label="Landed / unit" value={results ? money(results.landedUnit) : dash} />
                <Stat label="Suggested wholesale" value={results ? money(results.wholesale) : dash} />
                <Stat label="Retail scenario" value={results ? money(results.retail) : dash} />
              </div>

              {/* Breakdown */}
              <div className="mt-3">
                <h3 className="font-space-grotesk text-[13px] font-bold text-white">Estimated cost breakdown</h3>
                <div className="mt-4 flex flex-col gap-3.5">
                  <BreakdownRow label="Base manufacturing" value={results ? money(results.base) : dash} pct={results ? pct(results.base) : 0} />
                  <BreakdownRow label="Customization & branding" value={results ? money(results.custom) : dash} pct={results ? pct(results.custom) : 0} />
                  <BreakdownRow label="Shipping & destination" value={results ? money(results.ship) : dash} pct={results ? pct(results.ship) : 0} />
                </div>

                <div className="mt-5">
                  <TotalRow label="Estimated manufacturing total" value={results ? money(results.mfgTotal, 0) : dash} />
                  <TotalRow label="Estimated landed total" value={results ? money(results.landedTotal, 0) : dash} />
                  <TotalRow label="Illustrative gross margin at retail" value={results ? `${results.margin.toFixed(0)}%` : dash} />
                </div>
              </div>

              {/* Disclaimer */}
              <p className="mt-2 rounded-[4px] border border-[#E63946]/30 bg-[#E63946]/[0.06] p-3.5 font-space-grotesk text-[10px] leading-[16px] text-white/60">
                These figures are preliminary planning estimates based on illustrative assumptions. Final costs depend on technical
                specifications, artwork, size breakdown, confirmed materials, order details, freight and duties.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!results}
                  className="h-[46px] rounded-[4px] border border-[#2A2A2A] bg-[#0B0B0B] font-space-grotesk text-[12px] font-bold text-white transition-colors hover:border-white/40 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {copied ? "Copied" : "Copy results"}
                </button>
                <a
                  href="/contact"
                  className="flex h-[46px] items-center justify-center gap-1.5 rounded-[4px] bg-[#E63946] font-space-grotesk text-[12px] font-bold text-white transition-colors hover:bg-[#ee4250] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Send product brief
                  <ArrowUpRight size={13} aria-hidden />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}