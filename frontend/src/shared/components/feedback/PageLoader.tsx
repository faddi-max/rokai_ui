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
      <RokaiLoader size="lg" text={message} />
    </div>
  );
}
