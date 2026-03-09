import { DashboardSection } from "@/modules/public/ui/sections/dashboard-section";
import { HydrateClient, trpc, prefetch } from "@/trpc/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard manajemen sampah Robah",
};

export default async function Page() {
  await Promise.all([
    prefetch(trpc.auth.getDashboardStats.queryOptions()),
    prefetch(
      trpc.history.getRecentActivities.queryOptions({
        sortBy: "createdAt",
        sortOrder: "desc",
      }),
    ),
  ]);
  return (
    <HydrateClient>
      <DashboardSection />
    </HydrateClient>
  );
}
