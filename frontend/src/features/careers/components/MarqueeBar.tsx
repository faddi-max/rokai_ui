import { motion, useReducedMotion } from "framer-motion";

export interface MarqueeBarProps {
  items: string[];
  /** Seconds for one full loop. Higher = slower. */
  duration?: number;
  className?: string;
}

/** Full-width black strip with continuously flowing text. */
export default function MarqueeBar({ items, duration = 30, className = "" }: MarqueeBarProps) {
  const reduceMotion = useReducedMotion();

  // One "set" of items; rendered twice so the loop (0 → -50%) is seamless.
  const renderSet = (key: string) => (
    <div key={key} className="flex shrink-0 items-center" aria-hidden={key === "b"}>
      {items.map((item, i) => (
        <div key={`${key}-${i}`} className="flex items-center">
          <span className="whitespace-nowrap font-space-grotesk text-[12px] font-medium uppercase leading-4 tracking-[1.5px] text-[#8a8a8a]">
            {item}
          </span>
          <span aria-hidden className="mx-8 h-[5px] w-[5px] shrink-0 bg-[#e63946]" />
        </div>
      ))}
    </div>
  );

  return (
    <div
      className={`flex h-[54px] w-full items-center overflow-hidden border-y border-white/10 bg-[#111] ${className}`}
    >
      <motion.div
        className="flex w-max items-center"
        animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {renderSet("a")}
        {renderSet("b")}
      </motion.div>
    </div>
  );
}
