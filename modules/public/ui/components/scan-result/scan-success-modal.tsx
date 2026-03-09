"use client";

import { CheckCircle, Info, Package, Save, Scan } from "lucide-react";
import { useRouter } from "next/navigation";

interface ScanSuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: string;
  pointsEarned: number;
}

export const ScanSuccessModal = ({
  open,
  onOpenChange,
  category,
  pointsEarned,
}: ScanSuccessModalProps) => {
  const router = useRouter();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={() => onOpenChange(false)}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-card rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">
        <div className="relative h-48 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-b from-primary/10 to-transparent"></div>
          <div className="relative">
            <div className="absolute inset-0 animate-ping rounded-full bg-primary/20 scale-150"></div>
            <div className="h-24 w-24 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30 z-10 relative">
              <CheckCircle className="text-primary-foreground size-12" />
            </div>
          </div>
        </div>

        <div className="px-8 pb-8 flex flex-col items-center text-center">
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Sampah Teridentifikasi!
          </h3>
          <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-full mb-6 border border-border">
            <Package className="text-primary size-5" />
            <span className="text-foreground font-semibold capitalize">
              {category}
            </span>
          </div>

          <div className="mb-8">
            <span className="text-4xl font-black text-primary tracking-tight">
              +{pointsEarned} Poin
            </span>
            <p className="text-sm text-muted-foreground mt-1">
              Berhasil ditambahkan ke saldo Anda
            </p>
          </div>

          <div className="w-full flex flex-col gap-3">
            <button
              onClick={() => onOpenChange(false)}
              className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl shadow-md shadow-primary/20 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <Save className="size-5" />
              Konfirmasi & Simpan
            </button>
            <button
              onClick={() => router.push("/user/ai")}
              className="w-full h-14 bg-transparent border-2 border-border hover:bg-muted text-muted-foreground font-bold rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <Scan className="size-5" />
              Scan Lagi
            </button>
          </div>
        </div>

        {/* Quick Tip Footer */}
        <div className="bg-muted px-8 py-3 flex items-center justify-center gap-2 border-t border-border">
          <Info className="text-primary size-4 shrink-0" />
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest leading-none">
            Tips: Pastikan material bersih
          </p>
        </div>
      </div>
    </div>
  );
};
