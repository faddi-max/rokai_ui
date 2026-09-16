import CardSkeleton from "./CardSkeleton";

interface GridSkeletonProps {
  count?: number;
  columns?: 2 | 3 | 4;
  variant?: "light" | "dark" | "resource";
  className?: string;
}

export default function GridSkeleton({
  count = 6,
  columns = 3,
  variant = "light",
  className = "",
}: GridSkeletonProps) {
  const columnMap = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div
      className={`grid gap-6 sm:gap-8 ${columnMap[columns]} ${className}`}
      aria-busy="true"
      aria-label="Loading content..."
    >
      {Array.from({ length: count }).map((_, index) => (
        <CardSkeleton key={index} variant={variant} />
      ))}
    </div>
  );
}
