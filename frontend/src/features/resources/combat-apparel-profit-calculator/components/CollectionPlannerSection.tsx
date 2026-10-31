import { useId, useState } from "react";
import { ArrowUpRight, Plus, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  DEFAULT_PLANNER_PRODUCTS,
  MAX_PLANNER_PRODUCTS,
  plannerFields,
  type PlannerField,
  type PlannerProduct,
} from "../data/collectionPlanner.data";

/* -------------------------------------------------------------------------- */
/*  Calculation                                                               */
/* -------------------------------------------------------------------------- */

interface ComparisonRow {
  id: string;
  name: string;
  revenue: number;
  grossProfit: number;
  contributionPerUnit: number;
  margin: number;
  breakEvenUnits: number | null;
}

const num = (v: string) => {
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : 0;
};

function compareProduct(p: PlannerProduct, index: number): ComparisonRow {
  const price = num(p.sellingPrice);
  const units = num(p.expectedUnits);
  const revenue = price * units;
  const unitCosts =
    num(p.manufacturingCost) +
    num(p.shippingCost) +
    num(p.packagingCost) +
    num(p.otherVariableCost) +
    price * (num(p.paymentFeePct) / 100);
  const unitProfit = price - unitCosts;
  const grossProfit = unitProfit * units;
  const adSpend = num(p.adSpend);
  const contribution = grossProfit - adSpend;

  return {
    id: p.id,
    name: p.name.trim() || `Product ${String(index + 1).padStart(2, "0")}`,
    revenue,
    grossProfit,
    contributionPerUnit: units > 0 ? contribution / units : 0,
    margin: revenue > 0 ? (contribution / revenue) * 100 : 0,
    breakEvenUnits: unitProfit > 0 ? Math.ceil(adSpend / unitProfit) : null,
  };
}

const money = (v: number) =>
  `${v < 0 ? "-" : ""}$${Math.abs(v).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/* -------------------------------------------------------------------------- */
/*  Pieces                                                                    */
/* -------------------------------------------------------------------------- */

const fieldLabel = "mb-1.5 block font-space-grotesk text-[10px] font-normal leading-none text-white/70";
const fieldControl =
  "h-[36px] w-full rounded-[3px] border border-[#222222] bg-[#0B0B0B] px-3 font-space-grotesk text-[12px] text-white transition-colors duration-200 hover:border-[#333333] focus:border-[#E63946] focus:outline-none focus:ring-1 focus:ring-[#E63946]/40";

function Field({
  label,
  value,
  onChange,
  numeric = true,
  max = 9_999_999,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  numeric?: boolean;
  max?: number;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className={fieldLabel}>
        {label}
      </label>
      <input
        id={id}
        type="text"
        inputMode={numeric ? "decimal" : "text"}
        value={value}
        maxLength={numeric ? undefined : 60}
        onChange={(e) => {
          if (!numeric) return onChange(e.target.value);
          const v = e.target.value.replace(/[^\d.]/g, "").replace(/(\..*)\./g, "$1");
          if (num(v) <= max) onChange(v);
        }}
        className={fieldControl}
      />
    </div>
  );
}

function ProductCard({
  product,
  index,
  canRemove,
  onChange,
  onRemove,
}: {
  product: PlannerProduct;
  index: number;
  canRemove: boolean;
  onChange: (key: keyof PlannerProduct, value: string) => void;
  onRemove: () => void;
}) {
  const number = String(index + 1).padStart(2, "0");
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-[8px] border border-white/10 bg-[#111111] px-4 pb-3 pt-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-space-grotesk text-[10px] font-bold uppercase tracking-[0.08em] text-white">
          Product {number}
        </h3>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remove product ${number}`}
            className="flex items-center gap-1 font-space-grotesk text-[10px] font-medium text-[#E63946] transition-colors hover:text-[#ff6b75]"
          >
            Remove <X size={10} strokeWidth={2.5} aria-hidden />
          </button>
        )}
      </div>

      <div className="mt-3">
        <Field label="Product name" value={product.name} numeric={false} onChange={(v) => onChange("name", v)} />
      </div>

      <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-3 md:grid-cols-4">
        {plannerFields.map((f) => (
          <Field
            key={f.key}
            label={f.label}
            value={product[f.key]}
            max={f.max}
            onChange={(v) => onChange(f.key, v)}
          />
        ))}
      </div>

      <p className="mt-3 border-t border-white/10 pt-2.5 font-space-grotesk text-[9px] text-white/40">
        Click Compare Collection to calculate this product.
      </p>
    </motion.article>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

let nextId = 3;

