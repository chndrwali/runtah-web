import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface WasteBank {
  id: string;
  name: string;
  lat: number;
  lng: number;
  distance: number; // km
  address: string;
  isOpen: boolean;
  types: string[];
}

interface MapSidebarProps {
  wasteBanks: WasteBank[];
  activeBankId: string | null;
  onSelectBank: (id: string | null) => void;
}

export function MapSidebar({
  wasteBanks,
  activeBankId,
  onSelectBank,
}: MapSidebarProps) {
  return (
    <div className="w-80 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col shrink-0 h-full">
      <div className="p-4 border-b border-slate-100 dark:border-slate-800">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4" />
          <Input
            className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-sm focus-visible:ring-2 focus-visible:ring-primary transition-all shadow-none h-10"
            placeholder="Cari area Dago, Cibiru..."
            type="text"
          />
        </div>
        <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide pb-1">
          <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-primary text-white text-xs font-medium transition-colors">
            Semua
          </button>
          <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            Plastik
          </button>
          <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            Kertas
          </button>
          <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            Logam
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {wasteBanks.map((bank) => {
          const isActive = activeBankId === bank.id;

          return (
            <div
              key={bank.id}
              className={`p-4 rounded-xl border-2 transition-all cursor-pointer group ${
                isActive
                  ? "border-primary bg-primary/5"
                  : "border-slate-100 dark:border-slate-800 hover:border-primary/50"
              }`}
              onClick={() => onSelectBank(isActive ? null : bank.id)}
            >
              <div className="flex justify-between items-start mb-2">
                <h3
                  className={`font-bold text-sm transition-colors ${isActive ? "text-primary" : "group-hover:text-primary"}`}
                >
                  {bank.name}
                </h3>
                {bank.isOpen ? (
                  <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded">
                    BUKA
                  </span>
                ) : (
                  <span className="bg-slate-100 dark:bg-slate-700 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                    TUTUP
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                <MapPin className="size-[14px]" /> {bank.distance.toFixed(1)} km
                dari lokasi Anda
              </p>
              <p className="text-xs text-slate-500 mb-4">{bank.address}</p>

              <Button
                variant={isActive ? "default" : "outline"}
                className={`w-full py-2 text-xs font-bold rounded-lg transition-colors h-8 ${
                  isActive
                    ? ""
                    : "border-primary text-primary hover:bg-primary hover:text-white dark:border-primary/50 dark:hover:bg-primary"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectBank(isActive ? null : bank.id);
                }}
              >
                {isActive ? "Tutup Rute" : "Lihat Rute"}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
