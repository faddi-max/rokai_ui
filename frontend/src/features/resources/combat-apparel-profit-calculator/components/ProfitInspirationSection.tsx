import { motion } from "framer-motion";
import {
  inspirationCards,
  inspirationContent,
  type InspirationCard,
} from "../data/collectionPlanner.data";

interface ProfitInspirationSectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  cards?: InspirationCard[];
}

export default function ProfitInspirationSection({
  eyebrow = inspirationContent.eyebrow,
  title = inspirationContent.title,
  description = inspirationContent.description,
  cards = inspirationCards,
}: ProfitInspirationSectionProps) {
  return (
    <section className="relative w-full">
      <div className="mx-auto w-full max-w-[1180px] px-5 pb-16 pt-4 sm:px-8 lg:px-[30px] lg:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="font-space-grotesk text-[10px] font-bold uppercase tracking-[0.18em] text-[#E63946]">
            {eyebrow}
          </span>
          <h2 className="mt-2 font-space-grotesk text-[24px] font-bold leading-[1.15] text-white sm:text-[26px]">
            {title}
          </h2>
          <p className="mt-3 max-w-[760px] font-space-grotesk text-[12px] text-white/50">{description}</p>
        </motion.div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {cards.map((card, i) => (
            <motion.article
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="group overflow-hidden rounded-[8px] border border-white/10 bg-[#111111]"
            >
              <div className="relative aspect-[97/32] w-full overflow-hidden">
                <img
                  src={card.image}
                  alt={card.imageAlt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  style={{ objectPosition: card.imagePosition ?? "center" }}
                />
              </div>
              <div className="px-3 pb-3 pt-3">
                <h3 className="font-space-grotesk text-[12px] font-bold text-white">{card.title}</h3>
                <p className="mt-1 truncate font-space-grotesk text-[10px] text-white/50">{card.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
