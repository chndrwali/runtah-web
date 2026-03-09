"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTRPC } from "@/trpc/client";
import { ResponsiveModal } from "@/components/custom/responsive-modal";
import {
  ArrowLeft,
  BadgeCheck,
  Gift,
  MapPin,
  Truck,
  Sparkles,
  Leaf,
  Info,
  CheckCircle,
  Package,
  Save,
  Scan,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

export function ScanResultSection({ id }: { id: string }) {
  const trpc = useTRPC();
  const router = useRouter();
  const { data: scan, isLoading } = useQuery(
    trpc.trash.getScanById.queryOptions({ id }),
  );

  const [isModalDismissed, setIsModalDismissed] = useState(false);
  const showSuccessModal = scan?.status === "COMPLETED" && !isModalDismissed;

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center h-[calc(100vh-80px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <p className="text-slate-500">Memuat hasil...</p>
      </div>
    );
  }

  if (!scan) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-500">
        <p>Data scan tidak ditemukan.</p>
        <Button onClick={() => router.push("/user/ai")} className="mt-4">
          Kembali ke Scanner
        </Button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
      {/* Header */}
      <header className="h-16 flex items-center px-8 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => router.back()}
          className="mr-4 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
        >
          <ArrowLeft className="size-5" />
        </button>
        <h2 className="text-lg font-bold">Hasil Klasifikasi AI</h2>
      </header>

      <div className="p-8 max-w-6xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Captured Image (40%) */}
          <div className="lg:w-[40%] flex flex-col gap-4">
            <div className="relative aspect-4/5 rounded-3xl overflow-hidden shadow-xl ring-1 ring-slate-200 dark:ring-slate-800 bg-slate-100 dark:bg-slate-800">
              {scan.imageUrl ? (
                <Image
                  src={scan.imageUrl}
                  alt={scan.aiCategory}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                  <p>Tidak ada gambar</p>
                </div>
              )}

              {/* AI Overlay indicators */}
              <div className="absolute inset-0 border-[3px] border-primary/50 m-12 rounded-2xl pointer-events-none">
                <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-primary"></div>
                <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-primary"></div>
                <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-primary"></div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-primary"></div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-slate-400 text-sm">
              <Info className="size-4" />
              <span>
                Foto diambil pada{" "}
                {new Intl.DateTimeFormat("id-ID", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }).format(new Date(scan.createdAt))}
              </span>
            </div>
          </div>

          {/* Right Column: Details (60%) */}
          <div className="lg:w-[60%]">
            <div className="bg-white dark:bg-slate-900 rounded-4xl p-8 lg:p-10 shadow-sm border border-slate-100 dark:border-slate-800 h-full flex flex-col">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-4 capitalize">
                    {scan.aiCategory}
                  </h3>
                  <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full font-bold text-sm">
                    <BadgeCheck className="size-5" />
                    Akurasi: {scan.aiAccuracy.toFixed(1)}%
                  </div>
                </div>
              </div>

              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8">
                Tergolong sebagai kategori sampah{" "}
                <strong>{scan.aiCategory}</strong>. Pastikan untuk memilah
                dengan benar agar nilai daur ulangnya tinggi.
              </p>

              {/* Reward Info Block */}
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                    <Gift className="size-6" />
                  </div>
                  <div>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">
                      Estimasi Reward
                    </p>
                    <p className="text-2xl font-black text-slate-900 dark:text-white">
                      +
                      {scan?.pointsEarned ||
                        Math.floor((scan?.finalWeight || 0.1) * 100)}{" "}
                      Poin
                      <span className="text-base font-normal text-slate-400">
                        {" "}
                        / {scan?.finalWeight}kg
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Spacer */}
              <div className="grow"></div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button className="h-auto bg-primary hover:bg-primary/90 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-lg shadow-primary/20">
                  <MapPin className="size-5" />
                  <span>Cari Drop-off Terdekat</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto bg-white dark:bg-slate-900 border-2 border-primary text-primary hover:bg-primary/5 hover:text-primary font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
                >
                  <Truck className="size-5" />
                  <span>Request Pick-up</span>
                </Button>
              </div>
              <p className="text-center mt-6 text-slate-400 text-xs">
                Dengan menekan tombol di atas, Anda menyetujui syarat dan
                ketentuan layanan Robah.
              </p>
            </div>
          </div>
        </div>

        {/* Related/Tips Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-start gap-4">
            <Sparkles className="text-primary size-6 shrink-0" />
            <div>
              <h4 className="font-bold text-sm mb-1">Tips Kebersihan</h4>
              <p className="text-xs text-slate-500">
                Bilas material terlebih dahulu sebelum dibuang agar nilai daur
                ulang lebih tinggi.
              </p>
            </div>
          </div>
          <div className="bg-white/50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-start gap-4">
            <Leaf className="text-primary size-6 shrink-0" />
            <div>
              <h4 className="font-bold text-sm mb-1">Dampak Lingkungan</h4>
              <p className="text-xs text-slate-500">
                Mendaur ulang bahan ini membantu menghemat energi berkelanjutan
                di lingkungan Anda.
              </p>
            </div>
          </div>
          <div className="bg-white/50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-start gap-4">
            <Info className="text-primary size-6 shrink-0" />
            <div>
              <h4 className="font-bold text-sm mb-1">Status Pickup</h4>
              <p className="text-xs text-slate-500">
                Pilih opsi Drop-off untuk menuju lokasi terdekat, atau atur
                jadwal Pickup.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal Overlay */}
      <ResponsiveModal
        open={showSuccessModal}
        onOpenChange={(open) => {
          if (!open) setIsModalDismissed(true);
        }}
        title="Hasil Identifikasi AI"
      >
        <div className="flex flex-col animate-in fade-in zoom-in duration-300 -mx-4 -mt-4">
          <div className="relative h-48 flex items-center justify-center overflow-hidden rounded-t-xl mb-6">
            <div className="absolute inset-0 bg-linear-to-b from-primary/10 to-transparent"></div>
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-primary/20 scale-150"></div>
              <div className="h-24 w-24 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30 z-10 relative">
                <CheckCircle className="text-white size-12" />
              </div>
            </div>
          </div>

          <div className="px-4 pb-6 flex flex-col items-center text-center">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Sampah Teridentifikasi!
            </h3>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-full mb-6 border border-slate-100 dark:border-slate-700">
              <Package className="text-primary size-5" />
              <span className="text-slate-700 dark:text-slate-300 font-semibold capitalize">
                {scan?.aiCategory}
              </span>
            </div>

            <div className="mb-8">
              <span className="text-4xl font-black text-primary tracking-tight">
                +
                {scan?.pointsEarned ||
                  Math.floor((scan?.finalWeight || 0.1) * 100)}{" "}
                Poin
              </span>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Berhasil ditambahkan ke saldo Anda
              </p>
            </div>

            <div className="w-full flex flex-col gap-3">
              <button
                onClick={() => setIsModalDismissed(true)}
                className="w-full h-14 bg-primary hover:bg-emerald-600 text-white font-bold rounded-xl shadow-md shadow-primary/20 transition-all flex items-center justify-center gap-2"
              >
                <Save className="size-5" />
                Konfirmasi & Simpan
              </button>
              <button
                onClick={() => router.push("/user/ai")}
                className="w-full h-14 bg-transparent border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Scan className="size-5" />
                Scan Lagi
              </button>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 px-8 py-4 flex items-center justify-center gap-2 mt-4 rounded-b-xl border-t border-slate-100 dark:border-slate-800">
            <Info className="text-primary size-4 shrink-0" />
            <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-widest leading-none">
              Tips: Pastikan material bersih
            </p>
          </div>
        </div>
      </ResponsiveModal>
    </div>
  );
}
