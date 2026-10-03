import { ArrowUpRight, Check, Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import SectionGlow from "../layout/SectionGlow";
import {
  LIMITS,
  normalizeName,
  validateConfirmPassword,
  validateEmail,
  validateFullName,
  validateNewPassword,
} from "@/shared/utils/formValidation";

export interface SignupValues {
  full_name: string;
  email: string;
  password: string;
}

interface SignupCardProps {
  onSubmit: (values: SignupValues) => Promise<void>;
  onSwitchToLogin?: () => void;
}

type FieldKey = "full_name" | "email" | "password" | "confirmPassword" | "terms";

const FIELD_ORDER: FieldKey[] = ["full_name", "email", "password", "confirmPassword", "terms"];

const FIELD_IDS: Record<FieldKey, string> = {
  full_name: "signup-name",
  email: "signup-email",
  password: "signup-password",
  confirmPassword: "signup-confirm-password",
  terms: "signup-terms",
};

const formVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

const inputClass =
  "h-[49px] w-full rounded-[6px] border bg-[#101010] px-[14px] font-space-grotesk text-[16px] text-white placeholder:text-[#757575] transition-all duration-300 hover:border-[#555] focus:border-[#e63946] focus:ring-1 focus:ring-[#e63946]/50 focus:outline-none";

const borderFor = (hasError: boolean) => (hasError ? "border-red-500" : "border-[#383838]");

const labelClass =
  "font-space-grotesk text-[12px] font-bold uppercase tracking-[1px] text-[#bcbcbc]";

export default function SignupCard({ onSubmit, onSwitchToLogin }: SignupCardProps) {
  const [values, setValues] = useState<SignupValues>({ full_name: "", email: "", password: "" });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldKey, string>>>({});

  const validateField = (key: FieldKey): string => {
    switch (key) {
      case "full_name":
        return validateFullName(values.full_name);
      case "email":
        return validateEmail(values.email);
      case "password":
        return validateNewPassword(values.password);
      case "confirmPassword":
        return validateConfirmPassword(values.password, confirmPassword);
      case "terms":
        return agree ? "" : "Please agree to the affiliate terms to continue.";
    }
  };

  const setFieldError = (key: FieldKey, message: string) =>
    setFieldErrors((prev) => ({ ...prev, [key]: message }));

  // Validate on blur, but only once the user has typed something
  const handleBlur = (key: FieldKey, hasValue: boolean) => () => {
    if (hasValue) setFieldError(key, validateField(key));
  };

  const update = (key: keyof SignupValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValues((prev) => ({ ...prev, [key]: value }));
    setFieldError(key, "");
    setError(null);

    // Keep the mismatch message live while editing the password
    if (key === "password" && confirmPassword) {
      setFieldError("confirmPassword", validateConfirmPassword(value, confirmPassword));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    const errors = Object.fromEntries(
      FIELD_ORDER.map((key) => [key, validateField(key)])
    ) as Record<FieldKey, string>;
    setFieldErrors(errors);

    const firstInvalid = FIELD_ORDER.find((key) => errors[key]);
    if (firstInvalid) {
      setError("Please review the highlighted fields.");
      document.getElementById(FIELD_IDS[firstInvalid])?.focus();
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      await onSubmit({
        full_name: normalizeName(values.full_name),
        email: values.email.trim(),
        password: values.password,
      });
    } catch (err) {
      setError((err as Error).message || "Couldn't create your account. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SectionGlow>
      <div className="m-5 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-[774px] overflow-hidden rounded-[14px] border border-[#303030] bg-[#111] shadow-2xl transition-all duration-500 hover:border-[#e63946]/40"
          style={{
            backgroundImage:
              "radial-gradient(circle at top right, rgba(230,57,70,0.18) 0%, rgba(230,57,70,0) 45%)",
          }}
        >
          <motion.form
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-6 px-6 py-10 sm:px-[42px]"
          >
            <motion.span
              variants={itemVariants}
              className="font-space-grotesk text-[10px] font-bold uppercase tracking-[1.8px] text-[#e63946]"
            >
              New to Rokai?
            </motion.span>

            <motion.div variants={itemVariants} className="flex flex-col gap-3">
              <h3 className="font-space-grotesk text-[27px] font-bold uppercase leading-[29.7px] text-[#f7f7f5]">
                Create your account
              </h3>
              <p className="font-space-grotesk text-[13px] leading-[20.8px] text-[#c0c0c0]">
                Sign up once to get your referral link, dashboard access and earnings tracking.
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

            {/* Full name */}
            <motion.div variants={itemVariants} className="flex flex-col gap-2">
              <label htmlFor="signup-name" className={labelClass}>
                Full name
              </label>
              <input
                id="signup-name"
                type="text"
                required
                value={values.full_name}
                onChange={update("full_name")}
                onBlur={handleBlur("full_name", !!values.full_name)}
                placeholder="Your full name"
                autoComplete="name"
                maxLength={LIMITS.nameMax}
                aria-invalid={!!fieldErrors.full_name}
                aria-describedby={fieldErrors.full_name ? "signup-name-error" : undefined}
                className={`${inputClass} ${borderFor(!!fieldErrors.full_name)}`}
              />
              {fieldErrors.full_name && (
                <p id="signup-name-error" className="text-xs text-red-400">
                  {fieldErrors.full_name}
                </p>
              )}
            </motion.div>

            {/* Email */}
            <motion.div variants={itemVariants} className="flex flex-col gap-2">
              <label htmlFor="signup-email" className={labelClass}>
                Email address
              </label>
              <input
                id="signup-email"
                type="email"
                required
                value={values.email}
                onChange={update("email")}
                onBlur={handleBlur("email", !!values.email)}
                placeholder="you@example.com"
                autoComplete="email"
                maxLength={254}
                aria-invalid={!!fieldErrors.email}
                aria-describedby={fieldErrors.email ? "signup-email-error" : undefined}
                className={`${inputClass} ${borderFor(!!fieldErrors.email)}`}
              />
              {fieldErrors.email && (
                <p id="signup-email-error" className="text-xs text-red-400">
                  {fieldErrors.email}
                </p>
              )}
            </motion.div>

            {/* Password */}
            <motion.div variants={itemVariants} className="flex flex-col gap-2">
              <label htmlFor="signup-password" className={labelClass}>
                Password
              </label>
              <div className="relative">
                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={values.password}
                  onChange={update("password")}
                  onBlur={handleBlur("password", !!values.password)}
                  placeholder="8–128 characters"
                  autoComplete="new-password"
                  minLength={LIMITS.passwordMin}
                  maxLength={LIMITS.passwordMax}
                  aria-invalid={!!fieldErrors.password}
                  aria-describedby={
                    fieldErrors.password ? "signup-password-error" : "signup-password-hint"
                  }
                  className={`${inputClass} pr-12 ${borderFor(!!fieldErrors.password)}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-[#a0a0a0] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#e63946]"
                >
                  {showPassword ? (
                    <EyeOff size={18} aria-hidden="true" />
                  ) : (
                    <Eye size={18} aria-hidden="true" />
                  )}
                </button>
              </div>
              {fieldErrors.password ? (
                <p id="signup-password-error" className="text-xs text-red-400">
                  {fieldErrors.password}
                </p>
              ) : (
                <p id="signup-password-hint" className="text-xs text-[#858585]">
                  Use 8 or more characters with at least one letter and one number.
                </p>
              )}
            </motion.div>

            {/* Confirm password */}
            <motion.div variants={itemVariants} className="flex flex-col gap-2">
              <label htmlFor="signup-confirm-password" className={labelClass}>
                Confirm password
              </label>
              <div className="relative">
                <input
                  id="signup-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setFieldError("confirmPassword", "");
                    setError(null);
                  }}
                  onBlur={handleBlur("confirmPassword", !!confirmPassword)}
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  maxLength={LIMITS.passwordMax}
                  aria-invalid={!!fieldErrors.confirmPassword}
                  aria-describedby={
                    fieldErrors.confirmPassword ? "signup-confirm-password-error" : undefined
                  }
                  className={`${inputClass} pr-12 ${borderFor(!!fieldErrors.confirmPassword)}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((visible) => !visible)}
                  aria-label={
                    showConfirmPassword ? "Hide confirmation password" : "Show confirmation password"
                  }
                  aria-pressed={showConfirmPassword}
                  className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-[#a0a0a0] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#e63946]"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} aria-hidden="true" />
                  ) : (
                    <Eye size={18} aria-hidden="true" />
                  )}
                </button>
              </div>
              {fieldErrors.confirmPassword && (
                <p id="signup-confirm-password-error" className="text-xs text-red-400">
                  {fieldErrors.confirmPassword}
                </p>
              )}
            </motion.div>

            {/* Terms + submit */}
            <motion.div variants={itemVariants} className="flex flex-col gap-3">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <label className="flex cursor-pointer items-center gap-[13px]">
                  <input
                    id="signup-terms"
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => {
                      setAgree(e.target.checked);
                      setFieldError("terms", "");
                      setError(null);
                    }}
                    aria-invalid={!!fieldErrors.terms}
                    aria-describedby={fieldErrors.terms ? "signup-terms-error" : undefined}
                    className="size-[13px] rounded-[2.5px] border border-[#767676] bg-white accent-[#e63946]"
                  />
                  <span className="font-space-grotesk text-[11px] leading-[17.6px] text-[#c0c0c0]">
                    I agree to the affiliate program terms
                  </span>
                </label>

                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={{ scale: 1.04, boxShadow: "0 6px 20px rgba(230,57,70,0.45)" }}
                  whileTap={{ scale: 0.96 }}
                  className="group flex h-[37px] w-fit items-center gap-[25px] rounded-[6px] bg-[#e63946] px-[13px] font-space-grotesk text-[13px] font-medium text-white transition-colors hover:bg-[#ee4250] disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      Sign up
                      <ArrowUpRight
                        size={16}
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </>
                  )}
                </motion.button>
              </div>

              {fieldErrors.terms && (
                <p id="signup-terms-error" role="alert" className="text-xs text-red-400">
                  {fieldErrors.terms}
                </p>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-2">
              <span className="flex h-[16px] items-center rounded-[2px] border border-[#424242] px-[3px]">
                <Check size={10} className="text-[#e63946]" />
              </span>
              <span className="font-space-grotesk text-[10px] uppercase tracking-[0.6px] text-[#777]">
                Secure affiliate account access
              </span>
            </motion.div>

            <motion.div variants={itemVariants} className="border-t border-[#292929] pt-6">
              <p className="font-space-grotesk text-[13px] leading-[20.8px] text-[#c0c0c0]">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className="text-[#e63946] transition-opacity hover:underline hover:opacity-80"
                >
                  Log in
                </button>
              </p>
            </motion.div>
          </motion.form>
        </motion.div>
      </div>
    </SectionGlow>
  );
}