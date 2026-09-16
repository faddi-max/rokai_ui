import RokaiLoader from "./RokaiLoader";

interface PageLoaderProps {
  message?: string;
  minHeight?: string;
}

export default function PageLoader({
  message = "INITIALIZING PRODUCTION PIPELINE...",
  minHeight = "min-h-[60vh]",
}: PageLoaderProps) {
  return (
    <div
      className={`relative flex ${minHeight} w-full items-center justify-center bg-black px-6 py-20`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(229,27,36,0.15),transparent_65%)]" />
      <RokaiLoader size="lg" text={message} />
    </div>
  );
}
