interface CardSkeletonProps {
  variant?: "light" | "dark" | "resource";
  className?: string;
}

export default function CardSkeleton({
  variant = "light",
  className = "",
}: CardSkeletonProps) {
  // Dark overlay variant skeleton
  if (variant === "dark") {
    return (
      <div
        className={`relative flex h-[ clamp(460px,36vw,560px) ] w-full flex-col overflow-hidden rounded-xl border border-white/10 bg-neutral-950 p-6 animate-pulse ${className}`}
      >
        <div className="h-6 w-24 rounded bg-white/10" />
        <div className="mt-auto flex flex-col gap-3">
          <div className="h-4 w-28 rounded bg-[#E51B24]/40" />
          <div className="h-8 w-3/4 rounded bg-white/15" />
          <div className="h-4 w-full rounded bg-white/10" />
          <div className="h-4 w-5/6 rounded bg-white/10" />
          <div className="mt-4 h-12 w-full rounded bg-[#E51B24]/50" />
        </div>
      </div>
    );
  }

  // Resource variant skeleton
  if (variant === "resource") {
    return (
      <div
        className={`flex flex-col justify-between rounded-xl border border-white/15 bg-[#111111] p-6 animate-pulse ${className}`}
      >
        <div>
          <div className="flex justify-between gap-4">
            <div className="h-5 w-20 rounded bg-white/10" />
            <div className="h-5 w-28 rounded bg-white/10" />
          </div>
          <div className="mt-4 aspect-[16/10] w-full rounded-lg bg-neutral-900" />
          <div className="mt-5 h-6 w-4/5 rounded bg-white/20" />
          <div className="mt-3 h-4 w-full rounded bg-white/10" />
          <div className="mt-2 h-4 w-2/3 rounded bg-white/10" />
        </div>
        <div className="mt-6 border-t border-white/10 pt-4">
          <div className="h-10 w-full rounded bg-white/10" />
        </div>
      </div>
    );
  }

  // Light white card skeleton (default for catalog and programs)
  return (
    <div
      className={`flex flex-col justify-between overflow-hidden rounded-2xl bg-white/95 p-6 animate-pulse ${className}`}
    >
      <div>
        <div className="aspect-[16/10] w-full rounded-xl bg-neutral-200" />
        <div className="mt-6 flex flex-col gap-3">
          <div className="h-7 w-3/4 rounded bg-neutral-300" />
          <div className="h-4 w-1/2 rounded bg-neutral-200" />
          <div className="h-4 w-full rounded bg-neutral-200" />
          <div className="h-4 w-4/5 rounded bg-neutral-200" />
          <div className="mt-2 flex gap-2">
            <div className="h-6 w-16 rounded-full bg-neutral-200" />
            <div className="h-6 w-20 rounded-full bg-neutral-200" />
            <div className="h-6 w-14 rounded-full bg-neutral-200" />
          </div>
        </div>
      </div>
      <div className="mt-6">
        <div className="h-12 w-full rounded-lg bg-[#E51B24]/40" />
      </div>
    </div>
  );
}
