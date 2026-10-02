import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import SectionGlow from "../layout/SectionGlow";

export interface SignupValues {
  full_name: string;
  email: string;
  password: string;
}

interface SignupCardProps {
  onSubmit: (values: SignupValues) => Promise<void>;
  onSwitchToLogin?: () => void;
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

export default function SignupCard({ onSubmit, onSwitchToLogin }: SignupCardProps) {
  const [values, setValues] = useState<SignupValues>({ full_name: "", email: "", password: "" });
  const [agree, setAgree] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = (key: keyof SignupValues) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (values.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (!agree) {
      setError("Please agree to the affiliate terms to continue.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await onSubmit({
        full_name: values.full_name.trim(),
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

            <motion.div variants={itemVariants} className="flex flex-col gap-2">
              <label htmlFor="signup-name" className={labelClass}>Full name</label>
              <input
                id="signup-name"
                type="text"
                required
                value={values.full_name}
                onChange={update("full_name")}
                placeholder="Your full name"
                autoComplete="name"
                className={inputClass}
              />
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-2">
              <label htmlFor="signup-email" className={labelClass}>Email address</label>
              <input
                id="signup-email"
                type="email"
                required
                value={values.email}
                onChange={update("email")}
                placeholder="you@example.com"
                autoComplete="email"
                className={inputClass}
              />
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-2">
              <label htmlFor="signup-password" className={labelClass}>Password</label>
              <input
                id="signup-password"
                type="password"
                required
                value={values.password}
                onChange={update("password")}
                placeholder="Minimum 8 characters"
                autoComplete="new-password"
                className={inputClass}
              />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <label className="flex cursor-pointer items-center gap-[13px]">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
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