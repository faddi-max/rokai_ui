import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import SectionGlow from "@/shared/components/layout/SectionGlow";
import SectionHeaderblog from "@/shared/components/sections/SectionHeaderblog";
import { profitFields } from "../data/profitCalculator1.data";

type Values = Record<(typeof profitFields)[number]["name"], string>;

const initialValues = Object.fromEntries(
  profitFields.map((f) => [f.name, f.defaultValue])
) as Values;

const money = (n: number) =>
  `${n < 0 ? "-" : ""}$${Math.abs(n).toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

const inputWrap =
  "flex h-[49px] w-full items-center gap-2 rounded-[4px] border border-[#383838] bg-[#101010] px-[14px] transition-colors duration-300 hover:border-[#555] focus-within:border-[#E63946]";

export default function ProfitCalculatorSection() {
  const [values, setValues] = useState<Values>(initialValues);

  const result = useMemo(() => {
    const n = (k: keyof Values) => Number(values[k]) || 0;
    const revenue = n("price") * n("quantity");
    const cogs = n("unitCost") * n("quantity");
    const fees = (revenue * n("feePct")) / 100;
    const marketing = n("marketing");
    const profit = revenue - cogs - fees - marketing;
    const margin = revenue > 0 ? (profit / revenue) * 100 : 0;
    const perUnit = n("price") - n("unitCost") - (n("price") * n("feePct")) / 100;
    const breakEven = perUnit > 0 ? Math.ceil(marketing / perUnit) : null;
    return { revenue, cogs, fees, marketing, profit, margin, breakEven };
  }, [values]);

  const stats = [
    { label: "Revenue", value: money(result.revenue) },
    { label: "Total costs", value: money(result.cogs + result.fees + result.marketing) },
    { label: "Net profit", value: money(result.profit), accent: true },
    { label: "Net margin", value: `${result.margin.toFixed(1)}%`, accent: true },
    { label: "Break-even units", value: result.breakEven === null ? "—" : result.breakEven.toLocaleString() },
  ];

  return (
    <SectionGlow className="relative overflow-hidden">
      <div id="profit-calculator" className="scroll-mt-28">
        <SectionHeaderblog
          bare
          eyebrow="Profit calculator"
          title="ESTIMATE YOUR"
          highlight="COLLECTION PROFIT."
          description="Enter your pricing, costs and spend to see profit, margin and break-even instantly."
          accentColor="#E63946"
        />

        <div className="relative z-10 mx-auto grid w-full max-w-[1180px] grid-cols-1 gap-5 px-5 pb-16 sm:px-8 lg:grid-cols-[1.2fr_1fr] lg:px-[30px] lg:pb-20">
          {/* Inputs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[6px] border border-white/10 bg-[#111111] p-6 sm:p-8"
          >
            <p className="font-space-grotesk text-[10px] font-bold uppercase tracking-[1.8px] text-[#E63946]">
              Your assumptions
            </p>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {profitFields.map((f) => (
                <div key={f.name} className="flex flex-col gap-2">
                  <label
                    htmlFor={`profit-${f.name}`}
                    className="font-space-grotesk text-[12px] font-bold uppercase tracking-[1px] text-[#bcbcbc]"
                  >
                    {f.label}
                  </label>
                  <div className={inputWrap}>
                    {f.prefix && <span className="font-space-grotesk text-[14px] text-white/40">{f.prefix}</span>}
                    <input
                      id={`profit-${f.name}`}
                      inputMode="decimal"
                      value={values[f.name]}
                      onChange={(e) =>
                        setValues((p) => ({ ...p, [f.name]: e.target.value.replace(/[^\d.]/g, "") }))
                      }
                      className="h-full min-w-0 flex-1 bg-transparent font-space-grotesk text-[16px] text-white outline-none"
                    />
                    {f.suffix && <span className="font-space-grotesk text-[14px] text-white/40">{f.suffix}</span>}
                  </div>
                  <span className="font-space-grotesk text-[11px] text-white/35">{f.hint}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col rounded-[6px] border border-[#E63946]/40 p-6 sm:p-8"
            style={{
              background:
                "linear-gradient(135deg, rgba(230,57,70,0.22) 0%, rgba(105,1,6,0.28) 100%)",
            }}
            aria-live="polite"
          >
            <p className="font-space-grotesk text-[10px] font-bold uppercase tracking-[1.8px] text-white/70">
              Estimated result
            </p>

            <p className="mt-4 font-space-grotesk text-[44px] font-bold leading-none text-white sm:text-[56px]">
              {money(result.profit)}
            </p>
            <p className="mt-2 font-space-grotesk text-[12px] text-white/60">Net profit for this collection</p>

            <ul className="mt-8 flex flex-col">
              {stats.map((s) => (
                <li
                  key={s.label}
                  className="flex items-center justify-between border-t border-white/10 py-3.5 font-space-grotesk"
                >
                  <span className="text-[13px] text-white/60">{s.label}</span>
                  <span className={`text-[15px] font-bold ${s.accent ? "text-[#E63946]" : "text-white"}`}>
                    {s.value}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </SectionGlow>
  );
}