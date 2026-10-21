import type { ReactNode } from "react";

interface SectionGlowProps {
  children: ReactNode;
  className?: string;
  as?: "section" | "div";
}

export default function SectionGlow({ children, className = "", as = "section" }: SectionGlowProps) {
  const Tag = as;
  return (
   <Tag className={`relative overflow-hidden ${className}`}>
  <div className="relative">{children}</div>
</Tag>
  );
}