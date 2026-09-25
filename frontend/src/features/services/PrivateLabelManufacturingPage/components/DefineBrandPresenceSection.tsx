import { useState } from "react";
import { ArrowUpRight, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import SectionGlow from "@/shared/components/layout/SectionGlow";
import SectionHeaderblog from "@/shared/components/sections/SectionHeaderblog";
import { InstagramIcon, FacebookIcon, LinkedinIcon, YoutubeIcon } from "@/shared/icons/socialmediaicons";

/* -------------------------------------------------------------------------- */
/*  Types — API-ready                                                         */
/* -------------------------------------------------------------------------- */

export interface ContactFormValues {
  firstName: string;
  brandName: string;
  email: string;
  subject: string;
  message: string;
}

export interface DefineBrandPresenceSectionProps {
  eyebrow?: string;
  title?: string;
  titleLine2?: string;
  highlight?: string;
  afterHighlight?: string;
  description?: string;
  leftIntro?: string;
  location?: string;
  email?: string;
  phone?: string;
  onSubmit?: (
    values: ContactFormValues
  ) => Promise<{ success: boolean; message?: string }>;
}

/* -------------------------------------------------------------------------- */
/*  Social links                                                              */
/* -------------------------------------------------------------------------- */

const socialLinks = [
  { icon: InstagramIcon, href: "#", label: "Instagram" },
  { icon: FacebookIcon, href: "#", label: "Facebook" },
  { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
  { icon: YoutubeIcon, href: "#", label: "YouTube" },
];

/* -------------------------------------------------------------------------- */
/*  Form field helper                                                         */
/* -------------------------------------------------------------------------- */

const fieldClass =
  "h-[49px] w-full rounded-[6px] border border-[#383838] bg-[#101010] px-4 font-space-grotesk text-sm text-white placeholder:text-white/35 transition-colors duration-300 hover:border-[#4a4a4a] focus:border-[#E51B24] focus:outline-none focus:ring-1 focus:ring-[#E51B24]/40";

const fieldLabelClass =
  "mb-2 block font-space-grotesk text-[12px] font-bold uppercase tracking-[1px] text-[#BCBCBC]";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={fieldLabelClass}>{label}</label>
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Contact detail block (Location / Email / Phone)                          */
/* -------------------------------------------------------------------------- */

function ContactDetail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span
        className="font-space-grotesk block"
        style={{
          fontWeight: 700,
          fontSize: "24.27px",
          lineHeight: "34.67px",
          letterSpacing: "1.56px",
          textTransform: "uppercase",
          color: "#E63946",
        }}
      >
        {label}
      </span>
      <p className="mt-1 font-space-grotesk text-[15px] font-light text-white/70">
        {value}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

const EMPTY_VALUES: ContactFormValues = {
  firstName: "",
  brandName: "",
  email: "",
  subject: "",
  message: "",
};

export default function DefineBrandPresenceSection({
  eyebrow = "Start Your Project",
  title = "DEFINE YOUR",
  titleLine2,
  highlight = "BRAND'S",
  afterHighlight = " PRESENCE",
  description = "Tell us what you're looking to manufacture and our team can help you take it from concept to production.",
  leftIntro = "Tell Rokai about your labeling and packaging requirements and start a conversation about your product presentation.",
  location = "Sialkot, Pakistan",
  email = "info@rokai.com",
  phone = "+92 XXX XXXXXXX",
  onSubmit,
}: DefineBrandPresenceSectionProps) {
  const [values, setValues] = useState<ContactFormValues>(EMPTY_VALUES);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const update = <K extends keyof ContactFormValues>(key: K, val: ContactFormValues[K]) =>
    setValues((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!values.firstName.trim() || !values.email.trim()) {
      setError("Please fill in your name and email.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      if (onSubmit) {
        const res = await onSubmit(values);
        if (!res.success) {
          setError(res.message || "Something went wrong. Please try again.");
          return;
        }
      }
      setSuccess(true);
      setValues(EMPTY_VALUES);
    } catch (err) {
      setError((err as Error).message || "Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SectionGlow className="relative overflow-hidden">
      <SectionHeaderblog
        bare
        eyebrow={eyebrow}
        title={title}
        titleLine2={titleLine2}
        highlight={highlight}
        afterHighlight={afterHighlight}
        highlightPosition="start"
        accentColor="#E51B24"
        description={description}
      />

      <div className="relative z-10  w-full max-w-[1578px] py-20    px-5 pb-16 sm:px-8 lg:px-[30px] mx-auto  ">
        <div className="grid grid-cols-1   gap-10 lg:grid-cols-[1fr_708px]">
          {/* LEFT — intro + contact details */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-20 pl-7 border-l border-[#3B3B3B]"
          >
            <p className="max-w-[560px] mt-10 font-space-grotesk text-[18px] font-light leading-[22px] text-white/70">
              {leftIntro}
            </p>

            <div className="flex flex-col gap-6">
              <ContactDetail label="Location" value={location} />
              <ContactDetail label="Email" value={email} />
              <ContactDetail label="Phone" value={phone} />
            </div>

            <div className="flex items-center gap-2.5">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-black transition hover:bg-[#E51B24] hover:text-white"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — form card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[708px] rounded-[14px] bg-[#111111] p-[25px]"
          >
            {success ? (
              <div className="flex h-full min-h-[480px] flex-col items-center justify-center gap-4 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E51B24]/15 text-[#E51B24]">
                  <CheckCircle2 size={30} />
                </div>
                <h3 className="font-space-grotesk text-lg font-bold uppercase text-white">
                  Message Sent
                </h3>
                <p className="max-w-[340px] font-space-grotesk text-sm text-white/60">
                  Thanks for reaching out. Our team will review your project and get back to you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSuccess(false)}
                  className="mt-2 rounded-md border border-white/20 px-4 py-2 font-space-grotesk text-[11px] font-bold uppercase tracking-wider text-white transition hover:border-white/50"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {error && (
                  <div className="flex items-center gap-2 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 font-space-grotesk text-[12px] text-red-400">
                    <AlertCircle size={14} className="shrink-0" />
                    {error}
                  </div>
                )}

                <Field label="Name">
                  <input
                    type="text"
                    value={values.firstName}
                    onChange={(e) => update("firstName", e.target.value)}
                    placeholder="First name"
                    className={fieldClass}
                  />
                </Field>

                <Field label="Brand Name">
                  <input
                    type="text"
                    value={values.brandName}
                    onChange={(e) => update("brandName", e.target.value)}
                    placeholder="Brand name"
                    className={fieldClass}
                  />
                </Field>

                <Field label="Email">
                  <input
                    type="email"
                    value={values.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="example@gmail.com"
                    className={fieldClass}
                  />
                </Field>

                <Field label="Subject">
                  <input
                    type="text"
                    value={values.subject}
                    onChange={(e) => update("subject", e.target.value)}
                    placeholder="Subject"
                    className={fieldClass}
                  />
                </Field>

                <Field label="Tell Us About Yourself">
                  <textarea
                    value={values.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Write"
                    rows={4}
                    className="w-full resize-none rounded-[6px] border border-[#383838] bg-[#101010] px-4 py-3 font-space-grotesk text-sm text-white placeholder:text-white/35 transition-colors duration-300 hover:border-[#4a4a4a] focus:border-[#E51B24] focus:outline-none focus:ring-1 focus:ring-[#E51B24]/40"
                  />
                </Field>

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex h-[44px] w-fit items-center gap-2 rounded-[6px] bg-[#E51B24] px-5 font-space-grotesk text-[13px] font-medium text-white transition hover:bg-[#c9161e] disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowUpRight size={14} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </SectionGlow>
  );
}