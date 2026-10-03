import { ArrowUpRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import SectionGlow from "../layout/SectionGlow";
import { LIMITS, validateEmail } from "@/shared/utils/formValidation";

interface ForgotPasswordCardProps {
  defaultEmail?: string;
  onSubmit: (email: string) => Promise<void>;
  onBackToLogin?: (email: string) => void;
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

export default function ForgotPasswordCard({
  defaultEmail = "",
  onSubmit,
  onBackToLogin,
}: ForgotPasswordCardProps) {
  const [email, setEmail] = useState(defaultEmail);
  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;

    const validationMessage = validateEmail(email);
    setEmailError(validationMessage);
    setError("");
    if (validationMessage) {
      document.getElementById("forgot-email")?.focus();
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit(email.trim());
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Couldn't send the reset code. Please try again."
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
              Password recovery
            </motion.span>

            <motion.div variants={itemVariants} className="flex flex-col gap-3">
              <h3 className="font-space-grotesk text-[27px] font-bold uppercase leading-[29.7px] text-[#f7f7f5]">
                Forgot your password?
              </h3>
              <p className="font-space-grotesk text-[13px] leading-[20.8px] text-[#c0c0c0]">
                Enter your affiliate account email and we&apos;ll send you a verification code to
                reset your password.
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
              <label htmlFor="forgot-email" className={labelClass}>
                Email address
              </label>
              <input
                id="forgot-email"
                type="email"
                required
                autoComplete="email"
                maxLength={LIMITS.emailMax}
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setEmailError("");
                  setError("");
                }}
                onBlur={() => {
                  if (email.trim()) setEmailError(validateEmail(email));
                }}
                placeholder="you@example.com"
                aria-invalid={!!emailError}
                aria-describedby={emailError ? "forgot-email-error" : undefined}
                className={`${inputClass} ${emailError ? "border-red-500" : ""}`}
              />
              {emailError && (
                <p id="forgot-email-error" className="text-xs text-red-400" role="alert">
                  {emailError}
                </p>
              )}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <button
                type="button"
                onClick={() => onBackToLogin?.(email.trim())}
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
                    Sending...
                  </>
                ) : (
                  <>
                    Send code
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
