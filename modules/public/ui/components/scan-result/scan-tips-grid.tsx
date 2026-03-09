import { Info, Leaf, Sparkles } from "lucide-react";

export function ScanTipsGrid() {
  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white/50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-start gap-4">
        <Sparkles className="text-primary size-6 shrink-0" />
        <div>
          <h4 className="font-bold text-sm mb-1">Tips Kebersihan</h4>
          <p className="text-xs text-slate-500">
            Bilas material terlebih dahulu sebelum dibuang agar nilai daur ulang
            lebih tinggi.
          </p>
        </div>
      </div>
      <div className="bg-white/50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-start gap-4">
        <Leaf className="text-primary size-6 shrink-0" />
        <div>
          <h4 className="font-bold text-sm mb-1">Dampak Lingkungan</h4>
          <p className="text-xs text-slate-500">
            Mendaur ulang bahan ini membantu menghemat energi berkelanjutan di
            lingkungan Anda.
          </p>
        </div>
      </div>
      <div className="bg-white/50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-start gap-4">
        <Info className="text-primary size-6 shrink-0" />
        <div>
          <h4 className="font-bold text-sm mb-1">Status Pickup</h4>
          <p className="text-xs text-slate-500">
            Pilih opsi Drop-off untuk menuju lokasi terdekat, atau atur jadwal
            Pickup.
          </p>
        </div>
      </div>
    </div>
  );
}
