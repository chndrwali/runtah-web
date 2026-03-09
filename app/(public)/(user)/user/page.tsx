import { DashboardSection } from "@/modules/public/ui/sections/dashboard-section";
import { HydrateClient, trpc } from "@/trpc/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard manajemen sampah Robah",
};

export default async function Page() {
  await Promise.all([
    trpc.auth.getDashboardStats.queryOptions(),
    trpc.history.getRecentActivities.queryOptions(),
  ]);
  return (
    <HydrateClient>
      <DashboardSection />
    </HydrateClient>
  );
}
