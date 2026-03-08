import { DashboardStats } from "@/modules/public/ui/components/dashboard-stats";
import { DashboardCTA } from "@/modules/public/ui/components/dashboard-cta";
import { DashboardActivity } from "@/modules/public/ui/components/dashboard-activity";
import { HydrateClient } from "@/trpc/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beranda | Robah",
  description: "Dashboard manajemen sampah Robah",
};

export default async function Page() {
  return (
    <HydrateClient>
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        <DashboardStats />
        <DashboardCTA />
        <DashboardActivity />
      </div>
    </HydrateClient>
  );
}
