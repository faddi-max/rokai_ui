import React from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import RokaiLoader from "./RokaiLoader";
import Button from "@/shared/components/ui/Button";

interface DataLoaderProps<T> {
  loading: boolean;
  error: Error | null;
  data: T | null;
  skeleton?: React.ReactNode;
  loadingMessage?: string;
  onRetry?: () => void;
  children: (data: T) => React.ReactNode;
}

/**
 * Universal component to handle loading, error, and resolved data states.
 * Designed to make future API integrations frictionless across all pages.
 */
export default function DataLoader<T>({
  loading,
  error,
  data,
  skeleton,
  loadingMessage = "FETCHING COMBAT SPECIFICATIONS...",
  onRetry,
  children,
}: DataLoaderProps<T>) {
  // 1. Loading state (prioritize skeleton if provided)
  if (loading && !data) {
    if (skeleton) {
      return <>{skeleton}</>;
    }
    return (
      <div className="flex min-h-[300px] w-full items-center justify-center py-16">
        <RokaiLoader size="md" text={loadingMessage} />
      </div>
    );
  }

  // 2. Error state
  if (error && !data) {
    return (
      <div className="mx-auto my-12 max-w-lg rounded-2xl border border-[#E51B24]/40 bg-[#160a0b] p-8 text-center shadow-xl">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E51B24]/20 text-[#E51B24]">
          <AlertTriangle className="h-7 w-7" />
        </div>
        <h3 className="mt-4 font-space-grotesk text-xl font-bold text-white">
          Data Pipeline Connection Issue
        </h3>
        <p className="mt-2 font-space-grotesk text-xs sm:text-sm text-white/70">
          {error.message || "Failed to load live gear data from the factory server."}
        </p>
        {onRetry && (
          <div className="mt-6">
            <Button
              onClick={onRetry}
              icon={RotateCcw}
              variant="outline"
              size="13px"
              className="mx-auto"
            >
              Retry Connection
            </Button>
          </div>
        )}
      </div>
    );
  }

  // 3. Render resolved data
  if (data) {
    return <>{children(data)}</>;
  }

  return null;
}
