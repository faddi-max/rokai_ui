import type { ReactNode } from "react";

interface SectionGlowProps {
  children: ReactNode;
  className?: string;
  as?: "section" | "div";
}

export default function SectionGlow({ children, className = "", as = "section" }: SectionGlowProps) {
  const Tag = as;
  return (
    <Tag className={`relative overflow-hidden bg-black ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(150,15,20,0.3),transparent_60%)]" />
      <div className="relative">{children}</div>
    </Tag>
  );
}