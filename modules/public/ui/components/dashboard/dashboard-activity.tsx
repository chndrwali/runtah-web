"use client";

import Link from "next/link";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/custom/data-table";
import { dashboardColumns } from "./columns";
import { Loader2 } from "lucide-react";

export function DashboardActivity() {
  const trpc = useTRPC();

  // Fetch only the 3 most recent activities
  const { data: recentActivities = [], isLoading } = useQuery(
    trpc.history.getRecentActivities.queryOptions(),
  );

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          Aktivitas Terakhir
        </h3>
        <Link
          href="/user/history"
          className="text-primary text-sm font-semibold hover:underline"
        >
          Lihat Semua
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12 min-h-[200px]">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="overflow-x-auto w-full">
          <DataTable
            columns={dashboardColumns}
            data={recentActivities}
            isLoading={false}
          />
        </div>
      )}
    </div>
  );
}
