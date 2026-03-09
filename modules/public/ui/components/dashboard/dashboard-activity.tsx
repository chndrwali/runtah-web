"use client";

import Link from "next/link";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/custom/data-table";
import { dashboardColumns } from "./columns";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { SortingState } from "@tanstack/react-table";

export function DashboardActivity() {
  const trpc = useTRPC();
  const [sorting, setSorting] = useState<SortingState>([]);

  const trpcSortBy = sorting.length > 0 ? sorting[0].id : "createdAt";
  const trpcSortOrder = sorting.length > 0 && sorting[0].desc ? "desc" : "asc";

  // Fetch only the 3 most recent activities with dynamic sorting
  const { data: recentActivities = [], isLoading } = useQuery(
    trpc.history.getRecentActivities.queryOptions({
      sortBy: trpcSortBy as
        | "aiCategory"
        | "createdAt"
        | "pointsEarned"
        | "status",
      sortOrder: trpcSortOrder,
    }),
  );

  return (
    <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
      <div className="p-6 border-b border-border flex items-center justify-between">
        <h3 className="text-xl font-bold text-foreground">
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
            isLoading={isLoading}
            sorting={sorting}
            onSortingChange={setSorting}
          />
        </div>
      )}
    </div>
  );
}
