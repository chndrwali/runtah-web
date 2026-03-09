import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Gift, Loader2 } from "lucide-react";
import { RewardRedemption } from "@/app/generated/prisma/client";

type RewardData = {
  data: RewardRedemption[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
};

interface PointsHistoryTabProps {
  historyData?: RewardData;
  isLoading: boolean;
}

export function PointsHistoryTab({
  historyData,
  isLoading,
}: PointsHistoryTabProps) {
  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
      <div className="p-6 border-b border-border">
        <h3 className="font-bold text-lg text-foreground">
          Riwayat Penggunaan Poin
        </h3>
        <p className="text-sm text-muted-foreground">
          Daftar hadiah dan voucher yang telah Anda tukar.
        </p>
      </div>

      <div className="divide-y divide-border">
        {isLoading ? (
          <div className="py-12 flex justify-center">
            <Loader2 className="size-6 animate-spin text-primary" />
          </div>
        ) : !historyData?.data || historyData.data.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            Belum ada riwayat penukaran poin.
          </div>
        ) : (
          historyData.data.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:p-6 flex items-center justify-between hover:bg-accent/50 transition-colors"
            >
              <div className="flex gap-4 items-center">
                <div className="size-12 rounded-full bg-rose-500/10 flex items-center justify-center text-destructive shrink-0">
                  <Gift className="size-5" />
                </div>
                <div>
                  <p className="font-bold text-foreground mb-0.5">
                    {item.rewardTitle}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(item.createdAt), "dd MMM yyyy • HH:mm", {
                      locale: id,
                    })}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-destructive">
                  -{item.pointsCost} Poin
                </p>
                <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  {item.status === "SUCCESS" ? "BERHASIL" : item.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
