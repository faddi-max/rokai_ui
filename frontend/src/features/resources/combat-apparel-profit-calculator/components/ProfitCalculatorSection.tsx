import { useId, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import {
  CardHeader,
  GroupHeading,
  Select,
  controlClass,
  labelClass,
} from "../../combat-apparel-cost-calculator/componets/CostEstimatorSection";
import {
  PROFIT_DEFAULTS,
  planningPeriods,
  profitCurrencies,
  type ProfitFormState,
} from "../data/profitCalculator.data";

/* -------------------------------------------------------------------------- */
/*  Calculation                                                               */
/* -------------------------------------------------------------------------- */

export interface ProfitResults {
  grossSales: number;
  netSales: number;
  manufacturing: number;
  fulfillment: number;
  paymentFees: number;
  adSpend: number;
  fixedOpex: number;
  contribution: number;
  contributionPerUnit: number;
  contributionMargin: number;
  operatingProfit: number;
  maxCpa: number;
  currentCpa: number | null;
  breakEvenRoas: number | null;
  breakEvenUnits: number | null;
}

const num = (v: string) => {
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : 0;
};

export function calculateProfit(s: ProfitFormState): ProfitResults {
  const units = num(s.unitsSold);
  const price = num(s.sellingPrice);

  const grossSales = price * units;
  const returns = grossSales * (num(s.returnsPct) / 100);
  const afterReturns = grossSales - returns;
  // Tax is treated as included in the selling price, so it is carved out of revenue.
  const taxRate = num(s.salesTaxPct) / 100;
  const salesTax = afterReturns - afterReturns / (1 + taxRate);
  const netSales = afterReturns - salesTax;

  const manufacturing = num(s.manufacturingCost) * units;
  const fulfillment =
    (num(s.fulfillmentCost) + num(s.packagingCost) + num(s.otherVariableCost)) * units;
  // One order per unit is assumed for the fixed per-order fee.
  const paymentFees = grossSales * (num(s.paymentFeePct) / 100) + num(s.paymentFeeFixed) * units;
  const adSpend = num(s.adSpend);
  const fixedOpex = num(s.fixedOpex);

  const contributionBeforeAds = netSales - manufacturing - fulfillment - paymentFees;
  const contribution = contributionBeforeAds - adSpend;
  const operatingProfit = contribution - fixedOpex;

  const maxCpa = units > 0 ? contributionBeforeAds / units : 0;
  const adOrders = num(s.adOrders);

  return {
    grossSales,
    netSales,
    manufacturing,
    fulfillment,
    paymentFees,
    adSpend,
    fixedOpex,
    contribution,
    contributionPerUnit: units > 0 ? contribution / units : 0,
    contributionMargin: netSales > 0 ? (contribution / netSales) * 100 : 0,
    operatingProfit,
    maxCpa,
    currentCpa: adOrders > 0 ? adSpend / adOrders : null,
    breakEvenRoas: contributionBeforeAds > 0 ? grossSales / contributionBeforeAds : null,
    breakEvenUnits:
      maxCpa > 0 ? Math.ceil((fixedOpex + adSpend + num(s.launchCosts)) / maxCpa) : null,
  };
}

/* -------------------------------------------------------------------------- */
/*  Small pieces                                                              */
/* -------------------------------------------------------------------------- */

function NumberField({
  label,
  value,
  onChange,
  hint,
  max = 9_999_999,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
  max?: number;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <input
        id={id}
        type="text"
        inputMode="decimal"
        value={value}
        onChange={(e) => {
          const v = e.target.value.replace(/[^\d.]/g, "").replace(/(\..*)\./g, "$1");
          if (num(v) <= max) onChange(v);
        }}
        className={controlClass}
      />
      {hint && <p className="mt-2 font-space-grotesk text-[10px] text-white/40">{hint}</p>}
    </div>
  );
}

function SnapshotStat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="flex min-h-[84px] flex-col justify-between gap-2 rounded-[4px] border border-white/10 bg-[#0B0B0B] p-3.5">
      <span className="font-space-grotesk text-[10px] font-normal text-white/50">{label}</span>
      <span className="font-space-grotesk text-[22px] font-bold leading-none text-white">{value}</span>
      <span className="font-space-grotesk text-[9px] font-normal text-white/40">{sub}</span>
    </div>
  );
}

