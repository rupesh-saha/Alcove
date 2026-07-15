import ExploreContent from "@/components/ExploreContent";
import { Suspense } from "react";

export default function ExplorePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="animate-pulse text-ink/50 text-lg font-serif">Loading experiences...</div>
      </div>
    }>

      <ExploreContent />

    </Suspense>
  );
}