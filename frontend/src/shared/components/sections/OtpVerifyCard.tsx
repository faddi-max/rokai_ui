import { ArrowUpRight, Loader2, RefreshCw } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import SectionGlow from "../layout/SectionGlow";

interface OtpVerifyCardProps {
  email: string;
  onSubmit: (otp: string) => Promise<void>;
  onResend: () => Promise<void>;
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
  "h-[49px] w-full rounded-[6px] border border-[#383838] bg-[#101010] px-[14px] font-space-grotesk text-center text-[22px] tracking-[8px] text-white placeholder:text-[#757575] placeholder:tracking-normal placeholder:text-[16px] transition-all duration-300 hover:border-[#555] focus:border-[#e63946] focus:ring-1 focus:ring-[#e63946]/50 focus:outline-none";

const labelClass =
  "font-space-grotesk text-[12px] font-bold uppercase tracking-[1px] text-[#bcbcbc]";

export default function OtpVerifyCard({ email, onSubmit, onResend }: OtpVerifyCardProps) {
  const [otp, setOtp] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length < 4) {
      setError("Please enter a valid verification code.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await onSubmit(otp.trim());
    } catch (err) {
      setError((err as Error).message || "Invalid OTP code. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    setResending(true);
    setError(null);
    setSuccessMessage(null);
    try {
      await onResend();
      setSuccessMessage("New OTP code has been sent to your email.");
    } catch (err) {
      setError((err as Error).message || "Failed to resend OTP.");
    } finally {
      setResending(false);
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
            className="flex flex-col gap-6 px-6 py-10 sm:px-[42px]"
          >
            <motion.span
              variants={itemVariants}
              className="font-space-grotesk text-[10px] font-bold uppercase tracking-[1.8px] text-[#e63946]"
            >
              Email Verification
            </motion.span>

            <motion.div variants={itemVariants} className="flex flex-col gap-3">
              <h3 className="font-space-grotesk text-[27px] font-bold uppercase leading-[29.7px] text-[#f7f7f5]">
                Enter Verification Code
              </h3>
              <p className="font-space-grotesk text-[13px] leading-[20.8px] text-[#c0c0c0]">
                We have sent a one-time verification code to <span className="text-white font-medium">{email || "your email"}</span>. Enter it below to activate your account.
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

            {successMessage && (
              <motion.div
                variants={itemVariants}
                className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 font-space-grotesk text-[12px] text-emerald-400"
              >
                {successMessage}
              </motion.div>
            )}

            <motion.div variants={itemVariants} className="flex flex-col gap-2">
              <label htmlFor="otp-code" className={labelClass}>Verification Code (OTP)</label>
              <input
                id="otp-code"
                type="text"
                required
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="------"
                autoComplete="one-time-code"
                className={inputClass}
              />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <button
                type="button"
                disabled={resending}
                onClick={handleResendOtp}
                className="flex items-center gap-2 font-space-grotesk text-[12px] text-[#c0c0c0] transition-colors hover:text-white disabled:opacity-50"
              >
                <RefreshCw size={14} className={resending ? "animate-spin" : ""} />
                {resending ? "Sending code..." : "Resend OTP code"}
              </button>

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
                    Verifying...
                  </>
                ) : (
                  <>
                    Verify OTP
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