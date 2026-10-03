import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, ArrowUpRight, Check, X } from "lucide-react";

interface NotificationModalProps {
  isOpen: boolean;
  type?: "success" | "error";
  message: string;
  onClose: () => void;
}

const COPY = {
  success: { eyebrow: "Confirmed", title: "Success" },
  error: { eyebrow: "Attention", title: "Something went wrong" },
} as const;

const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  type = "success",
  message,
  onClose,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isSuccess = type === "success";
  const accent = isSuccess ? "#2FB574" : "#E63946";
  const { eyebrow, title } = COPY[type];

  // Close on Escape, lock page scroll, focus the action button
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    buttonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-5 backdrop-blur-sm"
        >
          <motion.div
            role={isSuccess ? "dialog" : "alertdialog"}
            aria-modal="true"
            aria-labelledby="notification-title"
            aria-describedby="notification-message"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[440px] overflow-hidden rounded-[8px] border border-white/10 bg-[#111111] px-7 pb-7 pt-8 text-left"
            style={{
              backgroundImage: `radial-gradient(circle at top right, ${accent}2E 0%, ${accent}00 45%)`,
            }}
          >
            {/* Top accent line */}
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-[3px]"
              style={{
                background: `linear-gradient(90deg, ${accent} 0%, ${accent}00 100%)`,
              }}
            />

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close notification"
              className="absolute right-4 top-4 flex size-8 items-center justify-center text-white/40 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E63946]"
            >
              <X size={16} aria-hidden />
            </button>

            {/* Icon */}
            <span
              className="flex size-11 items-center justify-center rounded-[6px] border"
              style={{
                color: accent,
                borderColor: `${accent}59`,
                backgroundColor: `${accent}1A`,
              }}
            >
              {isSuccess ? (
                <Check size={20} strokeWidth={2.5} aria-hidden />
              ) : (
                <AlertTriangle size={20} strokeWidth={2} aria-hidden />
              )}
            </span>

            {/* Eyebrow */}
            <div className="mt-6 flex items-center gap-3">
              <span
                className="font-space-grotesk text-[10px] font-bold uppercase tracking-[1.8px]"
                style={{ color: accent }}
              >
                {eyebrow}
              </span>
              <span aria-hidden className="h-px w-8" style={{ backgroundColor: accent }} />
            </div>

            {/* Title + message */}
            <h3
              id="notification-title"
              className="mt-3 font-space-grotesk text-[24px] font-bold uppercase leading-[1.15] text-[#f7f7f5]"
            >
              {title}
            </h3>
            <p
              id="notification-message"
              className="mt-3 font-space-grotesk text-[14px] leading-[22px] text-[#c0c0c0]"
            >
              {message}
            </p>

            {/* Action */}
            <div className="mt-8 flex justify-end border-t border-[#292929] pt-6">
              <button
                ref={buttonRef}
                type="button"
                onClick={onClose}
                className="group flex h-[37px] items-center gap-[25px] rounded-[6px] bg-[#E63946] px-[13px] font-space-grotesk text-[13px] font-medium text-white transition-colors hover:bg-[#ee4250] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E63946]"
              >
                Okay
                <ArrowUpRight
                  size={16}
                  aria-hidden
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationModal;