import { useRef, useState } from "react";
import { ArrowUpRight, Loader2, CheckCircle2, AlertCircle, Paperclip, X } from "lucide-react";
import { motion } from "framer-motion";
import SectionGlow from "@/shared/components/layout/SectionGlow";
import SectionHeaderblog from "@/shared/components/sections/SectionHeaderblog";

export interface GeneralInquiryValues {
  name: string;
  brandName: string;
  email: string;
  inquiryType: string;
  message: string;
  attachment: File | null;
}

export interface GeneralInquirySectionProps {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  description?: string;
  onSubmit?: (values: GeneralInquiryValues) => Promise<{ success: boolean; message?: string }>;
}

const EMPTY_VALUES: GeneralInquiryValues = {
  name: "",
  brandName: "",
  email: "",
  inquiryType: "",
  message: "",
  attachment: null,
};

const fieldClass =
  "h-[49px] w-full rounded-[6px] border border-[#383838] bg-[#101010] px-4 font-space-grotesk text-sm text-white placeholder:text-white/35 transition-colors duration-300 hover:border-[#4a4a4a] focus:border-[#E51B24] focus:outline-none focus:ring-1 focus:ring-[#E51B24]/40";

const fieldLabelClass =
  "mb-2 block font-space-grotesk text-[12px] font-bold uppercase tracking-[1px] leading-[16px] text-[#BCBCBC]";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={fieldLabelClass}>{label}</label>
      {children}
    </div>
  );
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function GeneralInquirySection({
  eyebrow = "General inquiry",
  title = "SEND US",
  highlight = "A MESSAGE.",
  description = "Not ready for a full manufacturing request? No problem. Send a general inquiry and tell us what you need help with.",
  onSubmit,
}: GeneralInquirySectionProps) {
  const [values, setValues] = useState<GeneralInquiryValues>(EMPTY_VALUES);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const update = <K extends keyof GeneralInquiryValues>(key: K, val: GeneralInquiryValues[K]) =>
    setValues((prev) => ({ ...prev, [key]: val }));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    update("attachment", file);
  };

  const handleRemoveFile = () => {
    update("attachment", null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!values.name.trim() || !values.brandName.trim() || !values.email.trim() || !values.message.trim()) {
      setError("Please fill in all required fields.");
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
      if (fileInputRef.current) fileInputRef.current.value = "";
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
        highlight={highlight}
        description={description}
        accentColor="#E51B24"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1342px] px-5 pb-20 sm:px-8 lg:px-0">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="w-full rounded-[14px] bg-[#111111] p-[25px]"
        >
          {success ? (
            <div className="flex min-h-[520px] flex-col items-center justify-center gap-4 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E51B24]/15 text-[#E51B24]">
                <CheckCircle2 size={30} />
              </div>
              <h3 className="font-space-grotesk text-lg font-bold uppercase text-white">
                Inquiry Sent
              </h3>
              <p className="max-w-[340px] font-space-grotesk text-sm text-white/60">
                Thanks for reaching out. Our team will review your message and get back to you shortly.
              </p>
              <button
                type="button"
                onClick={() => setSuccess(false)}
                className="mt-2 rounded-md border border-white/20 px-4 py-2 font-space-grotesk text-[11px] font-bold uppercase tracking-wider text-white transition hover:border-white/50"
              >
                Send Another Inquiry
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

              <Field label="Name*">
                <input
                  type="text"
                  value={values.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="First name"
                  className={fieldClass}
                />
              </Field>

              <Field label="Brand Name*">
                <input
                  type="text"
                  value={values.brandName}
                  onChange={(e) => update("brandName", e.target.value)}
                  placeholder="Brand name"
                  className={fieldClass}
                />
              </Field>

              <Field label="Email*">
                <input
                  type="email"
                  value={values.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="example@gmail.com"
                  className={fieldClass}
                />
              </Field>

              <Field label="Inquiry Type*">
                <input
                  type="text"
                  value={values.inquiryType}
                  onChange={(e) => update("inquiryType", e.target.value)}
                  placeholder="Subject"
                  className={fieldClass}
                />
              </Field>

              <Field label="Message*">
                <textarea
                  value={values.message}
                  onChange={(e) => update("message", e.target.value)}
                  placeholder="Write"
                  rows={5}
                  className="w-full resize-none rounded-[6px] border border-[#383838] bg-[#101010] px-4 py-3 font-space-grotesk text-sm text-white placeholder:text-white/35 transition-colors duration-300 hover:border-[#4a4a4a] focus:border-[#E51B24] focus:outline-none focus:ring-1 focus:ring-[#E51B24]/40"
                />
              </Field>

              <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex h-[40px] items-center gap-2 rounded-[6px] bg-[#E51B24] px-5 font-space-grotesk text-[13px] font-medium text-white transition hover:bg-[#c9161e] disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Inquiry
                      <ArrowUpRight size={14} />
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2 font-space-grotesk text-[11px] text-white/40">
                  {values.attachment ? (
                    <span className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-2.5 py-1.5 text-white/70">
                      <Paperclip size={12} className="shrink-0 text-[#E51B24]" />
                      <span className="max-w-[160px] truncate">{values.attachment.name}</span>
                      <span className="text-white/30">({formatFileSize(values.attachment.size)})</span>
                      <button
                        type="button"
                        onClick={handleRemoveFile}
                        aria-label="Remove attachment"
                        className="text-white/40 transition hover:text-white"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ) : (
                    <>
                      Optional attachment
                      <span className="text-white/20">·</span>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-1 text-[#E51B24] transition hover:text-[#ff5964]"
                      >
                        <Paperclip size={12} />
                        Add file
                      </button>
                    </>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </SectionGlow>
  );
}