function BreakdownLine({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 py-3 font-space-grotesk text-[12px] last:border-b-0">
      <span className={highlight ? "text-[#4ADE80]" : "text-white/60"}>{label}</span>
      <span className={`font-bold ${highlight ? "text-[#4ADE80]" : "text-white"}`}>{value}</span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

export default function ProfitCalculatorSection() {
  const [form, setForm] = useState<ProfitFormState>(PROFIT_DEFAULTS);
  // Results and the inputs they were calculated from are stored together so the
  // snapshot and copied summary always describe the same scenario.
  const [snapshot, setSnapshot] = useState(() => ({
    input: PROFIT_DEFAULTS,
    results: calculateProfit(PROFIT_DEFAULTS),
  }));
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const set = <K extends keyof ProfitFormState>(key: K, value: ProfitFormState[K]) => {
    setForm((p) => ({ ...p, [key]: value }));
    setError(null);
  };

  const { input, results: r } = snapshot;
  const currency = profitCurrencies.find((c) => c.value === input.currency) ?? profitCurrencies[0];
  const period = planningPeriods.find((p) => p.value === input.period) ?? planningPeriods[0];
  const isStale = JSON.stringify(form) !== JSON.stringify(input);

  const money = (v: number) => {
    const abs = Math.abs(v).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return `${v < 0 ? "-" : ""}${currency.symbol}${abs}`;
  };

  const handleCalculate = () => {
    if (num(form.sellingPrice) <= 0 || num(form.unitsSold) <= 0) {
      setError("Enter a selling price and expected units sold above zero.");
      return;
    }
    setError(null);
    setSnapshot({ input: form, results: calculateProfit(form) });
  };

  const handleReset = () => {
    setForm(PROFIT_DEFAULTS);
    setSnapshot({ input: PROFIT_DEFAULTS, results: calculateProfit(PROFIT_DEFAULTS) });
    setError(null);
  };

  const summary = useMemo(
    () =>
      [
        `ROKAI profit scenario (${period.label.toLowerCase()}): ${input.unitsSold} units at ${money(num(input.sellingPrice))}`,
        `Gross sales: ${money(r.grossSales)}`,
        `Contribution after advertising: ${money(r.contribution)} (${r.contributionMargin.toFixed(1)}%)`,
        `Estimated operating profit: ${money(r.operatingProfit)}`,
        `Break-even units: ${r.breakEvenUnits ?? "n/a"}`,
        `Planning model only. Results depend on your assumptions.`,
      ].join("\n"),
    // money depends only on currency, which is derived from input
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [snapshot],
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  const cardMotion = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
  } as const;

  return (
    <section className="relative w-full overflow-hidden bg-[#111111]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_15%_100%,rgba(230,57,70,0.14),transparent_70%)]"
      />
      <div className="relative z-10 mx-auto w-full max-w-[1180px] px-5 py-10 sm:px-8 lg:px-[30px] lg:py-14">
        <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-[minmax(0,1.12fr)_minmax(0,1fr)] lg:gap-5">
          {/* ------------------------------ INPUTS ------------------------------ */}
          <motion.div
            {...cardMotion}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-[10px] border border-white/10 bg-[#111111]"
          >
            <CardHeader title="Business assumptions" meta="01 / Inputs" />

            <div className="flex flex-col gap-7 px-6 py-6">
              {/* 01 */}
              <div className="flex flex-col gap-5">
                <GroupHeading number="01" title="Sales & pricing" />
                <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
                  <Select label="Currency" value={form.currency} options={[...profitCurrencies]} onChange={(v) => set("currency", v)} />
                  <NumberField label="Selling price per unit" value={form.sellingPrice} onChange={(v) => set("sellingPrice", v)} />
                  <NumberField label="Expected units sold" value={form.unitsSold} onChange={(v) => set("unitsSold", v)} />
                  <Select label="Planning period" value={form.period} options={[...planningPeriods]} onChange={(v) => set("period", v)} />
                </div>
              </div>

              {/* 02 */}
              <div className="flex flex-col gap-5">
                <GroupHeading number="02" title="Product & fulfillment costs" />
                <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
                  <NumberField label="Manufacturing cost / unit" value={form.manufacturingCost} onChange={(v) => set("manufacturingCost", v)} />
                  <NumberField label="Shipping / fulfillment per unit" value={form.fulfillmentCost} onChange={(v) => set("fulfillmentCost", v)} />
                  <NumberField label="Packaging / branding per unit" value={form.packagingCost} onChange={(v) => set("packagingCost", v)} />
                  <NumberField label="Other variable cost / unit" value={form.otherVariableCost} onChange={(v) => set("otherVariableCost", v)} />
                </div>
              </div>

              {/* 03 */}
              <div className="flex flex-col gap-5">
                <GroupHeading number="03" title="Payment & advertising" />
                <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
                  <NumberField label="Payment processing fee (%)" value={form.paymentFeePct} max={100} onChange={(v) => set("paymentFeePct", v)} />
                  <NumberField label="Fixed payment fee / order" value={form.paymentFeeFixed} onChange={(v) => set("paymentFeeFixed", v)} />
                  <NumberField label="Advertising spend for period" value={form.adSpend} onChange={(v) => set("adSpend", v)} />
                  <NumberField
                    label="Orders attributed to ads"
                    value={form.adOrders}
                    onChange={(v) => set("adOrders", v)}
                    hint="Used to estimate your current cost per acquisition."
                  />
                </div>
              </div>

              {/* 04 */}
              <div className="flex flex-col gap-5">
                <GroupHeading number="04" title="Operating assumptions" />
                <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
                  <NumberField
                    label="Fixed operating expenses"
                    value={form.fixedOpex}
                    onChange={(v) => set("fixedOpex", v)}
                    hint="Software, salaries, storage and overheads."
                  />
                  <NumberField
                    label="One-time launch costs"
                    value={form.launchCosts}
                    onChange={(v) => set("launchCosts", v)}
                    hint="Samples, photography, setup. Used for break-even."
                  />
                  <NumberField label="Returns / discounts allowance (%)" value={form.returnsPct} max={100} onChange={(v) => set("returnsPct", v)} />
                  <NumberField
                    label="Sales tax / VAT (%)"
                    value={form.salesTaxPct}
                    max={100}
                    onChange={(v) => set("salesTaxPct", v)}
                    hint="Only if tax is included in your price."
                  />
                </div>
              </div>

              {error && (
                <p role="alert" className="-mt-2 font-space-grotesk text-[11px] text-[#ff6b75]">
                  {error}
                </p>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleCalculate}
                  className="flex h-[48px] flex-1 items-center justify-center gap-1.5 rounded-[4px] bg-[#E63946] px-5 font-space-grotesk text-[12px] font-bold uppercase tracking-[0.04em] text-white transition-colors hover:bg-[#ee4250] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Calculate profitability
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
            {...cardMotion}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-[10px] border border-white/10 bg-[#111111] md:sticky md:top-[100px]"
          >
            <CardHeader title="Profit snapshot" meta="02 / Results" />

            <div className="flex flex-col gap-3 px-5 py-5" aria-live="polite">
              {isStale && (
                <p className="rounded-[4px] border border-white/10 bg-white/[0.03] px-3 py-2 font-space-grotesk text-[10px] text-white/60">
                  Inputs changed. Press <span className="font-bold text-white">Calculate profitability</span> to update.
                </p>
              )}

              {/* Hero number */}
              <div
                className="rounded-[6px] border border-[#E63946]/40 p-4"
                style={{ background: "linear-gradient(135deg, rgba(230,57,70,0.28) 0%, rgba(230,57,70,0.06) 100%)" }}
              >
                <span className="font-space-grotesk text-[9px] font-medium uppercase tracking-[0.15em] text-white/60">
                  Contribution after advertising
                </span>
                <p className="mt-3 font-space-grotesk text-[40px] font-bold leading-none text-white sm:text-[44px]">
                  {money(r.contribution)}
                </p>
                <p className="mt-3 font-space-grotesk text-[10px] text-white/50">
                  Per unit {money(r.contributionPerUnit)} · per {period.noun}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <SnapshotStat label="Gross sales" value={money(r.grossSales)} sub={`Net revenue ${money(r.netSales)}`} />
                <SnapshotStat label="Contribution margin" value={`${r.contributionMargin.toFixed(1)}%`} sub="Of net revenue, after ads" />
                <SnapshotStat
                  label="Break-even units"
                  value={r.breakEvenUnits != null ? r.breakEvenUnits.toLocaleString("en-US") : "—"}
                  sub="To cover ads, fixed & launch costs"
                />
                <SnapshotStat label="Maximum CPA" value={money(r.maxCpa)} sub="Break-even acquisition cost" />
                <SnapshotStat
                  label="Break-even ROAS"
                  value={r.breakEvenRoas != null ? `${r.breakEvenRoas.toFixed(2)}x` : "—"}
                  sub="Revenue ÷ ad spend"
                />
                <SnapshotStat
                  label="Current CPA"
                  value={r.currentCpa != null ? money(r.currentCpa) : "—"}
                  sub="Ad spend ÷ ad orders"
                />
              </div>

              {/* Breakdown */}
              <div className="mt-3">
                <h3 className="font-space-grotesk text-[13px] font-bold text-white">Financial breakdown</h3>
                <div className="mt-2">
                  <BreakdownLine label="Net sales revenue" value={money(r.netSales)} />
                  <BreakdownLine label="Manufacturing cost" value={money(r.manufacturing)} />
                  <BreakdownLine label="Shipping, packaging & other" value={money(r.fulfillment)} />
                  <BreakdownLine label="Payment processing fees" value={money(r.paymentFees)} />
                  <BreakdownLine label="Advertising spend" value={money(r.adSpend)} />
                  <BreakdownLine label="Fixed operating expenses" value={money(r.fixedOpex)} />
                  <BreakdownLine label="Estimated operating profit" value={money(r.operatingProfit)} highlight={r.operatingProfit >= 0} />
                </div>
              </div>

              {/* Disclaimer */}
              <p className="mt-1 rounded-[4px] border border-[#E63946]/30 bg-[#E63946]/[0.06] p-3.5 font-space-grotesk text-[10px] leading-[16px] text-white/60">
                This scenario is a planning model only. Taxes, duties, refunds and platform fees vary, so confirm your
                numbers before committing to production.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="h-[46px] rounded-[4px] border border-[#2A2A2A] bg-[#0B0B0B] font-space-grotesk text-[12px] font-bold text-white transition-colors hover:border-white/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {copied ? "Copied" : "Copy summary"}
                </button>
                <Link
                  to="/contact"
                  className="flex h-[46px] items-center justify-center gap-1.5 rounded-[4px] bg-[#E63946] font-space-grotesk text-[12px] font-bold text-white transition-colors hover:bg-[#ee4250] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Start production
                  <ArrowUpRight size={13} aria-hidden />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
