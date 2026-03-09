"use client";

import { TrendingUp, Calendar, TrendingDown, Minus } from "lucide-react";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardStats() {
  const trpc = useTRPC();

  const { data: stats, isLoading } = useQuery(
    trpc.auth.getDashboardStats.queryOptions(),
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Skeleton className="h-40 rounded-2xl" />
        <Skeleton className="h-40 rounded-2xl" />
      </div>
    );
  }

  const {
    totalPoints = 0,
    totalWeightSaved = 0,
    pointsIncreasePercentage = 0,
  } = stats || {};

  const formattedWeight =
    totalWeightSaved % 1 === 0 ? totalWeightSaved : totalWeightSaved.toFixed(1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-card p-8 rounded-2xl shadow-sm border border-border flex flex-col justify-between">
        <div>
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Total Poin
          </p>
          <h3 className="text-4xl font-black text-primary mt-2">
            {totalPoints.toLocaleString("id-ID")}{" "}
            <span className="text-2xl">⭐</span>
          </h3>
        </div>
        <div className="mt-6 flex items-center gap-2 text-sm font-medium">
          {pointsIncreasePercentage > 0 ? (
            <>
              <TrendingUp className="size-4 text-emerald-600" />
              <span className="text-emerald-600">
                +{pointsIncreasePercentage.toFixed(0)}% dari minggu lalu
              </span>
            </>
          ) : pointsIncreasePercentage < 0 ? (
            <>
              <TrendingDown className="size-4 text-rose-600" />
              <span className="text-rose-600">
                {pointsIncreasePercentage.toFixed(0)}% dari minggu lalu
              </span>
            </>
          ) : (
            <>
              <Minus className="size-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                Tidak ada perubahan poin dari minggu lalu
              </span>
            </>
          )}
        </div>
      </div>
      <div className="bg-card p-8 rounded-2xl shadow-sm border border-border flex flex-col justify-between">
        <div>
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Total Sampah Diselamatkan
          </p>
          <h3 className="text-4xl font-black text-foreground mt-2">
            {formattedWeight}{" "}
            <span className="text-2xl font-bold text-muted-foreground">Kg</span>
          </h3>
        </div>
        <div className="mt-6 flex items-center gap-2 text-muted-foreground text-sm font-medium">
          <Calendar className="size-4" />
          <span>Data akumulasi seluruh waktu</span>
        </div>
      </div>
    </div>
  );
}