export default function CollectionPlannerSection() {
  const [products, setProducts] = useState<PlannerProduct[]>(DEFAULT_PLANNER_PRODUCTS);
  const [rows, setRows] = useState<ComparisonRow[]>(() => DEFAULT_PLANNER_PRODUCTS.map(compareProduct));

  const update = (id: string, key: keyof PlannerProduct, value: string) =>
    setProducts((list) => list.map((p) => (p.id === id ? { ...p, [key]: value } : p)));

  const addProduct = () => {
    if (products.length >= MAX_PLANNER_PRODUCTS) return;
    const blank = Object.fromEntries(plannerFields.map((f) => [f.key, ""])) as Record<PlannerField, string>;
    setProducts((list) => [...list, { id: `p${nextId++}`, name: "", ...blank, paymentFeePct: "2.9" }]);
  };

  const removeProduct = (id: string) => {
    setProducts((list) => list.filter((p) => p.id !== id));
    setRows((r) => r.filter((row) => row.id !== id));
  };

  const compare = () => setRows(products.map(compareProduct));

  const clear = () => {
    const blank = Object.fromEntries(plannerFields.map((f) => [f.key, ""])) as Record<PlannerField, string>;
    setProducts([{ id: `p${nextId++}`, name: "", ...blank, paymentFeePct: "2.9" }]);
    setRows([]);
  };

  const reveal = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  } as const;

  return (
    <section className="relative w-full">
      <div className="mx-auto w-full max-w-[1180px] px-5 py-10 sm:px-8 lg:px-[30px] lg:py-12">
        {/* Header */}
        <motion.div {...reveal} className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="font-space-grotesk text-[10px] font-bold uppercase tracking-[0.18em] text-[#E63946]">
              Collection planner
            </span>
            <h2 className="mt-2 font-space-grotesk text-[24px] font-bold leading-[1.15] text-white sm:text-[26px]">
              Compare multiple products
            </h2>
            <p className="mt-2 font-space-grotesk text-[12px] text-white/50">
              Add products to compare unit economics and plan your initial collection.
            </p>
          </div>
          <button
            type="button"
            onClick={addProduct}
            disabled={products.length >= MAX_PLANNER_PRODUCTS}
            className="flex h-[44px] w-fit items-center gap-1.5 self-start rounded-[4px] bg-[#E63946] px-5 font-space-grotesk text-[13px] font-bold text-white transition-colors hover:bg-[#ee4250] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-60 sm:self-auto"
          >
            <Plus size={14} strokeWidth={2.5} aria-hidden />
            Add product
          </button>
        </motion.div>

        {/* Product cards */}
        <div className="mt-6 flex flex-col gap-5">
          <AnimatePresence initial={false}>
            {products.map((p, i) => (
              <ProductCard
                key={p.id}
                product={p}
                index={i}
                canRemove={products.length > 1}
                onChange={(key, v) => update(p.id, key, v)}
                onRemove={() => removeProduct(p.id)}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={compare}
            className="flex h-[44px] items-center gap-1.5 rounded-[4px] bg-[#E63946] px-5 font-space-grotesk text-[11px] font-bold uppercase tracking-[0.04em] text-white transition-colors hover:bg-[#ee4250] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Compare collection
            <ArrowUpRight size={12} aria-hidden />
          </button>
          <button
            type="button"
            onClick={clear}
            className="h-[44px] rounded-[4px] border border-[#2A2A2A] bg-[#0B0B0B] px-4 font-space-grotesk text-[12px] font-bold text-white transition-colors hover:border-white/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Clear products
          </button>
        </div>

        {/* Comparison table */}
        {rows.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 overflow-x-auto rounded-[6px] border border-white/10"
            aria-live="polite"
          >
            <table className="w-full min-w-[640px] border-collapse font-space-grotesk text-[11px]">
              <thead>
                <tr className="bg-[#1A1A1A] text-white/60">
                  <th scope="col" className="px-3 py-3 text-left font-normal">Product</th>
                  <th scope="col" className="px-3 py-3 text-right font-normal">Revenue</th>
                  <th scope="col" className="px-3 py-3 text-right font-normal">Gross profit</th>
                  <th scope="col" className="px-3 py-3 text-right font-normal">Contribution / unit</th>
                  <th scope="col" className="px-3 py-3 text-right font-normal">Margin</th>
                  <th scope="col" className="px-3 py-3 text-right font-normal">Break-even units</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-t border-white/[0.06] bg-[#0B0B0B] text-white/80">
                    <th scope="row" className="px-3 py-3 text-left font-normal text-white/80">{r.name}</th>
                    <td className="px-3 py-3 text-right">{money(r.revenue)}</td>
                    <td className="px-3 py-3 text-right">{money(r.grossProfit)}</td>
                    <td className="px-3 py-3 text-right">{money(r.contributionPerUnit)}</td>
                    <td className="px-3 py-3 text-right">{r.margin.toFixed(1)}%</td>
                    <td className="px-3 py-3 text-right">{r.breakEvenUnits ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </div>
    </section>
  );
}
