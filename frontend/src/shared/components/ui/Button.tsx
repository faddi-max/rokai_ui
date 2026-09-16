import clsx from "clsx";
import { LucideIcon } from "lucide-react";
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { gsap, motion } from "@/shared/animations";

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
  animateIcon?: boolean;
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
  animateIcon = true,
  weight = "bold",
  size = "12px",
  className,
  onClick,
  onMouseEnter,
  onMouseLeave,
  ...props
}: ButtonProps) {
  const classes = clsx(
    "inline-flex items-center justify-center gap-2 font-space-grotesk tracking-wide rounded-md transition-opacity hover:opacity-90",
    weight === "medium" ? "font-medium" : "font-bold",
    variants[variant],
    className
  );

  const style = { fontSize: size, lineHeight: "100%" };

  const rotateIcon = (target: EventTarget & Element, rotation: number) => {
    const icon = target.querySelector("[data-button-icon]");

    if (icon) {
      gsap.to(icon, {
        rotation,
        duration: motion.duration.hover,
        ease: motion.ease.hover,
      });
    }
  };

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        style={style}
        onMouseEnter={(event) => {
          if (animateIcon) rotateIcon(event.currentTarget, motion.rotation.iconHover);
          (onMouseEnter as AnchorHTMLAttributes<HTMLAnchorElement>["onMouseEnter"])?.(event);
        }}
        onMouseLeave={(event) => {
          if (animateIcon) rotateIcon(event.currentTarget, 0);
          (onMouseLeave as AnchorHTMLAttributes<HTMLAnchorElement>["onMouseLeave"])?.(event);
        }}
        onClick={(event) => {
          if (animateIcon) rotateIcon(event.currentTarget, motion.rotation.iconClick);
          (onClick as AnchorHTMLAttributes<HTMLAnchorElement>["onClick"])?.(event);
        }}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
        {Icon && <Icon data-button-icon size={14} />}
      </a>
    );
  }

  return (
    <button
      className={classes}
      style={style}
      onMouseEnter={(event) => {
        if (animateIcon) rotateIcon(event.currentTarget, motion.rotation.iconHover);
        (onMouseEnter as ButtonHTMLAttributes<HTMLButtonElement>["onMouseEnter"])?.(event);
      }}
      onMouseLeave={(event) => {
        if (animateIcon) rotateIcon(event.currentTarget, 0);
        (onMouseLeave as ButtonHTMLAttributes<HTMLButtonElement>["onMouseLeave"])?.(event);
      }}
      onClick={(event) => {
        if (animateIcon) rotateIcon(event.currentTarget, motion.rotation.iconClick);
        (onClick as ButtonHTMLAttributes<HTMLButtonElement>["onClick"])?.(event);
      }}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
      {Icon && <Icon data-button-icon size={14} />}
    </button>
  );
}
