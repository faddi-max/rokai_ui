import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import SectionGlow from "../layout/SectionGlow";


// Keep your existing variants if you already have them
const formVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

interface LoginCardProps {
  onSubmit?: (email: string, password: string) => Promise<void> | void;
  onSwitchToSignup?: () => void;
  defaultEmail?: string;
  notice?: string;
}

export default function LoginCard({
  onSubmit,
  onSwitchToSignup,
  defaultEmail = "",
  notice,
}: LoginCardProps) {
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitting(true);
    setError(null);

    try {
      await onSubmit?.(email, password);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Login failed. Please check your details."
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
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
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
            className="flex flex-col gap-6 px-[42px] py-10"
          >
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3"
            >
              <span className="font-space-grotesk text-[10px] font-bold uppercase tracking-[1.8px] text-[#e63946]">
                Already signed up?
              </span>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-3"
            >
              <h3 className="font-space-grotesk text-[27px] font-bold uppercase leading-[29.7px] text-[#f7f7f5]">
                Welcome back
              </h3>

              <p className="font-space-grotesk text-[13px] leading-[20.8px] text-[#c0c0c0]">
                Log in to access your affiliate dashboard, referral activity,
                and earnings.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-2"
            >
              <label
                htmlFor="login-email"
                className="font-space-grotesk text-[12px] font-bold uppercase tracking-[1px] text-[#bcbcbc]"
              >
                Email address
              </label>

              <input
                id="login-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-[49px] w-full rounded-[6px] border border-[#383838] bg-[#101010] px-[14px] font-space-grotesk text-[16px] text-white placeholder:text-[#757575] transition-all duration-300 hover:border-[#555] focus:border-[#e63946] focus:ring-1 focus:ring-[#e63946]/50 focus:outline-none"
              />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-2"
            >
              <label
                htmlFor="login-password"
                className="font-space-grotesk text-[12px] font-bold uppercase tracking-[1px] text-[#bcbcbc]"
              >
                Password
              </label>

              <input
                id="login-password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="h-[49px] w-full rounded-[6px] border border-[#383838] bg-[#101010] px-[14px] font-space-grotesk text-[16px] text-white placeholder:text-[#757575] transition-all duration-300 hover:border-[#555] focus:border-[#e63946] focus:ring-1 focus:ring-[#e63946]/50 focus:outline-none"
              />

              <a
                href="#forgot-password"
                className="self-end font-space-grotesk text-[11px] leading-[17.6px] text-[#e63946] transition-opacity hover:opacity-80 hover:underline"
              >
                Forgot password?
              </a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center justify-between"
            >
              <label className="flex cursor-pointer items-center gap-[13px]">
                <input
                  type="checkbox"
                  checked={keepSignedIn}
                  onChange={(e) => setKeepSignedIn(e.target.checked)}
                  className="size-[13px] rounded-[2.5px] border border-[#767676] bg-white accent-[#e63946] transition-transform hover:scale-110"
                />

                <span className="font-space-grotesk text-[11px] leading-[17.6px] text-[#c0c0c0]">
                  Keep me signed in
                </span>
              </label>

              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={
                  !submitting
                    ? {
                        scale: 1.04,
                        boxShadow:
                          "0 6px 20px rgba(230,57,70,0.45)",
                      }
                    : undefined
                }
                whileTap={!submitting ? { scale: 0.96 } : undefined}
                className="group flex h-[37px] items-center gap-[25px] rounded-[6px] bg-[#e63946] px-[13px] font-space-grotesk text-[13px] font-medium text-white transition-colors hover:bg-[#ee4250] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? (
                  <>
                    Logging in...
                    <Loader2
                      size={16}
                      className="animate-spin"
                    />
                  </>
                ) : (
                  <>
                    Login
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </>
                )}
              </motion.button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2"
            >
              <span className="flex h-[16px] items-center rounded-[2px] border border-[#424242] px-[3px]">
                <Check size={10} className="text-[#e63946]" />
              </span>

              <span className="font-space-grotesk text-[10px] uppercase tracking-[0.6px] text-[#777]">
                Secure affiliate account access
              </span>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="font-space-grotesk text-[13px] leading-[20.8px] text-[#c0c0c0]"
            >
              Don't have an account yet?{" "}
              <button
                type="button"
                onClick={onSwitchToSignup}
                className="text-[#e63946] transition-opacity hover:underline hover:opacity-80"
              >
                Complete the sign-up form
              </button>{" "}
              to get started.
            </motion.p>

            {notice && (
              <motion.div
                variants={itemVariants}
                className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 font-space-grotesk text-[12px] text-emerald-400"
              >
                {notice}
              </motion.div>
            )}

            {error && (
              <motion.div
                variants={itemVariants}
                role="alert"
                className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 font-space-grotesk text-[12px] text-red-400"
              >
                {error}
              </motion.div>
            )}
          </motion.form>
        </motion.div>
      </div>
    </SectionGlow>
  );
}