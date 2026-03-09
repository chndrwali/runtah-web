import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { PointsSection } from "@/modules/public/ui/sections/points-section";
import { Metadata } from "next";
import { LIMIT_TABLE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Redeem Point",
};

export default async function Page() {
  await Promise.all([
    prefetch(
      trpc.reward.getHistory.queryOptions({ page: 1, limit: LIMIT_TABLE }),
    ),
    prefetch(trpc.auth.getDashboardStats.queryOptions()),
  ]);

  return (
    <HydrateClient>
      <PointsSection />
    </HydrateClient>
  );
}
