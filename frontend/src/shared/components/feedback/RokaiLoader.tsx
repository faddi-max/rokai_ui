interface RokaiLoaderProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
  fullscreen?: boolean;
}

export default function RokaiLoader({
  size = "md",
  text = "LOADING SPECIFICATIONS...",
  className = "",
  fullscreen = false,
}: RokaiLoaderProps) {
  const sizeMap = {
    sm: "h-6 w-6",
    md: "h-10 w-10",
    lg: "h-14 w-14",
  };

  const content = (
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      {/* Animated Combat Ring Spinner */}
      <div className="relative flex items-center justify-center">
        {/* Outer glowing pulse ring */}
        <div className="absolute -inset-2 rounded-full bg-[#E51B24]/20 blur-md animate-pulse" />

        {/* Outer rotating dashed ring */}
        <div
          className={`${sizeMap[size]} animate-spin rounded-full border-2 border-[#E51B24] border-t-transparent`}
        />

        {/* Center icon / accent */}
        <div className="absolute flex items-center justify-center">
          <span className="font-space-grotesk text-xs font-black italic text-[#E51B24]">
            R
          </span>
        </div>
      </div>

      {text && (
        <span className="font-space-grotesk text-xs font-bold uppercase tracking-[0.2em] text-white/70 animate-pulse">
          {text}
        </span>
      )}
    </div>
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md">
        {content}
      </div>
    );
  }

  return content;
}
