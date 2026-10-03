import { ArrowUpRight, Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import SectionGlow from "../layout/SectionGlow";
import {
  LIMITS,
  validateConfirmPassword,
  validateNewPassword,
} from "@/shared/utils/formValidation";

interface ResetPasswordCardProps {
  email: string;
  onSubmit: (password: string) => Promise<void>;
  onBackToLogin?: () => void;
}

const formVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

const inputClass =
  "h-[49px] w-full rounded-[6px] border border-[#383838] bg-[#101010] px-[14px] font-space-grotesk text-[16px] text-white placeholder:text-[#757575] transition-all duration-300 hover:border-[#555] focus:border-[#e63946] focus:ring-1 focus:ring-[#e63946]/50 focus:outline-none";

const labelClass =
  "font-space-grotesk text-[12px] font-bold uppercase tracking-[1px] text-[#bcbcbc]";

export default function ResetPasswordCard({
  email,
  onSubmit,
  onBackToLogin,
}: ResetPasswordCardProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;

    const nextPasswordError = validateNewPassword(password);
    const nextConfirmError = validateConfirmPassword(password, confirmPassword);
    setPasswordError(nextPasswordError);
    setConfirmError(nextConfirmError);
    setError("");
    if (nextPasswordError || nextConfirmError) {
      document
        .getElementById(nextPasswordError ? "reset-password" : "reset-confirm-password")
        ?.focus();
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit(password);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Couldn't reset your password. Please try again."
      );
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
              Code verified
            </motion.span>

            <motion.div variants={itemVariants} className="flex flex-col gap-3">
              <h3 className="font-space-grotesk text-[27px] font-bold uppercase leading-[29.7px] text-[#f7f7f5]">
                Set a new password
              </h3>
              <p className="font-space-grotesk text-[13px] leading-[20.8px] text-[#c0c0c0]">
                Choose a new password for{" "}
                <span className="break-all font-medium text-white">{email}</span>.
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

            <motion.div variants={itemVariants} className="flex flex-col gap-2">
              <label htmlFor="reset-email" className={labelClass}>
                Email address
              </label>
              <input
                id="reset-email"
                type="email"
                value={email}
                readOnly
                autoComplete="email"
                className={`${inputClass} cursor-not-allowed opacity-60`}
              />
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-2">
              <label htmlFor="reset-password" className={labelClass}>
                New password
              </label>
              <div className="relative">
                <input
                  id="reset-password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  minLength={LIMITS.passwordMin}
                  maxLength={LIMITS.passwordMax}
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setPasswordError("");
                    setConfirmError("");
                    setError("");
                  }}
                  placeholder="8 or more characters"
                  aria-invalid={!!passwordError}
                  aria-describedby={passwordError ? "reset-password-error" : "reset-password-hint"}
                  className={`${inputClass} pr-12 ${passwordError ? "border-red-500" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-[#a0a0a0] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#e63946]"
                >
                  {showPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
                </button>
              </div>
              {passwordError ? (
                <p id="reset-password-error" className="text-xs text-red-400">
                  {passwordError}
                </p>
              ) : (
                <p id="reset-password-hint" className="text-xs text-[#858585]">
                  Use at least 8 characters with one letter and one number.
                </p>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-2">
              <label htmlFor="reset-confirm-password" className={labelClass}>
                Confirm new password
              </label>
              <div className="relative">
                <input
                  id="reset-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  maxLength={LIMITS.passwordMax}
                  value={confirmPassword}
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
                    setConfirmError("");
                    setError("");
                  }}
                  placeholder="Re-enter your new password"
                  aria-invalid={!!confirmError}
                  aria-describedby={confirmError ? "reset-confirm-password-error" : undefined}
                  className={`${inputClass} pr-12 ${confirmError ? "border-red-500" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((visible) => !visible)}
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirmation password"
                      : "Show confirmation password"
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
              {confirmError && (
                <p id="reset-confirm-password-error" className="text-xs text-red-400">
                  {confirmError}
                </p>
              )}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <button
                type="button"
                onClick={onBackToLogin}
                className="w-fit font-space-grotesk text-[12px] text-[#c0c0c0] transition-colors hover:text-white"
              >
                Back to login
              </button>

              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={!submitting ? { scale: 1.04, boxShadow: "0 6px 20px rgba(230,57,70,0.45)" } : undefined}
                whileTap={!submitting ? { scale: 0.96 } : undefined}
                className="group flex h-[37px] w-fit items-center gap-[25px] rounded-[6px] bg-[#e63946] px-[13px] font-space-grotesk text-[13px] font-medium text-white transition-colors hover:bg-[#ee4250] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Resetting...
                  </>
                ) : (
                  <>
                    Reset password
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
