"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery, useMutation } from "@tanstack/react-query";
import { appToast } from "@/components/custom/app-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  PointsHeader,
  PointsRedeemTab,
  PointsHistoryTab,
} from "@/modules/public/ui/components/points";

export const PointsClient = () => {
  const trpc = useTRPC();

  // Real-time Dashboard Stats for Points Header
  const { data: statsData, refetch: refetchStats } = useQuery(
    trpc.auth.getDashboardStats.queryOptions(),
  );

  // Reward History Query
  const {
    data: historyData,
    isLoading: isLoadingHistory,
    refetch: refetchHistory,
  } = useQuery(trpc.reward.getHistory.queryOptions({ page: 1, limit: 100 }));

  const redeemMutation = useMutation(
    trpc.reward.redeem.mutationOptions({
      onSuccess: () => {
        appToast.success("Berhasil menukar Poin dengan Hadiah!");
        refetchStats(); // Refresh header points
        refetchHistory(); // Add to history list
      },
      onError: (error) => {
        appToast.error(error.message || "Gagal melakukan penukaran");
      },
    }),
  );

  const totalPoints = statsData?.totalPoints || 0;

  const handleRedeem = (
    rewardId: number,
    rewardTitle: string,
    pointsCost: number,
  ) => {
    redeemMutation.mutate({
      rewardId,
      rewardTitle,
      pointsCost,
    });
  };

  return (
    <div className="flex-1">
      <PointsHeader totalPoints={totalPoints} />

      <Tabs defaultValue="redeem" className="space-y-6">
        <div className="flex justify-center md:justify-start">
          <TabsList className="bg-muted p-1 rounded-xl">
            <TabsTrigger
              value="redeem"
              className="rounded-lg px-8 py-2.5 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm font-semibold transition-all"
            >
              Tukar Poin
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="rounded-lg px-8 py-2.5 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm font-semibold transition-all"
            >
              Riwayat Penukaran
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent
          value="redeem"
          className="space-y-8 focus-visible:outline-none"
        >
          <PointsRedeemTab
            totalPoints={totalPoints}
            onRedeem={handleRedeem}
            isRedeeming={redeemMutation.isPending}
            redeemingId={
              redeemMutation.isPending
                ? redeemMutation.variables?.rewardId
                : null
            }
          />
        </TabsContent>

        <TabsContent value="history" className="focus-visible:outline-none">
          <PointsHistoryTab
            historyData={historyData}
            isLoading={isLoadingHistory}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
