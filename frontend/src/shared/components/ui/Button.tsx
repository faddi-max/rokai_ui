import clsx from "clsx";
import { LucideIcon } from "lucide-react";
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "outline" | "dark";
type Weight = "bold" | "medium";

const variants: Record<Variant, string> = {
  primary: "bg-[#E51B24] text-white",
  outline: "bg-white text-black",
  dark: "bg-black text-white",
};

type BaseProps = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  icon?: LucideIcon;
  weight?: Weight;
  size?: string;
  className?: string;
};

type ButtonProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement> & ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps>;

export default function Button({
  children,
  href,
  variant = "primary",
  icon: Icon,
  weight = "bold",
  size = "12px",
  className,
  ...props
}: ButtonProps) {
  const classes = clsx(
    "inline-flex items-center justify-center gap-2 font-space-grotesk tracking-wide rounded-md transition-opacity hover:opacity-90",
    weight === "medium" ? "font-medium" : "font-bold",
    variants[variant],
    className
  );

  const style = { fontSize: size, lineHeight: "100%" };

  if (href) {
    return (
      <a href={href} className={classes} style={style} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
        {Icon && <Icon size={14} />}
      </a>
    );
  }

  return (
    <button className={classes} style={style} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
      {Icon && <Icon size={14} />}
    </button>
  );
}
