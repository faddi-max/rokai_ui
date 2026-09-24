import { useState } from "react";
import { ArrowUpRight, Diamond, Loader2, CheckCircle2, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


export interface ApplyBenefit {
  title: string;
  description: string;
}

export interface ApplyFormConfig {
  /** Small pill above the brand name, e.g. "ECOMMERCE PROGRAM" */
  badge: string;
  /** Big brand word under the badge, e.g. "ROKAI" */
  brandName: string;
  /** e.g. "WHAT YOU UNLOCK" */
  benefitsHeading: string;
  benefits: ApplyBenefit[];
  /** e.g. "© 2026 ROKAI CORP" */
  footerNote: string;

  /** Right panel */
  eyebrow: string; // "QUICK APPLICATION"
  title: string; // "APPLY NOW—ONLY A FEW PARTNER SPOTS LEFT"
  description: string;
  organizationLabel: string; // "GYM / ACADEMY"
  memberOptions: string[]; // ["< 30", "30+", "75+", "150+"]
  lookingForOptions: string[]; // ["Sponsorship", "Custom Apparel", "Both"]
  termsLabel: string;
  submitLabel: string;
  secureNote: string; // "Secure Application — Your information stays private"

  accentColor?: string;
}

export interface ApplyFormValues {
  full_name: string;
  email: string;
  whatsapp: string;
  organization: string;
  social_handle: string;
  members: string;
  looking_for: string;
  agree_terms: boolean;
}

interface PartnershipApplyFormProps {
  config: ApplyFormConfig;
  onSubmit: (
    values: ApplyFormValues
  ) => Promise<{ success: boolean; id?: string | number; message?: string }>;
  className?: string;
}

const EMPTY_VALUES: ApplyFormValues = {
  full_name: "",
  email: "",
  whatsapp: "",
  organization: "",
  social_handle: "",
  members: "",
  looking_for: "",
  agree_terms: false,
};

export default function PartnershipApplyForm({
  config,
  onSubmit,
  className = "",
}: PartnershipApplyFormProps) {
  const accent = config.accentColor || "#E63946";

  const [values, setValues] = useState<ApplyFormValues>(EMPTY_VALUES);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{
    id?: string | number;
    message?: string;
  } | null>(null);

  const update = <K extends keyof ApplyFormValues>(key: K, val: ApplyFormValues[K]) =>
    setValues((prev) => ({ ...prev, [key]: val }));

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => update(e.target.name as keyof ApplyFormValues, e.target.value as never);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!values.agree_terms) {
      setError("Please agree to be contacted before submitting.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await onSubmit(values);
      if (res.success) {
        setSuccess({ id: res.id, message: res.message });
      } else {
        setError(res.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError((err as Error).message || "Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className={`mx-auto grid w-full max-w-[1180px] overflow-hidden rounded-2xl border border-white/10 shadow-2xl md:grid-cols-[460px_1fr] font-space-grotesk ${className}`}
    >
      {/* LEFT — BENEFITS PANEL */}
      <div className="flex flex-col justify-between bg-[#F5F3F1] px-7 py-8 text-black">
        <div>
          <span
            className="inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white"
            style={{ backgroundColor: accent }}
          >
            {config.badge}
          </span>

          <h2
            className="mt-4 text-2xl font-extrabold uppercase tracking-tight"
            style={{ color: accent }}
          >
            {config.brandName}
          </h2>

          <h3 className="mt-6 text-xs font-bold uppercase tracking-wider text-black/70">
            {config.benefitsHeading}
          </h3>

          <ul className="mt-3 divide-y divide-black/10">
            {config.benefits.map((b, i) => (
              <li key={i} className="flex gap-3 py-3">
                <Diamond
                  size={10}
                  className="mt-1 shrink-0 fill-current"
                  style={{ color: accent }}
                />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-black">
                    {b.title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-black/55">
                    {b.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-8 text-[10px] text-black/40">{config.footerNote}</p>
      </div>

      {/* RIGHT — QUICK APPLICATION FORM */}
      <div
        className="px-6 py-8 text-white sm:px-9 sm:py-9"
        style={{
          backgroundColor: "#111111",
          backgroundImage:
            "radial-gradient(161.91% 127.15% at 100% 0%, rgba(230, 57, 70, 0.13) 0%, rgba(230, 57, 70, 0) 34%)",
        }}
      >
        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex h-full flex-col items-center justify-center py-10 text-center"
            >
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full"
                style={{ backgroundColor: `${accent}22`, color: accent }}
              >
                <CheckCircle2 size={30} />
              </div>
              <h3 className="mt-4 text-xl font-bold uppercase text-white">
                Application Received
              </h3>
              <p className="mt-2 max-w-[380px] text-xs text-white/60">
                {success.message ||
                  "Thanks for applying. Our partnerships team will review your application and reach out shortly."}
              </p>
              {success.id && (
                <div className="mt-4 rounded-md border border-white/10 bg-black/40 px-3 py-1.5 text-[11px] text-white/60">
                  Reference:{" "}
                  <span className="font-mono font-bold" style={{ color: accent }}>
                    {success.id}
                  </span>
                </div>
              )}
              <button
                type="button"
                onClick={() => {
                  setSuccess(null);
                  setValues(EMPTY_VALUES);
                }}
                className="mt-6 rounded-md border border-white/20 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-white transition hover:border-white/50"
              >
                Submit Another Application
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="flex h-full flex-col"
            >
              <span
                className="text-[10px] font-bold uppercase tracking-[0.2em]"
                style={{ color: accent }}
              >
                {config.eyebrow}
              </span>
              <h2 className="mt-2 text-[28px] font-bold uppercase leading-[1.08] tracking-[-1px] text-white sm:text-[38px] sm:tracking-[-1.6px] lg:text-[52px] lg:leading-[53.04px] lg:tracking-[-2.6px]">
                {config.title}
              </h2>
              <p className="mt-3 text-xs text-white/50">{config.description}</p>

              {error && (
                <div className="mt-4 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-[11px] text-red-400">
                  {error}
                </div>
              )}

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Full Name" required>
                  <input
                    name="full_name"
                    required
                    value={values.full_name}
                    onChange={handleTextChange}
                    placeholder="Your full name"
                    className={inputClass}
                  />
                </Field>
                <Field label="Email" required>
                  <input
                    type="email"
                    name="email"
                    required
                    value={values.email}
                    onChange={handleTextChange}
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </Field>
                <Field label="WhatsApp Number" required>
                  <input
                    name="whatsapp"
                    required
                    value={values.whatsapp}
                    onChange={handleTextChange}
                    placeholder="+00 000 0000000"
                    className={inputClass}
                  />
                </Field>
                <Field label={config.organizationLabel}>
                  <input
                    name="organization"
                    value={values.organization}
                    onChange={handleTextChange}
                    placeholder="Academy name"
                    className={inputClass}
                  />
                </Field>
              </div>

              <div className="mt-4">
                <Field label="Instagram / Website">
                  <input
                    name="social_handle"
                    value={values.social_handle}
                    onChange={handleTextChange}
                    placeholder="https://"
                    className={inputClass}
                  />
                </Field>
              </div>

              <div className="mt-4">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-white/60">
                  Number Of Members
                </p>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  {config.memberOptions.map((opt) => (
                    <PillOption
                      key={opt}
                      label={opt}
                      active={values.members === opt}
                      accent={accent}
                      onClick={() => update("members", opt)}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-white/60">
                  What Are You Looking For?
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {config.lookingForOptions.map((opt) => (
                    <PillOption
                      key={opt}
                      label={opt}
                      active={values.looking_for === opt}
                      accent={accent}
                      onClick={() => update("looking_for", opt)}
                      grow
                    />
                  ))}
                </div>
              </div>

              <label className="mt-5 flex items-start gap-2 text-[11px] text-white/50">
                <input
                  type="checkbox"
                  checked={values.agree_terms}
                  onChange={(e) => update("agree_terms", e.target.checked)}
                  className="mt-0.5 h-3.5 w-3.5 rounded border-white/20 bg-black"
                  style={{ accentColor: accent }}
                />
                {config.termsLabel}
              </label>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <span className="flex items-center gap-1.5 text-[10px] text-white/35">
                  <Check size={12} className="shrink-0" style={{ color: accent }} />
                  {config.secureNote}
                </span>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex h-10 items-center gap-2 rounded-md px-5 text-xs font-bold uppercase tracking-wider text-white transition disabled:opacity-50"
                  style={{ backgroundColor: accent }}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="animate-spin" size={14} />
                      Submitting...
                    </>
                  ) : (
                    <>
                      {config.submitLabel}
                      <ArrowUpRight size={14} />
                    </>
                  )}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export { PartnershipApplyForm };

/* ------------------------------------------------------------------ */
/* Small internal presentational helpers                              */
/* ------------------------------------------------------------------ */

const inputClass =
  "h-[51px] w-full rounded-xl border border-[#383838] bg-[#191919] px-4 text-xs text-white placeholder-white/30 transition focus:border-[#E63946] focus:outline-none focus:ring-1 focus:ring-[#E63946]";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-white/60">
        {label} {required && <span className="text-[#E63946]">*</span>}
      </label>
      {children}
    </div>
  );
}

function PillOption({
  label,
  active,
  accent,
  onClick,
  grow,
}: {
  label: string;
  active: boolean;
  accent: string;
  onClick: () => void;
  grow?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-12 rounded-xl border text-[11px] font-semibold uppercase tracking-wide transition ${
        grow ? "flex-1 px-4" : "px-2"
      } ${
        active
          ? "text-white"
          : "border-[#383838] bg-[#191919] text-white/50 hover:border-white/30 hover:text-white"
      }`}
      style={
        active
          ? { backgroundColor: accent, borderColor: accent }
          : undefined
      }
    >
      {label}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Canonical config — matches the Figma "Form" component pixel-for-   */
/* pixel. In the current design file this exact card (badge, benefit  */
/* list, member/looking-for options) is reused verbatim across every  */
/* program page (Ambassador, Sponsorship, Club Partnership) — only    */
/* the hero headline above it changes per page. So every programId    */
/* maps to this same object below. If a specific page's card is later */
/* redesigned to diverge, just give that key its own object instead   */
/* of spreading DEFAULT_APPLY_CONFIG.                                 */
/* ------------------------------------------------------------------ */

export const DEFAULT_APPLY_CONFIG: ApplyFormConfig = {
  badge: "Dominance Program",
  brandName: "ROKAI",
  benefitsHeading: "What You Unlock",
  benefits: [
    { title: "Elite Custom Gear", description: "Turn your academy into a brand your students are proud to represent." },
    { title: "Unmatched Quality", description: "Gear engineered for durability, performance, and serious athletes." },
    { title: "New Revenue Streams", description: "Monetize your brand with exclusive partner pricing and retail margins." },
    { title: "Reliable Production", description: "No delays. No compromises. Fast, consistent delivery you can trust." },
    { title: "Branding Support", description: "We bring your vision to life with professional done-for-you design support." },
    { title: "Team Identity", description: "Build a culture and loyalty that your students feel proud to be part of." },
  ],
  footerNote: "© 2026 ROKAI CORP",
  eyebrow: "Quick Application",
  title: "Apply Now — Only A Few Partner Spots Left",
  description: "Tell us about your academy. The ROKAI team will review your application and contact qualifying clubs.",
  organizationLabel: "Gym / Academy",
  memberOptions: ["< 30", "30+", "75+", "150+"],
  lookingForOptions: ["Sponsorship", "Custom Apparel", "Both"],
  termsLabel: "I agree that ROKAI may contact me regarding this application and partnership opportunities.",
  submitLabel: "Submit Application",
  secureNote: "Secure Application • Your information stays private",
};

export const APPLY_CONFIGS: Record<string, ApplyFormConfig> = {
  partnership: DEFAULT_APPLY_CONFIG,
  ambassador: DEFAULT_APPLY_CONFIG,
  affiliate: DEFAULT_APPLY_CONFIG,
  sponsorship: DEFAULT_APPLY_CONFIG,
};