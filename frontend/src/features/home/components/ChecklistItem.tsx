import { Check } from "lucide-react";

interface ChecklistItemProps {
  label: string;
}

const ChecklistItem = ({ label }: ChecklistItemProps) => {
  return (
    <li className="flex items-center gap-3">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
        <Check className="h-3.5 w-3.5 text-[#E51B24]" strokeWidth={3} />
      </span>
      <span
        className="font-space-grotesk font-light text-white"
        style={{
          fontSize: "clamp(18px, 0.4vw + 15px, 25px)",
          lineHeight: "clamp(18px, 0.4vw + 15px, 25px)",
          letterSpacing: "0%",
        }}
      >
        {label}
      </span>
    </li>
  );
};

export default ChecklistItem
