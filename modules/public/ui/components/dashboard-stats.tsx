import { TrendingUp, Calendar } from "lucide-react";

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Total Poin
          </p>
          <h3 className="text-4xl font-black text-primary mt-2">
            1,250 <span className="text-2xl">⭐</span>
          </h3>
        </div>
        <div className="mt-6 flex items-center gap-2 text-emerald-600 text-sm font-medium">
          <TrendingUp className="size-4" />
          <span>+12% dari minggu lalu</span>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Total Sampah Diselamatkan
          </p>
          <h3 className="text-4xl font-black text-slate-900 dark:text-white mt-2">
            12 <span className="text-2xl font-bold text-slate-400">Kg</span>
          </h3>
        </div>
        <div className="mt-6 flex items-center gap-2 text-slate-500 text-sm font-medium">
          <Calendar className="size-4" />
          <span>Data akumulasi 30 hari terakhir</span>
        </div>
      </div>
    </div>
  );
}
