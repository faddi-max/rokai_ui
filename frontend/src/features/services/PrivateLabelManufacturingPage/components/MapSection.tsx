import { motion } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*  Types — API-ready                                                         */
/* -------------------------------------------------------------------------- */

export interface MapSectionProps {
  /** Full Google Maps embed URL (src of an <iframe>). */
  embedSrc?: string;
  title?: string;
}

/* -------------------------------------------------------------------------- */
/*  Default content                                                           */
/* -------------------------------------------------------------------------- */

const DEFAULT_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193593.44!2d-77.14!3d38.90!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sWashington%2C%20DC!5e0!3m2!1sen!2sus!4v0";

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

export default function MapSection({
  embedSrc = DEFAULT_EMBED_SRC,
  title = "ROKAI location map",
}: MapSectionProps) {
  return (
    <section className="relative w-full overflow-hidden bg-black">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto w-full max-w-[1250px] px-5 py-10 sm:px-8 lg:px-0"
      >
        <div className="relative aspect-[16/7] w-full overflow-hidden rounded-[10px] border border-white/10 grayscale-[0.15]">
          <iframe
            src={embedSrc}
            title={title}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0"
            allowFullScreen
          />
        </div>
      </motion.div>
    </section>
  );
}