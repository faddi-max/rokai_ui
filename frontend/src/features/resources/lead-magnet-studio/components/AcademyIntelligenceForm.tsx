import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Loader2 } from "lucide-react";
import SectionGlow from "@/shared/components/layout/SectionGlow";

/* -------------------------------------------------------------------------- */
/*  Types — API-ready                                                         */
/* -------------------------------------------------------------------------- */

export type AcademyFormValues = Record<string, string>;

interface TextFieldConfig {
  name: string;
  label: string;
  placeholder: string;
  type?: "text" | "email" | "url" | "number";
  required?: boolean;
  fullWidth?: boolean;
}

interface ScoreFieldConfig {
  name: string;
  label: string;
  hint: string;
}

export interface AcademyIntelligenceFormProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  onGenerate?: (values: AcademyFormValues) => Promise<void> | void;
}

/* -------------------------------------------------------------------------- */
/*  Field config (score labels inferred from a low-res screenshot — verify)   */
/* -------------------------------------------------------------------------- */

const PROFILE_FIELDS: TextFieldConfig[] = [
  { name: "academyName", label: "Academy Name", placeholder: "e.g. Rokai Academy", required: true, fullWidth: true },
  { name: "ownerName", label: "Owner Name", placeholder: "Your full name", required: true },
  { name: "email", label: "Email Address", placeholder: "you@example.com", type: "email", required: true },
  { name: "website", label: "Website URL", placeholder: "https://yourwebsite.com", type: "url" },
  { name: "instagram", label: "Instagram Handle", placeholder: "@yourhandle" },
  { name: "studentCount", label: "Student Count", placeholder: "e.g. 75", type: "number" },
  { name: "academyAge", label: "Academy Age (Years)", placeholder: "e.g. 5", type: "number" },
];

const SCORE_FIELDS: ScoreFieldConfig[] = [
  { name: "brandIdentity", label: "Brand Identity", hint: "Logo, colors and visual consistency" },
  { name: "teamIdentity", label: "Team Identity", hint: "Uniform and team pride" },
  { name: "communityStrength", label: "Community Strength", hint: "Member loyalty and retention" },
  { name: "contentMarketing", label: "Content Marketing", hint: "Posts, videos and reach" },
  { name: "socialPresence", label: "Social Media Presence", hint: "Following and engagement" },
  { name: "memberExperience", label: "Member Experience", hint: "Onboarding and day-to-day service" },
  { name: "merchSystem", label: "Merchandise System", hint: "Apparel ordering and sales" },
  { name: "leadershipCulture", label: "Leadership Culture", hint: "Coaching and values" },
];

const DEFAULT_SCORE = "50";

const buildInitialValues = (): AcademyFormValues => ({
  ...Object.fromEntries(PROFILE_FIELDS.map((f) => [f.name, ""])),
  ...Object.fromEntries(SCORE_FIELDS.map((f) => [f.name, DEFAULT_SCORE])),
});

/* -------------------------------------------------------------------------- */
/*  Shared styles — identical to the affiliate Login / Signup cards           */
/* -------------------------------------------------------------------------- */

const formVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

const inputClass =
  "h-[49px] w-full rounded-[6px] border border-[#383838] bg-[#101010] px-[14px] font-space-grotesk text-[16px] text-white placeholder:text-[#757575] transition-all duration-300 hover:border-[#555] focus:border-[#e63946] focus:ring-1 focus:ring-[#e63946]/50 focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";

const labelClass =
  "font-space-grotesk text-[12px] font-bold uppercase tracking-[1px] text-[#bcbcbc]";

const buttonBase =
  "group flex h-[37px] items-center gap-[25px] rounded-[6px] px-[13px] font-space-grotesk text-[13px] font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-70";

/* -------------------------------------------------------------------------- */
/*  Small pieces                                                              */
/* -------------------------------------------------------------------------- */

function GroupHeading({ title, meta }: { title: string; meta: string }) {
  return (
    <div className="flex items-center gap-4 border-b border-[#292929] pb-3">
      <h3 className="font-space-grotesk text-[12px] font-bold uppercase tracking-[1px] text-[#f7f7f5]">
        {title}
      </h3>
      <span className="ml-auto font-space-grotesk text-[10px] uppercase tracking-[0.6px] text-[#777]">
        {meta}
      </span>
    </div>
  );
}

function TextField({
  config,
  value,
  onChange,
}: {
  config: TextFieldConfig;
  value: string;
  onChange: (name: string, value: string) => void;
}) {
  const { name, label, placeholder, type = "text", required, fullWidth } = config;
  const id = `academy-${name}`;

  return (
    <div className={`flex flex-col gap-2 ${fullWidth ? "md:col-span-2" : ""}`}>
      <label htmlFor={id} className={labelClass}>
        {label}
        {required && <span className="text-[#e63946]"> *</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        min={type === "number" ? 0 : undefined}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(name, e.target.value)}
        className={inputClass}
      />
    </div>
  );
}

function ScoreField({
  config,
  value,
  onChange,
}: {
  config: ScoreFieldConfig;
  value: string;
  onChange: (name: string, value: string) => void;
}) {
  const { name, label, hint } = config;
  const id = `academy-${name}`;

  const handleChange = (raw: string) => {
    if (raw === "") return onChange(name, "");
    const n = Math.min(100, Math.max(0, Math.round(Number(raw))));
    onChange(name, Number.isNaN(n) ? "" : String(n));
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className={labelClass}>
        {label}
        <span className="mt-1 block text-[10px] font-normal normal-case tracking-normal text-[#777]">
          {hint}
        </span>
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type="number"
          inputMode="numeric"
          min={0}
          max={100}
          required
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          className={`${inputClass} pr-16`}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute right-[14px] top-1/2 -translate-y-1/2 font-space-grotesk text-[11px] text-[#757575]"
        >
          / 100
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

export default function AcademyIntelligenceForm({
  eyebrow = "Academy identity assessment",
  title = "Academy Core Intelligence",
  description = "Complete your academy profile and rate your current performance from 0 to 100.",
  onGenerate,
}: AcademyIntelligenceFormProps) {
  const [values, setValues] = useState<AcademyFormValues>(buildInitialValues);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = (name: string, value: string) =>
    setValues((prev) => ({ ...prev, [name]: value }));

  const handleReset = () => {
    setValues(buildInitialValues());
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await onGenerate?.(values);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SectionGlow>
      <div className="mx-5 mb-16 flex items-center justify-center sm:mx-8 lg:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-[1360px] overflow-hidden rounded-[14px] border border-[#303030] bg-[#111] shadow-2xl transition-all duration-500 hover:border-[#e63946]/40"
          style={{
            backgroundImage:
              "radial-gradient(circle at top right, rgba(230,57,70,0.18) 0%, rgba(230,57,70,0) 45%)",
          }}
        >
          <motion.form
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 px-6 py-10 sm:px-[42px]"
          >
            {/* Header */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-3 border-l-2 border-[#e63946] pl-4"
            >
              <span className="font-space-grotesk text-[10px] font-bold uppercase tracking-[1.8px] text-[#e63946]">
                {eyebrow}
              </span>
              <h2 className="font-space-grotesk text-[26px] font-bold leading-[1.15] text-[#f7f7f5] sm:text-[32px]">
                {title}
              </h2>
              <p className="max-w-[560px] font-space-grotesk text-[13px] leading-[20.8px] text-[#c0c0c0]">
                {description}
              </p>
            </motion.div>

            {error && (
              <motion.div
                variants={itemVariants}
                role="alert"
                className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 font-space-grotesk text-[12px] text-red-400"
              >
                {error}
              </motion.div>
            )}

            {/* Academy profile */}
            <motion.div variants={itemVariants} className="mt-4 flex flex-col gap-6">
              <GroupHeading title="Academy Profile" meta="Step 1 of 2" />
              <div className="grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-2">
                {PROFILE_FIELDS.map((field) => (
                  <TextField
                    key={field.name}
                    config={field}
                    value={values[field.name]}
                    onChange={update}
                  />
                ))}
              </div>
            </motion.div>

            {/* Core identity benchmarking */}
            <motion.div variants={itemVariants} className="mt-4 flex flex-col gap-6">
              <GroupHeading title="Core Identity Benchmarking" meta="Score 0 – 100" />
              <div className="grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-2">
                {SCORE_FIELDS.map((field) => (
                  <ScoreField
                    key={field.name}
                    config={field}
                    value={values[field.name]}
                    onChange={update}
                  />
                ))}
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div variants={itemVariants} className="mt-2 flex flex-wrap items-center gap-3">
              <motion.button
                type="button"
                onClick={handleReset}
                whileTap={{ scale: 0.96 }}
                className={`${buttonBase} border border-white/25 bg-transparent hover:border-white/50`}
              >
                Reset Form
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </motion.button>

              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={
                  !submitting
                    ? { scale: 1.04, boxShadow: "0 6px 20px rgba(230,57,70,0.45)" }
                    : undefined
                }
                whileTap={!submitting ? { scale: 0.96 } : undefined}
                className={`${buttonBase} bg-[#e63946] hover:bg-[#ee4250]`}
              >
                {submitting ? (
                  <>
                    Generating...
                    <Loader2 size={16} className="animate-spin" />
                  </>
                ) : (
                  <>
                    Generate
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </>
                )}
              </motion.button>
            </motion.div>
          </motion.form>
        </motion.div>
      </div>
    </SectionGlow>
  );
}