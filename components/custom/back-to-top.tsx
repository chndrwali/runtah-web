"use client";

import { ArrowUp } from "lucide-react";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";

interface BackToTopProps {
  threshold?: number;
  targetId?: string;
}

export const BackToTop = ({
  threshold = 300,
  targetId = "hero",
}: BackToTopProps) => {
  const isScrolled = useScrollTop(threshold);

  const scrollToTop = () => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={cn(
        "fixed bottom-8 right-8 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-300 transform",
        isScrolled
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-10 opacity-0 pointer-events-none",
      )}
    >
      <ArrowUp className="size-6" />
    </button>
  );
};
