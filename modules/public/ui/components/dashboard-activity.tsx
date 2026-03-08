import { Droplet, FileText, Package } from "lucide-react";
import React from "react";

const recentActivities = [
  {
    id: "1",
    type: "Botol Plastik PET",
    icon: Droplet,
    iconBgClass: "bg-blue-100 dark:bg-blue-900/30",
    iconTextClass: "text-blue-600",
    date: "Hari ini, 10:45",
    points: "+50 Poin",
    status: "Selesai",
  },
  {
    id: "2",
    type: "Kardus Bekas",
    icon: FileText,
    iconBgClass: "bg-orange-100 dark:bg-orange-900/30",
    iconTextClass: "text-orange-600",
    date: "Kemarin, 14:20",
    points: "+120 Poin",
    status: "Selesai",
  },
  {
    id: "3",
    type: "Kaleng Aluminium",
    icon: Package,
    iconBgClass: "bg-gray-100 dark:bg-gray-700",
    iconTextClass: "text-gray-600 dark:text-gray-300",
    date: "24 Okt, 09:15",
    points: "+80 Poin",
    status: "Selesai",
  },
];

export function DashboardActivity() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          Aktivitas Terakhir
        </h3>
        <button className="text-primary text-sm font-semibold hover:underline">
          Lihat Semua
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
              <th className="px-6 py-4">Jenis Sampah</th>
              <th className="px-6 py-4">Tanggal</th>
              <th className="px-6 py-4">Poin Diperoleh</th>
              <th className="px-6 py-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {recentActivities.map((activity) => {
              const Icon = activity.icon;
              return (
                <tr
                  key={activity.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${activity.iconBgClass} ${activity.iconTextClass}`}
                      >
                        <Icon className="size-5" />
                      </div>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {activity.type}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                    {activity.date}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-emerald-600">
                      {activity.points}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 text-xs font-bold rounded-full">
                      {activity.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
