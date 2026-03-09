"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function ScanResultHeader() {
  const router = useRouter();

  return (
    <header className="h-16 flex items-center px-8 bg-background/50 backdrop-blur-sm sticky top-0 z-10 border-b border-border">
      <button
        onClick={() => router.back()}
        className="mr-4 p-2 hover:bg-accent hover:text-accent-foreground rounded-full transition-colors"
      >
        <ArrowLeft className="size-5" />
      </button>
      <h2 className="text-lg font-bold">Hasil Klasifikasi AI</h2>
    </header>
  );
}
