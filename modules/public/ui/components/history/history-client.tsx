"use client";

import { useState } from "react";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/custom/data-table";
import { columns } from "./columns";
import {
  Search,
  Calendar,
  Filter,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Leaf,
  Star,
} from "lucide-react";
import { LIMIT_TABLE } from "@/lib/utils";
import { SortingState } from "@tanstack/react-table";
import { useDebounce } from "@/hooks/use-debounce";

export function HistoryClient() {
  const trpc = useTRPC();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [dateFilter, setDateFilter] = useState<"7D" | "30D" | "ALL">("30D");
  const [statusFilter, setStatusFilter] = useState<
    "ALL" | "PENDING" | "COMPLETED" | "FAILED"
  >("ALL");

  const trpcSortBy = sorting.length > 0 ? sorting[0].id : "createdAt";
  const trpcSortOrder = sorting.length > 0 && sorting[0].desc ? "desc" : "asc";

  const { data: historyData, isLoading } = useQuery(
    trpc.history.getAll.queryOptions({
      page,
      limit: LIMIT_TABLE,
      search: debouncedSearch,
      sortBy: trpcSortBy as
        | "createdAt"
        | "updatedAt"
        | "aiAccuracy"
        | "pointsEarned"
        | "finalWeight"
        | "aiCategory"
        | "status",
      sortOrder: trpcSortOrder,
      dateFilter,
      status: statusFilter,
    }),
  );

  const { data: statsData } = useQuery(trpc.history.getStats.queryOptions());

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-background-light dark:bg-background-dark">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Search & Filter Bar */}
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-5" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                if (page !== 1) setPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl focus:ring-primary focus:border-primary text-sm shadow-sm"
              placeholder="Cari kategori atau tanggal..."
              type="text"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 size-4 pointer-events-none" />
              <select
                value={dateFilter}
                onChange={(e) => {
                  setDateFilter(e.target.value as "7D" | "30D" | "ALL");
                  setPage(1);
                }}
                className="appearance-none pl-9 pr-8 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm focus:ring-primary focus:border-primary cursor-pointer"
              >
                <option value="ALL">Semua Waktu</option>
                <option value="30D">30 Hari Terakhir</option>
                <option value="7D">7 Hari Terakhir</option>
              </select>
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 size-4 pointer-events-none" />
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(
                    e.target.value as
                      | "ALL"
                      | "PENDING"
                      | "COMPLETED"
                      | "FAILED",
                  );
                  setPage(1);
                }}
                className="appearance-none pl-9 pr-8 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm focus:ring-primary focus:border-primary cursor-pointer"
              >
                <option value="ALL">Semua Status</option>
                <option value="COMPLETED">Selesai</option>
                <option value="PENDING">Menunggu</option>
                <option value="FAILED">Gagal</option>
              </select>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={historyData?.data || []}
          isLoading={isLoading}
          sorting={sorting}
          onSortingChange={setSorting}
        />

        {/* Pagination & Stats Summary Only if Data Loads */}
        {!isLoading && historyData ? (
          <>
            {/* Pagination Controls */}
            <div className="px-6 py-4 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <p className="text-sm text-slate-500">
                Menampilkan{" "}
                {historyData.data.length > 0 ? (page - 1) * LIMIT_TABLE + 1 : 0}
                -{Math.min(page * LIMIT_TABLE, historyData.pagination.total)}{" "}
                dari {historyData.pagination.total} transaksi
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={!historyData.pagination.hasPrev}
                  className="size-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
                >
                  <ChevronLeft className="size-5" />
                </button>

                <div className="flex items-center justify-center px-4 rounded-lg bg-primary text-white font-bold text-sm shadow-sm">
                  {page}
                </div>

                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={!historyData.pagination.hasNext}
                  className="size-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>
            </div>

            {/* Statistics Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4 hover:border-primary/30 transition-colors">
                <div className="size-12 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="size-6" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase">
                    Total Scan Berhasil
                  </p>
                  <p className="text-2xl font-bold">
                    {statsData?.totalScansCompleted || 0}
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4 hover:border-primary/30 transition-colors">
                <div className="size-12 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Leaf className="size-6" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase">
                    Sampah Terdaur Ulang
                  </p>
                  <p className="text-2xl font-bold">
                    {(statsData?.totalWeightSaved || 0).toFixed(1)} kg
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4 hover:border-primary/30 transition-colors">
                <div className="size-12 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <Star className="size-6 shrink-0 fill-amber-600 dark:fill-amber-400" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase">
                    Kontribusi Poin
                  </p>
                  <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                    +{statsData?.totalPointsEarned || 0}
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
